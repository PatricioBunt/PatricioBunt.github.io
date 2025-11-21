// Keyboard Tester Tool
export default {
    title: 'Keyboard Tester',
    html: `
        <div class="tool-info">
            Test your keyboard. Press any key to see its key code, key name, and other information.
        </div>
        <div class="tool-section">
            <div class="tool-input-group">
                <label>Press any key on your keyboard</label>
                <div id="keyboard-display" style="background: var(--bg-secondary); border: 2px dashed var(--border-color); border-radius: 4px; padding: 40px; text-align: center; min-height: 200px; display: flex; align-items: center; justify-content: center; font-size: 48px; color: var(--accent-color);">
                    Press a key...
                </div>
            </div>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-top: 15px;">
                <div class="tool-input-group">
                    <label for="key-code">Key Code</label>
                    <input type="text" id="key-code" readonly>
                </div>
                <div class="tool-input-group">
                    <label for="key-name">Key Name</label>
                    <input type="text" id="key-name" readonly>
                </div>
                <div class="tool-input-group">
                    <label for="key-which">Which</label>
                    <input type="text" id="key-which" readonly>
                </div>
                <div class="tool-input-group">
                    <label for="key-location">Location</label>
                    <input type="text" id="key-location" readonly>
                </div>
            </div>
            <div class="tool-input-group" style="margin-top: 15px;">
                <label>Modifier Keys</label>
                <div style="display: flex; gap: 15px; margin-top: 10px;">
                    <div style="padding: 10px; background: var(--bg-secondary); border-radius: 4px; flex: 1; text-align: center;">
                        <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 5px;">Ctrl</div>
                        <div id="ctrl-status" style="font-size: 18px; color: var(--text-disabled);">-</div>
                    </div>
                    <div style="padding: 10px; background: var(--bg-secondary); border-radius: 4px; flex: 1; text-align: center;">
                        <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 5px;">Alt</div>
                        <div id="alt-status" style="font-size: 18px; color: var(--text-disabled);">-</div>
                    </div>
                    <div style="padding: 10px; background: var(--bg-secondary); border-radius: 4px; flex: 1; text-align: center;">
                        <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 5px;">Shift</div>
                        <div id="shift-status" style="font-size: 18px; color: var(--text-disabled);">-</div>
                    </div>
                    <div style="padding: 10px; background: var(--bg-secondary); border-radius: 4px; flex: 1; text-align: center;">
                        <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 5px;">Meta</div>
                        <div id="meta-status" style="font-size: 18px; color: var(--text-disabled);">-</div>
                    </div>
                </div>
            </div>
        </div>
    `,
    init() {
        const display = document.getElementById('keyboard-display');
        const keyCode = document.getElementById('key-code');
        const keyName = document.getElementById('key-name');
        const keyWhich = document.getElementById('key-which');
        const keyLocation = document.getElementById('key-location');
        
        function updateModifiers(event) {
            document.getElementById('ctrl-status').textContent = event.ctrlKey ? '✓' : '-';
            document.getElementById('ctrl-status').style.color = event.ctrlKey ? 'var(--accent-color)' : 'var(--text-disabled)';
            
            document.getElementById('alt-status').textContent = event.altKey ? '✓' : '-';
            document.getElementById('alt-status').style.color = event.altKey ? 'var(--accent-color)' : 'var(--text-disabled)';
            
            document.getElementById('shift-status').textContent = event.shiftKey ? '✓' : '-';
            document.getElementById('shift-status').style.color = event.shiftKey ? 'var(--accent-color)' : 'var(--text-disabled)';
            
            document.getElementById('meta-status').textContent = event.metaKey ? '✓' : '-';
            document.getElementById('meta-status').style.color = event.metaKey ? 'var(--accent-color)' : 'var(--text-disabled)';
        }
        
        function handleKeyPress(event) {
            event.preventDefault();
            
            const key = event.key;
            display.textContent = key === ' ' ? '[Space]' : key;
            display.style.borderColor = 'var(--accent-color)';
            
            keyCode.value = event.code || 'N/A';
            keyName.value = event.key || 'N/A';
            keyWhich.value = event.which || event.keyCode || 'N/A';
            
            const locations = ['Standard', 'Left', 'Right', 'Numpad'];
            keyLocation.value = locations[event.location] || 'N/A';
            
            updateModifiers(event);
        }
        
        window.addEventListener('keydown', handleKeyPress);
        
        // Also listen on the display area for focus
        display.addEventListener('click', () => {
            display.focus();
        });
        
        display.setAttribute('tabindex', '0');
    }
};

