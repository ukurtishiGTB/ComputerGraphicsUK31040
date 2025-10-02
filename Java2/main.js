import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(     
    75, 
    window.innerWidth / window.innerHeight, 
    0.1, 
    1000 
);
camera.position.z = 10;

const geometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshStandardMaterial(
    {
        color:0xff0000
    }
);

const cubeMesh = new THREE.Mesh(geometry, material);
scene.add(cubeMesh);

const sphereGeometry = new THREE.SphereGeometry(1, 16, 16);
const sphereMaterial = new THREE.MeshStandardMaterial({
    color: 0xffff00,
    wireframe: true
});

const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphereMesh);

const coneGeometry = new THREE.ConeGeometry(1, 5, 10);
const coneMaterial = new THREE.MeshStandardMaterial({
    color: 0xffff00
});

const coneMesh = new THREE.Mesh(coneGeometry, coneMaterial);
scene.add(coneMesh);

const torusGeometry = new THREE.TorusGeometry(1.5, 0.4, 16);
const torusMaterial = new THREE.MeshStandardMaterial({
    color: 0x0000ff
});

const torusMesh = new THREE.Mesh(torusGeometry, torusMaterial);
scene.add(torusMesh);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(2, 2, 3);
scene.add(light);

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );

cubeMesh.translateX(-3);

sphereMesh.position.set(3, 2 , 4 );

torusMesh.position.set(6, -2, 0);

function animate()
{
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    //cubeMesh.rotation.x += 0.01;
    cubeMesh.rotation.y += 0.01;
    sphereMesh.rotation.z +=0.01;
    torusMesh.rotation.y +=0.01;
    coneMesh.rotation.x +=0.01
    
}

animate();

document.body.appendChild( renderer.domElement );