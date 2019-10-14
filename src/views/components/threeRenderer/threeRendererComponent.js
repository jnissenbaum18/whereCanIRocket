import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";

import "./threeRender.scss";

class ThreeRenderer extends Component {
  componentDidMount() {
    const camera = this.initCamera();
    const objects = this.initObjects();
    const scene = this.initScene(objects);
    const renderer = this.initRenderer();

    const animate = time => {
      const canvas = renderer.domElement;
      if (this.resizeRendererToDisplaySize(canvas)) {
        renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      }

      time *= 0.001;
      requestAnimationFrame(animate);
      objects.forEach((object, idx) => {
        if (object.animation) {
          object.animation(object, time, idx);
        }
      });
      renderer.render(scene, camera);
    };
    animate();
  }
  resizeRendererToDisplaySize(canvas) {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    return needResize;
  }
  initRenderer = () => {
    const renderer = new THREE.WebGLRenderer();
    // document.body.appendChild( renderer.domElement );
    // use ref as a mount point of the Three.js scene instead of the document.body
    this.mount.appendChild(renderer.domElement);
    return renderer;
  };
  initScene = objects => {
    const scene = new THREE.Scene();
    // scene.background = new THREE.Color(0xaaaaaa);
    objects.forEach(object => {
      if (object.parent) {
        object.parent.add(object.mesh);
      } else {
        scene.add(object.mesh);
      }
    });
    return scene;
  };
  initCamera = () => {
    const fieldOfView = 40;
    const aspectRatio = window.innerWidth / window.innerHeight;
    const near = 0.1;
    const far = 1000;
    const camera = new THREE.PerspectiveCamera(
      fieldOfView,
      aspectRatio,
      near,
      far
    );
    camera.position.set(0, 50, 0);
    camera.up.set(0, 0, 1);
    camera.lookAt(0, 0, 0);
    return camera;
  };
  initObjects = () => {
    // const makeCube = (cubeGeometry, color, x) => {
    //   const cubeMaterial = new THREE.MeshPhongMaterial({ color });
    //   const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
    //   cubeMesh.position.set(x, 0, 0);

    //   const cube = {
    //     mesh: cubeMesh,
    //     animation: (time, idx) => {
    //       const speed = 1 + idx * 0.1;
    //       const rot = time * speed;
    //       cubeMesh.rotation.x = rot;
    //       cubeMesh.rotation.y = rot;
    //     }
    //   };

    //   return cube;
    // };
    // const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);

    const lightColor = 0xffffff;
    const lightIntensity = 3;
    const lightMesh = new THREE.PointLight(lightColor, lightIntensity);
    // lightMesh.position.set(-1, 2, 4);
    const light = {
      mesh: lightMesh
    };

    const spread = 15;

    const createMaterial = () => {
      const material = new THREE.MeshPhongMaterial({
        side: THREE.DoubleSide
      });
      const hue = Math.random();
      const saturation = 1;
      const luminance = 0.5;
      material.color.setHSL(hue, saturation, luminance);

      return material;
    };

    const addSolidGeomerty = (x, y, geometry) => {
      const mesh = new THREE.Mesh(geometry, createMaterial());
      // mesh.position.x = x * spread;
      // mesh.position.y = y * spread;
      return {
        mesh
      };
    };

    const addLineGeometry = (x, y, geometry) => {
      const material = new THREE.LineBasicMaterial({ color: 0x000000 });
      const mesh = new THREE.LineSegments(geometry, material);
      mesh.position.x = x * spread;
      mesh.position.y = y * spread;
      return {
        mesh
      };
    };

    let objects = [light];

    const solarSystem = new THREE.Object3D();
    objects.push({
      mesh: solarSystem,
      animation: (object, time) => {
        object.mesh.rotation.y = time;
      }
    });

    const radius = 1;
    const widthSegments = 6;
    const heightSegments = 6;
    const sphereGeometry = new THREE.SphereBufferGeometry(
      radius,
      widthSegments,
      heightSegments
    );
    const sunMaterial = new THREE.MeshPhongMaterial({ emissive: 0xffff00 });
    const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
    sunMesh.scale.set(5, 5, 5);
    objects.push({
      mesh: sunMesh,
      animation: (object, time) => {
        object.mesh.rotation.y = time;
      },
      parent: solarSystem
    });

    const earthMaterial = new THREE.MeshPhongMaterial({
      color: 0x2233ff,
      emissive: 0x112244
    });
    const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial);
    earthMesh.position.x = 10;
    objects.push({
      mesh: earthMesh,
      animation: (object, time) => {
        object.mesh.rotation.y = time;
      },
      parent: solarSystem
    });

    return objects;
  };
  render() {
    return <div className="renderer-canvas" ref={ref => (this.mount = ref)} />;
  }
}

export default ThreeRenderer;
