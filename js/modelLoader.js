import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.160/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'https://cdn.jsdelivr.net/npm/three@0.160/examples/jsm/loaders/DRACOLoader.js';
import * as THREE from 'three';

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');

const loader = new GLTFLoader();
loader.setDRACOLoader(dracoLoader);

export function loadModel(path, scene, callback) {
    loader.load(path, (gltf) => {
        const model = gltf.scene;
        scene.add(model);

        // Centrar (Esto está perfecto)
        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);

        // 🔥 EL CAMBIO: Pasamos el objeto 'gltf' entero para tener las animaciones
        if (callback) callback(gltf, size);
    });
}