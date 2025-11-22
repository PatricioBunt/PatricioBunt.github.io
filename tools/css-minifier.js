
export default {
    title: 'CSS Minifier/Beautifier',
    html: `
        <div class="tool-info">
            Minify or beautify CSS code. Remove whitespace or format it nicely.
        </div>
        <div class="tool-section">
            <div class="tool-input-group">
                <label for="css-input">CSS Input</label>
                <textarea id="css-input" placeholder=".class { color: red; }"></textarea>
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
        
    }
};

