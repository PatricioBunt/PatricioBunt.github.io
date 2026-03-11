export default {
    title: 'XOR String Utility',
    html: `
        <div class="tool-info">
            XOR-obfuscate strings for embedding in apps without plain hardcoded literals.
            Uses UTF-8 bytes and generates decode snippets for multiple languages.
            Random key generation uses the same byte-length as plaintext.
        </div>
        <div class="tool-section">
            <div class="tool-input-group">
                <label for="xor-input">Plain Text</label>
                <textarea id="xor-input" placeholder="Enter text to obfuscate..."></textarea>
            </div>
            <div class="tool-input-group">
                <label for="xor-key">XOR Key</label>
                <input id="xor-key" type="text" placeholder="Enter key (e.g. my-secret-key)">
            </div>
            <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 16px;">
                <button class="tool-button" onclick="generateXOR()">Generate</button>
                <button class="tool-button secondary" onclick="generateRandomXORKey()">Random Key</button>
                <button class="tool-button secondary" onclick="clearXOR()">Clear</button>
            </div>
            <div class="tool-input-group">
                <label for="xor-output-hex">Obfuscated Hex</label>
                <textarea id="xor-output-hex" readonly placeholder="Hex output..."></textarea>
            </div>
            <div class="tool-input-group">
                <label for="xor-output-bytes">Obfuscated Bytes (decimal)</label>
                <textarea id="xor-output-bytes" readonly placeholder="Byte array output..."></textarea>
            </div>
            <div class="tool-input-group">
                <label for="xor-lang-select">Output language</label>
                <select id="xor-lang-select">
                    <option value="0">JavaScript</option>
                    <option value="1">TypeScript</option>
                    <option value="2">Python</option>
                    <option value="3">C</option>
                    <option value="4">C++</option>
                    <option value="5">C#</option>
                    <option value="6">Rust</option>
                    <option value="7">Go</option>
                    <option value="8">Java</option>
                </select>
                <div style="margin-top: 10px; border: 1px solid var(--border-color); border-radius: 6px; overflow: hidden;">
                    <div style="display: flex; justify-content: flex-end; padding: 6px 10px; background: var(--bg-tertiary);">
                        <button class="tool-button secondary" onclick="copyXORSnippet()" style="padding: 4px 10px; font-size: 12px; margin: 0;">Copy</button>
                    </div>
                    <pre style="margin: 0; padding: 10px; overflow-x: auto; font-size: 12px; min-height: 80px;"><code id="xor-snippet-code-inner">Generate to see snippet.</code></pre>
                </div>
            </div>
        </div>
    `,
    init() {
        const encoder = new TextEncoder();

        function bytesToHex(bytes) {
            return Array.from(bytes).map((b) => b.toString(16).padStart(2, '0')).join('');
        }

        function bytesToDecList(bytes) {
            return Array.from(bytes).join(', ');
        }

        function bytesToHexList(bytes) {
            return Array.from(bytes).map((b) => `0x${b.toString(16).padStart(2, '0')}`).join(', ');
        }

        function xorBytes(inputBytes, keyBytes) {
            const out = new Uint8Array(inputBytes.length);
            for (let i = 0; i < inputBytes.length; i++) {
                out[i] = inputBytes[i] ^ keyBytes[i % keyBytes.length];
            }
            return out;
        }

        function makeSnippets(cipherBytes, keyBytes) {
            const dataDec = bytesToDecList(cipherBytes);
            const keyDec = bytesToDecList(keyBytes);
            const dataHex = bytesToHexList(cipherBytes);
            const keyHex = bytesToHexList(keyBytes);

            return [
                {
                    language: 'JavaScript',
                    code: `const DATA = [${dataDec}];
const KEY = [${keyDec}];

function xorDecode(data, key) {
  const bytes = new Uint8Array(data.map((b, i) => b ^ key[i % key.length]));
  return new TextDecoder().decode(bytes);
}

function getValue() {
  const value = xorDecode(DATA, KEY);
  return value;
}`
                },
                {
                    language: 'TypeScript',
                    code: `const DATA: number[] = [${dataDec}];
const KEY: number[] = [${keyDec}];

function xorDecode(data: number[], key: number[]): string {
  const bytes = new Uint8Array(data.map((b, i) => b ^ key[i % key.length]));
  return new TextDecoder().decode(bytes);
}

function getValue(): string {
  const value = xorDecode(DATA, KEY);
  return value;
}`
                },
                {
                    language: 'Python',
                    code: `DATA = bytes([${dataDec}])
KEY = bytes([${keyDec}])

def xor_decode(data: bytes, key: bytes) -> str:
    decoded = bytes(b ^ key[i % len(key)] for i, b in enumerate(data))
    return decoded.decode("utf-8")

def get_value() -> str:
    value = xor_decode(DATA, KEY)
    return value`
                },
                {
                    language: 'C',
                    code: `#include <stdint.h>
#include <stdlib.h>
#include <stdio.h>

static const uint8_t DATA[] = { ${dataHex} };
static const uint8_t KEY[] = { ${keyHex} };

char* xor_decode(const uint8_t *data, size_t data_len, const uint8_t *key, size_t key_len) {
    char *decoded = (char *)malloc(data_len + 1);
    if (!decoded) return NULL;
    for (size_t i = 0; i < data_len; i++) {
        decoded[i] = (char)(data[i] ^ key[i % key_len]);
    }
    decoded[data_len] = '\\0';
    return decoded;
}

int main(void) {
    size_t data_len = sizeof(DATA) / sizeof(DATA[0]);
    size_t key_len = sizeof(KEY) / sizeof(KEY[0]);
    char *value = xor_decode(DATA, data_len, KEY, key_len);
    if (!value) return 1;
    printf("%s\\n", value);
    free(value);
    return 0;
}`
                },
                {
                    language: 'C++',
                    code: `#include <cstdint>
#include <iostream>
#include <string>
#include <vector>

static const std::vector<uint8_t> DATA = { ${dataHex} };
static const std::vector<uint8_t> KEY = { ${keyHex} };

std::string xorDecode(const std::vector<uint8_t>& data, const std::vector<uint8_t>& key) {
    std::string out;
    out.resize(data.size());
    for (size_t i = 0; i < data.size(); i++) {
        out[i] = static_cast<char>(data[i] ^ key[i % key.size()]);
    }
    return out;
}

int main() {
    std::string value = xorDecode(DATA, KEY);
    std::cout << value << std::endl;
    return 0;
}`
                },
                {
                    language: 'C#',
                    code: `using System;
using System.Text;

class Program {
    private static readonly byte[] DATA = new byte[] { ${dataHex} };
    private static readonly byte[] KEY = new byte[] { ${keyHex} };

    static string XorDecode(byte[] data, byte[] key) {
        byte[] decoded = new byte[data.Length];
        for (int i = 0; i < data.Length; i++) {
            decoded[i] = (byte)(data[i] ^ key[i % key.Length]);
        }
        return Encoding.UTF8.GetString(decoded);
    }

    static void Main() {
        string value = XorDecode(DATA, KEY);
        Console.WriteLine(value);
    }
}`
                },
                {
                    language: 'Rust',
                    code: `const DATA: &[u8] = &[${dataHex}];
const KEY: &[u8] = &[${keyHex}];

pub fn xor_decode(data: &[u8], key: &[u8]) -> String {
    let bytes: Vec<u8> = data
        .iter()
        .enumerate()
        .map(|(i, b)| b ^ key[i % key.len()])
        .collect();
    String::from_utf8(bytes).expect("Invalid UTF-8")
}

pub fn get_value() -> String {
    let value = xor_decode(DATA, KEY);
    value
}`
                },
                {
                    language: 'Go',
                    code: `package main

import "fmt"

var DATA = []byte{${dataHex}}
var KEY = []byte{${keyHex}}

func xorDecode(data []byte, key []byte) string {
    decoded := make([]byte, len(data))
    for i := range data {
        decoded[i] = data[i] ^ key[i%len(key)]
    }
    return string(decoded)
}

func main() {
    value := xorDecode(DATA, KEY)
    fmt.Println(value)
}`
                },
                {
                    language: 'Java',
                    code: `import java.nio.charset.StandardCharsets;

public class Main {
    private static final byte[] DATA = new byte[] { ${dataHex} };
    private static final byte[] KEY = new byte[] { ${keyHex} };

    public static String xorDecode(byte[] data, byte[] key) {
        byte[] decoded = new byte[data.length];
        for (int i = 0; i < data.length; i++) {
            decoded[i] = (byte)(data[i] ^ key[i % key.length]);
        }
        return new String(decoded, StandardCharsets.UTF_8);
    }

    public static String getValue() {
        String value = xorDecode(DATA, KEY);
        return value;
    }
}`
                }
            ];
        }

        function updateSnippetDisplay() {
            const select = document.getElementById('xor-lang-select');
            const codeEl = document.getElementById('xor-snippet-code-inner');
            const idx = select ? parseInt(select.value, 10) : 0;
            if (latestSnippets.length && latestSnippets[idx]) {
                codeEl.textContent = latestSnippets[idx].code;
            } else {
                codeEl.textContent = 'Generate to see snippet.';
            }
        }

        let latestSnippets = [];

        window.generateXOR = () => {
            const input = document.getElementById('xor-input').value;
            const key = document.getElementById('xor-key').value;

            if (!input) {
                ToolUtils.showNotification('Please enter plain text');
                return;
            }
            if (!key) {
                ToolUtils.showNotification('Please enter a key');
                return;
            }

            const inputBytes = encoder.encode(input);
            const keyBytes = encoder.encode(key);
            if (!keyBytes.length) {
                ToolUtils.showNotification('Key cannot be empty');
                return;
            }

            const cipherBytes = xorBytes(inputBytes, keyBytes);
            document.getElementById('xor-output-hex').value = bytesToHex(cipherBytes);
            document.getElementById('xor-output-bytes').value = bytesToDecList(cipherBytes);

            latestSnippets = makeSnippets(cipherBytes, keyBytes);
            updateSnippetDisplay();
            ToolUtils.showNotification('XOR output generated');
        };

        window.generateRandomXORKey = () => {
            const input = document.getElementById('xor-input').value;
            if (!input) {
                ToolUtils.showNotification('Enter plain text first');
                return;
            }
            const inputByteLength = encoder.encode(input).length;
            const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            const random = new Uint8Array(inputByteLength);
            crypto.getRandomValues(random);
            let key = '';
            for (const b of random) {
                key += alphabet[b % alphabet.length];
            }
            document.getElementById('xor-key').value = key;
            ToolUtils.showNotification(`Random key generated (${inputByteLength} bytes)`);
        };

        window.copyXORSnippet = () => {
            if (!latestSnippets.length) {
                ToolUtils.showNotification('Generate output first');
                return;
            }
            const select = document.getElementById('xor-lang-select');
            const idx = select ? parseInt(select.value, 10) : 0;
            const snippet = latestSnippets[idx];
            if (snippet) ToolUtils.copyToClipboard(snippet.code);
        };

        window.clearXOR = () => {
            document.getElementById('xor-input').value = '';
            document.getElementById('xor-key').value = '';
            document.getElementById('xor-output-hex').value = '';
            document.getElementById('xor-output-bytes').value = '';
            latestSnippets = [];
            updateSnippetDisplay();
        };

        const langSelect = document.getElementById('xor-lang-select');
        if (langSelect) {
            langSelect.addEventListener('change', updateSnippetDisplay);
        }
    }
};
