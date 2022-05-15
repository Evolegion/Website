import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const container = document.getElementById('moon-container')   
var textureURL = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/17271/lroc_color_poles_1k.jpg"; 
var displacementURL = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/17271/ldem_3_8bit.jpg"; 

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera( 75, container.clientWidth / container.clientHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});

var controls = new OrbitControls( camera, renderer.domElement );
controls.enablePan = false;
controls.enableZoom = false;

renderer.setSize( container.clientWidth, container.clientHeight );
container.appendChild( renderer.domElement );

var geometry = new THREE.SphereGeometry( 2,60,60 );

var textureLoader = new THREE.TextureLoader();
var texture = textureLoader.load( textureURL );
var displacementMap = textureLoader.load( displacementURL );

var material = new THREE.MeshPhongMaterial ( 
  { 
  map: texture,
     displacementMap: displacementMap,
  displacementScale: 0.06,
  bumpMap: displacementMap,
  bumpScale: 0.04,
   reflectivity:0, 
   shininess :0
  } 

);

var moon = new THREE.Mesh( geometry, material );


const light = new THREE.DirectionalLight(0xFFFFFF, 1);
light.position.set(-100, 10,50);
scene.add(light);


hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.1 );
hemiLight.color.setHSL( 0.6, 1, 0.6 );
hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
hemiLight.position.set( 0, 0, 0 );
scene.add( hemiLight );

scene.add( moon );
camera.position.z = 4;

moon.rotation.x = 3.1415*0.02;
moon.rotation.y = 3.1415*1.54;


function animate() {
	requestAnimationFrame( animate );
  moon.rotation.y += 0.002;
  moon.rotation.x += 0.0001;

	renderer.render( scene, camera );
}
animate();


// function onResize() {
//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();
//   renderer.setSize(window.innerWidth, window.innerHeight);
// }

// window.addEventListener('resize', onResize, false);
