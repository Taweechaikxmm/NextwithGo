import Link from "next/link";

const Navbar = () => {
  return (
    <div>
      <nav className="bg-black p-1 shadow-lg" style={{ height: '10vh' }}>
        <div className="max-w-7xl mx-auto flex justify-between items-center h-full">
          <div className="text-white text-3xl font-semibold">
            <Link href="/">
              <img src="/logo.png" alt="Logo" className="w-16 h-16 m-1" />
            </Link>
          </div>
          <div className="hidden md:flex gap-6 text-white">
            <Link href="/" className="px-4 py-2 rounded-lg transition-all">
              Home
            </Link>
            <Link
              href="/project"
              className="px-4 py-2 rounded-lg transition-all"
            >
              Project
            </Link>
            <Link href="/blog" className="px-4 py-2 rounded-lg transition-all">
              Blog
            </Link>
          </div>
          <div className="md:hidden flex items-center">
            <button className="text-white text-3xl">☰</button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
