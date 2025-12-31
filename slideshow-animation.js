// Slideshow Animation
class SlideshowAnimation {
    constructor() {
        this.slides = document.querySelectorAll('.slide');
        this.dots = document.querySelectorAll('.dot');
        this.currentSlide = 0;
        this.slideInterval = 4000; // 4 seconds per slide
        this.slideInfo = {
            titles: [
                'Pipe Surveying',
                'DataInMotion Live GIS',
                'Journal Report',
                'Locating Utilities',
                'Topo Shots',
                'GNSS Setup',
                'IoT Devices',
                'Pipeline GIS',
                'Field Operations',
                'ATV Surveys'
            ],
            descriptions: [
                'Taking shots of welds for a gas pipeline expansion project',
                'datainmotion.ca live gis/micropython devices tutorials and development',
                'Published a Journal Report on youth health and public spaces in Botswana - first entry paper after urban planning degree',
                'Locating utilities (gas, oil, electric etc) for infrastructure projects',
                'Taking topo shots that were used to determine and stake future pipe positions',
                'Setting up GNSS to mark future well site boundaries and centers',
                'Microcontroller experimentation for IoT devices and linking to static maps to make dynamic outputs',
                'Locating and marking pipes to ensure the right pieces get on the ground - measuring and comparing to existing lists',
                'ARGO operation while flagging well sites for field surveys',
                'ATV and remote access to carry out surveys in challenging terrain'
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
