// Case Converter Tool
export default {
    title: 'Case Converter',
    html: `
        <div class="tool-info">
            Convert text between different cases: lowercase, UPPERCASE, Title Case, camelCase, snake_case, kebab-case, etc.
        </div>
        <div class="tool-section">
            <div class="tool-input-group">
                <label for="case-input">Input Text</label>
                <textarea id="case-input" placeholder="Enter text to convert..."></textarea>
            </div>
            <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 15px;">
                <button class="tool-button secondary" onclick="convertCase('lower')">lowercase</button>
                <button class="tool-button secondary" onclick="convertCase('upper')">UPPERCASE</button>
                <button class="tool-button secondary" onclick="convertCase('title')">Title Case</button>
                <button class="tool-button secondary" onclick="convertCase('camel')">camelCase</button>
                <button class="tool-button secondary" onclick="convertCase('snake')">snake_case</button>
                <button class="tool-button secondary" onclick="convertCase('kebab')">kebab-case</button>
                <button class="tool-button secondary" onclick="convertCase('pascal')">PascalCase</button>
            </div>
            <div class="tool-input-group">
                <label for="case-output">Output</label>
                <textarea id="case-output" readonly placeholder="Converted text will appear here..."></textarea>
            </div>
            <div>
                <button class="tool-button secondary" onclick="copyCaseOutput()">Copy Output</button>
                <button class="tool-button secondary" onclick="clearCase()">Clear</button>
            </div>
        </div>
    `,
    init() {
        window.convertCase = (type) => {
            const input = document.getElementById('case-input').value;
            const output = document.getElementById('case-output');
            
            if (!input) {
                ToolUtils.showNotification('Please enter text to convert');
                return;
            }
            
            let result = '';
            switch(type) {
                case 'lower':
                    result = input.toLowerCase();
                    break;
                case 'upper':
                    result = input.toUpperCase();
                    break;
                case 'title':
                    result = input.replace(/\w\S*/g, (txt) => 
                        txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
                    );
                    break;
                case 'camel':
                    result = input.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => 
                        index === 0 ? word.toLowerCase() : word.toUpperCase()
                    ).replace(/\s+/g, '');
                    break;
                case 'snake':
                    result = input.replace(/\W+/g, ' ').split(/ |\B(?=[A-Z])/).map(word => word.toLowerCase()).join('_');
                    break;
                case 'kebab':
                    result = input.replace(/\W+/g, ' ').split(/ |\B(?=[A-Z])/).map(word => word.toLowerCase()).join('-');
                    break;
                case 'pascal':
                    result = input.replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => word.toUpperCase()).replace(/\s+/g, '');
                    break;
            }
            output.value = result;
        };
        
        window.copyCaseOutput = () => {
            const output = document.getElementById('case-output').value;
            if (output) {
                ToolUtils.copyToClipboard(output);
            }
        };
        
        window.clearCase = () => {
            document.getElementById('case-input').value = '';
            document.getElementById('case-output').value = '';
        };
    }
};

