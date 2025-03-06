const Blog = async () => {
    await new Promise((resolve)=>setInterval(resolve,3000));
  return (
    <div>Blog</div>
  )
}
export default Blog