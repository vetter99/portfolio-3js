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
// gui.hide();

const parameters = {
    materialColor: '#ffeded'
}

// gui
//     .addColor(parameters, 'materialColor')
//     .onChange(() =>
//     {
//         material.color.set(parameters.materialColor)
//         particlesMaterial.color.set(parameters.materialColor)
//     })

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


// Test
const testGroup = new THREE.Group()
testGroup.position.set(0, -1, 0);
testGroup.rotation.set(0,0, 0); // Set the desired rotation angles 
testGroup.scale.set(1.5,1.5,1.5)

scene.add(testGroup)


loadIconObject("/objects/testcase.glb",testGroup,[0, 0, 0]);


// object group
const techGroup0 = new THREE.Group()
techGroup0.position.set(10, -10, 0);
techGroup0.rotation.set(0,4.5, 0); // Set the desired rotation angles  
techGroup0.scale.set(0.25,0.25,0.25)
scene.add(techGroup0)

// Load 3D objects into group
// loadIconObject("/objects/java.glb",techGroup0,[0, 0, -2.5]);
// loadIconObject("/objects/blender.glb",techGroup0,[0, 0, 2.5]);
// loadIconObject("/objects/nativescript.glb",techGroup0,[0, 0, 0]);

loadIconObject("/objects/cartridge.glb",techGroup0,[0, 0, -2.5]);

const techGroup1 = new THREE.Group()
techGroup1.position.set(10, -10, 0);
techGroup1.rotation.set(0,4.5, 0); // Set the desired rotation angles  
// techGroup1.scale.set(25,25,25)
scene.add(techGroup1)

loadIconObject("/objects/cartridge.glb",techGroup1,[0, 0, -2.5]);


const techGroup2 = new THREE.Group()
techGroup2.position.set(10, -10, 0);
techGroup2.rotation.set(0,4.5, 0); // Set the desired rotation angles  
techGroup2.scale.set(5,5,5)
scene.add(techGroup2)

// loadIconObject("/objects/blender.glb",techGroup2,[0, 0, -2.5]);
loadIconObject("/objects/cartridge.glb",techGroup2,[0, 0, -2.5]);


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
const boxMesh = new THREE.Mesh(
    new THREE.BoxGeometry(0.5,0.5,0.5, 32, 32, 32),
    material
)
boxMesh.name = "project0"

const coneMesh = new THREE.Mesh(
    new THREE.ConeGeometry(0.5, 1, 32),
    material
)
coneMesh.name = "project1"


const torusKnotMesh = new THREE.Mesh(
    new THREE.TorusKnotGeometry(0.4, 0.15, 100, 16),
    material
)
torusKnotMesh.name = "project2"


boxMesh.position.y = - objectsDistance * -1
coneMesh.position.y = - objectsDistance * 0
torusKnotMesh.position.y = - objectsDistance * 1

// scene.add(boxMesh, coneMesh, torusKnotMesh)

var sectionMeshes = [ boxMesh, testGroup, torusKnotMesh ]  

/**
 * Lights
 */

// Ambient light
const ambientLight = new THREE.AmbientLight('white', 1)
scene.add(ambientLight)

//spot light
// const spotLight = new THREE.SpotLight(0xffffff, 100);
// spotLight.position.set(0, 10, 0);
// spotLight.castShadow = true;
// scene.add(spotLight);


// // Directional light Left
const directionalLightLeft = new THREE.DirectionalLight('white', 1)
directionalLightLeft.castShadow = true
directionalLightLeft.shadow.mapSize.width = 256
directionalLightLeft.shadow.mapSize.height = 256
directionalLightLeft.position.set(-5, 5, 0)
scene.add(directionalLightLeft)

// // add directional light helper
const directionalLightHelperLeft = new THREE.DirectionalLightHelper(directionalLightLeft, 0.2);
// scene.add(directionalLightHelperLeft) //TODO 

// // Directional light Right
const directionalLightRight = new THREE.DirectionalLight('#b9d5ff', 1)
directionalLightRight.castShadow = true
directionalLightRight.shadow.mapSize.width = 256
directionalLightRight.shadow.mapSize.height = 256
directionalLightRight.position.set(5, 5, 0)

