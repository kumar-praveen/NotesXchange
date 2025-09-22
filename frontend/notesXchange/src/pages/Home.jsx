import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BookOpen, Upload, Users } from "lucide-react";
import { useAppStore } from "../store/useAppStore";

const Home = () => {
  const { isLoggedin, userData } = useAppStore();
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col ">
      <section className="flex flex-col items-center justify-center flex-1 px-6 py-16 text-center bg-gradient-to-b from-white to-gray-100">
        <h1 className="text-2xl font-bold">
          Hey, {isLoggedin ? userData.fullname : "User"}
        </h1>
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight"
        >
          Welcome to{" "}
          <span className="font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Notes<span className="text-gray-800">X</span>change
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-4 text-base md:text-lg text-gray-600 max-w-2xl"
        >
          A modern platform to{" "}
          <span className="text-gray-900 font-bold">upload</span>,
          <span className="text-gray-900 font-bold"> share</span>, and
          <span className="text-gray-900 font-bold"> access notes</span> with
          students across the community.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 flex gap-4"
        >
          <Link
            to={`${isLoggedin ? "/notes" : "/login"}`}
            className="px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition font-semibold"
          >
            Get Started
          </Link>
          <Link
            to="/notes"
            className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 hover:border-gray-500 transition font-semibold"
          >
            Browse Notes
          </Link>
        </motion.div>
      </section>

      <section className="bg-white py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
          Why{" "}
          <span className="font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Notes<span className="text-gray-800">X</span>change ?
          </span>
        </h2>
        <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-gray-100 rounded-2xl shadow-md text-center"
          >
            <BookOpen className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Access Notes</h3>
            <p className="text-gray-600">
              Browse and download notes uploaded by students across different
              subjects.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-gray-100 rounded-2xl shadow-md text-center"
          >
            <Upload className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Upload Easily</h3>
            <p className="text-gray-600">
              Share your own notes with the community in just a few clicks.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-gray-100 rounded-2xl shadow-md text-center"
          >
            <Users className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Join Community</h3>
            <p className="text-gray-600">
              Connect with students, collaborate, and grow together.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
