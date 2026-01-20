
export default {
    title: 'JWT Decoder',
    styles: `
        .jwt-container {
            max-width: 900px;
            margin: 0 auto;
        }

        .jwt-info-panel {
            background: var(--bg-secondary);
            border: 1px solid var(--border-color);
            border-radius: 4px;
            padding: 15px;
            margin-bottom: 20px;
        }

        .jwt-info-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px 0;
            border-bottom: 1px solid var(--border-color);
        }

        .jwt-info-row:last-child {
            border-bottom: none;
        }

        .jwt-info-label {
            font-weight: 600;
            color: var(--text-secondary);
            font-size: 13px;
        }

        .jwt-info-value {
            color: var(--text-primary);
            font-size: 13px;
            text-align: right;
        }

        .jwt-info-value.expired {
            color: #f48771;
        }

        .jwt-info-value.valid {
            color: #4ec9b0;
        }

        .jwt-output-group {
            position: relative;
        }

        .jwt-copy-btn {
            position: absolute;
            top: 28px;
            right: 10px;
            background: var(--bg-tertiary);
            border: 1px solid var(--border-color);
            border-radius: 4px;
            padding: 6px 10px;
            color: var(--text-secondary);
            cursor: pointer;
            font-size: 12px;
            transition: all var(--transition-speed);
            z-index: 10;
        }

        .jwt-copy-btn:hover {
            background: var(--bg-hover);
            border-color: var(--accent-color);
            color: var(--accent-color);
        }

        .jwt-output-group textarea {
            font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
            font-size: 13px;
            padding-right: 80px;
        }
    `,
    html: `
        <div class="tool-info">
            <i class="fas fa-info-circle" style="margin-right: 8px;"></i>
            Decode and inspect JWT (JSON Web Token) tokens. Paste a JWT to see its header and payload.
        </div>
        <div class="tool-section">
            <div class="jwt-container">
                <div class="tool-input-group">
                    <label for="jwt-input">JWT Token</label>
                    <textarea id="jwt-input" placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c" style="min-height: 100px;"></textarea>
                </div>
                <div style="display: flex; gap: 10px; margin-bottom: 20px;">
                    <button class="tool-button" onclick="decodeJWT()">Decode JWT</button>
                    <button class="tool-button secondary" onclick="clearJWT()">Clear</button>
                </div>

                <div id="jwt-info-panel" style="display: none;">
                    <div class="jwt-info-panel">
                        <div class="jwt-info-row">
                            <span class="jwt-info-label">Algorithm</span>
                            <span class="jwt-info-value" id="jwt-algorithm">-</span>
                        </div>
                        <div class="jwt-info-row">
                            <span class="jwt-info-label">Token Type</span>
                            <span class="jwt-info-value" id="jwt-type">-</span>
                        </div>
                        <div class="jwt-info-row">
                            <span class="jwt-info-label">Issued At</span>
                            <span class="jwt-info-value" id="jwt-issued">-</span>
                        </div>
                        <div class="jwt-info-row">
                            <span class="jwt-info-label">Expires At</span>
                            <span class="jwt-info-value" id="jwt-expires">-</span>
                        </div>
                        <div class="jwt-info-row">
                            <span class="jwt-info-label">Status</span>
                            <span class="jwt-info-value" id="jwt-status">-</span>
                        </div>
                    </div>
                </div>

                <div class="tool-input-group jwt-output-group">
                    <label for="jwt-header">Header</label>
                    <button class="jwt-copy-btn" onclick="copyJWT('header')" title="Copy header">
                        <i class="fas fa-copy"></i> Copy
                    </button>
                    <textarea id="jwt-header" readonly placeholder="Header will appear here..." style="min-height: 150px;"></textarea>
                </div>

                <div class="tool-input-group jwt-output-group">
                    <label for="jwt-payload">Payload</label>
                    <button class="jwt-copy-btn" onclick="copyJWT('payload')" title="Copy payload">
                        <i class="fas fa-copy"></i> Copy
                    </button>
                    <textarea id="jwt-payload" readonly placeholder="Payload will appear here..." style="min-height: 200px;"></textarea>
                </div>

                <div class="tool-input-group jwt-output-group" style="margin-top: 15px;">
                    <label for="jwt-signature">Signature (Base64)</label>
                    <button class="jwt-copy-btn" onclick="copyJWT('signature')" title="Copy signature">
                        <i class="fas fa-copy"></i> Copy
                    </button>
                    <textarea id="jwt-signature" readonly placeholder="Signature will appear here..." style="min-height: 80px;"></textarea>
                </div>
            </div>
        </div>
    `,
    init() {
        function base64UrlDecode(str) {
            str = str.replace(/-/g, '+').replace(/_/g, '/');
            while (str.length % 4) {
                str += '=';
            }
            try {
                return atob(str);
            } catch (e) {
                throw new Error('Invalid base64 encoding');
            }
        }

        function formatTimestamp(timestamp) {
            if (!timestamp) return 'Not set';
            const date = new Date(timestamp * 1000);
            return date.toLocaleString();
        }

        function updateInfoPanel(header, payload) {
            const infoPanel = document.getElementById('jwt-info-panel');
            const algorithmEl = document.getElementById('jwt-algorithm');
            const typeEl = document.getElementById('jwt-type');
            const issuedEl = document.getElementById('jwt-issued');
            const expiresEl = document.getElementById('jwt-expires');
            const statusEl = document.getElementById('jwt-status');

            algorithmEl.textContent = header.alg || 'Not specified';
            typeEl.textContent = header.typ || 'JWT';
            issuedEl.textContent = payload.iat ? formatTimestamp(payload.iat) : 'Not set';
            
            if (payload.exp) {
                const expDate = new Date(payload.exp * 1000);
                expiresEl.textContent = formatTimestamp(payload.exp);
                expiresEl.className = 'jwt-info-value ' + (expDate < new Date() ? 'expired' : 'valid');
            } else {
                expiresEl.textContent = 'Not set';
                expiresEl.className = 'jwt-info-value';
            }

            let status = 'Valid';
            let statusClass = 'valid';
            if (payload.exp) {
                const expDate = new Date(payload.exp * 1000);
                if (expDate < new Date()) {
                    status = 'Expired';
                    statusClass = 'expired';
                }
            }
            if (payload.nbf && new Date(payload.nbf * 1000) > new Date()) {
                status = 'Not yet valid';
                statusClass = 'expired';
            }

            statusEl.textContent = status;
            statusEl.className = 'jwt-info-value ' + statusClass;
            infoPanel.style.display = 'block';
        }

        window.decodeJWT = () => {
            const input = document.getElementById('jwt-input').value.trim();
            const headerOutput = document.getElementById('jwt-header');
            const payloadOutput = document.getElementById('jwt-payload');
            const signatureOutput = document.getElementById('jwt-signature');
            const infoPanel = document.getElementById('jwt-info-panel');
            
            if (!input) {
                ToolUtils.showNotification('Please enter a JWT token');
                return;
            }
            
            try {
                const parts = input.split('.');
                if (parts.length !== 3) {
                    throw new Error('Invalid JWT format. Expected 3 parts separated by dots.');
                }
                
                const headerJson = base64UrlDecode(parts[0]);
                const header = JSON.parse(headerJson);
                headerOutput.value = JSON.stringify(header, null, 2);
                
                const payloadJson = base64UrlDecode(parts[1]);
                const payload = JSON.parse(payloadJson);
                payloadOutput.value = JSON.stringify(payload, null, 2);
                
                signatureOutput.value = parts[2];
                
                updateInfoPanel(header, payload);
            } catch (error) {
                headerOutput.value = `Error: ${error.message}`;
                payloadOutput.value = '';
                signatureOutput.value = '';
                infoPanel.style.display = 'none';
                ToolUtils.showNotification(`Decode error: ${error.message}`, 3000);
            }
        };
        
        window.clearJWT = () => {
            document.getElementById('jwt-input').value = '';
            document.getElementById('jwt-header').value = '';
            document.getElementById('jwt-payload').value = '';
            document.getElementById('jwt-signature').value = '';
            document.getElementById('jwt-info-panel').style.display = 'none';
        };

        window.copyJWT = (type) => {
            let text = '';
            if (type === 'header') {
                text = document.getElementById('jwt-header').value;
            } else if (type === 'payload') {
                text = document.getElementById('jwt-payload').value;
            } else if (type === 'signature') {
                text = document.getElementById('jwt-signature').value;
            }
            
            if (text && !text.startsWith('Error:')) {
                ToolUtils.copyToClipboard(text);
            }
        };

        const jwtInput = document.getElementById('jwt-input');
        if (jwtInput) {
            jwtInput.addEventListener('paste', () => {
                setTimeout(() => {
                    if (jwtInput.value.trim().split('.').length === 3) {
                        decodeJWT();
                    }
                }, 10);
            });
        }
    }
};
