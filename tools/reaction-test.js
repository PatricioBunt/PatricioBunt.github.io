
export default {
    title: 'Reaction Time Test',
    styles: `
        /* Reaction Test Styles */
        .reaction-test-container {
            max-width: 600px;
            margin: 0 auto;
            text-align: center;
        }

        .reaction-screen {
            background: var(--bg-secondary);
            border: 2px solid var(--border-color);
            border-radius: 8px;
            padding: 60px 40px;
            margin: 30px 0;
            min-height: 300px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s;
            position: relative;
        }

        .reaction-screen.waiting {
            background: var(--bg-tertiary);
            border-color: var(--border-color);
        }

        .reaction-screen.ready {
            background: color-mix(in srgb, #4ec9b0 20%, var(--bg-secondary));
            border-color: #4ec9b0;
        }

        .reaction-screen.click {
            background: color-mix(in srgb, #f48771 20%, var(--bg-secondary));
            border-color: #f48771;
        }

        .reaction-message {
            font-size: 32px;
            font-weight: bold;
            color: var(--text-primary);
            margin-bottom: 20px;
        }

        .reaction-time {
            font-size: 72px;
            font-weight: bold;
            color: var(--accent-color);
            font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
            margin: 20px 0;
        }

        .reaction-stats {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 10px;
            margin-top: 30px;
        }

        .reaction-stat {
            background: var(--bg-secondary);
            border: 1px solid var(--border-color);
            border-radius: 4px;
            padding: 15px 10px;
        }

        .reaction-stat-value {
            font-size: 24px;
            font-weight: bold;
            color: var(--accent-color);
            margin-bottom: 5px;
        }

        .reaction-stat-label {
            font-size: 11px;
            color: var(--text-secondary);
        }

        .reaction-history {
            margin-top: 30px;
            max-height: 200px;
            overflow-y: auto;
        }

        .reaction-history-item {
            display: flex;
            justify-content: space-between;
            padding: 8px 15px;
            background: var(--bg-secondary);
            border-bottom: 1px solid var(--border-color);
            font-size: 14px;
        }

        .reaction-history-item:last-child {
            border-bottom: none;
        }

        .reaction-time-badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: 600;
        }

        .reaction-time-badge.fast {
            background: color-mix(in srgb, #4ec9b0 20%, transparent);
            color: #4ec9b0;
        }

        .reaction-time-badge.medium {
            background: color-mix(in srgb, #dcdcaa 20%, transparent);
            color: #dcdcaa;
        }

        .reaction-time-badge.slow {
            background: color-mix(in srgb, #f48771 20%, transparent);
            color: #f48771;
        }
    `,
    html: `
        <div class="tool-info">
            <i class="fas fa-info-circle" style="margin-right: 8px;"></i>
            Test your reaction time! Wait for the screen to turn green, then click as fast as you can.
        </div>
        <div class="tool-section">
            <div class="reaction-test-container">
                <div class="reaction-screen waiting" id="reaction-screen" onclick="handleReactionClick()">
                    <div>
                        <div class="reaction-message" id="reaction-message">Click to start</div>
                        <div class="reaction-time" id="reaction-time" style="display: none;"></div>
                    </div>
                </div>

                <div class="reaction-stats">
                    <div class="reaction-stat">
                        <div class="reaction-stat-value" id="current-time">-</div>
                        <div class="reaction-stat-label">Current</div>
                    </div>
                    <div class="reaction-stat">
                        <div class="reaction-stat-value" id="average-time">-</div>
                        <div class="reaction-stat-label">Average</div>
                    </div>
                    <div class="reaction-stat">
                        <div class="reaction-stat-value" id="best-time">-</div>
                        <div class="reaction-stat-label">Best</div>
                    </div>
                    <div class="reaction-stat">
                        <div class="reaction-stat-value" id="worst-time">-</div>
                        <div class="reaction-stat-label">Worst</div>
                    </div>
                    <div class="reaction-stat">
                        <div class="reaction-stat-value" id="tests-count">0</div>
                        <div class="reaction-stat-label">Tests</div>
                    </div>
                </div>

                <div style="margin-top: 20px;">
                    <button class="tool-button" onclick="startNewTest()">
                        <i class="fas fa-redo" style="margin-right: 6px;"></i>
                        New Test
                    </button>
                    <button class="tool-button secondary" onclick="clearHistory()">
                        <i class="fas fa-trash-alt" style="margin-right: 6px;"></i>
                        Clear History
                    </button>
                </div>

                <div class="reaction-history" id="reaction-history"></div>
            </div>
        </div>
    `,
    init() {
        const STORAGE_KEY = 'reaction_test_history';
        let times = [];
        let state = 'waiting'; 
        let readyTime = null;
        let clickTime = null;
        let timeoutId = null;
        
        function loadHistory() {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                times = JSON.parse(saved);
                updateStats();
                renderHistory();
            }
        }
        
        function saveHistory() {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(times));
        }
        
        function getTimeCategory(ms) {
            if (ms < 200) return { class: 'fast', label: 'Excellent!' };
            if (ms < 300) return { class: 'medium', label: 'Good' };
            return { class: 'slow', label: 'Slow' };
        }
        
        function updateStats() {
            if (times.length === 0) {
                document.getElementById('current-time').textContent = '-';
                document.getElementById('average-time').textContent = '-';
                document.getElementById('best-time').textContent = '-';
                document.getElementById('worst-time').textContent = '-';
                document.getElementById('tests-count').textContent = '0';
                return;
            }
            
            const latest = times[times.length - 1];
            const average = Math.round(times.reduce((a, b) => a + b, 0) / times.length);
            const best = Math.min(...times);
            const worst = Math.max(...times);
            
            document.getElementById('current-time').textContent = latest + 'ms';
            document.getElementById('average-time').textContent = average + 'ms';
            document.getElementById('best-time').textContent = best + 'ms';
            document.getElementById('worst-time').textContent = worst + 'ms';
            document.getElementById('tests-count').textContent = times.length;
        }
        
        function renderHistory() {
            const container = document.getElementById('reaction-history');
            if (times.length === 0) {
                container.innerHTML = '<div style="text-align: center; padding: 20px; color: var(--text-disabled);">No tests yet</div>';
                return;
            }
            
            let html = '<div style="font-weight: 600; padding: 10px 15px; background: var(--bg-tertiary); border-bottom: 1px solid var(--border-color);">Recent Tests</div>';
            times.slice().reverse().forEach((time, index) => {
                const category = getTimeCategory(time);
                html += `
                    <div class="reaction-history-item">
                        <span>Test #${times.length - index}</span>
                        <span>
                            <span class="reaction-time-badge ${category.class}">${time}ms - ${category.label}</span>
                        </span>
                    </div>
                `;
            });
            container.innerHTML = html;
        }
        
        function startNewTest() {
            if (state === 'ready') {
                clearTimeout(timeoutId);
            }
            
            state = 'waiting';
            const screen = document.getElementById('reaction-screen');
            const message = document.getElementById('reaction-message');
            const timeDisplay = document.getElementById('reaction-time');
            
            screen.className = 'reaction-screen waiting';
            message.textContent = 'Click to start';
            message.style.display = 'block';
            timeDisplay.style.display = 'none';
        }
        
        function handleReactionClick() {
            if (state === 'waiting') {
                
                state = 'ready';
                const screen = document.getElementById('reaction-screen');
                const message = document.getElementById('reaction-message');
                
                screen.className = 'reaction-screen waiting';
                message.textContent = 'Wait for green...';
                
                
                const delay = Math.random() * 4000 + 1000;
                
                timeoutId = setTimeout(() => {
                    readyTime = Date.now();
                    
                    screen.style.transition = 'none';
                    screen.className = 'reaction-screen ready';
                    message.textContent = 'CLICK NOW!';
                    
                    setTimeout(() => {
                        screen.style.transition = '';
                    }, 10);
                }, delay);
            } else if (state === 'ready') {
                
                clickTime = Date.now();
                const reactionTime = clickTime - readyTime;
                
                
                if (reactionTime < 50) {
                    const screen = document.getElementById('reaction-screen');
                    const message = document.getElementById('reaction-message');
                    screen.className = 'reaction-screen click';
                    message.textContent = 'Too early! Click to try again.';
                    state = 'waiting';
                    return;
                }
                
                times.push(reactionTime);
                saveHistory();
                updateStats();
                renderHistory();
                
                const screen = document.getElementById('reaction-screen');
                const message = document.getElementById('reaction-message');
                const timeDisplay = document.getElementById('reaction-time');
                const category = getTimeCategory(reactionTime);
                
                screen.className = 'reaction-screen click';
                message.textContent = category.label;
                message.style.display = 'block';
                timeDisplay.textContent = reactionTime + 'ms';
                timeDisplay.style.display = 'block';
                
                state = 'waiting';
                
                
                setTimeout(() => {
                    startNewTest();
                }, 2000);
            } else if (state === 'click') {
                startNewTest();
            }
        }
        
        window.handleReactionClick = handleReactionClick;
        window.startNewTest = startNewTest;
        window.clearHistory = () => {
            if (confirm('Clear all test history?')) {
                times = [];
                saveHistory();
                updateStats();
                renderHistory();
                ToolUtils.showNotification('History cleared', 1500);
            }
        };
        
        loadHistory();
        startNewTest();
    }
};

