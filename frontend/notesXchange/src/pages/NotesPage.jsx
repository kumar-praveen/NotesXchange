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
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Notes Library</h1>
        <AddNote onNotesUpload={fetchNotes} />
      </div>

      <div className="relative w-full max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-600 h-5 w-5" />
        <Input
          type="text"
          placeholder="Search notes by title, subject..."
          className="pl-10 pr-4 py-3 w-full rounded-2xl border border-gray-300 bg-gray-50 
               focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
               shadow-sm transition-all"
          onChange={handleSearch}
          value={searchQuery}
        />
      </div>

      <div className="p-4 flex items-start gap-2 overflow-x-scroll">
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

      <div className="py-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {notes.map((note, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="shadow-md rounded-xl hover:shadow-lg transition flex flex-col h-48">
              <CardContent className="flex flex-col flex-grow">
                <h2 className="text-base font-semibold text-indigo-600 mb-1">
                  {note.title}
                </h2>

                <span className="w-fit inline-block text-xs text-gray-500 mb-1 bg-gray-100 px-1 py-0.5 rounded">
                  {note.subject}
                </span>

                <p className="text-md mt-2 text-gray-700 dark:text-gray-300 mb-3 line-clamp-2">
                  {note.description}
                </p>

                <div className="mt-auto flex justify-between items-center">
                  <Link
                    to={`/notes/${note._id}`}
                    className="text-xs text-indigo-600 hover:underline text-right"
                  >
                    See more →
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
