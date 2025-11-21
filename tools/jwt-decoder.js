// JWT Decoder Tool
export default {
    title: 'JWT Decoder',
    html: `
        <div class="tool-info">
            Decode and inspect JWT (JSON Web Token) tokens. Paste a JWT to see its header and payload.
        </div>
        <div class="tool-section">
            <div class="tool-input-group">
                <label for="jwt-input">JWT Token</label>
                <textarea id="jwt-input" placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."></textarea>
            </div>
            <div>
                <button class="tool-button" onclick="decodeJWT()">Decode JWT</button>
                <button class="tool-button secondary" onclick="clearJWT()">Clear</button>
            </div>
            <div class="tool-input-group">
                <label for="jwt-header">Header</label>
                <textarea id="jwt-header" readonly placeholder="Header will appear here..."></textarea>
            </div>
            <div class="tool-input-group">
                <label for="jwt-payload">Payload</label>
                <textarea id="jwt-payload" readonly placeholder="Payload will appear here..."></textarea>
            </div>
        </div>
    `,
    init() {
        window.decodeJWT = () => {
            const input = document.getElementById('jwt-input').value.trim();
            const headerOutput = document.getElementById('jwt-header');
            const payloadOutput = document.getElementById('jwt-payload');
            
            if (!input) {
                ToolUtils.showNotification('Please enter a JWT token');
                return;
            }
            
            try {
                const parts = input.split('.');
                if (parts.length !== 3) {
                    throw new Error('Invalid JWT format. Expected 3 parts separated by dots.');
                }
                
                // Decode header
                const header = JSON.parse(atob(parts[0].replace(/-/g, '+').replace(/_/g, '/')));
                headerOutput.value = JSON.stringify(header, null, 2);
                
                // Decode payload
                const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
                payloadOutput.value = JSON.stringify(payload, null, 2);
            } catch (error) {
                headerOutput.value = `Error: ${error.message}`;
                payloadOutput.value = '';
            }
        };
        
        window.clearJWT = () => {
            document.getElementById('jwt-input').value = '';
            document.getElementById('jwt-header').value = '';
            document.getElementById('jwt-payload').value = '';
        };
    }
};

