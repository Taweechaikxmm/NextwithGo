const Home = () => {
  return (
    <div className="bg-gray-50 flex flex-col justify-center py-12 px-6 lg:px-8">
      {/* Container */}
      <div className="sm:text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
          Welcome to Our <span className="text-indigo-600">Next.js & Go</span> Template!
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          This is a starter template to build scalable and efficient web applications with Next.js and Go.
        </p>
      </div>

      {/* Features Section */}
      <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
        {/* Feature 1 */}
        <div className="flex flex-col items-center p-6 bg-white shadow-lg rounded-lg">
          <img
            src="/next.svg"
            alt="Next.js"
            className="w-16 h-16 mb-4"
          />
          <h3 className="text-xl font-semibold text-gray-900">Next.js</h3>
          <p className="mt-2 text-gray-600 text-center">
            A powerful React framework for building dynamic and SEO-friendly applications.
          </p>
        </div>
        {/* Feature 2 */}
        <div className="flex flex-col items-center p-6 bg-white shadow-lg rounded-lg">
          <img
            src="/go.png"
            alt="Go"
            className="w-16 h-16 mb-4"
          />
          <h3 className="text-xl font-semibold text-gray-900">Go</h3>
          <p className="mt-2 text-gray-600 text-center">
            A fast, simple, and efficient language for building backend services with high performance.
          </p>
        </div>
        {/* Feature 3 */}
        <div className="flex flex-col items-center p-6 bg-white shadow-lg rounded-lg">
          <img
            src="/tailwindcss.png"
            alt="Tailwind CSS"
            className="w-16 h-16 mb-4"
          />
          <h3 className="text-xl font-semibold text-gray-900">Tailwind CSS</h3>
          <p className="mt-2 text-gray-600 text-center">
            A utility-first CSS framework for building responsive, custom designs quickly.
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-16 text-center">
        <a
          href="/project"
          className="inline-block px-6 py-3 text-lg font-semibold text-white  bg-black rounded-lg shadow-md hover:bg-gray-600 transition duration-300"
        >
          Get Started Now
        </a>
      </div>
    </div>
  );
};

export default Home;
