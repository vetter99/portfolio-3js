import * as THREE from 'three'
import * as dat from 'lil-gui'
import gsap from 'gsap'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import TWEEN from 'tween.js'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'

var projectOpen = false;

const gltfLoader = new GLTFLoader()


/**
 * Debug
 */
const gui = new dat.GUI()

const parameters = {
    materialColor: '#ffeded'
}

gui
    .addColor(parameters, 'materialColor')
    .onChange(() =>
    {
        material.color.set(parameters.materialColor)
        particlesMaterial.color.set(parameters.materialColor)
    })

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

var javascriptObject;

// object group
const objectGroup = new THREE.Group()
objectGroup.position.set(2, -0.5, 0);
objectGroup.rotation.set(0,4.25, 0); // Set the desired rotation angles  
objectGroup.scale.set(0.4,0.4,0.4)
scene.add(objectGroup)


// load javascript object
gltfLoader.load(
    '/objects/java.glb',
    (gltf) => {

        javascriptObject = gltf.scene;
        // javascriptObject.scale.set(7,7,7);
        javascriptObject.position.set(0, 0, -2.5);
        // javascriptObject.rotation.set(0, 3.5, 0); // Set the desired rotation angles

        objectGroup.add(javascriptObject)

        // gui.add(javascriptObject.position, 'x').min(- 10).max(10).step(0.001).name('positionX');
        // gui.add(javascriptObject.rotation, 'y').min(- Math.PI).max(Math.PI).step(0.001).name('rotation');

        // scene.add(javascriptObject);
        // var axesHelper = new THREE.AxesHelper( 100 );
        // scene.add( axesHelper );
})

var blenderObject;

gltfLoader.load(
    '/objects/blender.glb',
    (gltf) => {

        blenderObject = gltf.scene;
        // blenderObject.scale.set(.75,.75,.75);
        // javascriptObject.position.set(3, -1, 0);
        // blenderObject.rotation.set(0, 3.5, 0); // Set the desired rotation angles
        blenderObject.position.set(0, 0, 2.5);
        objectGroup.add(blenderObject)

        // gui.add(javascriptObject.position, 'x').min(- 10).max(10).step(0.001).name('positionX');
        // gui.add(javascriptObject.rotation, 'y').min(- Math.PI).max(Math.PI).step(0.001).name('rotation');

        // scene.add(javascriptObject);
        // var axesHelper = new THREE.AxesHelper( 100 );
        // scene.add( axesHelper );
})

var nativescriptObject;
gltfLoader.load(
    '/objects/nativescript.glb',
    (gltf) => {

        nativescriptObject = gltf.scene;
        // blenderObject.scale.set(.75,.75,.75);
        // javascriptObject.position.set(3, -1, 0);
        // blenderObject.rotation.set(0, 3.5, 0); // Set the desired rotation angles
        objectGroup.add(nativescriptObject)

        // gui.add(javascriptObject.position, 'x').min(- 10).max(10).step(0.001).name('positionX');
        // gui.add(javascriptObject.rotation, 'y').min(- Math.PI).max(Math.PI).step(0.001).name('rotation');

        // scene.add(javascriptObject);
        // var axesHelper = new THREE.AxesHelper( 100 );
        // scene.add( axesHelper );
})




/**
 * Objects
 */
// Texture
const textureLoader = new THREE.TextureLoader()
const gradientTexture = textureLoader.load('textures/gradients/3.jpg')
gradientTexture.magFilter = THREE.NearestFilter

// Material
const material = new THREE.MeshToonMaterial({
    color: parameters.materialColor,
    gradientMap: gradientTexture
})

// Objects
const objectsDistance = 7
const mesh1 = new THREE.Mesh(
    new THREE.TorusGeometry(0.5, 0.2, 16, 60),
    material
)
const mesh2 = new THREE.Mesh(
    new THREE.ConeGeometry(0.5, 1, 32),
    material
)
const mesh3 = new THREE.Mesh(
    new THREE.TorusKnotGeometry(0.4, 0.15, 100, 16),
    material
)

// mesh1.position.x = 0
// mesh2.position.x = 0
// mesh3.position.x = 0

mesh1.position.y = - objectsDistance * 0
mesh2.position.y = - objectsDistance * 1
mesh3.position.y = - objectsDistance * 2

