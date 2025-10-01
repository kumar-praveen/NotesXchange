import React, { useState } from "react";
import { Upload, FileText, X, Loader2 } from "lucide-react";
import axios from "axios";
import { useAppStore } from "../store/useAppStore";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { errorHandler } from "../lib/utils";

export default function AddNoteForm({ closeForm, onNotesUpload }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    subject: "",
    file: null,
  });
  const [loader, setLoader] = useState(false);
  const { backendUrl } = useAppStore();
  const navigate = useNavigate();

  const [isDragOver, setIsDragOver] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        file: file,
      }));
    }
  };

  const removeFile = () => {
    setFormData((prev) => ({
      ...prev,
      file: null,
    }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        file: file,
      }));
    }
  };

  const handleSubmit = async () => {
    if (!formData.file) {
      toast.error("Please select a file");
      return;
    }

    try {
      setLoader(true);

      const data = new FormData();
      data.append("title", formData.title);
      data.append("subject", formData.subject);
      data.append("description", formData.description);
      data.append("file", formData.file);

      const response = await axios.post(
        `${backendUrl}/api/notes/upload`,
        data,
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        if (onNotesUpload) {
          onNotesUpload();
        }
      }
    } catch (error) {
      errorHandler(error, setUserData, setIsLoggedin, navigate);
    } finally {
      setLoader(false);
      closeForm(false);
    }
  };

  return (
    
      <div className="w-full max-w-md  rounded-2xl shadow-lg border border-slate-200">
        {/* Compact Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-4 rounded-t-2xl">
          <h1 className="text-xl font-bold text-white text-center">
            Upload New Notes
          </h1>
          <p className="text-blue-100 text-center text-xs mt-1">
            Share your own notes with others
          </p>
        </div>

        {/* Compact Form */}
        <div className="px-5 py-4 space-y-3">
          {/* Title */}
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Title
            </label>
            <input
              name="title"
              type="text"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
              placeholder="Title"
            />
          </div>

          {/* Subject */}
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Subject
            </label>
            <input
              name="subject"
              type="text"
              value={formData.subject}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
              placeholder="Subject"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              rows="2"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 resize-none text-sm"
              placeholder="About notes"
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              File Upload
            </label>

            {formData.file ? (
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-blue-500" />
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-slate-700 truncate">
                        {formData.file.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        {(formData.file.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={removeFile}
                    className="text-slate-400 hover:text-red-500"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div
                className={`relative border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
                  isDragOver
                    ? "border-blue-500 bg-blue-50"
                    : "border-slate-300 bg-slate-50 hover:border-blue-400"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  name="file"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <Upload className="w-6 h-6 text-slate-400 mx-auto mb-2" />
                <p className="text-xs font-medium text-slate-700">
                  Click or drag to upload
                </p>
                <p className="text-xs text-slate-500">Any file type</p>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium py-2.5 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all text-sm cursor-pointer flex items-center justify-center gap-2"
            disabled={loader}
          >
            {loader && <Loader2 className="animate-spin" />}
            Upload
          </button>

          {/* Footer */}
          <p className="text-center text-xs text-slate-500 pt-2">
            Need help?{" "}
            <button className="text-blue-600 hover:underline">
              Contact support
            </button>
          </p>
        </div>
      </div>
    
  );
}
