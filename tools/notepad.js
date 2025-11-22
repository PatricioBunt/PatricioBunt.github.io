
export default {
    title: 'Notepad',
    styles: `
        /* Notepad Styles */
        .notepad-container {
            background: var(--bg-secondary);
            border: 1px solid var(--border-color);
            border-radius: 4px;
            padding: 15px;
            min-height: 400px;
        }

        .notepad-textarea {
            width: 100%;
            min-height: 400px;
            background: var(--bg-primary);
            border: none;
            color: var(--text-primary);
            font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
            font-size: 14px;
            line-height: 1.6;
            resize: vertical;
            padding: 15px;
            border-radius: 4px;
        }

        .notepad-textarea:focus {
            outline: 2px solid var(--accent-color);
            outline-offset: -2px;
        }

        .notepad-stats {
            display: flex;
            gap: 20px;
            padding: 10px 15px;
            background: var(--bg-tertiary);
            border-radius: 4px;
            margin-bottom: 15px;
            font-size: 12px;
            color: var(--text-secondary);
        }

        .notepad-stat-item {
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .notepad-stat-value {
            color: var(--accent-color);
            font-weight: 600;
        }

        .notepad-save-indicator {
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 8px 16px;
            background: var(--bg-tertiary);
            border: 1px solid var(--border-color);
            border-radius: 4px;
            font-size: 12px;
            color: var(--text-secondary);
            opacity: 0;
            transition: opacity 0.3s;
            pointer-events: none;
            z-index: 1000;
        }

        .notepad-save-indicator.show {
            opacity: 1;
        }

        .notepad-save-indicator.saved {
            color: #4ec9b0;
            border-color: #4ec9b0;
        }
    `,
    html: `
        <div class="tool-info">
            <i class="fas fa-info-circle" style="margin-right: 8px;"></i>
            Personal notepad for quick notes. Your notes are automatically saved to your browser's local storage.
        </div>
        <div class="tool-section">
            <div class="notepad-stats">
                <div class="notepad-stat-item">
                    <i class="fas fa-font"></i>
                    <span>Characters: <span class="notepad-stat-value" id="notepad-chars">0</span></span>
                </div>
                <div class="notepad-stat-item">
                    <i class="fas fa-file-word"></i>
                    <span>Words: <span class="notepad-stat-value" id="notepad-words">0</span></span>
                </div>
                <div class="notepad-stat-item">
                    <i class="fas fa-align-left"></i>
                    <span>Lines: <span class="notepad-stat-value" id="notepad-lines">0</span></span>
                </div>
            </div>
            <div class="tool-input-group">
                <label style="display: flex; justify-content: space-between; align-items: center;">
                    <span>
                        <i class="fas fa-sticky-note" style="margin-right: 6px; color: var(--text-secondary);"></i>
                        Notes
                    </span>
                    <button class="fullscreen-btn" onclick="enterNotepadFullscreen()" title="Fullscreen">
                        <i class="fas fa-expand"></i>
                        <span>Fullscreen</span>
                    </button>
                </label>
                <div class="notepad-container">
                    <textarea id="notepad" class="notepad-textarea" placeholder="Write your notes here... They are automatically saved." data-fullscreen-target="true"></textarea>
                </div>
            </div>
            <div style="margin-top: 15px;">
                <button class="tool-button secondary" onclick="clearNotepad()">
                    <i class="fas fa-trash-alt" style="margin-right: 6px;"></i>
                    Clear Notepad
                </button>
                <button class="tool-button secondary" onclick="copyNotepad()">
                    <i class="fas fa-copy" style="margin-right: 6px;"></i>
                    Copy All
                </button>
            </div>
        </div>
        <div class="notepad-save-indicator" id="notepad-save-indicator">
            <i class="fas fa-save" style="margin-right: 6px;"></i>
            Auto-saved
        </div>
    `,
    init() {
        const STORAGE_KEY = 'toolkit_notepad';
        let saveTimeout;
        
        function loadNotepad() {
            const notepad = document.getElementById('notepad');
            notepad.value = localStorage.getItem(STORAGE_KEY) || '';
            updateStats();
        }
        
        function saveNotepad() {
            const notepad = document.getElementById('notepad');
            localStorage.setItem(STORAGE_KEY, notepad.value);
            showSaveIndicator();
        }
        
        function updateStats() {
            const notepad = document.getElementById('notepad');
            const text = notepad.value;
            const chars = text.length;
            const words = text.trim() ? text.trim().split(/\s+/).length : 0;
            const lines = text ? text.split('\n').length : 0;
            
            document.getElementById('notepad-chars').textContent = chars;
            document.getElementById('notepad-words').textContent = words;
            document.getElementById('notepad-lines').textContent = lines;
        }
        
        function showSaveIndicator() {
            const indicator = document.getElementById('notepad-save-indicator');
            indicator.classList.add('show', 'saved');
            setTimeout(() => {
                indicator.classList.remove('show', 'saved');
            }, 2000);
        }
        
        const notepad = document.getElementById('notepad');
        notepad.addEventListener('input', () => {
            updateStats();
            clearTimeout(saveTimeout);
            saveTimeout = setTimeout(saveNotepad, 500);
        });
        
        window.clearNotepad = () => {
            if (confirm('Are you sure you want to clear all notes?')) {
                const notepad = document.getElementById('notepad');
                notepad.value = '';
                saveNotepad();
                updateStats();
                ToolUtils.showNotification('Notepad cleared', 1500);
            }
        };
        
        window.copyNotepad = () => {
            const notepad = document.getElementById('notepad');
            if (notepad.value.trim()) {
                ToolUtils.copyToClipboard(notepad.value);
                ToolUtils.showNotification('Notes copied to clipboard', 1500);
            } else {
                ToolUtils.showNotification('Nothing to copy', 1000);
            }
        };
        
        window.enterNotepadFullscreen = () => {
            const app = window.toolkitApp;
            if (!app) return;
            
            const notepad = document.getElementById('notepad');
            if (notepad) {
                app.enterFullscreen(notepad);
            }
        };
        
        loadNotepad();
    }
};

