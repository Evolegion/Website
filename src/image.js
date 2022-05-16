import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import img from './assets/images/art-engine.png'
import img2 from './assets/images/dojang.png'

class Image{
  constructor(_containerId, _imageName){
    this.containerId = _containerId;
    this.imageName = _imageName;
  }

    createWorld() {
      const container = document.getElementById(this.containerId);  
      const textureLoader = new THREE.TextureLoader();
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera( 75, container.clientWidth / container.clientHeight, 0.1, 1000 );
      const renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});

      const controls = new OrbitControls( camera, renderer.domElement );
      controls.enablePan = false;
      controls.enableZoom = false;
      controls.enabled = false;

      renderer.setSize( container.clientWidth, container.clientHeight );
      container.appendChild( renderer.domElement );

      const spotLight = new THREE.SpotLight(0xeeeece);
      spotLight.position.set(1000, 1000, 1000);
      scene.add(spotLight);

      const spotLight2 = new THREE.SpotLight(1234567890);
      spotLight2.position.set(-200, -200, -200);
      scene.add(spotLight2);

      let material = new THREE.MeshBasicMaterial({
        map: textureLoader.load(this.imageName),
        side: THREE.DoubleSide
      });

      let geometry = new THREE.PlaneBufferGeometry(5.3, 3, 20, 20);

      const planeCurve = (g, z) => {
        let p = g.parameters;
        let hw = p.width * 0.5;
        
        let a = new THREE.Vector2(-hw, 0);
        let b = new THREE.Vector2(0, z);
        let c = new THREE.Vector2(hw, 0);
        
        let ab = new THREE.Vector2().subVectors(a, b);
        let bc = new THREE.Vector2().subVectors(b, c);
        let ac = new THREE.Vector2().subVectors(a, c);
        
        let r = (ab.length() * bc.length() * ac.length()) / (2 * Math.abs(ab.cross(ac)));
        
        let center = new THREE.Vector2(0, z - r);
        let baseV = new THREE.Vector2().subVectors(a, center);
        let baseAngle = baseV.angle() - (Math.PI * 0.5);
        let arc = baseAngle * 2;
        
        let uv = g.attributes.uv;
        let pos = g.attributes.position;
        let mainV = new THREE.Vector2();
        for (let i = 0; i < uv.count; i++){
          let uvRatio = 1 - uv.getX(i);
          let y = pos.getY(i);
          mainV.copy(c).rotateAround(center, (arc * uvRatio));
          pos.setXYZ(i, mainV.x, y, -mainV.y);
      }
      
      pos.needsUpdate = true;
      
      }

      planeCurve(geometry, 0.2);

      let mesh = new THREE.Mesh(geometry, material);
      mesh.rotation.y = -0.2;

      scene.add(mesh);
      camera.position.z = 3;

      renderer.render(scene, camera);
    }
}

const image1 = new Image('image-1-container', img);
const image2 = new Image('image-2-container', img2);

image1.createWorld();
image2.createWorld();


