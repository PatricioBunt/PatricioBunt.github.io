// Chimp Test Tool
export default {
    title: 'Chimp Test',
    styles: `
        /* Chimp Test Styles */
        .chimp-test-container {
            max-width: 800px;
            margin: 0 auto;
            text-align: center;
        }

        .chimp-grid {
            display: grid;
            gap: 10px;
            margin: 30px auto;
            max-width: 600px;
        }

        .chimp-cell {
            aspect-ratio: 1;
            background: var(--bg-secondary);
            border: 2px solid var(--border-color);
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            font-weight: bold;
            color: var(--text-primary);
            cursor: pointer;
            transition: all 0.2s;
            user-select: none;
        }

        .chimp-cell:hover {
            background: var(--bg-hover);
            border-color: var(--accent-color);
            transform: scale(1.05);
        }

        .chimp-cell.hidden {
            background: var(--bg-tertiary);
            color: transparent;
            border-color: var(--border-color);
        }

        .chimp-cell.correct {
            background: color-mix(in srgb, #4ec9b0 30%, var(--bg-secondary));
            border-color: #4ec9b0;
        }

        .chimp-cell.incorrect {
            background: color-mix(in srgb, #f48771 30%, var(--bg-secondary));
            border-color: #f48771;
            animation: shake 0.5s;
        }

        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            75% { transform: translateX(10px); }
        }

        .chimp-stats {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 15px;
            margin-bottom: 30px;
        }

        .chimp-stat {
            background: var(--bg-secondary);
            border: 1px solid var(--border-color);
            border-radius: 4px;
            padding: 15px;
        }

        .chimp-stat-value {
            font-size: 32px;
            font-weight: bold;
            color: var(--accent-color);
            margin-bottom: 5px;
        }

        .chimp-stat-label {
            font-size: 12px;
            color: var(--text-secondary);
        }

        .chimp-instructions {
            background: var(--bg-secondary);
            border: 1px solid var(--border-color);
            border-radius: 4px;
            padding: 20px;
            margin-bottom: 20px;
            text-align: left;
        }

        .chimp-instructions h4 {
            color: var(--accent-color);
            margin-bottom: 10px;
        }

        .chimp-instructions ol {
            margin-left: 20px;
            color: var(--text-secondary);
            line-height: 1.8;
        }
    `,
    html: `
        <div class="tool-info">
            <i class="fas fa-info-circle" style="margin-right: 8px;"></i>
            Test your working memory! Remember the sequence of numbers and click them in order.
        </div>
        <div class="tool-section">
            <div class="chimp-test-container">
                <div class="chimp-stats">
                    <div class="chimp-stat">
                        <div class="chimp-stat-value" id="current-level">1</div>
                        <div class="chimp-stat-label">Level</div>
                    </div>
                    <div class="chimp-stat">
                        <div class="chimp-stat-value" id="best-level">1</div>
                        <div class="chimp-stat-label">Best Level</div>
                    </div>
                    <div class="chimp-stat">
                        <div class="chimp-stat-value" id="score">0</div>
                        <div class="chimp-stat-label">Score</div>
                    </div>
                </div>

                <div class="chimp-instructions" id="instructions">
                    <h4>How to Play:</h4>
                    <ol>
                        <li>Numbers will appear on the grid in a sequence</li>
                        <li>Remember the order they appeared</li>
                        <li>Click the numbers in the same order</li>
                        <li>Each level adds one more number to remember</li>
                    </ol>
                </div>

                <div id="chimp-grid" class="chimp-grid"></div>

                <div style="margin-top: 20px;">
                    <button class="tool-button" onclick="startGame()" id="start-btn">
                        <i class="fas fa-play" style="margin-right: 6px;"></i>
                        Start Game
                    </button>
                    <button class="tool-button secondary" onclick="resetGame()" id="reset-btn" style="display: none;">
                        <i class="fas fa-redo" style="margin-right: 6px;"></i>
                        Reset
                    </button>
                </div>
            </div>
        </div>
    `,
    init() {
        const STORAGE_KEY = 'chimp_test_best';
        let currentLevel = 1;
        let bestLevel = 1;
        let score = 0;
        let sequence = [];
        let userSequence = [];
        let isShowingSequence = false;
        let isWaitingForInput = false;
        let gridSize = 4;
        
        function loadBest() {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                bestLevel = parseInt(saved) || 1;
                document.getElementById('best-level').textContent = bestLevel;
            }
        }
        
        function saveBest() {
            if (currentLevel > bestLevel) {
                bestLevel = currentLevel;
                localStorage.setItem(STORAGE_KEY, bestLevel.toString());
                document.getElementById('best-level').textContent = bestLevel;
            }
        }
        
        function generateSequence(length) {
            const numbers = [];
            const cells = gridSize * gridSize;
            const used = new Set();
            
            while (numbers.length < length) {
                const num = Math.floor(Math.random() * cells) + 1;
                if (!used.has(num)) {
                    used.add(num);
                    numbers.push(num);
                }
            }
            
            return numbers;
        }
        
        function createGrid() {
            const grid = document.getElementById('chimp-grid');
            grid.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
            grid.innerHTML = '';
            
            for (let i = 1; i <= gridSize * gridSize; i++) {
                const cell = document.createElement('div');
                cell.className = 'chimp-cell hidden';
                cell.textContent = i;
                cell.dataset.number = i;
                cell.onclick = () => handleCellClick(i);
                grid.appendChild(cell);
            }
        }
        
        function showSequence() {
            isShowingSequence = true;
            const cells = document.querySelectorAll('.chimp-cell');
            
            // Hide all numbers
            cells.forEach(cell => {
                cell.classList.add('hidden');
                cell.classList.remove('correct', 'incorrect');
            });
            
            // Show sequence one by one
            sequence.forEach((num, index) => {
                setTimeout(() => {
                    const cell = cells[num - 1];
                    cell.classList.remove('hidden');
                    
                    setTimeout(() => {
                        cell.classList.add('hidden');
                    }, 600);
                }, index * 800);
            });
            
            // After showing sequence, wait for user input
            setTimeout(() => {
                isShowingSequence = false;
                isWaitingForInput = true;
                userSequence = [];
                
                // Show all numbers
                cells.forEach(cell => {
                    cell.classList.remove('hidden');
                });
            }, sequence.length * 800 + 500);
        }
        
        function handleCellClick(num) {
            if (isShowingSequence || !isWaitingForInput) return;
            
            const cells = document.querySelectorAll('.chimp-cell');
            const cell = cells[num - 1];
            
            userSequence.push(num);
            const expectedIndex = userSequence.length - 1;
            
            if (num === sequence[expectedIndex]) {
                // Correct
                cell.classList.add('correct');
                cell.classList.remove('incorrect');
                
                // Check if sequence complete
                if (userSequence.length === sequence.length) {
                    // Level complete!
                    score += currentLevel * 10;
                    document.getElementById('score').textContent = score;
                    
                    setTimeout(() => {
                        currentLevel++;
                        document.getElementById('current-level').textContent = currentLevel;
                        saveBest();
                        startLevel();
                    }, 1000);
                }
            } else {
                // Incorrect
                cell.classList.add('incorrect');
                isWaitingForInput = false;
                
                // Game over
                setTimeout(() => {
                    alert(`Game Over!\n\nLevel Reached: ${currentLevel}\nScore: ${score}\n\nYour best: Level ${bestLevel}`);
                    resetGame();
                }, 500);
            }
        }
        
        function startLevel() {
            sequence = generateSequence(currentLevel);
            createGrid();
            
            setTimeout(() => {
                showSequence();
            }, 500);
        }
        
        function startGame() {
            currentLevel = 1;
            score = 0;
            document.getElementById('current-level').textContent = currentLevel;
            document.getElementById('score').textContent = score;
            document.getElementById('instructions').style.display = 'none';
            document.getElementById('start-btn').style.display = 'none';
            document.getElementById('reset-btn').style.display = 'inline-block';
            
            startLevel();
        }
        
        function resetGame() {
            currentLevel = 1;
            score = 0;
            sequence = [];
            userSequence = [];
            isShowingSequence = false;
            isWaitingForInput = false;
            
            document.getElementById('current-level').textContent = currentLevel;
            document.getElementById('score').textContent = score;
            document.getElementById('instructions').style.display = 'block';
            document.getElementById('start-btn').style.display = 'inline-block';
            document.getElementById('reset-btn').style.display = 'none';
            
            createGrid();
        }
        
        window.startGame = startGame;
        window.resetGame = resetGame;
        
        // Initialize
        loadBest();
        createGrid();
    }
};

