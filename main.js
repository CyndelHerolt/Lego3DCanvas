import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

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

// Créer les tétrominos 3D
let offsetX = 0;  // offset pour séparer les tétrominos
for (let key in tetrominos) {
    const material = new THREE.MeshBasicMaterial({color: colors[key]});
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    let tetromino = new THREE.Group();

    for (let i = 0; i < tetrominos[key].length; i++) {
        const cube = new THREE.Mesh(geometry, material);
        cube.position.copy(tetrominos[key][i]);
        tetromino.add(cube);
    }

    tetromino.position.x = offsetX;  // déplacer chaque tétromino le long de l'axe x
    offsetX += 5;  // augmenter l'offset

    scene.add(tetromino);
}

camera.position.z = 25;
camera.position.x = 15;

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();