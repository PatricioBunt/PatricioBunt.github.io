export default {
    title: 'Habit Tracker',
    styles: `
        /* Habit Tracker Styles */
        .habit-tracker-container {
            background: var(--bg-secondary);
            border: 1px solid var(--border-color);
            border-radius: 4px;
            overflow: hidden;
        }

        .habit-tracker-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 15px;
            background: var(--bg-tertiary);
            border-bottom: 1px solid var(--border-color);
            flex-wrap: wrap;
            gap: 10px;
        }

        .habit-tracker-nav {
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .habit-tracker-nav-btn {
            background: var(--bg-secondary);
            border: 1px solid var(--border-color);
            color: var(--text-primary);
            padding: 6px 12px;
            border-radius: 4px;
            cursor: pointer;
            transition: all var(--transition-speed);
            font-size: 13px;
        }

        .habit-tracker-nav-btn:hover {
            background: var(--bg-hover);
            border-color: var(--accent-color);
        }

        .habit-tracker-nav-btn.today-btn {
            background: var(--accent-color);
            border-color: var(--accent-color);
            color: white;
        }

        .habit-tracker-nav-btn.today-btn:hover { opacity: 0.9; }

        .habit-tracker-date-range {
            font-size: 14px;
            color: var(--text-primary);
            font-weight: 500;
        }

        .habit-view-switcher {
            display: flex;
            gap: 4px;
            background: var(--bg-secondary);
            padding: 4px;
            border-radius: 6px;
            border: 1px solid var(--border-color);
        }

        .habit-view-btn {
            background: transparent;
            border: none;
            color: var(--text-secondary);
            padding: 6px 14px;
            border-radius: 4px;
            cursor: pointer;
            transition: all var(--transition-speed);
            font-size: 12px;
            font-weight: 500;
        }

        .habit-view-btn:hover {
            color: var(--text-primary);
            background: var(--bg-hover);
        }

        .habit-view-btn.active {
            background: var(--accent-color);
            color: white;
        }

        .habit-unlock-btn {
            background: var(--bg-secondary);
            border: 1px solid var(--border-color);
            color: var(--text-secondary);
            padding: 6px 12px;
            border-radius: 4px;
            cursor: pointer;
            transition: all var(--transition-speed);
            font-size: 12px;
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .habit-unlock-btn:hover {
            background: var(--bg-hover);
            border-color: var(--accent-color);
            color: var(--text-primary);
        }

        .habit-unlock-btn.unlocked {
            background: #ff9500;
            border-color: #ff9500;
            color: white;
        }

        .habit-unlock-btn.unlocked:hover { opacity: 0.9; }

        .habit-grid {
            display: grid;
            grid-template-columns: minmax(150px, 200px) repeat(14, 1fr);
            overflow-x: auto;
        }

        .habit-grid.month-view {
            grid-template-columns: minmax(150px, 200px) repeat(14, 1fr);
        }

        .habit-grid.month-view.mobile {
            grid-template-columns: minmax(120px, 150px) repeat(7, 1fr);
        }

        .habit-grid.year-view {
            grid-template-columns: minmax(150px, 200px) repeat(14, 1fr);
        }

        .habit-grid.year-view.mobile {
            grid-template-columns: minmax(120px, 150px) repeat(7, 1fr);
        }

        .habit-week-row {
            display: contents;
        }

        .habit-month-week-separator {
            border-left: 2px solid var(--border-color);
        }

        .habit-grid-header { display: contents; }

        .habit-month-week-row {
            display: contents;
        }

        .habit-year-quarter-row {
            display: contents;
        }

        .habit-grid-header-cell {
            padding: 10px 5px;
            text-align: center;
            font-size: 11px;
            color: var(--text-secondary);
            background: var(--bg-tertiary);
            border-bottom: 1px solid var(--border-color);
            border-right: 1px solid var(--border-color);
        }

        .habit-grid-header-cell:first-child {
            text-align: left;
            padding-left: 15px;
            font-weight: 600;
            color: var(--text-primary);
        }

        .habit-grid-header-cell.today {
            background: var(--accent-color);
            color: white;
        }

        .habit-grid-header-cell .day-name {
            display: block;
            font-weight: 600;
            margin-bottom: 2px;
        }

        .habit-grid-header-cell .day-date {
            display: block;
            font-size: 10px;
            opacity: 0.8;
        }

        .habit-grid-header-cell.month-header,
        .habit-grid-header-cell.year-header {
            font-weight: 600;
            font-size: 10px;
        }

        .habit-grid-header-cell.year-header { padding: 8px 3px; }

        .habit-row { display: contents; }

        .habit-row:hover .habit-name-cell,
        .habit-row:hover .habit-cell { background: var(--bg-hover); }

        .habit-name-cell {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 12px 15px;
            background: var(--bg-secondary);
            border-bottom: 1px solid var(--border-color);
            border-right: 1px solid var(--border-color);
            transition: background var(--transition-speed);
        }

        .habit-color-dot {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            flex-shrink: 0;
        }

        .habit-name {
            flex: 1;
            font-size: 13px;
            color: var(--text-primary);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .habit-streak {
            font-size: 11px;
            color: var(--text-secondary);
            display: flex;
            align-items: center;
            gap: 4px;
        }

        .habit-streak i {
            color: #ff9500;
            font-size: 10px;
        }

        .habit-actions {
            display: flex;
            gap: 4px;
            opacity: 0;
            transition: opacity var(--transition-speed);
        }

        .habit-row:hover .habit-actions { opacity: 1; }

        .habit-action-btn {
            background: transparent;
            border: none;
            color: var(--text-secondary);
            cursor: pointer;
            padding: 4px;
            border-radius: 3px;
            font-size: 11px;
            transition: all var(--transition-speed);
        }

        .habit-action-btn:hover {
            background: var(--bg-tertiary);
            color: var(--text-primary);
        }

        .habit-action-btn.delete:hover { color: #f48771; }

        .habit-cell {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 12px 5px;
            background: var(--bg-secondary);
            border-bottom: 1px solid var(--border-color);
            border-right: 1px solid var(--border-color);
            cursor: pointer;
            transition: all var(--transition-speed);
        }

        .habit-cell:hover { background: var(--bg-hover); }
        .habit-cell.today { background: rgba(0, 122, 204, 0.1); }
        .habit-cell.disabled { background: var(--bg-tertiary); cursor: not-allowed; opacity: 0.5; }
        .habit-cell.locked { cursor: not-allowed; }
        .habit-cell.locked:not(.completed):hover { background: var(--bg-secondary); }
        .habit-cell.locked .check-circle { opacity: 0.6; }

        .habit-cell .check-circle {
            width: 22px;
            height: 22px;
            border-radius: 50%;
            border: 2px solid var(--border-color);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all var(--transition-speed);
            font-size: 12px;
            color: transparent;
        }

        .habit-cell:not(.disabled):not(.locked):hover .check-circle { border-color: var(--accent-color); }

        .habit-cell.completed .check-circle {
            background: var(--accent-color);
            border-color: var(--accent-color);
            color: white;
        }

        .habit-cell.compact { padding: 8px 2px; }
        .habit-cell.compact .check-circle { width: 16px; height: 16px; font-size: 9px; }
        .habit-cell.year-cell { padding: 6px 1px; }
        .habit-cell.year-cell .check-circle { width: 12px; height: 12px; font-size: 7px; border-width: 1px; }

        .habit-cell.month-summary { flex-direction: column; gap: 2px; }
        .habit-cell.month-summary .month-percent { font-size: 10px; color: var(--text-secondary); }

        .habit-empty {
            grid-column: 1 / -1;
            text-align: center;
            padding: 60px 20px;
            color: var(--text-disabled);
            font-style: italic;
        }

        .habit-empty i { font-size: 48px; margin-bottom: 15px; opacity: 0.5; }

        .habit-stats {
            display: flex;
            gap: 20px;
            padding: 15px;
            background: var(--bg-tertiary);
            border-radius: 4px;
            margin-bottom: 15px;
        }

        .habit-stat-item { display: flex; flex-direction: column; align-items: center; }
        .habit-stat-value { font-size: 24px; font-weight: bold; color: var(--accent-color); }
        .habit-stat-label { font-size: 11px; color: var(--text-secondary); margin-top: 4px; }

        .habit-modal-overlay {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0, 0, 0, 0.6);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            opacity: 0;
            visibility: hidden;
            transition: all 0.2s ease;
        }

        .habit-modal-overlay.active { opacity: 1; visibility: visible; }

        .habit-modal {
            background: var(--bg-secondary);
            border: 1px solid var(--border-color);
            border-radius: 8px;
            padding: 25px;
            width: 100%;
            max-width: 400px;
            transform: scale(0.9);
            transition: transform 0.2s ease;
        }

        .habit-modal-overlay.active .habit-modal { transform: scale(1); }
        .habit-modal h3 { margin: 0 0 20px 0; color: var(--text-primary); font-size: 18px; }
        .habit-modal-field { margin-bottom: 15px; }
        .habit-modal-field label { display: block; font-size: 13px; color: var(--text-secondary); margin-bottom: 6px; }

        .habit-modal-field input[type="text"] {
            width: 100%;
            padding: 10px 12px;
            background: var(--bg-primary);
            border: 1px solid var(--border-color);
            border-radius: 4px;
            color: var(--text-primary);
            font-size: 14px;
        }

        .habit-modal-field input[type="text"]:focus { outline: none; border-color: var(--accent-color); }
        .habit-color-options { display: flex; gap: 8px; flex-wrap: wrap; }

        .habit-color-option {
            width: 28px;
            height: 28px;
            border-radius: 50%;
            cursor: pointer;
            border: 2px solid transparent;
            transition: all var(--transition-speed);
        }

        .habit-color-option:hover { transform: scale(1.1); }
        .habit-color-option.selected { border-color: var(--text-primary); box-shadow: 0 0 0 2px var(--bg-secondary); }

        .habit-modal-actions { display: flex; gap: 10px; justify-content: flex-end; margin-top: 20px; }

        .habit-modal-btn {
            padding: 10px 20px;
            border-radius: 4px;
            font-size: 14px;
            cursor: pointer;
            transition: all var(--transition-speed);
        }

        .habit-modal-btn.primary { background: var(--accent-color); border: none; color: white; }
        .habit-modal-btn.primary:hover { opacity: 0.9; }
        .habit-modal-btn.secondary { background: transparent; border: 1px solid var(--border-color); color: var(--text-primary); }
        .habit-modal-btn.secondary:hover { background: var(--bg-hover); }

        @media (max-width: 900px) {
            .habit-grid { grid-template-columns: minmax(120px, 150px) repeat(7, 1fr); }
            .habit-tracker-header { flex-direction: column; align-items: stretch; }
            .habit-tracker-nav { justify-content: center; }
            .habit-view-switcher { justify-content: center; }
            .habit-header-right { justify-content: center; }
        }

        @media (max-width: 600px) {
            .habit-stats { flex-wrap: wrap; justify-content: center; }
        }
    `,
    html: `
        <div class="tool-info">
            <i class="fas fa-info-circle" style="margin-right: 8px;"></i>
            Track your daily habits. Click on a cell to mark complete. Use the unlock button to edit past entries.
        </div>
        <div class="tool-section">
            <div class="habit-stats">
                <div class="habit-stat-item">
                    <div class="habit-stat-value" id="habit-total-count">0</div>
                    <div class="habit-stat-label">Habits</div>
                </div>
                <div class="habit-stat-item">
                    <div class="habit-stat-value" id="habit-today-count">0</div>
                    <div class="habit-stat-label">Done Today</div>
                </div>
                <div class="habit-stat-item">
                    <div class="habit-stat-value" id="habit-completion-rate">0%</div>
                    <div class="habit-stat-label">This Week</div>
                </div>
                <div class="habit-stat-item">
                    <div class="habit-stat-value" id="habit-best-streak">0</div>
                    <div class="habit-stat-label">Best Streak</div>
                </div>
            </div>
            <div style="margin-bottom: 15px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                <button class="tool-button" onclick="showAddHabitModal()">
                    <i class="fas fa-plus" style="margin-right: 6px;"></i>Add Habit
                </button>
                <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                    <button class="tool-button secondary" onclick="exportHabitData()">
                        <i class="fas fa-download" style="margin-right: 6px;"></i>Export
                    </button>
                    <button class="fullscreen-btn" onclick="enterHabitTrackerFullscreen()" title="Fullscreen">
                        <i class="fas fa-expand"></i><span>Fullscreen</span>
                    </button>
                </div>
            </div>
            <div class="habit-tracker-container" id="habit-tracker-container" data-fullscreen-target="true">
                <div class="habit-tracker-header">
                    <div class="habit-tracker-nav">
                        <button class="habit-tracker-nav-btn" onclick="navigateHabits('prev-big')" title="Previous period">
                            <i class="fas fa-angle-double-left"></i>
                        </button>
                        <button class="habit-tracker-nav-btn" onclick="navigateHabits('prev')" title="Previous">
                            <i class="fas fa-angle-left"></i>
                        </button>
                        <button class="habit-tracker-nav-btn today-btn" onclick="navigateHabitsToday()">Today</button>
                        <button class="habit-tracker-nav-btn" onclick="navigateHabits('next')" title="Next">
                            <i class="fas fa-angle-right"></i>
                        </button>
                        <button class="habit-tracker-nav-btn" onclick="navigateHabits('next-big')" title="Next period">
                            <i class="fas fa-angle-double-right"></i>
                        </button>
                    </div>
                    <div class="habit-view-switcher">
                        <button class="habit-view-btn active" data-view="week" onclick="setHabitView('week')">Week</button>
                        <button class="habit-view-btn" data-view="month" onclick="setHabitView('month')">Month</button>
                        <button class="habit-view-btn" data-view="year" onclick="setHabitView('year')">Year</button>
                    </div>
                    <div class="habit-header-right" style="display: flex; align-items: center; gap: 12px;">
                        <button class="habit-unlock-btn" id="habit-unlock-btn" onclick="toggleHabitUnlock()" title="Unlock to edit past and future entries">
                            <i class="fas fa-lock"></i><span>Locked</span>
                        </button>
                        <div class="habit-tracker-date-range" id="habit-date-range"></div>
                    </div>
                </div>
                <div class="habit-grid" id="habit-grid"></div>
            </div>
        </div>
        <div class="habit-modal-overlay" id="habit-modal-overlay">
            <div class="habit-modal">
                <h3 id="habit-modal-title">Add New Habit</h3>
                <div class="habit-modal-field">
                    <label for="habit-name-input">Habit Name</label>
                    <input type="text" id="habit-name-input" placeholder="e.g., Exercise, Read, Meditate..." maxlength="50">
                </div>
                <div class="habit-modal-field">
                    <label>Color</label>
                    <div class="habit-color-options" id="habit-color-options"></div>
                </div>
                <div class="habit-modal-actions">
                    <button class="habit-modal-btn secondary" onclick="closeHabitModal()">Cancel</button>
                    <button class="habit-modal-btn primary" onclick="saveHabit()">Save</button>
                </div>
            </div>
        </div>
    `,
    init() {
        const HABITS_KEY = 'habitTracker_habits';
        const COMPLETIONS_KEY = 'habitTracker_completions';
        const COLORS = ['#007acc', '#4ec9b0', '#569cd6', '#dcdcaa', '#ce9178', '#c586c0', '#6a9955', '#d16969', '#ff9500', '#4fc3f7'];

        let habits = [];
        let completions = {};
        let currentStartDate = getStartOfWeek(new Date());
        let editingHabitId = null;
        let selectedColor = COLORS[0];
        let currentView = 'week';
        let isUnlocked = false;

        function getStartOfWeek(date) {
            const d = new Date(date);
            const day = d.getDay();
            const diff = d.getDate() - day + (day === 0 ? -6 : 1);
            d.setDate(diff);
            d.setHours(0, 0, 0, 0);
            return d;
        }

        function getStartOfMonth(date) {
            const d = new Date(date);
            d.setDate(1);
            d.setHours(0, 0, 0, 0);
            return d;
        }

        function getStartOfYear(date) {
            const d = new Date(date);
            d.setMonth(0, 1);
            d.setHours(0, 0, 0, 0);
            return d;
        }

        function formatDate(date) { return date.toISOString().split('T')[0]; }
        function formatDisplayDate(date) { return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }); }
        function formatMonthYear(date) { return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }); }
        function formatYear(date) { return date.getFullYear().toString(); }
        function getDayName(date) { return date.toLocaleDateString('en-US', { weekday: 'short' }); }
        function getMonthName(date) { return date.toLocaleDateString('en-US', { month: 'short' }); }
        function isToday(date) { return formatDate(date) === formatDate(new Date()); }
        function isCurrentMonth(date) { const t = new Date(); return date.getMonth() === t.getMonth() && date.getFullYear() === t.getFullYear(); }
        function isPastDate(date) { const t = new Date(); t.setHours(0,0,0,0); const c = new Date(date); c.setHours(0,0,0,0); return c < t; }
        function isFutureDate(date) { const t = new Date(); t.setHours(0,0,0,0); const c = new Date(date); c.setHours(0,0,0,0); return c > t; }
        function getDaysInMonth(date) { return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(); }

        function loadData() {
            habits = JSON.parse(localStorage.getItem(HABITS_KEY) || '[]');
            completions = JSON.parse(localStorage.getItem(COMPLETIONS_KEY) || '{}');
        }

        function saveHabits() { localStorage.setItem(HABITS_KEY, JSON.stringify(habits)); }
        function saveCompletions() { localStorage.setItem(COMPLETIONS_KEY, JSON.stringify(completions)); }

        function calculateStreak(habitId) {
            let streak = 0;
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            let checkDate = new Date(today);
            const todayStr = formatDate(checkDate);
            if (!completions[todayStr] || !completions[todayStr].includes(habitId)) {
                checkDate.setDate(checkDate.getDate() - 1);
            }
            while (true) {
                const dateStr = formatDate(checkDate);
                if (completions[dateStr] && completions[dateStr].includes(habitId)) {
                    streak++;
                    checkDate.setDate(checkDate.getDate() - 1);
                } else break;
            }
            return streak;
        }

        function calculateLongestStreak(habitId) {
            const habit = habits.find(h => h.id === habitId);
            if (!habit) return 0;
            let longestStreak = 0, currentStreak = 0;
            const startDate = new Date(habit.createdAt);
            const endDate = new Date();
            let checkDate = new Date(startDate);
            while (checkDate <= endDate) {
                const dateStr = formatDate(checkDate);
                if (completions[dateStr] && completions[dateStr].includes(habitId)) {
                    currentStreak++;
                    longestStreak = Math.max(longestStreak, currentStreak);
                } else currentStreak = 0;
                checkDate.setDate(checkDate.getDate() + 1);
            }
            return longestStreak;
        }

        function getBestOverallStreak() {
            let best = 0;
            habits.forEach(habit => { best = Math.max(best, calculateLongestStreak(habit.id)); });
            return best;
        }

        function getWeeklyCompletionRate() {
            if (habits.length === 0) return 0;
            const today = new Date();
            const weekStart = getStartOfWeek(today);
            let totalPossible = 0, totalCompleted = 0;
            for (let i = 0; i < 7; i++) {
                const checkDate = new Date(weekStart);
                checkDate.setDate(weekStart.getDate() + i);
                if (checkDate > today) break;
                const dateStr = formatDate(checkDate);
                habits.forEach(habit => {
                    const habitCreated = new Date(habit.createdAt);
                    if (checkDate >= habitCreated) {
                        totalPossible++;
                        if (completions[dateStr] && completions[dateStr].includes(habit.id)) totalCompleted++;
                    }
                });
            }
            return totalPossible > 0 ? Math.round((totalCompleted / totalPossible) * 100) : 0;
        }

        function getMonthCompletionRate(habitId, year, month) {
            const habit = habits.find(h => h.id === habitId);
            if (!habit) return 0;
            const startOfMonth = new Date(year, month, 1);
            const endOfMonth = new Date(year, month + 1, 0);
            const today = new Date();
            let totalPossible = 0, totalCompleted = 0;
            let checkDate = new Date(startOfMonth);
            while (checkDate <= endOfMonth && checkDate <= today) {
                const habitCreated = new Date(habit.createdAt);
                habitCreated.setHours(0, 0, 0, 0);
                if (checkDate >= habitCreated) {
                    totalPossible++;
                    const dateStr = formatDate(checkDate);
                    if (completions[dateStr] && completions[dateStr].includes(habitId)) totalCompleted++;
                }
                checkDate.setDate(checkDate.getDate() + 1);
            }
            return totalPossible > 0 ? Math.round((totalCompleted / totalPossible) * 100) : 0;
        }

        function getTodayCompletedCount() {
            const todayStr = formatDate(new Date());
            return completions[todayStr] ? completions[todayStr].length : 0;
        }

        function updateStats() {
            document.getElementById('habit-total-count').textContent = habits.length;
            document.getElementById('habit-today-count').textContent = getTodayCompletedCount();
            document.getElementById('habit-completion-rate').textContent = getWeeklyCompletionRate() + '%';
            document.getElementById('habit-best-streak').textContent = getBestOverallStreak();
        }

        function updateUnlockButton() {
            const btn = document.getElementById('habit-unlock-btn');
            if (isUnlocked) {
                btn.classList.add('unlocked');
                btn.innerHTML = '<i class="fas fa-unlock"></i><span>Unlocked</span>';
            } else {
                btn.classList.remove('unlocked');
                btn.innerHTML = '<i class="fas fa-lock"></i><span>Locked</span>';
            }
        }

        function escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }

        function renderGrid() {
            switch (currentView) {
                case 'week': renderWeekView(); break;
                case 'month': renderMonthView(); break;
                case 'year': renderYearView(); break;
            }
            updateStats();
        }

        function renderWeekView() {
            const grid = document.getElementById('habit-grid');
            const dateRange = document.getElementById('habit-date-range');
            const daysToShow = window.innerWidth <= 900 ? 7 : 14;
            const endDate = new Date(currentStartDate);
            endDate.setDate(endDate.getDate() + daysToShow - 1);
            dateRange.textContent = `${formatDisplayDate(currentStartDate)} - ${formatDisplayDate(endDate)}`;
            grid.className = 'habit-grid';
            grid.style.gridTemplateColumns = `minmax(150px, 200px) repeat(${daysToShow}, 1fr)`;

            if (habits.length === 0) {
                grid.innerHTML = '<div class="habit-empty"><i class="fas fa-calendar-check"></i><div>No habits yet</div><div style="font-size: 13px; margin-top: 5px;">Click "Add Habit" to start tracking</div></div>';
                return;
            }

            let html = '<div class="habit-grid-header"><div class="habit-grid-header-cell">Habit</div>';
            for (let i = 0; i < daysToShow; i++) {
                const date = new Date(currentStartDate);
                date.setDate(date.getDate() + i);
                const todayClass = isToday(date) ? 'today' : '';
                html += `<div class="habit-grid-header-cell ${todayClass}"><span class="day-name">${getDayName(date)}</span><span class="day-date">${date.getDate()}</span></div>`;
            }
            html += '</div>';

            habits.forEach(habit => {
                const streak = calculateStreak(habit.id);
                html += '<div class="habit-row">';
                html += `<div class="habit-name-cell"><div class="habit-color-dot" style="background: ${habit.color}"></div><span class="habit-name" title="${escapeHtml(habit.name)}">${escapeHtml(habit.name)}</span>${streak > 0 ? `<span class="habit-streak"><i class="fas fa-fire"></i>${streak}</span>` : ''}<div class="habit-actions"><button class="habit-action-btn" onclick="editHabit('${habit.id}')" title="Edit"><i class="fas fa-pen"></i></button><button class="habit-action-btn delete" onclick="deleteHabit('${habit.id}')" title="Delete"><i class="fas fa-trash"></i></button></div></div>`;

                for (let i = 0; i < daysToShow; i++) {
                    const date = new Date(currentStartDate);
                    date.setDate(date.getDate() + i);
                    const dateStr = formatDate(date);
                    const habitCreated = new Date(habit.createdAt);
                    habitCreated.setHours(0, 0, 0, 0);
                    const isCompleted = completions[dateStr] && completions[dateStr].includes(habit.id);
                    const isDisabled = date < habitCreated;
                    const isTodayCell = isToday(date);
                    const isPast = isPastDate(date);
                    const isFuture = isFutureDate(date);
                    const isLocked = !isUnlocked && !isTodayCell && (isPast || isFuture);
                    let cellClass = 'habit-cell';
                    if (isCompleted) cellClass += ' completed';
                    if (isDisabled) cellClass += ' disabled';
                    if (isTodayCell) cellClass += ' today';
                    if (isLocked) cellClass += ' locked';
                    const canClick = !isDisabled && (!isLocked || isUnlocked);
                    html += `<div class="${cellClass}" onclick="${canClick ? `toggleHabitCompletion('${habit.id}', '${dateStr}')` : ''}"><div class="check-circle">${isCompleted ? '<i class="fas fa-check"></i>' : ''}</div></div>`;
                }
                html += '</div>';
            });
            grid.innerHTML = html;
        }

        function renderMonthView() {
            const grid = document.getElementById('habit-grid');
            const dateRange = document.getElementById('habit-date-range');
            const daysInMonth = getDaysInMonth(currentStartDate);
            dateRange.textContent = formatMonthYear(currentStartDate);
            
            const isMobile = window.innerWidth <= 900;
            const daysPerRow = isMobile ? 7 : 14;
            grid.className = isMobile ? 'habit-grid month-view mobile' : 'habit-grid month-view';

            if (habits.length === 0) {
                grid.innerHTML = '<div class="habit-empty"><i class="fas fa-calendar-check"></i><div>No habits yet</div><div style="font-size: 13px; margin-top: 5px;">Click "Add Habit" to start tracking</div></div>';
                return;
            }

            const firstDay = new Date(currentStartDate.getFullYear(), currentStartDate.getMonth(), 1);
            const firstDayOfWeek = firstDay.getDay();
            const adjustedFirstDay = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
            const totalDays = adjustedFirstDay + daysInMonth;
            const weeksNeeded = Math.ceil(totalDays / 7);
            const rowsNeeded = Math.ceil(weeksNeeded * 7 / daysPerRow);

            const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            let html = '<div class="habit-grid-header"><div class="habit-grid-header-cell">Habit</div>';
            for (let col = 0; col < daysPerRow; col++) {
                const dayName = dayNames[col % 7];
                html += `<div class="habit-grid-header-cell month-header">${dayName}</div>`;
            }
            html += '</div>';

            habits.forEach(habit => {
                const streak = calculateStreak(habit.id);
                const habitNameHtml = `<div class="habit-name-cell"><div class="habit-color-dot" style="background: ${habit.color}"></div><span class="habit-name" title="${escapeHtml(habit.name)}">${escapeHtml(habit.name)}</span>${streak > 0 ? `<span class="habit-streak"><i class="fas fa-fire"></i>${streak}</span>` : ''}<div class="habit-actions"><button class="habit-action-btn" onclick="editHabit('${habit.id}')" title="Edit"><i class="fas fa-pen"></i></button><button class="habit-action-btn delete" onclick="deleteHabit('${habit.id}')" title="Delete"><i class="fas fa-trash"></i></button></div></div>`;

                for (let row = 0; row < rowsNeeded; row++) {
                    html += '<div class="habit-week-row">';
                    if (row === 0) {
                        html += habitNameHtml;
                    } else {
                        html += '<div class="habit-name-cell" style="opacity: 0; pointer-events: none;"></div>';
                    }

                    for (let col = 0; col < daysPerRow; col++) {
                        const dayOffset = row * daysPerRow + col;
                        const dayIndex = dayOffset - adjustedFirstDay + 1;
                        if (dayIndex < 1 || dayIndex > daysInMonth) {
                            html += '<div class="habit-cell compact disabled"></div>';
                        } else {
                            const date = new Date(currentStartDate.getFullYear(), currentStartDate.getMonth(), dayIndex);
                            const dateStr = formatDate(date);
                            const habitCreated = new Date(habit.createdAt);
                            habitCreated.setHours(0, 0, 0, 0);
                            const isCompleted = completions[dateStr] && completions[dateStr].includes(habit.id);
                            const isDisabled = date < habitCreated;
                            const isTodayCell = isToday(date);
                            const isPast = isPastDate(date);
                            const isFuture = isFutureDate(date);
                            const isLocked = !isUnlocked && !isTodayCell && (isPast || isFuture);
                            let cellClass = 'habit-cell compact';
                            if (isCompleted) cellClass += ' completed';
                            if (isDisabled) cellClass += ' disabled';
                            if (isTodayCell) cellClass += ' today';
                            if (isLocked) cellClass += ' locked';
                            const separatorClass = col === 0 && row > 0 ? 'habit-month-week-separator' : '';
                            const canClick = !isDisabled && (!isLocked || isUnlocked);
                            html += `<div class="${cellClass} ${separatorClass}" onclick="${canClick ? `toggleHabitCompletion('${habit.id}', '${dateStr}')` : ''}"><div class="check-circle">${isCompleted ? '<i class="fas fa-check"></i>' : ''}</div></div>`;
                        }
                    }
                    html += '</div>';
                }
            });
            grid.innerHTML = html;
        }

        function renderYearView() {
            const grid = document.getElementById('habit-grid');
            const dateRange = document.getElementById('habit-date-range');
            const year = currentStartDate.getFullYear();
            dateRange.textContent = formatYear(currentStartDate);
            
            const isMobile = window.innerWidth <= 900;
            const daysPerRow = isMobile ? 7 : 14;
            grid.className = isMobile ? 'habit-grid year-view mobile' : 'habit-grid year-view';

            if (habits.length === 0) {
                grid.innerHTML = '<div class="habit-empty"><i class="fas fa-calendar-check"></i><div>No habits yet</div><div style="font-size: 13px; margin-top: 5px;">Click "Add Habit" to start tracking</div></div>';
                return;
            }

            const yearStart = new Date(year, 0, 1);
            const yearEnd = new Date(year, 11, 31);
            const firstWeekStart = getStartOfWeek(yearStart);
            const lastWeekStart = getStartOfWeek(yearEnd);
            const totalDays = Math.ceil((lastWeekStart - firstWeekStart) / (1000 * 60 * 60 * 24)) + 7;
            const weeksInYear = Math.ceil(totalDays / 7);
            const rowsNeeded = Math.ceil(weeksInYear * 7 / daysPerRow);

            const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            let html = '<div class="habit-grid-header"><div class="habit-grid-header-cell">Habit</div>';
            for (let col = 0; col < daysPerRow; col++) {
                const dayName = dayNames[col % 7];
                html += `<div class="habit-grid-header-cell year-header">${dayName}</div>`;
            }
            html += '</div>';

            habits.forEach(habit => {
                const streak = calculateStreak(habit.id);
                const habitNameHtml = `<div class="habit-name-cell"><div class="habit-color-dot" style="background: ${habit.color}"></div><span class="habit-name" title="${escapeHtml(habit.name)}">${escapeHtml(habit.name)}</span>${streak > 0 ? `<span class="habit-streak"><i class="fas fa-fire"></i>${streak}</span>` : ''}<div class="habit-actions"><button class="habit-action-btn" onclick="editHabit('${habit.id}')" title="Edit"><i class="fas fa-pen"></i></button><button class="habit-action-btn delete" onclick="deleteHabit('${habit.id}')" title="Delete"><i class="fas fa-trash"></i></button></div></div>`;

                for (let row = 0; row < rowsNeeded; row++) {
                    html += '<div class="habit-week-row">';
                    if (row === 0) {
                        html += habitNameHtml;
                    } else {
                        html += '<div class="habit-name-cell" style="opacity: 0; pointer-events: none;"></div>';
                    }

                    for (let col = 0; col < daysPerRow; col++) {
                        const dayOffset = row * daysPerRow + col;
                        const date = new Date(firstWeekStart);
                        date.setDate(firstWeekStart.getDate() + dayOffset);
                        const dateStr = formatDate(date);
                        const isInYear = date.getFullYear() === year;
                        
                        if (!isInYear) {
                            html += '<div class="habit-cell compact disabled"></div>';
                        } else {
                            const habitCreated = new Date(habit.createdAt);
                            habitCreated.setHours(0, 0, 0, 0);
                            const isCompleted = completions[dateStr] && completions[dateStr].includes(habit.id);
                            const isDisabled = date < habitCreated;
                            const isTodayCell = isToday(date);
                            const isPast = isPastDate(date);
                            const isFuture = isFutureDate(date);
                            const isLocked = !isUnlocked && !isTodayCell && (isPast || isFuture);
                            let cellClass = 'habit-cell compact';
                            if (isCompleted) cellClass += ' completed';
                            if (isDisabled) cellClass += ' disabled';
                            if (isTodayCell) cellClass += ' today';
                            if (isLocked) cellClass += ' locked';
                            const separatorClass = col === 0 && row > 0 ? 'habit-month-week-separator' : '';
                            const canClick = !isDisabled && (!isLocked || isUnlocked);
                            html += `<div class="${cellClass} ${separatorClass}" onclick="${canClick ? `toggleHabitCompletion('${habit.id}', '${dateStr}')` : ''}"><div class="check-circle">${isCompleted ? '<i class="fas fa-check"></i>' : ''}</div></div>`;
                        }
                    }
                    html += '</div>';
                }
            });
            grid.innerHTML = html;
        }

        function renderColorOptions() {
            const container = document.getElementById('habit-color-options');
            container.innerHTML = COLORS.map(color => `<div class="habit-color-option ${color === selectedColor ? 'selected' : ''}" style="background: ${color}" onclick="selectHabitColor('${color}')" title="${color}"></div>`).join('');
        }

        function updateViewButtons() {
            document.querySelectorAll('.habit-view-btn').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.view === currentView);
            });
        }

        window.setHabitView = (view) => {
            currentView = view;
            updateViewButtons();
            const today = new Date();
            switch (view) {
                case 'week': currentStartDate = getStartOfWeek(today); break;
                case 'month': currentStartDate = getStartOfMonth(today); break;
                case 'year': currentStartDate = getStartOfYear(today); break;
            }
            renderGrid();
        };

        window.toggleHabitUnlock = () => {
            isUnlocked = !isUnlocked;
            updateUnlockButton();
            renderGrid();
            ToolUtils.showNotification(isUnlocked ? 'Past entries unlocked for editing' : 'Past entries locked', 1500);
        };

        window.navigateToMonth = (year, month) => {
            currentView = 'month';
            currentStartDate = new Date(year, month, 1);
            updateViewButtons();
            renderGrid();
        };

        window.showAddHabitModal = () => {
            editingHabitId = null;
            selectedColor = COLORS[0];
            document.getElementById('habit-modal-title').textContent = 'Add New Habit';
            document.getElementById('habit-name-input').value = '';
            renderColorOptions();
            document.getElementById('habit-modal-overlay').classList.add('active');
            document.getElementById('habit-name-input').focus();
        };

        window.closeHabitModal = () => {
            document.getElementById('habit-modal-overlay').classList.remove('active');
            editingHabitId = null;
        };

        window.selectHabitColor = (color) => {
            selectedColor = color;
            renderColorOptions();
        };

        window.saveHabit = () => {
            const nameInput = document.getElementById('habit-name-input');
            const name = nameInput.value.trim();
            if (!name) {
                ToolUtils.showNotification('Please enter a habit name');
                nameInput.focus();
                return;
            }
            if (editingHabitId) {
                const habit = habits.find(h => h.id === editingHabitId);
                if (habit) {
                    habit.name = name;
                    habit.color = selectedColor;
                    ToolUtils.showNotification('Habit updated');
                }
            } else {
                habits.push({ id: Date.now(), name: name, color: selectedColor, createdAt: new Date().toISOString() });
                ToolUtils.showNotification('Habit added');
            }
            saveHabits();
            renderGrid();
            closeHabitModal();
        };

        window.editHabit = (habitId) => {
            const id = typeof habitId === 'string' ? parseInt(habitId, 10) : habitId;
            const habit = habits.find(h => h.id === id);
            if (!habit) return;
            editingHabitId = id;
            selectedColor = habit.color;
            document.getElementById('habit-modal-title').textContent = 'Edit Habit';
            document.getElementById('habit-name-input').value = habit.name;
            renderColorOptions();
            document.getElementById('habit-modal-overlay').classList.add('active');
            document.getElementById('habit-name-input').focus();
        };

        window.deleteHabit = (habitId) => {
            if (!confirm('Delete this habit? This will also remove all completion history.')) return;
            const id = typeof habitId === 'string' ? parseInt(habitId, 10) : habitId;
            habits = habits.filter(h => h.id !== id);
            Object.keys(completions).forEach(date => {
                completions[date] = completions[date].filter(completionId => completionId !== id);
                if (completions[date].length === 0) delete completions[date];
            });
            saveHabits();
            saveCompletions();
            renderGrid();
            ToolUtils.showNotification('Habit deleted');
        };

        window.toggleHabitCompletion = (habitId, dateStr) => {
            if (!completions[dateStr]) completions[dateStr] = [];
            const id = typeof habitId === 'string' ? parseInt(habitId, 10) : habitId;
            const index = completions[dateStr].indexOf(id);
            if (index > -1) {
                completions[dateStr].splice(index, 1);
                if (completions[dateStr].length === 0) delete completions[dateStr];
            } else {
                completions[dateStr].push(id);
            }
            saveCompletions();
            renderGrid();
        };

        window.navigateHabits = (direction) => {
            switch (currentView) {
                case 'week':
                    const weekDays = direction.includes('big') ? 14 : 7;
                    const weekMult = direction.includes('prev') ? -1 : 1;
                    currentStartDate.setDate(currentStartDate.getDate() + (weekDays * weekMult));
                    break;
                case 'month':
                    const monthDelta = direction.includes('big') ? 3 : 1;
                    const monthMult = direction.includes('prev') ? -1 : 1;
                    currentStartDate.setMonth(currentStartDate.getMonth() + (monthDelta * monthMult));
                    break;
                case 'year':
                    const yearDelta = direction.includes('big') ? 5 : 1;
                    const yearMult = direction.includes('prev') ? -1 : 1;
                    currentStartDate.setFullYear(currentStartDate.getFullYear() + (yearDelta * yearMult));
                    break;
            }
            renderGrid();
        };

        window.navigateHabitsToday = () => {
            const today = new Date();
            switch (currentView) {
                case 'week': currentStartDate = getStartOfWeek(today); break;
                case 'month': currentStartDate = getStartOfMonth(today); break;
                case 'year': currentStartDate = getStartOfYear(today); break;
            }
            renderGrid();
        };

        window.exportHabitData = () => {
            const data = { habits: habits, completions: completions, exportedAt: new Date().toISOString() };
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `habit-tracker-export-${formatDate(new Date())}.json`;
            a.click();
            URL.revokeObjectURL(url);
            ToolUtils.showNotification('Data exported');
        };

        window.enterHabitTrackerFullscreen = () => {
            const app = window.toolkitApp;
            if (!app) return;
            const container = document.getElementById('habit-tracker-container');
            if (container) app.enterFullscreen(container);
        };

        document.getElementById('habit-modal-overlay').addEventListener('click', (e) => {
            if (e.target.id === 'habit-modal-overlay') closeHabitModal();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeHabitModal();
            if (e.key === 'Enter' && document.getElementById('habit-modal-overlay').classList.contains('active')) saveHabit();
        });

        window.addEventListener('resize', () => {
            if (currentView === 'month' || currentView === 'year') {
                renderGrid();
            }
        });

        loadData();
        updateUnlockButton();
        renderGrid();
    }
};