
export default {
    title: 'HTML Entity Encoder/Decoder',
    styles: `
        .html-entity-container {
            max-width: 900px;
            margin: 0 auto;
        }

        .html-entity-mode-toggle {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
            background: var(--bg-secondary);
            border: 1px solid var(--border-color);
            border-radius: 4px;
            padding: 5px;
        }

        .html-entity-mode-btn {
            flex: 1;
            padding: 10px;
            background: transparent;
            border: none;
            border-radius: 4px;
            color: var(--text-secondary);
            cursor: pointer;
            transition: all var(--transition-speed);
            font-weight: 600;
        }

        .html-entity-mode-btn.active {
            background: var(--accent-color);
            color: white;
        }

        .html-entity-mode-btn:hover:not(.active) {
            background: var(--bg-hover);
            color: var(--text-primary);
        }

        .html-entity-options {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 10px;
            margin-bottom: 20px;
        }

        .html-entity-option {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 10px;
            background: var(--bg-secondary);
            border: 1px solid var(--border-color);
            border-radius: 4px;
            cursor: pointer;
            transition: all var(--transition-speed);
        }

        .html-entity-option:hover {
            border-color: var(--accent-color);
            background: var(--bg-hover);
        }

        .html-entity-option input[type="checkbox"] {
            cursor: pointer;
        }

        .html-entity-option label {
            cursor: pointer;
            flex: 1;
            color: var(--text-primary);
            font-size: 13px;
        }

        .html-entity-stats {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 15px;
            margin-top: 20px;
        }

        .html-entity-stat {
            background: var(--bg-secondary);
            border: 1px solid var(--border-color);
            border-radius: 4px;
            padding: 12px;
            text-align: center;
        }

        .html-entity-stat-value {
            font-size: 24px;
            font-weight: bold;
            color: var(--accent-color);
            margin-bottom: 4px;
        }

        .html-entity-stat-label {
            font-size: 11px;
            color: var(--text-secondary);
        }
    `,
    html: `
        <div class="tool-info">
            <i class="fas fa-info-circle" style="margin-right: 8px;"></i>
            Encode text to HTML entities or decode HTML entities back to text. Supports named entities, numeric entities, and hexadecimal entities.
        </div>
        <div class="tool-section">
            <div class="html-entity-container">
                <div class="html-entity-mode-toggle">
                    <button class="html-entity-mode-btn active" onclick="setMode('encode')" id="encode-btn">
                        <i class="fas fa-lock" style="margin-right: 6px;"></i>
                        Encode
                    </button>
                    <button class="html-entity-mode-btn" onclick="setMode('decode')" id="decode-btn">
                        <i class="fas fa-unlock" style="margin-right: 6px;"></i>
                        Decode
                    </button>
                </div>

                <div id="encode-options" class="html-entity-options">
                    <div class="html-entity-option">
                        <input type="checkbox" id="encode-named" checked>
                        <label for="encode-named">Named Entities (&amp;nbsp;)</label>
                    </div>
                    <div class="html-entity-option">
                        <input type="checkbox" id="encode-numeric">
                        <label for="encode-numeric">Numeric Entities (&#160;)</label>
                    </div>
                    <div class="html-entity-option">
                        <input type="checkbox" id="encode-hex">
                        <label for="encode-hex">Hexadecimal Entities (&#xA0;)</label>
                    </div>
                    <div class="html-entity-option">
                        <input type="checkbox" id="encode-all" checked>
                        <label for="encode-all">Encode All Characters</label>
                    </div>
                </div>

                <div id="decode-options" class="html-entity-options" style="display: none;">
                    <div class="html-entity-option">
                        <input type="checkbox" id="decode-named" checked>
                        <label for="decode-named">Named Entities</label>
                    </div>
                    <div class="html-entity-option">
                        <input type="checkbox" id="decode-numeric" checked>
                        <label for="decode-numeric">Numeric Entities</label>
                    </div>
                    <div class="html-entity-option">
                        <input type="checkbox" id="decode-hex" checked>
                        <label for="decode-hex">Hexadecimal Entities</label>
                    </div>
                </div>

                <div class="tool-input-group">
                    <label for="html-entity-input">Input</label>
                    <textarea id="html-entity-input" placeholder="Enter text to encode or decode..." style="min-height: 150px;"></textarea>
                </div>

                <div style="display: flex; gap: 10px; margin-bottom: 20px;">
                    <button class="tool-button" onclick="processHtmlEntity()" id="process-btn">
                        <i class="fas fa-exchange-alt" style="margin-right: 6px;"></i>
                        Encode
                    </button>
                    <button class="tool-button secondary" onclick="clearHtmlEntity()">Clear</button>
                    <button class="tool-button secondary" onclick="copyHtmlEntity()">Copy Output</button>
                </div>

                <div class="tool-input-group">
                    <label for="html-entity-output">Output</label>
                    <textarea id="html-entity-output" readonly placeholder="Output will appear here..." style="min-height: 150px;"></textarea>
                </div>

                <div class="html-entity-stats">
                    <div class="html-entity-stat">
                        <div class="html-entity-stat-value" id="stat-input-length">0</div>
                        <div class="html-entity-stat-label">Input Length</div>
                    </div>
                    <div class="html-entity-stat">
                        <div class="html-entity-stat-value" id="stat-output-length">0</div>
                        <div class="html-entity-stat-label">Output Length</div>
                    </div>
                    <div class="html-entity-stat">
                        <div class="html-entity-stat-value" id="stat-entities-count">0</div>
                        <div class="html-entity-stat-label">Entities Found</div>
                    </div>
                </div>
            </div>
        </div>
    `,
    init() {
        let currentMode = 'encode';

        const htmlEntities = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&apos;',
            ' ': '&nbsp;',
            '©': '&copy;',
            '®': '&reg;',
            '™': '&trade;',
            '€': '&euro;',
            '£': '&pound;',
            '¥': '&yen;',
            '¢': '&cent;',
            '§': '&sect;',
            '¶': '&para;',
            '°': '&deg;',
            '±': '&plusmn;',
            '×': '&times;',
            '÷': '&divide;',
            '½': '&frac12;',
            '¼': '&frac14;',
            '¾': '&frac34;',
            '¿': '&iquest;',
            '¡': '&iexcl;',
            '«': '&laquo;',
            '»': '&raquo;',
            '–': '&ndash;',
            '—': '&mdash;',
            '…': '&hellip;',
            '•': '&bull;',
            '†': '&dagger;',
            '‡': '&Dagger;',
            '‰': '&permil;',
            '′': '&prime;',
            '″': '&Prime;',
            '‹': '&lsaquo;',
            '›': '&rsaquo;',
            '‚': '&sbquo;',
            '„': '&bdquo;',
            '\u2018': '&lsquo;',
            '\u2019': '&rsquo;',
            '\u201C': '&ldquo;',
            '\u201D': '&rdquo;',
            'Á': '&Aacute;',
            'á': '&aacute;',
            'À': '&Agrave;',
            'à': '&agrave;',
            'Â': '&Acirc;',
            'â': '&acirc;',
            'Ã': '&Atilde;',
            'ã': '&atilde;',
            'Ä': '&Auml;',
            'ä': '&auml;',
            'Å': '&Aring;',
            'å': '&aring;',
            'Æ': '&AElig;',
            'æ': '&aelig;',
            'Ç': '&Ccedil;',
            'ç': '&ccedil;',
            'É': '&Eacute;',
            'é': '&eacute;',
            'È': '&Egrave;',
            'è': '&egrave;',
            'Ê': '&Ecirc;',
            'ê': '&ecirc;',
            'Ë': '&Euml;',
            'ë': '&euml;',
            'Í': '&Iacute;',
            'í': '&iacute;',
            'Ì': '&Igrave;',
            'ì': '&igrave;',
            'Î': '&Icirc;',
            'î': '&icirc;',
            'Ï': '&Iuml;',
            'ï': '&iuml;',
            'Ñ': '&Ntilde;',
            'ñ': '&ntilde;',
            'Ó': '&Oacute;',
            'ó': '&oacute;',
            'Ò': '&Ograve;',
            'ò': '&ograve;',
            'Ô': '&Ocirc;',
            'ô': '&ocirc;',
            'Õ': '&Otilde;',
            'õ': '&otilde;',
            'Ö': '&Ouml;',
            'ö': '&ouml;',
            'Ø': '&Oslash;',
            'ø': '&oslash;',
            'Ú': '&Uacute;',
            'ú': '&uacute;',
            'Ù': '&Ugrave;',
            'ù': '&ugrave;',
            'Û': '&Ucirc;',
            'û': '&ucirc;',
            'Ü': '&Uuml;',
            'ü': '&uuml;',
            'Ý': '&Yacute;',
            'ý': '&yacute;',
            'Þ': '&THORN;',
            'þ': '&thorn;',
            'ß': '&szlig;',
            'Ÿ': '&Yuml;',
            'ÿ': '&yuml;'
        };

        const reverseEntities = {};
        Object.keys(htmlEntities).forEach(key => {
            reverseEntities[htmlEntities[key]] = key;
        });

        function getNamedEntity(char) {
            return htmlEntities[char] || null;
        }

        function getNumericEntity(char, hex = false) {
            const code = char.charCodeAt(0);
            return hex ? `&#x${code.toString(16).toUpperCase()};` : `&#${code};`;
        }

        function encodeHtmlEntity(text) {
            const useNamed = document.getElementById('encode-named').checked;
            const useNumeric = document.getElementById('encode-numeric').checked;
            const useHex = document.getElementById('encode-hex').checked;
            const encodeAll = document.getElementById('encode-all').checked;

            let result = '';
            let entityCount = 0;

            for (let i = 0; i < text.length; i++) {
                const char = text[i];
                let encoded = null;

                if (useNamed) {
                    const named = getNamedEntity(char);
                    if (named) {
                        encoded = named;
                        entityCount++;
                    }
                }

                if (!encoded && (useNumeric || useHex)) {
                    if (encodeAll || getNamedEntity(char)) {
                        if (useHex) {
                            encoded = getNumericEntity(char, true);
                        } else if (useNumeric) {
                            encoded = getNumericEntity(char, false);
                        }
                        if (encoded) entityCount++;
                    }
                }

                result += encoded || char;
            }

            return { text: result, count: entityCount };
        }

        function decodeHtmlEntity(text) {
            const decodeNamed = document.getElementById('decode-named').checked;
            const decodeNumeric = document.getElementById('decode-numeric').checked;
            const decodeHex = document.getElementById('decode-hex').checked;

            let result = text;
            let entityCount = 0;

            if (decodeNamed) {
                const tempDiv = document.createElement('div');
                const namedRegex = /&[a-zA-Z][a-zA-Z0-9]{1,31};/g;
                const matches = result.match(namedRegex);
                if (matches) {
                    entityCount += matches.length;
                    matches.forEach(entity => {
                        tempDiv.innerHTML = entity;
                        const decoded = tempDiv.textContent;
                        if (decoded !== entity) {
                            result = result.replace(entity, decoded);
                        }
                    });
                }
            }

            if (decodeNumeric) {
                const numericRegex = /&#(\d+);/g;
                const matches = result.match(numericRegex);
                if (matches) {
                    entityCount += matches.length;
                    result = result.replace(numericRegex, (match, num) => {
                        return String.fromCharCode(parseInt(num, 10));
                    });
                }
            }

            if (decodeHex) {
                const hexRegex = /&#x([0-9A-Fa-f]+);/g;
                const matches = result.match(hexRegex);
                if (matches) {
                    entityCount += matches.length;
                    result = result.replace(hexRegex, (match, hex) => {
                        return String.fromCharCode(parseInt(hex, 16));
                    });
                }
            }

            return { text: result, count: entityCount };
        }

        function updateStats(inputText, outputText, entityCount) {
            document.getElementById('stat-input-length').textContent = inputText.length;
            document.getElementById('stat-output-length').textContent = outputText.length;
            document.getElementById('stat-entities-count').textContent = entityCount;
        }

        window.setMode = (mode) => {
            currentMode = mode;
            const encodeBtn = document.getElementById('encode-btn');
            const decodeBtn = document.getElementById('decode-btn');
            const encodeOptions = document.getElementById('encode-options');
            const decodeOptions = document.getElementById('decode-options');
            const processBtn = document.getElementById('process-btn');

            if (mode === 'encode') {
                encodeBtn.classList.add('active');
                decodeBtn.classList.remove('active');
                encodeOptions.style.display = 'grid';
                decodeOptions.style.display = 'none';
                processBtn.innerHTML = '<i class="fas fa-exchange-alt" style="margin-right: 6px;"></i> Encode';
            } else {
                encodeBtn.classList.remove('active');
                decodeBtn.classList.add('active');
                encodeOptions.style.display = 'none';
                decodeOptions.style.display = 'grid';
                processBtn.innerHTML = '<i class="fas fa-exchange-alt" style="margin-right: 6px;"></i> Decode';
            }
        };

        window.processHtmlEntity = () => {
            const input = document.getElementById('html-entity-input').value;
            const output = document.getElementById('html-entity-output');

            if (!input) {
                ToolUtils.showNotification('Please enter some text');
                return;
            }

            try {
                let result;
                if (currentMode === 'encode') {
                    result = encodeHtmlEntity(input);
                } else {
                    result = decodeHtmlEntity(input);
                }

                output.value = result.text;
                updateStats(input, result.text, result.count);
            } catch (error) {
                output.value = `Error: ${error.message}`;
                ToolUtils.showNotification(`Error: ${error.message}`, 3000);
            }
        };

        window.clearHtmlEntity = () => {
            document.getElementById('html-entity-input').value = '';
            document.getElementById('html-entity-output').value = '';
            updateStats('', '', 0);
        };

        window.copyHtmlEntity = () => {
            const output = document.getElementById('html-entity-output').value;
            if (output) {
                ToolUtils.copyToClipboard(output);
            } else {
                ToolUtils.showNotification('No output to copy');
            }
        };

        const input = document.getElementById('html-entity-input');
        if (input) {
            input.addEventListener('input', () => {
                if (input.value.trim()) {
                    processHtmlEntity();
                } else {
                    document.getElementById('html-entity-output').value = '';
                    updateStats('', '', 0);
                }
            });
        }
    }
};
