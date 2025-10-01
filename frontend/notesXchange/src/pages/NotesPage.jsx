import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAppStore } from "../store/useAppStore";
import AddNote from "../components/AddNote";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Search } from "lucide-react";
import { errorHandler } from "../lib/utils";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function NotesPage() {
  const { backendUrl, userData, isLoggedin, setUserData, setIsLoggedin } =
    useAppStore();
  let [notes, setNotes] = useState([]);
  let [allNotes, setAllNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { setGlobalLoading } = useAppStore();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedin) {
      navigate("/signup");
    }
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setGlobalLoading(true);
      const response = await axios.get(`${backendUrl}/api/notes/all`);
      if (response.data.success) {
        setNotes(response.data.notes);
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      errorHandler(error);
    } finally {
      setGlobalLoading(false);
    }
  };

  const filterOptions = [
    "My Uploads",
    "All",
    "Computer Science",
    "Programming",
    "Networking",
    "DBMS",
    "Electronics",
    "SSC",
    "Mathematics",
  ];

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query.trim() === "") {
      setNotes(allNotes);
    } else {
      const filtered = allNotes.filter(
        (note) =>
          note.title.toLowerCase().includes(query) ||
          note.subject.toLowerCase().includes(query) ||
          note.description.toLowerCase().includes(query)
      );
      setNotes(filtered);
    }
  };

  const handleFilter = async (item) => {
    try {
      if (item === "My Uploads") {
        const response = await axios.get(
          `${backendUrl}/api/notes/${userData.id}/notes`,
          {
            withCredentials: true,
          }
        );
        setNotes(response.data.notes);
        toast.success(response.data.message);
      } else if (item === "All") {
        setNotes(allNotes);
        toast.success("All available notes");
      } else {
        const response = await axios.get(
          `${backendUrl}/api/notes/search?query=${item}`,
          { withCredentials: true }
        );
        if (response.data.success) {
          let count = response.data.notes.length;
          setNotes(response.data.notes);
          toast.success(`${count} note(s) found`);
        } else {
          toast.success(response.data.message);
          setNotes([]);
        }
      }
    } catch (error) {
      errorHandler(error, setUserData, setIsLoggedin, navigate);
    }
  };

  return (
    <div className="w-[90%] mx-auto flex flex-col gap-6 items-start">
      <h1 className="text-3xl font-bold text-gray-800">Notes Library</h1>

      <div className="w-full lg:w-[60%] relative flex flex-col md:flex-row gap-4">
        <Input
          type="text"
          placeholder="Search notes by title, subject..."
          className="w-full rounded-lg pl-10 py-4 transition-all"
          onChange={handleSearch}
          value={searchQuery}
        />
        <Search className="absolute top-1/12 left-3 md:left-3 md:top-1/2 md:-translate-y-1/2 text-indigo-600 h-5 w-5" />
        <AddNote onNotesUpload={fetchNotes} />
      </div>

      <div className="w-full flex items-start gap-2 overflow-x-scroll">
        {filterOptions.map((item) => (
          <Button
            onClick={() => handleFilter(item)}
            className="cursor-pointer"
            key={item}
            variant="outline"
          >
            {item}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.map((note, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="shadow-md rounded-xl hover:shadow-lg transition flex flex-col">
              <CardContent className="flex flex-col h-full gap-3">
                <div>
                  <h2 className="text-base font-semibold text-indigo-600">
                    {note.title}
                  </h2>
                  <span className="w-fit inline-block text-xs text-gray-500 bg-gray-100 px-1 py-0.5 rounded">
                    {note.subject}
                  </span>
                </div>

                <div className="w-full h-32 overflow-hidden flex justify-center border-2 rounded-sm">
                  <Document file={note.fileUrl}>
                    <Page pageNumber={1} width={400}/>
                  </Document>
                </div>

                <p className="text-md text-gray-700 dark:text-gray-300 line-clamp-1">
                  {note.description}
                </p>

                {/* This ensures button always sticks to bottom */}
                <div className="w-full flex justify-end mt-auto">
                  <Link
                    to={`/notes/${note._id}`}
                    className="text-xs text-indigo-600 hover:underline"
                  >
                    <Button size="sm" className="cursor-pointer">
                      See more →
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
