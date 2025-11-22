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
        
        const sidebar = document.getElementById('sidebar');
        if (sidebar) sidebar.style.display = 'none';
        
        const contentHeader = document.querySelector('.content-header');
        const favoriteBtn = contentHeader?.querySelector('.favorite-btn');
        if (favoriteBtn) favoriteBtn.style.display = 'none';
        
        const appHeader = document.querySelector('.app-header');
        if (appHeader && !appHeader.querySelector('.fullscreen-exit-btn')) {
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
        
        const toolContainer = document.querySelector('.tool-container');
        if (toolContainer) {
            Array.from(toolContainer.children).forEach(child => {
                if (child !== element && !child.contains(element) && !child.classList.contains('fullscreen-content')) {
                    child.style.display = 'none';
                }
            });
        }
        
        const allSections = document.querySelectorAll('.tool-section');
        allSections.forEach(section => {
            if (!section.contains(element)) {
                section.style.display = 'none';
            }
        });
        
        element.classList.add('fullscreen-content');
        document.body.classList.add('fullscreen-mode');
    }
    
    exitFullscreen() {
        this.isFullscreen = false;
        
        const sidebar = document.getElementById('sidebar');
        if (sidebar) sidebar.style.display = '';
        
        const favoriteBtn = document.querySelector('.content-header .favorite-btn');
        if (favoriteBtn) favoriteBtn.style.display = '';
        
        const exitBtn = document.querySelector('.app-header .fullscreen-exit-btn');
        if (exitBtn) exitBtn.remove();
        
        const rightMenu = document.querySelector('.app-menu-right');
        if (rightMenu && rightMenu.children.length === 0) {
            rightMenu.remove();
        }
        
        const toolContainer = document.querySelector('.tool-container');
        if (toolContainer) {
            Array.from(toolContainer.children).forEach(child => {
                child.style.display = '';
            });
        }
        
        const allSections = document.querySelectorAll('.tool-section');
        allSections.forEach(section => {
            section.style.display = '';
        });
        
        if (this.fullscreenElement) {
            this.fullscreenElement.classList.remove('fullscreen-content');
        }
        document.body.classList.remove('fullscreen-mode');
        this.fullscreenElement = null;
    }
    
    injectToolStyles(css, toolName) {
        this.removeToolStyles();
        
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
        
        window.addEventListener('hashchange', () => this.handleRouting());
    }
    
    registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('Service Worker registered:', registration);
                    
                    registration.addEventListener('updatefound', () => {
                        const newWorker = registration.installing;
                        newWorker.addEventListener('statechange', () => {
                            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
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
        
        if (this.settings.sidebarWidth) {
            sidebar.style.width = `${this.settings.sidebarWidth}px`;
            document.documentElement.style.setProperty('--sidebar-width', `${this.settings.sidebarWidth}px`);
        }
        
        if (this.settings.sidebarCollapsed) {
            sidebar.classList.add('collapsed');
        }
        
        if (toggle) {
            toggle.addEventListener('click', () => {
                sidebar.classList.toggle('collapsed');
                this.settings.sidebarCollapsed = sidebar.classList.contains('collapsed');
                this.saveSettings();
            });
        }
        
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
        const favoritesList = document.getElementById('favorites-list');
        const favoritesCategory = document.getElementById('favorites-category');
        
        if (!favoritesList || !favoritesCategory) {
            console.warn('Favorites elements not found');
            return;
        }
        
        if (this.favorites.length === 0) {
            favoritesCategory.style.display = 'none';
            favoritesCategory.classList.remove('has-favorites');
        } else {
            favoritesCategory.style.display = 'block';
            favoritesCategory.classList.add('has-favorites');
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
        localStorage.setItem('toolkit_settings', JSON.stringify(this.settings));
        this.applySettings();
    }

    applySettings() {
        document.body.classList.remove('theme-dark', 'theme-light');
        document.body.classList.add(`theme-${this.settings.theme}`);
        
        if (this.settings.accentColor) {
            document.documentElement.style.setProperty('--accent-color', this.settings.accentColor);
            document.documentElement.style.setProperty('--accent-hover', this.lightenColor(this.settings.accentColor, 10));
        }
        
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
        document.querySelectorAll('.category-header').forEach(header => {
            header.addEventListener('click', (e) => {
                const category = header.dataset.category;
                this.toggleCategory(category);
            });
        });

        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const tool = item.dataset.tool;
                if (tool) {
                    this.navigateToTool(tool);
                }
            });
        });

        const settingsMenuItem = document.getElementById('settings-menu-item');
        if (settingsMenuItem) {
            settingsMenuItem.addEventListener('click', (e) => {
                e.stopPropagation();
                const isActive = settingsMenuItem.classList.contains('active');
                document.querySelectorAll('.menu-item').forEach(item => {
                    item.classList.remove('active');
                });
                if (!isActive) {
                    settingsMenuItem.classList.add('active');
                    setTimeout(() => {
                        this.updateLandingDropdown();
                    }, 0);
                }
            });
        }

        const self = this;
        document.addEventListener('click', function(e) {
            const item = e.target.closest('.dropdown-item');
            if (!item) {
                return;
            }

            const action = item.dataset.action;
            
            if (action === 'theme') {
                return;
            }
            if (action === 'accent-color') {
                return;
            }
            if (action === 'default-landing') {
                return;
            }
            if (action === 'toggle-upcoming') {
                e.stopPropagation();
                e.preventDefault();
                const currentValue = self.settings.showUpcoming || false;
                self.settings.showUpcoming = !currentValue;
                self.saveSettings();
                self.updateUpcomingIcon();
                self.toggleUpcomingTools();
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
        }, true);

        document.addEventListener('click', (e) => {
            const themeItem = e.target.closest('.dropdown-item[data-theme]');
            if (themeItem) {
                e.stopPropagation();
                e.preventDefault();
                const theme = themeItem.dataset.theme;
                this.settings.theme = theme;
                this.saveSettings();
                document.querySelectorAll('.menu-item').forEach(item => {
                    item.classList.remove('active');
                });
                return false;
            }
        }, true);

        document.addEventListener('click', (e) => {
            if (e.target.closest('.dropdown-item[data-theme]')) {
                return;
            }
            
            if (e.target.closest('.dropdown-item')) {
                const action = e.target.closest('.dropdown-item')?.dataset.action;
                if (action === 'theme' || action === 'default-landing') {
                    return;
                }
                if (action === 'toggle-upcoming' || action === 'clear-favorites' || action === 'reset-settings') {
                    return;
                }
            }
            if (!e.target.closest('.menu-item')) {
                document.querySelectorAll('.menu-item').forEach(item => {
                    item.classList.remove('active');
                });
            }
        });

        document.addEventListener('click', (e) => {
            const landingItem = e.target.closest('.dropdown-item[data-landing]');
            if (landingItem) {
                e.stopPropagation();
                const landing = landingItem.dataset.landing;
                this.settings.defaultLanding = landing;
                this.saveSettings();
                if (landing === 'welcome') {
                    window.location.hash = '';
                    this.showWelcomeScreen();
                }
                document.querySelectorAll('.menu-item').forEach(item => {
                    item.classList.remove('active');
                });
            }
        });

        const colorPickerItem = document.querySelector('[data-action="accent-color"]');
        const colorPicker = document.getElementById('accent-color-inline');
        if (colorPicker && colorPickerItem) {
            colorPicker.value = this.settings.accentColor;
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
        
        this.updateUpcomingIcon();
    }

    updateLandingDropdown() {
        const landingSubmenu = document.getElementById('landing-submenu');
        if (!landingSubmenu) {
            console.warn('landing-submenu not found');
            return;
        }

        const existingFavorites = landingSubmenu.querySelectorAll('.dropdown-item[data-landing^="tool-"]');
        existingFavorites.forEach(item => item.remove());

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

            landingSubmenu.querySelectorAll('.dropdown-item[data-landing^="tool-"]').forEach(item => {
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
        window.location.hash = `/tools/${toolName}`;
        
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        
        const activeItem = document.querySelector(`[data-tool="${toolName}"]`);
        if (activeItem) {
            activeItem.classList.add('active');
            
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
        
        this.loadTool(toolName);
    }

    handleRouting() {
        const hash = window.location.hash;
        
        if (!hash || hash === '#') {
            this.showWelcomeScreen();
            return;
        }

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
        
        if (this.settings.defaultLanding && this.settings.defaultLanding.startsWith('tool-')) {
            const toolName = this.settings.defaultLanding.replace('tool-', '');
            this.navigateToTool(toolName);
            return;
        }
        
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
        
        document.querySelectorAll('.nav-category').forEach(category => {
            category.style.display = '';
        });
        
        document.querySelectorAll('[data-coming-soon="true"]').forEach(item => {
            const category = item.closest('.nav-category');
            if (category) {
                const allItems = category.querySelectorAll('.nav-item');
                const allComingSoon = Array.from(allItems).every(
                    navItem => navItem.dataset.comingSoon === 'true'
                );
                
                if (!showUpcoming) {
                    item.style.display = 'none';
                    if (allComingSoon && allItems.length > 0) {
                        category.style.display = 'none';
                    }
                } else {
                    item.style.display = '';
                    category.style.display = 'block';
                }
            } else {
                item.style.display = showUpcoming ? '' : 'none';
            }
        });
    }

    async loadTool(toolName) {
        const toolTitle = document.getElementById('tool-title');
        const contentBody = document.getElementById('tool-content');
        
        contentBody.innerHTML = '<div class="tool-container"><p>Loading tool...</p></div>';
        
        try {
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
                this.removeToolStyles();
                
                if (toolModule.styles) {
                    this.injectToolStyles(toolModule.styles, toolName);
                }
                
                contentBody.innerHTML = `
                    <div class="tool-container">
                        ${toolModule.html || '<p>Tool content coming soon...</p>'}
                    </div>
                `;
                
                const favBtn = toolTitle.querySelector('.favorite-btn');
                if (favBtn) {
                    favBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        this.toggleFavoriteTool(toolName);
                    });
                }
                
                if (toolModule.init) {
                    toolModule.init();
                }
                
                this.currentTool = toolName;
            } else {
                const isFav = this.isFavorite(toolName);
                toolTitle.innerHTML = `
                    ${this.formatToolName(toolName)}
                    <button class="favorite-btn ${isFav ? 'active' : ''}" data-tool-name="${toolName}" title="${isFav ? 'Remove from favorites' : 'Add to favorites'}">
                        <i class="fas fa-star"></i>
                    </button>
                `;
                
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
        if (this.tools[toolName]) {
            return this.tools[toolName];
        }

        try {
            const module = await import(`./tools/${toolName}.js`);
            this.tools[toolName] = module.default || module;
            return this.tools[toolName];
        } catch (error) {
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
        const firstCategory = document.querySelector('.nav-category .category-header');
        if (firstCategory) {
            const category = firstCategory.dataset.category;
            this.toggleCategory(category);
        }
    }
}

const ToolUtils = {
    copyToClipboard(text) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                this.showNotification('Copied to clipboard!');
            }).catch(err => {
                console.error('Failed to copy:', err);
            });
        } else {
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

    formatJSON(jsonString, indent = 2) {
        try {
            const obj = JSON.parse(jsonString);
            return JSON.stringify(obj, null, indent);
        } catch (error) {
            throw new Error('Invalid JSON: ' + error.message);
        }
    },

    minifyJSON(jsonString) {
        try {
            const obj = JSON.parse(jsonString);
            return JSON.stringify(obj);
        } catch (error) {
            throw new Error('Invalid JSON: ' + error.message);
        }
    }
};

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

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.toolkitApp = new ToolkitApp();
    });
} else {
    window.toolkitApp = new ToolkitApp();
}

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

window.ToolUtils = ToolUtils;

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

ToolkitApp.prototype.toggleFavoriteTool = function(toolName) {
    if (!toolName) {
        console.error('No toolName provided to toggleFavoriteTool');
        return;
    }
    this.toggleFavorite(toolName);
    
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
    this.updateLandingDropdown();
};

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

