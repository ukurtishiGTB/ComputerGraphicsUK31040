import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(     
    75, 
    window.innerWidth / window.innerHeight, 
    0.1, 
    1000 
);
camera.position.set(0, 5, 10);

let mixer;
let model;
const clock = new THREE.Clock();

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(2, 10, 5);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
scene.add(ambientLight);

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0xffffff);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const loader = new FBXLoader();
loader.load('Jumping Down.fbx', (fbx) => {
    model = fbx;
    model.scale.setScalar(0.02);
    model.position.set(0, 2, 0);
    scene.add(model);
    
    mixer = new THREE.AnimationMixer(model);
    
    if (model.animations && model.animations.length > 0) {
        const action = mixer.clipAction(model.animations[0]);
        action.play();
    }

});

function animate() {
    requestAnimationFrame(animate);
    
    const delta = clock.getDelta();
    if (mixer) {
        mixer.update(delta);
    }
    
    renderer.render(scene, camera);
}

animate();

document.body.appendChild(renderer.domElement);
