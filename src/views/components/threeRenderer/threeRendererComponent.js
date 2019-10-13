import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";

class ThreeRenderer extends Component {
  componentDidMount() {
    const camera = this.initCamera();
    const objects = this.initObjects();
    const scene = this.initScene(objects);
    const renderer = this.initRenderer();

    const animate = function() {
      requestAnimationFrame(animate);
      objects.cube.rotation.x += 0.01;
      objects.cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();
  }
  initRenderer = () => {
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    // document.body.appendChild( renderer.domElement );
    // use ref as a mount point of the Three.js scene instead of the document.body
    this.mount.appendChild(renderer.domElement);
    return renderer
  }
  initScene = (objects) => {
    const scene = new THREE.Scene();
    Object.keys(objects).forEach((key)=>{
      scene.add(objects[key]);
    })
    return scene
  }
  initCamera = () => {
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    return camera;
  }
  initObjects = () => {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    let objects = {
      cube
    };
    return objects;
  }
  render() {
    return <div ref={ref => (this.mount = ref)} />;
  }
}

export default ThreeRenderer;
