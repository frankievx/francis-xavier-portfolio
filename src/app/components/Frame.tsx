"use client";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import {
  useCursor,
  MeshPortalMaterial,
  CameraControls,
  Gltf,
  Text,
} from "@react-three/drei";
import { easing } from "maath";
import { useParams, useRouter } from "next/navigation";
import { DoubleSide } from "three";

export default function Frame({
  id,
  name,
  author,
  bg,
  width = 1,
  height = 1.61803398875,
  children,
  ...props
}: {
  id: string;
  name: string;
  author: string;
  bg?: string;
  width?: number;
  height?: number;
  children: React.ReactNode;
}) {
  const portal = useRef();
  const router = useRouter();
  const params = useParams();
  const [hovered, hover] = useState(false);
  useCursor(hovered);
  useFrame((state, dt) =>
    easing.damp(portal.current, "blend", params?.id === id ? 1 : 0, 0.2, dt)
  );
  return (
    <group {...props}>
      {/* <Text
        font={"/Inter-Regular.woff"}
        fontSize={0.3}
        anchorY="top"
        anchorX="left"
        lineHeight={0.8}
        position={[-0.375, 0.715, 0.01]}
        material-toneMapped={false}
      >
        {name}
      </Text> */}
      {/* <Text
        fontSize={0.1}
        anchorX="right"
        position={[0.4, -0.659, 0.01]}
        material-toneMapped={false}
      >
        /{id}
      </Text>
      <Text
        fontSize={0.04}
        anchorX="right"
        position={[0.0, -0.677, 0.01]}
        material-toneMapped={false}
      >
        {author}
      </Text> */}
      <mesh
        name={name}
        onDoubleClick={(e) => {
          console.log("test");
          console.log("e.object", e.object);
          // e.stopPropagation();
          router.push("/" + e.object.name);
        }}
        onPointerOver={(e) => hover(true)}
        onPointerOut={() => hover(false)}
      >
        <roundedPlaneGeometry args={[width, height, 0.1]} />
        <MeshPortalMaterial
          ref={portal}
          events={params?.id === id}
          side={DoubleSide}
        >
          <color attach="background" args={[bg]} />
          {children}
        </MeshPortalMaterial>
      </mesh>
    </group>
  );
}
