/**
 * Web Worker: parse and format/minify JSON off the main thread
 * so large files don't freeze the UI.
 */
self.addEventListener('message', (e) => {
    const { type, id, jsonString, indent } = e.data || {};
    try {
        if (type === 'format') {
            const obj = JSON.parse(jsonString);
            const formatted = JSON.stringify(obj, null, indent ?? 2);
            self.postMessage({ id, ok: true, result: formatted });
        } else if (type === 'minify') {
            const obj = JSON.parse(jsonString);
            const minified = JSON.stringify(obj);
            self.postMessage({ id, ok: true, result: minified });
        } else {
            self.postMessage({ id, ok: false, error: 'Unknown request type' });
        }
    } catch (err) {
        self.postMessage({ id, ok: false, error: err.message || String(err) });
    }
});
