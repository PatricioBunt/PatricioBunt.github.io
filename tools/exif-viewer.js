export default {
    title: 'Image EXIF Viewer, Editor & Remover',
    styles: `
        .exif-container {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }

        .exif-tabs {
            display: flex;
            gap: 5px;
            border-bottom: 2px solid var(--border-color);
            margin-bottom: 20px;
        }

        .exif-tab {
            padding: 12px 24px;
            background: transparent;
            border: none;
            border-bottom: 3px solid transparent;
            color: var(--text-secondary);
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
            transition: all var(--transition-speed);
            position: relative;
            top: 2px;
        }

        .exif-tab:hover {
            color: var(--text-primary);
            background: var(--bg-hover);
        }

        .exif-tab.active {
            color: var(--accent-color);
            border-bottom-color: var(--accent-color);
        }

        .exif-tab-content {
            display: none;
        }

        .exif-tab-content.active {
            display: block;
        }

        .upload-area {
            border: 2px dashed var(--border-color);
            border-radius: 8px;
            padding: 40px;
            text-align: center;
            background: var(--bg-secondary);
            cursor: pointer;
            transition: all var(--transition-speed);
            margin-bottom: 20px;
        }

        .upload-area:hover {
            border-color: var(--accent-color);
            background: var(--bg-tertiary);
        }

        .upload-area.dragover {
            border-color: var(--accent-color);
            background: var(--bg-hover);
        }

        .upload-area i {
            font-size: 48px;
            color: var(--accent-color);
            margin-bottom: 15px;
        }

        .upload-area p {
            color: var(--text-secondary);
            margin: 10px 0;
        }

        .image-preview-container {
            display: flex;
            gap: 20px;
            margin-bottom: 20px;
            flex-wrap: wrap;
        }

        .image-preview {
            flex: 0 0 auto;
            max-width: 300px;
        }

        .image-preview img {
            max-width: 100%;
            height: auto;
            border-radius: 4px;
            border: 1px solid var(--border-color);
        }

        .image-info {
            background: var(--bg-secondary);
            padding: 15px;
            border-radius: 4px;
            border: 1px solid var(--border-color);
            margin-top: 10px;
        }

        .image-info-item {
            display: flex;
            justify-content: space-between;
            padding: 5px 0;
            font-size: 13px;
        }

        .image-info-label {
            color: var(--text-secondary);
        }

        .image-info-value {
            color: var(--text-primary);
            font-weight: 500;
        }

        .metadata-section {
            background: var(--bg-secondary);
            border: 1px solid var(--border-color);
            border-radius: 4px;
            margin-bottom: 15px;
            overflow: hidden;
        }

        .metadata-section-header {
            padding: 15px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: space-between;
            transition: background var(--transition-speed);
        }

        .metadata-section-header:hover {
            background: var(--bg-hover);
        }

        .metadata-section-title {
            flex: 1;
            font-weight: 600;
            color: var(--text-primary);
        }

        .metadata-section-toggle {
            color: var(--text-secondary);
            transition: transform var(--transition-speed);
        }

        .metadata-section.expanded .metadata-section-toggle {
            transform: rotate(180deg);
        }

        .metadata-section-content {
            display: none;
            padding: 15px;
            border-top: 1px solid var(--border-color);
        }

        .metadata-section.expanded .metadata-section-content {
            display: block;
        }

        .metadata-item {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid var(--border-color);
        }

        .metadata-item:last-child {
            border-bottom: none;
        }

        .metadata-label {
            color: var(--text-secondary);
            font-size: 13px;
        }

        .metadata-value {
            color: var(--text-primary);
            font-size: 13px;
            text-align: right;
            max-width: 60%;
            word-break: break-word;
        }

        .gps-warning {
            background: #ff6b6b;
            color: white;
            padding: 15px;
            border-radius: 4px;
            margin: 15px 0;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .gps-warning i {
            font-size: 20px;
        }

        .gps-warning-content {
            flex: 1;
        }

        .gps-warning-title {
            font-weight: 600;
            margin-bottom: 5px;
        }

        .gps-warning-text {
            font-size: 13px;
            opacity: 0.95;
        }

        .gps-map-button {
            background: white;
            color: #ff6b6b;
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
            font-weight: 600;
            transition: all var(--transition-speed);
        }

        .gps-map-button:hover {
            background: #f0f0f0;
        }

        .action-buttons {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
            margin-top: 20px;
        }

        .no-metadata {
            text-align: center;
            padding: 40px;
            color: var(--text-disabled);
        }

        .no-metadata i {
            font-size: 48px;
            margin-bottom: 15px;
            opacity: 0.5;
        }

        .format-warning {
            background: #ffa500;
            color: white;
            padding: 12px;
            border-radius: 4px;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .format-warning i {
            font-size: 18px;
        }

        .edit-field {
            display: flex;
            flex-direction: column;
            gap: 5px;
            margin-bottom: 15px;
        }

        .edit-field label {
            font-size: 13px;
            color: var(--text-secondary);
            font-weight: 500;
        }

        .edit-field input,
        .edit-field textarea {
            padding: 8px 12px;
            border: 1px solid var(--border-color);
            border-radius: 4px;
            background: var(--bg-primary);
            color: var(--text-primary);
            font-size: 14px;
            font-family: inherit;
        }

        .edit-field input:focus,
        .edit-field textarea:focus {
            outline: none;
            border-color: var(--accent-color);
        }

        .edit-field textarea {
            resize: vertical;
            min-height: 60px;
        }

        .edit-section {
            background: var(--bg-secondary);
            border: 1px solid var(--border-color);
            border-radius: 4px;
            padding: 15px;
            margin-bottom: 15px;
        }

        .edit-section-title {
            font-weight: 600;
            margin-bottom: 15px;
            color: var(--text-primary);
        }

        .remove-warning {
            background: var(--bg-secondary);
            border: 1px solid var(--border-color);
            border-radius: 4px;
            padding: 20px;
            margin-bottom: 20px;
        }

        .remove-warning-title {
            font-weight: 600;
            margin-bottom: 10px;
            color: var(--text-primary);
        }

        .remove-warning-text {
            color: var(--text-secondary);
            font-size: 14px;
            line-height: 1.5;
            margin-bottom: 15px;
        }

        .remove-info {
            background: var(--bg-tertiary);
            padding: 12px;
            border-radius: 4px;
            font-size: 13px;
            color: var(--text-secondary);
            margin-top: 15px;
        }
    `,
    html: `
        <div class="tool-info">
            <i class="fas fa-info-circle" style="margin-right: 8px;"></i>
            View, edit, and remove EXIF metadata from JPEG images. All processing happens in your browser - your images never leave your device.
        </div>
        
        <div class="exif-container">
            <div class="upload-area" id="upload-area">
                <i class="fas fa-cloud-upload-alt"></i>
                <p><strong>Drag and drop images here</strong></p>
                <p style="font-size: 12px;">or click to browse</p>
                <p style="font-size: 11px; color: var(--text-disabled); margin-top: 10px;">Supports JPG, JPEG (EXIF editing only works with JPEG)</p>
                <input type="file" id="file-input" accept="image/jpeg,image/jpg" style="display: none;">
            </div>

            <div id="image-container" style="display: none;">
                <div class="exif-tabs">
                    <button class="exif-tab active" data-tab="view">VIEW</button>
                    <button class="exif-tab" data-tab="edit">EDIT</button>
                    <button class="exif-tab" data-tab="remove">REMOVE</button>
                </div>

                <div id="view-tab" class="exif-tab-content active">
                    <div id="view-content"></div>
                </div>

                <div id="edit-tab" class="exif-tab-content">
                    <div id="edit-content"></div>
                </div>

                <div id="remove-tab" class="exif-tab-content">
                    <div id="remove-content"></div>
                </div>
            </div>
        </div>
    `,
    async init() {
        let currentImage = null;
        let piexifLoaded = false;

        const uploadArea = document.getElementById('upload-area');
        const fileInput = document.getElementById('file-input');
        const imageContainer = document.getElementById('image-container');

        async function loadPiexifLibrary() {
            if (piexifLoaded && window.piexif) {
                return true;
            }

            const existing = document.querySelector('script[src*="piexif"]');
            if (existing && window.piexif) {
                piexifLoaded = true;
                return true;
            }

            return new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = 'https://cdn.jsdelivr.net/npm/piexifjs@1.0.6/piexif.min.js';
                
                script.onload = () => {
                    const checkInterval = setInterval(() => {
                        if (window.piexif && typeof window.piexif.load === 'function') {
                            clearInterval(checkInterval);
                            piexifLoaded = true;
                            resolve(true);
                        }
                    }, 50);
                    
                    setTimeout(() => {
                        clearInterval(checkInterval);
                        if (!piexifLoaded) {
                            reject(new Error('Timeout'));
                        }
                    }, 5000);
                };
                
                script.onerror = () => reject(new Error('Script load failed'));
                document.head.appendChild(script);
            });
        }

        try {
            await loadPiexifLibrary();
        } catch (e) {
            console.error('Library load failed:', e);
        }

        uploadArea.addEventListener('click', () => fileInput.click());
        
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('dragover');
        });
        
        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('dragover');
        });
        
        uploadArea.addEventListener('drop', async (e) => {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
            await handleFiles(e.dataTransfer.files);
        });
        
        fileInput.addEventListener('change', async (e) => {
            await handleFiles(e.target.files);
        });

        async function handleFiles(files) {
            const file = files[0];
            if (!file) return;

            const isJpeg = file.type === 'image/jpeg' || 
                          file.name.toLowerCase().endsWith('.jpg') || 
                          file.name.toLowerCase().endsWith('.jpeg');

            if (!isJpeg) {
                ToolUtils.showNotification('Please select a JPEG image', 3000);
                return;
            }

            if (!piexifLoaded) {
                try {
                    await loadPiexifLibrary();
                } catch (e) {
                    ToolUtils.showNotification('EXIF library not ready. Please refresh.', 3000);
                    return;
                }
            }

            uploadArea.innerHTML = `
                <i class="fas fa-spinner fa-spin"></i>
                <p>Loading image...</p>
            `;

            const arrayBufferPromise = new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (e) => resolve(e.target.result);
                reader.onerror = reject;
                reader.readAsArrayBuffer(file);
            });

            const dataUrlPromise = new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (e) => resolve(e.target.result);
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });

            try {
                const [arrayBuffer, dataUrl] = await Promise.all([arrayBufferPromise, dataUrlPromise]);
                
                const imageData = {
                    file: file,
                    arrayBuffer: arrayBuffer,
                    dataUrl: dataUrl,
                    exifData: null,
                    originalExif: null,
                    error: null
                };
                
                currentImage = imageData;
                await loadImageMetadata(imageData);
                uploadArea.style.display = 'none';
                
            } catch (e) {
                console.error('File read error:', e);
                ToolUtils.showNotification('Error reading file', 3000);
                resetUploadArea();
            }

            fileInput.value = '';
        }

        async function loadImageMetadata(imageData) {
            if (!window.piexif) {
                imageData.error = 'EXIF library not loaded';
                displayImage();
                return;
            }

            try {
                const bytes = new Uint8Array(imageData.arrayBuffer);
                
                let hasExifMarker = false;
                for (let i = 0; i < Math.min(bytes.length - 1, 1000); i++) {
                    if (bytes[i] === 0xFF && bytes[i + 1] === 0xE1) {
                        hasExifMarker = true;
                        break;
                    }
                }
                
                if (!hasExifMarker) {
                    imageData.exifData = null;
                    imageData.error = null;
                    displayImage();
                    return;
                }
                
                const exifObj = window.piexif.load(imageData.dataUrl);
                
                const hasData = Object.keys(exifObj).some(key => {
                    return exifObj[key] && typeof exifObj[key] === 'object' && Object.keys(exifObj[key]).length > 0;
                });
                
                if (hasData) {
                    imageData.exifData = exifObj;
                    imageData.originalExif = JSON.parse(JSON.stringify(exifObj));
                } else {
                    imageData.exifData = null;
                }
                
            } catch (e) {
                if (e.message && /no exif/i.test(e.message)) {
                    imageData.exifData = null;
                    imageData.error = null;
                } else {
                    imageData.exifData = null;
                    imageData.error = `Error: ${e.message}`;
                }
            }
            
            displayImage();
        }

        function resetUploadArea() {
            uploadArea.innerHTML = `
                <i class="fas fa-cloud-upload-alt"></i>
                <p><strong>Drag and drop image here</strong></p>
                <p style="font-size: 12px;">or click to browse</p>
                <p style="font-size: 11px; color: var(--text-disabled); margin-top: 10px;">Supports JPG, JPEG</p>
            `;
        }

        function displayImage() {
            if (!currentImage) return;
            
            imageContainer.style.display = 'block';
            renderViewTab(currentImage);
            renderEditTab(currentImage);
            renderRemoveTab(currentImage);
            setTimeout(addUploadNewButton, 100);
        }

        function renderViewTab(imageData) {
            const content = document.getElementById('view-content');
            
            let html = `
                <div class="image-preview-container">
                    <div class="image-preview">
                        <img src="${imageData.dataUrl}" alt="Preview">
                        <div class="image-info">
                            <div class="image-info-item">
                                <span class="image-info-label">Filename:</span>
                                <span class="image-info-value">${imageData.file.name}</span>
                            </div>
                            <div class="image-info-item">
                                <span class="image-info-label">Size:</span>
                                <span class="image-info-value">${formatFileSize(imageData.file.size)}</span>
                            </div>
                            <div class="image-info-item">
                                <span class="image-info-label">Type:</span>
                                <span class="image-info-value">${imageData.file.type}</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            if (imageData.error) {
                html += `
                    <div class="format-warning">
                        <i class="fas fa-exclamation-triangle"></i>
                        <span>${imageData.error}</span>
                    </div>
                `;
            }

            if (!imageData.exifData) {
                html += `
                    <div class="no-metadata">
                        <i class="fas fa-info-circle"></i>
                        <p>No EXIF metadata found in this image.</p>
                        <p style="font-size: 12px; margin-top: 10px;">This is normal for images that have been processed or shared on social media.</p>
                    </div>
                `;
            } else {
                const exif = imageData.exifData;
                const hasGPS = exif.GPS && Object.keys(exif.GPS).length > 0;

                if (hasGPS) {
                    html += `
                        <div class="gps-warning">
                            <i class="fas fa-exclamation-triangle"></i>
                            <div class="gps-warning-content">
                                <div class="gps-warning-title">PRIVACY WARNING</div>
                                <div class="gps-warning-text">This image contains GPS location data! Remove before sharing publicly.</div>
                            </div>
                            <button class="gps-map-button" onclick="window.exifViewer.viewOnMap()">View Map</button>
                        </div>
                    `;
                }

                html += renderMetadataSections(exif);
                
                html += `
                    <div class="action-buttons">
                        <button class="tool-button secondary" onclick="window.exifViewer.exportMetadata()">
                            <i class="fas fa-download"></i> Export as JSON
                        </button>
                        <button class="tool-button secondary" onclick="window.exifViewer.copyMetadata()">
                            <i class="fas fa-copy"></i> Copy to Clipboard
                        </button>
                    </div>
                `;
            }

            content.innerHTML = html;
            setupMetadataSections();

            window.exifViewer = window.exifViewer || {};
            
            window.exifViewer.viewOnMap = () => {
                const gps = imageData.exifData.GPS;
                if (gps && gps[window.piexif.GPSIFD.GPSLatitude]) {
                    const lat = convertDMSToDD(
                        gps[window.piexif.GPSIFD.GPSLatitude],
                        gps[window.piexif.GPSIFD.GPSLatitudeRef]
                    );
                    const lon = convertDMSToDD(
                        gps[window.piexif.GPSIFD.GPSLongitude],
                        gps[window.piexif.GPSIFD.GPSLongitudeRef]
                    );
                    window.open(`https://www.google.com/maps?q=${lat},${lon}`, '_blank');
                }
            };

            window.exifViewer.exportMetadata = () => {
                const json = JSON.stringify(imageData.exifData, null, 2);
                const blob = new Blob([json], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = imageData.file.name.replace(/\.(jpg|jpeg)$/i, '_metadata.json');
                a.click();
                URL.revokeObjectURL(url);
            };

            window.exifViewer.copyMetadata = () => {
                const text = JSON.stringify(imageData.exifData, null, 2);
                navigator.clipboard.writeText(text).then(() => {
                    ToolUtils.showNotification('Copied to clipboard!', 2000);
                });
            };
        }

        function renderEditTab(imageData) {
            const content = document.getElementById('edit-content');
            
            if (!imageData.exifData) {
                content.innerHTML = `
                    <div class="no-metadata">
                        <i class="fas fa-info-circle"></i>
                        <p>No EXIF metadata to edit.</p>
                    </div>
                `;
                return;
            }

            const exif = imageData.exifData;
            let html = `
                <div class="remove-warning">
                    <div class="remove-warning-title">Edit EXIF Metadata</div>
                    <div class="remove-warning-text">
                        Modify the metadata fields below. Changes will be saved to a new image file when you download.
                    </div>
                </div>
            `;

            const editableFields = [
                { section: '0th', tag: '271', label: 'Camera Make', type: 'text' },
                { section: '0th', tag: '272', label: 'Camera Model', type: 'text' },
                { section: '0th', tag: '305', label: 'Software', type: 'text' },
                { section: '0th', tag: '306', label: 'Date/Time', type: 'text' },
                { section: '0th', tag: '315', label: 'Artist', type: 'text' },
                { section: '0th', tag: '33432', label: 'Copyright', type: 'text' },
                { section: '0th', tag: '270', label: 'Image Description', type: 'textarea' },
                { section: 'Exif', tag: '36867', label: 'Date Taken', type: 'text' },
                { section: 'Exif', tag: '37386', label: 'Focal Length (mm)', type: 'text' },
            ];

            html += '<div class="edit-section">';
            html += '<div class="edit-section-title">Image Information</div>';
            
            editableFields.forEach(field => {
                const section = exif[field.section];
                const value = section && section[field.tag] ? formatValueForEdit(section[field.tag]) : '';
                const fieldId = `edit-${field.section}-${field.tag}`;
                
                html += `
                    <div class="edit-field">
                        <label for="${fieldId}">${field.label}</label>
                        ${field.type === 'textarea' 
                            ? `<textarea id="${fieldId}" data-section="${field.section}" data-tag="${field.tag}">${escapeHtml(value)}</textarea>`
                            : `<input type="text" id="${fieldId}" data-section="${field.section}" data-tag="${field.tag}" value="${escapeHtml(value)}">`
                        }
                    </div>
                `;
            });
            
            html += '</div>';

            html += `
                <div class="action-buttons">
                    <button class="tool-button" onclick="window.exifViewer.saveEditedImage()">
                        <i class="fas fa-download"></i> Download Edited Image
                    </button>
                    <button class="tool-button secondary" onclick="window.exifViewer.resetEdits()">
                        <i class="fas fa-undo"></i> Reset Changes
                    </button>
                </div>
            `;

            content.innerHTML = html;

            window.exifViewer = window.exifViewer || {};
            window.exifViewer.saveEditedImage = () => {
                saveEditedImage(imageData);
            };
            window.exifViewer.resetEdits = () => {
                renderEditTab(imageData);
            };
        }

        function renderRemoveTab(imageData) {
            const content = document.getElementById('remove-content');
            
            if (!imageData.exifData) {
                content.innerHTML = `
                    <div class="no-metadata">
                        <i class="fas fa-info-circle"></i>
                        <p>No EXIF metadata to remove.</p>
                    </div>
                `;
                return;
            }

            const exif = imageData.exifData;
            const hasGPS = exif.GPS && Object.keys(exif.GPS).length > 0;
            
            let html = `
                <div class="remove-warning">
                    <div class="remove-warning-title">Remove EXIF Metadata</div>
                    <div class="remove-warning-text">
                        This will permanently remove all EXIF metadata from the image, including:
                    </div>
                    <ul style="margin: 10px 0; padding-left: 20px; color: var(--text-secondary);">
                        <li>Camera settings (ISO, aperture, shutter speed)</li>
                        <li>Location data (GPS coordinates)</li>
                        <li>Date and time information</li>
                        <li>Camera make and model</li>
                        <li>Software information</li>
                        <li>All other metadata tags</li>
                    </ul>
                    ${hasGPS ? `
                        <div style="background: #ff6b6b; color: white; padding: 12px; border-radius: 4px; margin-top: 15px;">
                            <strong>This image contains GPS location data.</strong> Removing EXIF will delete this sensitive information.
                        </div>
                    ` : ''}
                    <div class="remove-info">
                        <strong>Note:</strong> The image quality and appearance will not be affected. Only metadata is removed.
                    </div>
                </div>
                <div class="action-buttons">
                    <button class="tool-button" onclick="window.exifViewer.removeExif()" style="background: #ff6b6b;">
                        <i class="fas fa-trash"></i> Remove All EXIF Data
                    </button>
                </div>
            `;

            content.innerHTML = html;

            window.exifViewer = window.exifViewer || {};
            window.exifViewer.removeExif = () => {
                removeExifData(imageData);
            };
        }

        function formatValueForEdit(value) {
            if (value === null || value === undefined) return '';
            if (typeof value === 'string') return value;
            if (typeof value === 'number') return String(value);
            if (Array.isArray(value)) {
                if (value.length === 2 && typeof value[0] === 'number' && typeof value[1] === 'number') {
                    return String(value[0] / value[1]);
                }
                if (value.every(v => typeof v === 'number' && v >= 0 && v <= 255)) {
                    return value.join('.');
                }
                return value.join(', ');
            }
            return String(value);
        }

        function escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }

        function saveEditedImage(imageData) {
            if (!window.piexif || !imageData.exifData) {
                ToolUtils.showNotification('Cannot save: EXIF data not available', 3000);
                return;
            }

            try {
                const editedExif = JSON.parse(JSON.stringify(imageData.exifData));
                
                document.querySelectorAll('#edit-content input, #edit-content textarea').forEach(input => {
                    const section = input.dataset.section;
                    const tag = input.dataset.tag;
                    const value = input.value.trim();
                    
                    if (!editedExif[section]) {
                        editedExif[section] = {};
                    }
                    
                    if (value === '') {
                        delete editedExif[section][tag];
                    } else {
                        const originalValue = imageData.originalExif[section] && imageData.originalExif[section][tag];
                        
                        if (Array.isArray(originalValue) && originalValue.length === 2) {
                            const num = parseFloat(value);
                            if (!isNaN(num)) {
                                editedExif[section][tag] = [Math.round(num * 100), 100];
                            } else {
                                editedExif[section][tag] = value;
                            }
                        } else if (typeof originalValue === 'number') {
                            const num = parseFloat(value);
                            editedExif[section][tag] = isNaN(num) ? value : num;
                        } else {
                            editedExif[section][tag] = value;
                        }
                    }
                });

                const exifBytes = window.piexif.dump(editedExif);
                const newDataUrl = window.piexif.insert(exifBytes, imageData.dataUrl);
                
                downloadImage(newDataUrl, imageData.file.name.replace(/\.(jpg|jpeg)$/i, '_edited.jpg'));
                ToolUtils.showNotification('Image downloaded successfully', 2000);
                
            } catch (e) {
                console.error('Error saving edited image:', e);
                ToolUtils.showNotification('Error saving image: ' + e.message, 3000);
            }
        }

        function removeExifData(imageData) {
            if (!window.piexif) {
                ToolUtils.showNotification('EXIF library not available', 3000);
                return;
            }

            try {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0);
                    
                    const cleanedDataUrl = canvas.toDataURL('image/jpeg', 0.95);
                    downloadImage(cleanedDataUrl, imageData.file.name.replace(/\.(jpg|jpeg)$/i, '_no_exif.jpg'));
                    ToolUtils.showNotification('EXIF data removed. Image downloaded.', 2000);
                };
                img.onerror = () => {
                    ToolUtils.showNotification('Error processing image', 3000);
                };
                img.src = imageData.dataUrl;
            } catch (e) {
                console.error('Error removing EXIF:', e);
                ToolUtils.showNotification('Error: ' + e.message, 3000);
            }
        }

        function downloadImage(dataUrl, filename) {
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }

        function formatFileSize(bytes) {
            if (bytes === 0) return '0 Bytes';
            const k = 1024;
            const sizes = ['Bytes', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
        }

        function convertDMSToDD(dms, ref) {
            if (!dms || !Array.isArray(dms) || dms.length < 3) return null;
            let dd = dms[0][0]/dms[0][1] + dms[1][0]/dms[1][1]/60 + dms[2][0]/dms[2][1]/3600;
            if (ref === 'S' || ref === 'W') dd = dd * -1;
            return dd.toFixed(6);
        }

        function renderMetadataSections(exif) {
            let html = '';

            if (exif['0th'] && Object.keys(exif['0th']).length > 0) {
                const items = [];
                Object.entries(exif['0th']).forEach(([tag, value]) => {
                    const tagName = getTagName('0th', tag);
                    items.push({ label: tagName, value: formatValue(value) });
                });
                if (items.length > 0) {
                    html += createMetadataSection('Image Info', items);
                }
            }

            if (exif.Exif && Object.keys(exif.Exif).length > 0) {
                const items = [];
                Object.entries(exif.Exif).forEach(([tag, value]) => {
                    const tagName = getTagName('Exif', tag);
                    items.push({ label: tagName, value: formatValue(value) });
                });
                if (items.length > 0) {
                    html += createMetadataSection('EXIF Data', items);
                }
            }

            if (exif.GPS && Object.keys(exif.GPS).length > 0) {
                const items = [];
                const gps = exif.GPS;
                
                if (gps[window.piexif.GPSIFD.GPSLatitude]) {
                    const lat = convertDMSToDD(
                        gps[window.piexif.GPSIFD.GPSLatitude],
                        gps[window.piexif.GPSIFD.GPSLatitudeRef]
                    );
                    const lon = convertDMSToDD(
                        gps[window.piexif.GPSIFD.GPSLongitude],
                        gps[window.piexif.GPSIFD.GPSLongitudeRef]
                    );
                    items.push({ label: 'Latitude', value: lat + '°' });
                    items.push({ label: 'Longitude', value: lon + '°' });
                }
                
                Object.entries(gps).forEach(([tag, value]) => {
                    if (!['1', '2', '3', '4'].includes(tag)) {
                        const tagName = getTagName('GPS', tag);
                        items.push({ label: tagName, value: formatValue(value) });
                    }
                });
                
                if (items.length > 0) {
                    html += createMetadataSection('GPS Location', items, true);
                }
            }

            if (exif['1st'] && Object.keys(exif['1st']).length > 0) {
                const items = [];
                Object.entries(exif['1st']).forEach(([tag, value]) => {
                    const tagName = getTagName('1st', tag);
                    items.push({ label: tagName, value: formatValue(value) });
                });
                if (items.length > 0) {
                    html += createMetadataSection('Thumbnail Info', items);
                }
            }

            return html;
        }

        function getTagName(ifd, tag) {
            const tagNum = parseInt(tag);
            
            const names = {
                '0th': {
                    271: 'Make', 272: 'Model', 274: 'Orientation',
                    282: 'X Resolution', 283: 'Y Resolution', 296: 'Resolution Unit',
                    305: 'Software', 306: 'DateTime', 315: 'Artist', 
                    33432: 'Copyright', 270: 'Image Description'
                },
                'Exif': {
                    33434: 'Exposure Time', 33437: 'F-Number', 34850: 'Exposure Program',
                    34855: 'ISO Speed', 36867: 'Date Taken', 36868: 'Date Digitized',
                    37121: 'Components Config', 37377: 'Shutter Speed',
                    37378: 'Aperture', 37380: 'Exposure Bias', 37383: 'Metering Mode',
                    37385: 'Flash', 37386: 'Focal Length', 40960: 'FlashPix Version',
                    40961: 'Color Space', 41486: 'Focal Plane X Resolution',
                    41487: 'Focal Plane Y Resolution'
                },
                'GPS': {
                    0: 'GPS Version', 1: 'Latitude Ref', 2: 'Latitude',
                    3: 'Longitude Ref', 4: 'Longitude', 5: 'Altitude Ref',
                    6: 'Altitude', 7: 'Time Stamp', 29: 'Date Stamp'
                },
                '1st': {
                    259: 'Compression', 282: 'X Resolution', 283: 'Y Resolution',
                    296: 'Resolution Unit', 513: 'JPEG Offset', 514: 'JPEG Length'
                }
            };
            
            return (names[ifd] && names[ifd][tagNum]) || `Tag ${tag}`;
        }

        function formatValue(value) {
            if (value === null || value === undefined) return 'N/A';
            if (typeof value === 'string') return value;
            if (typeof value === 'number') return String(value);
            if (Array.isArray(value)) {
                if (value.length === 2 && typeof value[0] === 'number' && typeof value[1] === 'number') {
                    const result = value[0] / value[1];
                    return result % 1 === 0 ? String(result) : result.toFixed(4);
                }
                if (value.every(v => typeof v === 'number' && v >= 0 && v <= 255)) {
                    return value.join('.');
                }
                return value.join(', ');
            }
            return String(value);
        }

        function createMetadataSection(title, items, expanded = false) {
            const sectionId = title.toLowerCase().replace(/[^a-z0-9]/g, '-');
            let html = `
                <div class="metadata-section ${expanded ? 'expanded' : ''}" id="section-${sectionId}">
                    <div class="metadata-section-header" onclick="window.toggleSection('${sectionId}')">
                        <span class="metadata-section-title">${title} (${items.length})</span>
                        <i class="fas fa-chevron-down metadata-section-toggle"></i>
                    </div>
                    <div class="metadata-section-content">
            `;
            
            items.forEach(item => {
                html += `
                    <div class="metadata-item">
                        <span class="metadata-label">${item.label}</span>
                        <span class="metadata-value">${item.value}</span>
                    </div>
                `;
            });
            
            html += `</div></div>`;
            return html;
        }

        function setupMetadataSections() {
            window.toggleSection = (sectionId) => {
                const section = document.getElementById(`section-${sectionId}`);
                if (section) {
                    section.classList.toggle('expanded');
                }
            };
        }

        function addUploadNewButton() {
            const viewContent = document.getElementById('view-content');
            if (viewContent && !viewContent.querySelector('.upload-new-btn')) {
                const btn = document.createElement('button');
                btn.className = 'tool-button secondary upload-new-btn';
                btn.style.marginTop = '20px';
                btn.innerHTML = '<i class="fas fa-upload"></i> Upload Another Image';
                btn.onclick = () => {
                    currentImage = null;
                    imageContainer.style.display = 'none';
                    uploadArea.style.display = 'block';
                    resetUploadArea();
                };
                viewContent.appendChild(btn);
            }
        }

        document.querySelectorAll('.exif-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                const tabName = tab.dataset.tab;
                document.querySelectorAll('.exif-tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.exif-tab-content').forEach(c => c.classList.remove('active'));
                tab.classList.add('active');
                document.getElementById(`${tabName}-tab`).classList.add('active');
            });
        });
    }
};