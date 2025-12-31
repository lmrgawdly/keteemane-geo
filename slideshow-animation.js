// Slideshow Animation
class SlideshowAnimation {
    constructor() {
        this.slides = document.querySelectorAll('.slide');
        this.dots = document.querySelectorAll('.dot');
        this.currentSlide = 0;
        this.slideInterval = 4000; // 4 seconds per slide
        this.slideInfo = {
            titles: [
                'Spatial Analysis',
                '2025 Analysis',
                '2024 Mapping',
                'Cartography',
                '2022 Project',
                'Data Processing',
                'Recent Work',
                'Pipeline GIS',
                'Field Operations',
                'Mobile Mapping'
            ],
            descriptions: [
                'Advanced GIS spatial analysis and mapping techniques',
                'Latest GIS analysis projects and methodologies',
                'Professional cartography and data visualization',
                'Expert map design and spatial representation',
                'Comprehensive GIS project management',
                'Efficient data processing and analysis workflows',
                'Recent GIS developments and innovations',
                'Pipeline infrastructure mapping and analysis',
                'Field operations and on-site GIS applications',
                'Mobile mapping and real-time data collection'
            ]
        };
        
        this.init();
    }

    init() {
        if (this.slides.length === 0) return;
        
        console.log('Initializing slideshow with', this.slides.length, 'slides');
        
        // Start automatic slideshow
        this.startSlideshow();
        
        // Add dot navigation
        this.addDotNavigation();
        
        // Add keyboard navigation
        this.addKeyboardNavigation();
        
        // Add touch/swipe support
        this.addTouchSupport();
    }

    startSlideshow() {
        // Change slides automatically
        this.interval = setInterval(() => {
            this.nextSlide();
        }, this.slideInterval);
    }

    showSlide(index) {
        // Remove active class from current slide and dot
        this.slides[this.currentSlide].classList.remove('active');
        this.dots[this.currentSlide].classList.remove('active');
        
        // Update current slide
        this.currentSlide = index;
        
        // Add active class to new slide and dot
        this.slides[this.currentSlide].classList.add('active');
        this.dots[this.currentSlide].classList.add('active');
        
        // Update slide info
        this.updateSlideInfo();
        
        console.log('Showing slide', this.currentSlide + 1);
    }

    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.showSlide(nextIndex);
    }

    prevSlide() {
        const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.showSlide(prevIndex);
    }

    updateSlideInfo() {
        const titleElement = document.getElementById('slide-title');
        const descriptionElement = document.getElementById('slide-description');
        
        if (titleElement) {
            titleElement.textContent = this.slideInfo.titles[this.currentSlide];
        }
        
        if (descriptionElement) {
            descriptionElement.textContent = this.slideInfo.descriptions[this.currentSlide];
        }
    }

    addDotNavigation() {
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.showSlide(index);
                this.resetInterval();
            });
        });
    }

    addKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') {
                this.nextSlide();
                this.resetInterval();
            } else if (e.key === 'ArrowLeft') {
                this.prevSlide();
                this.resetInterval();
            }
        });
    }

    addTouchSupport() {
        let startX = 0;
        let endX = 0;
        
        const slideshow = document.querySelector('.slideshow');
        
        slideshow.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        slideshow.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            
            if (Math.abs(diff) > 50) { // Minimum swipe distance
                if (diff > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
                this.resetInterval();
            }
        });
    }

    resetInterval() {
        clearInterval(this.interval);
        this.startSlideshow();
    }
}

// Initialize slideshow when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SlideshowAnimation();
});
