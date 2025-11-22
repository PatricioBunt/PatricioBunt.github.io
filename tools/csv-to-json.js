
export default {
    title: 'CSV to JSON',
    html: `
        <div class="tool-info">
            Convert CSV (Comma-Separated Values) data to JSON format.
        </div>
        <div class="tool-section">
            <div class="tool-input-group">
                <label for="csv-input">CSV Input</label>
                <textarea id="csv-input" placeholder="name,age,city\nJohn,30,New York\nJane,25,London"></textarea>
            </div>
            <div>
                <button class="tool-button" onclick="convertCSV()">Convert to JSON</button>
                <button class="tool-button secondary" onclick="clearCSV()">Clear</button>
            </div>
            <div class="tool-input-group">
                <label for="csv-output">JSON Output</label>
                <textarea id="csv-output" readonly placeholder="JSON will appear here..."></textarea>
            </div>
            <div>
                <button class="tool-button secondary" onclick="copyCSVOutput()">Copy JSON</button>
            </div>
        </div>
    `,
    init() {
        window.convertCSV = () => {
            const input = document.getElementById('csv-input').value.trim();
            const output = document.getElementById('csv-output');
            
            if (!input) {
                ToolUtils.showNotification('Please enter CSV data');
                return;
            }
            
            try {
                const lines = input.split('\n');
                if (lines.length < 2) {
                    throw new Error('CSV must have at least a header and one data row');
                }
                
                const headers = lines[0].split(',').map(h => h.trim());
                const json = [];
                
                for (let i = 1; i < lines.length; i++) {
                    const values = lines[i].split(',');
                    const obj = {};
                    headers.forEach((header, index) => {
                        obj[header] = values[index] ? values[index].trim() : '';
                    });
                    json.push(obj);
                }
                
                output.value = JSON.stringify(json, null, 2);
            } catch (error) {
                output.value = `Error: ${error.message}`;
            }
        };
        
        window.copyCSVOutput = () => {
            const output = document.getElementById('csv-output').value;
            if (output) {
                ToolUtils.copyToClipboard(output);
            }
        };
        
        window.clearCSV = () => {
            document.getElementById('csv-input').value = '';
            document.getElementById('csv-output').value = '';
        };
    }
};

