import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";

class ThreeRenderer extends Component {
  componentDidMount() {
    const camera = this.initCamera();
    const objects = this.initObjects();
    const scene = this.initScene(objects);
    const renderer = this.initRenderer();

    const animate = function(time) {
      time *= 0.001;
      requestAnimationFrame(animate);
      objects.forEach((object, idx) => {
        if (object.animation) {
          object.animation(time, idx);
        }
      });
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
    return renderer;
  };
  initScene = objects => {
    const scene = new THREE.Scene();
    objects.forEach(object => {
      scene.add(object.mesh);
    });
    return scene;
  };
  initCamera = () => {
    const fieldOfView = 75;
    const aspectRatio = window.innerWidth / window.innerHeight;
    const near = 0.1;
    const far = 500;
    const camera = new THREE.PerspectiveCamera(
      fieldOfView,
      aspectRatio,
      near,
      far
    );
    camera.position.set(0, 0, 5);
    camera.lookAt(0, 0, 0);
    return camera;
  };
  initObjects = () => {
    const makeCube = (cubeGeometry, color, x) => {
      const cubeMaterial = new THREE.MeshPhongMaterial({ color });
      const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
      cubeMesh.position.set(x, 0, 0);

      const cube = {
        mesh: cubeMesh,
        animation: (time, idx) => {
          const speed = 1 + idx * 0.1;
          const rot = time * speed;
          cubeMesh.rotation.x = rot;
          cubeMesh.rotation.y = rot;
        }
      };

      return cube;
    };
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);

    const lightColor = 0xffffff;
    const lightIntensity = 1;
    const lightMesh = new THREE.DirectionalLight(lightColor, lightIntensity);
    lightMesh.position.set(-1, 2, 4);
    const light = {
      mesh: lightMesh
    };

    let objects = [
      light,
      makeCube(cubeGeometry, 0x44aa88, 0),
      makeCube(cubeGeometry, 0x8844aa, -2),
      makeCube(cubeGeometry, 0xaa8844, 2)
    ];
    return objects;
  };
  render() {
    return <div ref={ref => (this.mount = ref)} />;
  }
}

export default ThreeRenderer;
