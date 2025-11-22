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

        