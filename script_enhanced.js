// Enhanced Portfolio JavaScript
class EnhancedPortfolio {
  constructor() {
    this.init();
    this.setupEventListeners();
    this.animateStats();
    this.setupIntersectionObserver();
  }

  init() {
    // Initialize state
    this.currentFilter = 'all';
    this.currentTag = 'all';
    this.searchTerm = '';
    this.isDarkTheme = true;
    this.modalOpen = false;
    
    // DOM elements
    this.elements = {
      filterBtns: document.querySelectorAll('.filter-btn'),
      tags: document.querySelectorAll('.tag'),
      projectCards: document.querySelectorAll('.project-card'),
      searchToggle: document.getElementById('searchToggle'),
      searchContainer: document.getElementById('searchContainer'),
      searchInput: document.getElementById('searchInput'),
      searchClose: document.getElementById('searchClose'),
      themeToggle: document.getElementById('themeToggle'),
      modal: document.getElementById('projectModal'),
      modalClose: document.getElementById('modalClose'),
      modalBody: document.getElementById('modalBody'),
      backToTop: document.getElementById('backToTop'),
      loadMoreBtn: document.getElementById('loadMoreBtn'),
      projectsGrid: document.getElementById('projectsGrid'),
      statNumbers: document.querySelectorAll('.stat-number')
    };

    // Project data for modal
    this.projectData = {
      'gps-animation': {
        title: 'Interactive GPS Route Animation',
        description: 'Real-time GPS tracking visualization with animated route display and interactive controls.',
        details: `
          <h3>Project Overview</h3>
          <p>This interactive GPS route animation system provides real-time visualization of tracking data with smooth animations and user controls.</p>
          
          <h3>Key Features</h3>
          <ul>
            <li>Real-time GPS data processing and visualization</li>
            <li>Smooth route animation with speed controls</li>
            <li>Interactive timeline scrubbing</li>
            <li>Multiple map layer support</li>
            <li>Export functionality for routes</li>
          </ul>
          
          <h3>Technologies Used</h3>
          <p>JavaScript, Leaflet.js, D3.js, WebSocket, Node.js</p>
          
          <h3>Performance Metrics</h3>
          <ul>
            <li>Handles 10,000+ data points smoothly</li>
            <li>60 FPS animation performance</li>
            <li>Real-time data processing with <100ms latency</li>
          </ul>
        `,
        image: 'images/2025-01.bmp',
        technologies: ['JavaScript', 'Leaflet.js', 'D3.js', 'WebSocket'],
        date: 'January 2025',
        category: 'Interactive Visualization'
      },
      'field-setup': {
        title: 'Field Instrumentation Setup',
        description: 'Complete field station configuration with GPS, sensors, and data collection equipment.',
        details: `
          <h3>Project Overview</h3>
          <p>Comprehensive field instrumentation setup for environmental monitoring and data collection.</p>
          
          <h3>Equipment Used</h3>
          <ul>
            <li>High-precision GPS receivers</li>
            <li>Environmental sensors (temperature, humidity, pressure)</li>
            <li>Soil moisture probes</li>
            <li>Data logging systems</li>
            <li>Solar power systems</li>
          </ul>
          
          <h3>Installation Process</h3>
          <p>Professional installation with proper calibration, testing, and documentation.</p>
        `,
        image: 'images/2025-02.jpg',
        technologies: ['GPS', 'Environmental Sensors', 'Data Logging'],
        date: 'February 2025',
        category: 'Field Work'
      },
      'dynamic-map': {
        title: 'Dynamic Map Interface',
        description: 'Interactive web mapping application with real-time data updates and custom layers.',
        details: `
          <h3>Project Overview</h3>
          <p>A sophisticated web mapping application featuring real-time data updates, custom layers, and advanced visualization capabilities.</p>
          
          <h3>Core Features</h3>
          <ul>
            <li>Real-time data streaming and visualization</li>
            <li>Custom layer management system</li>
            <li>Advanced styling and symbology</li>
            <li>Spatial analysis tools</li>
            <li>Export and sharing capabilities</li>
          </ul>
          
          <h3>Technical Implementation</h3>
          <p>Built with modern web technologies including WebGL for high-performance rendering.</p>
        `,
        image: 'images/2025-03.png',
        technologies: ['WebGL', 'Mapbox GL', 'React', 'Node.js'],
        date: 'March 2025',
        category: 'Web Mapping'
      }
    };
  }

