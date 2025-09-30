import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BookOpen, Upload, Users } from "lucide-react";
import { useAppStore } from "../store/useAppStore";

const Home = () => {
  const { isLoggedin, userData } = useAppStore();
  return (
    <section className="min-h-full w-full text-gray-900 flex flex-col">
      <div className="flex flex-col items-center justify-center flex-1 px-6 py-16 text-center">
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
      </div>
    </section>
  );
};

export default Home;
