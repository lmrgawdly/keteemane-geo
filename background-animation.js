// Background Image Slideshow Animation
class BackgroundSlideshow {
    constructor() {
        this.slides = document.querySelectorAll('.slide-image');
        this.currentSlide = 0;
        this.slideInterval = 6000; // 6 seconds per slide
        this.transitionDuration = 2000; // 2 seconds transition
        
        this.init();
    }

    init() {
        if (this.slides.length === 0) return;
        
        console.log('Initializing background slideshow with', this.slides.length, 'images');
        
        // Start the slideshow
        this.startSlideshow();
        
        // Add subtle parallax effect on mouse move
        this.addParallaxEffect();
        
        // Add keyboard navigation
        this.addKeyboardNavigation();
    }

    startSlideshow() {
        // Change slides automatically
        setInterval(() => {
            this.nextSlide();
        }, this.slideInterval);
    }

    nextSlide() {
        // Remove active class from current slide
        this.slides[this.currentSlide].classList.remove('active');
        
        // Move to next slide
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        
        // Add active class to new slide
        this.slides[this.currentSlide].classList.add('active');
        
        console.log('Switched to slide', this.currentSlide + 1);
    }

    addParallaxEffect() {
        let mouseX = 0;
        let mouseY = 0;
        let currentX = 0;
        let currentY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
            mouseY = (e.clientY / window.innerHeight - 0.5) * 20;
        });
        
        // Smooth parallax animation
        const animateParallax = () => {
            currentX += (mouseX - currentX) * 0.05;
            currentY += (mouseY - currentY) * 0.05;
            
            const slideshow = document.querySelector('.image-slideshow');
            if (slideshow) {
                slideshow.style.transform = `translate(${currentX}px, ${currentY}px) scale(1.05)`;
            }
            
            requestAnimationFrame(animateParallax);
        };
        
        animateParallax();
    }

    addKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') {
                this.nextSlide();
            } else if (e.key === 'ArrowLeft') {
                this.prevSlide();
            }
        });
    }

    prevSlide() {
        // Remove active class from current slide
        this.slides[this.currentSlide].classList.remove('active');
        
        // Move to previous slide
        this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        
        // Add active class to new slide
        this.slides[this.currentSlide].classList.add('active');
        
        console.log('Switched to slide', this.currentSlide + 1);
    }
}

// Initialize slideshow when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BackgroundSlideshow();
});
