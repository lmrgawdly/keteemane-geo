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

    // Simplified and robust modal functionality
    console.log('Projects script initializing');

    // Detailed logging of element selection
    console.log('Project Trigger:', projectPlaceholder);
    console.log('Projects Modal:', projectsModal);
    console.log('Modal Project Image:', modalProjectImage);
    console.log('Modal Project Title:', modalProjectTitle);
    console.log('Close Button:', closeBtn);
    console.log('Previous Button:', prevBtnModal);
    console.log('Next Button:', nextBtnModal);

    // Project images array with descriptions and metadata
    const projects = [
        { 
            title: 'Land Use Analysis', 
            image: 'projects/A1.jpg',
            description: 'Comprehensive land use classification using remote sensing and GIS analysis techniques.',
            technologies: ['ArcGIS', 'Remote Sensing', 'Spatial Analysis'],
            year: '2023'
        },
        { 
            title: 'Cartography & Analysis', 
            image: 'projects/BB.jpg',
            description: 'Professional cartographic design with advanced spatial data visualization.',
            technologies: ['QGIS', 'Cartography', 'Data Visualization'],
            year: '2023'
        },
        { 
            title: 'Object Classification & Scripting', 
            image: 'projects/CC.jpg',
            description: 'Automated object detection using machine learning and custom GIS scripting.',
            technologies: ['Python', 'TensorFlow', 'ArcPy'],
            year: '2024'
        },
        { 
            title: 'Webmapping', 
            image: 'projects/DD.jpg',
            description: 'Interactive web mapping applications with real-time data integration.',
            technologies: ['Leaflet', 'JavaScript', 'Web GIS'],
            year: '2024'
        },
        { 
            title: 'Population Mapping', 
            image: 'projects/EE.jpg',
            description: 'Demographic analysis and population density mapping with statistical modeling.',
            technologies: ['Spatial Statistics', 'R', 'GIS Modeling'],
            year: '2024'
        },
        { 
            title: 'Change Detection', 
            image: 'projects/FF.jpg',
            description: 'Temporal analysis of environmental changes using satellite imagery.',
            technologies: ['Change Detection', 'Satellite Imagery', 'Time Series Analysis'],
            year: '2024'
        },
        { 
            title: 'As-Builts', 
            image: 'projects/page5.jpg',
            description: 'Precision as-built mapping and infrastructure documentation.',
            technologies: ['Surveying', 'CAD Integration', 'Precision Mapping'],
            year: '2023'
        }
    ];

    let currentProjectIndexModal = 0;

    // Function to show a specific project
    function showProject(index) {
        // Ensure index is within bounds
        currentProjectIndexModal = (index + projects.length) % projects.length;
        
        // Update modal content with detailed logging
        const project = projects[currentProjectIndexModal];
        
        console.log('Attempting to show project:', project);
        
        // Add loading state
        if (modalProjectImage) {
            modalProjectImage.classList.add('loading');
            modalProjectImage.classList.remove('error');
            
            // Create new image to test loading
            const testImage = new Image();
            testImage.onload = function() {
                modalProjectImage.src = project.image;
                modalProjectImage.classList.remove('loading');
                console.log(`Successfully loaded image: ${project.image}`);
            };
            testImage.onerror = function() {
                modalProjectImage.classList.remove('loading');
                modalProjectImage.classList.add('error');
                console.error(`Failed to load image: ${project.image}`);
                // Try to set a fallback or show error
                modalProjectImage.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iI2ZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIE5vdCBGb3VuZDwvdGV4dD48L3N2Zz4=';
            };
            testImage.src = project.image;
        } else {
            console.error('Modal project image element not found');
        }
        
        if (modalProjectTitle) {
            modalProjectTitle.textContent = project.title;
            console.log(`Setting title to: ${project.title}`);
        } else {
            console.error('Modal project title element not found');
        }

        // Update additional project information
        const modalDescription = document.getElementById('modal-project-description');
        const modalTechnologies = document.getElementById('modal-project-technologies');
        const modalYear = document.getElementById('modal-project-year');

        if (modalDescription) {
            modalDescription.textContent = project.description;
        }

        if (modalTechnologies) {
            modalTechnologies.innerHTML = project.technologies.map(tech => 
                `<span class="tech-tag">${tech}</span>`
            ).join('');
        }

        if (modalYear) {
            modalYear.textContent = project.year;
        }
    }

    // Open modal function
    function openProjectsModal() {
        console.log('Attempting to open modal');
        
        // Start with first project
        currentProjectIndexModal = 0;
        showProject(currentProjectIndexModal);
        
        // Safely display modal
        if (projectsModal) {
            projectsModal.style.display = 'flex';
            console.log('Modal displayed');
        } else {
            console.error('Modal element not found');
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

    // Attach event listeners with extensive logging
    if (projectPlaceholder) {
        projectPlaceholder.addEventListener('click', (event) => {
            console.log('Project trigger clicked');
            event.stopPropagation();
            openProjectsModal();
        });
    } else {
        console.error('Could not attach click event to project trigger');
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            console.log('Close button clicked');
            if (projectsModal) {
                projectsModal.style.display = 'none';
            }
        });
    } else {
        console.error('Close button not found');
    }

    if (prevBtnModal) {
        prevBtnModal.addEventListener('click', () => {
            console.log('Previous button clicked');
            prevProject();
        });
    } else {
        console.error('Previous button not found');
    }

    if (nextBtnModal) {
        nextBtnModal.addEventListener('click', () => {
            console.log('Next button clicked');
            nextProject();
        });
    } else {
        console.error('Next button not found');
    }

    // Close modal when clicking outside
    if (projectsModal) {
        projectsModal.addEventListener('click', (event) => {
            if (event.target === projectsModal) {
                console.log('Clicked outside modal');
                projectsModal.style.display = 'none';
            }
        });
    }

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

    console.log('Projects script setup complete');
});
