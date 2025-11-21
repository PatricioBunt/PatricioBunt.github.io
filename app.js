// VSCode-Inspired Toolkit - Main Application Logic

class ToolkitApp {
    constructor() {
        this.currentTool = null;
        this.tools = {};
        this.favorites = this.loadFavorites();
        this.settings = this.loadSettings();
        this.currentToolStyleId = null;
        this.isFullscreen = false;
        this.fullscreenElement = null;
        this.init();
    }
    
    enterFullscreen(element) {
        this.isFullscreen = true;
        this.fullscreenElement = element;
        
        // Hide sidebar
        const sidebar = document.getElementById('sidebar');
        if (sidebar) sidebar.style.display = 'none';
        
        // Hide content header controls (keep title)
        const contentHeader = document.querySelector('.content-header');
        const favoriteBtn = contentHeader?.querySelector('.favorite-btn');
        if (favoriteBtn) favoriteBtn.style.display = 'none';
        
        // Add exit button to app header on the right side
        const appHeader = document.querySelector('.app-header');
        if (appHeader && !appHeader.querySelector('.fullscreen-exit-btn')) {
            // Create a right-side menu container if it doesn't exist
            let rightMenu = appHeader.querySelector('.app-menu-right');
            if (!rightMenu) {
                rightMenu = document.createElement('div');
                rightMenu.className = 'app-menu-right';
                appHeader.appendChild(rightMenu);
            }
            
            const exitBtn = document.createElement('div');
            exitBtn.className = 'menu-item fullscreen-exit-btn';
            exitBtn.innerHTML = '<i class="fas fa-times"></i><span>Exit Fullscreen</span>';
            exitBtn.title = 'Exit Fullscreen';
            exitBtn.onclick = () => this.exitFullscreen();
            exitBtn.style.cursor = 'pointer';
            rightMenu.appendChild(exitBtn);
        }
        
        // Hide other tool sections, show only fullscreen element
        const toolContainer = document.querySelector('.tool-container');
        if (toolContainer) {
            Array.from(toolContainer.children).forEach(child => {
                if (child !== element && !child.contains(element) && !child.classList.contains('fullscreen-content')) {
                    child.style.display = 'none';
                }
            });
        }
        
        // Hide parent sections that don't contain the element
        const allSections = document.querySelectorAll('.tool-section');
        allSections.forEach(section => {
            if (!section.contains(element)) {
                section.style.display = 'none';
            }
        });
        
        // Make element fullscreen
        element.classList.add('fullscreen-content');
        document.body.classList.add('fullscreen-mode');
    }
    
    exitFullscreen() {
        this.isFullscreen = false;
        
        // Show sidebar
        const sidebar = document.getElementById('sidebar');
        if (sidebar) sidebar.style.display = '';
        
        // Show content header controls
        const favoriteBtn = document.querySelector('.content-header .favorite-btn');
        if (favoriteBtn) favoriteBtn.style.display = '';
        
        // Remove exit button from app header
        const exitBtn = document.querySelector('.app-header .fullscreen-exit-btn');
        if (exitBtn) exitBtn.remove();
        
        // Remove right menu container if it's empty
        const rightMenu = document.querySelector('.app-menu-right');
        if (rightMenu && rightMenu.children.length === 0) {
            rightMenu.remove();
        }
        
        // Show all tool sections
        const toolContainer = document.querySelector('.tool-container');
        if (toolContainer) {
            Array.from(toolContainer.children).forEach(child => {
                child.style.display = '';
            });
        }
        
        // Show all tool sections
        const allSections = document.querySelectorAll('.tool-section');
        allSections.forEach(section => {
            section.style.display = '';
        });
        
        // Remove fullscreen class
        if (this.fullscreenElement) {
            this.fullscreenElement.classList.remove('fullscreen-content');
        }
        document.body.classList.remove('fullscreen-mode');
        this.fullscreenElement = null;
    }
    