const directionalLightRightHelper = new THREE.DirectionalLightHelper(directionalLightRight, 0.2);
// scene.add(directionalLightRightHelper) //TODO 
// scene.add(directionalLightRight);

// Directional light Top
const directionalLightTop = new THREE.DirectionalLight('#b9d5ff', 0.5)
directionalLightTop.castShadow = true
directionalLightTop.shadow.mapSize.width = 256
directionalLightTop.shadow.mapSize.height = 256
directionalLightTop.position.set(0, 5, 5)
directionalLightTop.shadow.camera.top = 3;
directionalLightTop.shadow.camera.bottom = -3;
directionalLightTop.shadow.camera.left = -3;
directionalLightTop.shadow.camera.right = 3;
// scene.add(directionalLightTop);

// Directional light Helper
const directionalLightHelperTop = new THREE.DirectionalLightHelper(directionalLightTop, 0.2);
// scene.add(directionalLightHelperTop) //TODO


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
scene.add(particles)

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
camera.position.z = 4 //4
scene.add(camera)


// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true


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

const cursor = document.getElementById('cursor');
const cursorIconLock = document.getElementById('cursor-icon-lock');
const cursorIconUnlock = document.getElementById('cursor-icon-unlock');


window.addEventListener('mousemove', (event) => {
    const { clientX: x, clientY: y } = event;
    cursor.style.left = x + 'px';
    cursor.style.top = y + 'px';

    onMouseHoverObject(event);
});

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
    
    // Animate meshes
    for(const mesh of sectionMeshes)
    {
        // mesh.rotation.x += deltaTime * 0.4
        mesh.rotation.y += deltaTime * .75
    }

    TWEEN.update();

    // Render
    renderer.render(scene, camera)

    // controls.update();


    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()


/**
 * Scroll
 */
let currentSection = 0

document.addEventListener('wheel', handleWheel, true);  //adding the wheel event listener from the start

var animationRunning = false;


// 

