
export default {
    title: 'Unix Timestamp Converter',
    html: `
        <div class="tool-info">
            Convert between Unix timestamps and human-readable dates. Supports seconds and milliseconds.
        </div>
        <div class="tool-section">
            <div class="tool-input-group">
                <label for="timestamp-input">Unix Timestamp</label>
                <input type="text" id="timestamp-input" placeholder="1699123456 or 1699123456000">
            </div>
            <div>
                <button class="tool-button" onclick="convertTimestamp()">Convert to Date</button>
                <button class="tool-button" onclick="convertToTimestamp()">Convert Current Date</button>
                <button class="tool-button secondary" onclick="clearTimestamp()">Clear</button>
            </div>
            <div class="tool-input-group">
                <label for="timestamp-output">Human-Readable Date</label>
                <input type="text" id="timestamp-output" readonly placeholder="Date will appear here...">
            </div>
            <div class="tool-input-group">
                <label for="timestamp-iso">ISO 8601 Format</label>
                <input type="text" id="timestamp-iso" readonly placeholder="ISO format will appear here...">
            </div>
        </div>
    `,
    init() {
        window.convertTimestamp = () => {
            const input = document.getElementById('timestamp-input').value.trim();
            const output = document.getElementById('timestamp-output');
            const iso = document.getElementById('timestamp-iso');
            
            if (!input) {
                ToolUtils.showNotification('Please enter a timestamp');
                return;
            }
            
            const timestamp = parseInt(input);
            if (isNaN(timestamp)) {
                output.value = 'Invalid timestamp';
                return;
            }
            
            
            const date = timestamp > 9999999999 ? new Date(timestamp) : new Date(timestamp * 1000);
            output.value = date.toLocaleString();
            iso.value = date.toISOString();
        };
        
        window.convertToTimestamp = () => {
            const now = Math.floor(Date.now() / 1000);
            document.getElementById('timestamp-input').value = now;
            convertTimestamp();
        };
        
        window.clearTimestamp = () => {
            document.getElementById('timestamp-input').value = '';
            document.getElementById('timestamp-output').value = '';
            document.getElementById('timestamp-iso').value = '';
        };
    }
};

