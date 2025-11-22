
export default {
    title: 'Diff Checker',
    styles: `
        /* Diff Checker Styles */
        .diff-mode-btn {
            padding: 10px 20px;
            background-color: transparent;
            color: var(--text-secondary);
            border: none;
            border-bottom: 2px solid transparent;
            font-size: 13px;
            font-weight: 500;
            cursor: pointer;
            transition: all var(--transition-speed);
            display: flex;
            align-items: center;
            margin-bottom: -1px;
        }

        .diff-mode-btn:hover {
            color: var(--text-primary);
            background-color: var(--bg-hover);
        }

        .diff-mode-btn.active {
            color: var(--accent-color);
            border-bottom-color: var(--accent-color);
            background-color: transparent;
        }

        .diff-mode-content {
            animation: fadeIn 0.2s ease-in;
        }

        .diff-viewer,
        .diff-list-viewer {
            background-color: var(--bg-secondary);
            border: 1px solid var(--border-color);
            border-radius: 4px;
            padding: 15px;
            min-height: 200px;
            max-height: 600px;
            overflow-y: auto;
            font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
            font-size: 13px;
            line-height: 1.6;
        }

        .fullscreen-mode .diff-viewer,
        .fullscreen-mode .diff-list-viewer {
            max-height: none;
            height: 100%;
        }

        .diff-viewer::-webkit-scrollbar,
        .diff-list-viewer::-webkit-scrollbar {
            width: 10px;
        }

        .diff-viewer::-webkit-scrollbar-track,
        .diff-list-viewer::-webkit-scrollbar-track {
            background: var(--bg-secondary);
        }

        .diff-viewer::-webkit-scrollbar-thumb,
        .diff-list-viewer::-webkit-scrollbar-thumb {
            background: var(--bg-tertiary);
            border-radius: 5px;
        }

        .diff-viewer::-webkit-scrollbar-thumb:hover,
        .diff-list-viewer::-webkit-scrollbar-thumb:hover {
            background: var(--bg-hover);
        }

        .diff-single-view {
            display: flex;
            flex-direction: column;
        }

        .diff-line {
            display: flex;
            align-items: flex-start;
            padding: 2px 0;
            border-left: 3px solid transparent;
            transition: background-color 0.1s;
        }

        .diff-line:hover {
            background-color: color-mix(in srgb, var(--accent-color) 5%, transparent);
        }

        .diff-line-number {
            display: inline-block;
            min-width: 50px;
            padding: 0 10px;
            text-align: right;
            color: var(--text-secondary);
            font-size: 11px;
            user-select: none;
            border-right: 1px solid var(--border-color);
            margin-right: 10px;
        }

        .diff-content {
            flex: 1;
            white-space: pre-wrap;
            word-break: break-word;
        }

        .diff-equal {
            color: var(--text-primary);
        }

        .diff-removed {
            background-color: color-mix(in srgb, #f48771 10%, transparent);
            border-left-color: #f48771;
            color: var(--text-primary);
        }

        .diff-added {
            background-color: color-mix(in srgb, #4ec9b0 10%, transparent);
            border-left-color: #4ec9b0;
            color: var(--text-primary);
        }

        .diff-modified {
            border-left-color: var(--accent-color);
        }

        .diff-modified-content {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 2px;
        }

        .diff-removed-line,
        .diff-added-line {
            padding: 2px 0;
            white-space: pre-wrap;
            word-break: break-word;
        }

        .diff-removed-line {
            background-color: color-mix(in srgb, #f48771 10%, transparent);
            color: var(--text-primary);
        }

        .diff-added-line {
            background-color: color-mix(in srgb, #4ec9b0 10%, transparent);
            color: var(--text-primary);
        }

        .diff-char-removed {
            background-color: color-mix(in srgb, #f48771 30%, transparent);
            text-decoration: line-through;
            color: #f48771;
        }

        .diff-char-added {
            background-color: color-mix(in srgb, #4ec9b0 30%, transparent);
            color: #4ec9b0;
            font-weight: 500;
        }

        .diff-empty-line {
            color: var(--text-disabled);
            font-style: italic;
        }

        .diff-stats {
            display: flex;
            gap: 20px;
            padding: 12px;
            background-color: var(--bg-tertiary);
            border-radius: 4px;
            margin-bottom: 15px;
            flex-wrap: wrap;
        }

        .diff-stat-item {
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .diff-stat-label {
            font-size: 12px;
            color: var(--text-secondary);
        }

        .diff-stat-value {
            font-size: 14px;
            font-weight: 600;
            color: var(--accent-color);
        }

        .diff-stat-removed {
            color: #f48771;
        }

        .diff-stat-added {
            color: #4ec9b0;
        }

        .diff-stat-modified {
            color: var(--accent-color);
        }

        .diff-stat-equal {
            color: var(--text-primary);
        }

        .diff-list-view {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }

        .diff-list-section {
            border: 1px solid var(--border-color);
            border-radius: 4px;
            overflow: hidden;
        }

        .diff-section-title {
            padding: 10px 15px;
            margin: 0;
            font-size: 14px;
            font-weight: 600;
            border-bottom: 1px solid var(--border-color);
        }

        .diff-removed-title {
            background-color: color-mix(in srgb, #f48771 15%, transparent);
            color: #f48771;
            border-bottom-color: #f48771;
        }

        .diff-added-title {
            background-color: color-mix(in srgb, #4ec9b0 15%, transparent);
            color: #4ec9b0;
            border-bottom-color: #4ec9b0;
        }

        .diff-equal-title {
            background-color: color-mix(in srgb, var(--accent-color) 15%, transparent);
            color: var(--accent-color);
            border-bottom-color: var(--accent-color);
        }

        .diff-list-items {
            display: flex;
            flex-direction: column;
        }

        .diff-list-item {
            padding: 8px 15px;
            border-bottom: 1px solid var(--border-color);
            font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
            font-size: 12px;
            transition: background-color 0.1s;
        }

        .diff-list-item:last-child {
            border-bottom: none;
        }

        .diff-list-item:hover {
            background-color: color-mix(in srgb, var(--accent-color) 5%, transparent);
        }

        .diff-removed-item {
            background-color: color-mix(in srgb, #f48771 5%, transparent);
            color: var(--text-primary);
        }

        .diff-added-item {
            background-color: color-mix(in srgb, #4ec9b0 5%, transparent);
            color: var(--text-primary);
        }

        .diff-equal-item {
            color: var(--text-primary);
        }
    `,
    html: `
        <div class="tool-info">
            <i class="fas fa-info-circle" style="margin-right: 8px;"></i>
            Compare two texts or text lists and see the differences highlighted. Supports both single text comparison and list comparison modes.
        </div>
        <div class="tool-section">
            <div style="display: flex; gap: 10px; margin-bottom: 20px; border-bottom: 1px solid var(--border-color);">
                <button class="diff-mode-btn active" data-mode="single" onclick="switchDiffMode('single')">
                    <i class="fas fa-file-alt" style="margin-right: 6px;"></i>
                    Single Text
                </button>
                <button class="diff-mode-btn" data-mode="list" onclick="switchDiffMode('list')">
                    <i class="fas fa-list" style="margin-right: 6px;"></i>
                    Text Lists
                </button>
            </div>
            
            <!-- Single Text Mode -->
            <div id="diff-single-mode" class="diff-mode-content">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    <div class="tool-input-group">
                        <label for="diff-text1">
                            <i class="fas fa-file-alt" style="margin-right: 6px; color: var(--text-secondary);"></i>
                            Text 1
                        </label>
                        <textarea id="diff-text1" placeholder="Enter first text..."></textarea>
                    </div>
                    <div class="tool-input-group">
                        <label for="diff-text2">
                            <i class="fas fa-file-alt" style="margin-right: 6px; color: var(--text-secondary);"></i>
                            Text 2
                        </label>
                        <textarea id="diff-text2" placeholder="Enter second text..."></textarea>
                    </div>
                </div>
                <div style="margin-top: 15px;">
                    <button class="tool-button" onclick="compareTexts()">
                        <i class="fas fa-exchange-alt" style="margin-right: 6px;"></i>
                        Compare
                    </button>
                    <button class="tool-button secondary" onclick="clearDiff()">
                        <i class="fas fa-trash-alt" style="margin-right: 6px;"></i>
                        Clear
                    </button>
                </div>
                <div class="tool-input-group" style="margin-top: 20px;">
                    <label for="diff-output" style="display: flex; justify-content: space-between; align-items: center;">
                        <span><i class="fas fa-code-branch" style="margin-right: 6px; color: var(--text-secondary);"></i>Differences</span>
                        <button class="fullscreen-btn" onclick="enterDiffFullscreen('single')" title="Fullscreen">
                            <i class="fas fa-expand"></i>
                            <span>Fullscreen</span>
                        </button>
                    </label>
                    <div id="diff-output" class="diff-viewer" data-fullscreen-target="true">
                        <div class="tool-output empty">Differences will appear here...</div>
                    </div>
                </div>
            </div>
            
            <!-- List Comparison Mode -->
            <div id="diff-list-mode" class="diff-mode-content" style="display: none;">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    <div class="tool-input-group">
                        <label for="diff-list1">
                            <i class="fas fa-list" style="margin-right: 6px; color: var(--text-secondary);"></i>
                            List 1 (one per line)
                        </label>
                        <textarea id="diff-list1" placeholder="Enter first list, one item per line..."></textarea>
                    </div>
                    <div class="tool-input-group">
                        <label for="diff-list2">
                            <i class="fas fa-list" style="margin-right: 6px; color: var(--text-secondary);"></i>
                            List 2 (one per line)
                        </label>
                        <textarea id="diff-list2" placeholder="Enter second list, one item per line..."></textarea>
                    </div>
                </div>
                <div style="margin-top: 15px;">
                    <button class="tool-button" onclick="compareLists()">
                        <i class="fas fa-table" style="margin-right: 6px;"></i>
                        Compare Lists
                    </button>
                    <button class="tool-button secondary" onclick="clearDiffLists()">
                        <i class="fas fa-trash-alt" style="margin-right: 6px;"></i>
                        Clear
                    </button>
                </div>
                <div class="tool-input-group" style="margin-top: 20px;">
                    <label for="diff-list-output" style="display: flex; justify-content: space-between; align-items: center;">
                        <span><i class="fas fa-list" style="margin-right: 6px; color: var(--text-secondary);"></i>List Differences</span>
                        <button class="fullscreen-btn" onclick="enterDiffFullscreen('list')" title="Fullscreen">
                            <i class="fas fa-expand"></i>
                            <span>Fullscreen</span>
                        </button>
                    </label>
                    <div id="diff-list-output" class="diff-list-viewer" data-fullscreen-target="true">
                        <div class="tool-output empty">List differences will appear here...</div>
                    </div>
                </div>
            </div>
        </div>
    `,
    init() {
        function hexToRgba(hex, alpha) {
            if (!hex || !hex.startsWith('#')) return `rgba(0, 122, 204, ${alpha})`; 
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);
            return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        }
        
        function computeDiff(text1, text2) {
            const lines1 = text1.split('\n');
            const lines2 = text2.split('\n');
            
            const m = lines1.length;
            const n = lines2.length;
            const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
            
            for (let i = 1; i <= m; i++) {
                for (let j = 1; j <= n; j++) {
                    if (lines1[i - 1] === lines2[j - 1]) {
                        dp[i][j] = dp[i - 1][j - 1] + 1;
                    } else {
                        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                    }
                }
            }
            
            const diff = [];
            let i = m, j = n;
            let lineNum1 = m, lineNum2 = n;
            
            while (i > 0 || j > 0) {
                if (i > 0 && j > 0 && lines1[i - 1] === lines2[j - 1]) {
                    diff.unshift({
                        type: 'equal',
                        line1: lines1[i - 1],
                        line2: lines2[j - 1],
                        index1: i - 1,
                        index2: j - 1
                    });
                    i--;
                    j--;
                } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
                    diff.unshift({
                        type: 'added',
                        line1: '',
                        line2: lines2[j - 1],
                        index1: i,
                        index2: j - 1
                    });
                    j--;
                } else if (i > 0 && (j === 0 || dp[i - 1][j] >= dp[i][j - 1])) {
                    diff.unshift({
                        type: 'removed',
                        line1: lines1[i - 1],
                        line2: '',
                        index1: i - 1,
                        index2: j
                    });
                    i--;
                } else {
                    diff.unshift({
                        type: 'modified',
                        line1: lines1[i - 1],
                        line2: lines2[j - 1],
                        index1: i - 1,
                        index2: j - 1
                    });
                    i--;
                    j--;
                }
            }
            
            return diff;
        }
        
        function computeCharDiff(str1, str2) {
            const result = [];
            let i = 0, j = 0;
            
            while (i < str1.length || j < str2.length) {
                if (i >= str1.length) {
                    result.push({ type: 'added', char: str2[j] });
                    j++;
                } else if (j >= str2.length) {
                    result.push({ type: 'removed', char: str1[i] });
                    i++;
                } else if (str1[i] === str2[j]) {
                    result.push({ type: 'equal', char: str1[i] });
                    i++;
                    j++;
                } else {
                    let found = false;
                    for (let k = j + 1; k < Math.min(j + 10, str2.length); k++) {
                        if (str1[i] === str2[k]) {
                            while (j < k) {
                                result.push({ type: 'added', char: str2[j] });
                                j++;
                            }
                            found = true;
                            break;
                        }
                    }
                    if (!found) {
                        result.push({ type: 'removed', char: str1[i] });
                        i++;
                    }
                }
            }
            
            return result;
        }
        
        window.switchDiffMode = (mode) => {
            const singleMode = document.getElementById('diff-single-mode');
            const listMode = document.getElementById('diff-list-mode');
            const buttons = document.querySelectorAll('.diff-mode-btn');
            
            buttons.forEach(btn => {
                if (btn.dataset.mode === mode) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
            
            if (mode === 'single') {
                singleMode.style.display = 'block';
                listMode.style.display = 'none';
            } else {
                singleMode.style.display = 'none';
                listMode.style.display = 'block';
            }
        };
        
        window.compareTexts = () => {
            const text1 = document.getElementById('diff-text1').value;
            const text2 = document.getElementById('diff-text2').value;
            const output = document.getElementById('diff-output');
            
            if (!text1 && !text2) {
                ToolUtils.showNotification('Please enter at least one text to compare');
                return;
            }
            
            const diff = computeDiff(text1, text2);
            const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent-color').trim();
            
            let html = '<div class="diff-single-view">';
            
            diff.forEach(item => {
                if (item.type === 'equal') {
                    html += `<div class="diff-line diff-equal">
                        <span class="diff-line-number">${item.index1 + 1}:${item.index2 + 1}</span>
                        <span class="diff-content">${escapeHtml(item.line1)}</span>
                    </div>`;
                } else if (item.type === 'removed') {
                    html += `<div class="diff-line diff-removed">
                        <span class="diff-line-number">${item.index1 + 1}:-</span>
                        <span class="diff-content">${escapeHtml(item.line1)}</span>
                    </div>`;
                } else if (item.type === 'added') {
                    html += `<div class="diff-line diff-added">
                        <span class="diff-line-number">-:${item.index2 + 1}</span>
                        <span class="diff-content">${escapeHtml(item.line2)}</span>
                    </div>`;
                } else if (item.type === 'modified') {
                    const charDiff = computeCharDiff(item.line1, item.line2);
                    let line1Html = '';
                    let line2Html = '';
                    
                    charDiff.forEach(char => {
                        if (char.type === 'equal') {
                            line1Html += escapeHtml(char.char);
                            line2Html += escapeHtml(char.char);
                        } else if (char.type === 'removed') {
                            line1Html += `<span class="diff-char-removed">${escapeHtml(char.char)}</span>`;
                        } else if (char.type === 'added') {
                            line2Html += `<span class="diff-char-added">${escapeHtml(char.char)}</span>`;
                        }
                    });
                    
                    html += `<div class="diff-line diff-modified">
                        <span class="diff-line-number">${item.index1 + 1}:${item.index2 + 1}</span>
                        <div class="diff-modified-content">
                            <div class="diff-removed-line">${line1Html || '<span class="diff-empty-line">(empty)</span>'}</div>
                            <div class="diff-added-line">${line2Html || '<span class="diff-empty-line">(empty)</span>'}</div>
                        </div>
                    </div>`;
                }
            });
            
            html += '</div>';
            
            const stats = {
                equal: diff.filter(d => d.type === 'equal').length,
                removed: diff.filter(d => d.type === 'removed').length,
                added: diff.filter(d => d.type === 'added').length,
                modified: diff.filter(d => d.type === 'modified').length
            };
            
            const statsHtml = `
                <div class="diff-stats">
                    <div class="diff-stat-item">
                        <span class="diff-stat-label">Equal:</span>
                        <span class="diff-stat-value">${stats.equal}</span>
                    </div>
                    <div class="diff-stat-item">
                        <span class="diff-stat-label">Removed:</span>
                        <span class="diff-stat-value diff-stat-removed">${stats.removed}</span>
                    </div>
                    <div class="diff-stat-item">
                        <span class="diff-stat-label">Added:</span>
                        <span class="diff-stat-value diff-stat-added">${stats.added}</span>
                    </div>
                    <div class="diff-stat-item">
                        <span class="diff-stat-label">Modified:</span>
                        <span class="diff-stat-value diff-stat-modified">${stats.modified}</span>
                    </div>
                </div>
            `;
            
            output.innerHTML = statsHtml + html;
            ToolUtils.showNotification('Comparison complete', 1500);
        };
        
        window.compareLists = () => {
            const list1 = document.getElementById('diff-list1').value.trim();
            const list2 = document.getElementById('diff-list2').value.trim();
            const output = document.getElementById('diff-list-output');
            
            if (!list1 && !list2) {
                ToolUtils.showNotification('Please enter at least one list to compare');
                return;
            }
            
            const items1 = list1.split('\n').map(s => s.trim()).filter(s => s);
            const items2 = list2.split('\n').map(s => s.trim()).filter(s => s);
            
            const set1 = new Set(items1);
            const set2 = new Set(items2);
            
            const onlyIn1 = items1.filter(item => !set2.has(item));
            const onlyIn2 = items2.filter(item => !set1.has(item));
            const inBoth = items1.filter(item => set2.has(item));
            
            let html = '<div class="diff-list-view">';
            
            
            html += `
                <div class="diff-stats">
                    <div class="diff-stat-item">
                        <span class="diff-stat-label">List 1 items:</span>
                        <span class="diff-stat-value">${items1.length}</span>
                    </div>
                    <div class="diff-stat-item">
                        <span class="diff-stat-label">List 2 items:</span>
                        <span class="diff-stat-value">${items2.length}</span>
                    </div>
                    <div class="diff-stat-item">
                        <span class="diff-stat-label">In both:</span>
                        <span class="diff-stat-value diff-stat-equal">${inBoth.length}</span>
                    </div>
                    <div class="diff-stat-item">
                        <span class="diff-stat-label">Only in List 1:</span>
                        <span class="diff-stat-value diff-stat-removed">${onlyIn1.length}</span>
                    </div>
                    <div class="diff-stat-item">
                        <span class="diff-stat-label">Only in List 2:</span>
                        <span class="diff-stat-value diff-stat-added">${onlyIn2.length}</span>
                    </div>
                </div>
            `;
            
            
            if (onlyIn1.length > 0) {
                html += '<div class="diff-list-section"><h4 class="diff-section-title diff-removed-title">Only in List 1</h4><div class="diff-list-items">';
                onlyIn1.forEach(item => {
                    html += `<div class="diff-list-item diff-removed-item">${escapeHtml(item)}</div>`;
                });
                html += '</div></div>';
            }
            
            
            if (onlyIn2.length > 0) {
                html += '<div class="diff-list-section"><h4 class="diff-section-title diff-added-title">Only in List 2</h4><div class="diff-list-items">';
                onlyIn2.forEach(item => {
                    html += `<div class="diff-list-item diff-added-item">${escapeHtml(item)}</div>`;
                });
                html += '</div></div>';
            }
            
            
            if (inBoth.length > 0) {
                html += '<div class="diff-list-section"><h4 class="diff-section-title diff-equal-title">In Both Lists</h4><div class="diff-list-items">';
                inBoth.forEach(item => {
                    html += `<div class="diff-list-item diff-equal-item">${escapeHtml(item)}</div>`;
                });
                html += '</div></div>';
            }
            
            html += '</div>';
            
            output.innerHTML = html;
            ToolUtils.showNotification('List comparison complete', 1500);
        };
        
        window.clearDiff = () => {
            document.getElementById('diff-text1').value = '';
            document.getElementById('diff-text2').value = '';
            const output = document.getElementById('diff-output');
            output.innerHTML = '<div class="tool-output empty">Differences will appear here...</div>';
        };
        
        window.clearDiffLists = () => {
            document.getElementById('diff-list1').value = '';
            document.getElementById('diff-list2').value = '';
            const output = document.getElementById('diff-list-output');
            output.innerHTML = '<div class="tool-output empty">List differences will appear here...</div>';
        };
        
        function escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }
        
        window.enterDiffFullscreen = (mode) => {
            const app = window.toolkitApp;
            if (!app) return;
            
            let element;
            if (mode === 'single') {
                element = document.getElementById('diff-output');
            } else {
                element = document.getElementById('diff-list-output');
            }
            
            if (element && element.innerHTML.trim() && !element.querySelector('.tool-output.empty')) {
                app.enterFullscreen(element);
            } else {
                ToolUtils.showNotification('No differences to display in fullscreen');
            }
        };
    }
};

