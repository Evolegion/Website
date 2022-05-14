import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const container = document.getElementById('heart-container')  

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera( 75, container.clientWidth / container.clientHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer({alpha: true});

var controls = new OrbitControls( camera, renderer.domElement );
controls.enablePan = false;
controls.enableZoom = false;

renderer.setSize( container.clientWidth, container.clientHeight );
container.appendChild( renderer.domElement );


var geometry = new THREE.SphereGeometry(3, 22, 9);

var material = new THREE.MeshPhongMaterial();
var scene = new THREE.Scene();
var spotLight = new THREE.SpotLight(0xeeeece);
spotLight.position.set(1000, 1000, 1000);
scene.add(spotLight);

var spotLight2 = new THREE.SpotLight(1234567890);
spotLight2.position.set(-200, -200, -200);
scene.add(spotLight2);

var material = new THREE.MeshBasicMaterial({
  color: 0xff0099,
  specular: 0xbcbcbc,
  wireframe: true
  //color: 0xdaa520
});



var sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

camera.position.z = 6;

function render() {
  requestAnimationFrame(render);
  sphere.rotation.x += 0.01;
  sphere.rotation.y += 0.01;
renderer.render(scene, camera);
}
render();