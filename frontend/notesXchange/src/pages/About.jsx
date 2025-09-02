import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-4 text-center">
      <motion.h1
        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        About{" "}
        <span className="font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Notes<span className="text-gray-800">X</span>change
        </span>
      </motion.h1>

      <motion.p
        className="mt-4 max-w-2xl text-gray-600 leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        NotesXchange is a platform built for students and learners to{" "}
        <span className="font-medium text-gray-800">
          share, explore, and access study notes
        </span>{" "}
        easily. Whether you’re preparing for exams, revising concepts, or
        contributing your own knowledge, NotesXchange helps you stay organized
        and connected with like-minded learners.
      </motion.p>

      <motion.div
        className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition">
          <h3 className="text-xl font-semibold text-indigo-600">
            📘 Upload Notes
          </h3>
          <p className="mt-2 text-gray-600 text-sm">
            Share your knowledge by uploading notes and helping others learn.
          </p>
        </div>
        <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition">
          <h3 className="text-xl font-semibold text-green-600">
            🔍 Explore Notes
          </h3>
          <p className="mt-2 text-gray-600 text-sm">
            Discover a wide range of notes from different subjects and topics.
          </p>
        </div>
        <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition">
          <h3 className="text-xl font-semibold text-orange-600">
            🤝 Collaborate
          </h3>
          <p className="mt-2 text-gray-600 text-sm">
            Connect with fellow learners and grow your knowledge together.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
