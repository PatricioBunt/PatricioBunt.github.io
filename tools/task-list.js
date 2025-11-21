// Task List Tool (uses localStorage)
export default {
    title: 'Task List',
    styles: `
        /* Task List Styles */
        .task-item {
            display: flex;
            align-items: center;
            padding: 8px 12px;
            margin-bottom: 6px;
            background: var(--bg-tertiary);
            border: 1px solid var(--border-color);
            border-radius: 4px;
            transition: all var(--transition-speed);
        }

        .task-item:hover {
            background: var(--bg-hover);
            border-color: var(--accent-color);
        }

        .task-item.completed {
            opacity: 0.7;
        }

        .task-checkbox {
            margin-right: 10px;
            cursor: pointer;
            width: 18px;
            height: 18px;
            accent-color: var(--accent-color);
            flex-shrink: 0;
        }

        .task-text {
            flex: 1;
            color: var(--text-primary);
            word-break: break-word;
        }

        .task-text.completed {
            text-decoration: line-through;
            color: var(--text-disabled);
        }

        .task-delete-btn {
            background: transparent;
            border: none;
            color: var(--text-secondary);
            cursor: pointer;
            padding: 4px 8px;
            border-radius: 4px;
            transition: all var(--transition-speed);
            font-size: 14px;
            flex-shrink: 0;
            margin-left: 8px;
        }

        .task-delete-btn:hover {
            background: var(--bg-hover);
            color: #f48771;
        }

        .task-list-container {
            background: var(--bg-secondary);
            border: 1px solid var(--border-color);
            border-radius: 4px;
            padding: 10px;
            min-height: 200px;
            max-height: 600px;
            overflow-y: auto;
        }

        .task-list-container::-webkit-scrollbar {
            width: 10px;
        }

        .task-list-container::-webkit-scrollbar-track {
            background: var(--bg-secondary);
        }

        .task-list-container::-webkit-scrollbar-thumb {
            background: var(--bg-tertiary);
            border-radius: 5px;
        }

        .task-list-container::-webkit-scrollbar-thumb:hover {
            background: var(--bg-hover);
        }

        .task-empty {
            color: var(--text-disabled);
            text-align: center;
            padding: 40px 20px;
            font-style: italic;
        }

        .task-stats {
            display: flex;
            gap: 20px;
            padding: 12px;
            background: var(--bg-tertiary);
            border-radius: 4px;
            margin-bottom: 15px;
        }

        .task-stat-item {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .task-stat-value {
            font-size: 20px;
            font-weight: bold;
            color: var(--accent-color);
        }

        .task-stat-label {
            font-size: 11px;
            color: var(--text-secondary);
            margin-top: 4px;
        }
    `,
    html: `
        <div class="tool-info">
            <i class="fas fa-info-circle" style="margin-right: 8px;"></i>
            Manage your personal task list. Tasks are automatically saved to your browser's local storage.
        </div>
        <div class="tool-section">
            <div class="tool-input-group">
                <label for="task-input">
                    <i class="fas fa-plus-circle" style="margin-right: 6px; color: var(--text-secondary);"></i>
                    New Task
                </label>
                <input type="text" id="task-input" placeholder="Enter a new task..." onkeypress="if(event.key==='Enter') addTask()">
            </div>
            <div style="margin-top: 15px;">
                <button class="tool-button" onclick="addTask()">
                    <i class="fas fa-plus" style="margin-right: 6px;"></i>
                    Add Task
                </button>
                <button class="tool-button secondary" onclick="clearCompleted()">
                    <i class="fas fa-check-double" style="margin-right: 6px;"></i>
                    Clear Completed
                </button>
                <button class="tool-button secondary" onclick="clearAll()">
                    <i class="fas fa-trash-alt" style="margin-right: 6px;"></i>
                    Clear All
                </button>
            </div>
            <div class="tool-input-group" style="margin-top: 20px;">
                <div class="task-stats">
                    <div class="task-stat-item">
                        <div class="task-stat-value" id="task-total">0</div>
                        <div class="task-stat-label">Total</div>
                    </div>
                    <div class="task-stat-item">
                        <div class="task-stat-value" id="task-active">0</div>
                        <div class="task-stat-label">Active</div>
                    </div>
                    <div class="task-stat-item">
                        <div class="task-stat-value" id="task-completed">0</div>
                        <div class="task-stat-label">Completed</div>
                    </div>
                </div>
                <label style="display: flex; justify-content: space-between; align-items: center;">
                    <span>
                        <i class="fas fa-tasks" style="margin-right: 6px; color: var(--text-secondary);"></i>
                        Tasks
                    </span>
                    <button class="fullscreen-btn" onclick="enterTaskListFullscreen()" title="Fullscreen">
                        <i class="fas fa-expand"></i>
                        <span>Fullscreen</span>
                    </button>
                </label>
                <div id="task-list" class="task-list-container" data-fullscreen-target="true">
                    <div class="task-empty">No tasks yet. Add one above!</div>
                </div>
            </div>
        </div>
    `,
    init() {
        const STORAGE_KEY = 'toolkit_tasks';
        
        // Load tasks from localStorage
        function loadTasks() {
            const tasks = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
            // Migrate old tasks without status
            tasks.forEach(task => {
                if (!task.status) {
                    task.status = task.completed ? 'done' : 'todo';
                }
            });
            renderTasks(tasks);
            return tasks;
        }
        
        // Save tasks to localStorage
        function saveTasks(tasks) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
            // Trigger custom event for kanban board sync (same window)
            window.dispatchEvent(new CustomEvent('tasksUpdated'));
        }
        
        // Render tasks
        function renderTasks(tasks) {
            const taskList = document.getElementById('task-list');
            const totalEl = document.getElementById('task-total');
            const activeEl = document.getElementById('task-active');
            const completedEl = document.getElementById('task-completed');
            
            const todo = tasks.filter(t => t.status === 'todo').length;
            const inProgress = tasks.filter(t => t.status === 'in-progress').length;
            const done = tasks.filter(t => t.status === 'done' || t.completed).length;
            const active = todo + inProgress;
            
            totalEl.textContent = tasks.length;
            activeEl.textContent = active;
            completedEl.textContent = done;
            
            if (tasks.length === 0) {
                taskList.innerHTML = '<div class="task-empty">No tasks yet. Add one above!</div>';
                return;
            }
            
            // Sort: todo first, then in-progress, then done
            const sortedTasks = [...tasks].sort((a, b) => {
                const order = { 'todo': 0, 'in-progress': 1, 'done': 2 };
                return (order[a.status] || 0) - (order[b.status] || 0);
            });
            
            taskList.innerHTML = sortedTasks.map((task, displayIndex) => {
                const actualIndex = tasks.findIndex(t => t.id === task.id);
                const isDone = task.status === 'done' || task.completed;
                const isInProgress = task.status === 'in-progress';
                
                return `
                    <div class="task-item ${isDone ? 'completed' : ''}" data-task-id="${task.id}">
                        <input type="checkbox" class="task-checkbox" 
                               ${isDone ? 'checked' : ''} 
                               data-indeterminate="${isInProgress}"
                               onchange="toggleTask(${actualIndex})">
                        <span class="task-text ${isDone ? 'completed' : ''}">
                            ${escapeHtml(task.text)}
                        </span>
                        <button class="task-delete-btn" onclick="deleteTask(${actualIndex})" title="Delete task">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `;
            }).join('');
            
            // Set indeterminate state for checkboxes after render
            setTimeout(() => {
                taskList.querySelectorAll('.task-checkbox[data-indeterminate="true"]').forEach(checkbox => {
                    checkbox.indeterminate = true;
                });
            }, 0);
        }
        
        function escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }
        
        window.addTask = () => {
            const input = document.getElementById('task-input');
            const text = input.value.trim();
            
            if (!text) {
                ToolUtils.showNotification('Please enter a task');
                return;
            }
            
            const tasks = loadTasks();
            tasks.push({ text, completed: false, status: 'todo', id: Date.now() });
            saveTasks(tasks);
            renderTasks(tasks);
            input.value = '';
            input.focus();
            ToolUtils.showNotification('Task added', 1000);
        };
        
        window.toggleTask = (index) => {
            const tasks = loadTasks();
            const task = tasks[index];
            // Cycle: todo -> in-progress -> done -> todo
            if (task.status === 'todo') {
                task.status = 'in-progress';
                task.completed = false;
            } else if (task.status === 'in-progress') {
                task.status = 'done';
                task.completed = true;
            } else {
                // done -> todo
                task.status = 'todo';
                task.completed = false;
            }
            saveTasks(tasks);
            renderTasks(tasks);
        };
        
        window.deleteTask = (index) => {
            const tasks = loadTasks();
            tasks.splice(index, 1);
            saveTasks(tasks);
            renderTasks(tasks);
            ToolUtils.showNotification('Task deleted', 1000);
        };
        
        window.clearCompleted = () => {
            const tasks = loadTasks();
            const activeTasks = tasks.filter(t => !t.completed);
            saveTasks(activeTasks);
            renderTasks(activeTasks);
            ToolUtils.showNotification('Completed tasks cleared', 1500);
        };
        
        window.clearAll = () => {
            if (confirm('Are you sure you want to clear all tasks?')) {
                saveTasks([]);
                renderTasks([]);
                ToolUtils.showNotification('All tasks cleared', 1500);
            }
        };
        
        // Listen for storage changes (from kanban board)
        window.addEventListener('storage', () => {
            loadTasks();
        });
        
        // Also listen for custom event (same window)
        window.addEventListener('tasksUpdated', () => {
            loadTasks();
        });
        
        window.enterTaskListFullscreen = () => {
            const app = window.toolkitApp;
            if (!app) return;
            
            const taskList = document.getElementById('task-list');
            if (taskList) {
                app.enterFullscreen(taskList);
            }
        };
        
        // Initialize
        loadTasks();
    }
};
