import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);

// Lumière ambiante
const ambientLight = new THREE.AmbientLight(0x404040, 10); // soft white light
scene.add(ambientLight);

// Add directional light to simulate the sun
const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
directionalLight.position.set(-50, 100, 50);  // The light source is behind and above the model
scene.add(directionalLight);

// Changer la couleur de fond
scene.background = new THREE.Color(0x14111F);


const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// OrbitControls pour contrôler la caméra
const controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 5;
controls.maxDistance = 20;

// Charger le modèle GLTF
const loader = new GLTFLoader();
loader.load(
    'lego.glb',
    (gltf) => {
        // Diminuer l'échelle du modèle de 50%
        gltf.scene.scale.set(0.15, 0.15, 0.15);

        // Calculate the bounding box of the gltf model
        const box = new THREE.Box3().setFromObject(gltf.scene);

        // Calculate the center point of the bounding box
        const center = box.getCenter(new THREE.Vector3());

        // Move the model to the center of the scene
        gltf.scene.position.x += (gltf.scene.position.x - center.x);
        gltf.scene.position.y += (gltf.scene.position.y - center.y);
        gltf.scene.position.z += (gltf.scene.position.z - center.z);

        scene.add(gltf.scene);
        camera.position.z = 120;
        camera.position.y = 10;
        camera.position.x = -90;
    }
);

// Boucle de rendu
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update();
}
animate();