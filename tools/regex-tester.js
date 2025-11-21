// Regex Tester Tool
export default {
    title: 'Regex Tester',
    styles: `
        /* Regex Tester Styles */
        .regex-examples-container {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 10px;
            margin-bottom: 15px;
        }

        .regex-example-btn {
            padding: 12px;
            background-color: var(--bg-secondary);
            border: 1px solid var(--border-color);
            border-radius: 4px;
            cursor: pointer;
            transition: all var(--transition-speed);
            text-align: left;
            font-size: 12px;
            color: var(--text-primary);
        }

        .regex-example-btn:hover {
            background-color: var(--bg-hover);
            border-color: var(--accent-color);
            transform: translateY(-2px);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }

        .regex-output-container {
            background-color: var(--bg-secondary);
            border: 1px solid var(--border-color);
            border-radius: 4px;
            padding: 15px;
            min-height: 200px;
            max-height: 600px;
            overflow-y: auto;
            font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
            font-size: 13px;
        }

        .regex-output-container::-webkit-scrollbar {
            width: 10px;
        }

        .regex-output-container::-webkit-scrollbar-track {
            background: var(--bg-secondary);
        }

        .regex-output-container::-webkit-scrollbar-thumb {
            background: var(--bg-tertiary);
            border-radius: 5px;
        }

        .regex-output-container::-webkit-scrollbar-thumb:hover {
            background: var(--bg-hover);
        }

        .regex-result-header {
            padding: 15px;
            background-color: var(--bg-tertiary);
            border-radius: 4px;
            margin-bottom: 15px;
        }

        .regex-matches-container {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }

        .regex-highlighted-text {
            border: 1px solid var(--border-color);
            border-radius: 4px;
            padding: 15px;
            background-color: var(--bg-primary);
        }

        .regex-text-label {
            font-size: 11px;
            color: var(--text-secondary);
            margin-bottom: 8px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .regex-text-content {
            white-space: pre-wrap;
            word-break: break-word;
            line-height: 1.8;
            color: var(--text-primary);
        }

        .regex-match-highlight {
            background-color: color-mix(in srgb, var(--accent-color) 20%, transparent);
            color: var(--accent-color);
            font-weight: 600;
            padding: 2px 4px;
            border-radius: 3px;
            transition: all 0.2s;
        }

        .regex-matches-list {
            border: 1px solid var(--border-color);
            border-radius: 4px;
            padding: 15px;
            background-color: var(--bg-primary);
        }

        .regex-match-item {
            padding: 12px;
            margin-bottom: 10px;
            background-color: var(--bg-secondary);
            border: 1px solid var(--border-color);
            border-radius: 4px;
            transition: all 0.2s;
            cursor: pointer;
        }

        .regex-match-item:last-child {
            margin-bottom: 0;
        }

        .regex-match-item:hover {
            background-color: var(--bg-hover);
            border-color: var(--accent-color);
        }

        .regex-match-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 8px;
            font-size: 11px;
        }

        .regex-match-number {
            font-weight: 600;
            color: var(--accent-color);
        }

        .regex-match-position {
            color: var(--text-secondary);
            font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
        }

        .regex-match-content {
            font-size: 14px;
            color: var(--text-primary);
            font-weight: 500;
            padding: 8px;
            background-color: var(--bg-tertiary);
            border-radius: 3px;
            margin-top: 8px;
            word-break: break-all;
        }

        .regex-groups {
            margin-top: 10px;
            padding-top: 10px;
            border-top: 1px solid var(--border-color);
        }

        .regex-group-item {
            display: flex;
            gap: 10px;
            padding: 6px 0;
            font-size: 12px;
        }

        .regex-group-label {
            font-weight: 600;
            color: var(--text-secondary);
            min-width: 70px;
        }

        .regex-group-value {
            color: var(--text-primary);
            font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
            background-color: var(--bg-tertiary);
            padding: 4px 8px;
            border-radius: 3px;
            flex: 1;
        }

        .regex-error {
            padding: 15px;
            background-color: color-mix(in srgb, #f48771 15%, transparent);
            border: 1px solid #f48771;
            border-radius: 4px;
            color: #f48771;
            font-size: 13px;
        }

        /* Regex Tutorial Styles */
        .regex-tutorial-section {
            margin-bottom: 20px;
            border: 1px solid var(--border-color);
            border-radius: 4px;
            overflow: hidden;
        }

        .regex-tutorial-header {
            padding: 12px 15px;
            background-color: var(--bg-tertiary);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: space-between;
            user-select: none;
            transition: background-color var(--transition-speed);
            font-weight: 600;
            color: var(--text-primary);
        }

        .regex-tutorial-header:hover {
            background-color: var(--bg-hover);
        }

        .regex-tutorial-icon {
            transition: transform var(--transition-speed);
            color: var(--text-secondary);
            font-size: 12px;
        }

        .regex-tutorial-content {
            background-color: var(--bg-secondary);
            border-top: 1px solid var(--border-color);
        }

        .regex-tutorial-section-content {
            padding: 20px;
            max-height: 600px;
            overflow-y: auto;
        }

        .regex-tutorial-section-content::-webkit-scrollbar {
            width: 10px;
        }

        .regex-tutorial-section-content::-webkit-scrollbar-track {
            background: var(--bg-secondary);
        }

        .regex-tutorial-section-content::-webkit-scrollbar-thumb {
            background: var(--bg-tertiary);
            border-radius: 5px;
        }

        .regex-tutorial-section-content::-webkit-scrollbar-thumb:hover {
            background: var(--bg-hover);
        }

        .regex-tutorial-section-content h4 {
            color: var(--accent-color);
            font-size: 16px;
            font-weight: 600;
            margin-top: 20px;
            margin-bottom: 12px;
            padding-bottom: 8px;
            border-bottom: 1px solid var(--border-color);
        }

        .regex-tutorial-section-content h4:first-child {
            margin-top: 0;
        }

        .regex-tutorial-section-content p {
            color: var(--text-secondary);
            line-height: 1.6;
            margin-bottom: 15px;
            font-size: 13px;
        }

        .regex-tutorial-examples {
            display: flex;
            flex-direction: column;
            gap: 12px;
            margin-bottom: 20px;
        }

        .regex-tutorial-example {
            padding: 12px;
            background-color: var(--bg-primary);
            border: 1px solid var(--border-color);
            border-radius: 4px;
            border-left: 3px solid var(--accent-color);
        }

        .regex-tutorial-example code {
            display: block;
            font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
            font-size: 13px;
            color: var(--accent-color);
            font-weight: 600;
            margin-bottom: 6px;
            padding: 6px 8px;
            background-color: var(--bg-tertiary);
            border-radius: 3px;
            word-break: break-all;
        }

        .regex-tutorial-example > span {
            display: block;
            color: var(--text-primary);
            font-size: 13px;
            line-height: 1.5;
            margin-bottom: 6px;
        }

        .regex-tutorial-demo {
            margin-top: 8px;
            padding: 8px;
            background-color: var(--bg-tertiary);
            border-radius: 3px;
            font-size: 12px;
            color: var(--text-secondary);
            border-left: 2px solid var(--accent-color);
        }

        .regex-tutorial-demo code {
            color: var(--accent-color);
            background: transparent;
            padding: 0;
            margin: 0;
            font-weight: 500;
        }

        .regex-tutorial-tip {
            margin-top: 20px;
            padding: 12px 15px;
            background-color: color-mix(in srgb, var(--accent-color) 10%, transparent);
            border: 1px solid var(--accent-color);
            border-radius: 4px;
            color: var(--text-primary);
            font-size: 13px;
            line-height: 1.6;
            display: flex;
            align-items: flex-start;
        }

        .regex-tutorial-tip i {
            color: var(--accent-color);
            margin-top: 2px;
        }

        .regex-tutorial-tip strong {
            color: var(--accent-color);
        }
    `,
    html: `
        <div class="tool-info">
            <i class="fas fa-info-circle" style="margin-right: 8px;"></i>
            Test regular expressions against text. See matches, groups, and replacements in real-time. Use the examples below to get started.
        </div>
        <div class="tool-section">
            <div class="regex-tutorial-section">
                <div class="regex-tutorial-header" onclick="toggleRegexTutorial()">
                    <i class="fas fa-graduation-cap" style="margin-right: 8px;"></i>
                    <span>Regex Tutorial</span>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <button class="fullscreen-btn" onclick="event.stopPropagation(); enterRegexTutorialFullscreen()" title="Fullscreen" style="padding: 4px 8px; font-size: 11px;">
                            <i class="fas fa-expand"></i>
                            <span>Fullscreen</span>
                        </button>
                        <i class="fas fa-chevron-down regex-tutorial-icon" id="regex-tutorial-icon"></i>
                    </div>
                </div>
                <div class="regex-tutorial-content" id="regex-tutorial-content" style="display: none;">
                    <div class="regex-tutorial-section-content" id="regex-tutorial-section-content" data-fullscreen-target="true">
                        <h4>What is Regex?</h4>
                        <p>Regular expressions (regex) are patterns used to match character combinations in strings. They're powerful tools for searching, validating, and manipulating text.</p>
                        
                        <h4>Basic Characters</h4>
                        <div class="regex-tutorial-examples">
                            <div class="regex-tutorial-example">
                                <code>abc</code>
                                <span>Matches the literal string "abc"</span>
                            </div>
                            <div class="regex-tutorial-example">
                                <code>123</code>
                                <span>Matches the literal string "123"</span>
                            </div>
                        </div>
                        
                        <h4>Metacharacters (Special Characters)</h4>
                        <div class="regex-tutorial-examples">
                            <div class="regex-tutorial-example">
                                <code>.</code>
                                <span>Matches any single character (except newline)</span>
                                <div class="regex-tutorial-demo">Example: <code>a.c</code> matches "abc", "a1c", "a-c"</div>
                            </div>
                            <div class="regex-tutorial-example">
                                <code>^</code>
                                <span>Matches the start of a string</span>
                                <div class="regex-tutorial-demo">Example: <code>^Hello</code> matches "Hello" at the start</div>
                            </div>
                            <div class="regex-tutorial-example">
                                <code>$</code>
                                <span>Matches the end of a string</span>
                                <div class="regex-tutorial-demo">Example: <code>world$</code> matches "world" at the end</div>
                            </div>
                            <div class="regex-tutorial-example">
                                <code>\\</code>
                                <span>Escapes special characters (use \\ to match literal . ^ $ etc.)</span>
                                <div class="regex-tutorial-demo">Example: <code>\\.</code> matches a literal period</div>
                            </div>
                        </div>
                        
                        <h4>Character Classes</h4>
                        <div class="regex-tutorial-examples">
                            <div class="regex-tutorial-example">
                                <code>[abc]</code>
                                <span>Matches any one of the characters a, b, or c</span>
                                <div class="regex-tutorial-demo">Example: <code>[aeiou]</code> matches any vowel</div>
                            </div>
                            <div class="regex-tutorial-example">
                                <code>[a-z]</code>
                                <span>Matches any lowercase letter from a to z</span>
                                <div class="regex-tutorial-demo">Example: <code>[0-9]</code> matches any digit</div>
                            </div>
                            <div class="regex-tutorial-example">
                                <code>[^abc]</code>
                                <span>Matches any character NOT a, b, or c (negation)</span>
                                <div class="regex-tutorial-demo">Example: <code>[^0-9]</code> matches any non-digit</div>
                            </div>
                            <div class="regex-tutorial-example">
                                <code>\\d</code>
                                <span>Matches any digit (0-9) - shorthand for [0-9]</span>
                            </div>
                            <div class="regex-tutorial-example">
                                <code>\\w</code>
                                <span>Matches any word character (letter, digit, underscore) - [a-zA-Z0-9_]</span>
                            </div>
                            <div class="regex-tutorial-example">
                                <code>\\s</code>
                                <span>Matches any whitespace character (space, tab, newline)</span>
                            </div>
                            <div class="regex-tutorial-example">
                                <code>\\D</code>
                                <span>Matches any non-digit - shorthand for [^0-9]</span>
                            </div>
                            <div class="regex-tutorial-example">
                                <code>\\W</code>
                                <span>Matches any non-word character</span>
                            </div>
                            <div class="regex-tutorial-example">
                                <code>\\S</code>
                                <span>Matches any non-whitespace character</span>
                            </div>
                        </div>
                        
                        <h4>Quantifiers</h4>
                        <div class="regex-tutorial-examples">
                            <div class="regex-tutorial-example">
                                <code>*</code>
                                <span>Matches 0 or more of the preceding element</span>
                                <div class="regex-tutorial-demo">Example: <code>a*</code> matches "", "a", "aa", "aaa"...</div>
                            </div>
                            <div class="regex-tutorial-example">
                                <code>+</code>
                                <span>Matches 1 or more of the preceding element</span>
                                <div class="regex-tutorial-demo">Example: <code>\\d+</code> matches "1", "12", "123"...</div>
                            </div>
                            <div class="regex-tutorial-example">
                                <code>?</code>
                                <span>Matches 0 or 1 of the preceding element (makes it optional)</span>
                                <div class="regex-tutorial-demo">Example: <code>colou?r</code> matches "color" or "colour"</div>
                            </div>
                            <div class="regex-tutorial-example">
                                <code>{n}</code>
                                <span>Matches exactly n occurrences</span>
                                <div class="regex-tutorial-demo">Example: <code>\\d{3}</code> matches exactly 3 digits</div>
                            </div>
                            <div class="regex-tutorial-example">
                                <code>{n,}</code>
                                <span>Matches n or more occurrences</span>
                                <div class="regex-tutorial-demo">Example: <code>\\d{3,}</code> matches 3 or more digits</div>
                            </div>
                            <div class="regex-tutorial-example">
                                <code>{n,m}</code>
                                <span>Matches between n and m occurrences</span>
                                <div class="regex-tutorial-demo">Example: <code>\\d{2,4}</code> matches 2 to 4 digits</div>
                            </div>
                        </div>
                        
                        <h4>Groups and Alternation</h4>
                        <div class="regex-tutorial-examples">
                            <div class="regex-tutorial-example">
                                <code>(abc)</code>
                                <span>Capturing group - matches and remembers the match</span>
                                <div class="regex-tutorial-demo">Example: <code>(\\d{3})-(\\d{3})</code> captures area code and number separately</div>
                            </div>
                            <div class="regex-tutorial-example">
                                <code>(?:abc)</code>
                                <span>Non-capturing group - matches but doesn't remember</span>
                            </div>
                            <div class="regex-tutorial-example">
                                <code>a|b</code>
                                <span>Alternation - matches either a or b</span>
                                <div class="regex-tutorial-demo">Example: <code>cat|dog</code> matches "cat" or "dog"</div>
                            </div>
                        </div>
                        
                        <h4>Anchors and Word Boundaries</h4>
                        <div class="regex-tutorial-examples">
                            <div class="regex-tutorial-example">
                                <code>\\b</code>
                                <span>Word boundary - matches position between word and non-word characters</span>
                                <div class="regex-tutorial-demo">Example: <code>\\bcat\\b</code> matches "cat" but not "category"</div>
                            </div>
                            <div class="regex-tutorial-example">
                                <code>\\B</code>
                                <span>Non-word boundary - matches position not at word boundary</span>
                            </div>
                        </div>
                        
                        <h4>Flags</h4>
                        <div class="regex-tutorial-examples">
                            <div class="regex-tutorial-example">
                                <code>g</code>
                                <span>Global - find all matches, not just the first</span>
                            </div>
                            <div class="regex-tutorial-example">
                                <code>i</code>
                                <span>Case-insensitive - ignore case when matching</span>
                                <div class="regex-tutorial-demo">Example: <code>/hello/i</code> matches "Hello", "HELLO", "hello"</div>
                            </div>
                            <div class="regex-tutorial-example">
                                <code>m</code>
                                <span>Multiline - ^ and $ match start/end of each line, not just the string</span>
                            </div>
                        </div>
                        
                        <h4>Common Patterns</h4>
                        <div class="regex-tutorial-examples">
                            <div class="regex-tutorial-example">
                                <code>^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$</code>
                                <span>Email validation</span>
                            </div>
                            <div class="regex-tutorial-example">
                                <code>^\\d{3}-\\d{3}-\\d{4}$</code>
                                <span>US phone number (XXX-XXX-XXXX)</span>
                            </div>
                            <div class="regex-tutorial-example">
                                <code>^https?://</code>
                                <span>URL protocol (http:// or https://)</span>
                            </div>
                            <div class="regex-tutorial-example">
                                <code>\\b\\w+\\b</code>
                                <span>Match whole words</span>
                            </div>
                        </div>
                        
                        <div class="regex-tutorial-tip">
                            <i class="fas fa-lightbulb" style="margin-right: 8px;"></i>
                            <strong>Tip:</strong> Start simple and build up. Test your regex with the examples above, and use the real-time highlighting to see what matches!
                        </div>
                    </div>
                </div>
            </div>
            <div class="tool-input-group">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                    <label for="regex-pattern">
                        <i class="fas fa-code" style="margin-right: 6px; color: var(--text-secondary);"></i>
                        Regular Expression
                    </label>
                    <div style="display: flex; gap: 8px;">
                        <label style="display: flex; align-items: center; gap: 4px; font-size: 12px; font-weight: normal; cursor: pointer;">
                            <input type="checkbox" id="regex-global" checked style="margin: 0;">
                            Global (g)
                        </label>
                        <label style="display: flex; align-items: center; gap: 4px; font-size: 12px; font-weight: normal; cursor: pointer;">
                            <input type="checkbox" id="regex-case" style="margin: 0;">
                            Case Insensitive (i)
                        </label>
                        <label style="display: flex; align-items: center; gap: 4px; font-size: 12px; font-weight: normal; cursor: pointer;">
                            <input type="checkbox" id="regex-multiline" style="margin: 0;">
                            Multiline (m)
                        </label>
                    </div>
                </div>
                <input type="text" id="regex-pattern" placeholder="Enter regex pattern (e.g., /\\d+/g)" style="font-family: 'Consolas', 'Monaco', 'Courier New', monospace;">
            </div>
            
            <div class="tool-input-group">
                <label for="regex-examples">
                    <i class="fas fa-lightbulb" style="margin-right: 6px; color: var(--text-secondary);"></i>
                    Common Examples
                </label>
                <div id="regex-examples" class="regex-examples-container">
                    <!-- Examples will be populated by JavaScript -->
                </div>
            </div>
            
            <div class="tool-input-group">
                <label for="regex-text">
                    <i class="fas fa-file-alt" style="margin-right: 6px; color: var(--text-secondary);"></i>
                    Test Text
                </label>
                <textarea id="regex-text" placeholder="Enter text to test against..." style="font-family: 'Consolas', 'Monaco', 'Courier New', monospace;"></textarea>
            </div>
            
            <div style="margin-top: 15px;">
                <button class="tool-button" onclick="testRegex()">
                    <i class="fas fa-play" style="margin-right: 6px;"></i>
                    Test Regex
                </button>
                <button class="tool-button secondary" onclick="clearRegex()">
                    <i class="fas fa-trash-alt" style="margin-right: 6px;"></i>
                    Clear
                </button>
            </div>
            
            <div class="tool-input-group" style="margin-top: 20px;">
                <label for="regex-output">Results</label>
                <div id="regex-output" class="regex-output-container">
                    <div class="tool-output empty">Results will appear here...</div>
                </div>
            </div>
        </div>
    `,
    init() {
        const examples = [
            {
                name: 'Email',
                pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}',
                description: 'Matches email addresses',
                sample: 'Contact us at john.doe@example.com or support@company.co.uk'
            },
            {
                name: 'Phone Number (US)',
                pattern: '\\b\\d{3}[-.]?\\d{3}[-.]?\\d{4}\\b',
                description: 'Matches US phone numbers',
                sample: 'Call 555-123-4567 or (555) 987-6543'
            },
            {
                name: 'URL',
                pattern: 'https?://[\\w\\-]+(\\.[\\w\\-]+)+([\\w\\-\\.,@?^=%&:/~\\+#]*[\\w\\-\\@?^=%&/~\\+#])?',
                description: 'Matches URLs',
                sample: 'Visit https://example.com or http://www.test.org/path?q=1'
            },
            {
                name: 'Alphanumeric',
                pattern: '[a-zA-Z0-9]+',
                description: 'Matches alphanumeric characters',
                sample: 'abc123 xyz789 test456'
            },
            {
                name: 'Digits Only',
                pattern: '\\d+',
                description: 'Matches one or more digits',
                sample: 'Price: $123.45, Quantity: 789'
            },
            {
                name: 'Words',
                pattern: '\\b\\w+\\b',
                description: 'Matches whole words',
                sample: 'The quick brown fox jumps'
            },
            {
                name: 'IPv4 Address',
                pattern: '\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b',
                description: 'Matches IPv4 addresses',
                sample: 'Server at 192.168.1.1 and 10.0.0.1'
            },
            {
                name: 'Date (YYYY-MM-DD)',
                pattern: '\\d{4}-\\d{2}-\\d{2}',
                description: 'Matches dates in YYYY-MM-DD format',
                sample: 'Event on 2024-12-25 and 2025-01-01'
            },
            {
                name: 'Credit Card',
                pattern: '\\b\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4}\\b',
                description: 'Matches credit card numbers',
                sample: 'Card: 4532-1234-5678-9010 or 4532 1234 5678 9010'
            },
            {
                name: 'Hex Color',
                pattern: '#[0-9a-fA-F]{6}\\b',
                description: 'Matches hex color codes',
                sample: 'Colors: #FF5733, #33FF57, #3357FF'
            },
            {
                name: 'Time (HH:MM)',
                pattern: '\\b([01]?[0-9]|2[0-3]):[0-5][0-9]\\b',
                description: 'Matches time in 24-hour format',
                sample: 'Meeting at 09:30, lunch at 12:45, end at 17:00'
            },
            {
                name: 'Postal Code (US)',
                pattern: '\\b\\d{5}(-\\d{4})?\\b',
                description: 'Matches US ZIP codes',
                sample: 'Send to 12345 or 90210-1234'
            },
            {
                name: 'HTML Tags',
                pattern: '<[^>]+>',
                description: 'Matches HTML tags',
                sample: '<div>Hello</div> and <span>World</span>'
            },
            {
                name: 'Whitespace',
                pattern: '\\s+',
                description: 'Matches whitespace',
                sample: 'Multiple    spaces    and\\ttabs'
            },
            {
                name: 'Strong Password',
                pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$',
                description: 'Matches strong passwords (8+ chars, upper, lower, digit, special)',
                sample: 'MyP@ssw0rd'
            }
        ];
        
        // Populate examples
        const examplesContainer = document.getElementById('regex-examples');
        examples.forEach(example => {
            const exampleBtn = document.createElement('button');
            exampleBtn.className = 'regex-example-btn';
            exampleBtn.innerHTML = `
                <div style="font-weight: 600; margin-bottom: 4px;">${example.name}</div>
                <div style="font-size: 11px; color: var(--text-secondary); margin-bottom: 4px;">${example.description}</div>
                <div style="font-size: 10px; font-family: monospace; color: var(--accent-color);">/${example.pattern}/g</div>
            `;
            exampleBtn.onclick = () => {
                document.getElementById('regex-pattern').value = example.pattern;
                document.getElementById('regex-text').value = example.sample;
                document.getElementById('regex-global').checked = true;
                testRegex();
            };
            examplesContainer.appendChild(exampleBtn);
        });
        
        // Auto-test on input
        let testTimeout;
        const patternInput = document.getElementById('regex-pattern');
        const textInput = document.getElementById('regex-text');
        const flags = ['regex-global', 'regex-case', 'regex-multiline'];
        
        flags.forEach(flagId => {
            document.getElementById(flagId).addEventListener('change', () => {
                if (patternInput.value || textInput.value) {
                    clearTimeout(testTimeout);
                    testTimeout = setTimeout(testRegex, 300);
                }
            });
        });
        
        patternInput.addEventListener('input', () => {
            if (patternInput.value && textInput.value) {
                clearTimeout(testTimeout);
                testTimeout = setTimeout(testRegex, 300);
            }
        });
        
        textInput.addEventListener('input', () => {
            if (patternInput.value && textInput.value) {
                clearTimeout(testTimeout);
                testTimeout = setTimeout(testRegex, 300);
            }
        });
        
        window.testRegex = () => {
            const pattern = document.getElementById('regex-pattern').value.trim();
            const text = document.getElementById('regex-text').value;
            const output = document.getElementById('regex-output');
            
            if (!pattern) {
                ToolUtils.showNotification('Please enter a regex pattern');
                return;
            }
            
            if (!text) {
                output.innerHTML = '<div class="tool-output empty">Please enter text to test against...</div>';
                return;
            }
            
            try {
                // Build flags
                let flags = '';
                if (document.getElementById('regex-global').checked) flags += 'g';
                if (document.getElementById('regex-case').checked) flags += 'i';
                if (document.getElementById('regex-multiline').checked) flags += 'm';
                
                // Ensure global flag for matchAll
                const matchFlags = flags.includes('g') ? flags : flags + 'g';
                const regex = new RegExp(pattern, flags);
                const matches = [...text.matchAll(new RegExp(pattern, matchFlags))];
                
                if (matches.length === 0) {
                    output.innerHTML = `
                        <div class="regex-result-header">
                            <div style="color: var(--text-secondary);">
                                <i class="fas fa-times-circle" style="margin-right: 8px; color: #f48771;"></i>
                                No matches found
                            </div>
                        </div>
                    `;
                    return;
                }
                
                // Statistics
                const stats = {
                    totalMatches: matches.length,
                    totalGroups: matches.reduce((sum, m) => sum + (m.length - 1), 0),
                    firstMatch: matches[0][0],
                    lastMatch: matches[matches.length - 1][0]
                };
                
                let html = `
                    <div class="regex-result-header">
                        <div style="display: flex; gap: 20px; flex-wrap: wrap;">
                            <div>
                                <div style="font-size: 24px; font-weight: bold; color: var(--accent-color);">${stats.totalMatches}</div>
                                <div style="font-size: 11px; color: var(--text-secondary);">Matches</div>
                            </div>
                            ${stats.totalGroups > 0 ? `
                            <div>
                                <div style="font-size: 24px; font-weight: bold; color: var(--accent-color);">${stats.totalGroups}</div>
                                <div style="font-size: 11px; color: var(--text-secondary);">Groups</div>
                            </div>
                            ` : ''}
                        </div>
                    </div>
                    <div class="regex-matches-container">
                `;
                
                // Highlight matches in text (process in reverse to maintain indices)
                let highlightedText = text;
                const escapeMap = new Map();
                matches.reverse().forEach((match, idx) => {
                    const actualIdx = matches.length - 1 - idx;
                    const start = match.index;
                    const end = start + match[0].length;
                    const before = highlightedText.substring(0, start);
                    const matchText = highlightedText.substring(start, end);
                    const after = highlightedText.substring(end);
                    
                    highlightedText = before + 
                        `<span class="regex-match-highlight" data-match-index="${actualIdx}">${escapeHtml(matchText)}</span>` + 
                        after;
                });
                
                html += `
                    <div class="regex-highlighted-text">
                        <div class="regex-text-label">Highlighted Text:</div>
                        <div class="regex-text-content">${highlightedText || '<span style="color: var(--text-disabled);">(empty)</span>'}</div>
                    </div>
                `;
                
                // List all matches
                html += '<div class="regex-matches-list"><div class="regex-text-label">All Matches:</div>';
                matches.forEach((match, idx) => {
                    html += `<div class="regex-match-item" data-match-index="${idx}">`;
                    html += `<div class="regex-match-header">`;
                    html += `<span class="regex-match-number">Match ${idx + 1}</span>`;
                    html += `<span class="regex-match-position">Position: ${match.index}-${match.index + match[0].length - 1}</span>`;
                    html += `</div>`;
                    html += `<div class="regex-match-content">${escapeHtml(match[0])}</div>`;
                    
                    if (match.length > 1) {
                        html += '<div class="regex-groups">';
                        for (let i = 1; i < match.length; i++) {
                            html += `
                                <div class="regex-group-item">
                                    <span class="regex-group-label">Group ${i}:</span>
                                    <span class="regex-group-value">${escapeHtml(match[i] || '(undefined)')}</span>
                                </div>
                            `;
                        }
                        html += '</div>';
                    }
                    html += `</div>`;
                });
                html += '</div></div>';
                
                output.innerHTML = html;
                
                // Add hover effects
                document.querySelectorAll('.regex-match-item').forEach(item => {
                    const index = item.dataset.matchIndex;
                    item.addEventListener('mouseenter', () => {
                        document.querySelectorAll(`.regex-match-highlight[data-match-index="${index}"]`).forEach(hl => {
                            hl.style.backgroundColor = 'var(--accent-color)';
                            hl.style.color = 'white';
                        });
                    });
                    item.addEventListener('mouseleave', () => {
                        document.querySelectorAll(`.regex-match-highlight[data-match-index="${index}"]`).forEach(hl => {
                            hl.style.backgroundColor = '';
                            hl.style.color = '';
                        });
                    });
                });
                
            } catch (error) {
                output.innerHTML = `
                    <div class="regex-error">
                        <i class="fas fa-exclamation-circle" style="margin-right: 8px;"></i>
                        <strong>Regex Error:</strong> ${escapeHtml(error.message)}
                    </div>
                `;
            }
        };
        
        window.clearRegex = () => {
            document.getElementById('regex-pattern').value = '';
            document.getElementById('regex-text').value = '';
            document.getElementById('regex-global').checked = true;
            document.getElementById('regex-case').checked = false;
            document.getElementById('regex-multiline').checked = false;
            document.getElementById('regex-output').innerHTML = '<div class="tool-output empty">Results will appear here...</div>';
        };
        
        window.enterRegexTutorialFullscreen = () => {
            const app = window.toolkitApp;
            if (!app) return;
            
            const content = document.getElementById('regex-tutorial-section-content');
            if (content) {
                // Make sure tutorial is expanded
                const tutorialContent = document.getElementById('regex-tutorial-content');
                if (tutorialContent && tutorialContent.style.display === 'none') {
                    toggleRegexTutorial();
                }
                app.enterFullscreen(content);
            }
        };
        
        window.toggleRegexTutorial = () => {
            const content = document.getElementById('regex-tutorial-content');
            const icon = document.getElementById('regex-tutorial-icon');
            const isOpen = content.style.display !== 'none';
            
            content.style.display = isOpen ? 'none' : 'block';
            icon.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
        };
        
        function escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }
    }
};
