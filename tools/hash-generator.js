
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

        // Load crypto-js library
        async function loadCryptoJS() {
            if (window.CryptoJS) {
                return;
            }

            return new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = 'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.2.0/crypto-js.min.js';
                script.onload = resolve;
                script.onerror = reject;
                document.head.appendChild(script);
            }).catch(error => {
                console.error('Failed to load crypto-js:', error);
            });
        }

        // Load crypto-js for MD5
        await loadCryptoJS();

        window.setHashMode = (mode) => {
            currentMode = mode;
            const textPanel = document.getElementById('text-panel');
            const filePanel = document.getElementById('file-panel');
            const comparePanel = document.getElementById('compare-panel');
            const textModeBtn = document.getElementById('text-mode');
            const fileModeBtn = document.getElementById('file-mode');
            const compareModeBtn = document.getElementById('compare-mode');
            const generateBtn = document.getElementById('generate-btn');

            textPanel.style.display = mode === 'text' ? 'block' : 'none';
            filePanel.style.display = mode === 'file' ? 'block' : 'none';
            comparePanel.style.display = mode === 'compare' ? 'block' : 'none';

            textModeBtn.classList.toggle('active', mode === 'text');
            fileModeBtn.classList.toggle('active', mode === 'file');
            compareModeBtn.classList.toggle('active', mode === 'compare');

            // Update generate button state
            if (mode === 'text') {
                const textInput = document.getElementById('hash-text-input').value.trim();
                generateBtn.disabled = !textInput;
            } else if (mode === 'file') {
                generateBtn.disabled = !currentFile;
            } else if (mode === 'compare') {
                generateBtn.disabled = !compareFile1 || !compareFile2;
            }

            // Clear results when switching modes
            document.getElementById('hash-results').style.display = 'none';
            document.getElementById('copy-all-btn').style.display = 'none';
        };

        window.toggleHMAC = () => {
            const hmacEnabled = document.getElementById('hmac-enable').checked;
            const hmacSection = document.getElementById('hmac-section');
            hmacSection.classList.toggle('active', hmacEnabled);
        };

        // Text mode - real-time hashing (debounced)
        const textInput = document.getElementById('hash-text-input');
        textInput.addEventListener('input', () => {
            const generateBtn = document.getElementById('generate-btn');
            generateBtn.disabled = !textInput.value.trim();

            if (currentMode === 'text' && textInput.value.trim()) {
                clearTimeout(debounceTimer);
                debounceTimer = setTimeout(() => {
                    if (currentMode === 'text') {
                        generateHashes();
                    }
                }, 500); // 500ms debounce
            }
        });

        // File mode - drag and drop
        const fileDropZone = document.getElementById('file-drop-zone');
        const fileInput = document.getElementById('file-input');

        fileDropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            fileDropZone.classList.add('dragover');
        });

        fileDropZone.addEventListener('dragleave', () => {
            fileDropZone.classList.remove('dragover');
        });

        fileDropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            fileDropZone.classList.remove('dragover');
            if (e.dataTransfer.files.length > 0) {
                handleFileSelect(e.dataTransfer.files[0]);
            }
        });

        fileInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                handleFileSelect(e.target.files[0]);
            }
        });

        function handleFileSelect(file) {
            currentFile = file;
            const fileInfo = document.getElementById('file-info');
            document.getElementById('file-name').textContent = file.name;
            document.getElementById('file-size').textContent = formatFileSize(file.size);
            document.getElementById('file-type').textContent = file.type || 'Unknown';
            fileInfo.classList.add('active');
            document.getElementById('generate-btn').disabled = false;
        }

        // Compare mode - file selection
        const compareFile1Zone = document.getElementById('compare-file1-zone');
        const compareFile1Input = document.getElementById('compare-file1-input');
        const compareFile2Zone = document.getElementById('compare-file2-zone');
        const compareFile2Input = document.getElementById('compare-file2-input');

        [compareFile1Zone, compareFile2Zone].forEach((zone, index) => {
            const input = index === 0 ? compareFile1Input : compareFile2Input;
            const fileNum = index + 1;

            zone.addEventListener('dragover', (e) => {
                e.preventDefault();
                zone.classList.add('dragover');
            });

            zone.addEventListener('dragleave', () => {
                zone.classList.remove('dragover');
            });

            zone.addEventListener('drop', (e) => {
                e.preventDefault();
                zone.classList.remove('dragover');
                if (e.dataTransfer.files.length > 0) {
                    handleCompareFileSelect(e.dataTransfer.files[0], fileNum);
                }
            });

            input.addEventListener('change', (e) => {
                if (e.target.files.length > 0) {
                    handleCompareFileSelect(e.target.files[0], fileNum);
                }
            });
        });

        function handleCompareFileSelect(file, fileNum) {
            if (fileNum === 1) {
                compareFile1 = file;
                document.getElementById('compare-file1-name').textContent = file.name;
                document.getElementById('compare-file1-size').textContent = formatFileSize(file.size);
                document.getElementById('compare-file1-info').classList.add('active');
            } else {
                compareFile2 = file;
                document.getElementById('compare-file2-name').textContent = file.name;
                document.getElementById('compare-file2-size').textContent = formatFileSize(file.size);
                document.getElementById('compare-file2-info').classList.add('active');
            }

            const generateBtn = document.getElementById('generate-btn');
            generateBtn.disabled = !compareFile1 || !compareFile2;
        }

        // Hash generation functions
        async function hashMD5(data, isText = false) {
            if (!window.CryptoJS) {
                throw new Error('CryptoJS library not loaded');
            }
            if (isText) {
                return window.CryptoJS.MD5(data).toString();
            } else {
                const wordArray = window.CryptoJS.lib.WordArray.create(data);
                return window.CryptoJS.MD5(wordArray).toString();
            }
        }

        async function hashSHA(data, algorithm) {
            const hashBuffer = await crypto.subtle.digest(algorithm, data);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        }

        async function hashHMAC(data, algorithm, secret) {
            const encoder = new TextEncoder();
            const keyData = encoder.encode(secret);
            const dataArray = data instanceof Uint8Array ? data : encoder.encode(data);

            const key = await crypto.subtle.importKey(
                'raw',
                keyData,
                { name: 'HMAC', hash: algorithm },
                false,
                ['sign']
            );

            const signature = await crypto.subtle.sign('HMAC', key, dataArray);
            const hashArray = Array.from(new Uint8Array(signature));
            return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        }

        window.generateHashes = async () => {
            const progressContainer = document.getElementById('hash-progress');
            const progressFill = document.getElementById('hash-progress-fill');
            const progressText = document.getElementById('hash-progress-text');
            const resultsDiv = document.getElementById('hash-results');
            const resultsBody = document.getElementById('hash-results-body');
            const copyAllBtn = document.getElementById('copy-all-btn');
            const uppercase = document.getElementById('uppercase-output').checked;
            const hmacEnabled = document.getElementById('hmac-enable').checked;
            const hmacSecret = document.getElementById('hmac-secret').value;

            if (hmacEnabled && !hmacSecret.trim()) {
                alert('Please enter an HMAC secret key');
                return;
            }

            progressContainer.classList.add('active');
            resultsDiv.style.display = 'none';
            copyAllBtn.style.display = 'none';
            resultsBody.innerHTML = '';

            try {
                let data = null;
                let isText = false;

                if (currentMode === 'text') {
                    const text = document.getElementById('hash-text-input').value;
                    if (!text.trim()) {
                        throw new Error('Please enter text to hash');
                    }
                    data = text;
                    isText = true;
                    updateProgress(10, 'Generating hashes...');
                } else if (currentMode === 'file') {
                    if (!currentFile) {
                        throw new Error('Please select a file');
                    }
                    updateProgress(10, 'Reading file...');
                    const arrayBuffer = await currentFile.arrayBuffer();
                    data = new Uint8Array(arrayBuffer);
                    updateProgress(30, 'Generating hashes...');
                } else if (currentMode === 'compare') {
                    if (!compareFile1 || !compareFile2) {
                        throw new Error('Please select both files to compare');
                    }
                    await compareFiles();
                    return;
                }

                const algorithms = [
                    { name: 'MD5', func: () => hashMD5(data, isText), hmac: false },
                    { name: 'SHA-1', func: () => hashSHA(isText ? new TextEncoder().encode(data) : data, 'SHA-1'), hmac: true },
                    { name: 'SHA-256', func: () => hashSHA(isText ? new TextEncoder().encode(data) : data, 'SHA-256'), hmac: true },
                    { name: 'SHA-384', func: () => hashSHA(isText ? new TextEncoder().encode(data) : data, 'SHA-384'), hmac: true },
                    { name: 'SHA-512', func: () => hashSHA(isText ? new TextEncoder().encode(data) : data, 'SHA-512'), hmac: true }
                ];

                const results = [];
                const total = algorithms.length;

                for (let i = 0; i < algorithms.length; i++) {
                    const algo = algorithms[i];
                    updateProgress(30 + (i / total) * 60, `Computing ${algo.name}...`);

                    let hash;
                    if (hmacEnabled && algo.hmac) {
                        // Web Crypto API expects 'SHA-1', 'SHA-256', etc.
                        const shaAlgo = algo.name; // Already in correct format
                        hash = await hashHMAC(isText ? new TextEncoder().encode(data) : data, shaAlgo, hmacSecret);
                    } else if (hmacEnabled && !algo.hmac) {
                        // MD5 with HMAC using crypto-js
                        if (isText) {
                            hash = window.CryptoJS.HmacMD5(data, hmacSecret).toString();
                        } else {
                            const wordArray = window.CryptoJS.lib.WordArray.create(data);
                            hash = window.CryptoJS.HmacMD5(wordArray, hmacSecret).toString();
                        }
                    } else {
                        hash = await algo.func();
                    }

                    const hashValue = uppercase ? hash.toUpperCase() : hash.toLowerCase();
                    results.push({ algorithm: algo.name, hash: hashValue });
                }

                updateProgress(100, 'Complete!');
                displayResults(results);
                copyAllBtn.style.display = 'inline-block';

            } catch (error) {
                alert(`Error: ${error.message}`);
                console.error('Hash generation error:', error);
            } finally {
                setTimeout(() => {
                    progressContainer.classList.remove('active');
                }, 1000);
            }
        };

        async function compareFiles() {
            const progressContainer = document.getElementById('hash-progress');
            const progressFill = document.getElementById('hash-progress-fill');
            const progressText = document.getElementById('hash-progress-text');
            const comparisonResult = document.getElementById('comparison-result');
            const hmacEnabled = document.getElementById('hmac-enable').checked;
            const hmacSecret = document.getElementById('hmac-secret').value;

            if (hmacEnabled && !hmacSecret.trim()) {
                alert('Please enter an HMAC secret key');
                return;
            }

            progressContainer.classList.add('active');
            comparisonResult.classList.remove('active');
            comparisonResult.innerHTML = '';

            try {
                updateProgress(10, 'Reading files...');
                const file1Buffer = await compareFile1.arrayBuffer();
                const file2Buffer = await compareFile2.arrayBuffer();
                const file1Data = new Uint8Array(file1Buffer);
                const file2Data = new Uint8Array(file2Buffer);

                updateProgress(30, 'Computing hashes...');

                const algorithms = ['MD5', 'SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'];
                const results = [];

                for (let i = 0; i < algorithms.length; i++) {
                    const algo = algorithms[i];
                    updateProgress(30 + (i / algorithms.length) * 60, `Comparing ${algo}...`);

                    let hash1, hash2;

                    if (algo === 'MD5') {
                        if (hmacEnabled) {
                            const wordArray1 = window.CryptoJS.lib.WordArray.create(file1Data);
                            const wordArray2 = window.CryptoJS.lib.WordArray.create(file2Data);
                            hash1 = window.CryptoJS.HmacMD5(wordArray1, hmacSecret).toString();
                            hash2 = window.CryptoJS.HmacMD5(wordArray2, hmacSecret).toString();
                        } else {
                            hash1 = await hashMD5(file1Data);
                            hash2 = await hashMD5(file2Data);
                        }
                    } else {
                        // Web Crypto API uses 'SHA-1', 'SHA-256', etc.
                        const shaAlgo = algo; // Already in correct format
                        if (hmacEnabled) {
                            hash1 = await hashHMAC(file1Data, shaAlgo, hmacSecret);
                            hash2 = await hashHMAC(file2Data, shaAlgo, hmacSecret);
                        } else {
                            hash1 = await hashSHA(file1Data, shaAlgo);
                            hash2 = await hashSHA(file2Data, shaAlgo);
                        }
                    }

                    const match = hash1.toLowerCase() === hash2.toLowerCase();
                    results.push({
                        algorithm: algo,
                        hash1: hash1,
                        hash2: hash2,
                        match: match
                    });
                }

                updateProgress(100, 'Complete!');

                // Display comparison results
                const allMatch = results.every(r => r.match);
                const uppercase = document.getElementById('uppercase-output').checked;

                let html = `<div class="${allMatch ? 'comparison-match' : 'comparison-mismatch'}">
                    <i class="fas fa-${allMatch ? 'check-circle' : 'times-circle'}"></i>
                    ${allMatch ? 'All hashes match!' : 'Hashes do not match'}
                </div>`;

                html += '<div class="comparison-details">';
                results.forEach(result => {
                    const hash1Display = uppercase ? result.hash1.toUpperCase() : result.hash1.toLowerCase();
                    const hash2Display = uppercase ? result.hash2.toUpperCase() : result.hash2.toLowerCase();
                    html += `
                        <div style="margin-bottom: 15px; padding: 10px; background: var(--bg-tertiary); border-radius: 4px;">
                            <div style="font-weight: 600; margin-bottom: 8px; color: ${result.match ? '#4caf50' : '#f44336'};">
                                ${result.algorithm}: ${result.match ? '✓ Match' : '✗ Mismatch'}
                            </div>
                            <div style="font-size: 11px; font-family: monospace; word-break: break-all;">
                                <div><strong>File 1:</strong> ${hash1Display}</div>
                                <div><strong>File 2:</strong> ${hash2Display}</div>
                            </div>
                        </div>
                    `;
                });
                html += '</div>';

                comparisonResult.innerHTML = html;
                comparisonResult.classList.add('active');

            } catch (error) {
                alert(`Error: ${error.message}`);
                console.error('Comparison error:', error);
            } finally {
                setTimeout(() => {
                    progressContainer.classList.remove('active');
                }, 1000);
            }
        }

        function displayResults(results) {
            const resultsBody = document.getElementById('hash-results-body');
            const uppercase = document.getElementById('uppercase-output').checked;

            resultsBody.innerHTML = results.map((result, index) => `
                <tr>
                    <td class="hash-algorithm">${result.algorithm}</td>
                    <td class="hash-value">${result.hash}</td>
                    <td>
                        <button class="tool-button secondary btn-copy-hash" onclick="copyHash('${result.algorithm}', '${result.hash}')">
                            <i class="fas fa-copy"></i> Copy
                        </button>
                    </td>
                </tr>
            `).join('');

            document.getElementById('hash-results').style.display = 'block';
        }

        window.copyHash = (algorithm, hash) => {
            ToolUtils.copyToClipboard(hash);
        };

        window.copyAllHashes = () => {
            const results = [];
            const rows = document.querySelectorAll('#hash-results-body tr');
            rows.forEach(row => {
                const algorithm = row.querySelector('.hash-algorithm').textContent;
                const hash = row.querySelector('.hash-value').textContent;
                results.push(`${algorithm}: ${hash}`);
            });
            ToolUtils.copyToClipboard(results.join('\n'));
        };

        window.clearHashes = () => {
            document.getElementById('hash-text-input').value = '';
            document.getElementById('file-input').value = '';
            document.getElementById('compare-file1-input').value = '';
            document.getElementById('compare-file2-input').value = '';
            document.getElementById('hmac-secret').value = '';
            document.getElementById('hmac-enable').checked = false;
            document.getElementById('hmac-section').classList.remove('active');
            document.getElementById('hash-results').style.display = 'none';
            document.getElementById('copy-all-btn').style.display = 'none';
            document.getElementById('file-info').classList.remove('active');
            document.getElementById('compare-file1-info').classList.remove('active');
            document.getElementById('compare-file2-info').classList.remove('active');
            document.getElementById('comparison-result').classList.remove('active');
            currentFile = null;
            compareFile1 = null;
            compareFile2 = null;
            document.getElementById('generate-btn').disabled = true;
        };

        function formatFileSize(bytes) {
            if (bytes === 0) return '0 B';
            const k = 1024;
            const sizes = ['B', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
        }

        function updateProgress(percent, text) {
            const progressFill = document.getElementById('hash-progress-fill');
            const progressText = document.getElementById('hash-progress-text');
            if (progressFill) progressFill.style.width = percent + '%';
            if (progressText) progressText.textContent = text || `${percent}%`;
        }

    }
};