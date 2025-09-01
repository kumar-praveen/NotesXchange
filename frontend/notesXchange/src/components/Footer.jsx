import React from "react";

function Footer() {
  return (
    <footer className="bg-white/70 backdrop-blur-md border-t border-gray-200 py-6 sm:py-8 text-center">
      <p className="text-sm sm:text-base text-gray-600">
        © {new Date().getFullYear()}{" "}
        <span className="font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          NotesXchange
        </span>
        . All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
