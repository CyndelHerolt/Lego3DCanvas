import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Ajouter les OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 10;
controls.maxDistance = 20;

// Définir une liste de couleurs pour chaque tétromino
const colors = {
    'I': 0x00ffff, // cyan
    'O': 0xffff00, // jaune
    'T': 0x800080, // violet
    'S': 0xff0000, // rouge
    'Z': 0x00ff00, // vert
    'J': 0xff00ff, // magenta
    'L': 0xffa500 //orange
};

// Définir les formes de tétrominos
const tetrominos = {};

tetrominos['I'] = [
    new THREE.Vector3(-1, 0, 0),
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(1, 0, 0),
    new THREE.Vector3(2, 0, 0)
];

tetrominos['O'] = [
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(1, 0, 0),
    new THREE.Vector3(0, 1, 0),
    new THREE.Vector3(1, 1, 0)
];

tetrominos['T'] = [
    new THREE.Vector3(-1, 0, 0),
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(1, 0, 0),
    new THREE.Vector3(0, 1, 0)
];

tetrominos['S'] = [
    new THREE.Vector3(1, 0, 0),
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, 1, 0),
    new THREE.Vector3(-1, 1, 0)
];

tetrominos['Z'] = [
    new THREE.Vector3(-1, 0, 0),
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, 1, 0),
    new THREE.Vector3(1, 1, 0)
];

tetrominos['J'] = [
    new THREE.Vector3(-1, 0, 0),
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(1, 0, 0),
    new THREE.Vector3(-1, 1, 0)
];

tetrominos['L'] = [
    new THREE.Vector3(-1, 0, 0),
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(1, 0, 0),
    new THREE.Vector3(1, 1, 0)
];

let offset = 0; // Outil de déplacement
let position = new THREE.Vector3(0, 0, 1); // Position de départ

for(let key in tetrominos) {
    let amount = key === 'T' ? 4 : 2;

    for(let a = 0; a < amount; a++) {
        const material = new THREE.MeshBasicMaterial({ color: colors[key] });
        const group = new THREE.Group();

        for(let j = 0; j < tetrominos[key].length; j++) {
            const geometry = new THREE.BoxGeometry(1, 1, 1);
            let cube = new THREE.Mesh(geometry, material);
            cube.position.copy(tetrominos[key][j]);
            group.add(cube);
        }

        group.position.copy(position);

        scene.add(group);

        position.x += 2; // Largeur d'un tétromino (blocs de 1) + écart

        // Lorsque nous avons positionné 4 tétrominos sur l'axe X, nous nous déplaçons à l'axe Y
        if(position.x >= 8) {
            position.x = 0;
            position.y += 2; // Hauteur d'un tétromino (blocs de 1) + espace
        }

        // Quand nous avons positionné 4 tétrominos sur l'axe Y, nous nous déplaçons à l'axe Z
        if(position.y >= 8) {
            position.y = 0;
            position.x = 0;
            position.z += 2; // Profondeur d'un tétromino (blocs de 1) + espace
        }
    }
}

camera.position.z = 100;
camera.position.x = 0;
camera.position.y = 0;

function animate() {
    requestAnimationFrame(animate);
    controls.update(); // Ajout de la mise à jour des OrbitControls
    renderer.render(scene, camera);
}
animate();