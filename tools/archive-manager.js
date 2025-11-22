
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

        