
export default {
    title: 'Typing Test',
    styles: `
        /* Typing Test Styles */
        .typing-test-container {
            max-width: 900px;
            margin: 0 auto;
        }

        .typing-stats {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 15px;
            margin-bottom: 30px;
        }

        .typing-stat {
            background: var(--bg-secondary);
            border: 1px solid var(--border-color);
            border-radius: 4px;
            padding: 15px;
            text-align: center;
        }

        .typing-stat-value {
            font-size: 32px;
            font-weight: bold;
            color: var(--accent-color);
            margin-bottom: 5px;
        }

        .typing-stat-label {
            font-size: 12px;
            color: var(--text-secondary);
        }

        .typing-text-container {
            background: var(--bg-secondary);
            border: 1px solid var(--border-color);
            border-radius: 4px;
            padding: 20px;
            min-height: 200px;
            font-size: 18px;
            line-height: 1.8;
            font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
            margin-bottom: 20px;
        }

        .typing-text {
            color: var(--text-primary);
        }

        .typing-char {
            display: inline;
        }

        .typing-char.correct {
            color: #4ec9b0;
            background: color-mix(in srgb, #4ec9b0 10%, transparent);
        }

        .typing-char.incorrect {
            color: #f48771;
            background: color-mix(in srgb, #f48771 10%, transparent);
            text-decoration: underline;
        }

        .typing-char.current {
            background: var(--accent-color);
            color: var(--bg-primary);
            padding: 2px 0;
            border-radius: 2px;
        }

        .typing-char.pending {
            color: var(--text-secondary);
        }

        .typing-input {
            width: 100%;
            padding: 15px;
            background: var(--bg-primary);
            border: 2px solid var(--border-color);
            border-radius: 4px;
            color: var(--text-primary);
            font-size: 16px;
            font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
            margin-bottom: 20px;
        }

        .typing-input:focus {
            outline: none;
            border-color: var(--accent-color);
        }

        .typing-input:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }

        .typing-options {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
            flex-wrap: wrap;
        }

        .typing-option-btn {
            padding: 8px 16px;
            background: var(--bg-tertiary);
            border: 1px solid var(--border-color);
            border-radius: 4px;
            color: var(--text-primary);
            cursor: pointer;
            transition: all var(--transition-speed);
            font-size: 13px;
        }

        .typing-option-btn:hover {
            background: var(--bg-hover);
            border-color: var(--accent-color);
        }

        .typing-option-btn.active {
            background: var(--accent-color);
            border-color: var(--accent-color);
            color: white;
        }
    `,
    html: `
        <div class="tool-info">
            <i class="fas fa-info-circle" style="margin-right: 8px;"></i>
            Test your typing speed and accuracy. Type the text as fast and accurately as you can!
        </div>
        <div class="tool-section">
            <div class="typing-test-container">
                <div class="typing-stats">
                    <div class="typing-stat">
                        <div class="typing-stat-value" id="wpm">0</div>
                        <div class="typing-stat-label">WPM</div>
                    </div>
                    <div class="typing-stat">
                        <div class="typing-stat-value" id="accuracy">100%</div>
                        <div class="typing-stat-label">Accuracy</div>
                    </div>
                    <div class="typing-stat">
                        <div class="typing-stat-value" id="time">15s</div>
                        <div class="typing-stat-label">Time</div>
                    </div>
                    <div class="typing-stat">
                        <div class="typing-stat-value" id="chars">0</div>
                        <div class="typing-stat-label">Characters</div>
                    </div>
                </div>

                <div class="typing-options">
                    <button class="typing-option-btn active" onclick="setTestDuration(15)">15s</button>
                    <button class="typing-option-btn" onclick="setTestDuration(30)">30s</button>
                    <button class="typing-option-btn" onclick="setTestDuration(60)">60s</button>
                    <button class="typing-option-btn" onclick="setTestDuration(120)">2min</button>
                    <button class="typing-option-btn" onclick="newTest()">
                        <i class="fas fa-redo" style="margin-right: 6px;"></i>
                        New Test
                    </button>
                </div>

                <div class="typing-text-container" id="typing-text-container">
                    <div class="typing-text" id="typing-text"></div>
                </div>

                <input type="text" class="typing-input" id="typing-input" placeholder="Start typing..." autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
            </div>
        </div>
    `,
    init() {
        let SENTENCES = [];
        let currentText = '';
        let userInput = '';
        let startTime = null;
        let testDuration = 15; 
        let timeLeft = 15; 
        let timerInterval = null;
        let isTestActive = false;
        let correctChars = 0;
        let totalChars = 0;
        
        async function loadSentences() {
            try {
                const response = await fetch('/sentence-list.txt');
                if (response.ok) {
                    const text = await response.text();
                    SENTENCES = text.split('\n')
                        .map(s => s.trim())
                        .filter(s => s.length > 0);
                } else {
                    SENTENCES = [
                        'The quick brown fox jumps over the lazy dog.',
                        'Pack my box with five dozen liquor jugs.',
                        'How vexingly quick daft zebras jump.'
                    ];
                }
            } catch (error) {
                console.log('Failed to load sentences, using defaults:', error);
                SENTENCES = [
                    'The quick brown fox jumps over the lazy dog.',
                    'Pack my box with five dozen liquor jugs.',
                    'How vexingly quick daft zebras jump.'
                ];
            }
        }
        
        function getRandomText() {
            let text = SENTENCES[Math.floor(Math.random() * SENTENCES.length)];
            
            while (text.length < 500) { 
                const nextIndex = Math.floor(Math.random() * SENTENCES.length);
                text += ' ' + SENTENCES[nextIndex];
            }
            
            return text;
        }
        
        function getNextSentence() {
            return SENTENCES[Math.floor(Math.random() * SENTENCES.length)];
        }
        
        function renderText() {
            const container = document.getElementById('typing-text');
            let html = '';
            
            correctChars = 0;
            for (let i = 0; i < Math.min(userInput.length, currentText.length); i++) {
                if (userInput[i] === currentText[i]) {
                    correctChars++;
                }
            }
            
            if (isTestActive && userInput.length >= currentText.length - 50) {
                const nextSentence = getNextSentence();
                currentText += ' ' + nextSentence;
            }
            
            for (let i = 0; i < currentText.length; i++) {
                const char = currentText[i];
                let className = 'typing-char';
                
                if (i < userInput.length) {
                    if (char === userInput[i]) {
                        className += ' correct';
                    } else {
                        className += ' incorrect';
                    }
                } else if (i === userInput.length) {
                    className += ' current';
                } else { 
                    className += ' pending';
                }
                
                html += `<span class="${className}">${escapeHtml(char)}</span>`;
            }
            
            container.innerHTML = html;
            
            const currentChar = container.querySelector('.current');
            if (currentChar) {
                currentChar.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
        
        function escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }
        
        function updateStats() {
            if (!startTime) return;
            
            const elapsed = (Date.now() - startTime) / 1000;
            const minutes = elapsed / 60;
            const wpm = Math.round((userInput.length / 5) / minutes) || 0;
            const accuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 100;
            
            document.getElementById('wpm').textContent = wpm;
            document.getElementById('accuracy').textContent = accuracy + '%';
            document.getElementById('chars').textContent = userInput.length;
        }
        
        function startTest() {
            if (isTestActive) return;
            
            isTestActive = true;
            startTime = Date.now();
            correctChars = 0;
            totalChars = userInput.length; 
            timeLeft = testDuration;
            
            const input = document.getElementById('typing-input');
            input.disabled = false;
            input.focus();
            
            timerInterval = setInterval(() => {
                timeLeft--;
                document.getElementById('time').textContent = timeLeft + 's';
                
                if (timeLeft <= 0) {
                    endTest();
                }
            }, 1000);
            
            renderText();
            updateStats();
        }
        
        function endTest() {
            isTestActive = false;
            clearInterval(timerInterval);
            
            const input = document.getElementById('typing-input');
            input.disabled = true;
            
            const elapsed = (Date.now() - startTime) / 1000;
            const minutes = elapsed / 60;
            const finalWpm = Math.round((userInput.length / 5) / minutes) || 0;
            const finalAccuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 100;
            
            const message = `Test Complete!\n\nWPM: ${finalWpm}\nAccuracy: ${finalAccuracy}%\nCharacters: ${userInput.length}\n\nPress Enter for a new test`;
            ToolUtils.showNotification(message, 3000);
        }
        
        function checkTextCompletion() {
            if (isTestActive && userInput.length >= currentText.length - 50) {
                const nextSentence = getNextSentence();
                currentText += ' ' + nextSentence;
            }
        }
        
        function prepareNewTest() {
            isTestActive = false;
            userInput = '';
            startTime = null;
            correctChars = 0;
            totalChars = 0;
            timeLeft = testDuration;
            
            if (timerInterval) {
                clearInterval(timerInterval);
                timerInterval = null;
            }

            if (SENTENCES.length > 0) {
                currentText = getRandomText();
            } else {
                currentText = 'Loading sentences...';
            }
            
            const input = document.getElementById('typing-input');
            input.value = '';
            input.disabled = false;
            
            
            document.getElementById('wpm').textContent = '0';
            document.getElementById('accuracy').textContent = '100%';
            document.getElementById('time').textContent = testDuration + 's';
            document.getElementById('chars').textContent = '0';
            
            
            renderText();
            
            
            setTimeout(() => {
                input.focus();
            }, 100);
        }
        
        function newTest() {
            if (isTestActive) {
                if (!confirm('End current test and start a new one?')) return;
                endTest();
            }
            
            prepareNewTest();
        }
        
        window.setTestDuration = (duration) => {
            if (isTestActive) {
                if (!confirm('Change duration? This will reset the test.')) return;
                endTest();
            }
            
            testDuration = duration;
            timeLeft = duration;
            document.getElementById('time').textContent = duration + 's';
            
            document.querySelectorAll('.typing-option-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            event.target.classList.add('active');
            
            newTest();
        };
        
        window.newTest = newTest;
        
        const input = document.getElementById('typing-input');
        input.addEventListener('input', (e) => {
            userInput = e.target.value;
            totalChars = userInput.length;
             
            if (!isTestActive && userInput.length > 0) {
                startTest(); 
                renderText();
                updateStats();
                return; 
            }
             
            checkTextCompletion();
             
            renderText();
            updateStats();
        });
        
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && input.value === '') {
                e.preventDefault();
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') { 
                e.preventDefault();
                newTest();
            }
        });
        
        loadSentences().then(() => {
            prepareNewTest();  
        });
    }
};

