const ProjectDetail = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params; // การใช้
  console.log(id);
  await new Promise((resolve) => setInterval(resolve, 3000));

  return (
    <div className="flex items-center justify-center p-10">
      <div className="text-6xl font-bold text-center text-black">ID : {id}</div>
    </div>
  );
};
export default ProjectDetail;