function handleWheel(event) {
//   instead of removing the event listener and adding it back, we can just use a boolean to check if the animation is running


  if (animationRunning == false) {

  console.log("Trigger the mesh movement!");
  animationRunning = true;


    setTimeout(function() {
        animationRunning = false;
    }, 2000);

    //   console.log("y scroll direction: " + event.deltaY)

  var yPosition = 0;
  
//   Every time you scroll down, you put the top most item at the bottom…
//   Every time you scroll up, you put the bottom most item at the top…
// may need a delay to wait for the animation to finish

  if(event.deltaY > 0) { //scrolling down
    yPosition = 7;
    currentSection++;

    // move top most mesh instantly to the bottom.
    sectionMeshes[0].position.y = sectionMeshes[sectionMeshes.length - 1].position.y - yPosition;
    sectionMeshes = moveItems(sectionMeshes, false)
    
    
  }else{  //scrolling up
    yPosition = -7;
    currentSection--;

     // move bottom most mesh instantly to the top.
    sectionMeshes[sectionMeshes.length - 1].position.y = sectionMeshes[0].position.y - yPosition;
    sectionMeshes = moveItems(sectionMeshes, true)
  }

  console.log("Mesh order: ");

  sectionMeshes.forEach(function(entry) {
    console.log(entry.name);
  });


//   instead of an arbitrary value for yPosition, we can use the sizes.height to get the correct value

  //move all of the mesh objects //TODO make them a group and move the entire group together?
  for(const mesh of sectionMeshes){
  // console.log("position: " +  mesh.position.y);

    const targetPosition = new THREE.Vector3(0, mesh.position.y + yPosition, 0);

    // Set up the animation
    const duration = 1000; // Animation duration in milliseconds


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

  console.log("Here after...") // this may need a delay to wait for the animation to finish



}else{
    console.log("DONT trigger the mesh movement")
}

}

function slideMeshOver(sectionId, xPosition) {  

    updateCursor(false); 

    console.log("section number: " + sectionId) 
    var meshClicked; 

    // instead of moving the index of this number just directly move this mesh 
    if(sectionId == 0){
        meshClicked = boxMesh
    }else if(sectionId == 1){
        meshClicked = testGroup
    }else{
        meshClicked = torusKnotMesh
    }

    
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

    var section = document.getElementById(sectionId);
    
    if(projectOpen){
        
        document.addEventListener('wheel', handleWheel, true);
        xPosition = 0;

        slideMeshGroupToPosition(sectionId, new THREE.Vector3(10, -10, 0), 2500);

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
        slideMeshGroupToPosition(sectionId, new THREE.Vector3(2, 0.25, 0), 2000);

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




function onMouseHoverObject(event) {
  // Calculate normalized device coordinates (NDC) of the mouse position
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // Update the picking ray with the camera and mouse position
  raycaster.setFromCamera(mouse, camera);

  // Calculate intersections with the mesh
  const intersects1 = raycaster.intersectObject(boxMesh);
  const intersects2 = raycaster.intersectObject(testGroup);
  const intersects3 = raycaster.intersectObject(torusKnotMesh);

  
  if (intersects1.length > 0 || intersects2.length > 0 || intersects3.length > 0) {
        updateCursor(true); 
  }else{

        updateCursor(false);
  }

    
}


function onDocumentClick(event) {
    // Calculate normalized device coordinates (NDC) of the mouse position
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Update the picking ray with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);

    // Calculate intersections with the mesh
    const intersects1 = raycaster.intersectObject(boxMesh);
    const intersects2 = raycaster.intersectObject(testGroup);
    const intersects3 = raycaster.intersectObject(torusKnotMesh);


//TODO: PROBLEM lies here, if you click on mesh 1 the code below is assuming the that mesh 1 is the first mesh in the array, but it is not anymore, becuz array changes
    if (intersects1.length > 0) {
        console.log('Mesh 0 clicked!');
        slide("0");
    }else if(intersects2.length > 0){
        console.log('Mesh 1 clicked!');
        slide("1");
    }else if(intersects3.length > 0){
        console.log('Mesh 2 clicked!');
        slide("2");
    }else{
        // console.log('clicked on nothing');
    }
}


function loadIconObject(fileLocation, groupName,positionArray){

    gltfLoader.load(
        fileLocation,
        (gltf) => {
            var object = gltf.scene;
            
            object.position.set(positionArray[0], positionArray[1], positionArray[2])
            groupName.add(object)
    })


}


function slideMeshGroupToPosition(sectionNumber, targetPosition, duration) {
    
    var group;

    if(sectionMeshes[sectionNumber].name == "project0"){
        group = techGroup0 
    }else if(sectionMeshes[sectionNumber].name == "project1"){
        group = techGroup1
    }else{
        group = techGroup2
    }  
    // Store the current position of the group
    const startPosition = group.position.clone();
  
    // Create a TWEEN animation for the position
    new TWEEN.Tween(group.position)
      .to(targetPosition, duration)
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate(() => {
        // Update the position during the animation
        // (optional: you can add any additional logic here)
      })
      .onComplete(() => {
        // Animation completed
        // (optional: you can add any additional logic here)
      })
      .start();
  }
  

  function moveItems(array, up) {
    if (up) {
      const lastItem = array.pop();
      array.unshift(lastItem);
    } else {
      const firstItem = array.shift();
      array.push(firstItem);
    }
    return array;
  }



  document.querySelectorAll('.fa-github, .fa-linkedin, .fa-envelope').forEach(function(icon) {
    icon.addEventListener('click', function() {
        console.log("Here");
      var link = this.parentNode; // Get the parent link element
      var href = link.getAttribute('href'); // Get the href attribute
      if (href) {
        window.open(href, '_blank'); // Open the link in a new tab/window
      }
    });
  });


  function updateCursor(hovering){


    if(hovering){
        cursor.style.backgroundColor = 'yellow'; // Change cursor color to red
        cursor.style.transform = 'scale(2)'; // Example: scale cursor size

        cursorIconLock.style.display = projectOpen ? 'block' : 'none';
        cursorIconUnlock.style.display = projectOpen ? 'none' : 'block';
    }else{
        cursor.style.backgroundColor = 'white'; // Change cursor color to red
        cursor.style.transform = 'scale(1)'; // Example: scale cursor size
        cursorIconLock.style.display = 'none';
        cursorIconUnlock.style.display = 'none';
    }
  }