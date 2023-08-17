// Import THREE.js and dependencies
import * as THREE from 'three';
import { OrbitControls } from 'orbitcontrols';
import { GLTFLoader } from 'gltfloader';


// Global variables
var scene, camera, renderer;
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var models = [];
var maxCameraAngle = 0.26; // 30 degrees in radians
var targetRotationY = 0;
var targetRotationX = 0;
var smoothingFactor = 0.05; // Adjust this value to change the smoothing effect

var text = [
             {pos: new THREE.Vector3(-5,2.2,0), text: "HOME", rot:336, b:true}
            ,{pos:new THREE.Vector3(2.5,3.3,0), text: "ABOUT", rot:56, b:true}
            ,{pos: new THREE.Vector3(-2.3,-5.1,0), text: "EXPERIENCE", rot:9, b:true}
            ,{pos:new THREE.Vector3(7.3,-4.1,0),text: "CONTACT", rot:345, b:true}
            ]

// Initialize the scene
function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color( '#4287f5');
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    

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
    window.addEventListener('mousemove', handleMove, false);
    window.addEventListener('touchmove', handleMove, false);
    window.addEventListener('click', handleClick, false);
    window.addEventListener('touchstart', handleClick, false);
    document.addEventListener('touchend', resetCameraRotation, false);
    window.addEventListener( 'resize', onWindowResize );

    // Check if the browser supports the DeviceOrientationEvent
    if (window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', function(event) {
            // Get the alpha (compass direction), beta (tilt front-to-back), and gamma (tilt left-to-right) values
            var alpha = event.alpha;
            var beta = event.beta;
            var gamma = event.gamma;

            var xRotation = THREE.MathUtils.degToRad(beta); // Tilt front-to-back
            var yRotation = THREE.MathUtils.degToRad(gamma); // Tilt left-to-right

            camera.rotation.set(xRotation, yRotation, 0);
        });
    } else {
        console.warn('DeviceOrientationEvent is not supported on this device');
    }
    
    camera.position.x = 1.388781733064856
    camera.position.y = 0;
    camera.position.z = 11.50292550000304;
    camera.rotation.x = 0;
    camera.rotation.y = 0;
    camera.rotation.z = 0;
    var controls = new OrbitControls(camera, renderer.domElement);
    animate();
    fitToScreen();
}
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function fitToScreen() {

    camera.fov = isMobile() ? 120 : 75;
    camera.updateProjectionMatrix();


}


function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}
// Load a model with given path and position
function loadModel(loader, path, position, textIndex) {
    loader.load(path, function (gltf) {
        var model = gltf.scene;
        model.position.set(position.x, position.y, position.z);
        model.rotation.y = THREE.MathUtils.degToRad(-122);
        model.rotation.x = THREE.MathUtils.degToRad(-20);
        
        scene.add(model);
        var sprite = makeTextSprite(text[textIndex].text,text[textIndex].rot, text[textIndex].b);
        sprite.position.set(text[textIndex].pos.x ,text[textIndex].pos.y,text[textIndex].pos.z);
        sprite.visible = false;
        scene.add(sprite);

        models.push({ model: model, text: sprite }); // Only add the model once, with the associated text sprite
    });
}

function makeTextSprite(message, rotationAngle, black) {
    var tempCanvas = document.createElement('canvas');
    var tempContext = tempCanvas.getContext('2d');
    var fontSize = 200;
    tempContext.font = fontSize + "px Arial";

    var textWidth = tempContext.measureText(message).width;
    var textHeight = fontSize + 20; // Extra 20 pixels for padding

    // Calculate the size of the bounding box after rotation
    var cosAngle = Math.cos(rotationAngle);
    var sinAngle = Math.sin(rotationAngle);
    var rotatedWidth = Math.abs(cosAngle * textWidth) + Math.abs(sinAngle * textHeight)+100;
    var rotatedHeight = Math.abs(sinAngle * textWidth) + Math.abs(cosAngle * textHeight)+100;

    // Create the actual canvas with the calculated size
    var canvas = document.createElement('canvas');
    canvas.width = rotatedWidth;
    canvas.height = rotatedHeight;
    var context = canvas.getContext('2d');
    context.font = fontSize + "px Verdana";
    if(black){
        context.fillStyle = "rgba(0, 0, 0, 1)";
    }else{
        context.fillStyle = "rgba(255, 255, 255, 1)";
    }
    context.textBaseline = 'top'; // Set baseline to top

    // Translate to the center of the canvas
    context.translate(rotatedWidth / 2, rotatedHeight / 2);

    // Rotate the canvas
    context.rotate(THREE.MathUtils.degToRad(rotationAngle));

    // Translate back to the original position
    context.translate(-textWidth / 2, -fontSize / 2); // Y-coordinate adjusted to center the text vertically

    context.fillText(message, 0, 0); // Y-coordinate is 0 now

    var texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;

    var spriteMaterial = new THREE.SpriteMaterial({ map: texture });
    var sprite = new THREE.Sprite(spriteMaterial);

    var scale = 0.004; // Adjust the scale as needed
    sprite.scale.set(rotatedWidth * scale, rotatedHeight * scale, 1);

    return sprite;
}




// Mouse click event handler
function handleClick(event) {
    if (event.touches) {
        // For touch events, use the first touch
        event.clientX = event.touches[0].clientX;
        event.clientY = event.touches[0].clientY;
    }
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    var intersects = raycaster.intersectObjects(models.map(m => m.model));

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

            window.location.href = "/page" + foundModel.text;
        } else {
            console.warn('Parent model not found in models array. Intersection object:', intersection);
        }

    }
}
// Mouse move event handler for hover effect
function handleMove(event) {

    if (event.touches) {
        // For touch events, use the first touch
        event.clientX = event.touches[0].clientX;
        event.clientY = event.touches[0].clientY;
    }


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
function resetCameraRotation() {
    targetRotationX = defaultRotationX;
    targetRotationY = defaultRotationY;
}
// Animate the scene
function animate() {
    requestAnimationFrame(animate);
    smoothCameraRotation();

    renderer.render(scene, camera);
}

// Start the scene
init();
