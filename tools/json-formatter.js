// JSON Formatter Tool
export default {
    title: 'JSON Formatter',
    styles: `
        /* JSON Viewer Styles */
        .json-viewer {
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

        .fullscreen-mode .json-viewer,
        .fullscreen-mode #json-output {
            max-height: none;
            height: 100%;
        }

        .json-viewer::-webkit-scrollbar {
            width: 10px;
        }

        .json-viewer::-webkit-scrollbar-track {
            background: var(--bg-secondary);
        }

        .json-viewer::-webkit-scrollbar-thumb {
            background: var(--bg-tertiary);
            border-radius: 5px;
        }

        .json-viewer::-webkit-scrollbar-thumb:hover {
            background: var(--bg-hover);
        }

        .json-item {
            margin: 2px 0;
            position: relative;
            transition: background-color 0.1s;
        }

        .json-item:hover {
            background-color: color-mix(in srgb, var(--accent-color) 5%, transparent);
            border-radius: 2px;
        }

        .json-toggle {
            display: inline-block;
            width: 16px;
            height: 16px;
            line-height: 14px;
            text-align: center;
            cursor: pointer;
            user-select: none;
            color: var(--text-secondary);
            font-size: 10px;
            margin-right: 4px;
            transition: color var(--transition-speed);
            vertical-align: middle;
        }

        .json-toggle:hover {
            color: var(--accent-color);
        }

        .json-bracket {
            color: var(--text-primary);
            font-weight: 500;
            margin: 0 2px;
        }

        .json-key {
            color: #9cdcfe;
            font-weight: 500;
        }

        .json-string {
            color: #ce9178;
        }

        .json-number {
            color: #b5cea8;
        }

        .json-boolean {
            color: #569cd6;
        }

        .json-null {
            color: #569cd6;
            font-style: italic;
        }

        .json-content {
            margin-left: 20px;
            border-left: 1px solid var(--border-color);
            padding-left: 10px;
            margin-top: 2px;
            margin-bottom: 2px;
        }

        .json-viewer-empty {
            color: var(--text-disabled);
            font-style: italic;
            text-align: center;
            padding: 40px;
        }

        .json-viewer-error {
            color: #f48771;
            padding: 10px;
            background-color: rgba(244, 135, 113, 0.1);
            border-radius: 4px;
            border-left: 3px solid #f48771;
        }

        .json-viewer-success {
            color: #4ec9b0;
            padding: 10px;
            background-color: rgba(78, 201, 176, 0.1);
            border-radius: 4px;
            border-left: 3px solid #4ec9b0;
        }

        /* Light Theme JSON Colors */
        .theme-light .json-key {
            color: #0451a5;
        }

        .theme-light .json-string {
            color: #a31515;
        }

        .theme-light .json-number {
            color: #098658;
        }

        .theme-light .json-boolean,
        .theme-light .json-null {
            color: #0000ff;
        }
    `,
    html: `
        <div class="tool-info">
            <i class="fas fa-info-circle" style="margin-right: 8px;"></i>
            Format, validate, and minify JSON data. Paste your JSON below and use the buttons to format or minify it.
        </div>
        <div class="tool-section">
            <div class="tool-input-group">
                <label for="json-input">
                    <i class="fas fa-code" style="margin-right: 6px; color: var(--text-secondary);"></i>
                    JSON Input
                </label>
                <textarea id="json-input" placeholder='{"example": "paste your JSON here"}'></textarea>
            </div>
            <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 20px;">
                <button class="tool-button" onclick="formatJSON()">
                    <i class="fas fa-align-left" style="margin-right: 6px;"></i>
                    Format JSON
                </button>
                <button class="tool-button secondary" onclick="minifyJSON()">
                    <i class="fas fa-compress" style="margin-right: 6px;"></i>
                    Minify JSON
                </button>
                <button class="tool-button secondary" onclick="validateJSON()">
                    <i class="fas fa-check-circle" style="margin-right: 6px;"></i>
                    Validate
                </button>
                <button class="tool-button secondary" onclick="clearJSON()">
                    <i class="fas fa-trash-alt" style="margin-right: 6px;"></i>
                    Clear
                </button>
            </div>
            <div class="tool-input-group">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                    <label for="json-output" style="margin: 0;">
                        <i class="fas fa-file-code" style="margin-right: 6px; color: var(--text-secondary);"></i>
                        Formatted Output
                    </label>
                    <div style="display: flex; gap: 8px;">
                        <button class="fullscreen-btn" onclick="enterJSONFullscreen()" title="Fullscreen" style="padding: 6px 12px; font-size: 12px; margin: 0;">
                            <i class="fas fa-expand"></i>
                            <span>Fullscreen</span>
                        </button>
                        <button class="tool-button secondary" onclick="toggleJSONView()" id="toggle-view-btn" style="padding: 6px 12px; font-size: 12px; margin: 0;">
                            <i class="fas fa-eye" style="margin-right: 4px;"></i>
                            <span id="toggle-view-text">Tree View</span>
                        </button>
                        <button class="tool-button secondary" onclick="copyJSONOutput()" style="padding: 6px 12px; font-size: 12px; margin: 0;">
                            <i class="fas fa-copy" style="margin-right: 4px;"></i>
                            Copy
                        </button>
                    </div>
                </div>
                <div id="json-viewer" class="json-viewer" style="display: none;" data-fullscreen-target="true"></div>
                <textarea id="json-output" readonly placeholder="Formatted JSON will appear here..." style="display: none; min-height: 200px;" data-fullscreen-target="true"></textarea>
            </div>
        </div>
    `,
    init() {
        let currentJSON = null;
        let isViewMode = true;
        
        function renderJSONViewer(jsonObj, container, level = 0) {
            if (typeof jsonObj === 'object' && jsonObj !== null) {
                if (Array.isArray(jsonObj)) {
                    const arrayDiv = document.createElement('div');
                    arrayDiv.className = 'json-item';
                    
                    const headerDiv = document.createElement('div');
                    headerDiv.style.display = 'flex';
                    headerDiv.style.alignItems = 'center';
                    headerDiv.style.marginBottom = '2px';
                    
                    const toggle = document.createElement('span');
                    toggle.className = 'json-toggle';
                    toggle.textContent = '▼';
                    toggle.style.cursor = 'pointer';
                    
                    const bracket = document.createElement('span');
                    bracket.className = 'json-bracket';
                    bracket.textContent = '[';
                    bracket.style.marginRight = '4px';
                    
                    const countSpan = document.createElement('span');
                    countSpan.style.color = 'var(--text-secondary)';
                    countSpan.style.fontSize = '11px';
                    countSpan.style.marginLeft = '8px';
                    countSpan.textContent = `${jsonObj.length} ${jsonObj.length === 1 ? 'item' : 'items'}`;
                    
                    const contentDiv = document.createElement('div');
                    contentDiv.className = 'json-content';
                    contentDiv.style.display = 'block';
                    
                    jsonObj.forEach((item, index) => {
                        const itemDiv = document.createElement('div');
                        itemDiv.className = 'json-item';
                        itemDiv.style.paddingLeft = '8px';
                        
                        const indexSpan = document.createElement('span');
                        indexSpan.className = 'json-key';
                        indexSpan.textContent = `${index}: `;
                        itemDiv.appendChild(indexSpan);
                        renderJSONViewer(item, itemDiv, level + 1);
                        contentDiv.appendChild(itemDiv);
                    });
                    
                    const closeBracket = document.createElement('span');
                    closeBracket.className = 'json-bracket';
                    closeBracket.textContent = ']';
                    closeBracket.style.marginLeft = '4px';
                    
                    toggle.onclick = () => {
                        const isExpanded = contentDiv.style.display !== 'none';
                        toggle.textContent = isExpanded ? '▶' : '▼';
                        contentDiv.style.display = isExpanded ? 'none' : 'block';
                    };
                    
                    headerDiv.appendChild(toggle);
                    headerDiv.appendChild(bracket);
                    headerDiv.appendChild(countSpan);
                    
                    arrayDiv.appendChild(headerDiv);
                    arrayDiv.appendChild(contentDiv);
                    arrayDiv.appendChild(closeBracket);
                    container.appendChild(arrayDiv);
                } else {
                    const objDiv = document.createElement('div');
                    objDiv.className = 'json-item';
                    
                    const headerDiv = document.createElement('div');
                    headerDiv.style.display = 'flex';
                    headerDiv.style.alignItems = 'center';
                    headerDiv.style.marginBottom = '2px';
                    
                    const toggle = document.createElement('span');
                    toggle.className = 'json-toggle';
                    toggle.textContent = '▼';
                    toggle.style.cursor = 'pointer';
                    
                    const bracket = document.createElement('span');
                    bracket.className = 'json-bracket';
                    bracket.textContent = '{';
                    bracket.style.marginRight = '4px';
                    
                    const keys = Object.keys(jsonObj);
                    const countSpan = document.createElement('span');
                    countSpan.style.color = 'var(--text-secondary)';
                    countSpan.style.fontSize = '11px';
                    countSpan.style.marginLeft = '8px';
                    countSpan.textContent = `${keys.length} ${keys.length === 1 ? 'key' : 'keys'}`;
                    
                    const contentDiv = document.createElement('div');
                    contentDiv.className = 'json-content';
                    contentDiv.style.display = 'block';
                    
                    keys.forEach(key => {
                        const itemDiv = document.createElement('div');
                        itemDiv.className = 'json-item';
                        itemDiv.style.paddingLeft = '8px';
                        
                        const keySpan = document.createElement('span');
                        keySpan.className = 'json-key';
                        keySpan.textContent = `"${key}": `;
                        itemDiv.appendChild(keySpan);
                        renderJSONViewer(jsonObj[key], itemDiv, level + 1);
                        contentDiv.appendChild(itemDiv);
                    });
                    
                    const closeBracket = document.createElement('span');
                    closeBracket.className = 'json-bracket';
                    closeBracket.textContent = '}';
                    closeBracket.style.marginLeft = '4px';
                    
                    toggle.onclick = () => {
                        const isExpanded = contentDiv.style.display !== 'none';
                        toggle.textContent = isExpanded ? '▶' : '▼';
                        contentDiv.style.display = isExpanded ? 'none' : 'block';
                    };
                    
                    headerDiv.appendChild(toggle);
                    headerDiv.appendChild(bracket);
                    headerDiv.appendChild(countSpan);
                    
                    objDiv.appendChild(headerDiv);
                    objDiv.appendChild(contentDiv);
                    objDiv.appendChild(closeBracket);
                    container.appendChild(objDiv);
                }
            } else {
                const valueSpan = document.createElement('span');
                valueSpan.className = typeof jsonObj === 'string' ? 'json-string' : 
                                     typeof jsonObj === 'number' ? 'json-number' :
                                     jsonObj === null ? 'json-null' : 'json-boolean';
                const displayValue = typeof jsonObj === 'string' ? `"${jsonObj}"` : 
                                    jsonObj === null ? 'null' : 
                                    jsonObj === true ? 'true' : 
                                    jsonObj === false ? 'false' : 
                                    jsonObj;
                valueSpan.textContent = displayValue;
                container.appendChild(valueSpan);
            }
        }
        
        function updateJSONView(jsonString) {
            const viewer = document.getElementById('json-viewer');
            const output = document.getElementById('json-output');
            
            if (isViewMode) {
                viewer.style.display = 'block';
                output.style.display = 'none';
                viewer.innerHTML = '';
                try {
                    const jsonObj = JSON.parse(jsonString);
                    currentJSON = jsonObj;
                    renderJSONViewer(jsonObj, viewer);
                } catch (e) {
                    viewer.innerHTML = `<div class="json-viewer-error"><i class="fas fa-exclamation-circle" style="margin-right: 8px;"></i>Error: ${e.message}</div>`;
                }
            } else {
                viewer.style.display = 'none';
                output.style.display = 'block';
            }
        }
        
        window.formatJSON = () => {
            const input = document.getElementById('json-input').value.trim();
            const output = document.getElementById('json-output');
            const viewer = document.getElementById('json-viewer');
            
            if (!input) {
                output.value = '';
                viewer.innerHTML = '';
                ToolUtils.showNotification('Please enter JSON to format');
                return;
            }
            
            try {
                const formatted = ToolUtils.formatJSON(input, 2);
                output.value = formatted;
                output.style.borderColor = 'var(--border-color)';
                updateJSONView(formatted);
                ToolUtils.showNotification('JSON formatted successfully!', 1500);
            } catch (error) {
                output.value = `Error: ${error.message}`;
                output.style.borderColor = '#f48771';
                viewer.innerHTML = `<div class="json-viewer-error"><i class="fas fa-exclamation-circle" style="margin-right: 8px;"></i>Error: ${error.message}</div>`;
            }
        };
        
        window.minifyJSON = () => {
            const input = document.getElementById('json-input').value.trim();
            const output = document.getElementById('json-output');
            const viewer = document.getElementById('json-viewer');
            
            if (!input) {
                output.value = '';
                viewer.innerHTML = '';
                ToolUtils.showNotification('Please enter JSON to minify');
                return;
            }
            
            try {
                const obj = JSON.parse(input);
                const minified = JSON.stringify(obj);
                output.value = minified;
                output.style.borderColor = 'var(--border-color)';
                updateJSONView(minified);
                ToolUtils.showNotification('JSON minified successfully!', 1500);
            } catch (error) {
                output.value = `Error: ${error.message}`;
                output.style.borderColor = '#f48771';
                viewer.innerHTML = `<div class="json-viewer-error"><i class="fas fa-exclamation-circle" style="margin-right: 8px;"></i>Error: ${error.message}</div>`;
            }
        };
        
        window.validateJSON = () => {
            const input = document.getElementById('json-input').value.trim();
            const output = document.getElementById('json-output');
            const viewer = document.getElementById('json-viewer');
            
            if (!input) {
                ToolUtils.showNotification('Please enter JSON to validate');
                return;
            }
            
            try {
                JSON.parse(input);
                output.value = '✓ Valid JSON';
                output.style.borderColor = '#4ec9b0';
                viewer.innerHTML = '<div class="json-viewer-success"><i class="fas fa-check-circle" style="margin-right: 8px;"></i>Valid JSON</div>';
                ToolUtils.showNotification('JSON is valid!', 1500);
            } catch (error) {
                output.value = `✗ Invalid JSON: ${error.message}`;
                output.style.borderColor = '#f48771';
                viewer.innerHTML = `<div class="json-viewer-error"><i class="fas fa-times-circle" style="margin-right: 8px;"></i>Invalid JSON: ${error.message}</div>`;
            }
        };
        
        window.clearJSON = () => {
            document.getElementById('json-input').value = '';
            document.getElementById('json-output').value = '';
            const viewer = document.getElementById('json-viewer');
            viewer.innerHTML = '';
            viewer.style.display = 'none';
            document.getElementById('json-output').style.display = 'none';
            ToolUtils.showNotification('Cleared', 1000);
        };
        
        window.copyJSONOutput = () => {
            const output = document.getElementById('json-output');
            const viewer = document.getElementById('json-viewer');
            const text = isViewMode && currentJSON ? JSON.stringify(currentJSON, null, 2) : output.value;
            if (text) {
                ToolUtils.copyToClipboard(text);
            } else {
                ToolUtils.showNotification('No output to copy');
            }
        };
        
        window.toggleJSONView = () => {
            isViewMode = !isViewMode;
            const output = document.getElementById('json-output');
            const viewer = document.getElementById('json-viewer');
            const toggleBtn = document.getElementById('toggle-view-btn');
            const toggleText = document.getElementById('toggle-view-text');
            const toggleIcon = toggleBtn.querySelector('i');
            
            if (isViewMode) {
                toggleIcon.className = 'fas fa-eye';
                toggleText.textContent = 'Tree View';
                if (output.value) {
                    updateJSONView(output.value);
                } else {
                    viewer.style.display = 'block';
                    output.style.display = 'none';
                    viewer.innerHTML = '<div class="json-viewer-empty">No JSON to display. Format or paste JSON to see tree view.</div>';
                }
            } else {
                toggleIcon.className = 'fas fa-code';
                toggleText.textContent = 'Raw Text';
                viewer.style.display = 'none';
                output.style.display = 'block';
            }
        };
        
        // Initialize with tree view showing empty state
        setTimeout(() => {
            const viewer = document.getElementById('json-viewer');
            const output = document.getElementById('json-output');
            if (viewer && output) {
                viewer.style.display = 'block';
                output.style.display = 'none';
                viewer.innerHTML = '<div class="json-viewer-empty">No JSON to display. Format or paste JSON to see tree view.</div>';
            }
        }, 100);
        
        window.enterJSONFullscreen = () => {
            const app = window.toolkitApp;
            if (!app) return;
            
            const viewer = document.getElementById('json-viewer');
            const output = document.getElementById('json-output');
            const element = (viewer && viewer.style.display !== 'none') ? viewer : output;
            
            if (element && (viewer.innerHTML.trim() || output.value.trim())) {
                app.enterFullscreen(element);
            } else {
                ToolUtils.showNotification('No JSON output to display in fullscreen');
            }
        };
    }
};