scene.add(mesh1, mesh2, mesh3)

const sectionMeshes = [ mesh1, mesh2, mesh3 ]

/**
 * Lights
 */

// Ambient light
const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.5)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001).name('ambientIntensity');
scene.add(ambientLight)

// // Directional light
const moonLight = new THREE.DirectionalLight('#b9d5ff', 1)
moonLight.castShadow = true
moonLight.shadow.mapSize.width = 256
moonLight.shadow.mapSize.height = 256
moonLight.position.set(-5, 5, 0)
// moonLight.shadow.camera.far = 100
// moonLight.position.set(-4, 5, 0)
// moonLight.lookAt = objectGroup;

gui.add(moonLight, 'intensity').min(0).max(1).step(0.001).name('moonIntensity');
gui.add(moonLight.position, 'x').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'y').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'z').min(- 10).max(10).step(0.001)
scene.add(moonLight)

// // add directional light helper
const moonLightHelper = new THREE.DirectionalLightHelper(moonLight, 0.2);
scene.add(moonLightHelper)


const doorLight = new THREE.PointLight('#ff7d46', 5,4)
doorLight.castShadow = true
doorLight.shadow.mapSize.width = 256
doorLight.shadow.mapSize.height = 256
doorLight.shadow.camera.far = 7

doorLight.position.set(-3, -0.5, -0.5)

gui.add(doorLight, 'intensity').min(0).max(100).step(0.001).name('doorIntensity');
gui.add(doorLight.position, 'x').min(- 5).max(5).step(0.001).name('doorX');
gui.add(doorLight.position, 'y').min(- 5).max(5).step(0.001).name('doorY');
gui.add(doorLight.position, 'z').min(- 5).max(5).step(0.001).name('doorZ');

const doorLightHelper = new THREE.PointLightHelper(doorLight, 0.2)

// objectGroup.add(doorLight)
// objectGroup.add(doorLightHelper)
// scene.add(doorLightHelper)
// scene.add(doorLight)


// const directionalLight = new THREE.DirectionalLight('#ffffff',10)
// directionalLight.position.set(-5, 5,10)

// // add directional light helper
// const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2)
// const lightFolder = gui.addFolder('Directional Light');
// lightFolder.add(directionalLight.position, 'x', -10, 10).name('Light X');
// lightFolder.add(directionalLight.position, 'y', -10, 10).name('Light Y');
// lightFolder.add(directionalLight.position, 'z', -10, 10).name('Light Z');
// lightFolder.add(directionalLight, 'intensity', 0, 20).name('Intensity');

// scene.add(directionalLightHelper)
// scene.add(directionalLight)

/**
 * Particles
 */
const particlesCount = 200
const positions = new Float32Array(particlesCount * 3)

for(let i = 0; i < particlesCount; i++)
{
    positions[i * 3 + 0] = (Math.random() - 0.5) * 10
    positions[i * 3 + 1] = objectsDistance * 0.5 - Math.random() * objectsDistance * sectionMeshes.length
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10
}

const particlesGeometry = new THREE.BufferGeometry()
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

// Material
const particlesMaterial = new THREE.PointsMaterial({
    color: parameters.materialColor,
    sizeAttenuation: textureLoader,
    size: 0.03
})

// Particles
const particles = new THREE.Points(particlesGeometry, particlesMaterial)
// scene.add(particles)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{

    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Group
const cameraGroup = new THREE.Group()
scene.add(cameraGroup)

// Base camera
// const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 4
scene.add(camera)


const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})

renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
// renderer.antialias = true;





/**
 * Cursor
 */
const cursor = {}
cursor.x = 0
cursor.y = 0

// window.addEventListener('mousemove', (event) =>
// {
//     cursor.x = event.clientX / sizes.width - 0.5
//     cursor.y = event.clientY / sizes.height - 0.5
// })

/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0

