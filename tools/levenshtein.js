// Levenshtein Distance Tool
export default {
    title: 'Levenshtein Distance',
    styles: `
        /* Levenshtein Distance Tool Styles */
        .levenshtein-mode-btn {
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

        .levenshtein-mode-btn:hover {
            color: var(--text-primary);
            background-color: var(--bg-hover);
        }

        .levenshtein-mode-btn.active {
            color: var(--accent-color);
            border-bottom-color: var(--accent-color);
            background-color: transparent;
        }

        .levenshtein-mode-content {
            animation: fadeIn 0.2s ease-in;
        }

        .levenshtein-matrix-container {
            background-color: var(--bg-secondary);
            border: 1px solid var(--border-color);
            border-radius: 4px;
            padding: 15px;
            min-height: 200px;
            max-height: 600px;
            overflow: auto;
        }

        .levenshtein-matrix-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 12px;
            font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
        }

        .levenshtein-matrix-table th {
            background-color: var(--bg-tertiary);
            color: var(--text-primary);
            padding: 8px 10px;
            text-align: center;
            font-weight: 600;
            border: 1px solid var(--border-color);
            position: sticky;
            top: 0;
            z-index: 10;
        }

        .levenshtein-matrix-table th:first-child {
            left: 0;
            z-index: 11;
            background-color: var(--bg-tertiary);
        }

        .levenshtein-matrix-table td {
            padding: 8px 10px;
            text-align: center;
            border: 1px solid var(--border-color);
            font-weight: 500;
            transition: background-color 0.2s;
        }

        .levenshtein-matrix-table tbody tr:hover td {
            background-color: var(--bg-hover) !important;
        }

        .levenshtein-matrix-table tbody tr th {
            background-color: var(--bg-tertiary);
            text-align: left;
            font-weight: 500;
            position: sticky;
            left: 0;
            z-index: 9;
            max-width: 200px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .levenshtein-matrix-table tbody tr:hover th {
            background-color: var(--bg-hover) !important;
        }
    `,
    html: `
        <div class="tool-info">
            <i class="fas fa-info-circle" style="margin-right: 8px;"></i>
            Calculate the Levenshtein distance (edit distance) between strings. This measures how many single-character edits are needed to change one string into another. Supports both single comparison and list comparison modes.
        </div>
        <div class="tool-section">
            <div style="display: flex; gap: 10px; margin-bottom: 20px; border-bottom: 1px solid var(--border-color);">
                <button class="levenshtein-mode-btn active" data-mode="single" onclick="switchLevenshteinMode('single')">
                    <i class="fas fa-exchange-alt" style="margin-right: 6px;"></i>
                    Single Comparison
                </button>
                <button class="levenshtein-mode-btn" data-mode="list" onclick="switchLevenshteinMode('list')">
                    <i class="fas fa-list" style="margin-right: 6px;"></i>
                    List Comparison
                </button>
            </div>
            
            <!-- Single Comparison Mode -->
            <div id="levenshtein-single-mode" class="levenshtein-mode-content">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    <div class="tool-input-group">
                        <label for="levenshtein-text1">
                            <i class="fas fa-font" style="margin-right: 6px; color: var(--text-secondary);"></i>
                            String 1
                        </label>
                        <input type="text" id="levenshtein-text1" placeholder="Enter first string...">
                    </div>
                    <div class="tool-input-group">
                        <label for="levenshtein-text2">
                            <i class="fas fa-font" style="margin-right: 6px; color: var(--text-secondary);"></i>
                            String 2
                        </label>
                        <input type="text" id="levenshtein-text2" placeholder="Enter second string...">
                    </div>
                </div>
                <div style="margin-top: 15px;">
                    <button class="tool-button" onclick="calculateLevenshtein()">
                        <i class="fas fa-calculator" style="margin-right: 6px;"></i>
                        Calculate Distance
                    </button>
                    <button class="tool-button secondary" onclick="clearLevenshtein()">
                        <i class="fas fa-trash-alt" style="margin-right: 6px;"></i>
                        Clear
                    </button>
                </div>
                <div class="tool-input-group" style="margin-top: 20px;">
                    <label for="levenshtein-output">Distance Result</label>
                    <div id="levenshtein-output" class="tool-output empty">Distance will appear here...</div>
                </div>
            </div>
            
            <!-- List Comparison Mode -->
            <div id="levenshtein-list-mode" class="levenshtein-mode-content" style="display: none;">
                <div class="tool-input-group">
                    <label for="levenshtein-list">
                        <i class="fas fa-list" style="margin-right: 6px; color: var(--text-secondary);"></i>
                        Text List (one per line)
                    </label>
                    <textarea id="levenshtein-list" placeholder="Enter strings, one per line...&#10;Example:&#10;hello&#10;world&#10;test"></textarea>
                </div>
                <div style="margin-top: 15px;">
                    <button class="tool-button" onclick="calculateLevenshteinList()">
                        <i class="fas fa-table" style="margin-right: 6px;"></i>
                        Calculate Distance Matrix
                    </button>
                    <button class="tool-button secondary" onclick="clearLevenshteinList()">
                        <i class="fas fa-trash-alt" style="margin-right: 6px;"></i>
                        Clear
                    </button>
                </div>
                <div class="tool-input-group" style="margin-top: 20px;">
                    <label for="levenshtein-matrix-output">Distance Matrix</label>
                    <div id="levenshtein-matrix-output" class="levenshtein-matrix-container">
                        <div class="tool-output empty">Distance matrix will appear here...</div>
                    </div>
                </div>
            </div>
        </div>
    `,
    init() {
        // Helper function to convert hex to rgba
        function hexToRgba(hex, alpha) {
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);
            return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        }
        
        function levenshteinDistance(str1, str2) {
            const m = str1.length;
            const n = str2.length;
            const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
            
            for (let i = 0; i <= m; i++) dp[i][0] = i;
            for (let j = 0; j <= n; j++) dp[0][j] = j;
            
            for (let i = 1; i <= m; i++) {
                for (let j = 1; j <= n; j++) {
                    if (str1[i - 1] === str2[j - 1]) {
                        dp[i][j] = dp[i - 1][j - 1];
                    } else {
                        dp[i][j] = Math.min(
                            dp[i - 1][j] + 1,     // deletion
                            dp[i][j - 1] + 1,     // insertion
                            dp[i - 1][j - 1] + 1  // substitution
                        );
                    }
                }
            }
            
            return dp[m][n];
        }
        
        window.switchLevenshteinMode = (mode) => {
            const singleMode = document.getElementById('levenshtein-single-mode');
            const listMode = document.getElementById('levenshtein-list-mode');
            const buttons = document.querySelectorAll('.levenshtein-mode-btn');
            
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
        
        window.calculateLevenshtein = () => {
            const str1 = document.getElementById('levenshtein-text1').value.trim();
            const str2 = document.getElementById('levenshtein-text2').value.trim();
            const output = document.getElementById('levenshtein-output');
            
            if (!str1 || !str2) {
                ToolUtils.showNotification('Please enter both strings');
                return;
            }
            
            const distance = levenshteinDistance(str1, str2);
            const maxLen = Math.max(str1.length, str2.length);
            const similarity = maxLen > 0 ? ((maxLen - distance) / maxLen * 100).toFixed(1) : 100;
            
            output.innerHTML = `
                <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 10px;">
                    <div style="flex: 1;">
                        <div style="font-size: 32px; font-weight: bold; color: var(--accent-color);">${distance}</div>
                        <div style="font-size: 12px; color: var(--text-secondary); margin-top: 4px;">Levenshtein Distance</div>
                    </div>
                    <div style="flex: 1; padding-left: 15px; border-left: 1px solid var(--border-color);">
                        <div style="font-size: 24px; font-weight: bold; color: var(--accent-color);">${similarity}%</div>
                        <div style="font-size: 12px; color: var(--text-secondary); margin-top: 4px;">Similarity</div>
                    </div>
                </div>
                <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid var(--border-color); font-size: 12px; color: var(--text-secondary);">
                    <div><strong>String 1:</strong> "${str1}" (${str1.length} chars)</div>
                    <div style="margin-top: 4px;"><strong>String 2:</strong> "${str2}" (${str2.length} chars)</div>
                </div>
            `;
            output.classList.remove('empty');
        };
        
        window.clearLevenshtein = () => {
            document.getElementById('levenshtein-text1').value = '';
            document.getElementById('levenshtein-text2').value = '';
            const output = document.getElementById('levenshtein-output');
            output.textContent = 'Distance will appear here...';
            output.classList.add('empty');
        };
        
        window.calculateLevenshteinList = () => {
            const listInput = document.getElementById('levenshtein-list').value.trim();
            const matrixOutput = document.getElementById('levenshtein-matrix-output');
            
            if (!listInput) {
                ToolUtils.showNotification('Please enter a list of strings');
                return;
            }
            
            const strings = listInput.split('\n')
                .map(s => s.trim())
                .filter(s => s.length > 0);
            
            if (strings.length < 2) {
                ToolUtils.showNotification('Please enter at least 2 strings');
                return;
            }
            
            if (strings.length > 20) {
                if (!confirm(`You have ${strings.length} strings. Calculating all pairwise distances may take a moment. Continue?`)) {
                    return;
                }
            }
            
            // Calculate distance matrix
            const matrix = [];
            const maxDistance = Math.max(...strings.map(s => s.length)) * strings.length;
            
            for (let i = 0; i < strings.length; i++) {
                matrix[i] = [];
                for (let j = 0; j < strings.length; j++) {
                    if (i === j) {
                        matrix[i][j] = 0;
                    } else if (i < j) {
                        matrix[i][j] = levenshteinDistance(strings[i], strings[j]);
                    } else {
                        matrix[i][j] = matrix[j][i]; // Symmetric matrix
                    }
                }
            }
            
            // Create table
            let tableHTML = '<div style="overflow-x: auto;"><table class="levenshtein-matrix-table">';
            
            // Header row
            tableHTML += '<thead><tr><th></th>';
            strings.forEach((str, idx) => {
                const displayStr = str.length > 15 ? str.substring(0, 12) + '...' : str;
                tableHTML += `<th title="${str}">${displayStr}</th>`;
            });
            tableHTML += '</tr></thead><tbody>';
            
            // Data rows
            strings.forEach((str, i) => {
                const displayStr = str.length > 15 ? str.substring(0, 12) + '...' : str;
                tableHTML += `<tr><th title="${str}">${displayStr}</th>`;
                strings.forEach((_, j) => {
                    const distance = matrix[i][j];
                    const intensity = i === j ? 0 : (1 - distance / maxDistance);
                    // Use accent color with opacity for background
                    const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent-color').trim();
                    const opacity = i === j ? 0 : (0.1 + intensity * 0.2);
                    const bgColor = i === j 
                        ? 'var(--bg-tertiary)' 
                        : hexToRgba(accentColor, opacity);
                    const textColor = i === j 
                        ? 'var(--text-disabled)' 
                        : distance === 0 
                            ? 'var(--accent-color)' 
                            : 'var(--text-primary)';
                    
                    tableHTML += `<td style="background-color: ${bgColor}; color: ${textColor};" title="Distance between "${str}" and "${strings[j]}": ${distance}">${distance}</td>`;
                });
                tableHTML += '</tr>';
            });
            
            tableHTML += '</tbody></table></div>';
            
            // Add summary
            const distances = [];
            for (let i = 0; i < strings.length; i++) {
                for (let j = i + 1; j < strings.length; j++) {
                    distances.push(matrix[i][j]);
                }
            }
            
            const minDist = Math.min(...distances);
            const maxDist = Math.max(...distances);
            const avgDist = (distances.reduce((a, b) => a + b, 0) / distances.length).toFixed(2);
            
            const summaryHTML = `
                <div style="margin-top: 15px; padding: 12px; background: var(--bg-tertiary); border-radius: 4px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; text-align: center;">
                    <div>
                        <div style="font-size: 18px; font-weight: bold; color: var(--accent-color);">${minDist}</div>
                        <div style="font-size: 11px; color: var(--text-secondary); margin-top: 4px;">Min Distance</div>
                    </div>
                    <div>
                        <div style="font-size: 18px; font-weight: bold; color: var(--accent-color);">${maxDist}</div>
                        <div style="font-size: 11px; color: var(--text-secondary); margin-top: 4px;">Max Distance</div>
                    </div>
                    <div>
                        <div style="font-size: 18px; font-weight: bold; color: var(--accent-color);">${avgDist}</div>
                        <div style="font-size: 11px; color: var(--text-secondary); margin-top: 4px;">Avg Distance</div>
                    </div>
                </div>
            `;
            
            matrixOutput.innerHTML = tableHTML + summaryHTML;
            ToolUtils.showNotification(`Calculated distances for ${strings.length} strings`, 2000);
        };
        
        window.clearLevenshteinList = () => {
            document.getElementById('levenshtein-list').value = '';
            const matrixOutput = document.getElementById('levenshtein-matrix-output');
            matrixOutput.innerHTML = '<div class="tool-output empty">Distance matrix will appear here...</div>';
        };
    }
};

