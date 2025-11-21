// Color Picker Tool
export default {
    title: 'Color Picker',
    styles: `
        /* Color Picker Styles */
        .color-picker-input {
            width: 100%;
            height: 60px;
            cursor: pointer;
            border: 2px solid var(--border-color);
            border-radius: 4px;
            background: var(--bg-secondary);
            padding: 4px;
            transition: border-color var(--transition-speed);
        }

        .color-picker-input:hover {
            border-color: var(--accent-color);
        }

        .color-picker-input:focus {
            outline: none;
            border-color: var(--accent-color);
        }

        /* Style the color picker's color swatch */
        .color-picker-input::-webkit-color-swatch-wrapper {
            padding: 0;
            border: none;
            border-radius: 2px;
        }

        .color-picker-input::-webkit-color-swatch {
            border: 1px solid var(--border-color);
            border-radius: 2px;
        }

        .color-picker-inline {
            margin-left: auto;
            width: 30px;
            height: 20px;
            border: 1px solid var(--border-color);
            border-radius: 3px;
            cursor: pointer;
            background: transparent;
            padding: 0;
        }

        .color-picker-inline::-webkit-color-swatch-wrapper {
            padding: 0;
        }

        .color-picker-inline::-webkit-color-swatch {
            border: none;
            border-radius: 3px;
        }
    `,
    html: `
        <div class="tool-info">
            <i class="fas fa-info-circle" style="margin-right: 8px;"></i>
            Pick colors and get their hex, RGB, HSL, and other format values.
        </div>
        <div class="tool-section">
            <div class="tool-input-group">
                <label for="color-picker">
                    <i class="fas fa-palette" style="margin-right: 6px; color: var(--text-secondary);"></i>
                    Pick a Color
                </label>
                <input type="color" id="color-picker" value="#007acc" class="color-picker-input">
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
        const picker = document.getElementById('color-picker');
        
        function updateColorValues() {
            const hex = picker.value;
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);
            
            document.getElementById('color-hex').value = hex.toUpperCase();
            document.getElementById('color-rgb').value = `rgb(${r}, ${g}, ${b})`;
            
            // Convert to HSL
            const rNorm = r / 255;
            const gNorm = g / 255;
            const bNorm = b / 255;
            const max = Math.max(rNorm, gNorm, bNorm);
            const min = Math.min(rNorm, gNorm, bNorm);
            const delta = max - min;
            
            let h = 0;
            if (delta !== 0) {
                if (max === rNorm) {
                    h = ((gNorm - bNorm) / delta) % 6;
                } else if (max === gNorm) {
                    h = (bNorm - rNorm) / delta + 2;
                } else {
                    h = (rNorm - gNorm) / delta + 4;
                }
                h = Math.round(h * 60);
                if (h < 0) h += 360;
            }
            
            const l = (max + min) / 2;
            const s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
            
            document.getElementById('color-hsl').value = `hsl(${h}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
            document.getElementById('color-css').value = `--color: ${hex};`;
        }
        
        picker.addEventListener('input', updateColorValues);
        updateColorValues();
        
        window.copyColorValue = (type) => {
            const value = document.getElementById(`color-${type}`).value;
            ToolUtils.copyToClipboard(value);
        };
    }
};

