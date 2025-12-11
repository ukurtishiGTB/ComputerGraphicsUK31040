import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'lil-gui';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(10, 10, 5);
directionalLight.castShadow = true;
scene.add(directionalLight);

const sphereParams = {
    color: 0x00ff00,
    shininess: 30,
    widthSegments: 16,
    heightSegments: 16,
    size: 1
};

let sphereGeometry = new THREE.SphereGeometry(
    sphereParams.size,
    sphereParams.widthSegments,
    sphereParams.heightSegments
);
let sphereMaterial = new THREE.MeshPhongMaterial({
    color: sphereParams.color,
    shininess: sphereParams.shininess
});
let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.castShadow = true;
sphere.receiveShadow = true;
scene.add(sphere);

const floorGeometry = new THREE.PlaneGeometry(10, 10);
const floorMaterial = new THREE.MeshLambertMaterial({ color: 0x808080 });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -2;
floor.receiveShadow = true;
scene.add(floor);

const gui = new GUI();

gui.addColor(sphereParams, 'color').name('Color').onChange((value) => {
    sphere.material.color.setHex(value);
});
//5 maksimumi 
gui.add(sphere.scale,'x',0,5,0.1).name("Scale for X");
gui.add(sphere.scale,'y',0,5,0.1).name("Scale for Y");

gui.add(sphereParams, 'shininess', 0, 100).name('Shininess').onChange((value) => {
    sphere.material.shininess = value;
});

gui.add(sphereParams, 'widthSegments', 3, 32, 1).name('Width Segments').onChange((value) => {
    updateSphereGeometry();
});

gui.add(sphereParams, 'heightSegments', 2, 32, 1).name('Height Segments').onChange((value) => {
    updateSphereGeometry();
});

gui.add(sphereParams, 'size', 0.1, 3, 0.1).name('Size').onChange((value) => {
    updateSphereGeometry();
});

function updateSphereGeometry() {
    sphere.geometry.dispose();
    sphere.geometry = new THREE.SphereGeometry(
        sphereParams.size,
        sphereParams.widthSegments,
        sphereParams.heightSegments
    );
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);

function animate() {
    requestAnimationFrame(animate);
    
    sphere.rotation.y += 0.01;
    
    controls.update();
    renderer.render(scene, camera);
}

animate();