import { CameraControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { Vector3 } from "three";

export default function Rig({
  position = new Vector3(0, 0, 2),
  focus = new Vector3(0, 0, 0),
}) {
  const { controls, scene } = useThree();
  const params = useParams();
  useEffect(() => {
    const active = scene.getObjectByName(params?.project as string);
    if (active) {
      active?.parent?.localToWorld(position.set(0, 0.5, 0.25));
      active?.parent?.localToWorld(focus.set(0, 0, -2));
    }
    // @ts-expect-error
    controls?.setLookAt(...position.toArray(), ...focus.toArray(), true);
  });
  return (
    <CameraControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2} />
  );
}
