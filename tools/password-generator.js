
export default {
    title: 'Password Generator',
    html: `
        <div class="tool-info">
            Generate secure random passwords with customizable length and character sets.
        </div>
        <div class="tool-section">
            <div class="tool-input-group">
                <label for="password-length">Password Length</label>
                <input type="number" id="password-length" value="16" min="4" max="128">
            </div>
            <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 10px; color: var(--text-secondary); font-size: 13px;">Include:</label>
                <div style="display: flex; flex-direction: column; gap: 8px;">
                    <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                        <input type="checkbox" id="include-uppercase" checked>
                        <span>Uppercase letters (A-Z)</span>
                    </label>
                    <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                        <input type="checkbox" id="include-lowercase" checked>
                        <span>Lowercase letters (a-z)</span>
                    </label>
                    <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                        <input type="checkbox" id="include-numbers" checked>
                        <span>Numbers (0-9)</span>
                    </label>
                    <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                        <input type="checkbox" id="include-symbols" checked>
                        <span>Symbols (!@#$%^&*)</span>
                    </label>
                </div>
            </div>
            <div>
                <button class="tool-button" onclick="generatePassword()">Generate Password</button>
                <button class="tool-button secondary" onclick="copyPassword()">Copy Password</button>
            </div>
            <div class="tool-input-group">
                <label for="password-output">Generated Password</label>
                <input type="text" id="password-output" readonly placeholder="Generated password will appear here..." style="font-family: monospace; font-size: 16px;">
            </div>
        </div>
    `,
    init() {
        window.generatePassword = () => {
            const length = parseInt(document.getElementById('password-length').value) || 16;
            const includeUpper = document.getElementById('include-uppercase').checked;
            const includeLower = document.getElementById('include-lowercase').checked;
            const includeNumbers = document.getElementById('include-numbers').checked;
            const includeSymbols = document.getElementById('include-symbols').checked;
            
            let charset = '';
            if (includeUpper) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            if (includeLower) charset += 'abcdefghijklmnopqrstuvwxyz';
            if (includeNumbers) charset += '0123456789';
            if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
            
            if (!charset) {
                ToolUtils.showNotification('Please select at least one character set');
                return;
            }
            
            let password = '';
            const array = new Uint8Array(length);
            crypto.getRandomValues(array);
            
            for (let i = 0; i < length; i++) {
                password += charset[array[i] % charset.length];
            }
            
            document.getElementById('password-output').value = password;
        };
        
        window.copyPassword = () => {
            const password = document.getElementById('password-output').value;
            if (password) {
                ToolUtils.copyToClipboard(password);
            } else {
                ToolUtils.showNotification('Generate a password first');
            }
        };
        
        setTimeout(() => generatePassword(), 100);
    }
};

