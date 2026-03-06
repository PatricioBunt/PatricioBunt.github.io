
export default {
    title: 'Binary / Executable Converter',
    styles: `
        .bc-tabs {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-bottom: 20px;
            border-bottom: 2px solid var(--border-color);
        }
        .bc-tab {
            padding: 10px 16px;
            background: transparent;
            border: none;
            border-bottom: 2px solid transparent;
            color: var(--text-secondary);
            cursor: pointer;
            transition: all var(--transition-speed);
            font-size: 13px;
            margin-bottom: -2px;
        }
        .bc-tab:hover { color: var(--text-primary); }
        .bc-tab.active {
            color: var(--accent-color);
            border-bottom-color: var(--accent-color);
        }
        .bc-content { display: none; }
        .bc-content.active { display: block; }
        .bc-file-input {
            padding: 10px;
            background: var(--bg-secondary);
            border: 1px solid var(--border-color);
            border-radius: 4px;
            color: var(--text-primary);
            width: 100%;
            max-width: 400px;
        }
        .bc-output {
            font-family: var(--font-mono, monospace);
            font-size: 12px;
            white-space: pre-wrap;
            word-break: break-all;
        }
        .hex-dump-cols {
            display: grid;
            grid-template-columns: 180px 1fr 480px;
            gap: 0;
            border: 1px solid var(--border-color);
            border-radius: 4px;
            overflow: hidden;
            background: var(--bg-secondary);
            min-width: 400px;
        }
        .hex-dump-cols textarea {
            resize: none;
            border: none;
            border-right: 1px solid var(--border-color);
            padding: 10px;
            font-family: var(--font-mono, monospace);
            font-size: 12px;
            line-height: 1.4;
            white-space: pre;
            background: transparent;
            color: var(--text-primary);
            min-width: 0;
            box-sizing: border-box;
        }
        .hex-dump-cols textarea:last-child { border-right: none; }
        .hex-dump-col-offset { color: var(--text-secondary); }
        .hex-dump-col-hex { min-width: 0; overflow: auto; }
        .hex-dump-col-ascii { color: var(--text-secondary); }
    `,
    html: `
        <div class="tool-info">
            Convert files (e.g. EXE, DLL, any binary) to Hex, Binary, or Shellcode format, or reconstruct a file from Hex, Binary, or Shellcode. Useful for analysis, payloads, and scripting.
        </div>

        <div class="bc-tabs">
            <button class="bc-tab active" data-tab="to-hex" onclick="switchBCTab('to-hex')">
                <i class="fas fa-file-code" style="margin-right:6px;"></i> File → Hex
            </button>
            <button class="bc-tab" data-tab="to-binary" onclick="switchBCTab('to-binary')">
                <i class="fas fa-file-alt" style="margin-right:6px;"></i> File → Binary
            </button>
            <button class="bc-tab" data-tab="to-shellcode" onclick="switchBCTab('to-shellcode')">
                <i class="fas fa-terminal" style="margin-right:6px;"></i> File → Shellcode
            </button>
            <button class="bc-tab" data-tab="to-base64" onclick="switchBCTab('to-base64')">
                <i class="fas fa-layer-group" style="margin-right:6px;"></i> File → Base64
            </button>
            <button class="bc-tab" data-tab="from-hex" onclick="switchBCTab('from-hex')">
                <i class="fas fa-code" style="margin-right:6px;"></i> Hex → File
            </button>
            <button class="bc-tab" data-tab="from-binary" onclick="switchBCTab('from-binary')">
                <i class="fas fa-binary" style="margin-right:6px;"></i> Binary → File
            </button>
            <button class="bc-tab" data-tab="from-shellcode" onclick="switchBCTab('from-shellcode')">
                <i class="fas fa-terminal" style="margin-right:6px;"></i> Shellcode → File
            </button>
            <button class="bc-tab" data-tab="from-base64" onclick="switchBCTab('from-base64')">
                <i class="fas fa-layer-group" style="margin-right:6px;"></i> Base64 → File
            </button>
        </div>

        <!-- File → Hex -->
        <div id="bc-to-hex" class="bc-content active">
            <div class="tool-section">
                <div class="tool-input-group">
                    <label>Select file</label>
                    <input type="file" id="bc-file-hex" class="bc-file-input" />
                </div>
                <div class="tool-input-group">
                    <label>Hex dump (offset | hex | ASCII — scroll is synced; copy from any column)</label>
                    <div class="hex-dump-cols">
                        <textarea id="bc-hex-offset" class="hex-dump-col-offset" readonly placeholder="Offset" rows="12"></textarea>
                        <textarea id="bc-hex-hex" class="hex-dump-col-hex" readonly placeholder="Hex" rows="12"></textarea>
                        <textarea id="bc-hex-ascii" class="hex-dump-col-ascii" readonly placeholder="ASCII" rows="12"></textarea>
                    </div>
                </div>
                <div style="display:flex;gap:8px;flex-wrap:wrap;">
                    <button class="tool-button secondary" onclick="copyBCOutput('bc-hex-offset')">Copy offset</button>
                    <button class="tool-button" onclick="copyBCOutput('bc-hex-hex')">Copy hex only</button>
                    <button class="tool-button secondary" onclick="copyBCOutput('bc-hex-ascii')">Copy ASCII</button>
                </div>
            </div>
        </div>

        <!-- File → Binary -->
        <div id="bc-to-binary" class="bc-content">
            <div class="tool-section">
                <div class="tool-input-group">
                    <label>Select file</label>
                    <input type="file" id="bc-file-binary" class="bc-file-input" />
                </div>
                <div class="tool-input-group">
                    <label>Binary output (0/1)</label>
                    <textarea id="bc-out-binary" class="tool-textarea bc-output" readonly placeholder="Binary string will appear here..." rows="12"></textarea>
                </div>
                <button class="tool-button" onclick="copyBCOutput('bc-out-binary')">Copy</button>
            </div>
        </div>

        <!-- File → Shellcode -->
        <div id="bc-to-shellcode" class="bc-content">
            <div class="tool-section">
                <div class="tool-input-group">
                    <label>Select file</label>
                    <input type="file" id="bc-file-shellcode" class="bc-file-input" />
                </div>
                <div class="tool-input-group">
                    <label>Shellcode (\\xNN)</label>
                    <textarea id="bc-out-shellcode" class="tool-textarea bc-output" readonly placeholder="Shellcode will appear here..." rows="12"></textarea>
                </div>
                <button class="tool-button" onclick="copyBCOutput('bc-out-shellcode')">Copy</button>
            </div>
        </div>

        <!-- File → Base64 -->
        <div id="bc-to-base64" class="bc-content">
            <div class="tool-section">
                <div class="tool-input-group">
                    <label>Select file</label>
                    <input type="file" id="bc-file-base64" class="bc-file-input" />
                </div>
                <div class="tool-input-group">
                    <label>Base64 output</label>
                    <textarea id="bc-out-base64" class="tool-textarea bc-output" readonly placeholder="Base64 will appear here..." rows="12"></textarea>
                </div>
                <button class="tool-button" onclick="copyBCOutput('bc-out-base64')">Copy</button>
            </div>
        </div>

        <!-- Hex → File -->
        <div id="bc-from-hex" class="bc-content">
            <div class="tool-section">
                <div class="tool-input-group">
                    <label>Hex string (with or without spaces/0x)</label>
                    <textarea id="bc-in-hex" class="tool-textarea bc-output" placeholder="Paste hex e.g. 4D5A or 0x4D 0x5A..." rows="8"></textarea>
                </div>
                <div class="tool-input-group">
                    <label>Download as filename (optional)</label>
                    <input type="text" id="bc-filename-hex" placeholder="output.bin" class="bc-file-input" style="max-width:300px;" />
                </div>
                <button class="tool-button" onclick="downloadBCFromHex()">Download as file</button>
            </div>
        </div>

        <!-- Binary → File -->
        <div id="bc-from-binary" class="bc-content">
            <div class="tool-section">
                <div class="tool-input-group">
                    <label>Binary string (0s and 1s)</label>
                    <textarea id="bc-in-binary" class="tool-textarea bc-output" placeholder="Paste binary e.g. 01001101 01011010..." rows="8"></textarea>
                </div>
                <div class="tool-input-group">
                    <label>Download as filename (optional)</label>
                    <input type="text" id="bc-filename-binary" placeholder="output.bin" class="bc-file-input" style="max-width:300px;" />
                </div>
                <button class="tool-button" onclick="downloadBCFromBinary()">Download as file</button>
            </div>
        </div>

        <!-- Shellcode → File -->
        <div id="bc-from-shellcode" class="bc-content">
            <div class="tool-section">
                <div class="tool-input-group">
                    <label>Shellcode (\\xNN or 0xNN)</label>
                    <textarea id="bc-in-shellcode" class="tool-textarea bc-output" placeholder="Paste e.g. \\x4D\\x5A or 0x4D 0x5A..." rows="8"></textarea>
                </div>
                <div class="tool-input-group">
                    <label>Download as filename (optional)</label>
                    <input type="text" id="bc-filename-shellcode" placeholder="output.bin" class="bc-file-input" style="max-width:300px;" />
                </div>
                <button class="tool-button" onclick="downloadBCFromShellcode()">Download as file</button>
            </div>
        </div>

        <!-- Base64 → File -->
        <div id="bc-from-base64" class="bc-content">
            <div class="tool-section">
                <div class="tool-input-group">
                    <label>Base64 string</label>
                    <textarea id="bc-in-base64" class="tool-textarea bc-output" placeholder="Paste Base64 data..." rows="8"></textarea>
                </div>
                <div class="tool-input-group">
                    <label>Download as filename (optional)</label>
                    <input type="text" id="bc-filename-base64" placeholder="output.bin" class="bc-file-input" style="max-width:300px;" />
                </div>
                <button class="tool-button" onclick="downloadBCFromBase64()">Download as file</button>
            </div>
        </div>
    `,
    init() {
        const bytesToHexDump = (bytes) => {
            const bytesPerLine = 16;
            const offsetLines = [];
            const hexLines = [];
            const asciiLines = [];
            for (let i = 0; i < bytes.length; i += bytesPerLine) {
                const chunk = bytes.slice(i, i + bytesPerLine);
                offsetLines.push(('00000000' + i.toString(16)).slice(-8));
                hexLines.push(Array.from(chunk).map(b => ('0' + (b & 0xff).toString(16)).slice(-2)).join(' '));
                asciiLines.push('|' + Array.from(chunk).map(b => (b >= 32 && b < 127) ? String.fromCharCode(b) : '.').join('') + '|');
            }
            return { offset: offsetLines.join('\n'), hex: hexLines.join('\n'), ascii: asciiLines.join('\n') };
        };

        const bytesToHexRaw = (bytes) => {
            return Array.from(bytes).map(b => ('0' + (b & 0xff).toString(16)).slice(-2)).join('');
        };

        const bytesToBinary = (bytes) => {
            return Array.from(bytes).map(b => (b & 0xff).toString(2).padStart(8, '0')).join(' ');
        };

        const bytesToShellcode = (bytes) => {
            return Array.from(bytes).map(b => '\\x' + ('0' + (b & 0xff).toString(16)).slice(-2)).join('');
        };

        const readFile = (fileInputId, callback) => {
            const input = document.getElementById(fileInputId);
            const file = input?.files?.[0];
            if (!file) {
                ToolUtils.showNotification('Select a file first', 2000);
                return;
            }
            const reader = new FileReader();
            reader.onload = (e) => callback(new Uint8Array(e.target.result));
            reader.readAsArrayBuffer(file);
        };

        const setOutput = (id, text) => {
            const el = document.getElementById(id);
            if (el) el.value = text;
        };

        const hexTextareas = ['bc-hex-offset', 'bc-hex-hex', 'bc-hex-ascii'];
        hexTextareas.forEach(id => {
            const ta = document.getElementById(id);
            if (!ta) return;
            ta.addEventListener('scroll', () => {
                const top = ta.scrollTop;
                hexTextareas.forEach(otherId => {
                    const other = document.getElementById(otherId);
                    if (other && other !== ta) other.scrollTop = top;
                });
            });
        });

        document.getElementById('bc-file-hex')?.addEventListener('change', (e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (ev) => {
                const bytes = new Uint8Array(ev.target.result);
                const dump = bytesToHexDump(bytes);
                setOutput('bc-hex-offset', dump.offset);
                setOutput('bc-hex-hex', dump.hex);
                setOutput('bc-hex-ascii', dump.ascii);
            };
            reader.readAsArrayBuffer(file);
        });

        document.getElementById('bc-file-binary')?.addEventListener('change', (e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (ev) => {
                const bytes = new Uint8Array(ev.target.result);
                setOutput('bc-out-binary', bytesToBinary(bytes));
            };
            reader.readAsArrayBuffer(file);
        });

        document.getElementById('bc-file-shellcode')?.addEventListener('change', (e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (ev) => {
                const bytes = new Uint8Array(ev.target.result);
                setOutput('bc-out-shellcode', bytesToShellcode(bytes));
            };
            reader.readAsArrayBuffer(file);
        });

        document.getElementById('bc-file-base64')?.addEventListener('change', (e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (ev) => {
                const binary = ev.target.result;
                setOutput('bc-out-base64', btoa(String.fromCharCode(...new Uint8Array(binary))));
            };
            reader.readAsArrayBuffer(file);
        });

        const parseHex = (str) => {
            const raw = str.replace(/\s|0x|,|;/gi, '').replace(/[^0-9a-fA-F]/g, '');
            if (raw.length % 2) return null;
            const bytes = new Uint8Array(raw.length / 2);
            for (let i = 0; i < raw.length; i += 2) bytes[i / 2] = parseInt(raw.substr(i, 2), 16);
            return bytes;
        };

        const parseBinary = (str) => {
            const raw = str.replace(/\s/g, '').replace(/[^01]/g, '');
            if (raw.length % 8) return null;
            const bytes = new Uint8Array(raw.length / 8);
            for (let i = 0; i < raw.length; i += 8) bytes[i / 8] = parseInt(raw.substr(i, 8), 2);
            return bytes;
        };

        const parseShellcode = (str) => {
            const hexMatches = str.match(/\\x([0-9a-fA-F]{2})|0x([0-9a-fA-F]{1,2})\b/g);
            if (!hexMatches) return null;
            const bytes = [];
            for (const m of hexMatches) {
                const hex = m.replace(/\\x|0x/gi, '');
                bytes.push(parseInt(hex.padStart(2, '0').slice(-2), 16));
            }
            return new Uint8Array(bytes);
        };

        const downloadBytes = (bytes, defaultName) => {
            const name = (document.getElementById(defaultName)?.value?.trim()) || 'output.bin';
            const blob = new Blob([bytes]);
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = name;
            a.click();
            URL.revokeObjectURL(a.href);
            ToolUtils.showNotification('Download started', 1500);
        };

        window.switchBCTab = (tab) => {
            document.querySelectorAll('.bc-tab').forEach(t => t.classList.remove('active'));
            document.querySelector(`.bc-tab[data-tab="${tab}"]`)?.classList.add('active');
            document.querySelectorAll('.bc-content').forEach(c => c.classList.remove('active'));
            document.getElementById('bc-' + tab)?.classList.add('active');
        };

        window.copyBCOutput = (id) => {
            const el = document.getElementById(id);
            if (el?.value) ToolUtils.copyToClipboard(el.value);
        };

        window.downloadBCFromHex = () => {
            const str = document.getElementById('bc-in-hex')?.value || '';
            const bytes = parseHex(str);
            if (!bytes) { ToolUtils.showNotification('Invalid hex (need even number of hex digits)', 2500); return; }
            downloadBytes(bytes, 'bc-filename-hex');
        };

        window.downloadBCFromBinary = () => {
            const str = document.getElementById('bc-in-binary')?.value || '';
            const bytes = parseBinary(str);
            if (!bytes) { ToolUtils.showNotification('Invalid binary (use only 0 and 1, length multiple of 8)', 2500); return; }
            downloadBytes(bytes, 'bc-filename-binary');
        };

        window.downloadBCFromShellcode = () => {
            const str = document.getElementById('bc-in-shellcode')?.value || '';
            const bytes = parseShellcode(str);
            if (!bytes || bytes.length === 0) { ToolUtils.showNotification('Invalid shellcode (use \\xNN or 0xNN)', 2500); return; }
            downloadBytes(bytes, 'bc-filename-shellcode');
        };

        window.downloadBCFromBase64 = () => {
            const str = (document.getElementById('bc-in-base64')?.value || '').trim();
            try {
                const binary = atob(str.replace(/\s/g, ''));
                const bytes = new Uint8Array(binary.length);
                for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
                downloadBytes(bytes, 'bc-filename-base64');
            } catch (e) {
                ToolUtils.showNotification('Invalid Base64', 2500);
            }
        };
    }
};