    injectToolStyles(css, toolName) {
        // Remove any existing tool styles
        this.removeToolStyles();
        
        // Create a style element with unique ID
        const styleId = `tool-styles-${toolName}`;
        const styleElement = document.createElement('style');
        styleElement.id = styleId;
        styleElement.textContent = css;
        document.head.appendChild(styleElement);
        
        this.currentToolStyleId = styleId;
    }
    
    removeToolStyles() {
        if (this.currentToolStyleId) {
            const existingStyle = document.getElementById(this.currentToolStyleId);
            if (existingStyle) {
                existingStyle.remove();
            }
            this.currentToolStyleId = null;
        }
    }

    init() {
        this.setupEventListeners();
        this.loadToolModules();
        this.applySettings();
        this.updateFavoritesDisplay();
        this.updateLandingDropdown();
        this.initSidebar();
        this.updateUpcomingIcon();
        this.toggleUpcomingTools();
        this.handleRouting();
        this.registerServiceWorker();
        
        // Listen for hash changes
        window.addEventListener('hashchange', () => this.handleRouting());
    }
    
    registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('Service Worker registered:', registration);
                    
                    // Check for updates
                    registration.addEventListener('updatefound', () => {
                        const newWorker = registration.installing;
                        newWorker.addEventListener('statechange', () => {
                            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                // New service worker available
                                console.log('New service worker available');
                            }
                        });
                    });
                })
                .catch(error => {
                    console.error('Service Worker registration failed:', error);
                });
        }
    }
    
    initSidebar() {
        const sidebar = document.getElementById('sidebar');
        const toggle = document.getElementById('sidebar-toggle');
        const resizeHandle = document.getElementById('sidebar-resize-handle');
        
        // Apply saved width
        if (this.settings.sidebarWidth) {
            sidebar.style.width = `${this.settings.sidebarWidth}px`;
            document.documentElement.style.setProperty('--sidebar-width', `${this.settings.sidebarWidth}px`);
        }
        
        // Apply collapsed state
        if (this.settings.sidebarCollapsed) {
            sidebar.classList.add('collapsed');
        }
        
        // Toggle collapse
        if (toggle) {
            toggle.addEventListener('click', () => {
                sidebar.classList.toggle('collapsed');
                this.settings.sidebarCollapsed = sidebar.classList.contains('collapsed');
                this.saveSettings();
            });
        }
        
        // Resize handle
        if (resizeHandle) {
            let isResizing = false;
            let startX = 0;
            let startWidth = 0;
            
            resizeHandle.addEventListener('mousedown', (e) => {
                isResizing = true;
                startX = e.clientX;
                startWidth = sidebar.offsetWidth;
                document.body.style.cursor = 'col-resize';
                e.preventDefault();
            });
            
            document.addEventListener('mousemove', (e) => {
                if (!isResizing) return;
                const diff = e.clientX - startX;
                const newWidth = Math.max(200, Math.min(500, startWidth + diff));
                sidebar.style.width = `${newWidth}px`;
                document.documentElement.style.setProperty('--sidebar-width', `${newWidth}px`);
            });
            
            document.addEventListener('mouseup', () => {
                if (isResizing) {
                    isResizing = false;
                    document.body.style.cursor = '';
                    this.settings.sidebarWidth = sidebar.offsetWidth;
                    this.saveSettings();
                }
            });
        }
    }

    loadFavorites() {
        const stored = localStorage.getItem('toolkit_favorites');
        return stored ? JSON.parse(stored) : [];
    }

    saveFavorites() {
        localStorage.setItem('toolkit_favorites', JSON.stringify(this.favorites));
        this.updateFavoritesDisplay();
        this.updateLandingDropdown();
    }

    toggleFavorite(toolName) {
        const index = this.favorites.indexOf(toolName);
        if (index > -1) {
            this.favorites.splice(index, 1);
            // If this was the default landing page, reset to welcome
            if (this.settings.defaultLanding === `tool-${toolName}`) {
                this.settings.defaultLanding = 'welcome';
                this.saveSettings();
            }
        } else {
            this.favorites.push(toolName);
        }
        this.saveFavorites();
    }

    isFavorite(toolName) {
        return this.favorites.includes(toolName);
    }

    updateFavoritesDisplay() {
        // Update sidebar favorites
        const favoritesList = document.getElementById('favorites-list');
        const favoritesCategory = document.getElementById('favorites-category');
        
        if (!favoritesList || !favoritesCategory) {
            console.warn('Favorites elements not found');
            return;
        }
        
        if (this.favorites.length === 0) {
            favoritesCategory.style.display = 'none';
        } else {
            favoritesCategory.style.display = 'block';
            // Auto-expand favorites category when it has items
            const categoryHeader = favoritesCategory.querySelector('.category-header');
            const categoryItems = favoritesCategory.querySelector('.category-items');
            if (categoryHeader && categoryItems) {
                categoryHeader.classList.add('expanded');
                categoryItems.classList.add('expanded');
            }
            
            favoritesList.innerHTML = this.favorites.map(toolName => {
                const toolInfo = this.getToolInfo(toolName);
                return `
                    <a href="#/tools/${toolName}" class="nav-item" data-tool="${toolName}">
                        <i class="fas fa-star" style="color: var(--accent-color);"></i> ${toolInfo.title || this.formatToolName(toolName)}
                    </a>
                `;
            }).join('');
            
            // Re-attach event listeners
            favoritesList.querySelectorAll('.nav-item').forEach(item => {
                item.addEventListener('click', (e) => {
                    e.preventDefault();
                    const tool = item.dataset.tool;
                    if (tool) {
                        this.navigateToTool(tool);
                    }
                });
            });
        }

        // Update favorites cards on welcome screen
        this.updateFavoritesCards();
    }

    updateFavoritesCards() {
        const cardsContainer = document.getElementById('favorites-cards');
        if (!cardsContainer) return;

        if (this.favorites.length === 0) {
            cardsContainer.innerHTML = '';
            return;
        }

        cardsContainer.innerHTML = this.favorites.map(toolName => {
            const toolInfo = this.getToolInfo(toolName);
            const title = toolInfo.title || this.formatToolName(toolName);
            return `
                <div class="favorite-card" onclick="window.toolkitApp.navigateToTool('${toolName}')">
                    <div class="favorite-card-icon">
                        <i class="fas fa-star"></i>
                    </div>
                    <div class="favorite-card-title">${title}</div>
                </div>
            `;
        }).join('');
    }

    getToolInfo(toolName) {
        // Get tool info from the nav items
        const navItem = document.querySelector(`[data-tool="${toolName}"]`);
        if (navItem) {
            return {
                title: navItem.textContent.trim().replace(/\s+/g, ' ')
            };
        }
        return { title: this.formatToolName(toolName) };
    }

    loadSettings() {
        const defaultSettings = {
            theme: 'dark',
            accentColor: '#007acc',
            defaultLanding: 'welcome'
        };
        const stored = localStorage.getItem('toolkit_settings');
        return stored ? { ...defaultSettings, ...JSON.parse(stored) } : defaultSettings;
    }

    saveSettings() {
        console.log('saveSettings called with:', this.settings);
        localStorage.setItem('toolkit_settings', JSON.stringify(this.settings));
        this.applySettings();
    }

    applySettings() {
        console.log('applySettings called, theme:', this.settings.theme);
        // Apply theme
        document.body.classList.remove('theme-dark', 'theme-light');
        document.body.classList.add(`theme-${this.settings.theme}`);
        console.log('Body classes after theme apply:', document.body.className);
        
        // Apply accent color
        if (this.settings.accentColor) {
            document.documentElement.style.setProperty('--accent-color', this.settings.accentColor);
            document.documentElement.style.setProperty('--accent-hover', this.lightenColor(this.settings.accentColor, 10));
        }
        
        // Apply sidebar width
        if (this.settings.sidebarWidth) {
            document.documentElement.style.setProperty('--sidebar-width', `${this.settings.sidebarWidth}px`);
        }
    }

    lightenColor(color, percent) {
        const num = parseInt(color.replace("#",""), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) + amt;
        const G = (num >> 8 & 0x00FF) + amt;
        const B = (num & 0x0000FF) + amt;
        return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
            (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
            (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
    }

    setupEventListeners() {
        // Category toggle functionality
        document.querySelectorAll('.category-header').forEach(header => {
            header.addEventListener('click', (e) => {
                const category = header.dataset.category;
                this.toggleCategory(category);
            });
        });

        // Navigation item clicks
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const tool = item.dataset.tool;
                if (tool) {
                    this.navigateToTool(tool);
                }
            });
        });

        // Header menu items - dropdown toggle
        const settingsMenuItem = document.getElementById('settings-menu-item');
        if (settingsMenuItem) {
            settingsMenuItem.addEventListener('click', (e) => {
                e.stopPropagation();
                const isActive = settingsMenuItem.classList.contains('active');
                // Close all dropdowns
                document.querySelectorAll('.menu-item').forEach(item => {
                    item.classList.remove('active');
                });
                // Toggle this dropdown
                if (!isActive) {
                    settingsMenuItem.classList.add('active');
                    // Update landing dropdown when opening settings
                    setTimeout(() => {
                        this.updateLandingDropdown();
                    }, 0);
                }
            });
        }

        // Dropdown item actions - MUST run before close handler
        const self = this;
        document.addEventListener('click', function(e) {
            const item = e.target.closest('.dropdown-item');
            if (!item) {
                return;
            }

            const action = item.dataset.action;
            
            if (action === 'theme') {
                // Theme submenu is handled by hover
                return;
            }
            if (action === 'accent-color') {
                // Color picker is inline
                return;
            }
            if (action === 'default-landing') {
                // Landing submenu is handled by hover
                return;
            }
            if (action === 'toggle-upcoming') {
                e.stopPropagation();
                e.preventDefault();
                // Toggle the setting
                const currentValue = self.settings.showUpcoming || false;
                self.settings.showUpcoming = !currentValue;
                self.saveSettings();
                self.updateUpcomingIcon();
                self.toggleUpcomingTools();
                // Don't close the dropdown for this action
                return;
            }
            if (action === 'clear-favorites') {
                e.stopPropagation();
                e.preventDefault();
                if (confirm('Are you sure you want to clear all favorites?')) {
                    self.favorites = [];
                    self.saveFavorites();
                    self.showWelcomeScreen();
                    self.updateLandingDropdown();
                }
                document.querySelectorAll('.menu-item').forEach(item => {
                    item.classList.remove('active');
                });
                return;
            }
            if (action === 'reset-settings') {
                e.stopPropagation();
                e.preventDefault();
                if (confirm('Are you sure you want to reset all settings to defaults? This cannot be undone.')) {
                    localStorage.removeItem('toolkit_settings');
                    self.settings = self.loadSettings();
                    self.applySettings();
                    self.updateLandingDropdown();
                    // Update color picker
                    const colorPicker = document.getElementById('accent-color-inline');
                    if (colorPicker) {
                        colorPicker.value = self.settings.accentColor;
                    }
                }
                document.querySelectorAll('.menu-item').forEach(item => {
                    item.classList.remove('active');
                });
                return;
            }
        }, true); // Use capture phase to run before other handlers

        // Theme selection - must be before the general dropdown click handler
        document.addEventListener('click', (e) => {
            console.log('Click event detected:', e.target, e.target.closest('.dropdown-item[data-theme]'));
            const themeItem = e.target.closest('.dropdown-item[data-theme]');
            if (themeItem) {
                console.log('Theme item found:', themeItem, 'Theme:', themeItem.dataset.theme);
                e.stopPropagation();
                e.preventDefault();
                const theme = themeItem.dataset.theme;
                console.log('Setting theme to:', theme);
                this.settings.theme = theme;
                console.log('Current settings:', this.settings);
                this.saveSettings();
                console.log('Settings saved, applying...');
                document.querySelectorAll('.menu-item').forEach(item => {
                    item.classList.remove('active');
                });
                return false;
            } else {
                console.log('No theme item found. Closest dropdown-item:', e.target.closest('.dropdown-item'));
            }
        }, true); // Use capture phase to handle before other handlers

        // Close dropdowns when clicking outside
        document.addEventListener('click', (e) => {
            // Don't process if clicking on a theme submenu item (handled separately)
            if (e.target.closest('.dropdown-item[data-theme]')) {
                return; // Theme selection handler will handle it
            }
            
            // Don't close if clicking on a dropdown item (unless it's a submenu item)
            if (e.target.closest('.dropdown-item')) {
                const action = e.target.closest('.dropdown-item')?.dataset.action;
                // Only close for submenu items or items without special handling
                if (action === 'theme' || action === 'default-landing') {
                    return; // Let submenu handle it
                }
                if (action === 'toggle-upcoming' || action === 'clear-favorites' || action === 'reset-settings') {
                    return; // Already handled, don't close
                }
            }
            if (!e.target.closest('.menu-item')) {
                document.querySelectorAll('.menu-item').forEach(item => {
                    item.classList.remove('active');
                });
            }
        });

        // Landing page selection
        document.addEventListener('click', (e) => {
            const landingItem = e.target.closest('.dropdown-item[data-landing]');
            if (landingItem) {
                e.stopPropagation();
                const landing = landingItem.dataset.landing;
                this.settings.defaultLanding = landing;
                this.saveSettings();
                // If setting to welcome, navigate there
                if (landing === 'welcome') {
                    window.location.hash = '';
                    this.showWelcomeScreen();
                }
                document.querySelectorAll('.menu-item').forEach(item => {
                    item.classList.remove('active');
                });
            }
        });

        // Accent color picker - make whole button clickable
        const colorPickerItem = document.querySelector('[data-action="accent-color"]');
        const colorPicker = document.getElementById('accent-color-inline');
        if (colorPicker && colorPickerItem) {
            colorPicker.value = this.settings.accentColor;
            // Make the whole dropdown item trigger the color picker
            colorPickerItem.addEventListener('click', (e) => {
                if (e.target !== colorPicker) {
                    e.stopPropagation();
                    colorPicker.click();
                }
            });
            colorPicker.addEventListener('change', (e) => {
                e.stopPropagation();
                this.settings.accentColor = e.target.value;
                this.saveSettings();
            });
        }
        
        // Update upcoming tools toggle icon
        this.updateUpcomingIcon();
    }

    updateLandingDropdown() {
        const landingSubmenu = document.getElementById('landing-submenu');
        if (!landingSubmenu) {
            console.warn('landing-submenu not found');
            return;
        }

        // Clear existing favorites from dropdown
        const existingFavorites = landingSubmenu.querySelectorAll('.dropdown-item[data-landing^="tool-"]');
        existingFavorites.forEach(item => item.remove());

        // Add favorites to dropdown
        if (this.favorites && this.favorites.length > 0) {
            this.favorites.forEach(toolName => {
                const toolInfo = this.getToolInfo(toolName);
                const title = toolInfo.title || this.formatToolName(toolName);
                const item = document.createElement('div');
                item.className = 'dropdown-item';
                item.dataset.landing = `tool-${toolName}`;
                item.textContent = title;
                landingSubmenu.appendChild(item);
            });

            // Update landing selection handler for favorites
            landingSubmenu.querySelectorAll('.dropdown-item[data-landing^="tool-"]').forEach(item => {
                // Remove existing listeners by cloning
                const newItem = item.cloneNode(true);
                item.parentNode.replaceChild(newItem, item);
                
                newItem.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const toolName = newItem.dataset.landing.replace('tool-', '');
                    this.settings.defaultLanding = `tool-${toolName}`;
                    this.saveSettings();
                    document.querySelectorAll('.menu-item').forEach(item => {
                        item.classList.remove('active');
                    });
                });
            });
        }
    }

    toggleCategory(category) {
        const header = document.querySelector(`[data-category="${category}"]`);
        const items = document.querySelector(`[data-items="${category}"]`);
        
        if (header && items) {
            const isExpanded = header.classList.contains('expanded');
            
            if (isExpanded) {
                header.classList.remove('expanded');
                items.classList.remove('expanded');
            } else {
                header.classList.add('expanded');
                items.classList.add('expanded');
            }
        }
    }

    navigateToTool(toolName) {
        // Update URL hash
        window.location.hash = `/tools/${toolName}`;
        
        // Update active state
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        
        const activeItem = document.querySelector(`[data-tool="${toolName}"]`);
        if (activeItem) {
            activeItem.classList.add('active');
            
            // Expand parent category if collapsed
            const category = activeItem.closest('.nav-category');
            if (category) {
                const categoryHeader = category.querySelector('.category-header');
                const categoryItems = category.querySelector('.category-items');
                if (categoryHeader && categoryItems) {
                    categoryHeader.classList.add('expanded');
                    categoryItems.classList.add('expanded');
                }
            }
        }
        
        // Load and display tool
        this.loadTool(toolName);
    }

    handleRouting() {
        const hash = window.location.hash;
        
        if (!hash || hash === '#') {
            this.showWelcomeScreen();
            return;
        }

        // Parse hash: #/tools/tool-name
        const match = hash.match(/#\/tools\/(.+)/);
        if (match) {
            const toolName = match[1];
            this.navigateToTool(toolName);
        } else {
            this.showWelcomeScreen();
        }
    }

    showWelcomeScreen() {
        const contentBody = document.getElementById('tool-content');
        const toolTitle = document.getElementById('tool-title');
        
        toolTitle.textContent = 'Select a tool';
        
        // Check if default landing is a specific tool
        if (this.settings.defaultLanding && this.settings.defaultLanding.startsWith('tool-')) {
            const toolName = this.settings.defaultLanding.replace('tool-', '');
            this.navigateToTool(toolName);
            return;
        }
        
        // Check if default landing is favorites
        if (this.settings.defaultLanding === 'favorites' && this.favorites.length > 0) {
            contentBody.innerHTML = `
                <div class="welcome-screen">
                    <h3 style="margin-bottom: 20px;">Your Favorite Tools</h3>
                    <div id="favorites-cards" class="favorites-cards">
                        ${this.favorites.map(toolName => {
                            const toolInfo = this.getToolInfo(toolName);
                            const title = toolInfo.title || this.formatToolName(toolName);
                            return `
                                <div class="favorite-card" onclick="window.toolkitApp.navigateToTool('${toolName}')">
                                    <div class="favorite-card-icon">
                                        <i class="fas fa-star"></i>
                                    </div>
                                    <div class="favorite-card-title">${title}</div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            `;
        } else {
            contentBody.innerHTML = `
                <div class="welcome-screen">
                    <i class="fas fa-toolbox welcome-icon"></i>
                    <h3>Select a tool from the sidebar to get started</h3>
                    <div id="favorites-cards" class="favorites-cards">
                        ${this.favorites.length > 0 ? this.favorites.map(toolName => {
                            const toolInfo = this.getToolInfo(toolName);
                            const title = toolInfo.title || this.formatToolName(toolName);
                            return `
                                <div class="favorite-card" onclick="window.toolkitApp.navigateToTool('${toolName}')">
                                    <div class="favorite-card-icon">
                                        <i class="fas fa-star"></i>
                                    </div>
                                    <div class="favorite-card-title">${title}</div>
                                </div>
                            `;
                        }).join('') : ''}
                    </div>
                </div>
            `;
        }
        
        // Remove active states
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
    }
    
    updateUpcomingIcon() {
        const label = document.getElementById('toggle-upcoming-label');
        if (label) {
            const showUpcoming = this.settings.showUpcoming || false;
            if (showUpcoming) {
                label.textContent = 'Hide Upcoming Tools';
            } else {
                label.textContent = 'Show Upcoming Tools';
            }
        }
    }
    
    toggleUpcomingTools() {
        const showUpcoming = this.settings.showUpcoming || false;
        
        // First, ensure all categories are visible by default (reset any inline styles)
        document.querySelectorAll('.nav-category').forEach(category => {
            category.style.display = '';
        });
        
        // Then process coming-soon items
        document.querySelectorAll('[data-coming-soon="true"]').forEach(item => {
            const category = item.closest('.nav-category');
            if (category) {
                // Check if all items in this category are coming soon
                const allItems = category.querySelectorAll('.nav-item');
                const allComingSoon = Array.from(allItems).every(
                    navItem => navItem.dataset.comingSoon === 'true'
                );
                
                if (!showUpcoming) {
                    // Hide individual coming soon items
                    item.style.display = 'none';
                    // Hide category if all items are coming soon
                    if (allComingSoon && allItems.length > 0) {
                        category.style.display = 'none';
                    }
                } else {
                    // Show all items
                    item.style.display = '';
                    category.style.display = 'block';
                }
            } else {
                // If item is not in a category, just toggle its visibility
                item.style.display = showUpcoming ? '' : 'none';
            }
        });
    }

    async loadTool(toolName) {
        const toolTitle = document.getElementById('tool-title');
        const contentBody = document.getElementById('tool-content');
        
        // Show loading state
        contentBody.innerHTML = '<div class="tool-container"><p>Loading tool...</p></div>';
        
        try {
            // Try to load tool module
            const toolModule = await this.getToolModule(toolName);
            
            if (toolModule) {
                const title = toolModule.title || this.formatToolName(toolName);
                const isFav = this.isFavorite(toolName);
                toolTitle.innerHTML = `
                    ${title}
                    <button class="favorite-btn ${isFav ? 'active' : ''}" data-tool-name="${toolName}" title="${isFav ? 'Remove from favorites' : 'Add to favorites'}">
                        <i class="fas fa-star"></i>
                    </button>
                `;
                // Remove previous tool's styles if any
                this.removeToolStyles();
                
                // Inject tool-specific styles if provided
                if (toolModule.styles) {
                    this.injectToolStyles(toolModule.styles, toolName);
                }
                
                // Remove previous tool's styles if any
                this.removeToolStyles();
                
                // Inject tool-specific styles if provided
                if (toolModule.styles) {
                    this.injectToolStyles(toolModule.styles, toolName);
                }
                
                contentBody.innerHTML = `
                    <div class="tool-container">
                        ${toolModule.html || '<p>Tool content coming soon...</p>'}
                    </div>
                `;
                
                // Attach favorite button event listener
                const favBtn = toolTitle.querySelector('.favorite-btn');
                if (favBtn) {
                    favBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        this.toggleFavoriteTool(toolName);
                    });
                }
                
                // Initialize tool if it has an init function
                if (toolModule.init) {
                    toolModule.init();
                }
                
                this.currentTool = toolName;
            } else {
                // Tool not implemented yet
                const isFav = this.isFavorite(toolName);
                toolTitle.innerHTML = `
                    ${this.formatToolName(toolName)}
                    <button class="favorite-btn ${isFav ? 'active' : ''}" data-tool-name="${toolName}" title="${isFav ? 'Remove from favorites' : 'Add to favorites'}">
                        <i class="fas fa-star"></i>
                    </button>
                `;
                
                // Attach favorite button event listener
                const favBtn = toolTitle.querySelector('.favorite-btn');
                if (favBtn) {
                    favBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        this.toggleFavoriteTool(toolName);
                    });
                }
                contentBody.innerHTML = `
                    <div class="tool-container">
                        <div class="tool-info">
                            This tool is coming soon. The structure is ready for implementation.
                        </div>
                        <div class="tool-section">
                            <h3>${this.formatToolName(toolName)}</h3>
                            <p>Tool implementation pending...</p>
                        </div>
                    </div>
                `;
            }
        } catch (error) {
            console.error('Error loading tool:', error);
            contentBody.innerHTML = `
                <div class="tool-container">
                    <div class="tool-info" style="border-left-color: #f48771;">
                        Error loading tool. Please try again.
                    </div>
                </div>
            `;
        }
    }

    async getToolModule(toolName) {
        // Check if tool is already loaded
        if (this.tools[toolName]) {
            return this.tools[toolName];
        }

        // Try to load from tools directory
        try {
            const module = await import(`./tools/${toolName}.js`);
            this.tools[toolName] = module.default || module;
            return this.tools[toolName];
        } catch (error) {
            // Tool module doesn't exist yet, return null
            return null;
        }
    }

    formatToolName(toolName) {
        return toolName
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    loadToolModules() {
        // Pre-expand first category by default
        const firstCategory = document.querySelector('.nav-category .category-header');
        if (firstCategory) {
            const category = firstCategory.dataset.category;
            this.toggleCategory(category);
        }
    }
}

// Utility functions for tools
const ToolUtils = {
    // Copy to clipboard
    copyToClipboard(text) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                this.showNotification('Copied to clipboard!');
            }).catch(err => {
                console.error('Failed to copy:', err);
            });
        } else {
            // Fallback for older browsers
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            try {
                document.execCommand('copy');
                this.showNotification('Copied to clipboard!');
            } catch (err) {
                console.error('Failed to copy:', err);
            }
            document.body.removeChild(textarea);
        }
    },

    // Show notification
    showNotification(message, duration = 2000) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--accent-color);
            color: white;
            padding: 12px 20px;
            border-radius: 4px;
            font-size: 13px;
            z-index: 10000;
            animation: slideIn 0.3s ease-out;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, duration);
    },

    // Format JSON with indentation
    formatJSON(jsonString, indent = 2) {
        try {
            const obj = JSON.parse(jsonString);
            return JSON.stringify(obj, null, indent);
        } catch (error) {
            throw new Error('Invalid JSON: ' + error.message);
        }
    },

    // Minify JSON
    minifyJSON(jsonString) {
        try {
            const obj = JSON.parse(jsonString);
            return JSON.stringify(obj);
        } catch (error) {
            throw new Error('Invalid JSON: ' + error.message);
        }
    }
};

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.toolkitApp = new ToolkitApp();
    });
} else {
    window.toolkitApp = new ToolkitApp();
}

// Make fullscreen methods globally accessible
window.enterFullscreen = (element) => {
    if (window.toolkitApp) {
        window.toolkitApp.enterFullscreen(element);
    }
};

window.exitFullscreen = () => {
    if (window.toolkitApp) {
        window.toolkitApp.exitFullscreen();
    }
};

// Export for use in tool modules
window.ToolUtils = ToolUtils;

// Global functions for settings modal
function closeSettings() {
    document.getElementById('settings-modal').style.display = 'none';
}

function closeHelp() {
    document.getElementById('help-modal').style.display = 'none';
}

function clearFavorites() {
    if (confirm('Are you sure you want to clear all favorites?')) {
        window.toolkitApp.favorites = [];
        window.toolkitApp.saveFavorites();
        window.toolkitApp.showWelcomeScreen();
    }
}

function resetSettings() {
    if (confirm('Are you sure you want to reset all settings to defaults? This cannot be undone.')) {
        localStorage.removeItem('toolkit_settings');
        window.toolkitApp.settings = window.toolkitApp.loadSettings();
        window.toolkitApp.applySettings();
        document.getElementById('theme-select').value = window.toolkitApp.settings.theme;
        document.getElementById('accent-color').value = window.toolkitApp.settings.accentColor;
        document.getElementById('default-landing').value = window.toolkitApp.settings.defaultLanding;
    }
}

// Add toggleFavoriteTool method to ToolkitApp
ToolkitApp.prototype.toggleFavoriteTool = function(toolName) {
    if (!toolName) {
        console.error('No toolName provided to toggleFavoriteTool');
        return;
    }
    this.toggleFavorite(toolName);
    // Update the favorite button using data attribute
    const btn = document.querySelector(`.favorite-btn[data-tool-name="${toolName}"]`);
    if (btn) {
        if (this.isFavorite(toolName)) {
            btn.classList.add('active');
            btn.title = 'Remove from favorites';
        } else {
            btn.classList.remove('active');
            btn.title = 'Add to favorites';
        }
    }
    // Always update landing dropdown
    this.updateLandingDropdown();
};

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    const settingsModal = document.getElementById('settings-modal');
    const helpModal = document.getElementById('help-modal');
    if (e.target === settingsModal) {
        closeSettings();
    }
    if (e.target === helpModal) {
        closeHelp();
    }
});

