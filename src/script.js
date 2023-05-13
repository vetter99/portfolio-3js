import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js'
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

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
const floorGeometry = new THREE.PlaneGeometry(25, 50);

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
const backWallGeometry = new THREE.PlaneGeometry(25, 5);
const backWallMaterial = new THREE.MeshPhongMaterial({
      color: 'white',
      map: new THREE.TextureLoader().load('/textures/brick3.jpg'),
    //   envMap: cubeTexture,
    //   specular: 0xffffff,
    //   shininess: 100
    });

    
const backWallMesh = new THREE.Mesh(backWallGeometry, backWallMaterial);

// Set the position and rotation of the wall mesh
backWallMesh.position.y = 2.5;
backWallMesh.position.z = -25
scene.add(backWallMesh);


/**
 * Poster
 */
// Create the poster frame geometry
const frameGeometry = new THREE.BoxGeometry(10, 8, 0.5);

// Create the poster frame material
const frameMaterial = new THREE.MeshBasicMaterial({color: 0xffffff});

// Create the poster frame mesh
const frameMesh = new THREE.Mesh(frameGeometry, frameMaterial);

// Add the frame mesh to the scene
scene.add(frameMesh);

  


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
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
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