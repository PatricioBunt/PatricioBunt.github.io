export default {
    title: 'QR Code Generator & Scanner',
    styles: `
        .qr-tool-container {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }

        .qr-tabs {
            display: flex;
            gap: 5px;
            border-bottom: 2px solid var(--border-color);
            margin-bottom: 20px;
        }

        .qr-tab {
            padding: 12px 24px;
            background: transparent;
            border: none;
            border-bottom: 3px solid transparent;
            color: var(--text-secondary);
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
            transition: all var(--transition-speed);
            position: relative;
            top: 2px;
        }

        .qr-tab:hover {
            color: var(--text-primary);
            background: var(--bg-hover);
        }

        .qr-tab.active {
            color: var(--accent-color);
            border-bottom-color: var(--accent-color);
        }

        .qr-tab-content {
            display: none;
        }

        .qr-tab-content.active {
            display: block;
        }

        .qr-generate-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
        }

        @media (max-width: 768px) {
            .qr-generate-container {
                grid-template-columns: 1fr;
            }
        }

        .qr-input-section {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }

        .qr-preview-section {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
        }

        .qr-template-helper {
            font-size: 12px;
            color: var(--text-secondary);
            margin-top: 5px;
            padding: 8px;
            background: var(--bg-secondary);
            border-radius: 4px;
            border-left: 3px solid var(--accent-color);
        }

        .qr-customization {
            display: flex;
            flex-direction: column;
            gap: 15px;
            padding: 15px;
            background: var(--bg-secondary);
            border-radius: 6px;
            border: 1px solid var(--border-color);
        }

        .qr-customization-row {
            display: flex;
            gap: 15px;
            align-items: center;
            flex-wrap: wrap;
        }

        .qr-customization-row label {
            min-width: 120px;
            font-size: 13px;
            color: var(--text-primary);
            font-weight: 500;
        }

        .qr-customization-row select,
        .qr-customization-row input[type="number"],
        .qr-customization-row input[type="color"] {
            padding: 8px 12px;
            background: var(--bg-tertiary);
            border: 1px solid var(--border-color);
            border-radius: 4px;
            color: var(--text-primary);
            font-size: 13px;
        }

        .qr-customization-row input[type="color"] {
            width: 60px;
            height: 40px;
            padding: 2px;
            cursor: pointer;
        }

        .qr-custom-size-input {
            display: none;
        }

        .qr-custom-size-input.active {
            display: block;
        }

        .qr-preview-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 15px;
            padding: 20px;
            background: var(--bg-secondary);
            border-radius: 8px;
            border: 1px solid var(--border-color);
            min-height: 300px;
            justify-content: center;
        }

        #qr-canvas {
            max-width: 100%;
            height: auto;
            border-radius: 4px;
        }

        .qr-preview-placeholder {
            color: var(--text-disabled);
            font-size: 14px;
            text-align: center;
        }

        .qr-actions {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
            justify-content: center;
        }

        .qr-vcard-form {
            display: none;
            padding: 15px;
            background: var(--bg-secondary);
            border-radius: 6px;
            border: 1px solid var(--border-color);
            margin-top: 15px;
        }

        .qr-vcard-form.active {
            display: block;
        }

        .qr-vcard-form .tool-input-group {
            margin-bottom: 12px;
        }

        .qr-scan-container {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }

        .qr-scan-controls {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
        }

        .qr-camera-container {
            position: relative;
            display: none;
            margin-bottom: 20px;
        }

        .qr-camera-container.active {
            display: block;
        }

        #qr-video {
            width: 100%;
            max-width: 640px;
            border-radius: 8px;
            border: 1px solid var(--border-color);
            background: var(--bg-secondary);
        }

        #qr-video video {
            width: 100%;
            height: auto;
            border-radius: 8px;
        }

        #qr-video canvas {
            display: none;
        }

        .qr-upload-area {
            border: 2px dashed var(--border-color);
            border-radius: 8px;
            padding: 40px;
            text-align: center;
            background: var(--bg-secondary);
            cursor: pointer;
            transition: all var(--transition-speed);
            margin-bottom: 20px;
        }

        .qr-upload-area:hover {
            border-color: var(--accent-color);
            background: var(--bg-hover);
        }

        .qr-upload-area.dragover {
            border-color: var(--accent-color);
            background: var(--bg-hover);
        }

        .qr-upload-area i {
            font-size: 48px;
            color: var(--accent-color);
            margin-bottom: 15px;
        }

        .qr-scan-result {
            padding: 20px;
            background: var(--bg-secondary);
            border: 1px solid var(--border-color);
            border-radius: 8px;
            display: none;
        }

        .qr-scan-result.active {
            display: block;
        }

        .qr-scan-result-content {
            font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
            font-size: 14px;
            color: var(--text-primary);
            white-space: pre-wrap;
            word-wrap: break-word;
            padding: 15px;
            background: var(--bg-tertiary);
            border-radius: 4px;
            margin-bottom: 15px;
            min-height: 100px;
        }

        .qr-scan-result-actions {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
        }

        .qr-scan-history {
            margin-top: 20px;
            padding: 15px;
            background: var(--bg-secondary);
            border: 1px solid var(--border-color);
            border-radius: 8px;
            display: none;
        }

        .qr-scan-history.active {
            display: block;
        }

        .qr-scan-history h4 {
            font-size: 14px;
            color: var(--text-primary);
            margin-bottom: 10px;
            font-weight: 600;
        }

        .qr-history-item {
            padding: 10px;
            background: var(--bg-tertiary);
            border-radius: 4px;
            margin-bottom: 8px;
            cursor: pointer;
            transition: all var(--transition-speed);
            font-size: 12px;
            color: var(--text-secondary);
            word-break: break-all;
        }

        .qr-history-item:hover {
            background: var(--bg-hover);
            color: var(--text-primary);
        }

        .qr-content-type {
            display: inline-block;
            padding: 4px 8px;
            background: var(--accent-color);
            color: white;
            border-radius: 4px;
            font-size: 11px;
            font-weight: 600;
            margin-bottom: 10px;
        }

        .qr-url-warning {
            padding: 12px;
            background: var(--bg-tertiary);
            border-left: 3px solid #f48771;
            border-radius: 4px;
            margin-bottom: 15px;
            font-size: 13px;
            color: var(--text-primary);
        }

        .qr-url-warning strong {
            color: #f48771;
        }
    `,
    html: `
        <div class="tool-info">
            Generate QR codes from text, URLs, emails, contacts, WiFi credentials, and more. Scan QR codes using your camera or upload images. All processing happens in your browser.
        </div>
        <div class="qr-tool-container">
            <div class="qr-tabs">
                <button class="qr-tab active" data-tab="generate">GENERATE</button>
                <button class="qr-tab" data-tab="scan">SCAN</button>
            </div>

            <div id="generate-tab" class="qr-tab-content active">
                <div class="qr-generate-container">
                    <div class="qr-input-section">
                        <div class="tool-input-group">
                            <label for="qr-template">Template</label>
                            <select id="qr-template">
                                <option value="plain">Plain Text</option>
                                <option value="url">URL/Website</option>
                                <option value="email">Email</option>
                                <option value="phone">Phone</option>
                                <option value="sms">SMS</option>
                                <option value="wifi">WiFi</option>
                                <option value="vcard">vCard</option>
                            </select>
                            <div class="qr-template-helper" id="qr-template-helper">
                                Enter any text to generate a QR code.
                            </div>
                        </div>

                        <div class="qr-vcard-form" id="qr-vcard-form">
                            <div class="tool-input-group">
                                <label for="vcard-name">Name</label>
                                <input type="text" id="vcard-name" placeholder="John Doe">
                            </div>
                            <div class="tool-input-group">
                                <label for="vcard-phone">Phone</label>
                                <input type="text" id="vcard-phone" placeholder="+1234567890">
                            </div>
                            <div class="tool-input-group">
                                <label for="vcard-email">Email</label>
                                <input type="email" id="vcard-email" placeholder="john@example.com">
                            </div>
                        </div>

                        <div class="tool-input-group">
                            <label for="qr-content">Content</label>
                            <textarea id="qr-content" placeholder="Enter content for QR code..." style="min-height: 200px;"></textarea>
                        </div>

                        <div class="qr-customization">
                            <div class="qr-customization-row">
                                <label>Size</label>
                                <select id="qr-size">
                                    <option value="128">Small (128px)</option>
                                    <option value="256" selected>Medium (256px)</option>
                                    <option value="512">Large (512px)</option>
                                    <option value="custom">Custom</option>
                                </select>
                                <input type="number" id="qr-custom-size" class="qr-custom-size-input" placeholder="Size in px" min="64" max="1024" value="256">
                            </div>
                            <div class="qr-customization-row">
                                <label>Error Correction</label>
                                <select id="qr-error-correction">
                                    <option value="L">Low (L) - ~7%</option>
                                    <option value="M" selected>Medium (M) - ~15%</option>
                                    <option value="Q">High (Q) - ~25%</option>
                                    <option value="H">Highest (H) - ~30%</option>
                                </select>
                            </div>
                            <div class="qr-customization-row">
                                <label>Foreground Color</label>
                                <input type="color" id="qr-fg-color" value="#000000">
                            </div>
                            <div class="qr-customization-row">
                                <label>Background Color</label>
                                <input type="color" id="qr-bg-color" value="#ffffff">
                            </div>
                        </div>
                    </div>

                    <div class="qr-preview-section">
                        <div class="qr-preview-container">
                            <canvas id="qr-canvas"></canvas>
                            <div class="qr-preview-placeholder" id="qr-preview-placeholder">
                                QR code preview will appear here
                            </div>
                        </div>
                        <div class="qr-actions">
                            <button class="tool-button" id="qr-generate-btn">
                                <i class="fas fa-qrcode"></i> Generate QR Code
                            </button>
                            <button class="tool-button" id="qr-download-png">
                                <i class="fas fa-download"></i> Download PNG
                            </button>
                            <button class="tool-button" id="qr-download-svg">
                                <i class="fas fa-download"></i> Download SVG
                            </button>
                            <button class="tool-button secondary" id="qr-copy-clipboard">
                                <i class="fas fa-copy"></i> Copy Image
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div id="scan-tab" class="qr-tab-content">
                <div class="qr-scan-container">
                    <div class="qr-scan-controls">
                        <button class="tool-button" id="qr-start-camera">
                            <i class="fas fa-camera"></i> Start Camera
                        </button>
                        <button class="tool-button secondary" id="qr-stop-camera" style="display: none;">
                            <i class="fas fa-stop"></i> Stop Camera
                        </button>
                    </div>

                    <div class="qr-camera-container" id="qr-camera-container">
                        <div id="qr-video"></div>
                    </div>

                    <div class="qr-upload-area" id="qr-upload-area">
                        <i class="fas fa-cloud-upload-alt"></i>
                        <p><strong>Upload Image</strong></p>
                        <p style="font-size: 12px; color: var(--text-secondary);">Drag and drop an image here or click to browse</p>
                        <input type="file" id="qr-file-input" accept="image/*" style="display: none;">
                    </div>

                    <div class="qr-scan-result" id="qr-scan-result">
                        <div class="qr-content-type" id="qr-content-type"></div>
                        <div class="qr-url-warning" id="qr-url-warning" style="display: none;">
                            <strong>⚠️ Warning:</strong> You are about to open: <span id="qr-url-preview"></span>
                        </div>
                        <div class="qr-scan-result-content" id="qr-scan-result-content"></div>
                        <div class="qr-scan-result-actions">
                            <button class="tool-button" id="qr-copy-result">
                                <i class="fas fa-copy"></i> Copy Result
                            </button>
                            <button class="tool-button" id="qr-open-link" style="display: none;">
                                <i class="fas fa-external-link-alt"></i> Open Link
                            </button>
                        </div>
                    </div>

                    <div class="qr-scan-history" id="qr-scan-history">
                        <h4>Scan History</h4>
                        <div id="qr-history-list"></div>
                    </div>
                </div>
            </div>
        </div>
    `,
    async init() {
        let qrCodeLib = null;
        let html5QrCode = null;
        let scanner = null;
        let debounceTimer = null;
        let scanHistory = JSON.parse(localStorage.getItem('qr_scan_history') || '[]');

        const loadQRCodeLib = () => {
            return new Promise((resolve, reject) => {
                if (window.QRCode) {
                    console.log('QRCode library already loaded');
                    resolve(window.QRCode);
                    return;
                }
                const script = document.createElement('script');
                script.src = 'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js';
                script.onload = () => {
                    console.log('QRCode script loaded, window.QRCode:', window.QRCode);
                    if (window.QRCode) {
                        resolve(window.QRCode);
                    } else {
                        reject(new Error('QRCode not found on window object'));
                    }
                };
                script.onerror = (error) => {
                    console.error('Failed to load QRCode script:', error);
                    reject(error);
                };
                document.head.appendChild(script);
            });
        };

        const loadHtml5QrCode = () => {
            return new Promise((resolve, reject) => {
                if (window.Html5Qrcode) {
                    resolve(window.Html5Qrcode);
                    return;
                }
                const script = document.createElement('script');
                script.src = 'https://unpkg.com/html5-qrcode@2.3.8/html5-qrcode.min.js';
                script.onload = () => resolve(window.Html5Qrcode);
                script.onerror = reject;
                document.head.appendChild(script);
            });
        };

        const tabs = document.querySelectorAll('.qr-tab');
        const tabContents = document.querySelectorAll('.qr-tab-content');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetTab = tab.dataset.tab;
                tabs.forEach(t => t.classList.remove('active'));
                tabContents.forEach(tc => tc.classList.remove('active'));
                tab.classList.add('active');
                document.getElementById(`${targetTab}-tab`).classList.add('active');

                if (targetTab !== 'scan' && scanner) {
                    stopCamera();
                }
            });
        });

        const templateSelect = document.getElementById('qr-template');
        const templateHelper = document.getElementById('qr-template-helper');
        const contentInput = document.getElementById('qr-content');
        const vcardForm = document.getElementById('qr-vcard-form');
        const canvas = document.getElementById('qr-canvas');
        const previewPlaceholder = document.getElementById('qr-preview-placeholder');
        let qrCodeInstance = null;

        const templateHelpers = {
            plain: 'Enter any text to generate a QR code.',
            url: 'Enter a URL (e.g., https://example.com). The QR code will be clickable when scanned.',
            email: 'Enter an email address. It will be formatted as mailto:email@example.com',
            phone: 'Enter a phone number. It will be formatted as tel:+1234567890',
            sms: 'Enter a phone number. It will be formatted as sms:+1234567890',
            wifi: 'Format: WIFI:T:WPA;S:NetworkName;P:Password;; (Example: WIFI:T:WPA;S:MyNetwork;P:mypassword;;)',
            vcard: 'Fill in the contact information below to generate a vCard QR code.'
        };

        templateSelect.addEventListener('change', () => {
            const template = templateSelect.value;
            templateHelper.textContent = templateHelpers[template] || templateHelpers.plain;

            if (template === 'vcard') {
                vcardForm.classList.add('active');
                contentInput.style.display = 'none';
                updateQRCode();
            } else {
                vcardForm.classList.remove('active');
                contentInput.style.display = 'block';
                if (template === 'email') {
                    contentInput.placeholder = 'Enter email address (e.g., user@example.com)';
                } else if (template === 'phone' || template === 'sms') {
                    contentInput.placeholder = 'Enter phone number (e.g., +1234567890)';
                } else if (template === 'url') {
                    contentInput.placeholder = 'Enter URL (e.g., https://example.com)';
                } else if (template === 'wifi') {
                    contentInput.placeholder = 'WIFI:T:WPA;S:NetworkName;P:Password;;';
                } else {
                    contentInput.placeholder = 'Enter content for QR code...';
                }
            }
            updateQRCode();
        });

        const formatContent = (template, content) => {
            switch (template) {
                case 'email':
                    return content.includes('@') ? `mailto:${content}` : content;
                case 'phone':
                    return `tel:${content}`;
                case 'sms':
                    return `sms:${content}`;
                case 'url':
                    return content.startsWith('http://') || content.startsWith('https://') ? content : `https://${content}`;
                case 'vcard':
                    const name = document.getElementById('vcard-name').value || 'Name';
                    const phone = document.getElementById('vcard-phone').value || '';
                    const email = document.getElementById('vcard-email').value || '';
                    let vcard = 'BEGIN:VCARD\nVERSION:3.0\n';
                    vcard += `FN:${name}\n`;
                    if (phone) vcard += `TEL:${phone}\n`;
                    if (email) vcard += `EMAIL:${email}\n`;
                    vcard += 'END:VCARD';
                    return vcard;
                default:
                    return content;
            }
        };

        const generateQRCodeNow = () => {
            if (!qrCodeLib) {
                console.log('QRCode library not loaded yet');
                ToolUtils.showNotification('QR code library is still loading. Please wait a moment.', 3000);
                return false;
            }

            if (!templateSelect || !contentInput || !canvas) {
                console.log('DOM elements not ready:', { templateSelect: !!templateSelect, contentInput: !!contentInput, canvas: !!canvas });
                return false;
            }

            try {
                const template = templateSelect.value;
                let content = '';
                let formattedContent = '';

                if (template === 'vcard') {
                    const name = document.getElementById('vcard-name').value || '';
                    const phone = document.getElementById('vcard-phone').value || '';
                    const email = document.getElementById('vcard-email').value || '';
                    if (!name && !phone && !email) {
                        canvas.style.display = 'none';
                        previewPlaceholder.style.display = 'block';
                        return false;
                    }
                    formattedContent = formatContent('vcard', '');
                } else {
                    content = contentInput.value.trim();
                    if (!content) {
                        canvas.style.display = 'none';
                        previewPlaceholder.style.display = 'block';
                        return false;
                    }
                    formattedContent = formatContent(template, content);
                }

                if (!formattedContent) {
                    canvas.style.display = 'none';
                    previewPlaceholder.style.display = 'block';
                    return false;
                }

                const sizeSelect = document.getElementById('qr-size');
                const customSizeInput = document.getElementById('qr-custom-size');
                const errorCorrection = document.getElementById('qr-error-correction').value;
                const fgColor = document.getElementById('qr-fg-color').value;
                const bgColor = document.getElementById('qr-bg-color').value;

                let size = 256;
                if (sizeSelect.value === 'custom') {
                    size = parseInt(customSizeInput.value) || 256;
                } else {
                    size = parseInt(sizeSelect.value);
                }

                if (qrCodeInstance) {
                    try {
                        qrCodeInstance.clear();
                    } catch (e) {
                        console.log('Error clearing QR instance:', e);
                    }
                }

                const container = document.createElement('div');
                container.style.display = 'none';
                document.body.appendChild(container);

                console.log('Generating QR code with:', { formattedContent, size, errorCorrection, fgColor, bgColor });

                qrCodeInstance = new qrCodeLib(container, {
                    text: formattedContent,
                    width: size,
                    height: size,
                    colorDark: fgColor,
                    colorLight: bgColor,
                    correctLevel: qrCodeLib.CorrectLevel[errorCorrection]
                });

                setTimeout(() => {
                    const img = container.querySelector('img');
                    if (img) {
                        const ctx = canvas.getContext('2d');
                        canvas.width = size;
                        canvas.height = size;
                        const tempImg = new Image();
                        tempImg.crossOrigin = 'anonymous';
                        tempImg.onload = () => {
                            ctx.fillStyle = bgColor;
                            ctx.fillRect(0, 0, size, size);
                            ctx.drawImage(tempImg, 0, 0);
                            canvas.style.display = 'block';
                            previewPlaceholder.style.display = 'none';
                        };
                        tempImg.onerror = (e) => {
                            console.error('Error loading QR image:', e);
                        };
                        tempImg.src = img.src;
                    } else {
                        const canvasEl = container.querySelector('canvas');
                        if (canvasEl) {
                            const ctx = canvas.getContext('2d');
                            canvas.width = size;
                            canvas.height = size;
                            ctx.fillStyle = bgColor;
                            ctx.fillRect(0, 0, size, size);
                            ctx.drawImage(canvasEl, 0, 0);
                            canvas.style.display = 'block';
                            previewPlaceholder.style.display = 'none';
                        } else {
                            console.error('No img or canvas found in QR container');
                            canvas.style.display = 'none';
                            previewPlaceholder.style.display = 'block';
                        }
                    }

                    if (container.parentNode) {
                        document.body.removeChild(container);
                    }
                }, 100);
                return true;
            } catch (error) {
                console.error('Error generating QR code:', error);
                ToolUtils.showNotification('Error generating QR code: ' + error.message, 3000);
                canvas.style.display = 'none';
                previewPlaceholder.style.display = 'block';
                return false;
            }
        };

        const updateQRCode = () => {
            if (debounceTimer) {
                clearTimeout(debounceTimer);
            }
            debounceTimer = setTimeout(() => {
                generateQRCodeNow();
            }, 300);
        };

        contentInput.addEventListener('input', updateQRCode);
        document.getElementById('qr-size').addEventListener('change', () => {
            const sizeSelect = document.getElementById('qr-size');
            const customSizeInput = document.getElementById('qr-custom-size');
            if (sizeSelect.value === 'custom') {
                customSizeInput.classList.add('active');
            } else {
                customSizeInput.classList.remove('active');
            }
            updateQRCode();
        });
        document.getElementById('qr-custom-size').addEventListener('input', updateQRCode);
        document.getElementById('qr-error-correction').addEventListener('change', updateQRCode);
        document.getElementById('qr-fg-color').addEventListener('change', updateQRCode);
        document.getElementById('qr-bg-color').addEventListener('change', updateQRCode);

        document.getElementById('vcard-name').addEventListener('input', updateQRCode);
        document.getElementById('vcard-phone').addEventListener('input', updateQRCode);
        document.getElementById('vcard-email').addEventListener('input', updateQRCode);

        document.getElementById('qr-generate-btn').addEventListener('click', () => {
            generateQRCodeNow();
        });

        document.getElementById('qr-download-png').addEventListener('click', () => {
            if (!canvas.style.display || canvas.style.display === 'none') {
                ToolUtils.showNotification('Please generate a QR code first', 2000);
                return;
            }
            canvas.toBlob((blob) => {
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'qrcode.png';
                a.click();
                URL.revokeObjectURL(url);
                ToolUtils.showNotification('QR code downloaded as PNG', 2000);
            });
        });

        document.getElementById('qr-download-svg').addEventListener('click', () => {
            if (!canvas.style.display || canvas.style.display === 'none') {
                ToolUtils.showNotification('Please generate a QR code first', 2000);
                return;
            }
            const sizeSelect = document.getElementById('qr-size');
            const customSizeInput = document.getElementById('qr-custom-size');
            let size = 256;
            if (sizeSelect.value === 'custom') {
                size = parseInt(customSizeInput.value) || 256;
            } else {
                size = parseInt(sizeSelect.value);
            }
            const fgColor = document.getElementById('qr-fg-color').value;
            const bgColor = document.getElementById('qr-bg-color').value;
            const template = templateSelect.value;
            let content = '';
            if (template === 'vcard') {
                content = formatContent('vcard', '');
            } else {
                content = contentInput.value.trim();
            }
            const formattedContent = formatContent(template, content);
            const errorCorrection = document.getElementById('qr-error-correction').value;

            const container = document.createElement('div');
            container.style.display = 'none';
            document.body.appendChild(container);

            const qr = new qrCodeLib(container, {
                text: formattedContent,
                width: size,
                height: size,
                colorDark: fgColor,
                colorLight: bgColor,
                correctLevel: qrCodeLib.CorrectLevel[errorCorrection]
            });

            setTimeout(() => {
                const canvasEl = container.querySelector('canvas');
                if (canvasEl) {
                    const svgNS = 'http://www.w3.org/2000/svg';
                    const svg = document.createElementNS(svgNS, 'svg');
                    svg.setAttribute('width', size);
                    svg.setAttribute('height', size);
                    svg.setAttribute('xmlns', svgNS);

                    const rect = document.createElementNS(svgNS, 'rect');
                    rect.setAttribute('width', size);
                    rect.setAttribute('height', size);
                    rect.setAttribute('fill', bgColor);
                    svg.appendChild(rect);

                    const image = document.createElementNS(svgNS, 'image');
                    image.setAttribute('width', size);
                    image.setAttribute('height', size);
                    image.setAttribute('href', canvasEl.toDataURL('image/png'));
                    svg.appendChild(image);

                    const svgData = new XMLSerializer().serializeToString(svg);
                    const blob = new Blob([svgData], { type: 'image/svg+xml' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'qrcode.svg';
                    a.click();
                    URL.revokeObjectURL(url);
                    ToolUtils.showNotification('QR code downloaded as SVG', 2000);
                }
                document.body.removeChild(container);
            }, 100);
        });

        document.getElementById('qr-copy-clipboard').addEventListener('click', async () => {
            if (!canvas.style.display || canvas.style.display === 'none') {
                ToolUtils.showNotification('Please generate a QR code first', 2000);
                return;
            }
            try {
                canvas.toBlob(async (blob) => {
                    await navigator.clipboard.write([
                        new ClipboardItem({ 'image/png': blob })
                    ]);
                    ToolUtils.showNotification('QR code copied to clipboard', 2000);
                });
            } catch (error) {
                ToolUtils.showNotification('Failed to copy image. Please download instead.', 3000);
            }
        });

        const startCamera = async () => {
            if (!html5QrCode) {
                ToolUtils.showNotification('QR scanner library not loaded', 2000);
                return;
            }

            if (scanner) {
                await stopCamera();
            }

            const videoContainer = document.getElementById('qr-video');
            const cameraContainer = document.getElementById('qr-camera-container');
            const startBtn = document.getElementById('qr-start-camera');
            const stopBtn = document.getElementById('qr-stop-camera');

            cameraContainer.classList.add('active');
            startBtn.style.display = 'none';
            stopBtn.style.display = 'inline-block';

            try {
                scanner = new html5QrCode('qr-video');
                
                const config = {
                    fps: 10,
                    qrbox: function(viewfinderWidth, viewfinderHeight) {
                        const minEdgePercentage = 0.7;
                        const minEdgeSize = Math.min(viewfinderWidth, viewfinderHeight);
                        const qrboxSize = Math.floor(minEdgeSize * minEdgePercentage);
                        return {
                            width: qrboxSize,
                            height: qrboxSize
                        };
                    },
                    aspectRatio: 1.0
                };

                const onScanSuccess = (decodedText, decodedResult) => {
                    console.log('QR Code scanned:', decodedText);
                    handleScanResult(decodedText);
                };

                const onScanFailure = (errorMessage) => {
                };

                try {
                    await scanner.start(
                        { facingMode: 'environment' },
                        config,
                        onScanSuccess,
                        onScanFailure
                    );
                    console.log('Camera started successfully');
                } catch (envError) {
                    console.log('Environment camera failed, trying user camera:', envError);
                    try {
                        await scanner.start(
                            { facingMode: 'user' },
                            config,
                            onScanSuccess,
                            onScanFailure
                        );
                        console.log('User camera started successfully');
                    } catch (userError) {
                        throw userError;
                    }
                }
            } catch (error) {
                console.error('Camera error:', error);
                let errorMsg = 'Failed to access camera. ';
                if (error.message) {
                    errorMsg += error.message;
                } else if (error.name === 'NotAllowedError') {
                    errorMsg += 'Camera permission denied. Please allow camera access.';
                } else if (error.name === 'NotFoundError') {
                    errorMsg += 'No camera found on this device.';
                } else {
                    errorMsg += 'Please check permissions and try again.';
                }
                ToolUtils.showNotification(errorMsg, 4000);
                if (scanner) {
                    try {
                        await scanner.stop().catch(() => {});
                        scanner.clear();
                    } catch (e) {
                        console.error('Error cleaning up scanner:', e);
                    }
                    scanner = null;
                }
                cameraContainer.classList.remove('active');
                startBtn.style.display = 'inline-block';
                stopBtn.style.display = 'none';
            }
        };

        const stopCamera = async () => {
            if (scanner) {
                try {
                    await scanner.stop().catch(() => {});
                    scanner.clear();
                } catch (error) {
                    console.error('Error stopping camera:', error);
                }
                scanner = null;
            }
            const videoContainer = document.getElementById('qr-video');
            if (videoContainer) {
                videoContainer.innerHTML = '';
            }
            const cameraContainer = document.getElementById('qr-camera-container');
            const startBtn = document.getElementById('qr-start-camera');
            const stopBtn = document.getElementById('qr-stop-camera');
            cameraContainer.classList.remove('active');
            startBtn.style.display = 'inline-block';
            stopBtn.style.display = 'none';
        };

        document.getElementById('qr-start-camera').addEventListener('click', startCamera);
        document.getElementById('qr-stop-camera').addEventListener('click', stopCamera);

        const uploadArea = document.getElementById('qr-upload-area');
        const fileInput = document.getElementById('qr-file-input');

        uploadArea.addEventListener('click', () => fileInput.click());
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('dragover');
        });
        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('dragover');
        });
        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
            const file = e.dataTransfer.files[0];
            if (file && file.type.startsWith('image/')) {
                scanImageFile(file);
            }
        });
        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                scanImageFile(file);
            }
        });

        const scanImageFile = async (file) => {
            if (!html5QrCode) {
                ToolUtils.showNotification('QR scanner library not loaded', 2000);
                return;
            }

            try {
                const tempId = 'temp-qr-scanner-' + Date.now();
                const tempDiv = document.createElement('div');
                tempDiv.id = tempId;
                tempDiv.style.display = 'none';
                document.body.appendChild(tempDiv);
                const html5QrCodeInstance = new html5QrCode(tempId);
                const result = await html5QrCodeInstance.scanFile(file, true);
                handleScanResult(result);
                html5QrCodeInstance.clear();
                document.body.removeChild(tempDiv);
            } catch (error) {
                ToolUtils.showNotification('No QR code found in image', 3000);
            }
        };

        const detectContentType = (text) => {
            if (text.startsWith('http://') || text.startsWith('https://')) {
                return { type: 'URL', isUrl: true };
            }
            if (text.startsWith('mailto:')) {
                return { type: 'Email', isUrl: false };
            }
            if (text.startsWith('tel:')) {
                return { type: 'Phone', isUrl: false };
            }
            if (text.startsWith('sms:')) {
                return { type: 'SMS', isUrl: false };
            }
            if (text.startsWith('WIFI:')) {
                return { type: 'WiFi', isUrl: false };
            }
            if (text.startsWith('BEGIN:VCARD')) {
                return { type: 'vCard', isUrl: false };
            }
            return { type: 'Text', isUrl: false };
        };

        const formatResult = (text, contentType) => {
            if (contentType === 'vCard') {
                const lines = text.split('\n');
                let formatted = '';
                lines.forEach(line => {
                    if (line.startsWith('FN:')) {
                        formatted += `Name: ${line.substring(3)}\n`;
                    } else if (line.startsWith('TEL:')) {
                        formatted += `Phone: ${line.substring(4)}\n`;
                    } else if (line.startsWith('EMAIL:')) {
                        formatted += `Email: ${line.substring(6)}\n`;
                    }
                });
                return formatted.trim() || text;
            }
            return text;
        };

        const handleScanResult = (decodedText) => {
            const resultDiv = document.getElementById('qr-scan-result');
            const resultContent = document.getElementById('qr-scan-result-content');
            const contentTypeDiv = document.getElementById('qr-content-type');
            const urlWarning = document.getElementById('qr-url-warning');
            const urlPreview = document.getElementById('qr-url-preview');
            const openLinkBtn = document.getElementById('qr-open-link');
            const copyBtn = document.getElementById('qr-copy-result');

            const contentType = detectContentType(decodedText);
            contentTypeDiv.textContent = contentType.type;
            resultContent.textContent = formatResult(decodedText, contentType.type);
            resultDiv.classList.add('active');

            if (contentType.isUrl) {
                urlWarning.style.display = 'block';
                urlPreview.textContent = decodedText;
                openLinkBtn.style.display = 'inline-block';
                openLinkBtn.onclick = () => {
                    if (confirm(`You are about to open: ${decodedText}\n\nContinue?`)) {
                        window.open(decodedText, '_blank');
                    }
                };
            } else {
                urlWarning.style.display = 'none';
                openLinkBtn.style.display = 'none';
            }

            copyBtn.onclick = () => {
                ToolUtils.copyToClipboard(decodedText);
            };

            addToHistory(decodedText);
        };

        const addToHistory = (text) => {
            scanHistory.unshift(text);
            if (scanHistory.length > 10) {
                scanHistory = scanHistory.slice(0, 10);
            }
            localStorage.setItem('qr_scan_history', JSON.stringify(scanHistory));
            updateHistoryDisplay();
        };

        const updateHistoryDisplay = () => {
            const historyDiv = document.getElementById('qr-scan-history');
            const historyList = document.getElementById('qr-history-list');

            if (scanHistory.length === 0) {
                historyDiv.classList.remove('active');
                return;
            }

            historyDiv.classList.add('active');
            historyList.innerHTML = scanHistory.map((item, index) => {
                const preview = item.length > 50 ? item.substring(0, 50) + '...' : item;
                return `<div class="qr-history-item" data-index="${index}">${preview}</div>`;
            }).join('');

            historyList.querySelectorAll('.qr-history-item').forEach(item => {
                item.addEventListener('click', () => {
                    const index = parseInt(item.dataset.index);
                    const text = scanHistory[index];
                    document.getElementById('qr-scan-result-content').textContent = text;
                    const contentType = detectContentType(text);
                    document.getElementById('qr-content-type').textContent = contentType.type;
                    document.getElementById('qr-scan-result').classList.add('active');
                });
            });
        };

        updateHistoryDisplay();

        const loadLibraries = async () => {
            try {
                qrCodeLib = await loadQRCodeLib();
                html5QrCode = await loadHtml5QrCode();
                console.log('QR Code libraries loaded:', { qrCodeLib: !!qrCodeLib, html5QrCode: !!html5QrCode });
                setTimeout(() => {
                    updateQRCode();
                }, 200);
            } catch (error) {
                console.error('Failed to load QR code libraries:', error);
                ToolUtils.showNotification('Failed to load QR code libraries. Please refresh the page.', 5000);
            }
        };

        await loadLibraries();
    }
};

