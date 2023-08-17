// Import THREE.js and dependencies
import * as THREE from 'three';
import { OrbitControls } from 'orbitcontrols';
import { GLTFLoader } from 'gltfloader';
import { OutlineEffect } from 'outlineeffect';
import { AsciiEffect } from 'ascii';


// Rest of the code stays the same
// Global variables
let viewmode = false;
var scene, camera, renderer, controls, outlineEffect;
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var models = [];
var maxCameraAngle = 0.52; // 30 degrees in radians
var targetRotationY = 0;
var targetRotationX = 0;
var smoothingFactor = 0.05; // Adjust this value to change the smoothing effect


// Initialize the scene
function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color( '#4287f5');
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    outlineEffect = new OutlineEffect(renderer,{
        	defaultThickness: 100000,
        	defaultAlpha: 0.0,
        	defaultKeepAlive: true // keeps outline material in cache even if material is removed from scene
        } );
    outlineEffect.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(outlineEffect.domElement);
    

    // Add lights
    var light = new THREE.HemisphereLight(0xffffff, 0x444444);
    light.position.set(0, 200, 0);
    scene.add(light);

    var dirLight = new THREE.DirectionalLight(0xffffff);
    dirLight.position.set(0, 200, 100);
    scene.add(dirLight);
    var dirLight2 = new THREE.DirectionalLight(0xffffff);
    dirLight2.position.set(0, -200, 100);
    scene.add(dirLight2);

    // Load Models
    let models = []; // An array to store your models

    var loader = new GLTFLoader();
    loadModel(loader, 'models/model1.glb', new THREE.Vector3(0, 2, 0), 0);
    loadModel(loader, 'models/model2.glb', new THREE.Vector3(0, 2, 0), 1);
    loadModel(loader, 'models/model3.glb', new THREE.Vector3(0, 2, 0), 2);
    loadModel(loader, 'models/model4.glb', new THREE.Vector3(0, 2, 0), 3);

    // Event listener for mouse click
    window.addEventListener('mousemove', onMouseMove, false);
    window.addEventListener('click', onMouseClick, false);
    window.addEventListener( 'resize', onWindowResize );

    
    camera.position.x = 2.388781733064856
    camera.position.y = 0.227376770315975;
    camera.position.z = 11.50292550000304;
    camera.rotation.x = 0;
    camera.rotation.y = 0;
    camera.rotation.z = 0;

    animate();
}


function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
    outlineEffect.setSize( window.innerWidth, window.innerHeight );

}
var text = [{pos: new THREE.Vector3(-3,1.2,0), text: "Home"},{pos:new THREE.Vector3(7.5,2,0), text: "About"},{pos: new THREE.Vector3(-1.7,-6.5,0), text: "Experience"},{pos:new THREE.Vector3(12,-6.3,0),text: "Contact"},]
// Load a model with given path and position
function loadModel(loader, path, position, textIndex) {
    loader.load(path, function (gltf) {
        var model = gltf.scene;
        model.position.set(position.x, position.y, position.z);
        model.rotation.y = -90.1;
        model.rotation.x = 12.25;
        
        scene.add(model);
        var sprite = makeTextSprite(text[textIndex].text);
        sprite.position.set(text[textIndex].pos.x,text[textIndex].pos.y,text[textIndex].pos.z);
        scene.add(sprite);

        models.push({ model: model, text: sprite }); // Only add the model once, with the associated text sprite
    });
}
// Create a text sprite
function makeTextSprite(message) {
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    context.font = "20px Arial";
    context.fillText(message, 0, 20);

    var texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;

    var spriteMaterial = new THREE.SpriteMaterial({ map: texture });
    var sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(10, 5, 1);

    return sprite;
}

// Mouse click event handler
function onMouseClick(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    var intersects = raycaster.intersectObjects(models.map(m => m.model));

    if (intersects.length > 0) {
        var intersection = intersects[0];

        models.forEach(m => {
            if (m.model === intersection.object) {
                window.location.href = "/page" + m.text.text;
            }
        });
    }
}
// Mouse move event handler for hover effect
function onMouseMove(event) {


    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    // Calculate the target rotation angles based on mouse position
    targetRotationY = -mouse.x * maxCameraAngle;
    targetRotationX = mouse.y * maxCameraAngle;

    var modelObjects = models.map(m => m.model); // Extract the models from the array
    var intersects = raycaster.intersectObjects(modelObjects); // Check intersections with entire models

    var intersects = raycaster.intersectObjects(models.map(m => m.model), true);

    // Reset glow for all models and hide text
    models.forEach(m => {
        m.model.traverse(child => {
            if (child.isMesh) {
                child.material.emissive.set(0x000000);
            }
        });
        m.text.visible = false;
    });

    if (intersects.length > 0) {
        var intersection = intersects[0].object;

        // Find the top-level parent model of the intersected object
        var parentModel = intersection;
        while (parentModel.parent !== scene) {
            parentModel = parentModel.parent;
        }

        // Find the corresponding entry in the models array
        let foundModel = models.find(m => m.model === parentModel);
        if (foundModel) {
            // Traverse the parent model and set emissivity for all child meshes
            parentModel.traverse(child => {
                if (child.isMesh) {
                    child.material.emissive.set(0x666666);
                }
            });

            foundModel.text.visible = true; // Show text
        } else {
            console.warn('Parent model not found in models array. Intersection object:', intersection);
        }
    }
}
function smoothCameraRotation() {
    camera.rotation.y += (targetRotationY - camera.rotation.y) * smoothingFactor;
    camera.rotation.x += (targetRotationX - camera.rotation.x) * smoothingFactor;
}
// Animate the scene
function animate() {
    requestAnimationFrame(animate);
    smoothCameraRotation();

    outlineEffect.render(scene, camera);
}

// Start the scene
init();
