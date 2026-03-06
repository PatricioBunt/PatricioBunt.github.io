
export default {
    title: 'HTML Minifier/Beautifier',
    html: `
        <div class="tool-info">
            Minify or beautify HTML code. Remove whitespace or format it nicely.
        </div>
        <div class="tool-section">
            <div class="tool-input-group">
                <label for="html-input">HTML Input</label>
                <textarea id="html-input" placeholder="<div><p>Your HTML here</p></div>"></textarea>
            </div>
            <div>
                <button class="tool-button" onclick="beautifyHTML()">Beautify</button>
                <button class="tool-button" onclick="minifyHTML()">Minify</button>
                <button class="tool-button secondary" onclick="clearHTML()">Clear</button>
            </div>
            <div class="tool-input-group">
                <label for="html-output">Output</label>
                <textarea id="html-output" readonly placeholder="Formatted HTML will appear here..."></textarea>
            </div>
            <div>
                <button class="tool-button secondary" onclick="copyHTMLOutput()">Copy Output</button>
            </div>
        </div>
    `,
    init() {
        const VOID_TAGS = new Set(['area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr']);

        window.minifyHTML = () => {
            const input = document.getElementById('html-input').value;
            if (!input.trim()) {
                ToolUtils.showNotification('Please enter some HTML first');
                return;
            }
            const result = input
                .replace(/<!--(?!\[if)[\s\S]*?-->/g, '')
                .replace(/\s+/g, ' ')
                .replace(/\s*(<[^>]+>)\s*/g, '$1')
                .trim();
            document.getElementById('html-output').value = result;
            ToolUtils.showNotification('HTML minified');
        };

        window.beautifyHTML = () => {
            const input = document.getElementById('html-input').value;
            if (!input.trim()) {
                ToolUtils.showNotification('Please enter some HTML first');
                return;
            }
            const normalized = input.replace(/\s+/g, ' ').trim();
            let depth = 0;
            let out = '';
            const tokenRe = /(<!--[\s\S]*?-->|<[^>]+>|[^<]+)/g;
            let match;
            while ((match = tokenRe.exec(normalized)) !== null) {
                const token = match[0].trim();
                if (!token) continue;

                if (token.startsWith('</')) {
                    depth = Math.max(0, depth - 1);
                    out += '    '.repeat(depth) + token + '\n';
                } else if (token.startsWith('<') && !token.startsWith('<!--')) {
                    const tagName = (token.match(/<([a-zA-Z][^\s>/]*)/) || [])[1]?.toLowerCase();
                    out += '    '.repeat(depth) + token + '\n';
                    if (tagName && !VOID_TAGS.has(tagName) && !token.endsWith('/>')) {
                        depth++;
                    }
                } else {
                    out += '    '.repeat(depth) + token + '\n';
                }
            }
            document.getElementById('html-output').value = out.trim();
            ToolUtils.showNotification('HTML beautified');
        };

        window.clearHTML = () => {
            document.getElementById('html-input').value = '';
            document.getElementById('html-output').value = '';
        };

        window.copyHTMLOutput = () => {
            const output = document.getElementById('html-output').value;
            if (output) {
                ToolUtils.copyToClipboard(output);
            } else {
                ToolUtils.showNotification('No output to copy');
            }
        };
    }
};
