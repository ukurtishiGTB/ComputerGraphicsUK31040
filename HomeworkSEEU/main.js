import * as THREE from 'three';

// Initialize scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set(0, 12, 25);
camera.lookAt(0, 0, 0);

// Setup renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);


// Lighting setup
const light = new THREE.DirectionalLight(0xffffff, 1.2);
light.position.set(12, 18, 10);
light.castShadow = true;
scene.add(light);

const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
scene.add(ambientLight);


// Create ground plane
const groundGeometry = new THREE.PlaneGeometry(40, 40);
const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x2d8b3c });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI/2;
ground.receiveShadow = true;
scene.add(ground);

// Create road
const roadGeometry = new THREE.BoxGeometry(4, 0.1, 30);
const roadMaterial = new THREE.MeshStandardMaterial({ color: 0x2a2a2a });
const road = new THREE.Mesh(roadGeometry, roadMaterial);
road.position.y = 0.05;
scene.add(road);


// Building creation function
function addBuilding(x, y, z, color = 0x5a8fc4) {
    const buildingGeometry = new THREE.BoxGeometry(4, 2, 2);
    const buildingMaterial = new THREE.MeshStandardMaterial({ color });
    const building = new THREE.Mesh(buildingGeometry, buildingMaterial);
    building.position.set(x, y, z);
    building.castShadow = true;
    scene.add(building);
}

// Add buildings to scene
addBuilding(5, 1, -5);
addBuilding(5, 1, 5);
addBuilding(-5, 1, 0, 0xeeeeee);


// Street lamp creation function
function addLamp(x, z) {
    const poleGeometry = new THREE.CylinderGeometry(0.1, 0.1, 3);
    const poleMaterial = new THREE.MeshStandardMaterial({ color: 0x2a2a2a });
    const pole = new THREE.Mesh(poleGeometry, poleMaterial);
    pole.position.set(x, 1.5, z);
    scene.add(pole);

    const lightGeometry = new THREE.SphereGeometry(0.3, 8, 8);
    const lightMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xffffcc, 
        emissive: 0xffffaa,
        emissiveIntensity: 0.8
    });
    const top = new THREE.Mesh(lightGeometry, lightMaterial);
    top.position.set(x, 3.15, z);
    scene.add(top);
}

// Place street lamps along the road
addLamp(-2, -10); 
addLamp(2, -10);
addLamp(-2, 0); 
addLamp(2, 0);
addLamp(-2, 10); 
addLamp(2, 10);


// Tree creation function
function addTree(x, z) {
    const trunkGeometry = new THREE.CylinderGeometry(0.2, 0.2, 1.5);
    const trunkMaterial = new THREE.MeshStandardMaterial({ color: 0x8b5513 });
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.set(x, 0.75, z);
    scene.add(trunk);

    const foliageGeometry = new THREE.ConeGeometry(1, 2, 8);
    const foliageMaterial = new THREE.MeshStandardMaterial({ color: 0x0a6b0a });
    const top = new THREE.Mesh(foliageGeometry, foliageMaterial);
    top.position.set(x, 2.25, z);
    scene.add(top);
}

// Place trees around the scene
addTree(-8, -8);
addTree(-7, 6);
addTree(10, -7);
addTree(11, 5);


// Animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

// Start animation
animate();
