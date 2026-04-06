import { SceneManager } from './js/sceneManager.js';
import { loadModel } from './js/modelLoader.js';
import { mouse, initInteractions } from './js/interaction.js';
import { Timer } from 'three/addons/misc/Timer.js';
import * as THREE from 'three';

// --- ESCENA DE FONDO (OFFICE) ---
const officeScene = new SceneManager();
officeScene.renderer.domElement.id = "office-canvas";
officeScene.renderer.domElement.style.position = "fixed";
officeScene.renderer.domElement.style.top = "0";
officeScene.renderer.domElement.style.left = "0";
officeScene.renderer.domElement.style.width = "100vw";
officeScene.renderer.domElement.style.height = "100vh";
officeScene.renderer.domElement.style.display = "block";
document.body.appendChild(officeScene.renderer.domElement);

const characterContainer = document.getElementById('canvas-proyectos');
const characterScene = new SceneManager();

const rect = characterContainer.getBoundingClientRect();
characterScene.renderer.setSize(rect.width, rect.height);
characterScene.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

characterScene.renderer.domElement.style.position = "relative";
characterScene.renderer.domElement.style.display = "block";
characterContainer.appendChild(characterScene.renderer.domElement);

characterScene.camera.fov = 20;
characterScene.camera.aspect = rect.width / rect.height;
characterScene.camera.updateProjectionMatrix();
characterScene.scene.background = null; 
characterScene.camera.position.set(0, 1, 5);

const ambient = new THREE.AmbientLight(0xffffff, 2); 
characterScene.scene.add(ambient);

let character = null;
let mixer = null;
const clock = new Timer();

initInteractions();

// Carga de modelos
loadModel('./models/scene.gltf', officeScene.scene, (model, size) => {
    officeScene.camera.position.set(0, -0.5, -size.z / 2 + 1);
});

loadModel('./models/about.glb', characterScene.scene, (gltf) => {
    character = gltf.scene; 
    character.scale.set(1.8, 1.8, 1.8);
    character.position.y = -2.2; 
    character.position.x = 0;
    character.position.z = 0;

    characterScene.camera.lookAt(0, 0.5, 0);

    if (gltf.animations && gltf.animations.length > 0) {
        mixer = new THREE.AnimationMixer(character);
        mixer.clipAction(gltf.animations[0]).play();
    }
});

function loop(timestamp) {
    requestAnimationFrame(loop);
    clock.update(timestamp);
    
    const delta = clock.getDelta();

    const targetX = (mouse.x * 5) + 1.0;
    const targetY = (mouse.y * 2) - 1.0;
    officeScene.update(targetX, targetY);

    if (mixer) mixer.update(delta);
    
    if (character) {
        character.rotation.y = THREE.MathUtils.lerp(character.rotation.y, mouse.x * 0.5, 0.1);
    }

    characterScene.renderer.render(characterScene.scene, characterScene.camera);
}

loop();


window.addEventListener('resize', () => {
    officeScene.camera.aspect = window.innerWidth / window.innerHeight;
    officeScene.camera.updateProjectionMatrix();
    officeScene.renderer.setSize(window.innerWidth, window.innerHeight);

    const width = characterContainer.clientWidth;
    const height = characterContainer.clientHeight;
    
    characterScene.camera.aspect = width / height;
    characterScene.camera.updateProjectionMatrix();
    characterScene.renderer.setSize(width, height);
});

window.addEventListener('scroll', () => {
    const scrollArrow = document.querySelector('.scroll-down');
    if (!scrollArrow) return;
    window.scrollY > 100 ? scrollArrow.classList.add('hidden') : scrollArrow.classList.remove('hidden');
});

// Carousel Automático
const carousel = document.querySelector('.logos-wrapper');
const items = document.querySelectorAll('.logos-slide');
items.forEach(item => carousel.appendChild(item.cloneNode(true)));

let x = 0;
function animateLogos() {
    x -= 1.5;
    const itemWidth = items[0].offsetWidth;
    if (Math.abs(x) >= itemWidth) x = 0;
    carousel.style.transform = `translateX(${x}px)`;
    requestAnimationFrame(animateLogos);
}
window.addEventListener('load', animateLogos);

// Carousel Manual
let slideIndex = [1, 1, 1, 1, 1];
function showSlides(n, no) {
    let carousels = document.getElementsByClassName("carousel");
    if (!carousels[no]) return;
    let slides = carousels[no].getElementsByClassName("carousel-item");
    if (n > slides.length) slideIndex[no] = 1;
    if (n < 1) slideIndex[no] = slides.length;
    for (let i = 0; i < slides.length; i++) slides[i].style.display = "none";  
    slides[slideIndex[no] - 1].style.display = "block";  
}

window.plusSlides = function(n, no) {
    showSlides(slideIndex[no] += n, no);
};

window.addEventListener('load', () => {
    const carousels = document.getElementsByClassName("carousel");
    for (let i = 0; i < carousels.length; i++) showSlides(1, i);
});

window.copyToClipboard = function(text) {
  navigator.clipboard.writeText(text).then(() => alert('Copied to clipboard'));
};