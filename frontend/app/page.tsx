const Index = async() => {
  await new Promise((resolve)=>setInterval(resolve,3000));
  return (
    <div>Index</div>
  )
}
export default Index