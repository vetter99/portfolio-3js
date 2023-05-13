import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js'
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Lights
 */
// ambient light is omnidirectional
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
ambientLight.color = new THREE.Color('0xff0000')
ambientLight.intensity = 0.5
scene.add(ambientLight)

gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)


/**
 * Floor
 */
const floorGeometry = new THREE.PlaneGeometry(175, 100);

// Define the material
const floorMaterial = new THREE.MeshPhongMaterial({
//   color: 0xbdbdbd,
  map: new THREE.TextureLoader().load('/textures/concrete-texture.jpg'),
//   envMap: cubeTexture,
  specular: 0xffffff,
  shininess: 100
});

gui.add(floorMaterial, 'shininess').min(0).max(100).step(0.001)

// Create the floor mesh
const floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);

// Position the floor mesh
floorMesh.rotation.x = - Math.PI * 0.5;

// Add the floor mesh to the scene
scene.add(floorMesh);


/**
 * Back Wall
 */
const backWallGeometry = new THREE.PlaneGeometry(175, 20);
const backWallMaterial = new THREE.MeshPhongMaterial({
      color: 'white',
      map: new THREE.TextureLoader().load('/textures/brick3.jpg'),
    //   envMap: cubeTexture,
    //   specular: 0xffffff,
    //   shininess: 100
    });

    
const backWallMesh = new THREE.Mesh(backWallGeometry, backWallMaterial);

// Set the position and rotation of the wall mesh
backWallMesh.position.y = 10;
backWallMesh.position.z = -25
scene.add(backWallMesh);


/**
 * Poster
 */
// Create the poster frame geometry
const posterGeometry = new THREE.BoxGeometry(8, 11, 0.5);

// Create the poster frame material
const posterMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide
  });
  
  // Create the poster frame mesh
  const posterMesh = new THREE.Mesh(posterGeometry, posterMaterial);
  posterMesh.position.set(10, 10, 35);
  posterMesh.rotation.y = Math.PI * 0.5;
  
  // Add the frame mesh to the scene
  scene.add(posterMesh);

// Add text to the poster

// Create a canvas element for the chalkboard texture
const canvas2 = document.createElement('canvas');
canvas2.width = 1024;
canvas2.height = 1024;

// Get the 2D context of the canvas2
const context = canvas2.getContext('2d');

// Set the font size and family
context.font = '50px Arial';

// Set the text content and position
const text = 'Welcome to my \nclass! asdf asf ads\nasdfadsfa sfa \n asdfa ';
const x = 50;
const y = 150;

// Set the text color to white
context.fillStyle = 'red';

// Draw the text onto the canvas2
context.fillText(text, x, y);

// Create a texture from the canvas2
const texture = new THREE.CanvasTexture(canvas2);

// Create a material using the texture
const material = new THREE.MeshBasicMaterial({map: texture},);

// Create a plane geometry for the text
const textGeometry = new THREE.PlaneGeometry(5, 2.5);

// Create a mesh for the text geometry and material
const textMesh = new THREE.Mesh(textGeometry, material);

const frameSize = new THREE.Vector3();
posterGeometry.computeBoundingBox();
posterGeometry.boundingBox.getSize(frameSize);

// Set the position and rotation of the text mesh
textMesh.position.set(
    posterMesh.position.x - frameSize.x / 2 + 0.5,  // Center the text horizontally within the frame
    posterMesh.position.y + frameSize.y / 2 - 1.5,  // Position the text at the top of the frame
    posterMesh.position.z + 0.251                  // Offset the text slightly in front of the frame
);

textMesh.rotation.y = Math.PI * 0.5;
// Add the text mesh to the scene
scene.add(textMesh);

  
// const loader = new FontLoader();

// loader.load( 'https://cdn.jsdelivr.net/npm/three/examples/fonts/helvetiker_regular.typeface.json', function ( font ) {

// 	const textGeometry = new TextGeometry( 'vetter', {
// 		font: font,
// 		size: 10,
// 		height: 2,
// 		curveSegments: 1,
// 		bevelEnabled: true,
// 		bevelThickness: 1,
// 		bevelSize: 1,
// 		bevelOffset: 0,
// 		bevelSegments: 5,
// 	} );

//     // Center the text
// textGeometry.center();

// // Create the text material
// const textMaterial = new THREE.MeshBasicMaterial({color: 'red'});

// // Create the text mesh
// const textMesh = new THREE.Mesh(textGeometry, textMaterial);

// // Position the text mesh in the center of the frame
// textMesh.position.set(0, 0, 0.26);

// // Add the text mesh to the frame mesh
// frameMesh.add(textMesh);

// } );





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
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000)
camera.position.x = 0
camera.position.y = 25
camera.position.z = 35
scene.add(camera)
gui.add(camera.position, 'x').min(-20).max(20).step(0.001).name('camera x')
gui.add(camera.position, 'y').min(-20).max(20).step(0.001).name('camera y')
gui.add(camera.position, 'z').step(0.001).name('camera z')

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()