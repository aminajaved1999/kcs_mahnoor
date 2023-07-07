import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame, useLoader } from 'react-three-fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls,softShadows } from '@react-three/drei';

const Model = () => {
  const modelRef = useRef();

  // Rotation logic
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.003; // Adjust the rotation speed as needed
    }
  });

  const gltf = useLoader(GLTFLoader, 'box.glb');

  return(
    <group ref={modelRef}  position={[0, -1, 0]}>
        <primitive object={gltf.scene} scale={0.4} />
    </group>
  );
   ;
};

const Cargo = () => {
  return (
    <div style={{ height: '30vh' }}>
          <Canvas style={{ height: '100%' }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
     
      <OrbitControls />
      <Suspense fallback={null}>
        <Model />
      </Suspense>
    
    </Canvas>
    </div>
  
  );
};

export default Cargo;