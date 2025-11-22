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

        .metadata-section-header i {
            margin-right: 10px;
            color: var(--accent-color);
            width: 20px;
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

        .edit-form-group {
            margin-bottom: 20px;
        }

        .edit-form-group label {
            display: block;
            margin-bottom: 6px;
            color: var(--text-secondary);
            font-size: 13px;
            font-weight: 500;
        }

        .edit-form-group input,
        .edit-form-group textarea {
            width: 100%;
            padding: 10px 12px;
            background: var(--bg-tertiary);
            border: 1px solid var(--border-color);
            border-radius: 4px;
            color: var(--text-primary);
            font-size: 13px;
        }

        .edit-form-group textarea {
            min-height: 80px;
            resize: vertical;
        }

        .quick-actions {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
            margin-bottom: 20px;
        }

        .quick-action-btn {
            padding: 8px 16px;
            background: var(--bg-tertiary);
            border: 1px solid var(--border-color);
            color: var(--text-primary);
            border-radius: 4px;
            cursor: pointer;
            font-size: 12px;
            transition: all var(--transition-speed);
        }

        .quick-action-btn:hover {
            background: var(--bg-hover);
            border-color: var(--accent-color);
        }

        .remove-options {
            background: var(--bg-secondary);
            padding: 20px;
            border-radius: 4px;
            border: 1px solid var(--border-color);
            margin-bottom: 20px;
        }

        .remove-option {
            display: flex;
            align-items: center;
            padding: 12px 0;
            border-bottom: 1px solid var(--border-color);
        }

        .remove-option:last-child {
            border-bottom: none;
        }

        .remove-option input[type="checkbox"] {
            margin-right: 10px;
            width: 18px;
            height: 18px;
            cursor: pointer;
        }

        .remove-option label {
            flex: 1;
            cursor: pointer;
            color: var(--text-primary);
            font-size: 13px;
        }

        .file-size-comparison {
            display: flex;
            justify-content: space-between;
            padding: 15px;
            background: var(--bg-tertiary);
            border-radius: 4px;
            margin-bottom: 20px;
        }

        .file-size-item {
            text-align: center;
        }

        .file-size-label {
            color: var(--text-secondary);
            font-size: 12px;
            margin-bottom: 5px;
        }

        .file-size-value {
            color: var(--text-primary);
            font-size: 18px;
            font-weight: 600;
        }

        .rating-stars {
            display: flex;
            gap: 5px;
        }

        .rating-star {
            font-size: 20px;
            color: var(--text-disabled);
            cursor: pointer;
            transition: color var(--transition-speed);
        }

        .rating-star.active {
            color: #ffd700;
        }

        .rating-star:hover {
            color: #ffd700;
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

        .debug-info {
            background: var(--bg-tertiary);
            border: 1px solid var(--border-color);
            padding: 10px;
            margin: 10px 0;
            border-radius: 4px;
            font-family: monospace;
            font-size: 11px;
            color: var(--text-secondary);
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
                <input type="file" id="file-input" accept="image/jpeg,image/jpg" multiple style="display: none;">
            </div>

            <div id="image-container" style="display: none;">
                <div class="exif-tabs">
                    <button class="exif-tab active" data-tab="view">📋 VIEW</button>
                    <button class="exif-tab" data-tab="edit">✏️ EDIT</button>
                    <button class="exif-tab" data-tab="remove">🗑️ REMOVE</button>
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

        // Improved library loading with better error handling
        async function loadPiexifLibrary() {
            if (piexifLoaded && window.piexif) {
                console.log('✅ piexif already loaded');
                return true;
            }

            // Check if already in DOM
            const existing = document.querySelector('script[src*="piexif"]');
            if (existing && window.piexif) {
                piexifLoaded = true;
                console.log('✅ piexif found in window');
                return true;
            }

            console.log('📦 Loading piexif library...');
            
            return new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = 'https://cdn.jsdelivr.net/npm/piexifjs@1.0.6/piexif.min.js';
                
                let checkAttempts = 0;
                const maxAttempts = 50;
                
                script.onload = () => {
                    console.log('📜 Script loaded, waiting for piexif...');
                    
                    const checkPiexif = setInterval(() => {
                        checkAttempts++;
                        
                        if (window.piexif && typeof window.piexif.load === 'function') {
                            clearInterval(checkPiexif);
                            piexifLoaded = true;
                            console.log('✅ piexif ready!');
                            resolve(true);
                        } else if (checkAttempts >= maxAttempts) {
                            clearInterval(checkPiexif);
                            console.error('❌ piexif timeout');
                            reject(new Error('Timeout waiting for piexif'));
                        }
                    }, 100);
                };
                
                script.onerror = (err) => {
                    console.error('❌ Script load failed:', err);
                    reject(new Error('Failed to load piexif script'));
                };
                
                document.head.appendChild(script);
            });
        }

        // Load library immediately
        try {
            await loadPiexifLibrary();
        } catch (e) {
            console.error('Initial library load failed:', e);
            ToolUtils.showNotification('⚠️ Error loading EXIF library. Please refresh.', 5000);
        }

        // Upload handlers
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

            // Ensure library is loaded
            if (!piexifLoaded) {
                try {
                    await loadPiexifLibrary();
                } catch (e) {
                    ToolUtils.showNotification('EXIF library not ready. Please refresh the page.', 3000);
                    return;
                }
            }

            uploadArea.innerHTML = `
                <i class="fas fa-spinner fa-spin"></i>
                <p>Loading image...</p>
            `;

            const reader = new FileReader();
            
            reader.onload = async (e) => {
                console.log('📷 File loaded, size:', file.size);
                
                const imageData = {
                    file: file,
                    dataUrl: e.target.result,
                    exifData: null,
                    originalExif: null,
                    error: null
                };
                
                currentImage = imageData;
                await loadImageMetadata(imageData);
                uploadArea.style.display = 'none';
            };
            
            reader.onerror = () => {
                console.error('❌ FileReader error');
                ToolUtils.showNotification('Error reading file', 3000);
                resetUploadArea();
            };
            
            reader.readAsDataURL(file);
            fileInput.value = '';
        }

        async function loadImageMetadata(imageData) {
            console.log('🔍 Loading EXIF metadata...');
            
            // Triple-check library is ready
            if (!window.piexif || typeof window.piexif.load !== 'function') {
                console.error('❌ piexif not available');
                imageData.error = 'EXIF library not loaded';
                displayImage();
                return;
            }

            try {
                console.log('📊 Calling piexif.load()...');
                const exifObj = window.piexif.load(imageData.dataUrl);
                
                console.log('✅ EXIF loaded successfully:', exifObj);
                
                imageData.exifData = exifObj;
                imageData.originalExif = JSON.parse(JSON.stringify(exifObj));
                
                // Check what we got
                const hasData = Object.keys(exifObj).some(key => 
                    exifObj[key] && Object.keys(exifObj[key]).length > 0
                );
                
                if (!hasData) {
                    console.log('ℹ️ No EXIF data in image');
                    imageData.exifData = null;
                } else {
                    console.log('✅ EXIF data found:', 
                        Object.keys(exifObj).filter(k => Object.keys(exifObj[k]).length > 0)
                    );
                }
                
            } catch (e) {
                console.error('❌ EXIF extraction error:', e);
                console.error('Error details:', e.message, e.stack);
                
                // Check for "no exif" errors (this is normal for some images)
                if (e.message && /no exif/i.test(e.message)) {
                    console.log('ℹ️ Image has no EXIF data (normal)');
                    imageData.exifData = null;
                    imageData.error = null;
                } else {
                    imageData.exifData = null;
                    imageData.error = `EXIF Error: ${e.message}`;
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
            
            console.log('🎨 Displaying image...');
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
                                <div class="gps-warning-title">⚠️ PRIVACY WARNING</div>
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

            // Setup window functions
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
                const text = formatMetadataForCopy(imageData.exifData);
                navigator.clipboard.writeText(text).then(() => {
                    ToolUtils.showNotification('✅ Copied to clipboard!', 2000);
                });
            };
        }

        function renderEditTab(imageData) {
            const content = document.getElementById('edit-content');
            const exif = imageData.exifData || { "0th": {}, "Exif": {}, "GPS": {}, "1st": {}, "Interop": {} };

            let html = `
                <div class="image-preview-container">
                    <div class="image-preview">
                        <img src="${imageData.dataUrl}" alt="Preview" style="max-width: 200px;">
                    </div>
                </div>
            `;

            if (!imageData.exifData) {
                html += `
                    <div class="format-warning">
                        <i class="fas fa-info-circle"></i>
                        <span>This image has no EXIF data. You can add new metadata below.</span>
                    </div>
                `;
            }

            html += `
                <div class="quick-actions">
                    <button class="quick-action-btn" onclick="window.exifViewer.addCopyright()">
                        <i class="fas fa-copyright"></i> Add Copyright
                    </button>
                    <button class="quick-action-btn" onclick="window.exifViewer.setCurrentDateTime()">
                        <i class="fas fa-clock"></i> Set Current Date/Time
                    </button>
                    <button class="quick-action-btn" onclick="window.exifViewer.clearGPS()">
                        <i class="fas fa-map-marker-alt"></i> Clear GPS Data
                    </button>
                </div>

                <form id="edit-form">
                    <div class="edit-form-group">
                        <label><i class="fas fa-user"></i> Artist/Author</label>
                        <input type="text" id="edit-artist" value="${getExifValue(exif, '0th', window.piexif.ImageIFD.Artist) || ''}" placeholder="Photographer name">
                    </div>

                    <div class="edit-form-group">
                        <label><i class="fas fa-copyright"></i> Copyright</label>
                        <input type="text" id="edit-copyright" value="${getExifValue(exif, '0th', window.piexif.ImageIFD.Copyright) || ''}" placeholder="© 2024 Your Name">
                    </div>

                    <div class="edit-form-group">
                        <label><i class="fas fa-align-left"></i> Description/Image Description</label>
                        <textarea id="edit-description" placeholder="Image description">${getExifValue(exif, '0th', window.piexif.ImageIFD.ImageDescription) || ''}</textarea>
                    </div>

                    <div class="edit-form-group">
                        <label><i class="fas fa-comment"></i> User Comment</label>
                        <textarea id="edit-comment" placeholder="User comments">${(() => {
                            const comment = exif.Exif && exif.Exif[window.piexif.ExifIFD.UserComment];
                            if (Array.isArray(comment) && comment.length > 8) {
                                try {
                                    return String.fromCharCode.apply(null, comment.slice(8)).replace(/\0/g, '');
                                } catch (e) {
                                    return '';
                                }
                            }
                            return comment ? String(comment) : '';
                        })()}</textarea>
                    </div>

                    <div class="edit-form-group">
                        <label><i class="fas fa-calendar"></i> Date/Time Original</label>
                        <input type="datetime-local" id="edit-datetime" value="${formatDateTimeForInput(getExifValue(exif, 'Exif', window.piexif.ExifIFD.DateTimeOriginal))}">
                    </div>

                    <div class="edit-form-group">
                        <label><i class="fas fa-camera"></i> Camera Make</label>
                        <input type="text" id="edit-make" value="${getExifValue(exif, '0th', window.piexif.ImageIFD.Make) || ''}" placeholder="Camera manufacturer">
                    </div>

                    <div class="edit-form-group">
                        <label><i class="fas fa-camera-retro"></i> Camera Model</label>
                        <input type="text" id="edit-model" value="${getExifValue(exif, '0th', window.piexif.ImageIFD.Model) || ''}" placeholder="Camera model">
                    </div>

                    <div class="edit-form-group">
                        <label><i class="fas fa-code"></i> Software</label>
                        <input type="text" id="edit-software" value="${getExifValue(exif, '0th', window.piexif.ImageIFD.Software) || ''}" placeholder="Software used">
                    </div>

                    <div class="edit-form-group">
                        <label><i class="fas fa-map-marker-alt"></i> GPS Latitude (decimal)</label>
                        <input type="number" id="edit-gps-lat" step="0.000001" value="${getGPSDecimal(exif, 'lat') || ''}" placeholder="e.g., 40.7128">
                    </div>

                    <div class="edit-form-group">
                        <label><i class="fas fa-map-marker-alt"></i> GPS Longitude (decimal)</label>
                        <input type="number" id="edit-gps-lon" step="0.000001" value="${getGPSDecimal(exif, 'lon') || ''}" placeholder="e.g., -74.0060">
                    </div>

                    <div class="action-buttons">
                        <button type="button" class="tool-button" onclick="window.exifViewer.applyChanges()">
                            <i class="fas fa-check"></i> Apply Changes
                        </button>
                        <button type="button" class="tool-button secondary" onclick="window.exifViewer.downloadEdited()">
                            <i class="fas fa-download"></i> Download Edited Image
                        </button>
                    </div>
                </form>
            `;

            content.innerHTML = html;

            window.exifViewer = window.exifViewer || {};
            
            window.exifViewer.addCopyright = () => {
                const year = new Date().getFullYear();
                document.getElementById('edit-copyright').value = `© ${year} Your Name`;
            };

            window.exifViewer.setCurrentDateTime = () => {
                const now = new Date();
                const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
                document.getElementById('edit-datetime').value = local.toISOString().slice(0, 16);
            };

            window.exifViewer.clearGPS = () => {
                document.getElementById('edit-gps-lat').value = '';
                document.getElementById('edit-gps-lon').value = '';
            };

            window.exifViewer.applyChanges = () => {
                const newExif = JSON.parse(JSON.stringify(exif));
                
                // Ensure all IFDs exist
                if (!newExif['0th']) newExif['0th'] = {};
                if (!newExif['Exif']) newExif['Exif'] = {};
                if (!newExif['GPS']) newExif['GPS'] = {};
                
                const artist = document.getElementById('edit-artist').value.trim();
                if (artist) {
                    newExif['0th'][window.piexif.ImageIFD.Artist] = artist;
                } else {
                    delete newExif['0th'][window.piexif.ImageIFD.Artist];
                }

                const copyright = document.getElementById('edit-copyright').value.trim();
                if (copyright) {
                    newExif['0th'][window.piexif.ImageIFD.Copyright] = copyright;
                } else {
                    delete newExif['0th'][window.piexif.ImageIFD.Copyright];
                }

                const description = document.getElementById('edit-description').value.trim();
                if (description) {
                    newExif['0th'][window.piexif.ImageIFD.ImageDescription] = description;
                } else {
                    delete newExif['0th'][window.piexif.ImageIFD.ImageDescription];
                }

                const comment = document.getElementById('edit-comment').value.trim();
                if (comment) {
                    // UserComment needs to be encoded as UTF-8 bytes with charset prefix
                    const commentBytes = [0x55, 0x4E, 0x49, 0x43, 0x4F, 0x44, 0x45, 0x00]; // "UNICODE\0"
                    for (let i = 0; i < comment.length; i++) {
                        const code = comment.charCodeAt(i);
                        commentBytes.push(code & 0xFF);
                        commentBytes.push((code >> 8) & 0xFF);
                    }
                    newExif['Exif'][window.piexif.ExifIFD.UserComment] = commentBytes;
                } else {
                    delete newExif['Exif'][window.piexif.ExifIFD.UserComment];
                }

                const datetime = document.getElementById('edit-datetime').value;
                if (datetime) {
                    const dateStr = formatDateTimeForExif(datetime);
                    newExif['Exif'][window.piexif.ExifIFD.DateTimeOriginal] = dateStr;
                } else {
                    delete newExif['Exif'][window.piexif.ExifIFD.DateTimeOriginal];
                }

                const make = document.getElementById('edit-make').value.trim();
                if (make) {
                    newExif['0th'][window.piexif.ImageIFD.Make] = make;
                } else {
                    delete newExif['0th'][window.piexif.ImageIFD.Make];
                }

                const model = document.getElementById('edit-model').value.trim();
                if (model) {
                    newExif['0th'][window.piexif.ImageIFD.Model] = model;
                } else {
                    delete newExif['0th'][window.piexif.ImageIFD.Model];
                }

                const software = document.getElementById('edit-software').value.trim();
                if (software) {
                    newExif['0th'][window.piexif.ImageIFD.Software] = software;
                } else {
                    delete newExif['0th'][window.piexif.ImageIFD.Software];
                }

                const lat = document.getElementById('edit-gps-lat').value;
                const lon = document.getElementById('edit-gps-lon').value;
                if (lat && lon) {
                    setGPSDecimal(newExif, parseFloat(lat), parseFloat(lon));
                } else {
                    // Clear GPS data
                    newExif.GPS = {};
                }

                imageData.exifData = newExif;
                ToolUtils.showNotification('✅ Changes applied! Download the image to save.', 2000);
            };

            window.exifViewer.downloadEdited = () => {
                downloadImage(imageData, true);
            };
        }

        function renderRemoveTab(imageData) {
            const content = document.getElementById('remove-content');
            const exif = imageData.exifData;
            const hasGPS = exif && exif.GPS && Object.keys(exif.GPS).length > 0;

            let html = `
                <div class="image-preview-container">
                    <div class="image-preview">
                        <img src="${imageData.dataUrl}" alt="Preview" style="max-width: 200px;">
                    </div>
                </div>
            `;

            if (!exif || (!exif['0th'] && !exif.Exif && !exif.GPS)) {
                html += `
                    <div class="no-metadata">
                        <i class="fas fa-info-circle"></i>
                        <p>This image has no EXIF metadata to remove.</p>
                    </div>
                `;
                content.innerHTML = html;
                return;
            }

            if (hasGPS) {
                html += `
                    <div class="gps-warning">
                        <i class="fas fa-exclamation-triangle"></i>
                        <div class="gps-warning-content">
                            <div class="gps-warning-title">⚠️ This image contains GPS location data</div>
                            <div class="gps-warning-text">Your exact location (latitude/longitude) is embedded in this photo. Remove before sharing publicly!</div>
                        </div>
                    </div>
                `;
            }

            html += `
                <div class="remove-options">
                    <div class="remove-option">
                        <input type="radio" name="remove-option" id="remove-all" value="all" checked>
                        <label for="remove-all">Remove ALL metadata (default)</label>
                    </div>
                    <div class="remove-option">
                        <input type="radio" name="remove-option" id="keep-copyright" value="copyright">
                        <label for="keep-copyright">Keep Copyright & Attribution</label>
                    </div>
                    <div class="remove-option">
                        <input type="radio" name="remove-option" id="keep-camera" value="camera">
                        <label for="keep-camera">Keep Camera Settings (for photographers)</label>
                    </div>
                    <div class="remove-option">
                        <input type="radio" name="remove-option" id="keep-datetime" value="datetime">
                        <label for="keep-datetime">Keep Date/Time</label>
                    </div>
                    <div class="remove-option">
                        <input type="radio" name="remove-option" id="remove-gps-only" value="gps">
                        <label for="remove-gps-only">Remove Location Data Only</label>
                    </div>
                </div>

                <div class="file-size-comparison">
                    <div class="file-size-item">
                        <div class="file-size-label">Original Size</div>
                        <div class="file-size-value">${formatFileSize(imageData.file.size)}</div>
                    </div>
                    <div class="file-size-item">
                        <div class="file-size-label">After Removal</div>
                        <div class="file-size-value" id="estimated-size">~${formatFileSize(imageData.file.size * 0.95)}</div>
                    </div>
                </div>

                <div style="background: var(--bg-secondary); padding: 15px; border-radius: 4px; margin-bottom: 20px; font-size: 13px; color: var(--text-secondary);">
                    <strong>What metadata reveals:</strong><br>
                    • GPS coordinates show where the photo was taken<br>
                    • Camera settings reveal your equipment<br>
                    • Timestamps show when photos were taken<br>
                    • Software info reveals editing tools used
                </div>

                <div class="action-buttons">
                    <button class="tool-button" onclick="window.exifViewer.cleanAndDownload()">
                        <i class="fas fa-broom"></i> Clean & Download
                    </button>
                </div>
            `;

            content.innerHTML = html;

            window.exifViewer = window.exifViewer || {};
            
            window.exifViewer.cleanAndDownload = async () => {
                const option = document.querySelector('input[name="remove-option"]:checked').value;
                const cleaned = await removeMetadata(imageData, option);
                downloadImage(cleaned, false);
            };
        }

        function removeMetadata(imageData, option) {
            return new Promise((resolve) => {
                const newData = {
                    file: imageData.file,
                    dataUrl: imageData.dataUrl,
                    exifData: null
                };

                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0);
                    
                    // If we want to keep some metadata, we need to rebuild it
                    if (option !== 'all' && imageData.exifData) {
                        try {
                            const newExif = { "0th": {}, "Exif": {}, "GPS": {}, "1st": {}, "Interop": {} };
                            const oldExif = imageData.exifData;
                            
                            if (option === 'copyright') {
                                // Keep copyright and attribution
                                if (oldExif['0th']) {
                                    if (oldExif['0th'][window.piexif.ImageIFD.Copyright]) {
                                        newExif['0th'][window.piexif.ImageIFD.Copyright] = oldExif['0th'][window.piexif.ImageIFD.Copyright];
                                    }
                                    if (oldExif['0th'][window.piexif.ImageIFD.Artist]) {
                                        newExif['0th'][window.piexif.ImageIFD.Artist] = oldExif['0th'][window.piexif.ImageIFD.Artist];
                                    }
                                }
                            } else if (option === 'camera') {
                                // Keep camera settings
                                if (oldExif['0th']) {
                                    if (oldExif['0th'][window.piexif.ImageIFD.Make]) {
                                        newExif['0th'][window.piexif.ImageIFD.Make] = oldExif['0th'][window.piexif.ImageIFD.Make];
                                    }
                                    if (oldExif['0th'][window.piexif.ImageIFD.Model]) {
                                        newExif['0th'][window.piexif.ImageIFD.Model] = oldExif['0th'][window.piexif.ImageIFD.Model];
                                    }
                                }
                                if (oldExif.Exif) {
                                    // Copy camera-related EXIF tags
                                    const cameraTags = [
                                        window.piexif.ExifIFD.ISOSpeedRatings,
                                        window.piexif.ExifIFD.FNumber,
                                        window.piexif.ExifIFD.ExposureTime,
                                        window.piexif.ExifIFD.FocalLength
                                    ];
                                    cameraTags.forEach(tag => {
                                        if (oldExif.Exif[tag]) {
                                            newExif.Exif[tag] = oldExif.Exif[tag];
                                        }
                                    });
                                }
                            } else if (option === 'datetime') {
                                // Keep date/time
                                if (oldExif.Exif) {
                                    if (oldExif.Exif[window.piexif.ExifIFD.DateTimeOriginal]) {
                                        newExif.Exif[window.piexif.ExifIFD.DateTimeOriginal] = oldExif.Exif[window.piexif.ExifIFD.DateTimeOriginal];
                                    }
                                }
                                if (oldExif['0th']) {
                                    if (oldExif['0th'][window.piexif.ImageIFD.DateTime]) {
                                        newExif['0th'][window.piexif.ImageIFD.DateTime] = oldExif['0th'][window.piexif.ImageIFD.DateTime];
                                    }
                                }
                            } else if (option === 'gps') {
                                // Remove GPS only, keep everything else
                                Object.keys(oldExif).forEach(key => {
                                    newExif[key] = JSON.parse(JSON.stringify(oldExif[key]));
                                });
                                newExif.GPS = {};
                            }
                            
                            // Check if we have any data to keep
                            const hasData = Object.keys(newExif).some(key => 
                                newExif[key] && Object.keys(newExif[key]).length > 0
                            );
                            
                            if (hasData) {
                                const exifStr = window.piexif.dump(newExif);
                                newData.dataUrl = window.piexif.insert(exifStr, canvas.toDataURL('image/jpeg', 0.95));
                                newData.exifData = newExif;
                            } else {
                                newData.dataUrl = canvas.toDataURL('image/jpeg', 0.95);
                            }
                        } catch (e) {
                            console.error('Error preserving metadata:', e);
                            newData.dataUrl = canvas.toDataURL('image/jpeg', 0.95);
                        }
                    } else {
                        // Remove all - just draw to canvas (strips all EXIF)
                        newData.dataUrl = canvas.toDataURL('image/jpeg', 0.95);
                    }
                    
                    resolve(newData);
                };
                img.onerror = () => {
                    resolve(newData); // Return original if error
                };
                img.src = imageData.dataUrl;
            });
        }

        function downloadImage(imageData, edited) {
            let dataUrl = imageData.dataUrl;
            
            if (edited && imageData.exifData && window.piexif) {
                try {
                    // Clean empty IFDs
                    const cleanExif = {};
                    ['0th', 'Exif', 'GPS', '1st', 'Interop'].forEach(ifd => {
                        if (imageData.exifData[ifd] && Object.keys(imageData.exifData[ifd]).length > 0) {
                            cleanExif[ifd] = imageData.exifData[ifd];
                        }
                    });
                    
                    if (Object.keys(cleanExif).length > 0) {
                        const exifStr = window.piexif.dump(cleanExif);
                        dataUrl = window.piexif.insert(exifStr, dataUrl);
                    }
                } catch (e) {
                    console.error('Error inserting EXIF:', e);
                    ToolUtils.showNotification('Error applying EXIF data: ' + e.message, 3000);
                }
            }

            const link = document.createElement('a');
            link.href = dataUrl;
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
            link.download = imageData.file.name.replace(/\.(jpg|jpeg)$/i, edited ? `_edited_${timestamp}.jpg` : `_cleaned_${timestamp}.jpg`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }

        // Helper functions
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

        function formatMetadataForCopy(exif) {
            return JSON.stringify(exif, null, 2);
        }

        function getExifValue(exif, ifd, tag) {
            try {
                if (exif && exif[ifd] && exif[ifd][tag] !== undefined) {
                    return exif[ifd][tag];
                }
            } catch (e) {}
            return null;
        }

        function getGPSDecimal(exif, type) {
            if (!exif || !exif.GPS) return null;
            const lat = exif.GPS[window.piexif.GPSIFD.GPSLatitude];
            const latRef = exif.GPS[window.piexif.GPSIFD.GPSLatitudeRef];
            const lon = exif.GPS[window.piexif.GPSIFD.GPSLongitude];
            const lonRef = exif.GPS[window.piexif.GPSIFD.GPSLongitudeRef];
            
            if (type === 'lat' && lat) return convertDMSToDD(lat, latRef);
            if (type === 'lon' && lon) return convertDMSToDD(lon, lonRef);
            return null;
        }

        function setGPSDecimal(exif, lat, lon) {
            if (!exif.GPS) exif.GPS = {};
            try {
                if (window.piexif.GPSHelper && window.piexif.GPSHelper.degToDmsRational) {
                    exif.GPS[window.piexif.GPSIFD.GPSLatitude] = window.piexif.GPSHelper.degToDmsRational(Math.abs(lat));
                    exif.GPS[window.piexif.GPSIFD.GPSLatitudeRef] = lat >= 0 ? 'N' : 'S';
                    exif.GPS[window.piexif.GPSIFD.GPSLongitude] = window.piexif.GPSHelper.degToDmsRational(Math.abs(lon));
                    exif.GPS[window.piexif.GPSIFD.GPSLongitudeRef] = lon >= 0 ? 'E' : 'W';
                } else {
                    // Manual conversion
                    const latDms = degToDmsRational(Math.abs(lat));
                    const lonDms = degToDmsRational(Math.abs(lon));
                    exif.GPS[window.piexif.GPSIFD.GPSLatitude] = latDms;
                    exif.GPS[window.piexif.GPSIFD.GPSLatitudeRef] = lat >= 0 ? 'N' : 'S';
                    exif.GPS[window.piexif.GPSIFD.GPSLongitude] = lonDms;
                    exif.GPS[window.piexif.GPSIFD.GPSLongitudeRef] = lon >= 0 ? 'E' : 'W';
                }
            } catch (e) {
                console.error('Error setting GPS:', e);
            }
        }

        function degToDmsRational(deg) {
            const d = Math.floor(deg);
            const m = Math.floor((deg - d) * 60);
            const s = ((deg - d) * 60 - m) * 60;
            return [
                [d, 1],
                [m, 1],
                [Math.round(s * 100), 100]
            ];
        }

        function formatDateTimeForInput(datetimeStr) {
            if (!datetimeStr) return '';
            // EXIF datetime format: "YYYY:MM:DD HH:MM:SS"
            const match = datetimeStr.match(/(\d{4}):(\d{2}):(\d{2})\s+(\d{2}):(\d{2}):(\d{2})/);
            if (match) {
                return `${match[1]}-${match[2]}-${match[3]}T${match[4]}:${match[5]}`;
            }
            return '';
        }

        function formatDateTimeForExif(datetimeStr) {
            // Convert "YYYY-MM-DDTHH:MM" to "YYYY:MM:DD HH:MM:SS"
            const date = new Date(datetimeStr);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');
            return `${year}:${month}:${day} ${hours}:${minutes}:${seconds}`;
        }

        function renderMetadataSections(exif) {
            let html = '';

            // Basic Image Info
            if (exif['0th'] && Object.keys(exif['0th']).length > 0) {
                const items = [];
                const ifd = exif['0th'];
                
                Object.keys(ifd).forEach(tag => {
                    const tagName = getTagName('0th', tag);
                    items.push({ label: tagName, value: String(ifd[tag]) });
                });
                
                if (items.length > 0) {
                    html += createMetadataSection('📷 Image Info (IFD0)', items);
                }
            }

            // EXIF Data
            if (exif.Exif && Object.keys(exif.Exif).length > 0) {
                const items = [];
                const ifd = exif.Exif;
                
                Object.keys(ifd).forEach(tag => {
                    const tagName = getTagName('Exif', tag);
                    items.push({ label: tagName, value: formatExifValue(ifd[tag]) });
                });
                
                if (items.length > 0) {
                    html += createMetadataSection('📸 EXIF Data', items);
                }
            }

            // GPS
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
                    items.push({ label: 'Latitude', value: lat });
                    items.push({ label: 'Longitude', value: lon });
                }
                
                Object.keys(gps).forEach(tag => {
                    if (!['1', '2', '3', '4'].includes(tag)) { // Skip lat/lon
                        const tagName = getTagName('GPS', tag);
                        items.push({ label: tagName, value: String(gps[tag]) });
                    }
                });
                
                if (items.length > 0) {
                    html += createMetadataSection('📍 GPS Location', items, true);
                }
            }

            return html;
        }

        function getTagName(ifd, tag) {
            const tagNum = parseInt(tag);
            
            // Common tag names
            const names = {
                '0th': {
                    271: 'Make', 272: 'Model', 274: 'Orientation',
                    282: 'XResolution', 283: 'YResolution', 296: 'ResolutionUnit',
                    305: 'Software', 306: 'DateTime', 315: 'Artist', 33432: 'Copyright'
                },
                'Exif': {
                    33434: 'ExposureTime', 33437: 'FNumber', 34850: 'ExposureProgram',
                    34855: 'ISOSpeedRatings', 36867: 'DateTimeOriginal',
                    36868: 'DateTimeDigitized', 37121: 'ComponentsConfiguration',
                    37122: 'CompressedBitsPerPixel', 37377: 'ShutterSpeedValue',
                    37378: 'ApertureValue', 37380: 'ExposureBiasValue',
                    37381: 'MaxApertureValue', 37383: 'MeteringMode',
                    37385: 'Flash', 37386: 'FocalLength'
                },
                'GPS': {
                    0: 'GPSVersionID', 1: 'GPSLatitudeRef', 2: 'GPSLatitude',
                    3: 'GPSLongitudeRef', 4: 'GPSLongitude', 5: 'GPSAltitudeRef',
                    6: 'GPSAltitude', 7: 'GPSTimeStamp', 29: 'GPSDateStamp'
                }
            };
            
            return (names[ifd] && names[ifd][tagNum]) || `Tag ${tag}`;
        }

        function formatExifValue(value) {
            if (Array.isArray(value)) {
                if (value.length === 2 && typeof value[0] === 'number') {
                    return `${value[0]}/${value[1]}`;
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
                        <span class="metadata-section-title">${title}</span>
                        <i class="fas fa-chevron-down metadata-section-toggle"></i>
                    </div>
                    <div class="metadata-section-content">
            `;
            
            items.forEach(item => {
                html += `
                    <div class="metadata-item">
                        <span class="metadata-label">${item.label}:</span>
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
                btn.innerHTML = '<i class="fas fa-upload"></i> Upload New Image';
                btn.onclick = () => {
                    currentImage = null;
                    imageContainer.style.display = 'none';
                    uploadArea.style.display = 'block';
                    resetUploadArea();
                };
                viewContent.appendChild(btn);
            }
        }

        // Tab switching
        document.querySelectorAll('.exif-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                const tabName = tab.dataset.tab;
                document.querySelectorAll('.exif-tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.exif-tab-content').forEach(c => c.classList.remove('active'));
                tab.classList.add('active');
                document.getElementById(`${tabName}-tab`).classList.add('active');
                
                // Re-render the active tab content
                if (currentImage) {
                    if (tabName === 'view') renderViewTab(currentImage);
                    else if (tabName === 'edit') renderEditTab(currentImage);
                    else if (tabName === 'remove') renderRemoveTab(currentImage);
                }
            });
        });
    }
};