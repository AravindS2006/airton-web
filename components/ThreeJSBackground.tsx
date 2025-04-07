'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';

export default function ThreeJSBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    const posArray = new Float32Array(particlesCount * 3);
    const colorsArray = new Float32Array(particlesCount * 3);
    
    // Color palette - more subtle colors
    const colors = [
      new THREE.Color('#3B82F6').multiplyScalar(0.5), // Blue (darker)
      new THREE.Color('#8B5CF6').multiplyScalar(0.5), // Purple (darker)
      new THREE.Color('#10B981').multiplyScalar(0.5), // Green (darker)
      new THREE.Color('#F59E0B').multiplyScalar(0.5), // Amber (darker)
      new THREE.Color('#EC4899').multiplyScalar(0.5), // Pink (darker)
    ];
    
    for (let i = 0; i < particlesCount * 3; i += 3) {
      // Position in a spherical pattern with randomization
      const radius = 5 + (Math.random() * 5);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      posArray[i] = radius * Math.sin(phi) * Math.cos(theta);
      posArray[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      posArray[i + 2] = radius * Math.cos(phi);
      
      // Apply some random offset for more natural look
      posArray[i] += (Math.random() - 0.5) * 2;
      posArray[i + 1] += (Math.random() - 0.5) * 2;
      posArray[i + 2] += (Math.random() - 0.5) * 2;
      
      // Color
      const color = colors[Math.floor(Math.random() * colors.length)];
      colorsArray[i] = color.r;
      colorsArray[i + 1] = color.g;
      colorsArray[i + 2] = color.b;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));
    
    // Create material with custom shader
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.015,
      vertexColors: true,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });
    
    // Create mesh
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Create floating eye model
    const eyeGeometry = new THREE.SphereGeometry(1, 32, 32);
    const eyeMaterial = new THREE.MeshPhysicalMaterial({
      color: '#ffffff',
      metalness: 0.1,
      roughness: 0.1,
      transmission: 0.9,
      thickness: 0.5,
      transparent: true,
      opacity: 0.6,
      envMapIntensity: 1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });
    
    const eye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    eye.position.set(-2, 0, 0);
    scene.add(eye);
    
    // Create iris
    const irisGeometry = new THREE.CircleGeometry(0.4, 32);
    const irisMaterial = new THREE.MeshBasicMaterial({
      color: '#3B82F6',
      side: THREE.DoubleSide,
    });
    
    const iris = new THREE.Mesh(irisGeometry, irisMaterial);
    iris.position.set(-1.0, 0, 0);
    iris.rotation.y = Math.PI / 2;
    scene.add(iris);
    
    // Create pupil
    const pupilGeometry = new THREE.CircleGeometry(0.15, 32);
    const pupilMaterial = new THREE.MeshBasicMaterial({
      color: '#000000',
      side: THREE.DoubleSide,
    });
    
    const pupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
    pupil.position.set(-0.99, 0, 0);
    pupil.rotation.y = Math.PI / 2;
    scene.add(pupil);
    
    // Create floating neural network nodes
    const nodes: THREE.Mesh[] = [];
    const connections: THREE.Line[] = [];
    const nodeCount = 15;
    const nodePositions: THREE.Vector3[] = [];
    
    for (let i = 0; i < nodeCount; i++) {
      // Create node geometries and materials
      const nodeGeometry = new THREE.SphereGeometry(0.15, 16, 16);
      
      // Use color gradient based on position
      const color = new THREE.Color();
      color.setHSL(i / nodeCount, 0.7, 0.5);
      
      const nodeMaterial = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.8,
      });
      
      const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
      
      // Position in a neural network pattern (right side of eye)
      const x = 1 + Math.random() * 3;
      const y = (Math.random() - 0.5) * 3;
      const z = (Math.random() - 0.5) * 3;
      
      node.position.set(x, y, z);
      nodePositions.push(node.position.clone());
      
      nodes.push(node);
      scene.add(node);
    }
    
    // Create connections between nodes
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (nodePositions[i].distanceTo(nodePositions[j]) < 2) {
          const connectionGeometry = new THREE.BufferGeometry().setFromPoints([
            nodePositions[i],
            nodePositions[j]
          ]);
          
          // Gradient color from node i to node j
          const colorI = new THREE.Color();
          colorI.setHSL(i / nodeCount, 0.7, 0.5);
          const colorJ = new THREE.Color();
          colorJ.setHSL(j / nodeCount, 0.7, 0.5);
          
          const colors = new Float32Array([
            colorI.r, colorI.g, colorI.b,
            colorJ.r, colorJ.g, colorJ.b
          ]);
          
          connectionGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
          
          const connectionMaterial = new THREE.LineBasicMaterial({
            vertexColors: true,
            transparent: true,
            opacity: 0.4,
            blending: THREE.AdditiveBlending,
          });
          
          const connection = new THREE.Line(connectionGeometry, connectionMaterial);
          connections.push(connection);
          scene.add(connection);
        }
      }
    }
    
    // Create subtle light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Create point lights for eye highlight
    const pointLight1 = new THREE.PointLight(0x3B82F6, 1, 2);
    pointLight1.position.set(-1.2, 0.2, 0.5);
    scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0x8B5CF6, 0.8, 2);
    pointLight2.position.set(-1, -0.3, 0.2);
    scene.add(pointLight2);
    
    // Position camera
    camera.position.z = 6;
    
    // Mouse movement effect for parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    
    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Animation
    const clock = new THREE.Clock();
    
    const animate = () => {
      requestAnimationFrame(animate);
      
      const elapsedTime = clock.getElapsedTime();
      
      // Smooth mouse movement for parallax effect
      targetX = mouseX * 0.5;
      targetY = mouseY * 0.5;
      
      // Rotate particles with parallax effect
      particlesMesh.rotation.y = elapsedTime * 0.05 + targetX * 0.5;
      particlesMesh.rotation.x = elapsedTime * 0.03 + targetY * 0.5;
      
      // Add slight wave effect to particles
      for (let i = 0; i < particlesCount * 3; i += 3) {
        const x = particlesGeometry.getAttribute('position').array[i];
        const y = particlesGeometry.getAttribute('position').array[i + 1];
        
        // Apply wave effect
        particlesGeometry.getAttribute('position').array[i + 2] += Math.sin(elapsedTime + x + y) * 0.001;
      }
      
      particlesGeometry.getAttribute('position').needsUpdate = true;
      
      // Animate the eye
      eye.rotation.y = Math.sin(elapsedTime * 0.3) * 0.2 + targetX;
      eye.rotation.x = Math.sin(elapsedTime * 0.4) * 0.1 + targetY;
      
      // Make the pupil follow mouse
      pupil.position.x = -0.99;
      pupil.position.y = targetY * 0.1;
      pupil.position.z = targetX * 0.1;
      
      iris.position.x = -1.0;
      iris.position.y = targetY * 0.05;
      iris.position.z = targetX * 0.05;
      
      // Animate neural network nodes
      nodes.forEach((node, index) => {
        node.position.y += Math.sin(elapsedTime + index) * 0.003;
        node.position.z += Math.cos(elapsedTime + index) * 0.003;
        
        // Pulse effect for nodes
        const scale = 1 + 0.2 * Math.sin(elapsedTime * 2 + index);
        node.scale.set(scale, scale, scale);
      });
      
      // Camera movement based on mouse for parallax
      camera.position.x = targetX * 0.5;
      camera.position.y = targetY * 0.5;
      camera.lookAt(0, 0, 0);
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
      
      // Dispose of geometries and materials
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      eyeGeometry.dispose();
      eyeMaterial.dispose();
      irisGeometry.dispose();
      irisMaterial.dispose();
      pupilGeometry.dispose();
      pupilMaterial.dispose();
      
      nodes.forEach(node => {
        node.geometry.dispose();
        (node.material as THREE.Material).dispose();
      });
      
      connections.forEach(connection => {
        connection.geometry.dispose();
        (connection.material as THREE.Material).dispose();
      });
    };
  }, []);

  return (
    <>
      <div ref={mountRef} className="fixed inset-0 z-0" />
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-[1px]" />
    </>
  );
}