const tick = () =>
{
    

    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    // // Animate camera
    // camera.position.y = - scrollY / sizes.height * objectsDistance

    // const parallaxX = cursor.x * 0.5
    // const parallaxY = - cursor.y * 0.5
    // cameraGroup.position.x += (parallaxX - cameraGroup.position.x) * 5 * deltaTime
    // cameraGroup.position.y += (parallaxY - cameraGroup.position.y) * 5 * deltaTime
    // if (javascriptObject){
    //     javascriptObject.rotation.y += deltaTime * 0.4
    // } 
    

    // Animate meshes
    for(const mesh of sectionMeshes)
    {
        mesh.rotation.x += deltaTime * 0.4
        mesh.rotation.y += deltaTime * 0.33
    }

    TWEEN.update();

    // Render
    renderer.render(scene, camera)

    controls.update();


    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()


/**
 * Scroll
 */
let currentSection = 0

// document.addEventListener('wheel', handleWheel, true);

var currentScroll = 0;

function handleWheel(e) {

  console.log("inside: " + e.deltaY)

  const newSection = Math.round(currentScroll / sizes.height)   //how would you know which section you're on if its mouse events? Whichever mesh you click, thats the HTML you show!!

  var yPosition = 0;

  // IF scroll down, then move all objects up (unless you are on last section, then do nothing)
  // IF scroll up, then move all objects down (unless you are on first section, then do nothing)

  if(e.deltaY > 0) { //scrolling down
    yPosition = 6;
  }else{  //scrolling up
    yPosition = -6;
  }

  //move all of the mesh objects
  for(const mesh of sectionMeshes){
    const targetPosition = new THREE.Vector3(0, mesh.position.y + yPosition, 0);

    // Set up the animation
    const duration = 275; // Animation duration in milliseconds

    // Create a new Tween
    const tween = new TWEEN.Tween(mesh.position)
      .to(targetPosition, duration)
      .easing(TWEEN.Easing.Quadratic.InOut) // Choose the easing function for the animation
      .onUpdate(() => {

        // Render the scene after each update
        renderer.render(scene, camera);
      })
      .start(); // Start the animation

  }

}

function slideMeshOver(sectionId, xPosition) {  

    var meshClicked = sectionMeshes[sectionId]
    console.log(meshClicked)
    // move the object side to side for the project to show
    const targetPosition = new THREE.Vector3(xPosition, meshClicked.position.y, meshClicked.position.z);

    // Create a new Tween
    const tween = new TWEEN.Tween(meshClicked.position)
      .to(targetPosition, 300)
      .easing(TWEEN.Easing.Quadratic.InOut) // Choose the easing function for the animation
      .onUpdate(() => {

        // Render the scene after each update
        renderer.render(scene, camera);
      })
      .start(); // Start the animation

}



  // slide section to the side
function slide(sectionId) {

    var xPosition = 0;

    console.log("sectionId in is: " + sectionId);
    var section = document.getElementById(sectionId);
    
    
    if(projectOpen){
        document.addEventListener('wheel', handleWheel, true);
        xPosition = 0;

        
        // move section away first
        section.classList.toggle('slide-in');

        setTimeout(function() {
            slideMeshOver(sectionId, xPosition)
           
            setTimeout(function() {
                section.classList.toggle('visible');
            }, 250);

        }, 250); 

       
    }else{
        document.removeEventListener('wheel', handleWheel, true);
        xPosition = -2;

         // move mesh first
        slideMeshOver(sectionId,xPosition)
     

        setTimeout(function() {
            section.classList.toggle('slide-in');
            section.classList.toggle('visible');
        }, 250); 
        

    }
    

    



    



    

    projectOpen = !projectOpen;  //set project open to reverse
   
};

// click event for each object

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Attach a click event listener to the document
document.addEventListener('click', onDocumentClick);


function onDocumentClick(event) {
    // Calculate normalized device coordinates (NDC) of the mouse position
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Update the picking ray with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);

    // Calculate intersections with the mesh
    const intersects1 = raycaster.intersectObject(mesh1);
    const intersects2 = raycaster.intersectObject(mesh2);
    const intersects3 = raycaster.intersectObject(mesh3);

    if (intersects1.length > 0) {
        console.log('Mesh 1 clicked!');
       
        slide("0");
    }else if(intersects2.length > 0){
        console.log('Mesh 2 clicked!');
        slide("1");
    }else if(intersects3.length > 0){
        console.log('Mesh 3 clicked!');
        slide("2");
    }else{
        console.log('clicked on nothing');
    }
}