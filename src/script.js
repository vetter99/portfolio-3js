import * as THREE from 'three'
import * as dat from 'lil-gui'
import gsap from 'gsap'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import TWEEN from 'tween.js'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'

// Create a frustum object based on the camera's projection matrix
const frustum = new THREE.Frustum();
const cameraViewProjectionMatrix = new THREE.Matrix4();

var projectOpen = false;
var openSection = 1;


const gltfLoader = new GLTFLoader()


/**
 * Debug
 */
// const gui = new dat.GUI()
// gui.hide();

const parameters = {
    materialColor: '#f0ff7e'
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

const techGroup0 = new THREE.Group()
techGroup0.position.set(10, -2, 0);
techGroup0.rotation.set(0,0, 0); 
scene.add(techGroup0)


loadIconObject("/objects/ns.glb",techGroup0,[-0.05, 0, 0]);
loadIconObject("/objects/angular.glb",techGroup0,[0, 0, 0]);
// loadIconObject("/objects/firebase.glb",techGroup0,[0.05, 0, 0]);


const techGroup1 = new THREE.Group()
techGroup1.position.set(10, -2, 0);
techGroup1.rotation.set(0,0, 0); 
scene.add(techGroup1)


loadIconObject("/objects/ns.glb",techGroup1,[-0.05, 0, 0]);
loadIconObject("/objects/angular.glb",techGroup1,[0, 0, 0]);
loadIconObject("/objects/terraform.glb",techGroup1,[0.05, 0, 0]);

const techGroup2 = new THREE.Group()
techGroup2.position.set(10, -2, 0);
techGroup2.rotation.set(0,0, 0);
scene.add(techGroup2)

loadIconObject("/objects/node.glb",techGroup2,[-0.05, 0, 0]);
loadIconObject("/objects/aws.glb",techGroup2,[0, 0, 0]);
loadIconObject("/objects/terraform.glb",techGroup2,[0.05, 0, 0]);


const techGroup3 = new THREE.Group()
techGroup3.position.set(10, -2, 0);
techGroup3.rotation.set(0,0, 0);
scene.add(techGroup3)

loadIconObject("/objects/python.glb",techGroup3,[-0.05, 0, 0]);
loadIconObject("/objects/aws.glb",techGroup3,[0, 0, 0]);
loadIconObject("/objects/java.glb",techGroup3,[0.05, 0, 0]);

/**
 * Objects
 */
// Texture
const textureLoader = new THREE.TextureLoader()
const gradientTexture = textureLoader.load('textures/gradients/3.jpg')
gradientTexture.magFilter = THREE.NearestFilter


// // Material
// const material = new THREE.MeshToonMaterial({
//     color: parameters.materialColor,
//     gradientMap: gradientTexture
// })


// Objects
const objectsDistance = 7

var object1; 

function loadGLBModel(url) {
  return new Promise((resolve, reject) => {
    gltfLoader.load(url, resolve, undefined, reject);
  });
}

// loadGLBModel("/objects/permission.glb")
//   .then((gltf) => {
//     object1 = gltf.scene;
//     object1.position.set(2, -1, 0);
//     object1.scale.set(1.75, 1.75, 1.75);
//     scene.add(object1);
//     console.log(object1);
//   })
//   .catch((error) => {
//     console.error("Error loading GLB model:", error);
//   });

  

const meshGroup0 = new THREE.Group()

loadIconObject("/objects/permission.glb",meshGroup0,[0, -0.6, 0]);


meshGroup0.name = "project0"

const meshGroup1 = new THREE.Group()

loadIconObject("/objects/entoraj.glb",meshGroup1,[0, -0.6, 0]);

meshGroup1.name = "project1"


const meshGroup2 = new THREE.Group()

loadIconObject("/objects/hero.glb",meshGroup2,[0, -0.6, 0]);

meshGroup2.name = "project2"


const meshGroup3 = new THREE.Group()

loadIconObject("/objects/statefarm.glb",meshGroup3,[0, -0.6, 0]);

meshGroup3.name = "project3"



meshGroup0.position.y = - objectsDistance * -1
meshGroup1.position.y = - objectsDistance * 0
meshGroup2.position.y = - objectsDistance * 1
meshGroup3.position.y = - objectsDistance * 2


scene.add(meshGroup0,meshGroup1, meshGroup2, meshGroup3)

var sectionMeshes = [ meshGroup0, meshGroup1, meshGroup2, meshGroup3 ]  

/**
 * Lights
 */

// Ambient light
// const ambientLight = new THREE.AmbientLight('#ffffff', 0.5)
// scene.add(ambientLight)

// Directional light Top Right
const directionalLightTopRight = new THREE.DirectionalLight('#b9d5ff', 1)
directionalLightTopRight.position.set(0.5, -0.25, 4)

const target = new THREE.Vector3(0, 0, 0); // Set the new target coordinates
directionalLightTopRight.target.position.copy(target);
scene.add(directionalLightTopRight);

// Directional light Helper
const directionalLightHelperTop = new THREE.DirectionalLightHelper(directionalLightTopRight, 0.2);
// scene.add(directionalLightHelperTop)

//Directional light Top Left
const directionalLightTopLeft = new THREE.DirectionalLight('#b9d5ff', 1)
directionalLightTopLeft.position.set(-0.5, -0.25, 4)


directionalLightTopLeft.target.position.copy(target);
scene.add(directionalLightTopLeft);


// Directional light Helper
const directionalLightHelperTopLeft = new THREE.DirectionalLightHelper(directionalLightTopLeft, 0.2);
// scene.add(directionalLightHelperTopLeft) 


/**
 * Particles
 */
// const particlesCount = 275
// const positions = new Float32Array(particlesCount * 3.5)

// for(let i = 0; i < particlesCount; i++)
// {
//     positions[i * 3 + 0] = (Math.random() - 0.5) * 17
//     positions[i * 3 + 1] = (Math.random() - 0.5) * 17
//     positions[i * 3 + 2] = (Math.random() - 0.5) * 17
// }

// const particlesGeometry = new THREE.BufferGeometry()
// particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

// // Material
// const particlesMaterial = new THREE.PointsMaterial({
//     color: parameters.materialColor,
//     sizeAttenuation: textureLoader,
//     size: 0.02
// })

// // Particles
// const particles = new THREE.Points(particlesGeometry, particlesMaterial)
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

    console.log("RESIZING");

    mobileResize();

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
    powerPreference: "high-performance",
    alpha: true // transparent background
})

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

