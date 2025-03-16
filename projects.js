document.addEventListener('DOMContentLoaded', () => {
    const projectGrid = document.querySelector('.project-grid');
    const projectItems = document.querySelectorAll('.project-item');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const modal = document.getElementById('project-modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const closeModalBtn = document.querySelector('.close-btn');

    const projectPlaceholder = document.querySelector('.project-placeholder');
    const projectsModal = document.getElementById('projects-modal');
    const modalProjectImage = document.getElementById('modal-project-image');
    const modalProjectTitle = document.getElementById('modal-project-title');
    const closeBtn = document.querySelector('.close-btn');
    const prevBtnModal = document.querySelector('.prev-btn');
    const nextBtnModal = document.querySelector('.next-btn');

    let currentProjectIndex = 0;

    // Function to update active project and scroll
    function updateActiveProject(index) {
        // Ensure index is within bounds
        currentProjectIndex = (index + projectItems.length) % projectItems.length;
        
        // Remove active class from all items
        projectItems.forEach(item => {
            item.classList.remove('active');
        });

        // Add active class to current item
        projectItems[currentProjectIndex].classList.add('active');

        // Scroll to the current project item
        if (window.innerWidth <= 768) {
            projectItems[currentProjectIndex].scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
        }
    }

    // Navigation button event listeners
    prevBtn.addEventListener('click', () => {
        updateActiveProject(currentProjectIndex - 1);
    });

    nextBtn.addEventListener('click', () => {
        updateActiveProject(currentProjectIndex + 1);
    });

    // Modal functionality
    projectItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img').src;
            const title = item.querySelector('.project-title').textContent;

            modalImage.src = imgSrc;
            modalTitle.textContent = title;
            modal.style.display = 'flex';
        });
    });

    // Close modal
    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Mobile-friendly project showcase interaction
    function setupMobileProjectShowcase() {
        if (window.innerWidth <= 768) {
            // Start with the first project (Land use & analysis)
            updateActiveProject(0);

            // Enable horizontal scrolling with snap
            projectGrid.style.overflowX = 'scroll';
            projectGrid.style.scrollSnapType = 'x mandatory';
        }
    }

    // Initial setup and responsive adjustments
    setupMobileProjectShowcase();
    window.addEventListener('resize', setupMobileProjectShowcase);

    // Optional: Auto-cycle projects every 5 seconds
    setInterval(() => {
        updateActiveProject(currentProjectIndex + 1);
    }, 5000);

    // Project images array
    const projects = [
        { 
            title: 'Land Use Analysis', 
            image: 'projects/A1.jpg' 
        },
        { 
            title: 'Cartography & Analysis', 
            image: 'projects/BB.jpg' 
        },
        { 
            title: 'Object Classification & Scripting', 
            image: 'projects/CC.jpg' 
        },
        { 
            title: 'Webmapping', 
            image: 'projects/DD.jpg' 
        }
    ];

    let currentProjectIndexModal = 0;

    // Open modal function
    function openProjectsModal() {
        showProject(currentProjectIndexModal);
        projectsModal.style.display = 'flex';
    }

    // Show specific project
    function showProject(index) {
        currentProjectIndexModal = (index + projects.length) % projects.length;
        const project = projects[currentProjectIndexModal];
        
        modalProjectImage.src = project.image;
        modalProjectTitle.textContent = project.title;
    }

    // Navigation functions
    function nextProject() {
        currentProjectIndexModal = (currentProjectIndexModal + 1) % projects.length;
        showProject(currentProjectIndexModal);
    }

    function prevProject() {
        currentProjectIndexModal = (currentProjectIndexModal - 1 + projects.length) % projects.length;
        showProject(currentProjectIndexModal);
    }

    // Event Listeners
    projectPlaceholder.addEventListener('click', openProjectsModal);

    closeBtn.addEventListener('click', () => {
        projectsModal.style.display = 'none';
    });

    prevBtnModal.addEventListener('click', prevProject);
    nextBtnModal.addEventListener('click', nextProject);

    // Close modal when clicking outside
    projectsModal.addEventListener('click', (event) => {
        if (event.target === projectsModal) {
            projectsModal.style.display = 'none';
        }
    });
});
