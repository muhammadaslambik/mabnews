document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    const API_BASE_URL = "https://mabnews-backend.vercel.app/api";
    const USERS_ENDPOINT = `${API_BASE_URL}/users`;
    const MESSAGES_ENDPOINT = `${API_BASE_URL}/messages`;
    const CURRENT_USER_KEY = "mabnews_current_user_id";
    const POLL_INTERVAL_MS = 4000;

    const chatList = document.getElementById("chatList");
    const chatThreadHeader = document.getElementById("chatThreadHeader");
    const chatThreadBody = document.getElementById("chatThreadBody");
    const chatInputForm = document.getElementById("chatInputForm");
    const chatInputText = document.getElementById("chatInputText");
    const chatSendButton = document.getElementById("chatSendButton");
    const newChatSelect = document.getElementById("newChatSelect");

    let allUsers = [];
    let currentUserId = null;
    let activeUserId = null;
    let conversations = [];

    init();

    async function init() {
        try {
            const response = await fetch(USERS_ENDPOINT);
            const json = await response.json();
            allUsers = Array.isArray(json.data) ? json.data : [];
        } catch (error) {
            console.error("Gagal memuat daftar pengguna:", error);
            chatList.innerHTML = `<div class="chat-empty">Tidak bisa terhubung ke server.</div>`;
            return;
        }

        if (allUsers.length < 2) {
            chatList.innerHTML = `<div class="chat-empty">Butuh minimal 2 pengguna CMS untuk mulai chat. Tambahkan pengguna lain dulu.</div>`;
            return;
        }

        const savedId = parseInt(localStorage.getItem(CURRENT_USER_KEY), 10);
        const savedUser = allUsers.find((user) => user.id === savedId);
        currentUserId = savedUser ? savedUser.id : allUsers[0].id;
        localStorage.setItem(CURRENT_USER_KEY, String(currentUserId));

        populateNewChatSelect();

        const params = new URLSearchParams(window.location.search);
        const withParam = parseInt(params.get("with"), 10);
        if (withParam && allUsers.some((user) => user.id === withParam)) {
            activeUserId = withParam;
        }

        await loadConversations();

        if (!activeUserId && conversations.length > 0) {
            activeUserId = conversations[0].user_id;
        }

        if (activeUserId) {
            await openConversation(activeUserId);
        }

        setInterval(pollUpdates, POLL_INTERVAL_MS);
    }

    function populateNewChatSelect() {
        const others = allUsers.filter((user) => user.id !== currentUserId);
        newChatSelect.innerHTML =
            `<option value="">+ Pesan baru...</option>` +
            others.map((user) => `<option value="${user.id}">${escapeHtml(user.display_name)}</option>`).join("");
    }

    newChatSelect.addEventListener("change", () => {
        const value = parseInt(newChatSelect.value, 10);
        newChatSelect.value = "";
        if (!value) return;
        activeUserId = value;
        openConversation(activeUserId);
    });

    /* =========================================================
       DAFTAR PERCAKAPAN
       ========================================================= */
    async function loadConversations() {
        try {
            const response = await fetch(`${MESSAGES_ENDPOINT}/conversations?user_id=${currentUserId}`);
            const json = await response.json();
            conversations = Array.isArray(json.data) ? json.data : [];
        } catch (error) {
            console.error("Gagal memuat percakapan:", error);
            conversations = [];
        }

        renderChatList();
    }

    function renderChatList() {
        if (conversations.length === 0) {
            chatList.innerHTML = `<div class="chat-empty">Belum ada percakapan. Pilih "+ Pesan baru" di atas.</div>`;
            return;
        }

        chatList.innerHTML = conversations
            .map((conv) => {
                const isFromMe = conv.last_sender_id === currentUserId;
                const preview = escapeHtml((isFromMe ? "Anda: " : "") + (conv.last_body || ""));
                return `
                    <button type="button" class="chat-list-item${conv.user_id === activeUserId ? " is-active" : ""}" data-user-id="${conv.user_id}">
                        <span class="chat-avatar"><i class="fa-solid fa-user"></i></span>
                        <span class="chat-list-item-text">
                            <strong>${escapeHtml(conv.name)}</strong>
                            <span>${preview}</span>
                        </span>
                        ${conv.unread_count > 0 ? '<span class="chat-unread-dot"></span>' : ""}
                    </button>
                `;
            })
            .join("");

        chatList.querySelectorAll(".chat-list-item").forEach((btn) => {
            btn.addEventListener("click", () => {
                activeUserId = parseInt(btn.dataset.userId, 10);
                openConversation(activeUserId);
            });
        });
    }

    /* =========================================================
       THREAD PERCAKAPAN
       ========================================================= */
    async function openConversation(userId) {
        activeUserId = userId;

        const user = allUsers.find((item) => item.id === userId);
        const name = user ? user.display_name : "Pengguna";

        chatThreadHeader.innerHTML = `<i class="fa-solid fa-circle-user"></i> ${escapeHtml(name)}`;
        chatInputText.disabled = false;
        chatSendButton.disabled = false;

        history.replaceState(null, "", `pesan.html?with=${userId}`);

        renderChatList();
        await loadThread(userId, true);
    }

    async function loadThread(userId, scrollToBottom) {
        try {
            const response = await fetch(`${MESSAGES_ENDPOINT}/thread?user_id=${currentUserId}&with=${userId}`);
            const json = await response.json();
            const messages = Array.isArray(json.data) ? json.data : [];
            renderThread(messages);

            if (scrollToBottom) {
                chatThreadBody.scrollTop = chatThreadBody.scrollHeight;
            }

            // Pesan yang tadinya belum dibaca sekarang sudah — perbarui
            // daftar percakapan supaya titik biru hilang.
            loadConversations();
        } catch (error) {
            console.error("Gagal memuat pesan:", error);
        }
    }

    function renderThread(messages) {
        if (messages.length === 0) {
            chatThreadBody.innerHTML = `<div class="chat-empty">Belum ada pesan. Mulai percakapan sekarang.</div>`;
            return;
        }

        chatThreadBody.innerHTML = messages
            .map((msg) => {
                const isMine = msg.sender_id === currentUserId;
                return `
                    <div class="chat-bubble-row${isMine ? " is-mine" : ""}">
                        <div class="chat-bubble">
                            ${escapeHtml(msg.body)}
                            <span class="chat-bubble-time">${formatTime(msg.created_at)}</span>
                        </div>
                    </div>
                `;
            })
            .join("");
    }

    /* =========================================================
       KIRIM PESAN
       ========================================================= */
    chatInputForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        await sendCurrentMessage();
    });

    chatInputText.addEventListener("keydown", (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            sendCurrentMessage();
        }
    });

    async function sendCurrentMessage() {
        const body = chatInputText.value.trim();
        if (!body || !activeUserId) return;

        chatSendButton.disabled = true;

        try {
            const response = await fetch(MESSAGES_ENDPOINT, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    sender_id: currentUserId,
                    receiver_id: activeUserId,
                    body
                })
            });

            if (!response.ok) {
                const errJson = await response.json().catch(() => ({}));
                throw new Error(errJson.error || "Gagal mengirim pesan");
            }

            chatInputText.value = "";
            await loadThread(activeUserId, true);
        } catch (error) {
            console.error("Gagal mengirim pesan:", error);
            alert(error.message || "Gagal mengirim pesan.");
        } finally {
            chatSendButton.disabled = false;
            chatInputText.focus();
        }
    }

    /* =========================================================
       POLLING BERKALA (bukan realtime sungguhan, tapi cukup untuk
       terasa "hidup" tanpa infrastruktur WebSocket)
       ========================================================= */
    function pollUpdates() {
        if (document.hidden) return;
        loadConversations();
        if (activeUserId) {
            loadThread(activeUserId, false);
        }
    }

    /* =========================================================
       UTILITIES
       ========================================================= */
    function escapeHtml(text) {
        const div = document.createElement("div");
        div.textContent = text == null ? "" : String(text);
        return div.innerHTML;
    }

    function formatTime(iso) {
        if (!iso) return "";
        const date = new Date(iso);
        const hour = String(date.getHours()).padStart(2, "0");
        const minute = String(date.getMinutes()).padStart(2, "0");
        return `${hour}:${minute}`;
    }
});
