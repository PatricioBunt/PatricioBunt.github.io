// Base64 Encoder/Decoder Tool
export default {
    title: 'Base64 Encoder/Decoder',
    html: `
        <div class="tool-info">
            Encode text to Base64 or decode Base64 to text.
        </div>
        <div class="tool-section">
            <div class="tool-input-group">
                <label for="base64-input">Input</label>
                <textarea id="base64-input" placeholder="Enter text to encode or Base64 to decode..."></textarea>
            </div>
            <div>
                <button class="tool-button" onclick="encodeBase64()">Encode</button>
                <button class="tool-button" onclick="decodeBase64()">Decode</button>
                <button class="tool-button secondary" onclick="clearBase64()">Clear</button>
            </div>
            <div class="tool-input-group">
                <label for="base64-output">Output</label>
                <textarea id="base64-output" readonly placeholder="Result will appear here..."></textarea>
            </div>
            <div>
                <button class="tool-button secondary" onclick="copyBase64Output()">Copy Output</button>
            </div>
        </div>
    `,
    init() {
        window.encodeBase64 = () => {
            const input = document.getElementById('base64-input').value;
            const output = document.getElementById('base64-output');
            try {
                output.value = btoa(unescape(encodeURIComponent(input)));
            } catch (error) {
                output.value = `Error: ${error.message}`;
            }
        };
        
        window.decodeBase64 = () => {
            const input = document.getElementById('base64-input').value;
            const output = document.getElementById('base64-output');
            try {
                output.value = decodeURIComponent(escape(atob(input)));
            } catch (error) {
                output.value = `Error: Invalid Base64 - ${error.message}`;
            }
        };
        
        window.clearBase64 = () => {
            document.getElementById('base64-input').value = '';
            document.getElementById('base64-output').value = '';
        };
        
        window.copyBase64Output = () => {
            const output = document.getElementById('base64-output').value;
            if (output) {
                ToolUtils.copyToClipboard(output);
            }
        };
    }
};

