
export default {
    title: 'URL Encoder/Decoder',
    html: `
        <div class="tool-info">
            Encode text to URL-encoded format or decode URL-encoded strings.
        </div>
        <div class="tool-section">
            <div class="tool-input-group">
                <label for="url-input">Input</label>
                <textarea id="url-input" placeholder="Enter text to encode or URL-encoded string to decode..."></textarea>
            </div>
            <div>
                <button class="tool-button" onclick="encodeURL()">Encode</button>
                <button class="tool-button" onclick="decodeURL()">Decode</button>
                <button class="tool-button secondary" onclick="clearURL()">Clear</button>
            </div>
            <div class="tool-input-group">
                <label for="url-output">Output</label>
                <textarea id="url-output" readonly placeholder="Result will appear here..."></textarea>
            </div>
            <div>
                <button class="tool-button secondary" onclick="copyURLOutput()">Copy Output</button>
            </div>
        </div>
    `,
    init() {
        window.encodeURL = () => {
            const input = document.getElementById('url-input').value;
            const output = document.getElementById('url-output');
            output.value = encodeURIComponent(input);
        };
        
        window.decodeURL = () => {
            const input = document.getElementById('url-input').value;
            const output = document.getElementById('url-output');
            try {
                output.value = decodeURIComponent(input);
            } catch (error) {
                output.value = `Error: Invalid URL encoding - ${error.message}`;
            }
        };
        
        window.clearURL = () => {
            document.getElementById('url-input').value = '';
            document.getElementById('url-output').value = '';
        };
        
        window.copyURLOutput = () => {
            const output = document.getElementById('url-output').value;
            if (output) {
                ToolUtils.copyToClipboard(output);
            }
        };
    }
};

