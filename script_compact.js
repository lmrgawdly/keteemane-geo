// Project data with full captions
const projectData = {
  '2025-01': {
    title: 'Interactive GPS Route Animation',
    image: 'images/2025-01.jpg',
    thumbnail: 'images/2025-01-tn.png',
    caption: 'This interactive GPS route animation system provides real-time visualization of tracking data with smooth animations and user controls. The system processes GPS coordinates and renders them as an animated route on a digital map interface. Users can control playback speed, view specific time segments, and interact with waypoints to get detailed information about each location. The animation uses advanced interpolation techniques to create smooth transitions between GPS points, making it ideal for tracking vehicles, monitoring movement patterns, and analyzing spatial data over time.'
  },
  '2025-02': {
    title: 'Field Instrumentation Setup',
    image: 'images/2025-02.jpg',
    thumbnail: 'images/2025-02-tn.png',
    caption: 'Complete field station configuration showcasing professional-grade GPS receivers, environmental sensors, and data collection equipment. This setup includes high-precision positioning devices, weather monitoring instruments, and automated data logging systems. The station is designed for continuous operation in remote field conditions, with solar power systems and satellite communication capabilities. All instruments are carefully calibrated and synchronized to ensure accurate data collection for environmental monitoring and geospatial analysis projects.'
  },
  '2025-03': {
    title: 'Dynamic Map Interface',
    image: 'images/2025-03.png',
    thumbnail: 'images/2025-03-tn.png',
    caption: 'Sophisticated web mapping application featuring real-time data updates and custom layer management. This interface allows users to visualize complex spatial datasets with interactive controls for zooming, panning, and layer toggling. The system supports multiple data formats including vector tiles, raster imagery, and real-time sensor feeds. Users can create custom views, save map configurations, and export high-quality visualizations for reports and presentations. The interface is optimized for both desktop and mobile devices.'
  },
  '2024-01': {
    title: 'Geospatial Data Dashboard',
    image: 'images/2024-01.png',
    thumbnail: 'images/2024-01-tn.png',
    caption: 'Comprehensive dashboard for visualizing and analyzing spatial data with interactive charts and real-time updates. This system integrates multiple data sources to provide a unified view of geospatial information through maps, graphs, and statistical displays. Users can filter data by time, location, and various attributes to identify patterns and trends. The dashboard supports custom report generation and automated alerts for significant changes in the data.'
  },
  '2024-02': {
    title: 'Urban Coverage Analysis',
    image: 'images/2024-02.jpg',
    thumbnail: 'images/2024-02-tn.png',
    caption: 'Advanced spatial analysis of urban infrastructure coverage and service area mapping. This project utilized GIS tools to analyze network coverage patterns, identify service gaps, and optimize resource allocation. The analysis incorporates demographic data, terrain features, and existing infrastructure to create comprehensive coverage models. Results help urban planners make informed decisions about infrastructure development and service expansion.'
  },
  '2024-03': {
    title: 'Land Use Visualization',
    image: 'images/2024-03.jpg',
    thumbnail: 'images/2024-03-tn.png',
    caption: 'Interactive visualization of land use patterns and spatial distribution analysis using satellite imagery and classification algorithms. This project combines remote sensing data with machine learning techniques to identify and categorize different land use types. The visualization allows users to explore changes over time, compare different areas, and understand the relationships between land use and environmental factors.'
  },
  '2023-01': {
    title: 'Pipeline Surveying',
    image: 'images/2023-01.jpg',
    thumbnail: 'images/2023-01-tn.png',
    caption: 'Comprehensive pipeline route surveying with high-precision GPS mapping and detailed documentation. This project involved surveying existing pipeline infrastructure, documenting right-of-way boundaries, and creating accurate digital maps. The survey data was used for maintenance planning, regulatory compliance, and infrastructure management. Advanced surveying techniques ensured centimeter-level accuracy for critical infrastructure mapping.'
  },
  '2023-02': {
    title: 'Site Inspections',
    image: 'images/2023-02.jpg',
    thumbnail: 'images/2023-02-tn.png',
    caption: 'Detailed site inspections with comprehensive photographic documentation and assessment reports. This project involved systematic evaluation of multiple sites, documenting conditions, identifying issues, and recommending solutions. Each inspection included high-resolution photography, measurements, and detailed notes about site conditions. The documentation serves as a baseline for future monitoring and maintenance planning.'
  },
  '2023-03': {
    title: 'Soil Moisture Sampling',
    image: 'images/2023-03.jpg',
    thumbnail: 'images/2023-03-tn.png',
    caption: 'Environmental data collection focused on soil moisture analysis and mapping for agricultural and environmental monitoring. This project involved systematic sampling across multiple locations, using standardized protocols to ensure data consistency. The collected data was analyzed to create moisture distribution maps and identify patterns related to soil types, topography, and vegetation cover. Results inform irrigation planning and environmental management decisions.'
  },
  '2022-01': {
    title: 'Topographic Survey',
    image: 'images/2022-01.jpg',
    thumbnail: 'images/2022-01-tn.png',
    caption: 'Detailed topographic mapping with elevation data and contour generation for engineering and planning purposes. This survey utilized modern GPS and total station equipment to create highly accurate elevation models. The resulting topographic maps include contour lines, spot elevations, and terrain features essential for site planning, drainage design, and construction projects. The data was processed using specialized software to ensure optimal accuracy and usability.'
  },
  '2022-02': {
    title: 'Soil Analysis',
    image: 'images/2022-02.jpg',
    thumbnail: 'images/2022-02-tn.png',
    caption: 'Comprehensive soil sampling and analysis program for environmental assessment and agricultural planning. This project involved collecting soil samples from various depths and locations, analyzing physical and chemical properties, and creating detailed soil maps. The analysis included nutrient content, pH levels, organic matter, and texture classification. Results provide valuable information for land use planning and environmental management.'
  }
};

