// Device & IP Info Tool
export default {
    title: 'Device & IP Info',
    styles: `
        /* Device Info Styles */
        .info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 15px;
            margin-top: 20px;
        }

        .info-card {
            background: var(--bg-secondary);
            border: 1px solid var(--border-color);
            border-radius: 4px;
            padding: 15px;
        }

        .info-card-header {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 12px;
            color: var(--accent-color);
            font-weight: 600;
            font-size: 14px;
        }

        .info-item {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid var(--border-color);
        }

        .info-item:last-child {
            border-bottom: none;
        }

        .info-label {
            color: var(--text-secondary);
            font-size: 12px;
        }

        .info-value {
            color: var(--text-primary);
            font-size: 12px;
            font-weight: 500;
            text-align: right;
            word-break: break-all;
        }

        .loading-spinner {
            display: inline-block;
            width: 12px;
            height: 12px;
            border: 2px solid var(--border-color);
            border-top-color: var(--accent-color);
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }

        @keyframes spin {
            to { transform: rotate(360deg); }
        }
    `,
    html: `
        <div class="tool-info">
            <i class="fas fa-info-circle" style="margin-right: 8px;"></i>
            View your device information, IP address details, and location data.
        </div>
        <div class="tool-section">
            <div style="margin-bottom: 20px;">
                <button class="tool-button" onclick="refreshDeviceInfo()">
                    <i class="fas fa-sync-alt" style="margin-right: 6px;"></i>
                    Refresh
                </button>
                <button class="tool-button secondary" onclick="copyAllInfo()">
                    <i class="fas fa-copy" style="margin-right: 6px;"></i>
                    Copy All
                </button>
            </div>
            
            <div class="info-grid">
                <div class="info-card">
                    <div class="info-card-header">
                        <i class="fas fa-network-wired"></i>
                        <span>Network Information</span>
                    </div>
                    <div id="network-info">
                        <div class="info-item">
                            <span class="info-label">IP Address:</span>
                            <span class="info-value" id="ip-address">
                                <span class="loading-spinner"></span> Loading...
                            </span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">ISP:</span>
                            <span class="info-value" id="isp">-</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">City:</span>
                            <span class="info-value" id="city">-</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Region:</span>
                            <span class="info-value" id="region">-</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Country:</span>
                            <span class="info-value" id="country">-</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Timezone:</span>
                            <span class="info-value" id="timezone">-</span>
                        </div>
                    </div>
                </div>

                <div class="info-card">
                    <div class="info-card-header">
                        <i class="fas fa-desktop"></i>
                        <span>Device Information</span>
                    </div>
                    <div id="device-info">
                        <div class="info-item">
                            <span class="info-label">User Agent:</span>
                            <span class="info-value" id="user-agent">-</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Platform:</span>
                            <span class="info-value" id="platform">-</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Language:</span>
                            <span class="info-value" id="language">-</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Screen:</span>
                            <span class="info-value" id="screen">-</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Viewport:</span>
                            <span class="info-value" id="viewport">-</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Color Depth:</span>
                            <span class="info-value" id="color-depth">-</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Pixel Ratio:</span>
                            <span class="info-value" id="pixel-ratio">-</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Online Status:</span>
                            <span class="info-value" id="online-status">-</span>
                        </div>
                    </div>
                </div>

                <div class="info-card">
                    <div class="info-card-header">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>Location (Approximate)</span>
                    </div>
                    <div id="location-info">
                        <div class="info-item">
                            <span class="info-label">Latitude:</span>
                            <span class="info-value" id="latitude">-</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Longitude:</span>
                            <span class="info-value" id="longitude">-</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Accuracy:</span>
                            <span class="info-value" id="accuracy">-</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Map:</span>
                            <span class="info-value">
                                <button class="tool-button secondary" onclick="showLocationMap()" id="map-btn" style="padding: 4px 8px; font-size: 11px;" disabled>
                                    <i class="fas fa-map"></i> View Map
                                </button>
                            </span>
                        </div>
                    </div>
                </div>

                <div class="info-card">
                    <div class="info-card-header">
                        <i class="fas fa-cog"></i>
                        <span>Browser Features</span>
                    </div>
                    <div id="features-info">
                        <div class="info-item">
                            <span class="info-label">Cookies:</span>
                            <span class="info-value" id="cookies-enabled">-</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Local Storage:</span>
                            <span class="info-value" id="local-storage">-</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Session Storage:</span>
                            <span class="info-value" id="session-storage">-</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">IndexedDB:</span>
                            <span class="info-value" id="indexeddb">-</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Service Worker:</span>
                            <span class="info-value" id="service-worker">-</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Notifications:</span>
                            <span class="info-value" id="notifications">-</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Geolocation:</span>
                            <span class="info-value" id="geolocation">-</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    init() {
        let locationData = null;
        
        function updateDeviceInfo() {
            // Device Information
            document.getElementById('user-agent').textContent = navigator.userAgent;
            document.getElementById('platform').textContent = navigator.platform || 'Unknown';
            document.getElementById('language').textContent = navigator.language || navigator.userLanguage || 'Unknown';
            document.getElementById('screen').textContent = `${screen.width}x${screen.height}`;
            document.getElementById('viewport').textContent = `${window.innerWidth}x${window.innerHeight}`;
            document.getElementById('color-depth').textContent = `${screen.colorDepth} bit`;
            document.getElementById('pixel-ratio').textContent = window.devicePixelRatio || '1';
            document.getElementById('online-status').textContent = navigator.onLine ? 'Online' : 'Offline';
            
            // Browser Features
            document.getElementById('cookies-enabled').textContent = navigator.cookieEnabled ? 'Enabled' : 'Disabled';
            document.getElementById('local-storage').textContent = typeof(Storage) !== 'undefined' ? 'Available' : 'Not Available';
            document.getElementById('session-storage').textContent = typeof(sessionStorage) !== 'undefined' ? 'Available' : 'Not Available';
            document.getElementById('indexeddb').textContent = 'indexedDB' in window ? 'Available' : 'Not Available';
            document.getElementById('service-worker').textContent = 'serviceWorker' in navigator ? 'Available' : 'Not Available';
            document.getElementById('notifications').textContent = 'Notification' in window ? 'Available' : 'Not Available';
            document.getElementById('geolocation').textContent = 'geolocation' in navigator ? 'Available' : 'Not Available';
        }
        
        async function fetchIPInfo() {
            try {
                const response = await fetch('https://ipapi.co/json/');
                const data = await response.json();
                
                document.getElementById('ip-address').textContent = data.ip || 'Unknown';
                document.getElementById('isp').textContent = data.org || '-';
                document.getElementById('city').textContent = data.city || '-';
                document.getElementById('region').textContent = data.region || '-';
                document.getElementById('country').textContent = `${data.country_name || '-'} (${data.country_code || '-'})`;
                document.getElementById('timezone').textContent = data.timezone || '-';
            } catch (error) {
                document.getElementById('ip-address').textContent = 'Error loading';
                console.error('Failed to fetch IP info:', error);
            }
        }
        
        function getLocation() {
            if (!navigator.geolocation) {
                document.getElementById('latitude').textContent = 'Not supported';
                return;
            }
            
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    locationData = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                        accuracy: position.coords.accuracy
                    };
                    
                    document.getElementById('latitude').textContent = locationData.lat.toFixed(6);
                    document.getElementById('longitude').textContent = locationData.lng.toFixed(6);
                    document.getElementById('accuracy').textContent = `${Math.round(locationData.accuracy)}m`;
                    
                    const mapBtn = document.getElementById('map-btn');
                    mapBtn.disabled = false;
                    mapBtn.onclick = () => showLocationMap();
                },
                (error) => {
                    let message = 'Permission denied';
                    if (error.code === error.POSITION_UNAVAILABLE) {
                        message = 'Position unavailable';
                    } else if (error.code === error.TIMEOUT) {
                        message = 'Request timeout';
                    }
                    document.getElementById('latitude').textContent = message;
                },
                { enableHighAccuracy: true, timeout: 10000 }
            );
        }
        
        window.showLocationMap = () => {
            if (!locationData) return;
            const url = `https://www.google.com/maps?q=${locationData.lat},${locationData.lng}`;
            window.open(url, '_blank');
        };
        
        window.refreshDeviceInfo = () => {
            updateDeviceInfo();
            fetchIPInfo();
            getLocation();
            ToolUtils.showNotification('Information refreshed', 1500);
        };
        
        window.copyAllInfo = () => {
            const info = {
                network: {
                    ip: document.getElementById('ip-address').textContent,
                    isp: document.getElementById('isp').textContent,
                    city: document.getElementById('city').textContent,
                    region: document.getElementById('region').textContent,
                    country: document.getElementById('country').textContent,
                    timezone: document.getElementById('timezone').textContent
                },
                device: {
                    userAgent: document.getElementById('user-agent').textContent,
                    platform: document.getElementById('platform').textContent,
                    language: document.getElementById('language').textContent,
                    screen: document.getElementById('screen').textContent,
                    viewport: document.getElementById('viewport').textContent
                },
                location: {
                    latitude: document.getElementById('latitude').textContent,
                    longitude: document.getElementById('longitude').textContent,
                    accuracy: document.getElementById('accuracy').textContent
                }
            };
            
            ToolUtils.copyToClipboard(JSON.stringify(info, null, 2));
            ToolUtils.showNotification('All information copied to clipboard', 2000);
        };
        
        // Initialize
        updateDeviceInfo();
        fetchIPInfo();
        getLocation();
        
        // Listen for online/offline changes
        window.addEventListener('online', () => {
            document.getElementById('online-status').textContent = 'Online';
        });
        window.addEventListener('offline', () => {
            document.getElementById('online-status').textContent = 'Offline';
        });
    }
};

