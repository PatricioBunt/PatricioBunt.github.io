
export default {
    title: 'Archive Manager',
    styles: `
        .archive-manager {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }

        .archive-mode-selector {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
        }

        .mode-button {
            flex: 1;
            padding: 12px 20px;
            background: var(--bg-secondary);
            border: 2px solid var(--border-color);
            border-radius: 6px;
            color: var(--text-primary);
            cursor: pointer;
            transition: all var(--transition-speed);
            font-weight: 500;
        }

        .mode-button:hover {
            background: var(--bg-hover);
            border-color: var(--accent-color);
        }

        .mode-button.active {
            background: var(--accent-color);
            border-color: var(--accent-color);
            color: white;
        }

        .drop-zone {
            border: 2px dashed var(--border-color);
            border-radius: 8px;
            padding: 40px;
            text-align: center;
            background: var(--bg-secondary);
            transition: all var(--transition-speed);
            cursor: pointer;
            position: relative;
        }

        .drop-zone:hover {
            border-color: var(--accent-color);
            background: var(--bg-hover);
        }

        .drop-zone.dragover {
            border-color: var(--accent-color);
            background: color-mix(in srgb, var(--accent-color) 10%, var(--bg-secondary));
        }

        .drop-zone input[type="file"] {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            opacity: 0;
            cursor: pointer;
        }

        .drop-zone-icon {
            font-size: 48px;
            color: var(--text-secondary);
            margin-bottom: 10px;
        }

        .drop-zone-text {
            color: var(--text-primary);
            font-size: 16px;
            margin-bottom: 5px;
        }

        .drop-zone-hint {
            color: var(--text-secondary);
            font-size: 13px;
        }

        .file-list {
            margin-top: 20px;
        }

        .file-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 12px;
            background: var(--bg-secondary);
            border: 1px solid var(--border-color);
            border-radius: 6px;
            margin-bottom: 8px;
        }

        .file-item-info {
            flex: 1;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .file-item-icon {
            color: var(--accent-color);
            font-size: 18px;
        }

        .file-item-details {
            flex: 1;
        }

        .file-item-name {
            font-weight: 500;
            color: var(--text-primary);
            margin-bottom: 4px;
        }

        .file-item-size {
            font-size: 12px;
            color: var(--text-secondary);
        }

        .file-item-actions {
            display: flex;
            gap: 8px;
        }

        .btn-small {
            padding: 6px 12px;
            font-size: 13px;
            border-radius: 4px;
        }

        .archive-tree {
            background: var(--bg-secondary);
            border: 1px solid var(--border-color);
            border-radius: 6px;
            padding: 15px;
            max-height: 400px;
            overflow-y: auto;
            font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
            font-size: 13px;
        }

        .tree-item {
            padding: 6px 0;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 6px;
            transition: background-color 0.1s;
            border-radius: 3px;
        }

        .tree-item:hover {
            background: var(--bg-hover);
        }

        .tree-item.selected {
            background: color-mix(in srgb, var(--accent-color) 15%, transparent);
        }

        .tree-icon {
            width: 16px;
            text-align: center;
            color: var(--text-secondary);
        }

        .tree-name {
            flex: 1;
            color: var(--text-primary);
        }

        .tree-size {
            color: var(--text-secondary);
            font-size: 11px;
            margin-left: 10px;
        }

        .tree-extract-btn {
            padding: 4px 8px;
            font-size: 11px;
            opacity: 0;
            transition: opacity 0.2s;
        }

        .tree-item:hover .tree-extract-btn {
            opacity: 1;
        }

        .progress-container {
            margin-top: 15px;
            display: none;
        }

        .progress-container.active {
            display: block;
        }

        .progress-bar {
            width: 100%;
            height: 8px;
            background: var(--bg-tertiary);
            border-radius: 4px;
            overflow: hidden;
            margin-bottom: 8px;
        }

        .progress-fill {
            height: 100%;
            background: var(--accent-color);
            transition: width 0.3s;
            width: 0%;
        }

        .progress-text {
            font-size: 12px;
            color: var(--text-secondary);
            text-align: center;
        }

        .file-size-info {
            display: flex;
            justify-content: space-between;
            padding: 10px;
            background: var(--bg-secondary);
            border-radius: 6px;
            margin-top: 10px;
            font-size: 13px;
        }

        .file-size-label {
            color: var(--text-secondary);
        }

        .file-size-value {
            color: var(--text-primary);
            font-weight: 500;
        }

        .compression-options {
            display: flex;
            gap: 15px;
            align-items: center;
            margin-top: 15px;
        }

        .compression-options label {
            display: flex;
            align-items: center;
            gap: 8px;
            color: var(--text-primary);
            font-size: 14px;
        }

        .compression-options select {
            padding: 8px 12px;
            background: var(--bg-secondary);
            border: 1px solid var(--border-color);
            border-radius: 4px;
            color: var(--text-primary);
            font-size: 14px;
        }

        .warning-message {
            padding: 12px;
            background: color-mix(in srgb, #ff9800 15%, transparent);
            border: 1px solid #ff9800;
            border-radius: 6px;
            color: #ff9800;
            margin-top: 10px;
            display: none;
        }

        .warning-message.show {
            display: block;
        }

        .error-message {
            padding: 12px;
            background: color-mix(in srgb, #f44336 15%, transparent);
            border: 1px solid #f44336;
            border-radius: 6px;
            color: #f44336;
            margin-top: 10px;
            display: none;
        }

        .error-message.show {
            display: block;
        }

        .archive-type-selector {
            display: flex;
            gap: 10px;
            margin-bottom: 15px;
        }

        .type-button {
            flex: 1;
            padding: 10px;
            background: var(--bg-secondary);
            border: 1px solid var(--border-color);
            border-radius: 6px;
            color: var(--text-primary);
            cursor: pointer;
            transition: all var(--transition-speed);
            text-align: center;
        }

        .type-button:hover {
            background: var(--bg-hover);
            border-color: var(--accent-color);
        }

        .type-button.active {
            background: var(--accent-color);
            border-color: var(--accent-color);
            color: white;
        }
    `,
    html: `
        <div class="tool-info">
            Compress and decompress files using GZIP, ZIP, TAR, and TAR.GZ formats. Supports drag-and-drop, file tree browsing, and individual file extraction.
        </div>
        <div class="tool-section">
            <div class="archive-manager">
                <div class="archive-mode-selector">
                    <button class="mode-button active" id="compress-mode" onclick="setArchiveMode('compress')">
                        <i class="fas fa-compress"></i> Compress
                    </button>
                    <button class="mode-button" id="extract-mode" onclick="setArchiveMode('extract')">
                        <i class="fas fa-expand"></i> Extract
                    </button>
                </div>

                <div id="compress-panel">
                    <div class="archive-type-selector">
                        <button class="type-button active" data-type="gzip" onclick="setArchiveType('gzip')">GZIP (.gz)</button>
                        <button class="type-button" data-type="zip" onclick="setArchiveType('zip')">ZIP (.zip)</button>
                        <button class="type-button" data-type="tar" onclick="setArchiveType('tar')">TAR (.tar)</button>
                        <button class="type-button" data-type="targz" onclick="setArchiveType('targz')">TAR.GZ (.tar.gz)</button>
                    </div>

                    <div class="drop-zone" id="compress-drop-zone">
                        <input type="file" id="compress-input" multiple>
                        <div class="drop-zone-icon">
                            <i class="fas fa-cloud-upload-alt"></i>
                        </div>
                        <div class="drop-zone-text">Drop files here or click to select</div>
                        <div class="drop-zone-hint">For GZIP: single file only. For ZIP/TAR: multiple files supported</div>
                    </div>

                    <div id="compress-file-list" class="file-list"></div>

                    <div class="compression-options" id="compression-options" style="display: none;">
                        <label>
                            Compression Level:
                            <select id="compression-level">
                                <option value="1">1 - Fastest</option>
                                <option value="3">3</option>
                                <option value="6" selected>6 - Balanced</option>
                                <option value="9">9 - Best</option>
                            </select>
                        </label>
                    </div>

                    <div class="file-size-info" id="compress-size-info" style="display: none;">
                        <span class="file-size-label">Original Size:</span>
                        <span class="file-size-value" id="original-size">-</span>
                        <span class="file-size-label">Compressed Size:</span>
                        <span class="file-size-value" id="compressed-size">-</span>
                    </div>

                    <div class="progress-container" id="compress-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" id="compress-progress-fill"></div>
                        </div>
                        <div class="progress-text" id="compress-progress-text">0%</div>
                    </div>

                    <div class="warning-message" id="compress-warning"></div>
                    <div class="error-message" id="compress-error"></div>

                    <div style="margin-top: 20px;">
                        <button class="tool-button" id="compress-btn" onclick="startCompression()" disabled>
                            <i class="fas fa-compress"></i> Compress
                        </button>
                        <button class="tool-button secondary" onclick="clearCompress()">
                            <i class="fas fa-times"></i> Clear
                        </button>
                    </div>

                    <div id="compress-download" style="margin-top: 15px; display: none;">
                        <a id="compress-download-link" class="tool-button" download>
                            <i class="fas fa-download"></i> Download Compressed File
                        </a>
                    </div>
                </div>

                <div id="extract-panel" style="display: none;">
                    <div class="drop-zone" id="extract-drop-zone">
                        <input type="file" id="extract-input" accept=".gz,.zip,.tar,.tgz,.tar.gz">
                        <div class="drop-zone-icon">
                            <i class="fas fa-file-archive"></i>
                        </div>
                        <div class="drop-zone-text">Drop archive here or click to select</div>
                        <div class="drop-zone-hint">Supports .gz, .zip, .tar, .tar.gz files</div>
                    </div>

                    <div id="extract-archive-tree" class="archive-tree" style="display: none;"></div>

                    <div class="progress-container" id="extract-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" id="extract-progress-fill"></div>
                        </div>
                        <div class="progress-text" id="extract-progress-text">0%</div>
                    </div>

                    <div class="warning-message" id="extract-warning"></div>
                    <div class="error-message" id="extract-error"></div>

                    <div style="margin-top: 20px;">
                        <button class="tool-button" id="extract-all-btn" onclick="extractAll()" style="display: none;">
                            <i class="fas fa-expand"></i> Extract All
                        </button>
                        <button class="tool-button secondary" onclick="clearExtract()">
                            <i class="fas fa-times"></i> Clear
                        </button>
                    </div>

                    <div id="extract-download" style="margin-top: 15px;"></div>
                </div>
            </div>
        </div>
    `,
    async init() {

        let currentMode = 'compress';
        let currentType = 'gzip';
        let compressFiles = [];
        let extractArchive = null;
        let extractType = null;
        let compressionWorker = null;

        // Load libraries
        window.setArchiveMode = (mode) => {
            currentMode = mode;
            const compressPanel = document.getElementById('compress-panel');
            const extractPanel = document.getElementById('extract-panel');
            const compressModeBtn = document.getElementById('compress-mode');
            const extractModeBtn = document.getElementById('extract-mode');

            if (mode === 'compress') {
                compressPanel.style.display = 'block';
                extractPanel.style.display = 'none';
                compressModeBtn.classList.add('active');
                extractModeBtn.classList.remove('active');
            } else {
                compressPanel.style.display = 'none';
                extractPanel.style.display = 'block';
                compressModeBtn.classList.remove('active');
                extractModeBtn.classList.add('active');
            }
        };

        window.setArchiveType = (type) => {
            currentType = type;
            document.querySelectorAll('.type-button').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.type === type);
            });

            const compressInput = document.getElementById('compress-input');
            if (type === 'gzip') {
                compressInput.removeAttribute('multiple');
            } else {
                compressInput.setAttribute('multiple', '');
            }

            const options = document.getElementById('compression-options');
            if (type === 'gzip' || type === 'targz') {
                options.style.display = 'flex';
            } else {
                options.style.display = 'none';
            }
        };

        // Setup compress drop zone
        const compressDropZone = document.getElementById('compress-drop-zone');
        const compressInput = document.getElementById('compress-input');

        compressDropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            compressDropZone.classList.add('dragover');
        });

        compressDropZone.addEventListener('dragleave', () => {
            compressDropZone.classList.remove('dragover');
        });

        compressDropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            compressDropZone.classList.remove('dragover');
            handleCompressFiles(Array.from(e.dataTransfer.files));
        });

        compressInput.addEventListener('change', (e) => {
            handleCompressFiles(Array.from(e.target.files));
        });

        function handleCompressFiles(files) {
            if (currentType === 'gzip' && files.length > 1) {
                showError('compress-error', 'GZIP only supports single file compression');
                return;
            }

            compressFiles = files;
            updateCompressFileList();
            document.getElementById('compress-btn').disabled = files.length === 0;
            hideError('compress-error');
            hideWarning('compress-warning');

            // Check file sizes
            const totalSize = files.reduce((sum, f) => sum + f.size, 0);
            if (totalSize > 100 * 1024 * 1024) {
                showWarning('compress-warning', `Large file detected (${formatFileSize(totalSize)}). Compression may take a while.`);
            }
        }

        function updateCompressFileList() {
            const list = document.getElementById('compress-file-list');
            list.innerHTML = compressFiles.map((file, index) => `
                <div class="file-item">
                    <div class="file-item-info">
                        <i class="fas fa-file file-item-icon"></i>
                        <div class="file-item-details">
                            <div class="file-item-name">${file.name}</div>
                            <div class="file-item-size">${formatFileSize(file.size)}</div>
                        </div>
                    </div>
                    <div class="file-item-actions">
                        <button class="tool-button secondary btn-small" onclick="removeCompressFile(${index})">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
            `).join('');
        }

        window.removeCompressFile = (index) => {
            compressFiles.splice(index, 1);
            updateCompressFileList();
            document.getElementById('compress-btn').disabled = compressFiles.length === 0;
        };

        window.startCompression = async () => {
            if (compressFiles.length === 0) return;

            const progressContainer = document.getElementById('compress-progress');
            const progressFill = document.getElementById('compress-progress-fill');
            const progressText = document.getElementById('compress-progress-text');
            const compressBtn = document.getElementById('compress-btn');
            const downloadDiv = document.getElementById('compress-download');
            const sizeInfo = document.getElementById('compress-size-info');

            progressContainer.classList.add('active');
            compressBtn.disabled = true;
            downloadDiv.style.display = 'none';
            hideError('compress-error');

            try {
                updateProgress(0, 'Starting compression...');

                let result;
                const originalSize = compressFiles.reduce((sum, f) => sum + f.size, 0);

                if (currentType === 'gzip') {
                    result = await compressGzip(compressFiles[0], progressFill, progressText);
                } else if (currentType === 'zip') {
                    result = await compressZip(compressFiles, progressFill, progressText);
                } else if (currentType === 'tar') {
                    result = await compressTar(compressFiles, progressFill, progressText);
                } else if (currentType === 'targz') {
                    result = await compressTarGz(compressFiles, progressFill, progressText);
                }

                updateProgress(100, 'Compression complete!');
                sizeInfo.style.display = 'flex';
                document.getElementById('original-size').textContent = formatFileSize(originalSize);
                document.getElementById('compressed-size').textContent = formatFileSize(result.size);

                const blob = new Blob([result.data], { type: result.mimeType });
                const url = URL.createObjectURL(blob);
                const link = document.getElementById('compress-download-link');
                link.href = url;
                link.download = result.filename;
                downloadDiv.style.display = 'block';

            } catch (error) {
                showError('compress-error', `Compression failed: ${error.message}`);
                console.error('Compression error:', error);
            } finally {
                compressBtn.disabled = false;
                setTimeout(() => {
                    progressContainer.classList.remove('active');
                }, 2000);
            }
        };

        // Setup extract drop zone
        const extractDropZone = document.getElementById('extract-drop-zone');
        const extractInput = document.getElementById('extract-input');

        extractDropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            extractDropZone.classList.add('dragover');
        });

        extractDropZone.addEventListener('dragleave', () => {
            extractDropZone.classList.remove('dragover');
        });

        extractDropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            extractDropZone.classList.remove('dragover');
            if (e.dataTransfer.files.length > 0) {
                handleExtractFile(e.dataTransfer.files[0]);
            }
        });

        extractInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                handleExtractFile(e.target.files[0]);
            }
        });

        async function handleExtractFile(file) {
            extractArchive = file;
            hideError('extract-error');
            hideWarning('extract-warning');

            // Detect file type
            const filename = file.name.toLowerCase();
            if (filename.endsWith('.gz') && !filename.endsWith('.tar.gz')) {
                extractType = 'gzip';
            } else if (filename.endsWith('.zip')) {
                extractType = 'zip';
            } else if (filename.endsWith('.tar')) {
                extractType = 'tar';
            } else if (filename.endsWith('.tar.gz') || filename.endsWith('.tgz')) {
                extractType = 'targz';
            } else {
                showError('extract-error', 'Unsupported file type. Please use .gz, .zip, .tar, or .tar.gz files.');
                return;
            }

            if (file.size > 100 * 1024 * 1024) {
                showWarning('extract-warning', `Large file detected (${formatFileSize(file.size)}). Extraction may take a while.`);
            }

            // Show file tree for archives
            if (extractType === 'zip' || extractType === 'tar' || extractType === 'targz') {
                try {
                    await showArchiveTree(file, extractType);
                    document.getElementById('extract-all-btn').style.display = 'inline-block';
                } catch (error) {
                    showError('extract-error', `Failed to read archive: ${error.message}`);
                }
            } else {
                document.getElementById('extract-all-btn').style.display = 'inline-block';
            }
        }

        async function showArchiveTree(file, type) {
            const tree = document.getElementById('extract-archive-tree');
            tree.innerHTML = '<div style="padding: 10px; color: var(--text-secondary);">Loading archive structure...</div>';
            tree.style.display = 'block';

            try {
                let fileList = [];
                if (type === 'zip') {
                    fileList = await getZipFileList(file);
                } else if (type === 'tar' || type === 'targz') {
                    fileList = await getTarFileList(file, type === 'targz');
                }

                if (fileList.length === 0) {
                    tree.innerHTML = '<div style="padding: 10px; color: var(--text-secondary);">Archive is empty</div>';
                    return;
                }

                tree.innerHTML = fileList.map((item, index) => `
                    <div class="tree-item" data-index="${index}">
                        <span class="tree-icon">${item.isDirectory ? '📁' : '📄'}</span>
                        <span class="tree-name">${item.name}</span>
                        ${!item.isDirectory ? `<span class="tree-size">${formatFileSize(item.size)}</span>` : ''}
                        ${!item.isDirectory ? `<button class="tool-button secondary btn-small tree-extract-btn" onclick="extractSingleFile(${index}, event)">Extract</button>` : ''}
                    </div>
                `).join('');

            } catch (error) {
                tree.innerHTML = `<div style="padding: 10px; color: var(--error-color);">Error: ${error.message}</div>`;
                throw error;
            }
        }

        window.extractSingleFile = async (index, event) => {
            event.stopPropagation();
            const progressContainer = document.getElementById('extract-progress');
            const progressFill = document.getElementById('extract-progress-fill');
            const progressText = document.getElementById('extract-progress-text');

            progressContainer.classList.add('active');
            hideError('extract-error');

            try {
                updateProgress(0, 'Extracting file...');

                let fileList = [];
                if (extractType === 'zip') {
                    fileList = await getZipFileList(extractArchive);
                } else if (extractType === 'tar' || extractType === 'targz') {
                    fileList = await getTarFileList(extractArchive, extractType === 'targz');
                }

                const fileItem = fileList[index];
                if (!fileItem || fileItem.isDirectory) return;

                let result;
                if (extractType === 'zip') {
                    result = await extractZipFile(extractArchive, fileItem.name, progressFill, progressText);
                } else if (extractType === 'tar' || extractType === 'targz') {
                    result = await extractTarFile(extractArchive, fileItem.name, extractType === 'targz', progressFill, progressText);
                }

                updateProgress(100, 'Extraction complete!');
                downloadFile(result.data, result.filename);

            } catch (error) {
                showError('extract-error', `Extraction failed: ${error.message}`);
            } finally {
                setTimeout(() => {
                    progressContainer.classList.remove('active');
                }, 2000);
            }
        };

        window.extractAll = async () => {
            const progressContainer = document.getElementById('extract-progress');
            const progressFill = document.getElementById('extract-progress-fill');
            const progressText = document.getElementById('extract-progress-text');
            const extractBtn = document.getElementById('extract-all-btn');
            const downloadDiv = document.getElementById('extract-download');

            progressContainer.classList.add('active');
            extractBtn.disabled = true;
            downloadDiv.innerHTML = '';
            hideError('extract-error');

            try {
                updateProgress(0, 'Extracting archive...');

                let results;
                if (extractType === 'gzip') {
                    results = await extractGzip(extractArchive, progressFill, progressText);
                } else if (extractType === 'zip') {
                    results = await extractZip(extractArchive, progressFill, progressText);
                } else if (extractType === 'tar') {
                    results = await extractTar(extractArchive, false, progressFill, progressText);
                } else if (extractType === 'targz') {
                    results = await extractTar(extractArchive, true, progressFill, progressText);
                }

                updateProgress(100, 'Extraction complete!');

                if (Array.isArray(results)) {
                    results.forEach(result => {
                        const link = document.createElement('a');
                        link.className = 'tool-button';
                        link.style.display = 'block';
                        link.style.marginBottom = '10px';
                        link.href = URL.createObjectURL(new Blob([result.data]));
                        link.download = result.filename;
                        link.innerHTML = `<i class="fas fa-download"></i> Download ${result.filename}`;
                        downloadDiv.appendChild(link);
                    });
                } else {
                    const link = document.createElement('a');
                    link.className = 'tool-button';
                    link.href = URL.createObjectURL(new Blob([results.data]));
                    link.download = results.filename;
                    link.innerHTML = `<i class="fas fa-download"></i> Download ${results.filename}`;
                    downloadDiv.appendChild(link);
                }

            } catch (error) {
                showError('extract-error', `Extraction failed: ${error.message}`);
                console.error('Extraction error:', error);
            } finally {
                extractBtn.disabled = false;
                setTimeout(() => {
                    progressContainer.classList.remove('active');
                }, 2000);
            }
        };

        window.clearCompress = () => {
            compressFiles = [];
            updateCompressFileList();
            document.getElementById('compress-input').value = '';
            document.getElementById('compress-btn').disabled = true;
            document.getElementById('compress-download').style.display = 'none';
            document.getElementById('compress-size-info').style.display = 'none';
            document.getElementById('compress-progress').classList.remove('active');
            hideError('compress-error');
            hideWarning('compress-warning');
        };

        window.clearExtract = () => {
            extractArchive = null;
            extractType = null;
            document.getElementById('extract-input').value = '';
            document.getElementById('extract-archive-tree').style.display = 'none';
            document.getElementById('extract-all-btn').style.display = 'none';
            document.getElementById('extract-download').innerHTML = '';
            document.getElementById('extract-progress').classList.remove('active');
            hideError('extract-error');
            hideWarning('extract-warning');
        };

        // Helper functions
        function formatFileSize(bytes) {
            if (bytes === 0) return '0 B';
            const k = 1024;
            const sizes = ['B', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
        }

        function updateProgress(percent, text) {
            const progressFill = document.getElementById(currentMode === 'compress' ? 'compress-progress-fill' : 'extract-progress-fill');
            const progressText = document.getElementById(currentMode === 'compress' ? 'compress-progress-text' : 'extract-progress-text');
            if (progressFill) progressFill.style.width = percent + '%';
            if (progressText) progressText.textContent = text || `${percent}%`;
        }

        function showError(id, message) {
            const el = document.getElementById(id);
            if (el) {
                el.textContent = message;
                el.classList.add('show');
            }
        }

        function hideError(id) {
            const el = document.getElementById(id);
            if (el) el.classList.remove('show');
        }

        function showWarning(id, message) {
            const el = document.getElementById(id);
            if (el) {
                el.textContent = message;
                el.classList.add('show');
            }
        }

        function hideWarning(id) {
            const el = document.getElementById(id);
            if (el) el.classList.remove('show');
        }

        function downloadFile(data, filename) {
            const blob = new Blob([data]);
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = filename;
            link.click();
            URL.revokeObjectURL(url);
        }

        // Compression functions
        async function compressGzip(file, progressFill, progressText) {
            const level = parseInt(document.getElementById('compression-level').value) || 6;
            const arrayBuffer = await file.arrayBuffer();
            const uint8Array = new Uint8Array(arrayBuffer);
            
            updateProgress(50, 'Compressing with GZIP...');
            const compressed = pako.gzip(uint8Array, { level });
            
            updateProgress(100, 'Complete!');
            return {
                data: compressed,
                filename: file.name + '.gz',
                mimeType: 'application/gzip',
                size: compressed.length
            };
        }

        async function compressZip(files, progressFill, progressText) {
            const zip = new JSZip();
            const total = files.length;
            
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                updateProgress((i / total) * 90, `Adding ${file.name}...`);
                const arrayBuffer = await file.arrayBuffer();
                zip.file(file.name, arrayBuffer);
            }
            
            updateProgress(95, 'Creating ZIP archive...');
            const blob = await zip.generateAsync({ type: 'uint8array' });
            
            updateProgress(100, 'Complete!');
            return {
                data: blob,
                filename: 'archive.zip',
                mimeType: 'application/zip',
                size: blob.length
            };
        }

        async function compressTar(files, progressFill, progressText) {
            const TarWriter = window.tarjs?.TarWriter || window.TarWriter;
            if (!TarWriter) {
                throw new Error('TAR library not loaded');
            }
            
            const tar = new TarWriter();
            const total = files.length;
            
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                updateProgress((i / total) * 90, `Adding ${file.name}...`);
                const arrayBuffer = await file.arrayBuffer();
                // Convert ArrayBuffer to Uint8Array
                const uint8Array = new Uint8Array(arrayBuffer);
                tar.add(file.name, uint8Array);
            }
            
            updateProgress(95, 'Creating TAR archive...');
            const tarData = tar.write();
            
            updateProgress(100, 'Complete!');
            return {
                data: tarData,
                filename: 'archive.tar',
                mimeType: 'application/x-tar',
                size: tarData.length
            };
        }

        async function compressTarGz(files, progressFill, progressText) {
            // First create TAR
            const tarResult = await compressTar(files, progressFill, progressText);
            
            // Then compress with GZIP
            updateProgress(95, 'Compressing TAR with GZIP...');
            const level = parseInt(document.getElementById('compression-level').value) || 6;
            const compressed = pako.gzip(tarResult.data, { level });
            
            updateProgress(100, 'Complete!');
            return {
                data: compressed,
                filename: 'archive.tar.gz',
                mimeType: 'application/gzip',
                size: compressed.length
            };
        }

        // Extraction functions
        async function extractGzip(file, progressFill, progressText) {
            updateProgress(50, 'Decompressing GZIP...');
            const arrayBuffer = await file.arrayBuffer();
            const uint8Array = new Uint8Array(arrayBuffer);
            const decompressed = pako.ungzip(uint8Array);
            
            updateProgress(100, 'Complete!');
            const filename = file.name.endsWith('.gz') ? file.name.slice(0, -3) : file.name + '.extracted';
            
            return {
                data: decompressed,
                filename: filename
            };
        }

        async function getZipFileList(file) {
            const arrayBuffer = await file.arrayBuffer();
            const zip = await JSZip.loadAsync(arrayBuffer);
            const fileList = [];
            
            zip.forEach((relativePath, file) => {
                fileList.push({
                    name: relativePath,
                    size: file._data ? file._data.uncompressedSize : 0,
                    isDirectory: file.dir
                });
            });
            
            return fileList.sort((a, b) => {
                if (a.isDirectory && !b.isDirectory) return -1;
                if (!a.isDirectory && b.isDirectory) return 1;
                return a.name.localeCompare(b.name);
            });
        }

        async function extractZip(file, progressFill, progressText) {
            const arrayBuffer = await file.arrayBuffer();
            const zip = await JSZip.loadAsync(arrayBuffer);
            const results = [];
            const files = [];
            
            zip.forEach((relativePath, file) => {
                if (!file.dir) {
                    files.push({ path: relativePath, file });
                }
            });
            
            const total = files.length;
            for (let i = 0; i < files.length; i++) {
                const { path, file: zipFile } = files[i];
                updateProgress((i / total) * 100, `Extracting ${path}...`);
                const data = await zipFile.async('uint8array');
                results.push({
                    data: data,
                    filename: path.split('/').pop()
                });
            }
            
            updateProgress(100, 'Complete!');
            return results;
        }

        async function extractZipFile(file, filename, progressFill, progressText) {
            const arrayBuffer = await file.arrayBuffer();
            const zip = await JSZip.loadAsync(arrayBuffer);
            const zipFile = zip.file(filename);
            
            if (!zipFile) {
                throw new Error(`File ${filename} not found in archive`);
            }
            
            updateProgress(50, `Extracting ${filename}...`);
            const data = await zipFile.async('uint8array');
            updateProgress(100, 'Complete!');
            
            return {
                data: data,
                filename: filename
            };
        }

        async function getTarFileList(file, isGzipped) {
            let arrayBuffer = await file.arrayBuffer();
            
            if (isGzipped) {
                const uint8Array = new Uint8Array(arrayBuffer);
                arrayBuffer = pako.ungzip(uint8Array).buffer;
            }
            
            const TarReader = window.tarjs?.TarReader || window.TarReader;
            if (!TarReader) {
                throw new Error('TAR library not loaded');
            }
            
            const tar = TarReader.read(arrayBuffer);
            const fileList = [];
            
            for (let i = 0; i < tar.length; i++) {
                const entry = tar[i];
                fileList.push({
                    name: entry.name,
                    size: entry.size,
                    isDirectory: entry.type === 'directory' || entry.type === 'dir'
                });
            }
            
            return fileList.sort((a, b) => {
                if (a.isDirectory && !b.isDirectory) return -1;
                if (!a.isDirectory && b.isDirectory) return 1;
                return a.name.localeCompare(b.name);
            });
        }

        async function extractTar(file, isGzipped, progressFill, progressText) {
            let arrayBuffer = await file.arrayBuffer();
            
            if (isGzipped) {
                updateProgress(10, 'Decompressing GZIP...');
                const uint8Array = new Uint8Array(arrayBuffer);
                arrayBuffer = pako.ungzip(uint8Array).buffer;
            }
            
            updateProgress(20, 'Reading TAR archive...');
            const TarReader = window.tarjs?.TarReader || window.TarReader;
            if (!TarReader) {
                throw new Error('TAR library not loaded');
            }
            
            const tar = TarReader.read(arrayBuffer);
            const results = [];
            
            const total = tar.length;
            for (let i = 0; i < tar.length; i++) {
                const entry = tar[i];
                if (entry.type !== 'directory' && entry.type !== 'dir') {
                    updateProgress(20 + (i / total) * 80, `Extracting ${entry.name}...`);
                    results.push({
                        data: entry.read(),
                        filename: entry.name.split('/').pop()
                    });
                }
            }
            
            updateProgress(100, 'Complete!');
            return results;
        }

        async function extractTarFile(file, filename, isGzipped, progressFill, progressText) {
            let arrayBuffer = await file.arrayBuffer();
            
            if (isGzipped) {
                updateProgress(10, 'Decompressing GZIP...');
                const uint8Array = new Uint8Array(arrayBuffer);
                arrayBuffer = pako.ungzip(uint8Array).buffer;
            }
            
            updateProgress(30, 'Reading TAR archive...');
            const TarReader = window.tarjs?.TarReader || window.TarReader;
            if (!TarReader) {
                throw new Error('TAR library not loaded');
            }
            
            const tar = TarReader.read(arrayBuffer);
            
            // Find entry by name (tar is an array, not an object with find method)
            let entry = null;
            for (let i = 0; i < tar.length; i++) {
                const e = tar[i];
                if (e.name === filename || e.name.endsWith('/' + filename)) {
                    entry = e;
                    break;
                }
            }
            
            if (!entry) {
                throw new Error(`File ${filename} not found in archive`);
            }
            
            updateProgress(80, `Extracting ${filename}...`);
            const data = entry.read();
            updateProgress(100, 'Complete!');
            
            return {
                data: data,
                filename: filename
            };
        }

        // Load required libraries
        async function loadLibraries() {
            if (window.pako && window.JSZip && window.tarjs) {
                return; // Already loaded
            }

            return Promise.all([
                new Promise((resolve, reject) => {
                    if (window.pako) {
                        resolve();
                        return;
                    }
                    const script = document.createElement('script');
                    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pako/2.1.0/pako.min.js';
                    script.onload = resolve;
                    script.onerror = reject;
                    document.head.appendChild(script);
                }),
                new Promise((resolve, reject) => {
                    if (window.JSZip) {
                        resolve();
                        return;
                    }
                    const script = document.createElement('script');
                    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js';
                    script.onload = resolve;
                    script.onerror = reject;
                    document.head.appendChild(script);
                }),
                new Promise((resolve) => {
                    // Implement browser-compatible TAR writer/reader
                    // Since tar-js uses Node.js require, we'll implement our own simple TAR handler
                    
                    if (!window.tarjs) {
                        // Simple TAR Writer
                        class TarWriter {
                            constructor() {
                                this.files = [];
                            }
                            
                            add(name, data) {
                                // Ensure data is a Uint8Array
                                const uint8Data = data instanceof Uint8Array ? data : new Uint8Array(data);
                                this.files.push({ name, data: uint8Data });
                            }
                            
                            write() {
                                let tarData = new Uint8Array(0);
                                
                                for (const file of this.files) {
                                    // Ensure we have a valid size
                                    const size = file.data ? file.data.length : 0;
                                    if (size === undefined || size === null) {
                                        throw new Error(`Invalid file data for ${file.name}`);
                                    }
                                    
                                    const header = this.createHeader(file.name, size);
                                    const paddedData = this.padData(file.data);
                                    const combined = new Uint8Array(tarData.length + header.length + paddedData.length);
                                    combined.set(tarData, 0);
                                    combined.set(header, tarData.length);
                                    combined.set(paddedData, tarData.length + header.length);
                                    tarData = combined;
                                }
                                
                                // Add two empty blocks at the end
                                const endBlocks = new Uint8Array(1024);
                                const final = new Uint8Array(tarData.length + endBlocks.length);
                                final.set(tarData, 0);
                                final.set(endBlocks, tarData.length);
                                
                                return final;
                            }
                            
                            createHeader(name, size) {
                                const header = new Uint8Array(512);
                                const nameBytes = new TextEncoder().encode(name);
                                
                                // Copy name (max 100 bytes)
                                header.set(nameBytes.slice(0, 100), 0);
                                
                                // File mode (100-107)
                                this.writeOctal(header, 100, 8, '0000644');
                                
                                // UID (108-115)
                                this.writeOctal(header, 108, 8, '0000000');
                                
                                // GID (116-123)
                                this.writeOctal(header, 116, 8, '0000000');
                                
                                // Size (124-135) - ensure size is a valid number
                                const fileSize = typeof size === 'number' ? size : 0;
                                const sizeOctal = fileSize.toString(8);
                                this.writeOctal(header, 124, 12, sizeOctal);
                                
                                // Modification time (136-147)
                                const mtime = Math.floor(Date.now() / 1000).toString(8);
                                this.writeOctal(header, 136, 12, mtime);
                                
                                // Type flag (156) - regular file
                                header[156] = 0x30; // '0'
                                
                                // Calculate checksum
                                header.set(new TextEncoder().encode('        '), 148); // Clear checksum field
                                let checksum = 0;
                                for (let i = 0; i < 512; i++) {
                                    checksum += header[i];
                                }
                                const checksumOctal = checksum.toString(8);
                                this.writeOctal(header, 148, 8, checksumOctal);
                                
                                return header;
                            }
                            
                            writeOctal(buffer, offset, length, value) {
                                const str = value.padStart(length - 1, '0') + ' ';
                                const bytes = new TextEncoder().encode(str);
                                buffer.set(bytes.slice(0, length), offset);
                            }
                            
                            padData(data) {
                                const blockSize = 512;
                                const remainder = data.length % blockSize;
                                if (remainder === 0) return data;
                                
                                const padded = new Uint8Array(data.length + (blockSize - remainder));
                                padded.set(data, 0);
                                return padded;
                            }
                        }
                        
                        // Simple TAR Reader
                        class TarReader {
                            static read(arrayBuffer) {
                                const data = new Uint8Array(arrayBuffer);
                                const entries = [];
                                let offset = 0;
                                
                                while (offset < data.length - 512) {
                                    const header = data.slice(offset, offset + 512);
                                    
                                    // Check if it's an empty block (end of archive)
                                    let isEmpty = true;
                                    for (let i = 0; i < 512; i++) {
                                        if (header[i] !== 0) {
                                            isEmpty = false;
                                            break;
                                        }
                                    }
                                    if (isEmpty) break;
                                    
                                    const name = this.readString(header, 0, 100).replace(/\0/g, '');
                                    const size = this.readOctal(header, 124, 12);
                                    const type = header[156];
                                    
                                    offset += 512;
                                    
                                    if (type === 0x30 || type === 0) { // Regular file
                                        const fileData = data.slice(offset, offset + size);
                                        entries.push({
                                            name: name,
                                            size: size,
                                            type: 'file',
                                            read: () => fileData
                                        });
                                        offset += Math.ceil(size / 512) * 512;
                                    } else if (type === 0x35) { // Directory
                                        entries.push({
                                            name: name,
                                            size: 0,
                                            type: 'directory',
                                            read: () => new Uint8Array(0)
                                        });
                                    } else {
                                        // Skip unknown types
                                        offset += Math.ceil(size / 512) * 512;
                                    }
                                }
                                
                                return entries;
                            }
                            
                            static readString(buffer, offset, length) {
                                const bytes = buffer.slice(offset, offset + length);
                                const nullIndex = bytes.indexOf(0);
                                const strBytes = nullIndex >= 0 ? bytes.slice(0, nullIndex) : bytes;
                                return new TextDecoder().decode(strBytes);
                            }
                            
                            static readOctal(buffer, offset, length) {
                                const str = this.readString(buffer, offset, length).trim();
                                return parseInt(str, 8) || 0;
                            }
                        }
                        
                        window.tarjs = {
                            TarWriter: TarWriter,
                            TarReader: TarReader
                        };
                    }
                    
                    resolve();
                })
            ]).catch(error => {
                console.error('Failed to load libraries:', error);
                // Only show error if DOM is ready
                const errorEl = document.getElementById('compress-error');
                if (errorEl) {
                    showError('compress-error', 'Failed to load required libraries. Please refresh the page.');
                } else {
                    // If DOM not ready, show alert
                    setTimeout(() => {
                        const el = document.getElementById('compress-error');
                        if (el) {
                            showError('compress-error', 'Failed to load required libraries. Please refresh the page.');
                        }
                    }, 100);
                }
            });
        }

        // Initialize - load libraries first
        await loadLibraries();
    }
};
