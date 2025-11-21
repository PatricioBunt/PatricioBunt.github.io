// Hash Generator Tool
export default {
    title: 'Hash Generator',
    html: `
        <div class="tool-info">
            Generate MD5, SHA-256, and other hash values from text input.
        </div>
        <div class="tool-section">
            <div class="tool-input-group">
                <label for="hash-input">Input Text</label>
                <textarea id="hash-input" placeholder="Enter text to hash..."></textarea>
            </div>
            <div class="tool-input-group">
                <label for="hash-algorithm">Hash Algorithm</label>
                <select id="hash-algorithm">
                    <option value="md5">MD5</option>
                    <option value="sha256">SHA-256</option>
                    <option value="sha1">SHA-1</option>
                </select>
            </div>
            <div>
                <button class="tool-button" onclick="generateHash()">Generate Hash</button>
                <button class="tool-button secondary" onclick="clearHash()">Clear</button>
            </div>
            <div class="tool-input-group">
                <label for="hash-output">Hash Output</label>
                <input type="text" id="hash-output" readonly placeholder="Hash will appear here...">
            </div>
            <div>
                <button class="tool-button secondary" onclick="copyHashOutput()">Copy Hash</button>
            </div>
        </div>
    `,
    init() {
        // Implementation coming soon - will use crypto API or a library
    }
};

