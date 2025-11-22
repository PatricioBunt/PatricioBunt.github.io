
export default {
    title: 'Wordle',
    styles: `
        /* Wordle Styles */
        .wordle-container {
            max-width: 600px;
            margin: 0 auto;
        }

        .wordle-grid {
            display: grid;
            grid-template-rows: repeat(6, 1fr);
            gap: 8px;
            margin: 30px 0;
        }

        .wordle-row {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 8px;
        }

        .wordle-cell {
            aspect-ratio: 1;
            background: var(--bg-secondary);
            border: 2px solid var(--border-color);
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 32px;
            font-weight: bold;
            color: var(--text-primary);
            text-transform: uppercase;
            transition: all 0.3s;
        }

        .wordle-cell.filled {
            border-color: var(--text-secondary);
        }

        .wordle-cell.correct {
            background: #4ec9b0;
            border-color: #4ec9b0;
            color: white;
            animation: flip 0.5s;
        }

        .wordle-cell.present {
            background: #dcdcaa;
            border-color: #dcdcaa;
            color: white;
            animation: flip 0.5s;
        }

        .wordle-cell.absent {
            background: var(--bg-tertiary);
            border-color: var(--border-color);
            color: var(--text-disabled);
            animation: flip 0.5s;
        }

        @keyframes flip {
            0% { transform: scaleY(1); }
            50% { transform: scaleY(0); }
            100% { transform: scaleY(1); }
        }

        .wordle-keyboard {
            margin-top: 30px;
        }

        .keyboard-row {
            display: flex;
            justify-content: center;
            gap: 6px;
            margin-bottom: 8px;
        }

        .keyboard-key {
            padding: 12px 16px;
            background: var(--bg-secondary);
            border: 1px solid var(--border-color);
            border-radius: 4px;
            font-size: 14px;
            font-weight: 600;
            color: var(--text-primary);
            cursor: pointer;
            transition: all var(--transition-speed);
            text-transform: uppercase;
            min-width: 40px;
        }

        .keyboard-key:hover {
            background: var(--bg-hover);
            border-color: var(--accent-color);
        }

        .keyboard-key.wide {
            padding: 12px 24px;
            font-size: 12px;
        }

        .keyboard-key.correct {
            background: #4ec9b0;
            border-color: #4ec9b0;
            color: white;
        }

        .keyboard-key.present {
            background: #dcdcaa;
            border-color: #dcdcaa;
            color: white;
        }

        .keyboard-key.absent {
            background: var(--bg-tertiary);
            border-color: var(--border-color);
            color: var(--text-disabled);
        }

        .wordle-stats {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 15px;
            margin-bottom: 20px;
        }

        .wordle-stat {
            background: var(--bg-secondary);
            border: 1px solid var(--border-color);
            border-radius: 4px;
            padding: 15px;
            text-align: center;
        }

        .wordle-stat-value {
            font-size: 24px;
            font-weight: bold;
            color: var(--accent-color);
            margin-bottom: 5px;
        }

        .wordle-stat-label {
            font-size: 11px;
            color: var(--text-secondary);
        }

        .wordle-message {
            text-align: center;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
            font-weight: 600;
        }

        .wordle-message.success {
            background: color-mix(in srgb, #4ec9b0 20%, transparent);
            color: #4ec9b0;
            border: 1px solid #4ec9b0;
        }

        .wordle-message.error {
            background: color-mix(in srgb, #f48771 20%, transparent);
            color: #f48771;
            border: 1px solid #f48771;
        }
    `,
    html: `
        <div class="tool-info">
            <i class="fas fa-info-circle" style="margin-right: 8px;"></i>
            Guess the 5-letter word in 6 tries! Green = correct position, Yellow = wrong position, Gray = not in word.
        </div>
        <div class="tool-section">
            <div class="wordle-container">
                <div class="wordle-stats">
                    <div class="wordle-stat">
                        <div class="wordle-stat-value" id="games-played">0</div>
                        <div class="wordle-stat-label">Games</div>
                    </div>
                    <div class="wordle-stat">
                        <div class="wordle-stat-value" id="games-won">0</div>
                        <div class="wordle-stat-label">Wins</div>
                    </div>
                    <div class="wordle-stat">
                        <div class="wordle-stat-value" id="current-streak">0</div>
                        <div class="wordle-stat-label">Streak</div>
                    </div>
                    <div class="wordle-stat">
                        <div class="wordle-stat-value" id="best-streak">0</div>
                        <div class="wordle-stat-label">Best Streak</div>
                    </div>
                </div>

                <div id="wordle-message"></div>

                <div class="wordle-grid" id="wordle-grid"></div>

                <div class="wordle-keyboard" id="wordle-keyboard"></div>

                <div style="margin-top: 20px; text-align: center;">
                    <button class="tool-button" onclick="newGame()" id="new-game-btn" style="display: none;">
                        <i class="fas fa-redo" style="margin-right: 6px;"></i>
                        New Game
                    </button>
                </div>
            </div>
        </div>
    `,
    init() {
        const STORAGE_KEY = 'wordle_stats';
        const ANSWER_LIST_KEY = 'wordle_answer_list';
        const VALID_WORDS_KEY = 'wordle_valid_words';
        const DEFAULT_WORDS = [
            'APPLE', 'BRAVE', 'CLOUD', 'DREAM', 'EARTH', 'FLAME', 'GLASS', 'HEART',
            'IMAGE', 'JUMPS', 'KNIFE', 'LIGHT', 'MAGIC', 'NIGHT', 'OCEAN', 'PIANO',
            'QUICK', 'RIVER', 'STORM', 'TABLE', 'UNITY', 'VALUE', 'WATER', 'YOUTH',
            'ZEBRA', 'BEACH', 'CHAIR', 'DANCE', 'EAGLE', 'FROST', 'GREEN', 'HAPPY',
            'IVORY', 'JOKER', 'KNEEL', 'LEMON', 'MUSIC', 'NURSE', 'OLIVE', 'PAPER',
            'QUEEN', 'ROBOT', 'SMILE', 'TIGER', 'URBAN', 'VIVID', 'WHEAT', 'XENON',
            'YACHT', 'ZONAL', 'BREAD', 'CRANE', 'DRAIN', 'ELBOW', 'FOCUS', 'GRACE'
        ];
        
        let ANSWER_WORDS = []; 
        let VALID_WORDS = []; 
        let currentWord = '';
        let currentRow = 0;
        let currentCell = 0;
        let gameOver = false;
        let stats = { games: 0, wins: 0, streak: 0, bestStreak: 0 };
        
        async function loadWordLists() {
            
            const savedAnswers = localStorage.getItem(ANSWER_LIST_KEY);
            if (savedAnswers) {
                const words = savedAnswers.split('\n').map(w => w.trim().toUpperCase()).filter(w => w.length === 5);
                ANSWER_WORDS = words.length > 0 ? words : DEFAULT_WORDS;
            } else {
                
                try {
                    const response = await fetch('/wordle-answers.txt');
                    if (response.ok) {
                        const text = await response.text();
                        
                        const words = text.split('\n')
                            .slice(1) 
                            .map(w => w.trim().toUpperCase())
                            .filter(w => w.length === 5 && /^[A-Z]{5}$/.test(w));
                        if (words.length > 0) {
                            ANSWER_WORDS = words;
                            localStorage.setItem(ANSWER_LIST_KEY, words.join('\n'));
                        } else {
                            ANSWER_WORDS = DEFAULT_WORDS;
                        }
                    } else {
                        ANSWER_WORDS = DEFAULT_WORDS;
                    }
                } catch (error) {
                    console.log('Failed to load answer words, using default:', error);
                    ANSWER_WORDS = DEFAULT_WORDS;
                }
            }
            
            
            const savedValid = localStorage.getItem(VALID_WORDS_KEY);
            if (savedValid) {
                const words = savedValid.split('\n').map(w => w.trim().toUpperCase()).filter(w => w.length === 5);
                VALID_WORDS = words.length > 0 ? words : ANSWER_WORDS;
            } else {
                
                try {
                    const response = await fetch('/wordle-valid-words.txt');
                    if (response.ok) {
                        const text = await response.text();
                        const words = text.split('\n')
                            .map(w => w.trim().toUpperCase())
                            .filter(w => w.length === 5 && /^[A-Z]{5}$/.test(w));
                        if (words.length > 0) {
                            VALID_WORDS = words;
                            localStorage.setItem(VALID_WORDS_KEY, words.join('\n'));
                        } else {
                            VALID_WORDS = ANSWER_WORDS;
                        }
                    } else {
                        VALID_WORDS = ANSWER_WORDS;
                    }
                } catch (error) {
                    console.log('Failed to load valid words, using answer words:', error);
                    VALID_WORDS = ANSWER_WORDS;
                }
            }
            
            updateWordCount();
        }
        
        function updateWordCount() {
        }
        
        function loadStats() {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                stats = JSON.parse(saved);
                updateStatsDisplay();
            }
        }
        
        function saveStats() {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
        }
        
        function updateStatsDisplay() {
            document.getElementById('games-played').textContent = stats.games || 0;
            document.getElementById('games-won').textContent = stats.wins || 0;
            document.getElementById('current-streak').textContent = stats.streak || 0;
            document.getElementById('best-streak').textContent = stats.bestStreak || 0;
        }
        
        function createGrid() {
            const grid = document.getElementById('wordle-grid');
            grid.innerHTML = '';
            
            for (let row = 0; row < 6; row++) {
                const rowEl = document.createElement('div');
                rowEl.className = 'wordle-row';
                rowEl.dataset.row = row;
                
                for (let col = 0; col < 5; col++) {
                    const cell = document.createElement('div');
                    cell.className = 'wordle-cell';
                    cell.dataset.row = row;
                    cell.dataset.col = col;
                    rowEl.appendChild(cell);
                }
                
                grid.appendChild(rowEl);
            }
        }
        
        function createKeyboard() {
            const keyboard = document.getElementById('wordle-keyboard');
            const layout = [
                ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
                ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
                ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE']
            ];
            
            keyboard.innerHTML = '';
            
            layout.forEach(row => {
                const rowEl = document.createElement('div');
                rowEl.className = 'keyboard-row';
                
                row.forEach(key => {
                    const keyEl = document.createElement('button');
                    keyEl.className = 'keyboard-key';
                    keyEl.textContent = key;
                    keyEl.dataset.key = key;
                    
                    if (key === 'ENTER' || key === 'BACKSPACE') {
                        keyEl.classList.add('wide');
                        keyEl.innerHTML = key === 'BACKSPACE' ? '<i class="fas fa-backspace"></i>' : key;
                    }
                    
                    keyEl.onclick = () => handleKeyPress(key);
                    rowEl.appendChild(keyEl);
                });
                
                keyboard.appendChild(rowEl);
            });
        }
        
        function getCell(row, col) {
            return document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        }
        
        function handleKeyPress(key) {
            if (gameOver) return;
            
            if (key === 'ENTER') {
                submitGuess();
            } else if (key === 'BACKSPACE') {
                if (currentCell > 0) {
                    currentCell--;
                    const cell = getCell(currentRow, currentCell);
                    cell.textContent = '';
                    cell.classList.remove('filled');
                }
            } else if (key.length === 1 && /[A-Z]/.test(key)) {
                if (currentCell < 5) {
                    const cell = getCell(currentRow, currentCell);
                    cell.textContent = key;
                    cell.classList.add('filled');
                    currentCell++;
                }
            }
        }
        
        function submitGuess() {
            if (currentCell !== 5) {
                showMessage('Not enough letters!', 'error');
                return;
            }
            
            
            let guess = '';
            for (let i = 0; i < 5; i++) {
                guess += getCell(currentRow, i).textContent;
            }
            
            
            if (guess.length !== 5) {
                showMessage('Word must be 5 letters!', 'error');
                return;
            }
            
            
            if (!VALID_WORDS.includes(guess)) {
                showMessage('Not a valid word!', 'error');
                return;
            }
            
            
            const result = checkGuess(guess);
            let allCorrect = true;
            
            result.forEach((status, i) => {
                const cell = getCell(currentRow, i);
                const key = document.querySelector(`[data-key="${guess[i]}"]`);
                
                cell.classList.remove('filled');
                cell.classList.add(status);
                
                
                if (key && !key.classList.contains('correct')) {
                    key.classList.remove('present', 'absent');
                    key.classList.add(status);
                }
                
                if (status !== 'correct') {
                    allCorrect = false;
                }
            });
            
            if (allCorrect) {
                
                gameOver = true;
                stats.games = (stats.games || 0) + 1;
                stats.wins = (stats.wins || 0) + 1;
                stats.streak = (stats.streak || 0) + 1;
                if (stats.streak > (stats.bestStreak || 0)) {
                    stats.bestStreak = stats.streak;
                }
                saveStats();
                updateStatsDisplay();
                
                showMessage(`Congratulations! You won in ${currentRow + 1} ${currentRow === 0 ? 'try' : 'tries'}!`, 'success');
                document.getElementById('new-game-btn').style.display = 'inline-block';
            } else {
                currentRow++;
                currentCell = 0;
                
                if (currentRow >= 6) {
                    
                    gameOver = true;
                    stats.games = (stats.games || 0) + 1;
                    stats.streak = 0;
                    saveStats();
                    updateStatsDisplay();
                    
                    showMessage(`Game Over! The word was: ${currentWord}`, 'error');
                    document.getElementById('new-game-btn').style.display = 'inline-block';
                }
            }
        }
        
        function checkGuess(guess) {
            const result = ['absent', 'absent', 'absent', 'absent', 'absent'];
            const wordLetters = currentWord.split('');
            const guessLetters = guess.split('');
            
            
            for (let i = 0; i < 5; i++) {
                if (guessLetters[i] === wordLetters[i]) {
                    result[i] = 'correct';
                    wordLetters[i] = null;
                    guessLetters[i] = null;
                }
            }
            
            
            for (let i = 0; i < 5; i++) {
                if (guessLetters[i] && result[i] !== 'correct') {
                    const index = wordLetters.indexOf(guessLetters[i]);
                    if (index !== -1) {
                        result[i] = 'present';
                        wordLetters[index] = null;
                    }
                }
            }
            
            return result;
        }
        
        function showMessage(text, type) {
            const message = document.getElementById('wordle-message');
            message.textContent = text;
            message.className = `wordle-message ${type}`;
            message.style.display = 'block';
            
            setTimeout(() => {
                message.style.display = 'none';
            }, 3000);
        }
        
        function newGame() {
            if (ANSWER_WORDS.length === 0) {
                showMessage('Loading word lists...', 'error');
                return;
            }
            currentWord = ANSWER_WORDS[Math.floor(Math.random() * ANSWER_WORDS.length)];
            currentRow = 0;
            currentCell = 0;
            gameOver = false;
            
            createGrid();
            createKeyboard();
            document.getElementById('wordle-message').style.display = 'none';
            document.getElementById('new-game-btn').style.display = 'none';
        }
        
        window.newGame = newGame;
        
        document.addEventListener('keydown', (e) => {
            if (gameOver && e.key !== 'Enter') return;
            
            if (e.key === 'Enter') {
                handleKeyPress('ENTER');
            } else if (e.key === 'Backspace') {
                handleKeyPress('BACKSPACE');
            } else if (/^[a-zA-Z]$/.test(e.key)) {
                handleKeyPress(e.key.toUpperCase());
            }
        });
        
        loadWordLists().then(() => {
            loadStats();
            newGame();
        });
    }
};

