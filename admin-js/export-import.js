document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    /* =========================================================
       KONFIGURASI
       ========================================================= */

    const HISTORY_KEY = "mabnews_export_import_history";
    const BACKUP_KEY = "mabnews_last_export";

    const MAX_FILE_SIZE = 50 * 1024 * 1024;


    /* =========================================================
       ELEMENT
       ========================================================= */

    const exportForm =
        document.getElementById("exportForm");

    const checkAll =
        document.getElementById("checkAll");

    const dropzone =
        document.getElementById("dropzoneContainer");

    const fileInput =
        document.getElementById("hiddenFileInput");

    const selectFileButton =
        document.getElementById("triggerFileSelect");

    const dropzoneText =
        document.getElementById("dropzoneText");

    const importButton =
        document.getElementById("btnExecuteImport");

    const historyBody =
        document.getElementById("historyTableRows");

    const overwriteExisting =
        document.getElementById("overwriteExisting");

    const importMedia =
        document.getElementById("importMedia");

    const safeMode =
        document.getElementById("safeMode");


    /* =========================================================
       CHECK ALL
       ========================================================= */

    const exportCheckboxes =
        document.querySelectorAll(
            'input[name="export_item"]'
        );


    if (checkAll) {

        checkAll.addEventListener(
            "change",
            () => {

                exportCheckboxes.forEach(
                    (checkbox) => {

                        checkbox.checked =
                            checkAll.checked;

                    }
                );

            }
        );

    }


    exportCheckboxes.forEach(
        (checkbox) => {

            if (checkbox === checkAll) {
                return;
            }

            checkbox.addEventListener(
                "change",
                () => {

                    const others =
                        Array.from(
                            exportCheckboxes
                        ).filter(
                            (item) =>
                                item !== checkAll
                        );

                    const allChecked =
                        others.every(
                            (item) =>
                                item.checked
                        );

                    if (checkAll) {

                        checkAll.checked =
                            allChecked;

                    }

                }
            );

        }
    );


    /* =========================================================
       FORMAT RADIO
       ========================================================= */

    const formatOptions =
        document.querySelectorAll(
            ".format-option"
        );


    formatOptions.forEach(
        (option) => {

            const radio =
                option.querySelector(
                    "input[type='radio']"
                );

            if (!radio) {
                return;
            }

            radio.addEventListener(
                "change",
                () => {

                    formatOptions.forEach(
                        (item) => {

                            item.classList.remove(
                                "selected"
                            );

                        }
                    );

                    if (radio.checked) {

                        option.classList.add(
                            "selected"
                        );

                    }

                }
            );

        }
    );


    /* =========================================================
       FILE SELECT
       ========================================================= */

    if (selectFileButton && fileInput) {

        selectFileButton.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

                event.stopPropagation();

                fileInput.click();

            }
        );

    }


    if (dropzone && fileInput) {

        dropzone.addEventListener(
            "click",
            (event) => {

                if (
                    selectFileButton &&
                    (
                        event.target ===
                            selectFileButton ||
                        selectFileButton.contains(
                            event.target
                        )
                    )
                ) {
                    return;
                }

                fileInput.click();

            }
        );


        dropzone.addEventListener(
            "dragover",
            (event) => {

                event.preventDefault();

                dropzone.classList.add(
                    "dragging"
                );

            }
        );


        dropzone.addEventListener(
            "dragenter",
            (event) => {

                event.preventDefault();

                dropzone.classList.add(
                    "dragging"
                );

            }
        );


        dropzone.addEventListener(
            "dragleave",
            (event) => {

                if (
                    !dropzone.contains(
                        event.relatedTarget
                    )
                ) {

                    dropzone.classList.remove(
                        "dragging"
                    );

                }

            }
        );


        dropzone.addEventListener(
            "drop",
            (event) => {

                event.preventDefault();

                dropzone.classList.remove(
                    "dragging"
                );

                const files =
                    event.dataTransfer.files;

                if (
                    !files ||
                    !files.length
                ) {
                    return;
                }

                const file =
                    files[0];

                handleSelectedFile(
                    file
                );

            }
        );

    }


    if (fileInput) {

        fileInput.addEventListener(
            "change",
            () => {

                const file =
                    fileInput.files?.[0];

                if (!file) {
                    return;
                }

                handleSelectedFile(
                    file
                );

            }
        );

    }


    /* =========================================================
       FILE VALIDATION
       ========================================================= */

    function handleSelectedFile(file) {

        if (file.size > MAX_FILE_SIZE) {

            alert(
                "Ukuran file terlalu besar. " +
                "Maksimum file adalah 50 MB."
            );

            resetFileInput();

            return;

        }


        const extension =
            getFileExtension(
                file.name
            );


        const supported =
            [
                "json",
                "xml",
                "csv"
            ];


        if (
            !supported.includes(
                extension
            )
        ) {

            alert(
                "Format file tidak didukung. " +
                "Gunakan JSON, XML, atau CSV."
            );

            resetFileInput();

            return;

        }


        if (dropzoneText) {

            const size =
                formatFileSize(
                    file.size
                );

            dropzoneText.textContent =
                `File siap: ${file.name} (${size})`;

        }

    }


    function resetFileInput() {

        if (fileInput) {

            fileInput.value = "";

        }

        if (dropzoneText) {

            dropzoneText.textContent =
                "Seret dan lepas file di sini atau klik untuk memilih file.";

        }

    }


    function getFileExtension(
        fileName
    ) {

        const parts =
            fileName
                .toLowerCase()
                .split(".");

        return parts.length > 1
            ? parts.pop()
            : "";

    }


    function formatFileSize(
        bytes
    ) {

        if (bytes < 1024) {
            return `${bytes} B`;
        }

        if (bytes < 1024 * 1024) {

            return (
                `${(bytes / 1024).toFixed(1)} KB`
            );

        }

        return (
            `${(bytes / 1024 / 1024).toFixed(2)} MB`
        );

    }


    /* =========================================================
       EXPORT
       ========================================================= */

    if (exportForm) {

        exportForm.addEventListener(
            "submit",
            async (event) => {

                event.preventDefault();

                const selected =
                    getSelectedExportItems();


                if (!selected.length) {

                    alert(
                        "Silakan pilih minimal satu jenis data."
                    );

                    return;

                }


                const format =
                    document.querySelector(
                        'input[name="file_format"]:checked'
                    )?.value || "json";


                const exportData =
                    createBackupData(
                        selected
                    );


                let blob;

                let extension =
                    format;


                if (format === "json") {

                    blob =
                        createJsonBlob(
                            exportData
                        );

                } else if (format === "xml") {

                    blob =
                        createXmlBlob(
                            exportData
                        );

                } else {

                    blob =
                        createCsvBlob(
                            exportData
                        );

                }


                const now =
                    new Date();


                const timestamp =
                    createTimestamp(
                        now
                    );


                const filename =
                    `mabnews-backup-${timestamp}.${extension}`;


                downloadBlob(
                    blob,
                    filename
                );


                const historyItem = {

                    id:
                        createId(),

                    type:
                        "Export",

                    data:
                        selected
                            .map(
                                (item) =>
                                    item.label
                            )
                            .join(", "),

                    format:
                        format.toUpperCase(),

                    size:
                        formatFileSize(
                            blob.size
                        ),

                    status:
                        "Berhasil",

                    filename,

                    blobData:
                        await blobToBase64(
                            blob
                        ),

                    createdAt:
                        now.toISOString()

                };


                saveHistory(
                    historyItem
                );


                alert(
                    "Ekspor berhasil.\n\n" +
                    `File: ${filename}`
                );

            }
        );

    }


    /* =========================================================
       SELECTED EXPORT ITEMS
       ========================================================= */

    function getSelectedExportItems() {

        const all =
            checkAll?.checked === true;


        const definitions = {

            artikel: {
                label: "Artikel"
            },

            kategori: {
                label: "Kategori"
            },

            media: {
                label: "Media"
            },

            pengguna: {
                label: "Pengguna"
            },

            pengaturan: {
                label: "Pengaturan"
            }

        };


        const result = [];


        if (all) {

            Object.keys(
                definitions
            ).forEach(
                (key) => {

                    result.push({
                        key,
                        label:
                            definitions[key].label
                    });

                }
            );

            return result;

        }


        exportCheckboxes.forEach(
            (checkbox) => {

                if (
                    checkbox === checkAll ||
                    !checkbox.checked
                ) {
                    return;
                }

                const definition =
                    definitions[
                        checkbox.value
                    ];


                if (definition) {

                    result.push({
                        key:
                            checkbox.value,

                        label:
                            definition.label

                    });

                }

            }
        );


        return result;

    }


    /* =========================================================
       CREATE BACKUP DATA
       ========================================================= */

    function createBackupData(
        selected
    ) {

        const backup = {

            application:
                "MAB-News CMS",

            version:
                "1.0",

            exportedAt:
                new Date().toISOString(),

            selected:
                selected.map(
                    (item) =>
                        item.key
                ),

            data: {}

        };


        selected.forEach(
            (item) => {

                backup.data[
                    item.key
                ] =
                    collectLocalStorageData(
                        item.key
                    );

            }
        );


        return backup;

    }


    /* =========================================================
       COLLECT LOCAL STORAGE
       ========================================================= */

    function collectLocalStorageData(
        category
    ) {

        const result = {};


        const keyPatterns = {

            artikel: [
                "artikel",
                "articles",
                "mabnews_articles"
            ],

            kategori: [
                "kategori",
                "categories",
                "mabnews_categories"
            ],

            media: [
                "media",
                "mabnews_media"
            ],

            pengguna: [
                "pengguna",
                "users",
                "mabnews_users"
            ],

            pengaturan: [
                "pengaturan",
                "settings",
                "mabnews_settings"
            ]

        };


        const patterns =
            keyPatterns[
                category
            ] || [];


        for (
            let i = 0;
            i < localStorage.length;
            i++
        ) {

            const key =
                localStorage.key(i);

            if (!key) {
                continue;
            }


            const match =
                patterns.some(
                    (pattern) =>
                        key
                            .toLowerCase()
                            .includes(
                                pattern
                            )
                );


            if (!match) {
                continue;
            }


            const value =
                localStorage.getItem(
                    key
                );


            try {

                result[key] =
                    JSON.parse(value);

            } catch {

                result[key] =
                    value;

            }

        }


        return result;

    }


    /* =========================================================
       JSON
       ========================================================= */

    function createJsonBlob(
        data
    ) {

        const json =
            JSON.stringify(
                data,
                null,
                2
            );


        return new Blob(
            [json],
            {
                type:
                    "application/json;charset=utf-8"
            }
        );

    }


    /* =========================================================
       XML
       ========================================================= */

    function createXmlBlob(
        data
    ) {

        const xml =
            objectToXml(
                data,
                "mabnews"
            );


        return new Blob(
            [xml],
            {
                type:
                    "application/xml;charset=utf-8"
            }
        );

    }


    function objectToXml(
        value,
        nodeName
    ) {

        const safeName =
            sanitizeXmlName(
                nodeName
            );


        if (
            value === null ||
            value === undefined
        ) {

            return `<${safeName}></${safeName}>`;

        }


        if (
            typeof value !== "object"
        ) {

            return (
                `<${safeName}>` +
                escapeXml(
                    String(value)
                ) +
                `</${safeName}>`
            );

        }


        if (Array.isArray(value)) {

            return value
                .map(
                    (item) =>
                        objectToXml(
                            item,
                            "item"
                        )
                )
                .join("");

        }


        let result =
            `<${safeName}>`;


        Object.entries(value)
            .forEach(
                ([key, item]) => {

                    result +=
                        objectToXml(
                            item,
                            key
                        );

                }
            );


        result +=
            `</${safeName}>`;


        return result;

    }


    function sanitizeXmlName(
        name
    ) {

        return String(name)
            .replace(
                /[^a-zA-Z0-9_-]/g,
                "_"
            );

    }


    function escapeXml(
        value
    ) {

        return value
            .replace(
                /&/g,
                "&amp;"
            )
            .replace(
                /</g,
                "&lt;"
            )
            .replace(
                />/g,
                "&gt;"
            )
            .replace(
                /"/g,
                "&quot;"
            )
            .replace(
                /'/g,
                "&apos;"
            );

    }


    /* =========================================================
       CSV
       ========================================================= */

    function createCsvBlob(
        data
    ) {

        const rows = [
            [
                "Kategori",
                "Key",
                "Data"
            ]
        ];


        Object.entries(
            data.data || {}
        ).forEach(
            ([category, values]) => {

                Object.entries(
                    values
                ).forEach(
                    ([key, value]) => {

                        rows.push([
                            category,
                            key,
                            typeof value === "object"
                                ? JSON.stringify(value)
                                : String(value)
                        ]);

                    }
                );

            }
        );


        const csv =
            rows
                .map(
                    (row) =>
                        row
                            .map(
                                csvEscape
                            )
                            .join(",")
                )
                .join("\r\n");


        return new Blob(
            ["\ufeff" + csv],
            {
                type:
                    "text/csv;charset=utf-8"
            }
        );

    }


    function csvEscape(
        value
    ) {

        const string =
            String(value ?? "");


        return (
            '"' +
            string.replace(
                /"/g,
                '""'
            ) +
            '"'
        );

    }


    /* =========================================================
       DOWNLOAD
       ========================================================= */

    function downloadBlob(
        blob,
        filename
    ) {

        const url =
            URL.createObjectURL(
                blob
            );


        const link =
            document.createElement(
                "a"
            );


        link.href = url;

        link.download =
            filename;

        link.style.display =
            "none";


        document.body.appendChild(
            link
        );


        link.click();


        link.remove();


        setTimeout(
            () => {
                URL.revokeObjectURL(
                    url
                );
            },
            1000
        );

    }


    /* =========================================================
       BLOB TO BASE64
       ========================================================= */

    function blobToBase64(
        blob
    ) {

        return new Promise(
            (resolve) => {

                const reader =
                    new FileReader();


                reader.onload =
                    () => {

                        resolve(
                            reader.result
                        );

                    };


                reader.readAsDataURL(
                    blob
                );

            }
        );

    }


    /* =========================================================
       IMPORT
       ========================================================= */

    if (importButton) {

        importButton.addEventListener(
            "click",
            async () => {

                if (
                    !fileInput ||
                    !fileInput.files ||
                    !fileInput.files.length
                ) {

                    alert(
                        "Silakan pilih file backup terlebih dahulu."
                    );

                    return;

                }


                const file =
                    fileInput.files[0];


                if (
                    file.size >
                    MAX_FILE_SIZE
                ) {

                    alert(
                        "Ukuran file melebihi batas 50 MB."
                    );

                    return;

                }


                const extension =
                    getFileExtension(
                        file.name
                    );


                importButton.disabled =
                    true;


                try {

                    const text =
                        await file.text();


                    let importedData;


                    if (
                        extension === "json"
                    ) {

                        importedData =
                            JSON.parse(
                                text
                            );

                    } else if (
                        extension === "xml"
                    ) {

                        importedData =
                            parseXml(
                                text
                            );

                    } else if (
                        extension === "csv"
                    ) {

                        importedData =
                            parseCsv(
                                text
                            );

                    } else {

                        throw new Error(
                            "Format file tidak didukung."
                        );

                    }


                    if (
                        safeMode?.checked
                    ) {

                        validateBackup(
                            importedData
                        );

                    }


                    if (
                        extension === "json" &&
                        importedData.data
                    ) {

                        restoreLocalStorage(
                            importedData.data,
                            Boolean(
                                overwriteExisting?.checked
                            )
                        );

                    }


                    const historyItem = {

                        id:
                            createId(),

                        type:
                            "Import",

                        data:
                            detectImportedData(
                                importedData
                            ),

                        format:
                            extension.toUpperCase(),

                        size:
                            formatFileSize(
                                file.size
                            ),

                        status:
                            "Berhasil",

                        filename:
                            file.name,

                        createdAt:
                            new Date()
                                .toISOString()

                    };


                    saveHistory(
                        historyItem
                    );


                    alert(
                        "Import berhasil.\n\n" +
                        `File: ${file.name}`
                    );


                    resetFileInput();


                } catch (error) {

                    console.error(
                        "Import error:",
                        error
                    );


                    alert(
                        "Import gagal.\n\n" +
                        (
                            error.message ||
                            "Struktur file tidak valid."
                        )
                    );

                } finally {

                    importButton.disabled =
                        false;

                }

            }
        );

    }


    /* =========================================================
       VALIDATE JSON BACKUP
       ========================================================= */

    function validateBackup(
        data
    ) {

        if (
            !data ||
            typeof data !== "object"
        ) {

            throw new Error(
                "Data backup bukan objek yang valid."
            );

        }


        if (
            !data.data ||
            typeof data.data !== "object"
        ) {

            throw new Error(
                "Struktur backup MAB-News tidak ditemukan."
            );

        }

    }


    /* =========================================================
       RESTORE LOCAL STORAGE
       ========================================================= */

    function restoreLocalStorage(
        data,
        overwrite
    ) {

        Object.entries(
            data
        ).forEach(
            ([category, values]) => {

                if (
                    !values ||
                    typeof values !== "object"
                ) {
                    return;
                }


                Object.entries(
                    values
                ).forEach(
                    ([key, value]) => {

                        if (
                            !overwrite &&
                            localStorage.getItem(
                                key
                            ) !== null
                        ) {

                            return;

                        }


                        const storedValue =
                            typeof value === "string"
                                ? value
                                : JSON.stringify(
                                    value
                                );


                        localStorage.setItem(
                            key,
                            storedValue
                        );

                    }
                );

            }
        );

    }


    /* =========================================================
       XML IMPORT
       ========================================================= */

    function parseXml(
        text
    ) {

        const parser =
            new DOMParser();


        const documentXml =
            parser.parseFromString(
                text,
                "application/xml"
            );


        const parserError =
            documentXml.querySelector(
                "parsererror"
            );


        if (parserError) {

            throw new Error(
                "XML tidak valid."
            );

        }


        return {
            format: "xml",
            importedAt:
                new Date().toISOString(),
            data:
                xmlNodeToObject(
                    documentXml.documentElement
                )
        };

    }


    function xmlNodeToObject(
        node
    ) {

        if (
            !node.children.length
        ) {

            return node.textContent;

        }


        const result = {};


        Array.from(
            node.children
        ).forEach(
            (child) => {

                const key =
                    child.nodeName;


                const value =
                    xmlNodeToObject(
                        child
                    );


                if (
                    Object.prototype.hasOwnProperty.call(
                        result,
                        key
                    )
                ) {

                    if (
                        !Array.isArray(
                            result[key]
                        )
                    ) {

                        result[key] = [
                            result[key]
                        ];

                    }

                    result[key].push(
                        value
                    );

                } else {

                    result[key] =
                        value;

                }

            }
        );


        return result;

    }


    /* =========================================================
       CSV IMPORT
       ========================================================= */

    function parseCsv(
        text
    ) {

        const lines =
            text
                .replace(
                    /^\uFEFF/,
                    ""
                )
                .split(/\r?\n/)
                .filter(
                    (line) =>
                        line.trim() !== ""
                );


        if (lines.length < 2) {

            return {
                format: "csv",
                importedAt:
                    new Date().toISOString(),
                data: {}
            };

        }


        const headers =
            parseCsvLine(
                lines[0]
            );


        const rows = [];


        for (
            let i = 1;
            i < lines.length;
            i++
        ) {

            const values =
                parseCsvLine(
                    lines[i]
                );


            const row = {};


            headers.forEach(
                (header, index) => {

                    row[header] =
                        values[index] ?? "";

                }
            );


            rows.push(row);

        }


        return {

            format: "csv",

            importedAt:
                new Date().toISOString(),

            data: {
                rows
            }

        };

    }


    function parseCsvLine(
        line
    ) {

        const result = [];

        let current = "";

        let insideQuotes = false;


        for (
            let i = 0;
            i < line.length;
            i++
        ) {

            const char =
                line[i];


            if (
                char === '"'
            ) {

                if (
                    insideQuotes &&
                    line[i + 1] === '"'
                ) {

                    current += '"';

                    i++;

                } else {

                    insideQuotes =
                        !insideQuotes;

                }

            } else if (
                char === "," &&
                !insideQuotes
            ) {

                result.push(
                    current
                );

                current = "";

            } else {

                current += char;

            }

        }


        result.push(
            current
        );


        return result;

    }


    /* =========================================================
       DETECT IMPORTED DATA
       ========================================================= */

    function detectImportedData(
        data
    ) {

        if (
            data?.selected &&
            Array.isArray(
                data.selected
            )
        ) {

            return data.selected
                .map(
                    (item) =>
                        capitalize(item)
                )
                .join(", ");

        }


        if (
            data?.data &&
            typeof data.data === "object"
        ) {

            return Object.keys(
                data.data
            )
                .map(
                    (item) =>
                        capitalize(item)
                )
                .join(", ");

        }


        return "Data Cadangan";

    }


    /* =========================================================
       HISTORY STORAGE
       ========================================================= */

    function getHistory() {

        try {

            const saved =
                localStorage.getItem(
                    HISTORY_KEY
                );


            if (!saved) {
                return [];
            }


            const data =
                JSON.parse(
                    saved
                );


            return Array.isArray(data)
                ? data
                : [];

        } catch {

            return [];

        }

    }


    function saveHistory(
        item
    ) {

        const history =
            getHistory();


        history.unshift(
            item
        );


        const limited =
            history.slice(
                0,
                30
            );


        try {

            localStorage.setItem(
                HISTORY_KEY,
                JSON.stringify(
                    limited
                )
            );

        } catch (error) {

            console.warn(
                "Riwayat tidak dapat disimpan:",
                error
            );

        }


        renderHistory();

    }


    /* =========================================================
       RENDER HISTORY
       ========================================================= */

    function renderHistory() {

        if (!historyBody) {
            return;
        }


        const history =
            getHistory();


        historyBody.innerHTML = "";


        if (!history.length) {

            const row =
                document.createElement(
                    "tr"
                );


            const cell =
                document.createElement(
                    "td"
                );


            cell.colSpan = 7;

            cell.className =
                "empty-history";


            cell.textContent =
                "Belum ada riwayat Export & Impor.";


            row.appendChild(
                cell
            );


            historyBody.appendChild(
                row
            );


            return;

        }


        history.forEach(
            (item) => {

                const row =
                    createHistoryRow(
                        item
                    );


                historyBody.appendChild(
                    row
                );

            }
        );

    }


    function createHistoryRow(
        item
    ) {

        const row =
            document.createElement(
                "tr"
            );


        const dateCell =
            document.createElement(
                "td"
            );


        dateCell.textContent =
            formatDateTime(
                item.createdAt
            );


        const typeCell =
            document.createElement(
                "td"
            );


        const typeBadge =
            document.createElement(
                "span"
            );


        typeBadge.className =
            `history-badge ${
                item.type === "Export"
                    ? "export"
                    : "import"
            }`;


        typeBadge.textContent =
            item.type;


        typeCell.appendChild(
            typeBadge
        );


        const dataCell =
            document.createElement(
                "td"
            );


        dataCell.textContent =
            item.data || "-";


        const formatCell =
            document.createElement(
                "td"
            );


        formatCell.textContent =
            item.format || "-";


        const sizeCell =
            document.createElement(
                "td"
            );


        sizeCell.textContent =
            item.size || "-";


        const statusCell =
            document.createElement(
                "td"
            );


        const status =
            document.createElement(
                "span"
            );


        status.className =
            "history-status";


        status.textContent =
            item.status || "Berhasil";


        statusCell.appendChild(
            status
        );


        const actionCell =
            document.createElement(
                "td"
            );


        const actions =
            document.createElement(
                "div"
            );


        actions.className =
            "history-actions";


        const downloadButton =
            document.createElement(
                "button"
            );


        downloadButton.type =
            "button";


        downloadButton.className =
            "table-download";


        downloadButton.innerHTML =
            '<i class="fa-solid fa-download"></i> Unduh';


        downloadButton.addEventListener(
            "click",
            () => {

                downloadHistoryItem(
                    item
                );

            }
        );


        const deleteButton =
            document.createElement(
                "button"
            );


        deleteButton.type =
            "button";


        deleteButton.className =
            "table-delete";


        deleteButton.innerHTML =
            '<i class="fa-regular fa-trash-can"></i>';


        deleteButton.title =
            "Hapus riwayat";


        deleteButton.addEventListener(
            "click",
            () => {

                deleteHistoryItem(
                    item.id
                );

            }
        );


        actions.appendChild(
            downloadButton
        );

        actions.appendChild(
            deleteButton
        );


        actionCell.appendChild(
            actions
        );


        row.appendChild(
            dateCell
        );

        row.appendChild(
            typeCell
        );

        row.appendChild(
            dataCell
        );

        row.appendChild(
            formatCell
        );

        row.appendChild(
            sizeCell
        );

        row.appendChild(
            statusCell
        );

        row.appendChild(
            actionCell
        );


        return row;

    }


    /* =========================================================
       DOWNLOAD HISTORY
       ========================================================= */

    function downloadHistoryItem(
        item
    ) {

        if (
            item.blobData
        ) {

            try {

                const blob =
                    base64ToBlob(
                        item.blobData
                    );


                downloadBlob(
                    blob,
                    item.filename ||
                        `mabnews-backup.${String(
                            item.format
                        ).toLowerCase()}`
                );


                return;

            } catch (error) {

                console.warn(
                    "Backup tersimpan tidak dapat dibaca:",
                    error
                );

            }

        }


        const selected =
            parseHistoryData(
                item.data
            );


        const backup =
            createBackupData(
                selected
            );


        const blob =
            createJsonBlob(
                backup
            );


        downloadBlob(
            blob,
            item.filename ||
                "mabnews-backup.json"
        );

    }


    function parseHistoryData(
        dataString
    ) {

        const mapping = {

            Artikel: "artikel",

            Kategori: "kategori",

            Media: "media",

            Pengguna: "pengguna",

            Pengaturan: "pengaturan"

        };


        if (
            !dataString ||
            dataString === "Semua Data"
        ) {

            return Object.entries(
                mapping
            ).map(
                ([label, key]) => ({
                    label,
                    key
                })
            );

        }


        return dataString
            .split(",")
            .map(
                (item) =>
                    item.trim()
            )
            .map(
                (label) => ({
                    label,
                    key:
                        mapping[label] ||
                        label.toLowerCase()
                })
            );

    }


    function base64ToBlob(
        dataUrl
    ) {

        const parts =
            dataUrl.split(",");


        const mime =
            parts[0]
                .match(
                    /:(.*?);/
                )?.[1] ||
            "application/octet-stream";


        const binary =
            atob(
                parts[1]
            );


        const bytes =
            new Uint8Array(
                binary.length
            );


        for (
            let i = 0;
            i < binary.length;
            i++
        ) {

            bytes[i] =
                binary.charCodeAt(i);

        }


        return new Blob(
            [bytes],
            {
                type: mime
            }
        );

    }


    /* =========================================================
       DELETE HISTORY
       ========================================================= */

    function deleteHistoryItem(
        id
    ) {

        const confirmed =
            confirm(
                "Apakah Anda yakin ingin menghapus riwayat ini?"
            );


        if (!confirmed) {
            return;
        }


        const history =
            getHistory()
                .filter(
                    (item) =>
                        item.id !== id
                );


        localStorage.setItem(
            HISTORY_KEY,
            JSON.stringify(
                history
            )
        );


        renderHistory();

    }


    /* =========================================================
       DATE
       ========================================================= */

    function formatDateTime(
        iso
    ) {

        if (!iso) {
            return "-";
        }


        const date =
            new Date(
                iso
            );


        const months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "Mei",
            "Jun",
            "Jul",
            "Agu",
            "Sep",
            "Okt",
            "Nov",
            "Des"
        ];


        const day =
            String(
                date.getDate()
            ).padStart(
                2,
                "0"
            );


        const month =
            months[
                date.getMonth()
            ];


        const year =
            date.getFullYear();


        const hour =
            String(
                date.getHours()
            ).padStart(
                2,
                "0"
            );


        const minute =
            String(
                date.getMinutes()
            ).padStart(
                2,
                "0"
            );


        return (
            `${day} ${month} ${year} ` +
            `${hour}:${minute}`
        );

    }


    /* =========================================================
       UTILITIES
       ========================================================= */

    function createId() {

        return (
            Date.now().toString(36) +
            Math.random()
                .toString(36)
                .substring(2, 8)
        );

    }


    function createTimestamp(
        date
    ) {

        const year =
            date.getFullYear();


        const month =
            String(
                date.getMonth() + 1
            ).padStart(
                2,
                "0"
            );


        const day =
            String(
                date.getDate()
            ).padStart(
                2,
                "0"
            );


        const hours =
            String(
                date.getHours()
            ).padStart(
                2,
                "0"
            );


        const minutes =
            String(
                date.getMinutes()
            ).padStart(
                2,
                "0"
            );


        return (
            `${year}-${month}-${day}` +
            `-${hours}${minutes}`
        );

    }


    function capitalize(
        text
    ) {

        if (!text) {
            return "";
        }


        return (
            text.charAt(0)
                .toUpperCase() +
            text.slice(1)
        );

    }


    /* =========================================================
       INITIAL RENDER
       ========================================================= */

    renderHistory();

});