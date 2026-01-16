
export default {
    title: 'Speed Reader',
    styles: `
        /* Speed Reader Styles */
        .speed-reader-container {
            max-width: 900px;
            margin: 0 auto;
        }

        .speed-reader-display-container {
            background: var(--bg-secondary);
            border: 2px solid var(--border-color);
            border-radius: 6px;
            padding: 60px 40px;
            margin-bottom: 30px;
            min-height: 200px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
        }

        .speed-reader-display-container.fullscreen-content {
            position: fixed;
            top: var(--header-height);
            left: 0;
            right: 0;
            bottom: 0;
            margin: 0;
            border-radius: 0;
            border: none;
            padding: 80px 60px;
            z-index: 1000;
        }

        .speed-reader-word {
            font-size: 48px;
            font-weight: bold;
            color: var(--text-primary);
            font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
            letter-spacing: 0;
            user-select: none;
            position: relative;
            line-height: 1.2;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .word-before {
            text-align: right;
            min-width: 300px;
            display: inline-block;
        }

        .word-focal {
            color: var(--accent-color);
            font-weight: bold;
            display: inline-block;
        }

        .word-after {
            text-align: left;
            min-width: 300px;
            display: inline-block;
        }

        @media (max-width: 768px) {
            .word-before,
            .word-after {
                min-width: 150px;
            }
        }

        .speed-reader-status {
            position: absolute;
            top: 15px;
            left: 20px;
            font-size: 14px;
            color: var(--text-secondary);
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .speed-reader-fullscreen-btn {
            position: absolute;
            top: 15px;
            right: 20px;
        }

        .speed-reader-display-container.fullscreen-content .speed-reader-fullscreen-btn {
            display: none;
        }

        .status-indicator {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: var(--text-disabled);
        }

        .status-indicator.playing {
            background: #4ec9b0;
            animation: pulse 1.5s ease-in-out infinite;
        }

        .status-indicator.paused {
            background: #dcdcaa;
        }

        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }

        .speed-reader-progress {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: var(--bg-tertiary);
            border-radius: 0 0 4px 4px;
            overflow: hidden;
            cursor: pointer;
            transition: height 0.2s;
        }

        .speed-reader-progress:hover {
            height: 8px;
        }

        .speed-reader-progress-bar {
            height: 100%;
            background: var(--accent-color);
            width: 0%;
            transition: width 0.1s linear;
        }

        .speed-reader-stats {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 15px;
            margin-bottom: 25px;
        }

        .speed-reader-stat {
            background: var(--bg-secondary);
            border: 1px solid var(--border-color);
            border-radius: 4px;
            padding: 12px;
            text-align: center;
        }

        .speed-reader-stat-value {
            font-size: 24px;
            font-weight: bold;
            color: var(--accent-color);
            margin-bottom: 4px;
        }

        .speed-reader-stat-label {
            font-size: 11px;
            color: var(--text-secondary);
        }

        .speed-reader-controls {
            display: flex;
            gap: 10px;
            justify-content: center;
            margin-bottom: 25px;
            flex-wrap: wrap;
        }

        .speed-control-group {
            display: flex;
            gap: 5px;
            align-items: center;
        }

        .speed-control-btn {
            padding: 8px 12px;
            background: var(--bg-tertiary);
            border: 1px solid var(--border-color);
            border-radius: 4px;
            color: var(--text-primary);
            cursor: pointer;
            transition: all var(--transition-speed);
            font-size: 12px;
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .speed-control-btn:hover {
            background: var(--bg-hover);
            border-color: var(--accent-color);
        }

        .speed-control-btn:active {
            transform: scale(0.95);
        }

        .speed-control-btn i {
            font-size: 14px;
        }

        .wpm-display {
            padding: 8px 16px;
            background: var(--bg-secondary);
            border: 1px solid var(--border-color);
            border-radius: 4px;
            font-size: 13px;
            color: var(--text-primary);
            font-weight: 600;
            min-width: 90px;
            text-align: center;
        }

        .speed-reader-input-section {
            background: var(--bg-secondary);
            border: 1px solid var(--border-color);
            border-radius: 4px;
            padding: 20px;
            margin-bottom: 20px;
        }

        .speed-reader-input-section h3 {
            font-size: 14px;
            font-weight: 600;
            color: var(--text-primary);
            margin-bottom: 15px;
        }

        .file-upload-area {
            border: 2px dashed var(--border-color);
            border-radius: 4px;
            padding: 30px;
            text-align: center;
            cursor: pointer;
            transition: all var(--transition-speed);
            margin-top: 15px;
        }

        .file-upload-area:hover {
            border-color: var(--accent-color);
            background: var(--bg-tertiary);
        }

        .file-upload-area.dragover {
            border-color: var(--accent-color);
            background: var(--bg-hover);
        }

        .file-upload-area i {
            font-size: 32px;
            color: var(--text-secondary);
            margin-bottom: 10px;
        }

        .file-upload-area p {
            color: var(--text-secondary);
            font-size: 13px;
            margin: 5px 0;
        }

        .file-upload-area input[type="file"] {
            display: none;
        }

        .speed-reader-shortcuts {
            background: var(--bg-tertiary);
            border: 1px solid var(--border-color);
            border-radius: 4px;
            padding: 15px;
            margin-top: 20px;
        }

        .speed-reader-shortcuts h4 {
            font-size: 13px;
            font-weight: 600;
            color: var(--text-primary);
            margin-bottom: 10px;
        }

        .shortcuts-list {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 8px;
            font-size: 12px;
            color: var(--text-secondary);
        }

        .shortcuts-list div {
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .shortcut-key {
            background: var(--bg-secondary);
            border: 1px solid var(--border-color);
            border-radius: 3px;
            padding: 2px 8px;
            font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
            font-size: 11px;
            color: var(--accent-color);
            font-weight: 600;
        }

        @media (max-width: 768px) {
            .speed-reader-word {
                font-size: 36px;
            }

            .speed-reader-stats {
                grid-template-columns: repeat(2, 1fr);
            }

            .speed-reader-display-container {
                padding: 40px 20px;
            }
        }
    `,
    html: `
        <div class="tool-info">
            <i class="fas fa-info-circle" style="margin-right: 8px;"></i>
            A Spritz-style speed reader that displays one word at a time. Use keyboard shortcuts to control speed and playback.
        </div>
        <div class="tool-section">
            <div class="speed-reader-container">
                <div class="speed-reader-display-container" id="speed-reader-display">
                    <div class="speed-reader-status">
                        <span class="status-indicator" id="status-indicator"></span>
                        <span id="status-text">Ready</span>
                    </div>
                    <button class="fullscreen-btn speed-reader-fullscreen-btn" onclick="enterSpeedReaderFullscreen()" title="Fullscreen">
                        <i class="fas fa-expand"></i>
                        <span>Fullscreen</span>
                    </button>
                    <div class="speed-reader-word" id="reader-word">Start reading</div>
                    <div class="speed-reader-progress">
                        <div class="speed-reader-progress-bar" id="progress-bar"></div>
                    </div>
                </div>

                <div class="speed-reader-stats">
                    <div class="speed-reader-stat">
                        <div class="speed-reader-stat-value" id="stat-wpm">250</div>
                        <div class="speed-reader-stat-label">WPM</div>
                    </div>
                    <div class="speed-reader-stat">
                        <div class="speed-reader-stat-value" id="stat-progress">0</div>
                        <div class="speed-reader-stat-label">Words Read</div>
                    </div>
                    <div class="speed-reader-stat">
                        <div class="speed-reader-stat-value" id="stat-remaining">0</div>
                        <div class="speed-reader-stat-label">Remaining</div>
                    </div>
                    <div class="speed-reader-stat">
                        <div class="speed-reader-stat-value" id="stat-time">0:00</div>
                        <div class="speed-reader-stat-label">Time Left</div>
                    </div>
                </div>

                <div class="speed-reader-controls">
                    <button class="tool-button" onclick="togglePlayPause()" id="play-btn">
                        <i class="fas fa-play"></i>
                        Start
                    </button>
                    <button class="tool-button secondary" onclick="resetReader()">
                        <i class="fas fa-redo"></i>
                        Reset
                    </button>
                    <div class="speed-control-group">
                        <button class="speed-control-btn" onclick="decreaseSpeed()" title="Decrease speed (Left Ctrl)">
                            <i class="fas fa-minus"></i>
                        </button>
                        <div class="wpm-display" id="wpm-display">250 WPM</div>
                        <button class="speed-control-btn" onclick="increaseSpeed()" title="Increase speed (Left Alt)">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </div>

                <div class="speed-reader-input-section">
                    <h3><i class="fas fa-file-alt" style="margin-right: 8px;"></i>Input Text</h3>
                    
                    <div class="tool-input-group" style="margin-bottom: 15px;">
                        <label for="book-select">
                            <i class="fas fa-book" style="margin-right: 6px; color: var(--text-secondary);"></i>
                            Load a Classic Book (Public Domain)
                        </label>
                        <select id="book-select" onchange="loadBook()">
                            <option value="">-- Select a book --</option>
                            <option value="Alice's Adventures in Wonderland.txt">Alice's Adventures in Wonderland - Lewis Carroll</option>
                            <option value="A TALE OF TWO CITIES.txt">A Tale of Two Cities - Charles Dickens</option>
                            <option value="Frankenstein.txt">Frankenstein - Mary Shelley</option>
                            <option value="Great Expectations.txt">Great Expectations - Charles Dickens</option>
                            <option value="Les Misérables.txt">Les Misérables - Victor Hugo</option>
                            <option value="Metamorphosis.txt">Metamorphosis - Franz Kafka</option>
                            <option value="MOBY-DICK.txt">Moby-Dick - Herman Melville</option>
                            <option value="Oliver Twist.txt">Oliver Twist - Charles Dickens</option>
                            <option value="Peter Pan.txt">Peter Pan - J.M. Barrie</option>
                            <option value="PRIDE AND PREJUDICE.txt">Pride and Prejudice - Jane Austen</option>
                            <option value="The Adventures of Sherlock Holmes.txt">The Adventures of Sherlock Holmes - Arthur Conan Doyle</option>
                            <option value="THE COUNT OF MONTE CRISTO.txt">The Count of Monte Cristo - Alexandre Dumas</option>
                            <option value="The Great Gatsby.txt">The Great Gatsby - F. Scott Fitzgerald</option>
                            <option value="The Picture of Dorian Gray.txt">The Picture of Dorian Gray - Oscar Wilde</option>
                            <option value="The Scarlet Letter.txt">The Scarlet Letter - Nathaniel Hawthorne</option>
                            <option value="The Strange Case Of Dr. Jekyll And Mr. Hyde.txt">Dr. Jekyll and Mr. Hyde - Robert Louis Stevenson</option>
                            <option value="Treasure Island.txt">Treasure Island - Robert Louis Stevenson</option>
                            <option value="The Wonderful Wizard of Oz.txt">The Wonderful Wizard of Oz - L. Frank Baum</option>
                            <option value="War and Peace.txt">War and Peace - Leo Tolstoy</option>
                        </select>
                    </div>
                    
                    <div class="tool-input-group">
                        <textarea id="reader-text" placeholder="Paste your text here..." style="min-height: 150px;"></textarea>
                    </div>
                    <button class="tool-button" onclick="loadText()">
                        <i class="fas fa-check" style="margin-right: 6px;"></i>
                        Load Text
                    </button>
                    
                    <div class="file-upload-area" id="file-upload-area">
                        <i class="fas fa-cloud-upload-alt"></i>
                        <p><strong>Drop a text file here</strong></p>
                        <p>or click to browse</p>
                        <input type="file" id="file-input" accept=".txt,.md" onchange="handleFileSelect(event)">
                    </div>
                </div>

                <div class="speed-reader-shortcuts">
                    <h4><i class="fas fa-keyboard" style="margin-right: 8px;"></i>Keyboard Shortcuts</h4>
                    <div class="shortcuts-list">
                        <div>
                            <span class="shortcut-key">Space</span>
                            <span>Play / Pause</span>
                        </div>
                        <div>
                            <span class="shortcut-key">Left Alt</span>
                            <span>Speed Up</span>
                        </div>
                        <div>
                            <span class="shortcut-key">Left Ctrl</span>
                            <span>Slow Down</span>
                        </div>
                        <div>
                            <span class="shortcut-key">R</span>
                            <span>Reset</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    init() {
        let words = [];
        let currentIndex = 0;
        let isPlaying = false;
        let wpm = 250;
        let intervalId = null;
        
        const minWPM = 50;
        const maxWPM = 1000;
        const wpmStep = 25;
        
        // Elements
        const readerWord = document.getElementById('reader-word');
        const statusIndicator = document.getElementById('status-indicator');
        const statusText = document.getElementById('status-text');
        const progressBar = document.getElementById('progress-bar');
        const playBtn = document.getElementById('play-btn');
        const readerText = document.getElementById('reader-text');
        const fileUploadArea = document.getElementById('file-upload-area');
        const fileInput = document.getElementById('file-input');
        
        // Load sample text initially
        const sampleText = "Welcome to the Speed Reader! This tool helps you read faster by showing one word at a time. Paste your own text below, or upload a text file to get started. You can control the reading speed using the buttons or keyboard shortcuts. Press Space to start reading, and use Left Alt to speed up or Left Ctrl to slow down. The reader will automatically pause briefly after sentences to give you time to process. Happy reading!";
        readerText.value = sampleText;
        loadText();
        
        function parseText(text) {
            // Split by whitespace and filter out empty strings
            return text.split(/\s+/).filter(word => word.length > 0);
        }
        
        function getFocalPoint(word) {
            // Calculate the optimal recognition point (ORP)
            // Usually around 1/3 from the start for optimal recognition
            const len = word.length;
            if (len === 1) return 0;
            if (len === 2) return 0;
            if (len === 3) return 1;
            return Math.floor(len * 0.35);
        }
        
        function displayWord(word) {
            if (!word) {
                readerWord.innerHTML = 'Complete!';
                return;
            }
            
            const focalIndex = getFocalPoint(word);
            
            // Split word into three parts: before focal, focal letter, after focal
            const before = word.slice(0, focalIndex);
            const focal = word[focalIndex];
            const after = word.slice(focalIndex + 1);
            
            // Create HTML with three divs to keep focal letter in fixed position
            readerWord.innerHTML = `
                <div class="word-before">${escapeHtml(before)}</div>
                <div class="word-focal">${escapeHtml(focal)}</div>
                <div class="word-after">${escapeHtml(after)}</div>
            `;
        }
        
        function escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }
        
        function getDelayForWord(word) {
            // Base delay from WPM
            let delay = 60000 / wpm;
            
            // Add extra time for punctuation
            if (word.match(/[.!?;:]$/)) {
                delay += 300; // Extra 300ms pause after sentence endings
            } else if (word.match(/[,]$/)) {
                delay += 150; // Extra 150ms pause after commas
            }
            
            // Longer words get slightly more time
            if (word.length > 8) {
                delay += 100;
            }
            
            return delay;
        }
        
        function updateStats() {
            document.getElementById('stat-wpm').textContent = wpm;
            document.getElementById('stat-progress').textContent = currentIndex;
            document.getElementById('stat-remaining').textContent = Math.max(0, words.length - currentIndex);
            
            const wordsRemaining = words.length - currentIndex;
            const timeSeconds = Math.ceil((wordsRemaining * 60) / wpm);
            const minutes = Math.floor(timeSeconds / 60);
            const seconds = timeSeconds % 60;
            document.getElementById('stat-time').textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
            
            const progress = words.length > 0 ? (currentIndex / words.length) * 100 : 0;
            progressBar.style.width = progress + '%';
            
            document.getElementById('wpm-display').textContent = `${wpm} WPM`;
        }
        
        function play() {
            if (words.length === 0) {
                ToolUtils.showNotification('Please load some text first', 2000);
                return;
            }
            
            if (currentIndex >= words.length) {
                currentIndex = 0;
            }
            
            isPlaying = true;
            statusIndicator.classList.add('playing');
            statusIndicator.classList.remove('paused');
            statusText.textContent = 'Playing';
            playBtn.innerHTML = '<i class="fas fa-pause"></i> Pause';
            
            function showNextWord() {
                if (!isPlaying || currentIndex >= words.length) {
                    if (currentIndex >= words.length) {
                        complete();
                    }
                    return;
                }
                
                const word = words[currentIndex];
                displayWord(word);
                currentIndex++;
                updateStats();
                
                const delay = getDelayForWord(word);
                intervalId = setTimeout(showNextWord, delay);
            }
            
            showNextWord();
        }
        
        function pause() {
            isPlaying = false;
            statusIndicator.classList.remove('playing');
            statusIndicator.classList.add('paused');
            statusText.textContent = 'Paused';
            playBtn.innerHTML = '<i class="fas fa-play"></i> Resume';
            
            if (intervalId) {
                clearTimeout(intervalId);
                intervalId = null;
            }
        }
        
        function complete() {
            pause();
            statusIndicator.classList.remove('playing', 'paused');
            statusText.textContent = 'Complete';
            playBtn.innerHTML = '<i class="fas fa-play"></i> Start';
            ToolUtils.showNotification('Reading complete!', 2000);
        }
        
        function togglePlayPause() {
            if (isPlaying) {
                pause();
            } else {
                play();
            }
        }
        
        function resetReader() {
            pause();
            currentIndex = 0;
            if (words.length > 0) {
                displayWord(words[0]);
            } else {
                readerWord.innerHTML = 'Start reading';
            }
            statusIndicator.classList.remove('playing', 'paused');
            statusText.textContent = 'Ready';
            playBtn.innerHTML = '<i class="fas fa-play"></i> Start';
            updateStats();
        }
        
        function loadText() {
            const text = readerText.value.trim();
            if (!text) {
                ToolUtils.showNotification('Please enter some text', 2000);
                return;
            }
            
            words = parseText(text);
            currentIndex = 0;
            resetReader();
            
            if (words.length > 0) {
                displayWord(words[0]);
                updateStats();
                ToolUtils.showNotification(`Loaded ${words.length} words`, 2000);
            }
        }
        
        function increaseSpeed() {
            if (wpm < maxWPM) {
                wpm = Math.min(maxWPM, wpm + wpmStep);
                updateStats();
                ToolUtils.showNotification(`Speed: ${wpm} WPM`, 1000);
            }
        }
        
        function decreaseSpeed() {
            if (wpm > minWPM) {
                wpm = Math.max(minWPM, wpm - wpmStep);
                updateStats();
                ToolUtils.showNotification(`Speed: ${wpm} WPM`, 1000);
            }
        }
        
        function handleFileSelect(event) {
            const file = event.target.files[0];
            if (!file) return;
            
            const reader = new FileReader();
            reader.onload = function(e) {
                readerText.value = e.target.result;
                loadText();
            };
            reader.readAsText(file);
        }
        
        async function loadBook() {
            const select = document.getElementById('book-select');
            const bookFile = select.value;
            
            if (!bookFile) return;
            
            try {
                ToolUtils.showNotification('Loading book...', 1000);
                const response = await fetch(`/data/${bookFile}`);
                if (!response.ok) {
                    throw new Error('Failed to load book');
                }
                const text = await response.text();
                readerText.value = text;
                loadText();
                select.value = ''; // Reset dropdown
                ToolUtils.showNotification(`Loaded: ${bookFile.replace('.txt', '')}`, 2000);
            } catch (error) {
                console.error('Error loading book:', error);
                ToolUtils.showNotification('Error loading book', 2000);
                select.value = '';
            }
        }
        
        // Progress bar click to seek
        progressBar.parentElement.addEventListener('click', (e) => {
            if (words.length === 0) return;
            
            const rect = progressBar.parentElement.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const percentage = clickX / rect.width;
            const newIndex = Math.floor(percentage * words.length);
            
            currentIndex = Math.max(0, Math.min(newIndex, words.length - 1));
            
            if (currentIndex < words.length) {
                displayWord(words[currentIndex]);
            }
            updateStats();
            
            ToolUtils.showNotification(`Jumped to word ${currentIndex + 1}`, 1000);
        });
        
        // File upload area events
        fileUploadArea.addEventListener('click', () => {
            fileInput.click();
        });
        
        fileUploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            fileUploadArea.classList.add('dragover');
        });
        
        fileUploadArea.addEventListener('dragleave', () => {
            fileUploadArea.classList.remove('dragover');
        });
        
        fileUploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            fileUploadArea.classList.remove('dragover');
            
            const file = e.dataTransfer.files[0];
            if (file && file.type === 'text/plain') {
                const reader = new FileReader();
                reader.onload = function(e) {
                    readerText.value = e.target.result;
                    loadText();
                };
                reader.readAsText(file);
            } else {
                ToolUtils.showNotification('Please drop a text file', 2000);
            }
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Only handle shortcuts when not typing in textarea
            if (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT') {
                return;
            }
            
            // Space - Play/Pause
            if (e.code === 'Space') {
                e.preventDefault();
                togglePlayPause();
            }
            // Left Alt - Speed up
            else if (e.key === 'Alt' && e.location === 1) {
                e.preventDefault();
                increaseSpeed();
            }
            // Left Control - Slow down
            else if (e.key === 'Control' && e.location === 1) {
                e.preventDefault();
                decreaseSpeed();
            }
            // R - Reset
            else if (e.key === 'r' || e.key === 'R') {
                e.preventDefault();
                resetReader();
            }
        });
        
        // Fullscreen functionality
        window.enterSpeedReaderFullscreen = () => {
            const app = window.toolkitApp;
            if (!app) return;
            
            const displayContainer = document.getElementById('speed-reader-display');
            if (displayContainer) {
                app.enterFullscreen(displayContainer);
            }
        };
        
        // Global functions
        window.togglePlayPause = togglePlayPause;
        window.resetReader = resetReader;
        window.loadText = loadText;
        window.increaseSpeed = increaseSpeed;
        window.decreaseSpeed = decreaseSpeed;
        window.handleFileSelect = handleFileSelect;
        window.loadBook = loadBook;
        
        // Initialize display
        updateStats();
    }
};

