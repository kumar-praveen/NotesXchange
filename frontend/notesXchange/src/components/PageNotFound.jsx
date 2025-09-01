import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
      {/* Big 404 Text */}
      <h1 className="text-8xl font-extrabold text-gray-300">404</h1>

      {/* Message */}
      <h2 className="mt-4 text-3xl font-semibold text-gray-800">
        Oops! Page not found
      </h2>
      <p className="mt-2 text-gray-600 max-w-md">
        The page you’re looking for doesn’t exist or has been moved. Let’s get
        you back on track!
      </p>

      {/* Back to Home Button */}
      <Link
        to="/"
        className="mt-6 px-6 py-3 rounded-2xl bg-indigo-600 text-white text-lg font-medium shadow-md hover:bg-indigo-700 transition-all"
      >
        Back to Home
      </Link>

      {/* Decorative */}
      <div className="mt-10 flex space-x-4 opacity-40">
        <span className="w-3 h-3 rounded-full bg-indigo-600"></span>
        <span className="w-3 h-3 rounded-full bg-green-500"></span>
        <span className="w-3 h-3 rounded-full bg-orange-500"></span>
      </div>
    </div>
  );
}
