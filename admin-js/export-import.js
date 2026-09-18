document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // =========================================================
    // DEFINISI ELEMEN DOM
    // =========================================================
    const dropzoneContainer = document.getElementById('dropzoneContainer');
    const hiddenFileInput = document.getElementById('hiddenFileInput');
    const triggerFileSelect = document.getElementById('triggerFileSelect');
    const dropzoneText = document.getElementById('dropzoneText');
    const exportForm = document.getElementById('exportForm');
    const btnExecuteImport = document.getElementById('btnExecuteImport');
    const historyTableRows = document.getElementById('historyTableRows');
    const checkAll = document.getElementById('checkAll');

    // =========================================================
    // SIDEBAR DROPDOWN
    // =========================================================
    const dropdowns = document.querySelectorAll('.dropdown-toggle');

    dropdowns.forEach(toggle => {
        toggle.addEventListener('click', event => {
            event.preventDefault();

            const parent = toggle.parentElement;

            if (parent) {
                parent.classList.toggle('open');
            }
        });
    });

    // =========================================================
    // CHECK ALL
    // =========================================================
    if (checkAll) {
        checkAll.addEventListener('change', event => {
            const checked = event.target.checked;
            const checkBoxes = document.querySelectorAll(
                'input[name="export_item"]'
            );

            checkBoxes.forEach(checkbox => {
                checkbox.checked = checked;
            });
        });
    }

    // =========================================================
    // FILE SELECT
    // =========================================================
    if (triggerFileSelect && hiddenFileInput) {
        triggerFileSelect.addEventListener('click', event => {
            event.preventDefault();
            event.stopPropagation();

            hiddenFileInput.click();
        });
    }

    if (dropzoneContainer && hiddenFileInput) {

        // Klik dropzone
        dropzoneContainer.addEventListener('click', event => {
            // Jangan trigger dua kali jika yang diklik adalah tombol
            if (
                triggerFileSelect &&
                (event.target === triggerFileSelect ||
                    triggerFileSelect.contains(event.target))
            ) {
                return;
            }

            hiddenFileInput.click();
        });

        // =====================================================
        // DRAG OVER
        // =====================================================
        dropzoneContainer.addEventListener('dragover', event => {
            event.preventDefault();
            event.stopPropagation();

            dropzoneContainer.style.borderColor = '#2563eb';
            dropzoneContainer.style.backgroundColor = '#eff6ff';
        });

        // =====================================================
        // DRAG ENTER
        // =====================================================
        dropzoneContainer.addEventListener('dragenter', event => {
            event.preventDefault();
            event.stopPropagation();

            dropzoneContainer.style.borderColor = '#2563eb';
            dropzoneContainer.style.backgroundColor = '#eff6ff';
        });

        // =====================================================
        // DRAG LEAVE
        // =====================================================
        dropzoneContainer.addEventListener('dragleave', event => {
            event.preventDefault();
            event.stopPropagation();

            // Hanya reset jika benar-benar meninggalkan dropzone
            if (!dropzoneContainer.contains(event.relatedTarget)) {
                resetDropzoneStyle();
            }
        });

        // =====================================================
        // DROP FILE
        // =====================================================
        dropzoneContainer.addEventListener('drop', event => {
            event.preventDefault();
            event.stopPropagation();

            resetDropzoneStyle();

            const files = event.dataTransfer?.files;

            if (!files || files.length === 0) {
                return;
            }

            const file = files[0];

            // Coba masukkan file ke input
            try {
                if (typeof DataTransfer !== 'undefined') {
                    const dataTransfer = new DataTransfer();

                    dataTransfer.items.add(file);
                    hiddenFileInput.files = dataTransfer.files;
                }
            } catch (error) {
                console.warn(
                    'Tidak dapat menetapkan file hasil drag & drop:',
                    error
                );
            }

            updateDropzoneUI(file);
        });

        // =====================================================
        // FILE INPUT CHANGE
        // =====================================================
        hiddenFileInput.addEventListener('change', event => {
            const files = event.target?.files;

            if (!files || files.length === 0) {
                return;
            }

            updateDropzoneUI(files[0]);
        });
    }

    // =========================================================
    // RESET DROPZONE STYLE
    // =========================================================
    function resetDropzoneStyle() {
        if (!dropzoneContainer) {
            return;
        }

        dropzoneContainer.style.borderColor = '#cbd5e1';
        dropzoneContainer.style.backgroundColor = '#f8fafc';
    }

    // =========================================================
    // UPDATE DROPZONE UI
    // =========================================================
    function updateDropzoneUI(file) {
        if (!dropzoneText || !file) {
            return;
        }

        const sizeMB = (file.size / 1024 / 1024).toFixed(2);

        // Gunakan textContent untuk menghindari HTML injection
        dropzoneText.textContent =
            `File siap: ${file.name} (${sizeMB} MB)`;
    }

    // =========================================================
    // EXPORT
    // =========================================================
    if (exportForm) {
        exportForm.addEventListener('submit', event => {
            event.preventDefault();

            const selectedItems = [];

            document
                .querySelectorAll('input[name="export_item"]:checked')
                .forEach(checkbox => {

                    // Abaikan opsi "semua"
                    if (checkbox.value === 'semua') {
                        return;
                    }

                    const labelContainer =
                        checkbox.parentNode?.querySelector('.checkbox-labels');

                    if (!labelContainer) {
                        return;
                    }

                    const labelMain =
                        labelContainer.querySelector('.label-main');

                    if (!labelMain) {
                        return;
                    }

                    const labelText =
                        labelMain.textContent.trim();

                    if (labelText) {
                        selectedItems.push(labelText);
                    }
                });

            // Tidak ada data dipilih
            if (selectedItems.length === 0) {
                alert(
                    'Silakan pilih minimal satu jenis data yang ingin diekspor!'
                );
                return;
            }

            // Format file
            const formatRadio =
                document.querySelector(
                    'input[name="file_format"]:checked'
                );

            const format =
                formatRadio?.value
                    ? formatRadio.value.toUpperCase()
                    : 'JSON';

            const dataString = selectedItems.join(', ');

            alert(
                `Membuat berkas ekspor data [ ${dataString} ] dengan format ${format}...`
            );

            // Simulasi proses export
            setTimeout(() => {
                appendLogToTable(
                    'Export',
                    dataString,
                    format,
                    '12.5 MB'
                );

                alert(
                    'Ekspor berhasil diselesaikan! Riwayat diperbarui.'
                );
            }, 1000);
        });
    }

    // =========================================================
    // IMPORT
    // =========================================================
    if (btnExecuteImport) {
        btnExecuteImport.addEventListener('click', () => {

            if (
                !hiddenFileInput ||
                !hiddenFileInput.files ||
                hiddenFileInput.files.length === 0
            ) {
                alert(
                    'Silakan tentukan berkas data impor terlebih dahulu!'
                );
                return;
            }

            const file = hiddenFileInput.files[0];

            if (!file) {
                alert(
                    'Berkas impor tidak ditemukan!'
                );
                return;
            }

            // Ambil ekstensi file
            const fileName = file.name || '';
            const extensionMatch =
                fileName.match(/\.([^.]+)$/);

            const format = extensionMatch
                ? extensionMatch[1].toUpperCase()
                : 'UNKNOWN';

            const sizeStr =
                `${(file.size / 1024 / 1024).toFixed(1)} MB`;

            alert(
                'Memproses unggahan data cadangan...'
            );

            // Simulasi proses import
            setTimeout(() => {

                appendLogToTable(
                    'Import',
                    'Data Cadangan Pengguna',
                    format,
                    sizeStr
                );

                alert(
                    'Restorasi berhasil! Struktur database CMS MAB-News telah diperbarui.'
                );

                // Reset dropzone
                if (dropzoneText) {
                    dropzoneText.textContent =
                        'Seret dan lepas file di sini atau klik untuk memilih file.';
                }

                if (hiddenFileInput) {
                    hiddenFileInput.value = '';
                }

                resetDropzoneStyle();

            }, 1200);
        });
    }

    // =========================================================
    // APPEND HISTORY LOG
    // =========================================================
    function appendLogToTable(
        type,
        dataName,
        format,
        size
    ) {
        if (!historyTableRows) {
            return;
        }

        const date = new Date();

        const months = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'Mei',
            'Jun',
            'Jul',
            'Agu',
            'Sep',
            'Okt',
            'Nov',
            'Des'
        ];

        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();

        const hours =
            String(date.getHours()).padStart(2, '0');

        const minutes =
            String(date.getMinutes()).padStart(2, '0');

        const dateString =
            `${day} ${month} ${year} ${hours}:${minutes}`;

        // =====================================================
        // Buat row
        // =====================================================
        const tr = document.createElement('tr');

        // Gunakan DOM API, bukan innerHTML untuk data dinamis
        const tdDate = document.createElement('td');
        tdDate.textContent = dateString;

        const tdType = document.createElement('td');

        const typeBadge = document.createElement('span');

        typeBadge.className =
            `pill-badge ${
                type === 'Export'
                    ? 'badge-blue'
                    : 'badge-green'
            }`;

        typeBadge.textContent = type;

        tdType.appendChild(typeBadge);

        const tdData = document.createElement('td');
        tdData.textContent = dataName;

        const tdFormat = document.createElement('td');
        tdFormat.textContent = format;

        const tdSize = document.createElement('td');
        tdSize.textContent = size;

        const tdStatus = document.createElement('td');

        const status = document.createElement('span');
        status.className = 'txt-success';
        status.textContent = 'Berhasil';

        tdStatus.appendChild(status);

        // =====================================================
        // ACTION
        // =====================================================
        const tdAction = document.createElement('td');
        tdAction.className = 'action-td';

        // Download
        const downloadBtn =
            document.createElement('button');

        downloadBtn.type = 'button';
        downloadBtn.className =
            'btn-table-action btn-download';

        const downloadIcon =
            document.createElement('i');

        downloadIcon.className =
            'fa-solid fa-download';

        downloadBtn.appendChild(downloadIcon);
        downloadBtn.appendChild(
            document.createTextNode(' Unduh')
        );

        // Delete
        const deleteBtn =
            document.createElement('button');

        deleteBtn.type = 'button';
        deleteBtn.className =
            'btn-table-delete';

        const deleteIcon =
            document.createElement('i');

        deleteIcon.className =
            'fa-regular fa-trash-can';

        deleteBtn.appendChild(deleteIcon);

        tdAction.appendChild(downloadBtn);
        tdAction.appendChild(deleteBtn);

        // =====================================================
        // Susun row
        // =====================================================
        tr.appendChild(tdDate);
        tr.appendChild(tdType);
        tr.appendChild(tdData);
        tr.appendChild(tdFormat);
        tr.appendChild(tdSize);
        tr.appendChild(tdStatus);
        tr.appendChild(tdAction);

        // Tambahkan di paling atas
        historyTableRows.insertBefore(
            tr,
            historyTableRows.firstChild
        );

        // Aktifkan tombol
        bindRowActions(tr);
    }

    // =========================================================
    // BIND ROW ACTIONS
    // =========================================================
    function bindRowActions(row) {
        if (!row) {
            return;
        }

        const deleteBtn =
            row.querySelector('.btn-table-delete');

        const downloadBtn =
            row.querySelector('.btn-download');

        // =====================================================
        // DELETE
        // =====================================================
        if (deleteBtn) {
            deleteBtn.addEventListener('click', () => {

                const confirmed = confirm(
                    'Apakah Anda ingin menghapus log riwayat ini dari tabel?'
                );

                if (!confirmed) {
                    return;
                }

                row.remove();
            });
        }

        // =====================================================
        // DOWNLOAD
        // =====================================================
        if (downloadBtn) {
            downloadBtn.addEventListener('click', () => {
                alert(
                    'Menyiapkan file cadangan data untuk diunduh ulang...'
                );
            });
        }
    }

    // =========================================================
    // BIND EXISTING ROWS
    // =========================================================
    if (historyTableRows) {
        historyTableRows
            .querySelectorAll('tr')
            .forEach(row => {
                bindRowActions(row);
            });
    }
});