  setupEventListeners() {
    // Filter buttons
    this.elements.filterBtns.forEach(btn => {
      btn.addEventListener('click', (e) => this.handleFilter(e));
    });

    // Tags
    this.elements.tags.forEach(tag => {
      tag.addEventListener('click', (e) => this.handleTagFilter(e));
    });

    // Search functionality
    this.elements.searchToggle?.addEventListener('click', () => this.toggleSearch());
    this.elements.searchClose?.addEventListener('click', () => this.closeSearch());
    this.elements.searchInput?.addEventListener('input', (e) => this.handleSearch(e));
    this.elements.searchInput?.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.closeSearch();
    });

    // Theme toggle
    this.elements.themeToggle?.addEventListener('click', () => this.toggleTheme());

    // Modal functionality
    this.elements.modalClose?.addEventListener('click', () => this.closeModal());
    this.elements.modal?.addEventListener('click', (e) => {
      if (e.target === this.elements.modal) this.closeModal();
    });

    // Project view buttons
    document.querySelectorAll('.project-view').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const projectId = btn.dataset.project;
        this.openModal(projectId);
      });
    });

    // Back to top
    this.elements.backToTop?.addEventListener('click', () => this.scrollToTop());
    window.addEventListener('scroll', () => this.handleScroll());

    // Load more
    this.elements.loadMoreBtn?.addEventListener('click', () => this.loadMoreProjects());

    // Keyboard navigation
    document.addEventListener('keydown', (e) => this.handleKeyboard(e));

    // Project card hover effects
    this.elements.projectCards.forEach(card => {
      card.addEventListener('mouseenter', () => this.handleCardHover(card, true));
      card.addEventListener('mouseleave', () => this.handleCardHover(card, false));
    });

    // Close search on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.elements.searchContainer?.classList.contains('active')) {
        this.closeSearch();
      }
    });
  }

  handleFilter(e) {
    const filter = e.target.dataset.filter;
    this.currentFilter = filter;
    
    // Update active state
    this.elements.filterBtns.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    
    // Filter projects
    this.filterProjects();
    
    // Add animation
    this.animateFilterChange();
  }

  handleTagFilter(e) {
    const tag = e.target.dataset.tag;
    this.currentTag = tag;
    
    // Update active state
    this.elements.tags.forEach(t => t.classList.remove('active'));
    e.target.classList.add('active');
    
    // Filter projects
    this.filterProjects();
    
    // Add animation
    this.animateFilterChange();
  }

  handleSearch(e) {
    this.searchTerm = e.target.value.toLowerCase();
    this.filterProjects();
  }

  filterProjects() {
    this.elements.projectCards.forEach(card => {
      const category = card.dataset.category;
      const tags = card.dataset.tags;
      const title = card.querySelector('.project-title').textContent.toLowerCase();
      const description = card.querySelector('.project-description').textContent.toLowerCase();
      
      const matchesFilter = this.currentFilter === 'all' || category.includes(this.currentFilter);
      const matchesTag = this.currentTag === 'all' || tags.includes(this.currentTag);
      const matchesSearch = this.searchTerm === '' || 
                          title.includes(this.searchTerm) || 
                          description.includes(this.searchTerm);
      
      if (matchesFilter && matchesTag && matchesSearch) {
        card.classList.remove('hidden');
        card.style.animation = 'fadeInUp 0.6s ease forwards';
      } else {
        card.classList.add('hidden');
      }
    });

    this.updateProjectCount();
  }

  updateProjectCount() {
    const visibleCards = document.querySelectorAll('.project-card:not(.hidden)').length;
    // Update UI with count if needed
    console.log(`Showing ${visibleCards} projects`);
  }

  toggleSearch() {
    const isActive = this.elements.searchContainer?.classList.contains('active');
    if (isActive) {
      this.closeSearch();
    } else {
      this.openSearch();
    }
  }

  openSearch() {
    this.elements.searchContainer?.classList.add('active');
    this.elements.searchInput?.focus();
  }

  closeSearch() {
    this.elements.searchContainer?.classList.remove('active');
    this.elements.searchInput.value = '';
    this.searchTerm = '';
    this.filterProjects();
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    document.body.classList.toggle('light-theme');
    
    const icon = this.elements.themeToggle?.querySelector('i');
    if (icon) {
      icon.className = this.isDarkTheme ? 'fas fa-moon' : 'fas fa-sun';
    }
    
    // Save preference
    localStorage.setItem('theme', this.isDarkTheme ? 'dark' : 'light');
  }

  openModal(projectId) {
    const project = this.projectData[projectId];
    if (!project) return;
    
    this.modalOpen = true;
    this.elements.modalBody.innerHTML = this.generateModalContent(project);
    this.elements.modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Add entrance animation
    setTimeout(() => {
      this.elements.modalBody.style.animation = 'fadeInUp 0.5s ease';
    }, 10);
  }

  closeModal() {
    this.modalOpen = false;
    this.elements.modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  generateModalContent(project) {
    return `
      <div class="modal-project">
        <div class="modal-header">
          <h2>${project.title}</h2>
          <div class="modal-meta">
            <span class="modal-date">${project.date}</span>
            <span class="modal-category">${project.category}</span>
          </div>
        </div>
        
        <div class="modal-image">
          <img src="${project.image}" alt="${project.title}" loading="lazy">
        </div>
        
        <div class="modal-description">
          <p>${project.description}</p>
        </div>
        
        <div class="modal-details">
          ${project.details}
        </div>
        
        <div class="modal-technologies">
          <h3>Technologies</h3>
          <div class="tech-tags">
            ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
          </div>
        </div>
        
        <div class="modal-actions">
          <button class="modal-btn primary" onclick="window.open('#', '_blank')">
            <i class="fas fa-external-link-alt"></i> View Live Project
          </button>
          <button class="modal-btn secondary" onclick="portfolio.shareProject('${project.title}')">
            <i class="fas fa-share"></i> Share
          </button>
        </div>
      </div>
    `;
  }

  shareProject(title) {
    if (navigator.share) {
      navigator.share({
        title: title,
        text: `Check out this project: ${title}`,
        url: window.location.href
      });
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      this.showNotification('Link copied to clipboard!');
    }
  }

  showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%);
      background: var(--primary-color);
      color: var(--bg-primary);
      padding: 1rem 2rem;
      border-radius: 25px;
      z-index: 3000;
      animation: slideUp 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'fadeOut 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Back to top button
    if (scrollTop > 500) {
      this.elements.backToTop?.classList.add('visible');
    } else {
      this.elements.backToTop?.classList.remove('visible');
    }
    
    // Header shadow
    const header = document.querySelector('.header');
    if (scrollTop > 100) {
      header?.style.setProperty('box-shadow', '0 2px 10px rgba(0,0,0,0.1)');
    } else {
      header?.style.setProperty('box-shadow', 'none');
    }
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  loadMoreProjects() {
    const btn = this.elements.loadMoreBtn;
    btn.classList.add('loading');
    btn.disabled = true;
    
    // Simulate loading
    setTimeout(() => {
      // In a real app, this would load more projects from an API
      btn.innerHTML = '<span>All Projects Loaded</span><i class="fas fa-check"></i>';
      btn.classList.remove('loading');
      
      setTimeout(() => {
        btn.style.opacity = '0.5';
        btn.style.cursor = 'not-allowed';
      }, 2000);
    }, 1500);
  }

  handleKeyboard(e) {
    if (this.modalOpen) {
      if (e.key === 'Escape') this.closeModal();
    } else {
      // Global keyboard shortcuts
      if (e.key === '/' && !this.elements.searchInput?.matches(':focus')) {
        e.preventDefault();
        this.openSearch();
      }
      if (e.key === 't' && e.ctrlKey) {
        e.preventDefault();
        this.toggleTheme();
      }
    }
  }

  handleCardHover(card, isHovering) {
    if (isHovering) {
      card.style.transform = 'translateY(-5px) scale(1.02)';
    } else {
      card.style.transform = '';
    }
  }

  animateStats() {
    this.elements.statNumbers.forEach(stat => {
      const target = parseInt(stat.dataset.count);
      const duration = 2000;
      const increment = target / (duration / 16);
      let current = 0;
      
      const updateCount = () => {
        current += increment;
        if (current < target) {
          stat.textContent = Math.floor(current).toLocaleString();
          requestAnimationFrame(updateCount);
        } else {
          stat.textContent = target.toLocaleString();
        }
      };
      
      // Start animation when element is in view
      this.observeElement(stat, updateCount);
    });
  }

  observeElement(element, callback) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          callback();
          observer.unobserve(element);
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(element);
  }

  setupIntersectionObserver() {
    // Animate year sections as they come into view
    const yearSections = document.querySelectorAll('.year-section');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });
    
    yearSections.forEach(section => {
      section.style.opacity = '0';
      section.style.transform = 'translateY(30px)';
      section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(section);
    });
  }

  animateFilterChange() {
    const cards = document.querySelectorAll('.project-card:not(.hidden)');
    cards.forEach((card, index) => {
      card.style.animation = 'none';
      setTimeout(() => {
        card.style.animation = `fadeInUp 0.6s ease ${index * 0.1}s forwards`;
      }, 10);
    });
  }

  // Initialize theme from localStorage
  initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      this.isDarkTheme = false;
      document.body.classList.add('light-theme');
      const icon = this.elements.themeToggle?.querySelector('i');
      if (icon) icon.className = 'fas fa-sun';
    }
  }

  // Lazy loading for images
  setupLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.src; // Trigger load
          imageObserver.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  }

  // Performance monitoring
  trackPerformance() {
    if ('performance' in window) {
      window.addEventListener('load', () => {
        const perfData = performance.getEntriesByType('navigation')[0];
        console.log(`Page load time: ${perfData.loadEventEnd - perfData.loadEventStart}ms`);
      });
    }
  }
}

// Initialize the portfolio when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.portfolio = new EnhancedPortfolio();
  
  // Additional initialization
  window.portfolio.initTheme();
  window.portfolio.setupLazyLoading();
  window.portfolio.trackPerformance();
});

// Add CSS for notification animation
const notificationCSS = `
  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }
`;

// Inject additional CSS
const style = document.createElement('style');
style.textContent = notificationCSS;
document.head.appendChild(style);

// Service Worker registration for offline support (optional)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => console.log('SW registered'))
      .catch(err => console.log('SW registration failed'));
  });
}
