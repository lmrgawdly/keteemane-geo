let scene, camera, renderer, globe, controls;
let rotationDirection = 1;
let rotationAngle = 0;

function init() {
    // Add loading state to canvas
    const canvas = document.getElementById('globeCanvas');
    if (canvas) {
        canvas.classList.add('loading');
        
        // Add loading spinner
        const spinner = document.createElement('div');
        spinner.className = 'loading-spinner';
        spinner.id = 'globe-spinner';
        canvas.parentElement.appendChild(spinner);
        
        // Add loading text
        const loadingText = document.createElement('div');
        loadingText.className = 'loading-text';
        loadingText.textContent = 'Loading Globe...';
        loadingText.id = 'globe-loading-text';
        canvas.parentElement.appendChild(loadingText);
    }

    // Create scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    // Create camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 2.5;

    // Create renderer with performance optimizations
    renderer = new THREE.WebGLRenderer({ 
        canvas: document.getElementById('globeCanvas'), 
        antialias: true,
        powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Create orbit controls with improved settings
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.minDistance = 1.5;
    controls.maxDistance = 4;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;

    // Create globe with higher detail
    const geometry = new THREE.SphereGeometry(1, 128, 128);
    const textureLoader = new THREE.TextureLoader();
    
    // Load the texture with better settings
    textureLoader.load('globe-texture.png', (texture) => {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
        texture.minFilter = THREE.LinearMipmapLinearFilter;
        texture.magFilter = THREE.LinearFilter;
        
        geometry.attributes.uv.needsUpdate = true;
        
        const material = new THREE.MeshStandardMaterial({ 
            map: texture,
            roughness: 0.7,
            metalness: 0.3,
            envMapIntensity: 0.5
        });
        
        globe = new THREE.Mesh(geometry, material);
        globe.castShadow = true;
        globe.receiveShadow = true;
        scene.add(globe);
        
        // Remove loading state
        if (canvas) {
            canvas.classList.remove('loading');
        }
        
        // Remove loading indicators
        const spinner = document.getElementById('globe-spinner');
        const loadingText = document.getElementById('globe-loading-text');
        if (spinner) spinner.remove();
        if (loadingText) loadingText.remove();
        
        // Disable auto-rotate after user interaction
        controls.addEventListener('start', () => {
            controls.autoRotate = false;
        });
    }, undefined, (error) => {
        console.error('Error loading texture', error);
        
        // Remove loading state and show error
        if (canvas) {
            canvas.classList.remove('loading');
        }
        
        // Remove loading indicators
        const spinner = document.getElementById('globe-spinner');
        const loadingText = document.getElementById('globe-loading-text');
        if (spinner) spinner.remove();
        if (loadingText) loadingText.remove();
        
        // Show error message
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.innerHTML = `
            <p>Failed to load globe texture</p>
            <button class="retry-button" onclick="location.reload()">Retry</button>
        `;
        canvas.parentElement.appendChild(errorMessage);
    });

    // Enhanced lighting setup
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 3, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0x00ffff, 0.3, 10);
    pointLight.position.set(-3, 2, 2);
    scene.add(pointLight);

    // Add subtle atmospheric glow
    const glowGeometry = new THREE.SphereGeometry(1.05, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ffff,
        transparent: true,
        opacity: 0.1,
        side: THREE.BackSide
    });
    const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(glowMesh);

    // Animation loop
    animate();
}

function animate() {
    requestAnimationFrame(animate);

    // Update controls
    controls.update();
    renderer.render(scene, camera);
}

// Handle window resizing
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Add event listeners
window.addEventListener('load', init);
window.addEventListener('resize', onWindowResize);
