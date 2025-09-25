import * as THREE from 'three' ;


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75 , window.innerWidth / window.innerHeight, 0.1, 1000 );
const geometry1= new THREE.TorusGeometry(1.5, 1, 12);
const geometry2= new THREE.CylinderGeometry(2, 2, 4);
const geometry3= new THREE.BoxGeometry(4, 2, 4);
const material1 = new THREE.MeshStandardMaterial(
    {
    color:0xdda0dd
    }
);
const material2 = new THREE.MeshPhongMaterial(
    {
    color:0xff69b4 
    }
);
const material3 = new THREE.MeshLambertMaterial(
    {
    color:0x0000ff
    }
);
camera.position.z = 10;

const cubeMesh1 =  new THREE.Mesh(geometry1,material1);
scene.add(cubeMesh1);
const cubeMesh2 =  new THREE.Mesh(geometry2,material2);
scene.add(cubeMesh2);
const cubeMesh3 =  new THREE.Mesh(geometry3,material3);
scene.add(cubeMesh3);
cubeMesh1.position.x = -8;
cubeMesh1.position.y = 3;
cubeMesh2.position.x = 0;
cubeMesh3.position.x = 9;
cubeMesh3.position.y = -4;

const light = new THREE.DirectionalLight(0xffffff,1)
light.position.set(2, 2, 5);
scene.add(light);

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene,camera);
    cubeMesh1.rotation.x += 0.01;
    cubeMesh2.rotation.z += 0.01;
    cubeMesh3.rotation.y += 0.01;

}
animate();

document.body.appendChild( renderer.domElement ); 






