
export default {
    title: 'Color Picker',
    styles: `
        /* Color Picker Styles */
        .color-picker-container {
            width: 100%;
            height: 60px;
            border: 2px solid var(--border-color);
            border-radius: 4px;
            background: var(--bg-secondary);
            transition: border-color var(--transition-speed);
            overflow: hidden;
        }

        .color-picker-container:hover {
            border-color: var(--accent-color);
        }

        .color-picker-container .pcr-button {
            width: 100%;
            height: 100%;
            border: none;
            border-radius: 2px;
        }

        /* Custom Pickr Theme Styling */
        .pcr-app[data-theme="monolith"] {
            background: var(--bg-secondary);
            border: 1px solid var(--border-color);
            border-radius: 4px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        .pcr-app[data-theme="monolith"] .pcr-selection {
            background: var(--bg-tertiary);
        }

        .pcr-app[data-theme="monolith"] .pcr-interaction input {
            background: var(--bg-tertiary);
            color: var(--text-primary);
            border: 1px solid var(--border-color);
        }

        .pcr-app[data-theme="monolith"] .pcr-interaction input:focus {
            border-color: var(--accent-color);
            outline: none;
        }

        .pcr-app[data-theme="monolith"] .pcr-result {
            background: var(--bg-tertiary);
            color: var(--text-primary);
            border: 1px solid var(--border-color);
        }

        .pcr-app[data-theme="monolith"] .pcr-swatches button {
            border: 1px solid var(--border-color);
        }

        .pcr-app[data-theme="monolith"] .pcr-clear,
        .pcr-app[data-theme="monolith"] .pcr-save {
            background: var(--accent-color);
            color: white;
        }

        .pcr-app[data-theme="monolith"] .pcr-clear:hover,
        .pcr-app[data-theme="monolith"] .pcr-save:hover {
            background: var(--accent-hover);
        }

        .pcr-app[data-theme="monolith"] .pcr-cancel {
            background: var(--bg-tertiary);
            color: var(--text-primary);
            border: 1px solid var(--border-color);
        }

        .pcr-app[data-theme="monolith"] .pcr-cancel:hover {
            background: var(--bg-hover);
        }
    `,
    html: `
        <div class="tool-info">
            <i class="fas fa-info-circle" style="margin-right: 8px;"></i>
            Pick colors and get their hex, RGB, HSL, and other format values.
        </div>
        <div class="tool-section">
            <div class="tool-input-group">
                <label for="color-picker-container">
                    <i class="fas fa-palette" style="margin-right: 6px; color: var(--text-secondary);"></i>
                    Pick a Color
                </label>
                <div id="color-picker-container" class="color-picker-container"></div>
            </div>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-top: 15px;">
                <div class="tool-input-group">
                    <label for="color-hex">HEX</label>
                    <input type="text" id="color-hex" readonly>
                </div>
                <div class="tool-input-group">
                    <label for="color-rgb">RGB</label>
                    <input type="text" id="color-rgb" readonly>
                </div>
                <div class="tool-input-group">
                    <label for="color-hsl">HSL</label>
                    <input type="text" id="color-hsl" readonly>
                </div>
                <div class="tool-input-group">
                    <label for="color-css">CSS</label>
                    <input type="text" id="color-css" readonly>
                </div>
            </div>
            <div>
                <button class="tool-button secondary" onclick="copyColorValue('hex')">Copy HEX</button>
                <button class="tool-button secondary" onclick="copyColorValue('rgb')">Copy RGB</button>
                <button class="tool-button secondary" onclick="copyColorValue('hsl')">Copy HSL</button>
            </div>
        </div>
    `,
    init() {
        const container = document.getElementById('color-picker-container');
        let pickrInstance = null;
        
        function updateColorValues(color) {
            if (!color) return;
            
            const hex = color.toHEXA().toString();
            const rgba = color.toRGBA();
            const hsla = color.toHSLA();
            
            document.getElementById('color-hex').value = hex.toUpperCase();
            document.getElementById('color-rgb').value = `rgb(${Math.round(rgba[0])}, ${Math.round(rgba[1])}, ${Math.round(rgba[2])})`;
            document.getElementById('color-hsl').value = `hsl(${Math.round(hsla[0])}, ${Math.round(hsla[1] * 100)}%, ${Math.round(hsla[2] * 100)}%)`;
            document.getElementById('color-css').value = `--color: ${hex};`;
        }
        
        if (window.Pickr) {
            pickrInstance = Pickr.create({
                el: container,
                theme: 'monolith',
                default: '#007acc',
                swatches: [
                    '#000000', '#ffffff', '#ff0000', '#00ff00', '#0000ff',
                    '#ffff00', '#00ffff', '#ff00ff', '#808080', '#ffa500'
                ],
                components: {
                    preview: true,
                    opacity: true,
                    hue: true,
                    interaction: {
                        hex: true,
                        rgba: true,
                        hsla: true,
                        hsva: false,
                        cmyk: false,
                        input: true,
                        clear: true,
                        save: true
                    }
                }
            });
            
            pickrInstance.on('change', (color) => {
                updateColorValues(color);
            });
            
            pickrInstance.on('save', (color) => {
                if (color) {
                    updateColorValues(color);
                    pickrInstance.hide();
                }
            });
            
            // Initialize with default color
            updateColorValues(pickrInstance.getColor());
        } else {
            console.error('Pickr library not loaded');
        }
        
        window.copyColorValue = (type) => {
            const value = document.getElementById(`color-${type}`).value;
            ToolUtils.copyToClipboard(value);
        };
    }
};

