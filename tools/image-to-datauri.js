
export default {
    title: 'Image to Data URI',
    html: `
        <div class="tool-info">
            Convert an image file to a data URI (base64 encoded) that can be embedded directly in HTML/CSS.
        </div>
        <div class="tool-section">
            <div class="tool-input-group">
                <label for="image-input">Select Image</label>
                <input type="file" id="image-input" accept="image/*" style="padding: 10px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 4px; color: var(--text-primary);">
            </div>
            <div class="tool-input-group">
                <label>Preview</label>
                <div id="image-preview" style="background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 4px; padding: 15px; min-height: 200px; text-align: center;">
                    <p style="color: var(--text-disabled);">Image preview will appear here</p>
                </div>
            </div>
            <div class="tool-input-group">
                <label for="datauri-output">Data URI</label>
                <textarea id="datauri-output" readonly placeholder="Data URI will appear here..." style="min-height: 100px;"></textarea>
            </div>
            <div>
                <button class="tool-button secondary" onclick="copyDataURI()">Copy Data URI</button>
            </div>
        </div>
    `,
    init() {
        const input = document.getElementById('image-input');
        const preview = document.getElementById('image-preview');
        const output = document.getElementById('datauri-output');
        
        input.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;
            
            const reader = new FileReader();
            reader.onload = (event) => {
                const dataURI = event.target.result;
                output.value = dataURI;
                preview.innerHTML = `<img src="${dataURI}" style="max-width: 100%; max-height: 300px; border-radius: 4px;">`;
            };
            reader.readAsDataURL(file);
        });
        
        window.copyDataURI = () => {
            const dataURI = output.value;
            if (dataURI) {
                ToolUtils.copyToClipboard(dataURI);
            }
        };
    }
};

