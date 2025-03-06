const ProjectDetail = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params; // การใช้
  console.log(id);
  await new Promise((resolve) => setInterval(resolve, 3000));
  return <div>ProjectDetail</div>;
};
export default ProjectDetail;