// initial
mobileResize();

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    // // Animate meshes
    for(const mesh of sectionMeshes)
    {
        mesh.rotation.y += deltaTime * .6
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
let currentSection = 1


var startY = 0;

document.addEventListener('touchstart', function(event) {
  startY = event.touches[0].clientY;
});

document.addEventListener('touchmove', touchMoveListner, true);

function touchMoveListner(event){
  var deltaY = event.touches[0].clientY - startY;
  console.log("Here")
  callWheel(deltaY)
}


document.addEventListener('wheel', callWheel, true);  //adding the wheel event listener from the start

// intermediary function to call the handleWheel function becuz of touch event and wheel event...
function callWheel(input){
  if(undefined == input.deltaY){
    // console.log("touch scrolling")
    handleWheel(-input)
  }else{
    // console.log("mouse scrolling")
    handleWheel(input.deltaY)
  }
}


var animationRunning = false;

function handleWheel(deltaY) {

  // console.log("Delta: " + deltaY);

//   instead of removing the event listener and adding it back, we can just use a boolean to check if the animation is running
  if (animationRunning == false) {

    animationRunning = true;


    setTimeout(function() {
        animationRunning = false;
    }, 2000);


  var yPosition = 0;
  
//   Every time you scroll down, you put the top most item at the bottom…
//   Every time you scroll up, you put the bottom most item at the top…
// may need a delay to wait for the animation to finish

  if(deltaY > 0) { //scrolling down
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

  // console.log("Mesh order: ");
  // sectionMeshes.forEach(function(entry) {
  //   console.log(entry.name);
  // });

//   TODO: instead of an arbitrary value for yPosition, we can use the sizes.height to get the correct value?

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



}else{
    // console.log("DONT trigger the mesh movement")
}

}

function slideMeshOver(sectionId, xPosition, yPosition) {  

    updateCursor(false); 

    var meshClicked; 

    // instead of moving the index of this number just directly move this mesh 
    if(sectionId == 0){
        meshClicked = meshGroup0
    }else if(sectionId == 1){
        meshClicked = meshGroup1
    }else if (sectionId == 2){
        meshClicked = meshGroup2
    }else if (sectionId == 3){
        meshClicked = meshGroup3
    }else{
        // meshClicked = boxMesh4
    }

    
    // move the object side to side for the project to show
    const targetPosition = new THREE.Vector3(xPosition, isMobileSize ? yPosition : meshClicked.position.y, meshClicked.position.z);

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

    openSection = sectionId;
    var xPosition = 0;
    var yPosition = 0;

    //  X position if on mobile always 0, but pass in Y position to move up slightly

    var section = document.getElementById(sectionId);
    
    if(isMobileSize()) showExitButton(projectOpen);

    if(projectOpen){
        
        document.addEventListener('wheel', callWheel, true);
        document.addEventListener('touchmove', touchMoveListner, true);

        xPosition = 0;
        yPosition = 0;

        slideMeshGroupToPosition(sectionId, new THREE.Vector3(10, -1, 0), 1000);
       
        showNextButton(true);

        // move section away first
        section.classList.toggle('slide-in');


        setTimeout(function() {
            slideMeshOver(sectionId, xPosition, yPosition)
           
            setTimeout(function() {
                section.classList.toggle('visible');
            }, 250);

        }, 250); 

       
    }else{
        document.removeEventListener('wheel', callWheel, true);
        document.removeEventListener('touchmove', touchMoveListner, true);

        
        isMobileSize() ? xPosition = 0 : xPosition = -2.5;
        isMobileSize() ? yPosition = 0.90 : yPosition = 0;

         // move mesh first
        slideMeshOver(sectionId,xPosition, yPosition)

        const vectorPosition = isMobileSize() ? new THREE.Vector3(0,-2.5,0) : new THREE.Vector3(2, -1.5, 0);

        slideMeshGroupToPosition(sectionId, vectorPosition, 1000);

        showNextButton(false);

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
  const intersects1 = raycaster.intersectObject(meshGroup0);
  const intersects2 = raycaster.intersectObject(meshGroup1);
  const intersects3 = raycaster.intersectObject(meshGroup2);
  const intersects4 = raycaster.intersectObject(meshGroup3);
  
  if (intersects1.length > 0 || intersects2.length > 0 || intersects3.length > 0 || intersects4.length > 0) {
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

    if (raycaster.intersectObject(meshGroup0).length > 0) {
        slide("0");
    }else if(raycaster.intersectObject(meshGroup1).length > 0){
        slide("1");
    }else if(raycaster.intersectObject(meshGroup2).length > 0){
        slide("2");
    }else if(raycaster.intersectObject(meshGroup3).length > 0){
        slide("3");
    }
    else if(raycaster.intersectObject(techGroup1).length > 0){
      // console.log('tech group 1 clicked... this is an entire group so cant pinpoint which cartridge was clicked...');
      // addFlipEffect(techGroup1);
    }else{
        // console.log('No mesh clicked!');
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


function loadIconObjectNEW(fileLocation){

  gltfLoader.load(
      fileLocation,
      (gltf) => {
          var object = gltf.scene;
          console.log(object)
          return object;
  })


}



function slideMeshGroupToPosition(sectionNumber, targetPosition, duration) {
    
    var group;

    if(sectionNumber == 0){
        group = techGroup0 
    }else if(sectionNumber == 1){
        group = techGroup1
    }else if(sectionNumber == 2){
      group = techGroup2
    }else{
        group = techGroup3
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
      var link = this.parentNode; // Get the parent link element
      var href = link.getAttribute('href'); // Get the href attribute
      if (href) {
        window.open(href, '_blank'); // Open the link in a new tab/window
      }
    });
  });


  function updateCursor(hovering){

    if(!isMobileSize()){

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

  }




  function mobileResize() {
    console.log("mobile resize")
    if(window.innerWidth < 900){
      meshGroup0.scale.set(1.25,1.25,1.25)
      meshGroup1.scale.set(1.25,1.25,1.25)
      meshGroup2.scale.set(1.25,1.25,1.25)
      meshGroup3.scale.set(1.25,1.25,1.25)

      techGroup0.scale.set(15,15,15)
      techGroup1.scale.set(15,15,15)
      techGroup2.scale.set(15,15,15)
      techGroup3.scale.set(15,15,15)
      
    }else{
      meshGroup0.scale.set(1.75,1.75,1.75)
      meshGroup1.scale.set(1.75,1.75,1.75)
      meshGroup2.scale.set(1.75,1.75,1.75)
      meshGroup3.scale.set(1.75,1.75,1.75)

      techGroup0.scale.set(25,25,25)
      techGroup1.scale.set(25,25,25)
      techGroup2.scale.set(25,25,25)
      techGroup3.scale.set(25,25,25)
    }
  }
    
  function isMobileSize() {
    return window.innerWidth < 900;
  }

  function addFlipEffect(mesh) {
    var startTime = Date.now();
    var duration = 1500; // 1 second
    
    function update() {
      var elapsed = Date.now() - startTime;
      if (elapsed >= duration) {
        // Stop the flip effect
        mesh.rotation.y = 0; // Reset the mesh rotation
        return;
      }
      
      // Calculate the flip effect
      var progress = elapsed / duration *2;
      var angle = Math.PI * progress; // Rotate 180 degrees
      
      // Apply the flip effect to the mesh
      mesh.rotation.x = angle;
      
      // Schedule the next update
      requestAnimationFrame(update);
    }
    
    // Start the flip effect
    update();
  }
  
function showNextButton(show){
  if(show){
    document.getElementById("next-button").style.display = "block";
  }else{
    document.getElementById("next-button").style.display = "none";
  } 
}


  const ovalButton = document.querySelector('.oval-button');
  
  // Add an event listener for the "click" event
  ovalButton.addEventListener('click', function (){
    manualNextProject();
  });
  
  // Function to handle the click event
  function manualNextProject() {

    var yPosition = 0;

    yPosition = 7;
    currentSection++;
  
    // move top most mesh instantly to the bottom.
    sectionMeshes[0].position.y = sectionMeshes[sectionMeshes.length - 1].position.y - yPosition;
    sectionMeshes = moveItems(sectionMeshes, false)
  
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
  }


  // Partially Complete
  const exitButton = document.querySelector('.exit-button');
  exitButton.addEventListener('click', function (){
    // close project
    console.log("close project")
    slide(openSection); //need to keep track of open section number?
  });


  function showExitButton(show){
    if(!show){
      document.getElementById("exit-group").style.display = "block";
    }else{
      document.getElementById("exit-group").style.display = "none";
    } 
  }

  // Overlay
  const overlay = document.getElementById('overlay');
  const content = document.getElementById('content');
  const message = document.getElementById('message');
  const text = `"Live in the future...then build what's missing"\n\nWelcome to my portfolio.`; // Multi-line HTML text
  const typingSpeed = 75; // Speed of typing animation (in milliseconds)
  
  // Show overlay and start typewriter animation
  overlay.style.display = 'flex';
  typewriterEffect(text, message);
  
  // Function for typewriter animation
  function typewriterEffect(text, element) {
    const htmlLines = text.split('\n').map(line => line.trim()).filter(line => line !== '');
    let lineIndex = 0;
    let charIndex = 0;
    element.innerHTML = ''; // Clear existing content
  
    function type() {
      if (lineIndex < htmlLines.length) {
        const currentLine = htmlLines[lineIndex];
        if (charIndex < currentLine.length) {
          if (currentLine.charAt(charIndex) === '\n') {
            element.innerHTML += '<br><br>'; // Add an entire space between lines
          } else {
            element.innerHTML += currentLine.charAt(charIndex);
          }
          charIndex++;
          setTimeout(type, typingSpeed);
        } else {
          lineIndex++;
          charIndex = 0;
          element.innerHTML += '<br><br>'; // Add an entire space between lines
          setTimeout(type, typingSpeed);
        }
      } else {
        // Hide overlay and show content after typing animation completes
        setTimeout(() => {
          overlay.classList.add('hide');
          content.style.opacity = 1;
        }, 1000); // Delay before hiding overlay (adjust as needed)
      }
    }
  
    type();
  }