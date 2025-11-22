
export default {
    title: 'Duplicate Line Remover',
    html: `
        <div class="tool-info">
            Remove duplicate lines from text while preserving order. Optionally keep one instance of each duplicate.
        </div>
        <div class="tool-section">
            <div class="tool-input-group">
                <label for="duplicate-input">Text (one line per item)</label>
                <textarea id="duplicate-input" placeholder="Enter text with duplicate lines..."></textarea>
            </div>
            <div>
                <button class="tool-button" onclick="removeDuplicates()">Remove Duplicates</button>
                <button class="tool-button secondary" onclick="clearDuplicates()">Clear</button>
            </div>
            <div class="tool-input-group">
                <label for="duplicate-output">Result</label>
                <textarea id="duplicate-output" readonly placeholder="Unique lines will appear here..."></textarea>
            </div>
            <div>
                <button class="tool-button secondary" onclick="copyDuplicateOutput()">Copy Result</button>
            </div>
        </div>
    `,
    init() {
        window.removeDuplicates = () => {
            const input = document.getElementById('duplicate-input').value;
            const output = document.getElementById('duplicate-output');
            
            if (!input) {
                ToolUtils.showNotification('Please enter text');
                return;
            }
            
            const lines = input.split('\n');
            const seen = new Set();
            const unique = [];
            
            for (const line of lines) {
                if (!seen.has(line.trim())) {
                    seen.add(line.trim());
                    unique.push(line);
                }
            }
            
            output.value = unique.join('\n');
        };
        
        window.copyDuplicateOutput = () => {
            const output = document.getElementById('duplicate-output').value;
            if (output) {
                ToolUtils.copyToClipboard(output);
            }
        };
        
        window.clearDuplicates = () => {
            document.getElementById('duplicate-input').value = '';
            document.getElementById('duplicate-output').value = '';
        };
    }
};

