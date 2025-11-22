
export default {
    title: 'Character Frequency Analyzer',
    html: `
        <div class="tool-info">
            Analyze the frequency of each character in your text. Useful for cryptography and text analysis.
        </div>
        <div class="tool-section">
            <div class="tool-input-group">
                <label for="freq-input">Text</label>
                <textarea id="freq-input" placeholder="Enter text to analyze..."></textarea>
            </div>
            <div>
                <button class="tool-button" onclick="analyzeFrequency()">Analyze</button>
                <button class="tool-button secondary" onclick="clearFreq()">Clear</button>
            </div>
            <div class="tool-input-group">
                <label for="freq-output">Character Frequency</label>
                <div id="freq-output" class="tool-output empty">Frequency analysis will appear here...</div>
            </div>
        </div>
    `,
    init() {
        window.analyzeFrequency = () => {
            const input = document.getElementById('freq-input').value;
            const output = document.getElementById('freq-output');
            
            if (!input) {
                ToolUtils.showNotification('Please enter text to analyze');
                return;
            }
            
            const freq = {};
            for (const char of input) {
                freq[char] = (freq[char] || 0) + 1;
            }
            
            const sorted = Object.entries(freq)
                .sort((a, b) => b[1] - a[1])
                .map(([char, count]) => {
                    const displayChar = char === ' ' ? '[space]' : char === '\n' ? '[newline]' : char === '\t' ? '[tab]' : char;
                    return `${displayChar}: ${count}`;
                })
                .join('\n');
            
            output.textContent = sorted || 'No characters found';
            output.classList.remove('empty');
        };
        
        window.clearFreq = () => {
            document.getElementById('freq-input').value = '';
            document.getElementById('freq-output').textContent = 'Frequency analysis will appear here...';
            document.getElementById('freq-output').classList.add('empty');
        };
    }
};

