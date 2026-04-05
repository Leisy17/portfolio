import { SceneManager } from './js/sceneManager.js';
import { loadModel } from './js/modelLoader.js';
import { mouse, initInteractions } from './js/interaction.js';
import { Timer } from 'three/addons/misc/Timer.js';
import * as THREE from 'three';

const officeScene = new SceneManager();

const characterContainer = document.getElementById('canvas-proyectos');
const characterScene = new SceneManager(characterContainer);

characterScene.scene.background = null; 
characterScene.camera.position.set(1, 1, 5);

const ambient = new THREE.AmbientLight(0xffffff, 2); 
characterScene.scene.add(ambient);

let character = null;
let mixer = null;
const clock = new Timer();

initInteractions();

loadModel('./models/scene.gltf', officeScene.scene, (model, size) => {
    officeScene.camera.position.set(0, -0.5, -size.z / 2 + 1);
});

loadModel('./models/about.glb', characterScene.scene, (gltf) => {
    character = gltf.scene; 
    character.scale.set(2, 2, 2);

    const box = new THREE.Box3().setFromObject(character);
    const center = new THREE.Vector3();
    box.getCenter(center);

    character.position.x = -2.5;
    character.position.y = -0.2; 
    character.position.z = -1;

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
        character.rotation.y = mouse.x;
    }

    characterScene.renderer.render(characterScene.scene, characterScene.camera);
}

loop();

window.addEventListener('scroll', () => {
    const scrollArrow = document.querySelector('.scroll-down');
    if (!scrollArrow) return;

    if (window.scrollY > 100) {
        scrollArrow.classList.add('hidden');
    } else {
        scrollArrow.classList.remove('hidden');
    }
});

// Automatic Carousel

const carousel = document.querySelector('.logos-wrapper');
const items = document.querySelectorAll('.logos-slide');

items.forEach(item => {
    const clone = item.cloneNode(true);
    carousel.appendChild(clone);
});

let x = 0;
function animate() {
    x -= 1.5;
    const itemWidth = items[0].offsetWidth;
    if (Math.abs(x) >= itemWidth) {
        x = 0;
    }
    
    carousel.style.transform = `translateX(${x}px)`;
    requestAnimationFrame(animate);
}

window.addEventListener('load', animate);

// Manual Carousel

let slideIndex = [1, 1, 1, 1, 1];

function showSlides(n, no) {
    let carousels = document.getElementsByClassName("carousel");
    if (!carousels[no]) return;

    let slides = carousels[no].getElementsByClassName("carousel-item");
    
    if (n > slides.length) { slideIndex[no] = 1 }    
    if (n < 1) { slideIndex[no] = slides.length }

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }

    slides[slideIndex[no] - 1].style.display = "block";  
}

window.plusSlides = function(n, no) {
    showSlides(slideIndex[no] += n, no);
};

window.addEventListener('load', () => {
    const carousels = document.getElementsByClassName("carousel");
    for (let i = 0; i < carousels.length; i++) {
        showSlides(1, i);
    }
});

window.copyToClipboard = function(text) {
  navigator.clipboard.writeText(text)
    .then(() => alert('Copied to clipboard'));
};