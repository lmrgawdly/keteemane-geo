document.addEventListener('DOMContentLoaded', () => {
    const projectGrid = document.querySelector('.project-grid');
    const projectItems = document.querySelectorAll('.project-item');
    const modal = document.getElementById('project-modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const closeModalBtn = document.querySelector('.close-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    const projectOrder = ['A1', 'BB', 'CC', 'DD'];
    let currentProjectIndex = 0;

    // Modal elements
    const projectModal = document.getElementById('projectModal');
    const modalProjectImage = document.getElementById('modalProjectImage');
    const modalProjectTitle = document.getElementById('modalProjectTitle');
    const closeBtn = document.querySelector('.close-btn');

    function updateActiveProject(index) {
        // Remove active class from all project items
        projectItems.forEach(item => {
            item.classList.remove('active');
        });

        // Add active class to the current project
        const currentProject = document.querySelector(`.project-item[data-project="${projectOrder[index]}"]`);
        currentProject.classList.add('active');
    }

    // Next project function
    function nextProject() {
        currentProjectIndex = (currentProjectIndex + 1) % projectOrder.length;
        updateActiveProject(currentProjectIndex);
    }

    // Previous project function
    function prevProject() {
        currentProjectIndex = (currentProjectIndex - 1 + projectOrder.length) % projectOrder.length;
        updateActiveProject(currentProjectIndex);
    }

    // Open modal function
    function openModal(projectItem) {
        const imageSrc = projectItem.querySelector('img').src;
        const projectTitle = projectItem.getAttribute('data-title');

        modalProjectImage.src = imageSrc;
        modalProjectTitle.textContent = projectTitle;
        projectModal.style.display = 'block';
    }

    // Close modal function
    function closeModal() {
        projectModal.style.display = 'none';
    }

    // Add event listeners to navigation buttons
    nextBtn.addEventListener('click', nextProject);
    prevBtn.addEventListener('click', prevProject);

    // Add event listeners to project placeholders
    projectItems.forEach(item => {
        const placeholder = item.querySelector('.project-placeholder');
        placeholder.addEventListener('click', () => openModal(item));
    });

    // Close modal when clicking on close button
    closeBtn.addEventListener('click', closeModal);

    // Close modal when clicking outside of it
    window.addEventListener('click', (event) => {
        if (event.target === projectModal) {
            closeModal();
        }
    });

    // Optional: Auto-cycle projects every 5 seconds
    setInterval(nextProject, 5000);

    // Mobile-friendly project showcase interaction
    function setupMobileProjectShowcase() {
        if (window.innerWidth <= 768) {
            // Enable horizontal scrolling with snap
            projectGrid.style.overflowX = 'scroll';
            projectGrid.style.scrollSnapType = 'x mandatory';

            // Detect current visible project
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Remove active class from all items
                        projectItems.forEach(item => item.classList.remove('active'));
                        
                        // Add active class to the intersecting item
                        entry.target.classList.add('active');
                    }
                });
            }, {
                root: projectGrid,
                threshold: 0.7 // Trigger when 70% of the item is visible
            });

            // Observe each project item
            projectItems.forEach(item => observer.observe(item));
        }
    }

    // Modal functionality
    projectItems.forEach(item => {
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

    // Initial setup and responsive adjustments
    setupMobileProjectShowcase();
    window.addEventListener('resize', setupMobileProjectShowcase);
});
