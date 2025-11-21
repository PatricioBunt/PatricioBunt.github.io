// Lorem Ipsum Generator Tool
export default {
    title: 'Lorem Ipsum Generator',
    html: `
        <div class="tool-info">
            <i class="fas fa-info-circle" style="margin-right: 8px;"></i>
            Generate placeholder text (Lorem Ipsum) for your designs and mockups. Supports unlimited words, sentences, and paragraphs.
        </div>
        <div class="tool-section">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                <div class="tool-input-group">
                    <label for="lorem-type">
                        <i class="fas fa-list" style="margin-right: 6px; color: var(--text-secondary);"></i>
                        Type
                    </label>
                    <select id="lorem-type">
                        <option value="words">Words</option>
                        <option value="sentences">Sentences</option>
                        <option value="paragraphs">Paragraphs</option>
                    </select>
                </div>
                <div class="tool-input-group">
                    <label for="lorem-count">
                        <i class="fas fa-hashtag" style="margin-right: 6px; color: var(--text-secondary);"></i>
                        Count
                    </label>
                    <input type="number" id="lorem-count" value="5" min="1" max="10000">
                </div>
            </div>
            <div style="margin-top: 15px;">
                <button class="tool-button" onclick="generateLorem()">
                    <i class="fas fa-magic" style="margin-right: 6px;"></i>
                    Generate
                </button>
                <button class="tool-button secondary" onclick="clearLorem()">
                    <i class="fas fa-trash-alt" style="margin-right: 6px;"></i>
                    Clear
                </button>
            </div>
            <div class="tool-input-group" style="margin-top: 20px;">
                <label for="lorem-output">
                    <i class="fas fa-file-alt" style="margin-right: 6px; color: var(--text-secondary);"></i>
                    Generated Text
                </label>
                <textarea id="lorem-output" readonly placeholder="Generated text will appear here..."></textarea>
            </div>
            <div style="margin-top: 15px;">
                <button class="tool-button secondary" onclick="copyLoremOutput()">
                    <i class="fas fa-copy" style="margin-right: 6px;"></i>
                    Copy Text
                </button>
            </div>
        </div>
    `,
    init() {
        const loremWords = 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum'.split(' ');
        
        // Helper function to get words, cycling through if needed
        function getWords(count) {
            const words = [];
            for (let i = 0; i < count; i++) {
                words.push(loremWords[i % loremWords.length]);
            }
            return words;
        }
        
        window.generateLorem = () => {
            const type = document.getElementById('lorem-type').value;
            const count = parseInt(document.getElementById('lorem-count').value) || 5;
            const output = document.getElementById('lorem-output');
            
            let result = '';
            
            if (type === 'words') {
                result = getWords(count).join(' ');
            } else if (type === 'sentences') {
                for (let i = 0; i < count; i++) {
                    const sentenceLength = Math.floor(Math.random() * 10) + 5;
                    const words = getWords(sentenceLength);
                    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
                    result += words.join(' ') + '. ';
                }
            } else if (type === 'paragraphs') {
                for (let i = 0; i < count; i++) {
                    const paraLength = Math.floor(Math.random() * 5) + 3;
                    const sentences = [];
                    for (let j = 0; j < paraLength; j++) {
                        const sentenceLength = Math.floor(Math.random() * 10) + 5;
                        const words = getWords(sentenceLength);
                        words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
                        sentences.push(words.join(' ') + '.');
                    }
                    result += sentences.join(' ') + '\n\n';
                }
            }
            
            output.value = result.trim();
        };
        
        window.copyLoremOutput = () => {
            const output = document.getElementById('lorem-output').value;
            if (output) {
                ToolUtils.copyToClipboard(output);
            }
        };
        
        window.clearLorem = () => {
            document.getElementById('lorem-output').value = '';
        };
        
        // Generate on load
        setTimeout(() => generateLorem(), 100);
    }
};

