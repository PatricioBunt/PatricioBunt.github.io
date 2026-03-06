
export default {
    title: 'Hex Obfuscator / Deobfuscator',
    styles: `
        .ho-tabs {
            display: flex;
            gap: 8px;
            margin-bottom: 20px;
            border-bottom: 2px solid var(--border-color);
        }
        .ho-tab {
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
        .ho-tab:hover { color: var(--text-primary); }
        .ho-tab.active {
            color: var(--accent-color);
            border-bottom-color: var(--accent-color);
        }
        .ho-content { display: none; }
        .ho-content.active { display: block; }
        .ho-textarea {
            font-family: var(--font-mono, monospace);
            font-size: 12px;
            white-space: pre-wrap;
            word-break: break-all;
        }
        .ho-format-grid { display: flex; flex-wrap: wrap; gap: 12px 20px; margin-bottom: 12px; }
        .ho-format-grid label { display: flex; align-items: center; gap: 6px; cursor: pointer; }
        .ho-input-mode { margin-bottom: 12px; }
        .ho-input-mode select { padding: 8px 12px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 4px; color: var(--text-primary); }
        .ho-file-in { padding: 8px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 4px; color: var(--text-primary); max-width: 400px; }
        .ho-hex-dump-cols {
            display: grid;
            grid-template-columns: 180px 1fr 480px;
            gap: 0;
            border: 1px solid var(--border-color);
            border-radius: 4px;
            overflow: hidden;
            background: var(--bg-secondary);
            min-width: 400px;
        }
        .ho-hex-dump-cols textarea {
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
        .ho-hex-dump-cols textarea:last-child { border-right: none; }
        .ho-hex-dump-col-offset { color: var(--text-secondary); }
        .ho-hex-dump-col-hex { min-width: 0; overflow: auto; }
        .ho-hex-dump-col-ascii { color: var(--text-secondary); }
    `,
    html: `
        <div class="tool-info">
            Obfuscate hex (or raw bytes) so it looks like addresses or UUIDs—data unchanged, only reformatted. Deobfuscate back to hex. Input can be hex, Base64, or a file. Useful for hiding payloads in plain sight or passing data through systems that expect specific formats.
        </div>

        <div class="ho-tabs">
            <button class="ho-tab active" data-tab="obfuscate" onclick="switchHOTab('obfuscate')">
                <i class="fas fa-mask" style="margin-right:6px;"></i> Hex → Addresses (Obfuscate)
            </button>
            <button class="ho-tab" data-tab="deobfuscate" onclick="switchHOTab('deobfuscate')">
                <i class="fas fa-unlock" style="margin-right:6px;"></i> Addresses → Hex (Deobfuscate)
            </button>
        </div>

        <div id="ho-obfuscate" class="ho-content active">
            <div class="tool-section">
                <div class="tool-input-group ho-input-mode">
                    <label for="ho-input-type">Input as</label>
                    <select id="ho-input-type" onchange="toggleHOInputType()">
                        <option value="hex">Hex (paste)</option>
                        <option value="base64">Base64 (paste)</option>
                        <option value="file">File (upload)</option>
                    </select>
                </div>
                <div id="ho-paste-area" class="tool-input-group">
                    <label for="ho-hex-in">Hex or Base64 (only hex digits used for hex; Base64 decoded to bytes then to hex)</label>
                    <textarea id="ho-hex-in" class="tool-textarea ho-textarea" placeholder="e.g. deadbeef0123456789abcdef or base64..." rows="6"></textarea>
                </div>
                <div id="ho-file-area" class="tool-input-group" style="display:none;">
                    <label for="ho-file-in">Upload file (bytes converted to hex)</label>
                    <input type="file" id="ho-file-in" class="ho-file-in" />
                </div>
                <div class="tool-input-group">
                    <label>Output formats (pick one or more; data is chunked and formatted as selected)</label>
                    <div class="ho-format-grid">
                        <label><input type="checkbox" id="ho-fmt-ipv6" checked /> IPv6 (32 hex → 8 groups)</label>
                        <label><input type="checkbox" id="ho-fmt-ipv4" checked /> IPv4 (8 hex → 4 decimals)</label>
                        <label><input type="checkbox" id="ho-fmt-mac" checked /> MAC (12 hex → 6 pairs)</label>
                        <label><input type="checkbox" id="ho-fmt-uuid" /> UUID (32 hex → 8-4-4-4-12)</label>
                    </div>
                    <label class="ho-checkbox-label" style="display:inline-flex;align-items:center;gap:8px;margin-top:8px;">
                        <input type="checkbox" id="ho-shuffle" checked />
                        Shuffle format order when multiple selected
                    </label>
                </div>
                <div style="margin-bottom:12px;">
                    <button class="tool-button" onclick="runObfuscate()">Obfuscate</button>
                </div>
                <div class="tool-input-group">
                    <label for="ho-obf-out">Output (one formatted line per chunk)</label>
                    <textarea id="ho-obf-out" class="tool-textarea ho-textarea" readonly placeholder="Obfuscated lines will appear here..." rows="12"></textarea>
                </div>
                <button class="tool-button secondary" onclick="copyHOOutput('ho-obf-out')">Copy output</button>
            </div>
        </div>

        <div id="ho-deobfuscate" class="ho-content">
            <div class="tool-section">
                <div class="tool-input-group">
                    <label for="ho-addr-in">Obfuscated lines (IPv6, IPv4, MAC, UUID, or 0x… for remainder; one per line)</label>
                    <textarea id="ho-addr-in" class="tool-textarea ho-textarea" placeholder="e.g.&#10;dead:beef:0123:4567:89ab:cdef:0000:1111&#10;222.173.190.239&#10;de:ad:be:ef:01:23" rows="12"></textarea>
                </div>
                <div style="margin-bottom:12px;">
                    <button class="tool-button" onclick="runDeobfuscate()">Deobfuscate</button>
                </div>
                <div class="tool-input-group">
                    <label>Hex output (offset | hex | ASCII — scroll synced; copy from any column)</label>
                    <div class="ho-hex-dump-cols">
                        <textarea id="ho-hex-offset" class="ho-hex-dump-col-offset" readonly placeholder="Offset" rows="12"></textarea>
                        <textarea id="ho-hex-hex" class="ho-hex-dump-col-hex" readonly placeholder="Hex" rows="12"></textarea>
                        <textarea id="ho-hex-ascii" class="ho-hex-dump-col-ascii" readonly placeholder="ASCII" rows="12"></textarea>
                    </div>
                </div>
                <div style="display:flex;gap:8px;flex-wrap:wrap;">
                    <button class="tool-button secondary" onclick="copyHOOutput('ho-hex-offset')">Copy offset</button>
                    <button class="tool-button" onclick="copyHOOutput('ho-hex-hex')">Copy hex only</button>
                    <button class="tool-button secondary" onclick="copyHOOutput('ho-hex-ascii')">Copy ASCII</button>
                </div>
            </div>
        </div>
    `,
    init() {
        function normalizeHex(text) {
            return String(text).replace(/[^0-9a-fA-F]/g, '');
        }

        function bytesToHex(bytes) {
            return Array.from(bytes).map(b => (b & 0xff).toString(16).padStart(2, '0')).join('');
        }

        const formatters = {
            ipv6: {
                size: 32,
                encode(hexStr) {
                    const parts = [];
                    for (let i = 0; i < hexStr.length; i += 4) parts.push(hexStr.slice(i, i + 4));
                    return parts.join(':');
                },
            },
            ipv4: {
                size: 8,
                encode(hexStr) {
                    const parts = [];
                    for (let i = 0; i < hexStr.length; i += 2) parts.push(String(parseInt(hexStr.slice(i, i + 2), 16)));
                    return parts.join('.');
                },
            },
            mac: {
                size: 12,
                encode(hexStr) {
                    const parts = [];
                    for (let i = 0; i < hexStr.length; i += 2) parts.push(hexStr.slice(i, i + 2));
                    return parts.join(':');
                },
            },
            uuid: {
                size: 32,
                encode(hexStr) {
                    return hexStr.slice(0, 8) + '-' + hexStr.slice(8, 12) + '-' + hexStr.slice(12, 16) + '-' + hexStr.slice(16, 20) + '-' + hexStr.slice(20, 32);
                },
            },
        };

        function getSelectedSpecs() {
            const specs = [];
            if (document.getElementById('ho-fmt-ipv6')?.checked) specs.push({ id: 'ipv6', ...formatters.ipv6 });
            if (document.getElementById('ho-fmt-ipv4')?.checked) specs.push({ id: 'ipv4', ...formatters.ipv4 });
            if (document.getElementById('ho-fmt-mac')?.checked) specs.push({ id: 'mac', ...formatters.mac });
            if (document.getElementById('ho-fmt-uuid')?.checked) specs.push({ id: 'uuid', ...formatters.uuid });
            return specs;
        }

        function obfuscate(hexString, shuffle) {
            hexString = normalizeHex(hexString);
            if (!hexString) return [];

            let specs = getSelectedSpecs();
            if (specs.length === 0) return [];

            if (shuffle && specs.length > 1) {
                specs = specs.slice();
                for (let i = specs.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [specs[i], specs[j]] = [specs[j], specs[i]];
                }
            }

            const result = [];
            let pos = 0;
            let idx = 0;
            const n = hexString.length;

            while (pos < n) {
                const spec = specs[idx % specs.length];
                const chunk = hexString.slice(pos, pos + spec.size);
                pos += spec.size;
                if (chunk.length === spec.size) {
                    result.push(spec.encode(chunk));
                    idx++;
                } else if (chunk.length > 0) {
                    // Remainder: use same formatter with partial chunk (matches Python; works with PowerShell strip-colons decode)
                    result.push(spec.encode(chunk));
                    idx++;
                }
            }
            return result;
        }

        function obfuscateJoin(lines) {
            return lines.join('\n') + (lines.length ? '\n' : '');
        }

        function deobfuscateLine(line) {
            line = line.trim();
            if (!line) return null;
            if (line.startsWith('#')) return null;

            // IPv4: exactly 4 decimal octets (0-255) – try first so "1.2.3.4" is not treated as decimal
            const ipv4Parts = line.split('.');
            if (ipv4Parts.length === 4 && ipv4Parts.every(p => /^\d{1,3}$/.test(p))) {
                try {
                    const octets = ipv4Parts.map(x => {
                        const n = parseInt(x, 10);
                        if (Number.isNaN(n) || n < 0 || n > 255) throw new Error('Invalid octet');
                        return n.toString(16).padStart(2, '0');
                    });
                    return octets.join('');
                } catch (_) {
                    // fall through
                }
            }

            // MAC: exactly 6 groups of 2 hex (try before IPv6 so "00:00:00:00:00:00" → 12 hex)
            const macRe = /^([0-9a-fA-F]{2}):([0-9a-fA-F]{2}):([0-9a-fA-F]{2}):([0-9a-fA-F]{2}):([0-9a-fA-F]{2}):([0-9a-fA-F]{2})$/;
            let m = line.match(macRe);
            if (m) return m.slice(1).join('').toLowerCase();

            // IPv6: 1–8 groups of 1–4 hex (pad each to 4); remainder can be 7 groups e.g. 0000:0000:...:0000
            if (/^[0-9a-fA-F]{1,4}(?::[0-9a-fA-F]{1,4})*$/.test(line)) {
                const groups = line.split(':');
                if (groups.length >= 1 && groups.length <= 8) {
                    return groups.map(g => g.padStart(4, '0')).join('').toLowerCase();
                }
            }

            // UUID: 8-4-4-4-12
            const uuidRe = /^([0-9a-fA-F]{8})-([0-9a-fA-F]{4})-([0-9a-fA-F]{4})-([0-9a-fA-F]{4})-([0-9a-fA-F]{12})$/;
            m = line.match(uuidRe);
            if (m) return m.slice(1).join('').toLowerCase();

            // Raw hex (0x...) – backwards compatibility; Python-style remainder uses formatters above
            const rawHex = line.match(/^0x([0-9a-fA-F]+)$/);
            if (rawHex) return rawHex[1].toLowerCase();

            return null;
        }

        function deobfuscate(text) {
            const lines = String(text).split(/\s+/).filter(Boolean);
            const hexParts = [];
            for (const line of lines) {
                const part = deobfuscateLine(line);
                if (part) hexParts.push(part);
            }
            return hexParts.join('');
        }

        function hexToHexDumpColumns(hexStr) {
            const offsetLines = [];
            const hexLines = [];
            const asciiLines = [];
            if (!hexStr || hexStr.length % 2) return { offset: '', hex: '', ascii: '' };
            const bytes = new Uint8Array(hexStr.length / 2);
            for (let i = 0; i < hexStr.length; i += 2) bytes[i / 2] = parseInt(hexStr.slice(i, i + 2), 16);
            const bytesPerLine = 16;
            for (let i = 0; i < bytes.length; i += bytesPerLine) {
                const chunk = bytes.slice(i, i + bytesPerLine);
                offsetLines.push(('00000000' + i.toString(16)).slice(-8));
                hexLines.push(Array.from(chunk).map(b => ('0' + (b & 0xff).toString(16)).slice(-2)).join(' '));
                asciiLines.push('|' + Array.from(chunk).map(b => (b >= 32 && b < 127) ? String.fromCharCode(b) : '.').join('') + '|');
            }
            return { offset: offsetLines.join('\n'), hex: hexLines.join('\n'), ascii: asciiLines.join('\n') };
        }

        function getInputHex(cb) {
            const inputType = document.getElementById('ho-input-type')?.value || 'hex';
            if (inputType === 'file') {
                const fileInput = document.getElementById('ho-file-in');
                const file = fileInput?.files?.[0];
                if (!file) {
                    ToolUtils.showNotification('Select a file first', 2000);
                    return;
                }
                const reader = new FileReader();
                reader.onload = (e) => {
                    const bytes = new Uint8Array(e.target.result);
                    cb(bytesToHex(bytes));
                };
                reader.readAsArrayBuffer(file);
                return;
            }
            const raw = document.getElementById('ho-hex-in')?.value?.trim() || '';
            if (inputType === 'base64') {
                try {
                    const binary = atob(raw.replace(/\s/g, ''));
                    const bytes = new Uint8Array(binary.length);
                    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
                    cb(bytesToHex(bytes));
                } catch (err) {
                    ToolUtils.showNotification('Invalid Base64', 2000);
                }
                return;
            }
            cb(normalizeHex(raw));
        }

        window.toggleHOInputType = () => {
            const type = document.getElementById('ho-input-type')?.value || 'hex';
            const pasteArea = document.getElementById('ho-paste-area');
            const fileArea = document.getElementById('ho-file-area');
            const label = pasteArea?.querySelector('label');
            if (pasteArea) pasteArea.style.display = type === 'file' ? 'none' : 'block';
            if (fileArea) fileArea.style.display = type === 'file' ? 'block' : 'none';
            if (label) label.textContent = type === 'base64' ? 'Base64 (decoded to bytes then hex)' : 'Hex (any spacing; only 0-9a-fA-F used)';
        };

        window.switchHOTab = (tab) => {
            document.querySelectorAll('.ho-tab').forEach(t => t.classList.remove('active'));
            document.querySelector(`.ho-tab[data-tab="${tab}"]`)?.classList.add('active');
            document.querySelectorAll('.ho-content').forEach(c => c.classList.remove('active'));
            document.getElementById('ho-' + tab)?.classList.add('active');
        };

        window.runObfuscate = () => {
            getInputHex((hexString) => {
                const shuffle = document.getElementById('ho-shuffle')?.checked !== false;
                const lines = obfuscate(hexString, shuffle);
                const out = document.getElementById('ho-obf-out');
                if (out) {
                    out.value = lines.length ? obfuscateJoin(lines) : '';
                    ToolUtils.showNotification(lines.length ? `Output ${lines.length} lines` : 'No hex data or no format selected', 2000);
                }
            });
        };

        window.runDeobfuscate = () => {
            const input = document.getElementById('ho-addr-in')?.value || '';
            const hex = deobfuscate(input);
            const cols = hexToHexDumpColumns(hex);
            const offsetEl = document.getElementById('ho-hex-offset');
            const hexEl = document.getElementById('ho-hex-hex');
            const asciiEl = document.getElementById('ho-hex-ascii');
            if (offsetEl) offsetEl.value = cols.offset;
            if (hexEl) hexEl.value = cols.hex;
            if (asciiEl) asciiEl.value = cols.ascii;
            ToolUtils.showNotification(hex ? `Decoded ${hex.length} hex chars` : 'No valid lines found', 2000);
        };

        window.copyHOOutput = (id) => {
            const el = document.getElementById(id);
            if (el?.value) ToolUtils.copyToClipboard(el.value);
        };

        const hoHexTextareas = ['ho-hex-offset', 'ho-hex-hex', 'ho-hex-ascii'];
        hoHexTextareas.forEach(id => {
            const ta = document.getElementById(id);
            if (!ta) return;
            ta.addEventListener('scroll', () => {
                const top = ta.scrollTop;
                hoHexTextareas.forEach(otherId => {
                    const other = document.getElementById(otherId);
                    if (other && other !== ta) other.scrollTop = top;
                });
            });
        });
    }
};
