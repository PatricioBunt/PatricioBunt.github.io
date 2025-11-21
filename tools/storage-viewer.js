// Browser Storage Viewer Tool
export default {
    title: 'Storage Viewer',
    styles: `
        /* Storage Viewer Styles */
        .storage-tabs {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
            border-bottom: 2px solid var(--border-color);
        }

        .storage-tab {
            padding: 10px 20px;
            background: transparent;
            border: none;
            border-bottom: 2px solid transparent;
            color: var(--text-secondary);
            cursor: pointer;
            transition: all var(--transition-speed);
            font-size: 14px;
            margin-bottom: -2px;
        }

        .storage-tab:hover {
            color: var(--text-primary);
        }

        .storage-tab.active {
            color: var(--accent-color);
            border-bottom-color: var(--accent-color);
        }

        .storage-content {
            display: none;
        }

        .storage-content.active {
            display: block;
        }

        .storage-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 15px;
        }

        .storage-table th,
        .storage-table td {
            padding: 10px;
            text-align: left;
            border-bottom: 1px solid var(--border-color);
        }

        .storage-table th {
            background: var(--bg-tertiary);
            color: var(--text-primary);
            font-weight: 600;
            font-size: 12px;
            position: sticky;
            top: 0;
        }

        .storage-table td {
            color: var(--text-primary);
            font-size: 13px;
            font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
        }

        .storage-key {
            color: var(--accent-color);
            word-break: break-all;
            max-width: 300px;
        }

        .storage-value {
            word-break: break-all;
            max-width: 500px;
        }

        .storage-actions {
            display: flex;
            gap: 8px;
        }

        .storage-action-btn {
            background: transparent;
            border: 1px solid var(--border-color);
            color: var(--text-secondary);
            cursor: pointer;
            padding: 4px 8px;
            border-radius: 3px;
            font-size: 11px;
            transition: all var(--transition-speed);
        }

        .storage-action-btn:hover {
            background: var(--bg-hover);
            border-color: var(--accent-color);
            color: var(--accent-color);
        }

        .storage-empty {
            text-align: center;
            padding: 40px;
            color: var(--text-disabled);
            font-style: italic;
        }

        .storage-stats {
            display: flex;
            gap: 20px;
            padding: 15px;
            background: var(--bg-secondary);
            border: 1px solid var(--border-color);
            border-radius: 4px;
            margin-bottom: 20px;
        }

        .storage-stat {
            display: flex;
            flex-direction: column;
        }

        .storage-stat-value {
            font-size: 20px;
            font-weight: bold;
            color: var(--accent-color);
        }

        .storage-stat-label {
            font-size: 11px;
            color: var(--text-secondary);
            margin-top: 4px;
        }
    `,
    html: `
        <div class="tool-info">
            <i class="fas fa-info-circle" style="margin-right: 8px;"></i>
            View and manage browser storage: Local Storage, Session Storage, Cookies, and IndexedDB.
        </div>
        <div class="tool-section">
            <div style="margin-bottom: 20px;">
                <button class="tool-button" onclick="refreshStorage()">
                    <i class="fas fa-sync-alt" style="margin-right: 6px;"></i>
                    Refresh
                </button>
                <button class="tool-button secondary" onclick="clearAllStorage()">
                    <i class="fas fa-trash-alt" style="margin-right: 6px;"></i>
                    Clear All
                </button>
            </div>
            
            <div class="storage-tabs">
                <button class="storage-tab active" onclick="switchStorageTab('localStorage')" data-tab="localStorage">
                    <i class="fas fa-database" style="margin-right: 6px;"></i>
                    Local Storage
                </button>
                <button class="storage-tab" onclick="switchStorageTab('sessionStorage')" data-tab="sessionStorage">
                    <i class="fas fa-clock" style="margin-right: 6px;"></i>
                    Session Storage
                </button>
                <button class="storage-tab" onclick="switchStorageTab('cookies')" data-tab="cookies">
                    <i class="fas fa-cookie" style="margin-right: 6px;"></i>
                    Cookies
                </button>
                <button class="storage-tab" onclick="switchStorageTab('indexeddb')" data-tab="indexeddb">
                    <i class="fas fa-archive" style="margin-right: 6px;"></i>
                    IndexedDB
                </button>
            </div>
            
            <div id="localStorage-content" class="storage-content active">
                <div class="storage-stats">
                    <div class="storage-stat">
                        <div class="storage-stat-value" id="localStorage-count">0</div>
                        <div class="storage-stat-label">Items</div>
                    </div>
                    <div class="storage-stat">
                        <div class="storage-stat-value" id="localStorage-size">0 KB</div>
                        <div class="storage-stat-label">Size</div>
                    </div>
                </div>
                <div id="localStorage-table"></div>
            </div>
            
            <div id="sessionStorage-content" class="storage-content">
                <div class="storage-stats">
                    <div class="storage-stat">
                        <div class="storage-stat-value" id="sessionStorage-count">0</div>
                        <div class="storage-stat-label">Items</div>
                    </div>
                    <div class="storage-stat">
                        <div class="storage-stat-value" id="sessionStorage-size">0 KB</div>
                        <div class="storage-stat-label">Size</div>
                    </div>
                </div>
                <div id="sessionStorage-table"></div>
            </div>
            
            <div id="cookies-content" class="storage-content">
                <div class="storage-stats">
                    <div class="storage-stat">
                        <div class="storage-stat-value" id="cookies-count">0</div>
                        <div class="storage-stat-label">Cookies</div>
                    </div>
                    <div class="storage-stat">
                        <div class="storage-stat-value" id="cookies-size">0 KB</div>
                        <div class="storage-stat-label">Size</div>
                    </div>
                </div>
                <div id="cookies-table"></div>
            </div>
            
            <div id="indexeddb-content" class="storage-content">
                <div class="storage-stats">
                    <div class="storage-stat">
                        <div class="storage-stat-value" id="indexeddb-count">0</div>
                        <div class="storage-stat-label">Databases</div>
                    </div>
                </div>
                <div id="indexeddb-table"></div>
            </div>
        </div>
    `,
    init() {
        let currentTab = 'localStorage';
        
        function formatSize(bytes) {
            if (bytes < 1024) return bytes + ' B';
            if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
            return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
        }
        
        function renderLocalStorage() {
            const table = document.getElementById('localStorage-table');
            const items = [];
            let totalSize = 0;
            
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                const value = localStorage.getItem(key);
                const size = new Blob([key + value]).size;
                totalSize += size;
                items.push({ key, value, size });
            }
            
            document.getElementById('localStorage-count').textContent = items.length;
            document.getElementById('localStorage-size').textContent = formatSize(totalSize);
            
            if (items.length === 0) {
                table.innerHTML = '<div class="storage-empty">No items in Local Storage</div>';
                return;
            }
            
            let html = '<table class="storage-table"><thead><tr><th>Key</th><th>Value</th><th>Size</th><th>Actions</th></tr></thead><tbody>';
            items.forEach(item => {
                html += `
                    <tr>
                        <td class="storage-key">${escapeHtml(item.key)}</td>
                        <td class="storage-value">${escapeHtml(item.value.substring(0, 100))}${item.value.length > 100 ? '...' : ''}</td>
                        <td>${formatSize(item.size)}</td>
                        <td>
                            <div class="storage-actions">
                                <button class="storage-action-btn" onclick="viewStorageItem('localStorage', '${escapeHtml(item.key)}')" title="View">
                                    <i class="fas fa-eye"></i>
                                </button>
                                <button class="storage-action-btn" onclick="deleteStorageItem('localStorage', '${escapeHtml(item.key)}')" title="Delete">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                `;
            });
            html += '</tbody></table>';
            table.innerHTML = html;
        }
        
        function renderSessionStorage() {
            const table = document.getElementById('sessionStorage-table');
            const items = [];
            let totalSize = 0;
            
            for (let i = 0; i < sessionStorage.length; i++) {
                const key = sessionStorage.key(i);
                const value = sessionStorage.getItem(key);
                const size = new Blob([key + value]).size;
                totalSize += size;
                items.push({ key, value, size });
            }
            
            document.getElementById('sessionStorage-count').textContent = items.length;
            document.getElementById('sessionStorage-size').textContent = formatSize(totalSize);
            
            if (items.length === 0) {
                table.innerHTML = '<div class="storage-empty">No items in Session Storage</div>';
                return;
            }
            
            let html = '<table class="storage-table"><thead><tr><th>Key</th><th>Value</th><th>Size</th><th>Actions</th></tr></thead><tbody>';
            items.forEach(item => {
                html += `
                    <tr>
                        <td class="storage-key">${escapeHtml(item.key)}</td>
                        <td class="storage-value">${escapeHtml(item.value.substring(0, 100))}${item.value.length > 100 ? '...' : ''}</td>
                        <td>${formatSize(item.size)}</td>
                        <td>
                            <div class="storage-actions">
                                <button class="storage-action-btn" onclick="viewStorageItem('sessionStorage', '${escapeHtml(item.key)}')" title="View">
                                    <i class="fas fa-eye"></i>
                                </button>
                                <button class="storage-action-btn" onclick="deleteStorageItem('sessionStorage', '${escapeHtml(item.key)}')" title="Delete">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                `;
            });
            html += '</tbody></table>';
            table.innerHTML = html;
        }
        
        function renderCookies() {
            const table = document.getElementById('cookies-table');
            const cookies = document.cookie.split(';').filter(c => c.trim());
            const items = [];
            let totalSize = 0;
            
            cookies.forEach(cookie => {
                const [key, ...valueParts] = cookie.split('=');
                const value = valueParts.join('=');
                const size = new Blob([key + value]).size;
                totalSize += size;
                items.push({ key: key.trim(), value: decodeURIComponent(value), size });
            });
            
            document.getElementById('cookies-count').textContent = items.length;
            document.getElementById('cookies-size').textContent = formatSize(totalSize);
            
            if (items.length === 0) {
                table.innerHTML = '<div class="storage-empty">No cookies</div>';
                return;
            }
            
            let html = '<table class="storage-table"><thead><tr><th>Key</th><th>Value</th><th>Size</th><th>Actions</th></tr></thead><tbody>';
            items.forEach(item => {
                html += `
                    <tr>
                        <td class="storage-key">${escapeHtml(item.key)}</td>
                        <td class="storage-value">${escapeHtml(item.value.substring(0, 100))}${item.value.length > 100 ? '...' : ''}</td>
                        <td>${formatSize(item.size)}</td>
                        <td>
                            <div class="storage-actions">
                                <button class="storage-action-btn" onclick="viewStorageItem('cookies', '${escapeHtml(item.key)}')" title="View">
                                    <i class="fas fa-eye"></i>
                                </button>
                                <button class="storage-action-btn" onclick="deleteStorageItem('cookies', '${escapeHtml(item.key)}')" title="Delete">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                `;
            });
            html += '</tbody></table>';
            table.innerHTML = html;
        }
        
        async function renderIndexedDB() {
            const table = document.getElementById('indexeddb-table');
            
            if (!('indexedDB' in window)) {
                table.innerHTML = '<div class="storage-empty">IndexedDB is not supported</div>';
                document.getElementById('indexeddb-count').textContent = '0';
                return;
            }
            
            try {
                const databases = await indexedDB.databases();
                document.getElementById('indexeddb-count').textContent = databases.length;
                
                if (databases.length === 0) {
                    table.innerHTML = '<div class="storage-empty">No IndexedDB databases</div>';
                    return;
                }
                
                let html = '<table class="storage-table"><thead><tr><th>Database Name</th><th>Version</th></tr></thead><tbody>';
                databases.forEach(db => {
                    html += `
                        <tr>
                            <td class="storage-key">${escapeHtml(db.name)}</td>
                            <td>${db.version}</td>
                        </tr>
                    `;
                });
                html += '</tbody></table>';
                table.innerHTML = html;
            } catch (error) {
                table.innerHTML = '<div class="storage-empty">Error loading IndexedDB databases</div>';
                console.error('IndexedDB error:', error);
            }
        }
        
        function escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }
        
        function renderCurrentTab() {
            switch(currentTab) {
                case 'localStorage':
                    renderLocalStorage();
                    break;
                case 'sessionStorage':
                    renderSessionStorage();
                    break;
                case 'cookies':
                    renderCookies();
                    break;
                case 'indexeddb':
                    renderIndexedDB();
                    break;
            }
        }
        
        window.switchStorageTab = (tab) => {
            currentTab = tab;
            
            // Update tabs
            document.querySelectorAll('.storage-tab').forEach(t => t.classList.remove('active'));
            document.querySelector(`[data-tab="${tab}"]`).classList.add('active');
            
            // Update content
            document.querySelectorAll('.storage-content').forEach(c => c.classList.remove('active'));
            document.getElementById(`${tab}-content`).classList.add('active');
            
            renderCurrentTab();
        };
        
        window.refreshStorage = () => {
            renderCurrentTab();
            ToolUtils.showNotification('Storage refreshed', 1500);
        };
        
        window.viewStorageItem = (type, key) => {
            let value = '';
            if (type === 'localStorage') {
                value = localStorage.getItem(key);
            } else if (type === 'sessionStorage') {
                value = sessionStorage.getItem(key);
            } else if (type === 'cookies') {
                const cookies = document.cookie.split(';');
                const cookie = cookies.find(c => c.trim().startsWith(key + '='));
                if (cookie) {
                    value = decodeURIComponent(cookie.split('=').slice(1).join('='));
                }
            }
            
            alert(`Key: ${key}\n\nValue:\n${value}`);
        };
        
        window.deleteStorageItem = (type, key) => {
            if (!confirm(`Delete "${key}"?`)) return;
            
            if (type === 'localStorage') {
                localStorage.removeItem(key);
            } else if (type === 'sessionStorage') {
                sessionStorage.removeItem(key);
            } else if (type === 'cookies') {
                document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
            }
            
            renderCurrentTab();
            ToolUtils.showNotification('Item deleted', 1500);
        };
        
        window.clearAllStorage = () => {
            if (!confirm('Clear all storage? This will delete all Local Storage, Session Storage, and Cookies.')) return;
            
            localStorage.clear();
            sessionStorage.clear();
            
            // Clear cookies
            document.cookie.split(';').forEach(cookie => {
                const key = cookie.split('=')[0].trim();
                document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
            });
            
            renderCurrentTab();
            ToolUtils.showNotification('All storage cleared', 2000);
        };
        
        // Initialize
        renderCurrentTab();
    }
};

