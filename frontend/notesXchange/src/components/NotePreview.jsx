import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Download,
  ExternalLink,
  FileText,
  FileX,
  Loader2,
  MessageCircle,
  Trash2,
  User,
} from "lucide-react";
import { useParams, useNavigate, Link } from "react-router-dom";
import UpdateForm from "./UpdateForm"; // adjust path
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useAppStore } from "../store/useAppStore";
import toast from "react-hot-toast";
import { Document, Page } from "react-pdf";

export default function NotePreview() {
  const { backendUrl, userData } = useAppStore();
  const [notes, setNotes] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { setGlobalLoading } = useAppStore();
  const [numPages, setNumPages] = useState(null);
  const containerRef = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    function handleResize() {
      if (containerRef.current) {
        setWidth(containerRef.current.offsetWidth);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

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
      <div className="w-full flex flex-col items-center justify-center h-[70vh] text-center px-4">
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
    <div className="w-full h-full">
      <div className="w-[90%] h-full mx-auto flex flex-col gap-12 xl:flex-row justify-between">
        {/* Left: Note Details */}
        <div className="w-full flex flex-col md:flex-row xl:flex-col gap-6">
          {/* Note Info Card */}
          <div className="max-h-min bg-white rounded-md shadow-sm border border-slate-200 overflow-hidden flex-1">
            <div className="border-b p-3">
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-2xl font-semibold">
                {notes.title}
              </h1>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium opacity-90 text-gray-500">
                  {notes.subject}
                </span>
              </div>
            </div>

            <div className="p-4 flex flex-col gap-4">
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base text-justify">
                {notes.description}
              </p>

              <div className="flex flex-wrap gap-3 items-center">
                <Button size="sm">
                  <a
                    href={notes.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 font-semibold"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Open PDF in New Tab
                  </a>
                </Button>

                {userData && userData.id === notes.uploadedBy && (
                  <div className="flex gap-2 items-center flex-wrap">
                    <UpdateForm note={notes} />
                    <Button
                      size="sm"
                      className="bg-red-500 cursor-pointer hover:bg-red-500 hover:opacity-80"
                      onClick={() => handleDelete(notes._id)}
                    >
                      {loading ? (
                        <Loader2 className="animate-spin h-4 w-4" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                      {loading ? "Deleting..." : "Delete"}
                    </Button>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-4 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>Created by {notes.uploadedByName || "Unknown"}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(notes.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Comments Card */}
          <div className="bg-white rounded-md shadow-sm border flex-1">
            <div className="p-4 border-b">
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

        <div className="flex flex-col bg-gray-100 rounded-md">
          <div className="flex items-center justify-between p-4 border-b">
            <h1 className="text-2xl font-semibold">PDF Preview</h1>
            <Link to={notes.fileUrl}>
              <Button
                size="sm"
                className="font-bold flex gap-2 items-center bg-green-500 cursor-pointer hover:bg-green-400"
              >
                Download
                <Download />
              </Button>
            </Link>
          </div>
          <div
            ref={containerRef}
            className="h-screen overflow-y-scroll no-scrollbar rounded-md"
          >
            <Document
              file={notes.fileUrl}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              {Array.from(new Array(numPages), (el, index) => (
                <div
                  key={`page_${index + 1}`}
                  className="snap-start flex justify-center items-center m-4"
                >
                  <Page pageNumber={index + 1} width={width ? width : 600} />
                </div>
              ))}
            </Document>
          </div>
        </div>
      </div>
    </div>
  );
}
