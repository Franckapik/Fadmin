/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useGLTF, PerspectiveCamera, useAnimations } from "@react-three/drei";
import { useEffect } from "react";

export default function Model(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/asup.glb");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    console.log(actions);
    actions.Lever.play();
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group
          name="Light"
          position={[4.08, 5.9, -1.01]}
          rotation={[1.89, 0.88, -2.05]}
        />
        <group
          name="Camera"
          position={[7.36, 4.96, 6.93]}
          rotation={[1.24, 0.33, -0.76]}
        >
          <PerspectiveCamera
            name="Camera_Orientation"
            makeDefault={true}
            far={100}
            near={0.1}
            fov={22.9}
            rotation={[-Math.PI / 2, 0, 0]}
          />
        </group>
        <mesh
          name="Cube"
          castShadow
          receiveShadow
          geometry={nodes.Cube.geometry}
          material={materials.Material}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/asup.glb");
