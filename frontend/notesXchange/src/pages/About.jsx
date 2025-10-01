import { motion } from "framer-motion";
import { BookOpen, Upload, Users } from "lucide-react";

export default function About() {
  return (
    <section className="flex flex-col gap-8 items-center justify-center min-h-full w-full text-center">
      {/* Top Section */}
      <div className="w-[90%] mx-auto flex flex-col items-start gap-3">
        <motion.h1
          className="text-2xl lg:text-3xl font-semibold text-gray-800"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          About{" "}
          <span className="font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Notes<span className="text-gray-800">X</span>change
          </span>
        </motion.h1>

        <motion.p
          className="max-w-3xl text-gray-600 leading-relaxed text-justify"
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
          className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <div className="p-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-indigo-600 text-nowrap">
              📘 Upload Notes
            </h3>
            <p className="mt-2 text-gray-600 text-sm">
              Share your knowledge by uploading notes and helping others learn.
            </p>
          </div>
          <div className="p-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-green-600 text-nowrap">
              🔍 Explore Notes
            </h3>
            <p className="mt-2 text-gray-600 text-sm">
              Discover a wide range of notes from different subjects and topics.
            </p>
          </div>
          <div className="p-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-orange-600">
              🤝 Collaborate
            </h3>
            <p className="mt-2 text-gray-600 text-sm">
              Connect with fellow learners and grow your knowledge together.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Bottom Section */}
      <motion.div
        className="w-[90%] mx-auto flex flex-col gap-4 items-start lg:items-end"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.h2
          className="text-3xl font-bold text-gray-900"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Why{" "}
          <span className="font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Notes<span className="text-gray-800">X</span>change ?
          </span>
        </motion.h2>

        <div className="grid gap-4 md:grid-cols-3 max-w-4xl">
          <motion.div
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="p-3 bg-white rounded-2xl shadow-md text-center"
          >
            <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Access Notes</h3>
            <p className="text-gray-600 text-sm">
              Browse and download notes uploaded by students across different
              subjects.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="p-3 bg-white rounded-2xl shadow-md text-center"
          >
            <Upload className="w-8 h-8 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Upload Easily</h3>
            <p className="text-gray-600 text-sm">
              Share your own notes with the community in just a few clicks.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="p-3 bg-white rounded-2xl shadow-md text-center"
          >
            <Users className="w-8 h-8 text-purple-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Join Community</h3>
            <p className="text-gray-600 text-sm">
              Connect with students, collaborate, and grow together.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
