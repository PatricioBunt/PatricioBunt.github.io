// Pomodoro Timer Tool
export default {
    title: 'Pomodoro Timer',
    styles: `
        /* Pomodoro Timer Styles */
        .pomodoro-timer-container {
            text-align: center;
            margin: 30px 0;
        }

        .pomodoro-display {
            font-size: 72px;
            font-weight: bold;
            color: var(--accent-color);
            margin-bottom: 20px;
            font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
            letter-spacing: 2px;
        }

        .pomodoro-status {
            font-size: 18px;
            color: var(--text-secondary);
            margin-bottom: 30px;
            min-height: 24px;
        }

        .pomodoro-status.working {
            color: #4ec9b0;
        }

        .pomodoro-status.break {
            color: #dcdcaa;
        }

        .pomodoro-controls {
            display: flex;
            gap: 10px;
            justify-content: center;
            margin-bottom: 30px;
        }

        .pomodoro-stats {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 15px;
            margin-top: 30px;
            padding: 20px;
            background: var(--bg-secondary);
            border: 1px solid var(--border-color);
            border-radius: 4px;
        }

        .pomodoro-stat-item {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .pomodoro-stat-value {
            font-size: 24px;
            font-weight: bold;
            color: var(--accent-color);
            margin-bottom: 5px;
        }

        .pomodoro-stat-label {
            font-size: 12px;
            color: var(--text-secondary);
        }

        .pomodoro-input-disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }

        .notification-permission {
            padding: 12px;
            background: var(--bg-tertiary);
            border: 1px solid var(--border-color);
            border-radius: 4px;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .notification-permission.hidden {
            display: none;
        }
    `,
    html: `
        <div class="tool-info">
            <i class="fas fa-info-circle" style="margin-right: 8px;"></i>
            A Pomodoro timer to help you stay focused. Work for 25 minutes, then take a 5-minute break. Timer runs in the background and sends notifications.
        </div>
        <div class="tool-section">
            <div class="notification-permission" id="notification-permission" style="display: none;">
                <div>
                    <i class="fas fa-bell" style="margin-right: 8px; color: var(--accent-color);"></i>
                    <span>Enable notifications to receive alerts when your timer completes, even when the tab is in the background.</span>
                </div>
                <button class="tool-button" onclick="requestNotificationPermission()" style="padding: 6px 12px; font-size: 12px;">
                    Enable Notifications
                </button>
            </div>
            
            <div class="pomodoro-timer-container">
                <div class="pomodoro-display" id="timer-display">25:00</div>
                <div class="pomodoro-status" id="timer-status">Ready to start</div>
                <div class="pomodoro-controls">
                    <button class="tool-button" onclick="startTimer()" id="start-btn">
                        <i class="fas fa-play" style="margin-right: 6px;"></i>
                        Start
                    </button>
                    <button class="tool-button secondary" onclick="pauseTimer()" id="pause-btn" style="display: none;">
                        <i class="fas fa-pause" style="margin-right: 6px;"></i>
                        Pause
                    </button>
                    <button class="tool-button secondary" onclick="resetTimer()">
                        <i class="fas fa-redo" style="margin-right: 6px;"></i>
                        Reset
                    </button>
                </div>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                <div class="tool-input-group">
                    <label for="work-duration">
                        <i class="fas fa-briefcase" style="margin-right: 6px; color: var(--text-secondary);"></i>
                        Work Duration (minutes)
                    </label>
                    <input type="number" id="work-duration" value="25" min="1" max="60" onchange="updateTimerDuration()">
                </div>
                <div class="tool-input-group">
                    <label for="break-duration">
                        <i class="fas fa-coffee" style="margin-right: 6px; color: var(--text-secondary);"></i>
                        Break Duration (minutes)
                    </label>
                    <input type="number" id="break-duration" value="5" min="1" max="30" onchange="updateTimerDuration()">
                </div>
            </div>
            
            <div class="pomodoro-stats">
                <div class="pomodoro-stat-item">
                    <div class="pomodoro-stat-value" id="sessions-completed">0</div>
                    <div class="pomodoro-stat-label">Sessions Completed</div>
                </div>
                <div class="pomodoro-stat-item">
                    <div class="pomodoro-stat-value" id="total-work-time">0h</div>
                    <div class="pomodoro-stat-label">Total Work Time</div>
                </div>
                <div class="pomodoro-stat-item">
                    <div class="pomodoro-stat-value" id="total-break-time">0h</div>
                    <div class="pomodoro-stat-label">Total Break Time</div>
                </div>
            </div>
        </div>
    `,
    init() {
        const STORAGE_KEY = 'pomodoro_timer_state';
        const STATS_KEY = 'pomodoro_stats';
        
        let timerInterval = null;
        let timeLeft = 25 * 60; // 25 minutes in seconds
        let isRunning = false;
        let isWorkTime = true;
        let startTime = null;
        let pausedTime = null;
        let notificationPermission = 'default';
        
        // Load saved state
        function loadState() {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                try {
                    const state = JSON.parse(saved);
                    timeLeft = state.timeLeft || 25 * 60;
                    isWorkTime = state.isWorkTime !== false;
                    isRunning = false; // Don't auto-resume
                    updateDisplay();
                } catch (e) {
                    console.error('Failed to load timer state:', e);
                }
            }
            
            const workDuration = parseInt(document.getElementById('work-duration').value) || 25;
            const breakDuration = parseInt(document.getElementById('break-duration').value) || 5;
            
            if (!saved) {
                timeLeft = workDuration * 60;
            }
        }
        
        // Save state
        function saveState() {
            const state = {
                timeLeft,
                isWorkTime,
                timestamp: Date.now()
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        }
        
        // Load stats
        function loadStats() {
            const stats = JSON.parse(localStorage.getItem(STATS_KEY) || '{"sessions": 0, "workTime": 0, "breakTime": 0}');
            document.getElementById('sessions-completed').textContent = stats.sessions || 0;
            document.getElementById('total-work-time').textContent = formatTime(stats.workTime || 0);
            document.getElementById('total-break-time').textContent = formatTime(stats.breakTime || 0);
            return stats;
        }
        
        // Save stats
        function saveStats(stats) {
            localStorage.setItem(STATS_KEY, JSON.stringify(stats));
        }
        
        // Format time for stats
        function formatTime(minutes) {
            if (minutes < 60) return `${minutes}m`;
            const hours = Math.floor(minutes / 60);
            const mins = minutes % 60;
            return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
        }
        
        // Update display
        function updateDisplay() {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            document.getElementById('timer-display').textContent = 
                `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            // Update page title
            if (isRunning) {
                document.title = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} - ${isWorkTime ? 'Work' : 'Break'} | Pomodoro Timer`;
            } else {
                document.title = 'Pomodoro Timer - Developer Toolkit';
            }
        }
        
        // Update input states
        function updateInputStates() {
            const workInput = document.getElementById('work-duration');
            const breakInput = document.getElementById('break-duration');
            
            if (isRunning) {
                workInput.disabled = true;
                breakInput.disabled = true;
                workInput.classList.add('pomodoro-input-disabled');
                breakInput.classList.add('pomodoro-input-disabled');
            } else {
                workInput.disabled = false;
                breakInput.disabled = false;
                workInput.classList.remove('pomodoro-input-disabled');
                breakInput.classList.remove('pomodoro-input-disabled');
            }
        }
        
        // Update status display
        function updateStatus() {
            const statusEl = document.getElementById('timer-status');
            statusEl.className = 'pomodoro-status';
            
            if (isRunning) {
                statusEl.textContent = isWorkTime ? 'Working... Stay focused!' : 'Break time! Take a rest.';
                statusEl.classList.add(isWorkTime ? 'working' : 'break');
            } else if (pausedTime !== null) {
                statusEl.textContent = 'Paused';
            } else {
                statusEl.textContent = isWorkTime ? 'Ready to start work session' : 'Ready to start break';
            }
        }
        
        // Send notification via service worker
        function sendNotification(title, body, isWorkTime) {
            if ('serviceWorker' in navigator && 'Notification' in window) {
                if (notificationPermission === 'granted') {
                    navigator.serviceWorker.ready.then(registration => {
                        registration.active.postMessage({
                            type: 'TIMER_COMPLETE',
                            title: title,
                            body: body,
                            isWorkTime: isWorkTime
                        });
                    }).catch(() => {
                        // Fallback to Web Notification API
                        new Notification(title, {
                            body: body,
                            icon: '/web-app-manifest-192x192.png',
                            badge: '/favicon-96x96.png',
                            tag: 'pomodoro-timer'
                        });
                    });
                }
            }
        }
        
        // Start timer
        function startTimer() {
            if (isRunning) return;
            
            isRunning = true;
            startTime = Date.now();
            pausedTime = null;
            
            document.getElementById('start-btn').style.display = 'none';
            document.getElementById('pause-btn').style.display = 'inline-block';
            updateStatus();
            updateInputStates();
            saveState();
            
            // Use requestAnimationFrame for more accurate timing
            let lastUpdate = Date.now();
            
            function tick() {
                if (!isRunning) return;
                
                const now = Date.now();
                const elapsed = Math.floor((now - lastUpdate) / 1000);
                
                if (elapsed >= 1) {
                    timeLeft -= elapsed;
                    lastUpdate = now;
                    
                    if (timeLeft < 0) timeLeft = 0;
                    
                    updateDisplay();
                    saveState();
                    
                    if (timeLeft <= 0) {
                        clearInterval(timerInterval);
                        isRunning = false;
                        
                        // Update stats
                        const stats = loadStats();
                        if (isWorkTime) {
                            const workDuration = parseInt(document.getElementById('work-duration').value) || 25;
                            stats.sessions = (stats.sessions || 0) + 1;
                            stats.workTime = (stats.workTime || 0) + workDuration;
                        } else {
                            const breakDuration = parseInt(document.getElementById('break-duration').value) || 5;
                            stats.breakTime = (stats.breakTime || 0) + breakDuration;
                        }
                        saveStats(stats);
                        loadStats();
                        
                        // Switch mode
                        if (isWorkTime) {
                            isWorkTime = false;
                            timeLeft = parseInt(document.getElementById('break-duration').value) * 60;
                            sendNotification(
                                'Break Time! 🎉',
                                'Great work! Time for a 5-minute break.',
                                false
                            );
                        } else {
                            isWorkTime = true;
                            timeLeft = parseInt(document.getElementById('work-duration').value) * 60;
                            sendNotification(
                                'Break Complete! 💪',
                                'Ready for your next work session?',
                                true
                            );
                        }
                        
                        updateDisplay();
                        updateStatus();
                        updateInputStates();
                        document.getElementById('start-btn').style.display = 'inline-block';
                        document.getElementById('pause-btn').style.display = 'none';
                        
                        // Play notification sound
                        try {
                            const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUKzn8LZjGwU7k9jzzHksBSV3yPDdkEAKFF606OuoVRQKRp/g8r5sIQUrgc7y2Yk2CBtpvfDknE4MDlCs5/C2YxsFO5PY88x5LAUld8jw3ZBAC');
                            audio.play().catch(() => {});
                        } catch (e) {}
                        
                        saveState();
                        return;
                    }
                }
                
                timerInterval = setTimeout(tick, 100);
            }
            
            tick();
        }
        
        // Pause timer
        function pauseTimer() {
            if (!isRunning) return;
            
            clearTimeout(timerInterval);
            isRunning = false;
            pausedTime = Date.now();
            
            document.getElementById('start-btn').style.display = 'inline-block';
            document.getElementById('pause-btn').style.display = 'none';
            updateStatus();
            updateInputStates();
            saveState();
        }
        
        // Reset timer
        function resetTimer() {
            clearTimeout(timerInterval);
            isRunning = false;
            isWorkTime = true;
            pausedTime = null;
            timeLeft = parseInt(document.getElementById('work-duration').value) * 60;
            
            updateDisplay();
            updateStatus();
            updateInputStates();
            document.getElementById('start-btn').style.display = 'inline-block';
            document.getElementById('pause-btn').style.display = 'none';
            saveState();
        }
        
        // Update timer duration
        function updateTimerDuration() {
            if (isRunning) return;
            
            const workDuration = parseInt(document.getElementById('work-duration').value) || 25;
            const breakDuration = parseInt(document.getElementById('break-duration').value) || 5;
            
            if (isWorkTime) {
                timeLeft = workDuration * 60;
            } else {
                // Only update if we're in break mode and not running
                timeLeft = breakDuration * 60;
            }
            
            updateDisplay();
            saveState();
        }
        
        // Request notification permission
        window.requestNotificationPermission = async () => {
            if ('Notification' in window) {
                const permission = await Notification.requestPermission();
                notificationPermission = permission;
                
                if (permission === 'granted') {
                    // Register service worker
                    if ('serviceWorker' in navigator) {
                        try {
                            const registration = await navigator.serviceWorker.register('/sw.js');
                            console.log('Service Worker registered:', registration);
                        } catch (error) {
                            console.error('Service Worker registration failed:', error);
                        }
                    }
                    
                    document.getElementById('notification-permission').classList.add('hidden');
                    ToolUtils.showNotification('Notifications enabled!', 2000);
                } else {
                    ToolUtils.showNotification('Notification permission denied', 2000);
                }
            }
        };
        
        // Check notification permission
        if ('Notification' in window) {
            notificationPermission = Notification.permission;
            if (notificationPermission === 'default') {
                document.getElementById('notification-permission').style.display = 'flex';
            } else if (notificationPermission === 'granted' && 'serviceWorker' in navigator) {
                // Register service worker if permission already granted
                navigator.serviceWorker.register('/sw.js').catch(console.error);
            }
        }
        
        // Register service worker on load
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js').catch(console.error);
        }
        
        // Restore page title on visibility change
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden && !isRunning) {
                document.title = 'Pomodoro Timer - Developer Toolkit';
            }
        });
        
        window.startTimer = startTimer;
        window.pauseTimer = pauseTimer;
        window.resetTimer = resetTimer;
        window.updateTimerDuration = updateTimerDuration;
        
        loadState();
        loadStats();
        updateDisplay();
        updateStatus();
        updateInputStates();
    }
};
