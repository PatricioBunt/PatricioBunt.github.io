
export default {
    title: 'JS Minifier/Beautifier',
    html: `
        <div class="tool-info">
            Minify or beautify JavaScript code. Remove whitespace and comments, or format it nicely.
            <br><small style="opacity: 0.7;">Note: minification is basic — string/regex literals are preserved but complex patterns may need a full build tool.</small>
        </div>
        <div class="tool-section">
            <div class="tool-input-group">
                <label for="js-input">JavaScript Input</label>
                <textarea id="js-input" placeholder="function test() { return true; }"></textarea>
            </div>
            <div>
                <button class="tool-button" onclick="beautifyJS()">Beautify</button>
                <button class="tool-button" onclick="minifyJS()">Minify</button>
                <button class="tool-button secondary" onclick="clearJS()">Clear</button>
            </div>
            <div class="tool-input-group">
                <label for="js-output">Output</label>
                <textarea id="js-output" readonly placeholder="Formatted JavaScript will appear here..."></textarea>
            </div>
            <div>
                <button class="tool-button secondary" onclick="copyJSOutput()">Copy Output</button>
            </div>
        </div>
    `,
    init() {
        function processJS(src, mode) {
            let out = '';
            let i = 0;
            let lastNonWs = '';
            let depth = 0;

            const peek = (offset = 1) => src[i + offset] ?? '';

            while (i < src.length) {
                const c = src[i];

                // Single-line comment
                if (c === '/' && peek() === '/') {
                    while (i < src.length && src[i] !== '\n') i++;
                    if (mode === 'beautify') out += '\n' + '    '.repeat(depth);
                    continue;
                }

                // Multi-line comment
                if (c === '/' && peek() === '*') {
                    i += 2;
                    while (i < src.length && !(src[i] === '*' && src[i + 1] === '/')) i++;
                    i += 2;
                    continue;
                }

                // String literals (single/double quote)
                if (c === '"' || c === "'") {
                    const q = c;
                    let str = q;
                    i++;
                    while (i < src.length) {
                        if (src[i] === '\\') { str += src[i] + src[i + 1]; i += 2; continue; }
                        str += src[i];
                        if (src[i] === q) { i++; break; }
                        i++;
                    }
                    out += str;
                    lastNonWs = q;
                    continue;
                }

                // Template literals
                if (c === '`') {
                    let str = '`';
                    i++;
                    while (i < src.length) {
                        if (src[i] === '\\') { str += src[i] + src[i + 1]; i += 2; continue; }
                        str += src[i];
                        if (src[i] === '`') { i++; break; }
                        i++;
                    }
                    out += str;
                    lastNonWs = '`';
                    continue;
                }

                // Whitespace
                if (/[\s\r\n]/.test(c)) {
                    const ahead = src.slice(i).match(/^[\s\r\n]*/)[0];
                    const hasNewline = /\n/.test(ahead);
                    i += ahead.length;
                    const nextC = src[i] ?? '';

                    if (mode === 'minify') {
                        // Keep a single space only when needed to separate identifiers
                        if (/\w/.test(lastNonWs) && /[\w$]/.test(nextC)) {
                            out += ' ';
                        }
                    } else {
                        // beautify: preserve logical line breaks
                        if (hasNewline && out.length > 0 && !out.endsWith('\n') && !out.endsWith('{\n')) {
                            out += '\n' + '    '.repeat(depth);
                        } else if (!out.endsWith(' ') && !out.endsWith('\n')) {
                            out += ' ';
                        }
                    }
                    continue;
                }

                if (mode === 'beautify') {
                    if (c === '{') {
                        out += ' {\n';
                        depth++;
                        out += '    '.repeat(depth);
                        i++;
                        lastNonWs = c;
                        continue;
                    }
                    if (c === '}') {
                        depth = Math.max(0, depth - 1);
                        out = out.trimEnd();
                        out += '\n' + '    '.repeat(depth) + '}';
                        i++;
                        lastNonWs = c;
                        if (src[i] !== ';' && src[i] !== ',' && src[i] !== ')') {
                            out += '\n' + '    '.repeat(depth);
                        }
                        continue;
                    }
                    if (c === ';') {
                        out += ';\n' + '    '.repeat(depth);
                        i++;
                        lastNonWs = c;
                        continue;
                    }
                }

                out += c;
                lastNonWs = c;
                i++;
            }

            return out.trim();
        }

        window.minifyJS = () => {
            const input = document.getElementById('js-input').value;
            if (!input.trim()) {
                ToolUtils.showNotification('Please enter some JavaScript first');
                return;
            }
            document.getElementById('js-output').value = processJS(input, 'minify');
            ToolUtils.showNotification('JS minified');
        };

        window.beautifyJS = () => {
            const input = document.getElementById('js-input').value;
            if (!input.trim()) {
                ToolUtils.showNotification('Please enter some JavaScript first');
                return;
            }
            document.getElementById('js-output').value = processJS(input, 'beautify');
            ToolUtils.showNotification('JS beautified');
        };

        window.clearJS = () => {
            document.getElementById('js-input').value = '';
            document.getElementById('js-output').value = '';
        };

        window.copyJSOutput = () => {
            const output = document.getElementById('js-output').value;
            if (output) {
                ToolUtils.copyToClipboard(output);
            } else {
                ToolUtils.showNotification('No output to copy');
            }
        };
    }
};
