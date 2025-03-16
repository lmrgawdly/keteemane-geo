let scene, camera, renderer, globe, controls;
let rotationDirection = 1;
let rotationAngle = 0;

function init() {
    // Create scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    // Create camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 2;

    // Create renderer
    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('globeCanvas'), antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Create orbit controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Create globe
    const geometry = new THREE.SphereGeometry(1, 64, 64);
    const textureLoader = new THREE.TextureLoader();
    
    // Load the texture from the downloaded image
    textureLoader.load('globe-texture.png', (texture) => {
        // Adjust texture mapping to ensure full coverage
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        
        // Modify UV mapping to stretch texture correctly
        geometry.attributes.uv.needsUpdate = true;
        
        const material = new THREE.MeshStandardMaterial({ 
            map: texture,
            roughness: 0.8,
            metalness: 0.2
        });
        
        globe = new THREE.Mesh(geometry, material);
        scene.add(globe);
    }, undefined, (error) => {
        console.error('Error loading texture', error);
    });

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Animation loop
    animate();
}

function animate() {
    requestAnimationFrame(animate);

    // Rotate the globe back and forth
    if (globe) {
        // Increment rotation angle (slow rotation)
        rotationAngle += 0.005 * rotationDirection;
        
        // Change direction when reaching rotation limits
        // Limit rotation to a very narrow range centered around 0
        // Slightly more movement to the right to compensate for left-side bias
        if (rotationAngle >= 0.4 || rotationAngle <= -0.2) {
            rotationDirection *= -1;
        }
        
        // Apply rotation
        globe.rotation.y = rotationAngle;
    }

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
