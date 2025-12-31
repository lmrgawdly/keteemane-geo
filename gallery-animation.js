// Professional Gallery Animation
class GalleryAnimation {
    constructor() {
        this.galleryItems = document.querySelectorAll('.gallery-item');
        this.init();
    }

    init() {
        if (this.galleryItems.length === 0) return;
        
        console.log('Initializing gallery with', this.galleryItems.length, 'items');
        
        // Add subtle floating animation
        this.addFloatingAnimation();
        
        // Add click interactions
        this.addClickInteractions();
        
        // Add parallax effect on mouse move
        this.addParallaxEffect();
    }

    addFloatingAnimation() {
        this.galleryItems.forEach((item, index) => {
            // Add subtle floating animation with different delays
            const delay = index * 0.5;
            const duration = 4 + (index % 2) * 2; // Alternate between 4s and 6s
            
            item.style.animation = `
                fadeInScale 0.8s ease-out ${delay}s forwards,
                float ${duration}s ease-in-out ${delay + 0.8}s infinite
            `;
        });
    }

    addClickInteractions() {
        this.galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                // Add pulse effect on click
                item.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    item.style.transform = '';
                }, 200);
                
                // Log which image was clicked
                const caption = item.querySelector('.image-caption');
                console.log('Gallery item clicked:', caption ? caption.textContent : 'Unknown');
            });
        });
    }

    addParallaxEffect() {
        let mouseX = 0;
        let mouseY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX / window.innerWidth - 0.5) * 10;
            mouseY = (e.clientY / window.innerHeight - 0.5) * 10;
        });
        
        // Apply parallax to gallery items
        const animateParallax = () => {
            this.galleryItems.forEach((item, index) => {
                const depth = (index % 3 + 1) * 0.5; // Different depth for each item
                const moveX = mouseX * depth;
                const moveY = mouseY * depth;
                
                item.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
            
            requestAnimationFrame(animateParallax);
        };
        
        animateParallax();
    }
}

// Add floating keyframe animation dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translateY(0px) rotate(0deg);
        }
        25% {
            transform: translateY(-5px) rotate(1deg);
        }
        75% {
            transform: translateY(5px) rotate(-1deg);
        }
    }
`;
document.head.appendChild(style);

// Initialize gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new GalleryAnimation();
});
