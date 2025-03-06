import Link from "next/link"

const Navbar = () => {
  return (
    <div>
        <nav className="flex gap-3 text-4xl text-center justify-center">
        <Link href="/">Home</Link>
        <Link href="/project">Project</Link>
        <Link href="/blog">Blog</Link>
      </nav>

    </div>
  )
}
export default Navbar