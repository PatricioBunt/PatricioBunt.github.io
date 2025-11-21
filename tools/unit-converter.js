// Unit Converter Tool
export default {
    title: 'Unit Converter',
    html: `
        <div class="tool-info">
            Convert between different units of measurement (length, weight, temperature, etc.).
        </div>
        <div class="tool-section">
            <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 15px; align-items: end;">
                <div class="tool-input-group">
                    <label for="unit-value">Value</label>
                    <input type="number" id="unit-value" placeholder="Enter value">
                </div>
                <div style="padding-bottom: 20px;">
                    <i class="fas fa-exchange-alt" style="font-size: 24px; color: var(--text-secondary);"></i>
                </div>
                <div class="tool-input-group">
                    <label for="unit-result">Result</label>
                    <input type="text" id="unit-result" readonly placeholder="Result">
                </div>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                <div class="tool-input-group">
                    <label for="unit-from">From</label>
                    <select id="unit-from">
                        <option value="meter">Meter</option>
                        <option value="kilometer">Kilometer</option>
                        <option value="mile">Mile</option>
                        <option value="foot">Foot</option>
                    </select>
                </div>
                <div class="tool-input-group">
                    <label for="unit-to">To</label>
                    <select id="unit-to">
                        <option value="meter">Meter</option>
                        <option value="kilometer">Kilometer</option>
                        <option value="mile">Mile</option>
                        <option value="foot">Foot</option>
                    </select>
                </div>
            </div>
            <div>
                <button class="tool-button" onclick="convertUnit()">Convert</button>
                <button class="tool-button secondary" onclick="clearUnit()">Clear</button>
            </div>
        </div>
    `,
    init() {
        // Implementation coming soon
    }
};

