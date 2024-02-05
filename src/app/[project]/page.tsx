export async function generateStaticParams() {
  const projects = ["tea", "pickles", "still"];
  // return projects;
  return projects.map((project) => ({
    project,
  }));
}

export default function Project() {
  console.log("what is this");
  return (
    <></>
    // <Frame id="02" name="tea" author="Omar Faruq Tawsif">
    //   <Gltf src="fiesta_tea-transformed.glb" position={[0, -2, -3]} />
    // </Frame>
  );
}
