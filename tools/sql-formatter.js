
export default {
    title: 'SQL Formatter',
    html: `
        <div class="tool-info">
            Format and beautify SQL queries for better readability.
        </div>
        <div class="tool-section">
            <div class="tool-input-group">
                <label for="sql-input">SQL Query</label>
                <textarea id="sql-input" placeholder="SELECT * FROM users WHERE id=1"></textarea>
            </div>
            <div>
                <button class="tool-button" onclick="formatSQL()">Format SQL</button>
                <button class="tool-button secondary" onclick="clearSQL()">Clear</button>
            </div>
            <div class="tool-input-group">
                <label for="sql-output">Formatted SQL</label>
                <textarea id="sql-output" readonly placeholder="Formatted SQL will appear here..."></textarea>
            </div>
            <div>
                <button class="tool-button secondary" onclick="copySQLOutput()">Copy Output</button>
            </div>
        </div>
    `,
    init() {
    }
};

