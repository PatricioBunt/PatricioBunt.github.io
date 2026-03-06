
export default {
    title: 'CSS Minifier/Beautifier',
    html: `
        <div class="tool-info">
            Minify or beautify CSS code. Remove whitespace or format it nicely.
        </div>
        <div class="tool-section">
            <div class="tool-input-group">
                <label for="css-input">CSS Input</label>
                <textarea id="css-input" placeholder=".class { color: red; margin: 0 auto; }"></textarea>
            </div>
            <div>
                <button class="tool-button" onclick="beautifyCSS()">Beautify</button>
                <button class="tool-button" onclick="minifyCSS()">Minify</button>
                <button class="tool-button secondary" onclick="clearCSS()">Clear</button>
            </div>
            <div class="tool-input-group">
                <label for="css-output">Output</label>
                <textarea id="css-output" readonly placeholder="Formatted CSS will appear here..."></textarea>
            </div>
            <div>
                <button class="tool-button secondary" onclick="copyCSSOutput()">Copy Output</button>
            </div>
        </div>
    `,
    init() {
        window.minifyCSS = () => {
            const input = document.getElementById('css-input').value;
            if (!input.trim()) {
                ToolUtils.showNotification('Please enter some CSS first');
                return;
            }
            const result = input
                .replace(/\/\*[\s\S]*?\*\//g, '')
                .replace(/\s*([{}:;,>~+])\s*/g, '$1')
                .replace(/\s+/g, ' ')
                .replace(/;\s*}/g, '}')
                .trim();
            document.getElementById('css-output').value = result;
            ToolUtils.showNotification('CSS minified');
        };

        window.beautifyCSS = () => {
            const input = document.getElementById('css-input').value;
            if (!input.trim()) {
                ToolUtils.showNotification('Please enter some CSS first');
                return;
            }
            const src = input
                .replace(/\/\*[\s\S]*?\*\//g, '')
                .replace(/\s*([{}:;,])\s*/g, '$1')
                .replace(/\s+/g, ' ')
                .trim();

            let out = '';
            let depth = 0;
            for (let i = 0; i < src.length; i++) {
                const c = src[i];
                if (c === '{') {
                    out += ' {\n' + '    '.repeat(depth + 1);
                    depth++;
                } else if (c === '}') {
                    depth = Math.max(0, depth - 1);
                    out = out.trimEnd();
                    out += '\n' + '    '.repeat(depth) + '}\n\n';
                } else if (c === ';') {
                    out += ';\n' + '    '.repeat(depth);
                } else if (c === ',' && src[i + 1] !== ' ') {
                    out += ',\n';
                } else {
                    out += c;
                }
            }
            document.getElementById('css-output').value = out.trim();
            ToolUtils.showNotification('CSS beautified');
        };

        window.clearCSS = () => {
            document.getElementById('css-input').value = '';
            document.getElementById('css-output').value = '';
        };

        window.copyCSSOutput = () => {
            const output = document.getElementById('css-output').value;
            if (output) {
                ToolUtils.copyToClipboard(output);
            } else {
                ToolUtils.showNotification('No output to copy');
            }
        };
    }
};
