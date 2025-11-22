
export default {
    title: 'Cron Expression Builder',
    html: `
        <div class="tool-info">
            Build cron expressions using a visual interface. Cron expressions are used to schedule tasks.
        </div>
        <div class="tool-section">
            <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; margin-bottom: 15px;">
                <div class="tool-input-group">
                    <label>Minute (0-59)</label>
                    <input type="text" id="cron-minute" value="*">
                </div>
                <div class="tool-input-group">
                    <label>Hour (0-23)</label>
                    <input type="text" id="cron-hour" value="*">
                </div>
                <div class="tool-input-group">
                    <label>Day (1-31)</label>
                    <input type="text" id="cron-day" value="*">
                </div>
                <div class="tool-input-group">
                    <label>Month (1-12)</label>
                    <input type="text" id="cron-month" value="*">
                </div>
                <div class="tool-input-group">
                    <label>Weekday (0-7)</label>
                    <input type="text" id="cron-weekday" value="*">
                </div>
            </div>
            <div>
                <button class="tool-button" onclick="buildCron()">Build Cron Expression</button>
                <button class="tool-button secondary" onclick="clearCron()">Clear</button>
            </div>
            <div class="tool-input-group">
                <label for="cron-output">Cron Expression</label>
                <input type="text" id="cron-output" readonly placeholder="Cron expression will appear here...">
            </div>
            <div>
                <button class="tool-button secondary" onclick="copyCronOutput()">Copy Expression</button>
            </div>
        </div>
    `,
    init() {
        window.buildCron = () => {
            const minute = document.getElementById('cron-minute').value || '*';
            const hour = document.getElementById('cron-hour').value || '*';
            const day = document.getElementById('cron-day').value || '*';
            const month = document.getElementById('cron-month').value || '*';
            const weekday = document.getElementById('cron-weekday').value || '*';
            
            const cron = `${minute} ${hour} ${day} ${month} ${weekday}`;
            document.getElementById('cron-output').value = cron;
        };
        
        window.clearCron = () => {
            document.getElementById('cron-minute').value = '*';
            document.getElementById('cron-hour').value = '*';
            document.getElementById('cron-day').value = '*';
            document.getElementById('cron-month').value = '*';
            document.getElementById('cron-weekday').value = '*';
            document.getElementById('cron-output').value = '';
        };
        
        window.copyCronOutput = () => {
            const output = document.getElementById('cron-output').value;
            if (output) {
                ToolUtils.copyToClipboard(output);
            }
        };
    }
};