// Open modal function
function openModal(projectId) {
  const project = projectData[projectId];
  if (!project) return;
  
  const modal = document.getElementById('imageModal');
  const modalImage = document.getElementById('modalImage');
  const modalTitle = document.getElementById('modalTitle');
  const modalDescription = document.getElementById('modalDescription');
  
  // Set modal content
  modalImage.src = project.image;
  modalImage.alt = project.title;
  modalTitle.textContent = project.title;
  modalDescription.textContent = project.caption;
  
  // Show modal
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  
  // Add keyboard event listener
  document.addEventListener('keydown', handleModalKeydown);
}

// Close modal function
function closeModal() {
  const modal = document.getElementById('imageModal');
  modal.classList.remove('active');
  document.body.style.overflow = '';
  
  // Remove keyboard event listener
  document.removeEventListener('keydown', handleModalKeydown);
}

// Handle keyboard events in modal
function handleModalKeydown(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
}

// Close modal when clicking outside the content
document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('imageModal');
  
  modal.addEventListener('click', function(event) {
    if (event.target === modal) {
      closeModal();
    }
  });
  
  // Add click handlers to all cards with thumbnails
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    const img = card.querySelector('img');
    if (img && img.src.includes('-tn.png')) {
      card.style.cursor = 'pointer';
      card.addEventListener('click', function(e) {
        if (!e.target.closest('.link-icon')) {
          const projectId = img.src.split('/').pop().replace('-tn.png', '');
          openModal(projectId);
        }
      });
    }
  });
});

// Add hover effect for clickable cards
document.addEventListener('DOMContentLoaded', function() {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    const img = card.querySelector('img');
    if (img && img.src.includes('-tn.png')) {
      card.addEventListener('mouseenter', function() {
        card.style.transform = 'translateY(-3px) scale(1.02)';
      });
      
      card.addEventListener('mouseleave', function() {
        card.style.transform = '';
      });
    }
  });
});
