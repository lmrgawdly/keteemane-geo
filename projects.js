document.addEventListener('DOMContentLoaded', () => {
    // Debugging: Log when the script is loaded
    console.log('Projects script loaded');

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

    // Debugging: Check if elements exist
    if (!projectGrid) console.error('Project grid not found');
    if (!projectItems) console.error('Project items not found');
    if (!prevBtn) console.error('Previous button not found');
    if (!nextBtn) console.error('Next button not found');
    if (!modal) console.error('Modal not found');
    if (!modalImage) console.error('Modal image not found');
    if (!modalTitle) console.error('Modal title not found');
    if (!closeModalBtn) console.error('Close modal button not found');
    if (!projectPlaceholder) console.error('Project placeholder not found');
    if (!projectsModal) console.error('Projects modal not found');
    if (!modalProjectImage) console.error('Modal project image not found');
    if (!modalProjectTitle) console.error('Modal project title not found');
    if (!closeBtn) console.error('Close button not found');
    if (!prevBtnModal) console.error('Previous button modal not found');
    if (!nextBtnModal) console.error('Next button modal not found');

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
        
        // Debugging
        console.log(`Updated active project to index: ${currentProjectIndex}`);
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
            
            // Debugging
            console.log(`Modal opened with image: ${imgSrc} and title: ${title}`);
        });
    });

    // Close modal
    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        
        // Debugging
        console.log('Modal closed');
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
            
            // Debugging
            console.log('Modal closed by clicking outside');
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
            
            // Debugging
            console.log('Mobile project showcase setup');
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

    // Function to show a specific project
    function showProject(index) {
        // Ensure index is within bounds
        currentProjectIndexModal = (index + projects.length) % projects.length;
        
        // Update modal content
        const project = projects[currentProjectIndexModal];
        modalProjectImage.src = project.image;
        modalProjectTitle.textContent = project.title;
        
        // Debugging
        console.log(`Showing project: ${project.title}, Image: ${project.image}`);
    }

    // Open modal function
    function openProjectsModal() {
        // Debugging
        console.log('Attempting to open projects modal');
        
        // Start with first project (Land Use Analysis)
        currentProjectIndexModal = 0;
        showProject(currentProjectIndexModal);
        
        // Ensure modal is displayed
        if (projectsModal) {
            projectsModal.style.display = 'flex';
            console.log('Modal should now be visible');
        } else {
            console.error('Cannot open modal - element not found');
        }
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

    // Attach event listeners with additional error checking
    if (projectPlaceholder) {
        projectPlaceholder.addEventListener('click', (event) => {
            console.log('Project placeholder clicked');
            event.stopPropagation();
            openProjectsModal();
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            if (projectsModal) projectsModal.style.display = 'none';
        });
    }

    if (prevBtnModal) {
        prevBtnModal.addEventListener('click', prevProject);
    }

    if (nextBtnModal) {
        nextBtnModal.addEventListener('click', nextProject);
    }

    // Close modal when clicking outside
    if (projectsModal) {
        projectsModal.addEventListener('click', (event) => {
            if (event.target === projectsModal) {
                projectsModal.style.display = 'none';
            }
        });
    }

    // Additional debugging to verify script execution
    console.log('Projects script event listeners set up');
});
