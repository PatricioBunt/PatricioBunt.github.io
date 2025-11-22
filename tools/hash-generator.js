
export default {
    title: 'Hash Generator',
    styles: `
        .hash-generator {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }

        .hash-mode-selector {
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

        .hash-options {
            display: flex;
            gap: 15px;
            align-items: center;
            margin-bottom: 15px;
            flex-wrap: wrap;
        }

        .hash-options label {
            display: flex;
            align-items: center;
            gap: 8px;
            color: var(--text-primary);
            font-size: 14px;
            cursor: pointer;
        }

        .hash-options input[type="checkbox"] {
            cursor: pointer;
        }

        .hash-options select {
            padding: 8px 12px;
            background: var(--bg-secondary);
            border: 1px solid var(--border-color);
            border-radius: 4px;
            color: var(--text-primary);
            font-size: 14px;
        }

        .hmac-section {
            margin-top: 15px;
            padding: 15px;
            background: var(--bg-secondary);
            border: 1px solid var(--border-color);
            border-radius: 6px;
            display: none;
        }

        .hmac-section.active {
            display: block;
        }

        .hmac-section label {
            display: block;
            margin-bottom: 8px;
            color: var(--text-primary);
            font-weight: 500;
        }

        .hmac-section input {
            width: 100%;
            padding: 10px;
            background: var(--bg-tertiary);
            border: 1px solid var(--border-color);
            border-radius: 4px;
            color: var(--text-primary);
            font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
            font-size: 13px;
        }

        .file-info {
            padding: 15px;
            background: var(--bg-secondary);
            border: 1px solid var(--border-color);
            border-radius: 6px;
            margin-bottom: 15px;
            display: none;
        }

        .file-info.active {
            display: block;
        }

        .file-info-item {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
            font-size: 14px;
        }

        .file-info-label {
            color: var(--text-secondary);
            font-weight: 500;
        }

        .file-info-value {
            color: var(--text-primary);
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
            display: none;
        }

        .drop-zone.active {
            display: block;
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

        .hash-results {
            margin-top: 20px;
        }

        .hash-results-table {
            width: 100%;
            border-collapse: collapse;
            background: var(--bg-secondary);
            border-radius: 6px;
            overflow: hidden;
        }

        .hash-results-table thead {
            background: var(--bg-tertiary);
        }

        .hash-results-table th {
            padding: 12px;
            text-align: left;
            color: var(--text-primary);
            font-weight: 600;
            font-size: 14px;
            border-bottom: 2px solid var(--border-color);
        }

        .hash-results-table td {
            padding: 12px;
            border-bottom: 1px solid var(--border-color);
            color: var(--text-primary);
            font-size: 13px;
        }

        .hash-results-table tr:last-child td {
            border-bottom: none;
        }

        .hash-results-table tr:hover {
            background: var(--bg-hover);
        }

        .hash-value {
            font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
            font-size: 12px;
            word-break: break-all;
            color: var(--text-primary);
            max-width: 500px;
        }

        .hash-algorithm {
            font-weight: 500;
            color: var(--accent-color);
            min-width: 100px;
        }

        .btn-copy-hash {
            padding: 6px 12px;
            font-size: 12px;
            white-space: nowrap;
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

        .comparison-mode {
            display: none;
        }

        .comparison-mode.active {
            display: block;
        }

        .file-comparison {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-bottom: 20px;
        }

        .comparison-result {
            margin-top: 20px;
            padding: 15px;
            background: var(--bg-secondary);
            border: 1px solid var(--border-color);
            border-radius: 6px;
            display: none;
        }

        .comparison-result.active {
            display: block;
        }

        .comparison-match {
            color: #4caf50;
            font-weight: 600;
            font-size: 16px;
            margin-bottom: 10px;
        }

        .comparison-mismatch {
            color: #f44336;
            font-weight: 600;
            font-size: 16px;
            margin-bottom: 10px;
        }

        .comparison-details {
            font-size: 13px;
            color: var(--text-secondary);
        }

        .hash-actions {
            display: flex;
            gap: 10px;
            margin-top: 15px;
            flex-wrap: wrap;
        }
    `,
    html: `
        <div class="tool-info">
            Generate cryptographic hashes (MD5, SHA-1, SHA-256, SHA-384, SHA-512) from text or files. Supports HMAC mode and file comparison.
        </div>
        <div class="tool-section">
            <div class="hash-generator">
                <div class="hash-mode-selector">
                    <button class="mode-button active" id="text-mode" onclick="setHashMode('text')">
                        <i class="fas fa-font"></i> Text
                    </button>
                    <button class="mode-button" id="file-mode" onclick="setHashMode('file')">
                        <i class="fas fa-file"></i> File
                    </button>
                    <button class="mode-button" id="compare-mode" onclick="setHashMode('compare')">
                        <i class="fas fa-code-branch"></i> Compare Files
                    </button>
                </div>

                <div id="text-panel">
                    <div class="tool-input-group">
                        <label for="hash-text-input">Input Text</label>
                        <textarea id="hash-text-input" placeholder="Enter text to hash..." style="min-height: 150px;"></textarea>
                    </div>
                </div>

                <div id="file-panel" style="display: none;">
                    <div class="drop-zone active" id="file-drop-zone">
                        <input type="file" id="file-input">
                        <div class="drop-zone-icon">
                            <i class="fas fa-cloud-upload-alt"></i>
                        </div>
                        <div class="drop-zone-text">Drop file here or click to select</div>
                        <div class="drop-zone-hint">Supports any file type</div>
                    </div>
                    <div class="file-info" id="file-info">
                        <div class="file-info-item">
                            <span class="file-info-label">File Name:</span>
                            <span class="file-info-value" id="file-name">-</span>
                        </div>
                        <div class="file-info-item">
                            <span class="file-info-label">File Size:</span>
                            <span class="file-info-value" id="file-size">-</span>
                        </div>
                        <div class="file-info-item">
                            <span class="file-info-label">File Type:</span>
                            <span class="file-info-value" id="file-type">-</span>
                        </div>
                    </div>
                </div>

                <div id="compare-panel" class="comparison-mode" style="display: none;">
                    <div class="file-comparison">
                        <div>
                            <div class="drop-zone active" id="compare-file1-zone">
                                <input type="file" id="compare-file1-input">
                                <div class="drop-zone-icon">
                                    <i class="fas fa-file"></i>
                                </div>
                                <div class="drop-zone-text">File 1</div>
                            </div>
                            <div class="file-info" id="compare-file1-info" style="margin-top: 10px;">
                                <div class="file-info-item">
                                    <span class="file-info-label">Name:</span>
                                    <span class="file-info-value" id="compare-file1-name">-</span>
                                </div>
                                <div class="file-info-item">
                                    <span class="file-info-label">Size:</span>
                                    <span class="file-info-value" id="compare-file1-size">-</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="drop-zone active" id="compare-file2-zone">
                                <input type="file" id="compare-file2-input">
                                <div class="drop-zone-icon">
                                    <i class="fas fa-file"></i>
                                </div>
                                <div class="drop-zone-text">File 2</div>
                            </div>
                            <div class="file-info" id="compare-file2-info" style="margin-top: 10px;">
                                <div class="file-info-item">
                                    <span class="file-info-label">Name:</span>
                                    <span class="file-info-value" id="compare-file2-name">-</span>
                                </div>
                                <div class="file-info-item">
                                    <span class="file-info-label">Size:</span>
                                    <span class="file-info-value" id="compare-file2-size">-</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="comparison-result" id="comparison-result"></div>
                </div>

                <div class="hash-options">
                    <label>
                        <input type="checkbox" id="hmac-enable" onchange="toggleHMAC()">
                        <span>Enable HMAC</span>
                    </label>
                    <label>
                        <input type="checkbox" id="uppercase-output" checked>
                        <span>Uppercase</span>
                    </label>
                </div>

                <div class="hmac-section" id="hmac-section">
                    <label for="hmac-secret">HMAC Secret Key</label>
                    <input type="text" id="hmac-secret" placeholder="Enter secret key for HMAC...">
                </div>

                <div class="progress-container" id="hash-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" id="hash-progress-fill"></div>
                    </div>
                    <div class="progress-text" id="hash-progress-text">0%</div>
                </div>

                <div class="hash-results" id="hash-results" style="display: none;">
                    <table class="hash-results-table">
                        <thead>
                            <tr>
                                <th>Algorithm</th>
                                <th>Hash Value</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody id="hash-results-body">
                        </tbody>
                    </table>
                </div>

                <div class="hash-actions">
                    <button class="tool-button" id="generate-btn" onclick="generateHashes()" disabled>
                        <i class="fas fa-key"></i> Generate Hashes
                    </button>
                    <button class="tool-button secondary" id="copy-all-btn" onclick="copyAllHashes()" style="display: none;">
                        <i class="fas fa-copy"></i> Copy All
                    </button>
                    <button class="tool-button secondary" onclick="clearHashes()">
                        <i class="fas fa-times"></i> Clear
                    </button>
                </div>
            </div>
        </div>
    `,
    async init() {
        let currentMode = 'text';
        let currentFile = null;
        let compareFile1 = null;
        let compareFile2 = null;
        let debounceTimer = null;

        