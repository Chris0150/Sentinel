import React from 'react'
import { useLoader } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { draco } from 'drei'

export default function Model(props) {
  const { nodes, materials } = useLoader(GLTFLoader, '/scene_draco.glb', draco())
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={[0.01, 0.01, 0.01]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group rotation={[-Math.PI / 2, 0, 0]} scale={[100, 100, 100]}>
            <mesh geometry={nodes.Circle011_EyeFire_0.geometry}>
              <meshBasicMaterial attach="material" color="yellow" />
            </mesh>
            <mesh
              material={materials.SerpentBake}
              geometry={nodes.Circle011_SerpentBake_0.geometry}
              material-metalness={0}
            />
          </group>
          <group position={[-1018.2, -380.5, 1332.6]} rotation={[-1, 0.72, -0.08]} scale={[100, 100, 100]}>
            <mesh geometry={nodes.Hide003_EyeFire_0.geometry}>
              <meshBasicMaterial attach="material" color="white" />
            </mesh>
            <mesh material={materials.Boat2Bake} geometry={nodes.Hide003_Boat2Bake_0.geometry} />
          </group>
          <group position={[349.5, 32.3, 176.6]} rotation={[-1.72, -0.23, -2.64]} scale={[100, 100, 100]}>
            <mesh geometry={nodes.Keel002_EyeFire_0.geometry}>
              <meshBasicMaterial attach="material" color="white" />
            </mesh>
            <mesh material={materials.Boat1Bake} geometry={nodes.Keel002_Boat1Bake_0.geometry} />
          </group>
          <group position={[0, 27, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[100, 100, 170]} />
          <group rotation={[-Math.PI / 2, 0, 0]} scale={[100, 100, 100]}>
            <mesh material={materials.RockBake} geometry={nodes.Rock021_RockBake_0.geometry} material-metalness={0.5} />
          </group>
          <group scale={[100, 100, 100]}>
            <mesh material={materials.Objects} geometry={nodes.VikingShipObjects001_Objects_0.geometry} />
            <mesh material={materials.Objects} geometry={nodes.VikingShipObjects001_Objects_0001.geometry} />
          </group>
        </group>
      </group>
    </group>
  )
}