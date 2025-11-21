// Character/Word Counter Tool
export default {
    title: 'Character/Word Counter',
    html: `
        <div class="tool-info">
            Count characters, words, lines, and paragraphs in your text.
        </div>
        <div class="tool-section">
            <div class="tool-input-group">
                <label for="counter-input">Text</label>
                <textarea id="counter-input" placeholder="Enter text to analyze..."></textarea>
            </div>
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; margin-top: 15px;">
                <div style="background: var(--bg-secondary); padding: 15px; border-radius: 4px; text-align: center;">
                    <div style="font-size: 24px; font-weight: bold; color: var(--accent-color);" id="char-count">0</div>
                    <div style="font-size: 12px; color: var(--text-secondary);">Characters</div>
                </div>
                <div style="background: var(--bg-secondary); padding: 15px; border-radius: 4px; text-align: center;">
                    <div style="font-size: 24px; font-weight: bold; color: var(--accent-color);" id="word-count">0</div>
                    <div style="font-size: 12px; color: var(--text-secondary);">Words</div>
                </div>
                <div style="background: var(--bg-secondary); padding: 15px; border-radius: 4px; text-align: center;">
                    <div style="font-size: 24px; font-weight: bold; color: var(--accent-color);" id="line-count">0</div>
                    <div style="font-size: 12px; color: var(--text-secondary);">Lines</div>
                </div>
                <div style="background: var(--bg-secondary); padding: 15px; border-radius: 4px; text-align: center;">
                    <div style="font-size: 24px; font-weight: bold; color: var(--accent-color);" id="para-count">0</div>
                    <div style="font-size: 12px; color: var(--text-secondary);">Paragraphs</div>
                </div>
            </div>
        </div>
    `,
    init() {
        const input = document.getElementById('counter-input');
        
        function updateCounts() {
            const text = input.value;
            const chars = text.length;
            const words = text.trim() ? text.trim().split(/\s+/).length : 0;
            const lines = text ? text.split('\n').length : 0;
            const paras = text.trim() ? text.trim().split(/\n\s*\n/).length : 0;
            
            document.getElementById('char-count').textContent = chars;
            document.getElementById('word-count').textContent = words;
            document.getElementById('line-count').textContent = lines;
            document.getElementById('para-count').textContent = paras;
        }
        
        input.addEventListener('input', updateCounts);
        updateCounts();
    }
};

