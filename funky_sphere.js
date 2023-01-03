
// Set up the scene, camera, and renderer
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 5);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);

// Create a sphere
const geometry = new THREE.SphereGeometry(2, 32, 32);
const wireframe  = new THREE.WireframeGeometry(geometry)

const line = new THREE.LineSegments( wireframe );
line.material.depthTest = false;
line.material.opacity = 0.25;
line.material.transparent = true;
scene.add( line );

// Set the colors of the sphere
var colors = [
  0xff0000, // red
  0x00ff00, // green
  0x0000ff, // blue
  0xffff00, // yellow
  0xff00ff, // magenta
  0x00ffff  // cyan
];
var colorIndex = 0;

// Set the color of the sphere
function setColor() {
  line.material.color.setHex(colors[colorIndex]);
  colorIndex = (colorIndex + 1) % colors.length;
}

// Tracking of mouse input
var lastMouseX = null;
var lastMouseY = null;
var isMouseDown = false;

document.addEventListener('mousemove', function(event) {
  if (!isMouseDown) {return;}
  var newMouseX = event.clientX;
  var newMouseY = event.clientY;

  var deltaX = newMouseX - lastMouseX;
  var deltaY = newMouseY - lastMouseY;
  camera.position.x += deltaX * 0.01;
  camera.position.y += deltaY * 0.01;

  lastMouseX = newMouseX;
  lastMouseY = newMouseY;
});
document.addEventListener('mousedown', function(event) {
  isMouseDown = true;
  lastMouseX = event.clientX;
  lastMouseY = event.clientY;
});
document.addEventListener('mouseup', function(event) {
  isMouseDown = false;
  lastMouseX = null;
  lastMouseY = null;
});


// Render the scene
function render() {
  requestAnimationFrame(render);
  line.rotation.x += 0.01;
  line.rotation.y += 0.01;
  renderer.render(scene, camera);
}

//........................
setColor();
render();
setInterval(setColor, 1000)
