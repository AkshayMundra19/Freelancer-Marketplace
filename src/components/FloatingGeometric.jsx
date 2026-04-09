import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, MeshWobbleMaterial } from '@react-three/drei';

const Shape = () => {
  const meshRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.x = Math.cos(time / 4) / 2;
    meshRef.current.rotation.y = Math.sin(time / 4) / 2;
    meshRef.current.rotation.z = Math.sin(time / 4) / 2;
    meshRef.current.position.y = Math.sin(time / 2) / 4;
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color="#3b82f6"
          speed={3}
          distort={0.4}
          radius={1}
          emissive="#1d4ed8"
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
};

const LittleSphere = ({ position, color }) => {
  return (
    <Float speed={5} rotationIntensity={2} floatIntensity={2}>
      <Sphere args={[0.1, 32, 32]} position={position}>
        <MeshWobbleMaterial color={color} speed={2} factor={0.6} />
      </Sphere>
    </Float>
  );
};

const FloatingGeometric = () => {
  return (
    <div className="w-full h-[500px] cursor-pointer">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <Shape />
        <LittleSphere position={[2, 1, 0]} color="#8b5cf6" />
        <LittleSphere position={[-2, -1, 1]} color="#10b981" />
        <LittleSphere position={[1.5, -2, -1]} color="#f43f5e" />
      </Canvas>
    </div>
  );
};

export const FloatingGeometricMini = () => {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 3], fov: 40 }}>
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} />
        <Float speed={5} rotationIntensity={3}>
           <mesh>
             <boxGeometry args={[1, 1, 1]} />
             <MeshDistortMaterial
               color="#3b82f6"
               speed={5}
               distort={0.4}
               roughness={0}
               metalness={1}
             />
           </mesh>
        </Float>
      </Canvas>
    </div>
  );
};

export default FloatingGeometric;

