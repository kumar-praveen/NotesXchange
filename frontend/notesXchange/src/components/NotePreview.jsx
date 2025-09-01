import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  ExternalLink,
  FileText,
  FileX,
  Loader2,
  MessageCircle,
  Trash2,
  User,
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import UpdateForm from "./UpdateForm"; // adjust path
import { useEffect, useState } from "react";
import axios from "axios";
import { useAppStore } from "../store/useAppStore";
import toast from "react-hot-toast";

export default function NotePreview() {
  const { backendUrl, userData } = useAppStore();
  const [notes, setNotes] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { setGlobalLoading } = useAppStore();

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setGlobalLoading(true);
      const response = await axios.get(`${backendUrl}/api/notes/${id}`);
      if (response.data.success) {
        setNotes(response.data.notes);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch notes");
    } finally {
      setGlobalLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const sure = confirm("Are you sure to delete?");
      if (!sure) return;

      setLoading(true);
      const response = await axios.delete(
        `${backendUrl}/api/notes/delete/${id}`,
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        toast.success(response.data.message || "Notes deleted successfully");
        navigate("/notes");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to delete notes");
    } finally {
      setLoading(false);
    }
  };

  if (!notes) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center px-4">
        <FileX className="h-16 w-16 text-red-500 mb-4" />
        <p className="text-lg sm:text-xl font-semibold text-gray-700 dark:text-gray-300">
          PDF for this note is not available
        </p>
        <p className="text-sm sm:text-base text-gray-500 mt-2">
          The file may have been removed or is not uploaded yet.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 h-full">
          {/* Left: Note Details */}
          <div className="lg:w-1/3 xl:w-2/5 flex flex-col gap-6">
            {/* Note Info Card */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="h-5 w-5" />
                  <span className="text-xs sm:text-sm md:text-base font-medium opacity-90">
                    {notes.subject}
                  </span>
                </div>
                <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-tight">
                  {notes.title}
                </h1>
              </div>

              <div className="p-4 sm:p-6">
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                  {notes.description}
                </p>

                <div className="flex flex-wrap gap-4 text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-4 sm:mb-6">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>Created by {notes.uploadedByName || "Unknown"}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {new Date(notes.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <a
                    href={notes.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all duration-200 text-sm sm:text-base md:text-lg font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Open PDF in New Tab
                  </a>

                  {userData && userData.id === notes.uploadedBy && (
                    <div className="flex gap-2 flex-wrap mt-2 sm:mt-0">
                      <UpdateForm note={notes} />

                      <button
                        onClick={() => handleDelete(notes._id)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-200 text-sm sm:text-base md:text-lg font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer"
                      >
                        {loading ? (
                          <Loader2 className="animate-spin h-4 w-4" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                        {loading ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Comments Card */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden flex-grow lg:flex-grow-0">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-4 text-white">
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  <h2 className="text-sm sm:text-base md:text-lg font-bold">
                    Comments And Reviews
                  </h2>
                </div>
              </div>

              <div className="p-4 sm:p-6">
                <div className="text-center text-slate-500 dark:text-slate-400 py-8">
                  <MessageCircle className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm sm:text-base">No comments yet</p>
                  <p className="text-xs sm:text-sm mt-1">
                    Be the first to share your thoughts!
                  </p>
                  <p className="text-xs sm:text-sm mt-1">Feature coming soon</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: PDF Preview */}
          <div className="lg:w-2/3 xl:w-3/5 h-[400px] sm:h-[500px] md:h-[600px] lg:h-auto">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden h-full">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 text-white">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  <h3 className="text-sm sm:text-base md:text-lg font-semibold">
                    PDF Preview
                  </h3>
                </div>
              </div>

              <div className="relative h-full">
                <iframe
                  src={`${notes.fileUrl}`}
                  title="PDF Preview"
                  className="w-full h-full border-0 rounded-b-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
