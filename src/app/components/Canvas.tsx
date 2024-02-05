"use client";
import Image from "next/image";
import { ReactNode, useEffect, useRef, useState } from "react";
import Loading from "../components/Loading";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import {
  useCursor,
  MeshPortalMaterial,
  CameraControls,
  Gltf,
  Text,
} from "@react-three/drei";
import { easing, geometry } from "maath";
import { useParams, useRouter } from "next/navigation";
import { DoubleSide, Vector3 } from "three";
import Rig from "../components/Rig";
import Frame from "../components/Frame";

extend(geometry);

export default function CanvasContainer({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const [loading, setLoading] = useState(process.env.NODE_ENV === "production");

  if (loading) return <Loading setLoading={setLoading} />;

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-between p-24"
      ref={ref}
    >
      <Canvas
        camera={{ fov: 75, position: [0, 0, 20] }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
        }}
        eventSource={ref.current}
        eventPrefix="client"
      >
        <color attach="background" args={["#f0f0f0"]} />
        {/* {tea} */}
        <Frame id="02" name="tea" author="Omar Faruq Tawsif">
          <Gltf src="/fiesta_tea-transformed.glb" position={[0, -2, -3]} />
        </Frame>
        {children}
        <Rig />
      </Canvas>
    </main>
  );
}
