// Kanban Board Tool (uses localStorage)
export default {
    title: 'Kanban Board',
    styles: `
        /* Kanban Board Styles */
        .kanban-container {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
            margin-top: 20px;
        }

        .kanban-column {
            background: var(--bg-secondary);
            border: 1px solid var(--border-color);
            border-radius: 4px;
            padding: 15px;
            min-height: 400px;
            display: flex;
            flex-direction: column;
        }

        .kanban-column-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px;
            background: var(--bg-tertiary);
            border-radius: 4px;
            margin-bottom: 15px;
        }

        .kanban-column-title {
            font-weight: 600;
            color: var(--text-primary);
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .kanban-column-count {
            background: var(--bg-primary);
            color: var(--text-secondary);
            padding: 2px 8px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: 600;
        }

        .kanban-column.todo .kanban-column-title {
            color: #569cd6;
        }

        .kanban-column.in-progress .kanban-column-title {
            color: #dcdcaa;
        }

        .kanban-column.done .kanban-column-title {
            color: #4ec9b0;
        }

        .kanban-cards {
            flex: 1;
            overflow-y: auto;
            min-height: 200px;
        }

        .kanban-cards::-webkit-scrollbar {
            width: 8px;
        }

        .kanban-cards::-webkit-scrollbar-track {
            background: var(--bg-secondary);
        }

        .kanban-cards::-webkit-scrollbar-thumb {
            background: var(--bg-tertiary);
            border-radius: 4px;
        }

        .kanban-cards::-webkit-scrollbar-thumb:hover {
            background: var(--bg-hover);
        }

        .kanban-card {
            background: var(--bg-tertiary);
            border: 1px solid var(--border-color);
            border-radius: 4px;
            padding: 12px;
            margin-bottom: 10px;
            cursor: move;
            transition: all var(--transition-speed);
            position: relative;
        }

        .kanban-card:hover {
            border-color: var(--accent-color);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
            transform: translateY(-2px);
        }

        .kanban-card.dragging {
            opacity: 0.5;
        }

        .kanban-card-content {
            color: var(--text-primary);
            word-break: break-word;
            padding-right: 24px;
        }

        .kanban-card-delete {
            position: absolute;
            top: 8px;
            right: 8px;
            background: transparent;
            border: none;
            color: var(--text-secondary);
            cursor: pointer;
            padding: 4px;
            border-radius: 3px;
            font-size: 12px;
            transition: all var(--transition-speed);
            opacity: 0;
            z-index: 10;
        }

        .kanban-card:hover .kanban-card-delete {
            opacity: 1;
        }

        .kanban-card-delete:hover {
            background: var(--bg-hover);
            color: #f48771;
        }

        .kanban-add-card {
            background: var(--bg-tertiary);
            border: 2px dashed var(--border-color);
            border-radius: 4px;
            padding: 15px;
            text-align: center;
            cursor: pointer;
            transition: all var(--transition-speed);
            color: var(--text-secondary);
            margin-bottom: 10px;
        }

        .kanban-add-card:hover {
            border-color: var(--accent-color);
            color: var(--accent-color);
            background: var(--bg-hover);
        }

        .kanban-card-input {
            width: 100%;
            padding: 8px;
            background: var(--bg-primary);
            border: 1px solid var(--border-color);
            border-radius: 4px;
            color: var(--text-primary);
            font-size: 13px;
            margin-bottom: 8px;
        }

        .kanban-card-input:focus {
            outline: none;
            border-color: var(--accent-color);
        }

        .kanban-empty {
            color: var(--text-disabled);
            text-align: center;
            padding: 40px 20px;
            font-style: italic;
        }

        @media (max-width: 1200px) {
            .kanban-container {
                grid-template-columns: 1fr;
            }
        }
    `,
    html: `
        <div class="tool-info">
            <i class="fas fa-info-circle" style="margin-right: 8px;"></i>
            Organize your tasks with a Kanban board. Drag cards between columns or click to edit. All changes are automatically saved.
        </div>
        <div class="tool-section">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                <span></span>
                <button class="fullscreen-btn" onclick="enterKanbanFullscreen()" title="Fullscreen">
                    <i class="fas fa-expand"></i>
                    <span>Fullscreen</span>
                </button>
            </div>
            <div class="kanban-container" id="kanban-container" data-fullscreen-target="true">
                <div class="kanban-column todo" data-column="todo">
                    <div class="kanban-column-header">
                        <div class="kanban-column-title">
                            <i class="fas fa-circle"></i>
                            <span>To Do</span>
                        </div>
                        <span class="kanban-column-count" id="todo-count">0</span>
                    </div>
                    <div class="kanban-cards" id="todo-cards" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
                    <div class="kanban-add-card" onclick="showAddCard('todo')">
                        <i class="fas fa-plus" style="margin-right: 6px;"></i>
                        Add Card
                    </div>
                </div>
                
                <div class="kanban-column in-progress" data-column="in-progress">
                    <div class="kanban-column-header">
                        <div class="kanban-column-title">
                            <i class="fas fa-spinner"></i>
                            <span>In Progress</span>
                        </div>
                        <span class="kanban-column-count" id="in-progress-count">0</span>
                    </div>
                    <div class="kanban-cards" id="in-progress-cards" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
                    <div class="kanban-add-card" onclick="showAddCard('in-progress')">
                        <i class="fas fa-plus" style="margin-right: 6px;"></i>
                        Add Card
                    </div>
                </div>
                
                <div class="kanban-column done" data-column="done">
                    <div class="kanban-column-header">
                        <div class="kanban-column-title">
                            <i class="fas fa-check-circle"></i>
                            <span>Done</span>
                        </div>
                        <span class="kanban-column-count" id="done-count">0</span>
                    </div>
                    <div class="kanban-cards" id="done-cards" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
                    <div class="kanban-add-card" onclick="showAddCard('done')">
                        <i class="fas fa-plus" style="margin-right: 6px;"></i>
                        Add Card
                    </div>
                </div>
            </div>
        </div>
    `,
    init() {
        const STORAGE_KEY = 'toolkit_tasks';
        let draggedCard = null;
        
        // Load tasks from localStorage (shared with task list)
        function loadTasks() {
            const tasks = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
            // Migrate old tasks without status
            tasks.forEach(task => {
                if (!task.status) {
                    task.status = task.completed ? 'done' : 'todo';
                }
            });
            return tasks;
        }
        
        // Convert tasks to board structure
        function tasksToBoard(tasks) {
            return {
                'todo': tasks.filter(t => t.status === 'todo'),
                'in-progress': tasks.filter(t => t.status === 'in-progress'),
                'done': tasks.filter(t => t.status === 'done' || t.completed)
            };
        }
        
        // Save tasks to localStorage
        function saveTasks(tasks) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
            // Trigger custom event for task list sync
            window.dispatchEvent(new CustomEvent('tasksUpdated'));
        }
        
        // Render board
        function renderBoard() {
            const tasks = loadTasks();
            const board = tasksToBoard(tasks);
            const columns = ['todo', 'in-progress', 'done'];
            
            columns.forEach(column => {
                const cardsContainer = document.getElementById(`${column}-cards`);
                const countEl = document.getElementById(`${column}-count`);
                const cards = board[column] || [];
                
                countEl.textContent = cards.length;
                
                if (cards.length === 0) {
                    cardsContainer.innerHTML = '<div class="kanban-empty">No cards</div>';
                } else {
                    cardsContainer.innerHTML = cards.map((card) => {
                        return `
                            <div class="kanban-card" draggable="true" ondragstart="dragStart(event, '${column}', ${card.id})" 
                                 ondragend="dragEnd(event)" data-column="${column}" data-task-id="${card.id}">
                                <button class="kanban-card-delete" onclick="event.stopPropagation(); deleteCard(${card.id})" title="Delete">
                                    <i class="fas fa-times"></i>
                                </button>
                                <div class="kanban-card-content" onclick="editCard(${card.id})">${escapeHtml(card.text)}</div>
                            </div>
                        `;
                    }).join('');
                }
            });
        }
        
        function escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }
        
        window.allowDrop = (ev) => {
            ev.preventDefault();
        };
        
        window.dragStart = (ev, column, taskId) => {
            draggedCard = { column, taskId };
            ev.dataTransfer.effectAllowed = 'move';
            ev.currentTarget.classList.add('dragging');
        };
        
        window.dragEnd = (ev) => {
            ev.currentTarget.classList.remove('dragging');
        };
        
        window.drop = (ev) => {
            ev.preventDefault();
            if (!draggedCard) return;
            
            const targetColumn = ev.currentTarget.closest('.kanban-column').dataset.column;
            const tasks = loadTasks();
            
            if (targetColumn === draggedCard.column) {
                draggedCard = null;
                return;
            }
            
            const task = tasks.find(t => t.id === draggedCard.taskId);
            if (!task) {
                draggedCard = null;
                return;
            }
            
            // Update task status
            task.status = targetColumn;
            task.completed = targetColumn === 'done';
            
            saveTasks(tasks);
            renderBoard();
            draggedCard = null;
            ToolUtils.showNotification('Card moved', 1000);
        };
        
        window.showAddCard = (column) => {
            const text = prompt('Enter card text:');
            if (text && text.trim()) {
                const tasks = loadTasks();
                tasks.push({ 
                    text: text.trim(), 
                    id: Date.now(),
                    status: column,
                    completed: column === 'done'
                });
                saveTasks(tasks);
                renderBoard();
                ToolUtils.showNotification('Card added', 1000);
            }
        };
        
        window.editCard = (taskId) => {
            const tasks = loadTasks();
            const task = tasks.find(t => t.id === taskId);
            if (!task) return;
            
            const newText = prompt('Edit card text:', task.text);
            if (newText !== null && newText.trim()) {
                task.text = newText.trim();
                saveTasks(tasks);
                renderBoard();
                ToolUtils.showNotification('Card updated', 1000);
            }
        };
        
        window.deleteCard = (taskId) => {
            if (confirm('Delete this card?')) {
                const tasks = loadTasks();
                const index = tasks.findIndex(t => t.id === taskId);
                if (index !== -1) {
                    tasks.splice(index, 1);
                    saveTasks(tasks);
                    renderBoard();
                    ToolUtils.showNotification('Card deleted', 1000);
                }
            }
        };
        
        // Listen for storage changes (from task list)
        window.addEventListener('storage', () => {
            renderBoard();
        });
        
        // Also listen for custom event (same window)
        window.addEventListener('tasksUpdated', () => {
            renderBoard();
        });
        
        window.enterKanbanFullscreen = () => {
            const app = window.toolkitApp;
            if (!app) return;
            
            const container = document.getElementById('kanban-container');
            if (container) {
                app.enterFullscreen(container);
            }
        };
        
        // Initialize
        renderBoard();
    }
};

