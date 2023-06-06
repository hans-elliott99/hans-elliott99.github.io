// import * as THREE from 'three'

function randInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Set up the scene, camera, and renderer
var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 12);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);



// Create the wireframe sphere object
let n = randInt(1, 32);
const geometry = new THREE.SphereGeometry(2, n, n);
const wireframe  = new THREE.WireframeGeometry(geometry);

// Object which linearly interpolates between colors instead of just sharp switching
class RandColorMesh extends THREE.LineSegments {
  constructor(wireframe) {
    super(wireframe)
    this.material.depthTest   = false;
    this.material.opacity     = 0.7;
    this.material.transparent = true;
    this.colorTo = new THREE.Color(Math.floor(Math.random() * 16777216));
  }
  update(delta, speed_coef=1) {
    this.rotation.x += delta * speed_coef;
    this.rotation.y += delta * speed_coef;
    this.material.color.lerp(this.colorTo, delta);
  }
  nextColor() {
    this.colorTo = new THREE.Color(Math.floor(Math.random() * 16777216));
  }
}
const mesh = new RandColorMesh(wireframe);
scene.add(mesh);
mesh.position.set(0,0.5,0)


// Setup mouse movement
const mouse = {
  x: 0, y: 0
}
document.addEventListener('mousemove', function(event) {
  mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
  mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;
}, false);

document.addEventListener('touchmove', function(event) {
  event.preventDefault();

  mouse.x = (event.changedTouches[0].clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.changedTouches[0].clientY / window.innerHeight) * 2 + 1;
}, false);

document.addEventListener('mousewheel', function(event){
  camera.position.z +=event.deltaY/500;
});

// easter egg
var rotation_speed = 0.3
var speed_dir = -1
document.addEventListener('keydown', function(event) {
  // if(event.key=="Enter")
    if (rotation_speed < 0.2 | rotation_speed > 1) {
      speed_dir *= -1;
    }  
    console.log(rotation_speed)
    rotation_speed += speed_dir*0.1;
});


// Render the scene
const clock = new THREE.Clock();
let delta = 0;
const vec = new THREE.Vector3();

function render() {
  requestAnimationFrame(render);
  delta = clock.getDelta();
  mesh.update(delta, rotation_speed)

  camera.position.lerp(vec.set(mouse.x * 3, mouse.y * 1.5, camera.position.z), 0.1)
  camera.lookAt(0, 0.25, 0);
  renderer.render(scene, camera);
}

render();
setInterval(function(){
  mesh.nextColor() //set next color every n milliseconds
}, 3000);
//........................



// // Tracking of mouse input (click and drag)
// var lastMouseX = null;
// var lastMouseY = null;
// var isMouseDown = false;

// document.addEventListener('mousemove', function(event) {
//   if (!isMouseDown) {return;}
//   var newMouseX = event.clientX;
//   var newMouseY = event.clientY;

//   var deltaX = newMouseX - lastMouseX;
//   var deltaY = newMouseY - lastMouseY;
//   camera.position.x += deltaX * 0.01;
//   camera.position.y += deltaY * 0.01;

//   lastMouseX = newMouseX;
//   lastMouseY = newMouseY;
// });
// document.addEventListener('mousedown', function(event) {
//   isMouseDown = true;
//   lastMouseX = event.clientX;
//   lastMouseY = event.clientY;
// });
// document.addEventListener('mouseup', function(event) {
//   isMouseDown = false;
//   lastMouseX = null;
//   lastMouseY = null;
// });
