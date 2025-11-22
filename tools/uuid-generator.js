
export default {
    title: 'UUID Generator',
    html: `
        <div class="tool-info">
            Generate UUIDs (Universally Unique Identifiers) in various formats. UUIDs are useful for creating unique identifiers in applications.
        </div>
        <div class="tool-section">
            <div class="tool-input-group">
                <label for="uuid-count">Number of UUIDs</label>
                <input type="number" id="uuid-count" value="1" min="1" max="100">
            </div>
            <div class="tool-input-group">
                <label for="uuid-version">UUID Version</label>
                <select id="uuid-version">
                    <option value="v4">Version 4 (Random)</option>
                    <option value="v1">Version 1 (Timestamp-based)</option>
                </select>
            </div>
            <div>
                <button class="tool-button" onclick="generateUUIDs()">Generate UUIDs</button>
                <button class="tool-button secondary" onclick="copyUUIDs()">Copy All</button>
                <button class="tool-button secondary" onclick="clearUUIDs()">Clear</button>
            </div>
            <div class="tool-input-group">
                <label for="uuid-output">Generated UUIDs</label>
                <textarea id="uuid-output" readonly placeholder="Generated UUIDs will appear here..."></textarea>
            </div>
        </div>
    `,
    init() {
        function generateUUIDv4() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                const r = Math.random() * 16 | 0;
                const v = c === 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }
        
        function generateUUIDv1() {
            const timestamp = Date.now();
            const random = Math.random().toString(16).substring(2, 10);
            const random2 = Math.random().toString(16).substring(2, 10);
            return `${timestamp.toString(16).substring(0, 8)}-${random.substring(0, 4)}-1${random.substring(4, 7)}-${Math.floor(Math.random() * 4 + 8).toString(16)}${random2.substring(0, 3)}-${random2.substring(3)}${Math.random().toString(16).substring(2, 10)}`;
        }
        
        window.generateUUIDs = () => {
            const count = parseInt(document.getElementById('uuid-count').value) || 1;
            const version = document.getElementById('uuid-version').value;
            const output = document.getElementById('uuid-output');
            
            const uuids = [];
            for (let i = 0; i < count; i++) {
                if (version === 'v4') {
                    uuids.push(generateUUIDv4());
                } else {
                    uuids.push(generateUUIDv1());
                }
            }
            
            output.value = uuids.join('\n');
        };
        
        window.copyUUIDs = () => {
            const output = document.getElementById('uuid-output').value;
            if (output) {
                ToolUtils.copyToClipboard(output);
            } else {
                ToolUtils.showNotification('No UUIDs to copy');
            }
        };
        
        window.clearUUIDs = () => {
            document.getElementById('uuid-output').value = '';
        };
        
        setTimeout(() => generateUUIDs(), 100);
    }
};

