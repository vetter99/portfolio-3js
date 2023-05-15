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
const ambientLight = new THREE.AmbientLight(0xffffff, 1) //0.1
ambientLight.color = new THREE.Color('0xff0000')
scene.add(ambientLight)

gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001).name('ambient intensity')


// Lights

for(let i = -1; i < 3; i++){
  const spotLight = new THREE.SpotLight('white',1.5,50,Math.PI * 0.1, 0.25, 1)
  spotLight.position.set(0, 20, i * 20)

  const target = new THREE.Object3D();
  target.position.set(0, 0, i * 20)
  scene.add(target);
  
  spotLight.target = target;

  const spotLightHelper = new THREE.SpotLightHelper(spotLight)
  // scene.add(spotLightHelper)
  scene.add(spotLight)
}
// gui.add(spotLight.position, 'x').min(-20).max(20).step(0.001).name('spotLight x')
// gui.add(spotLight.position, 'y').min(-20).max(20).step(0.001).name('spotLight y')
// gui.add(spotLight.position, 'z').min(-20).max(20).step(0.001).name('spotLight z')
// gui.add(spotLight, 'intensity').min(0).max(1).step(0.001).name('spotLight intensity')

// spotLight.castShadow = true;
// spotLight.shadow.mapSize.width = 1024;
// spotLight.shadow.mapSize.height = 1024;
// spotLight.shadow.camera.near = 10;
// spotLight.shadow.camera.far = 200;
// spotLight.shadow.focus = 1;

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
backWallMesh.position.z = -40
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

const followText = document.getElementById('follow-text');
const tick = () =>
{
    // Update controls
    controls.update()


    // Render
    renderer.render(scene, camera)


    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()