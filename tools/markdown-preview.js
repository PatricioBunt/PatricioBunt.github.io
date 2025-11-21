// Markdown Preview Tool
export default {
    title: 'Markdown Preview',
    html: `
        <div class="tool-info">
            Write Markdown and see a live preview of the rendered HTML.
        </div>
        <div class="tool-section">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                <div class="tool-input-group">
                    <label for="markdown-input">Markdown</label>
                    <textarea id="markdown-input" placeholder="# Heading\n\nWrite your markdown here..."></textarea>
                </div>
                <div class="tool-input-group">
                    <label for="markdown-output">Preview</label>
                    <div id="markdown-output" style="background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 4px; padding: 15px; min-height: 200px; max-height: 500px; overflow-y: auto;"></div>
                </div>
            </div>
            <div>
                <button class="tool-button secondary" onclick="clearMarkdown()">Clear</button>
            </div>
        </div>
    `,
    init() {
        // Implementation coming soon - will use a markdown library
        const input = document.getElementById('markdown-input');
        const output = document.getElementById('markdown-output');
        
        input.addEventListener('input', () => {
            // Basic markdown preview (can be enhanced with a library)
            output.textContent = 'Markdown preview coming soon - will use a markdown library';
        });
    }
};

