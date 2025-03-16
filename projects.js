document.addEventListener('DOMContentLoaded', () => {
    const projectItems = document.querySelectorAll('.project-item');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    const projectOrder = ['A1', 'BB', 'CC', 'DD'];
    let currentProjectIndex = 0;

    // Modal elements
    const modal = document.getElementById('projectModal');
    const modalImage = document.getElementById('modalProjectImage');
    const modalTitle = document.getElementById('modalProjectTitle');
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

        modalImage.src = imageSrc;
        modalTitle.textContent = projectTitle;
        modal.style.display = 'block';
    }

    // Close modal function
    function closeModal() {
        modal.style.display = 'none';
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
        if (event.target === modal) {
            closeModal();
        }
    });

    // Optional: Auto-cycle projects every 5 seconds
    setInterval(nextProject, 5000);
});
