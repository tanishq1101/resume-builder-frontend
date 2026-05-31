import {
  FilePenLineIcon,
  LoaderCircleIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  UploadCloud,
  UploadCloudIcon,
  XIcon,
  EyeIcon
} from "lucide-react";

import React, { useEffect, useState } from "react";
import { dummyResumeData } from "/src/assets/assets.js";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../configs/api";
import toast from "react-hot-toast";
import pdfToText from "react-pdftotext";

const Dashboard = () => {
  const { token } = useSelector((state) => state.auth);
  const storedToken = token || localStorage.getItem("token");

  const API_BASE = import.meta.env.VITE_API_BASE || window.location.origin;

  const colors = ["#9333ea", "#d97706", "#dc2626", "#0284c7", "#16a34a"];

  const [allResumes, setAllResumes] = useState([]);
  const [ShowCreateResume, setShowCreateResume] = useState(false);
  const [ShowUploadResume, setShowUploadResume] = useState(false);
  const [title, setTitle] = useState("");
  const [resume, setResume] = useState(null);
  const [editResumeId, setEditResumeId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const looksLikeHtml = (text) =>
    typeof text === "string" &&
    (text.trim().startsWith("<!doctype") || text.trim().startsWith("<html"));

  const getHeaders = () => ({
    headers: { Authorization: `Bearer ${storedToken}` }
  });

  const loadAllResumes = async () => {
    setAllResumes(Array.isArray(dummyResumeData) ? dummyResumeData : []);

    try {
      const res = await api.get(`${API_BASE}/api/users/resumes`, getHeaders());

      if (typeof res.data === "string" && looksLikeHtml(res.data)) {
        toast.error("Backend returned HTML. Fix API_BASE.");
        setAllResumes([]);
        return;
      }

      const payload = res.data;

      if (Array.isArray(payload?.resumes)) setAllResumes(payload.resumes);
      else if (Array.isArray(payload)) setAllResumes(payload);
      else {
        toast.error("Unexpected response when loading resumes.");
        setAllResumes([]);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load resumes");
    }
  };

  const createResume = async (event) => {
    event.preventDefault();

    try {
      const res = await api.post(
        `${API_BASE}/api/resumes/create`,
        { title },
        getHeaders()
      );

      if (typeof res.data === "string" && looksLikeHtml(res.data)) {
        toast.error("Backend returned HTML. Fix API_BASE.");
        return;
      }

      if (res.data?.resume) {
        setAllResumes((prev) => [...prev, res.data.resume]);
        setShowCreateResume(false);
        setTitle("");
        navigate(`/app/builder/${res.data.resume._id}`);
      } else {
        toast.error("Unexpected response when creating resume.");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to create resume");
    }
  };

  const uploadResume = async (event) => {
    event.preventDefault();

    if (!resume) {
      toast.error("Select a PDF file before uploading.");
      return;
    }

    setIsLoading(true);

    try {
      const resumeText = await pdfToText(resume);

      const res = await api.post(
        `${API_BASE}/api/ai/upload-resume`,
        { title, resumeText },
        getHeaders()
      );

      if (typeof res.data === "string" && looksLikeHtml(res.data)) {
        toast.error("Backend returned HTML. Fix API_BASE.");
        return;
      }

      if (res.data?.resumeId) {
        setResume(null);
        setTitle("");
        setShowUploadResume(false);
        navigate(`/app/builder/${res.data.resumeId}`);
      } else {
        toast.error("Unexpected response when uploading resume.");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to upload resume");
    } finally {
      setIsLoading(false);
    }
  };

  const editTitle = async (event) => {
    event.preventDefault();

    try {
      const res = await api.put(
        `${API_BASE}/api/resumes/update/`,
        { resumeId: editResumeId, resumeData: { title } },
        getHeaders()
      );

      if (typeof res.data === "string" && looksLikeHtml(res.data)) {
        toast.error("Backend returned HTML. Fix API_BASE.");
        return;
      }

      setAllResumes((prev) =>
        prev.map((r) => (r._id === editResumeId ? { ...r, title } : r))
      );

      setEditResumeId("");
      setTitle("");
      toast.success(res.data.message || "Updated");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update resume");
    }
  };

  const deleteResume = async (resumeId) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this CV?"
      );
      if (!confirmDelete) return;

      const res = await api.delete(
        `${API_BASE}/api/resumes/delete/${resumeId}`,
        getHeaders()
      );

      if (typeof res.data === "string" && looksLikeHtml(res.data)) {
        toast.error("Backend returned HTML. Fix API_BASE.");
        return;
      }

      setAllResumes((prev) => prev.filter((r) => r._id !== resumeId));
      toast.success(res.data.message || "Deleted");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete resume");
    }
  };

  useEffect(() => {
    loadAllResumes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-purple-950/30 dark:to-indigo-950/30 animate-gradient transition-colors duration-300" />

      {/* Subtle noise / blur layer */}
      <div className="absolute inset-0 -z-10 backdrop-blur-[2px]" />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-2xl font-medium mb-6 bg-linear-to-r from-slate-600 to-slate-700 dark:from-gray-300 dark:to-gray-400 bg-clip-text text-transparent sm:hidden">
          Welcome, Alexandra Acosta
        </p>

        <div className="flex gap-4">
          {/* Create Resume Button */}
          <button
            onClick={() => setShowCreateResume(true)}
            className="w-full bg-white dark:bg-gray-800 sm:max-w-36 h-48 flex flex-col items-center
          justify-center rounded-lg gap-2 text-slate-600 dark:text-gray-300 border border-dashed
          border-slate-300 dark:border-gray-600 group hover:border-indigo-500 dark:hover:border-indigo-400 hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <PlusIcon className="size-11 transition-all duration-300 p-2.5 
            bg-linear-to-br from-indigo-300 to-indigo-500 text-white rounded-full" />
            <p className="text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-all duration-300">
              Create CV
            </p>
          </button>

          {/* Upload Resume Button */}
          <button
            onClick={() => setShowUploadResume(true)}
            className="w-full bg-white dark:bg-gray-800 sm:max-w-36 h-48 flex flex-col items-center
          justify-center rounded-lg gap-2 text-slate-600 dark:text-gray-300 border border-dashed
          border-slate-300 dark:border-gray-600 group hover:border-purple-500 dark:hover:border-purple-400 hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <UploadCloudIcon className="size-11 transition-all duration-300 p-2.5 
            bg-linear-to-br from-purple-300 to-purple-500 text-white rounded-full" />
            <p className="text-sm group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-all duration-300">
              Upload CV
            </p>
          </button>
        </div>

        <hr className="border-slate-400 dark:border-gray-600 my-6 sm:w-[305px]" />

        {/* Resume Cards */}
        <div className="grid grid-cols-2 sm:flex flex-wrap gap-4">
          {(Array.isArray(allResumes) ? allResumes : []).map(
            (resume, index) => {
              const baseColor = colors[index % colors.length];

              return (
                <button
                  key={resume?._id || index}
                  onClick={() =>
                    resume && resume._id && navigate(`/app/builder/${resume._id}`)
                  }
                  className="relative w-full sm:max-w-36 h-48 flex flex-col
                items-center justify-center rounded-lg gap-2 border group 
                hover:shadow-lg transition-all duration-300 cursor-pointer"
                  style={{
                    background: `linear-gradient(135deg, ${baseColor}10, ${baseColor}40)`,
                    borderColor: `${baseColor}40`
                  }}
                >
                  {/* ATS Score Badge */}
                  {resume?.ats_score !== undefined && resume?.ats_score !== null && (
                    <div 
                      className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded-md text-[9px] font-bold text-white flex items-center gap-0.5 shadow-xs"
                      style={{
                        backgroundColor: resume.ats_score >= 85 ? "#16a34a" : resume.ats_score >= 70 ? "#d97706" : "#dc2626"
                      }}
                    >
                      ATS {resume.ats_score}%
                    </div>
                  )}

                  <FilePenLineIcon
                    className="size-7 group-hover:scale-105 transition-all"
                    style={{ color: baseColor }}
                  />

                  <p
                    className="text-sm group-hover:scale-105 transition-all px-2 text-center"
                    style={{ color: baseColor }}
                  >
                    {resume?.title || "Untitled CV"}
                  </p>

                  {/* Public View Tracker */}
                  {resume?.public && (
                    <div 
                      className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1 text-[10px] bg-white/70 dark:bg-gray-800/70 px-1.5 py-0.5 rounded-full border border-slate-200/50 dark:border-gray-700/50 text-slate-500 dark:text-gray-400 group-hover:scale-105 transition-all"
                    >
                      <EyeIcon className="size-3" style={{ color: baseColor }} />
                      <span>{resume?.views || 0} views</span>
                    </div>
                  )}

                  <p
                    className="absolute bottom-1 text-[11px] text-slate-400 group-hover:text-slate-500
                  transition-all duration-300 px-2 text-center"
                    style={{ color: baseColor + "90" }}
                  >
                    Updated on{" "}
                    {resume?.updatedAt
                      ? new Date(resume.updatedAt).toLocaleDateString()
                      : "—"}
                  </p>

                  {/* Pencil + Trash Icons */}
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="absolute top-1 right-1 group-hover:flex items-center hidden"
                  >
                    <TrashIcon
                      onClick={() => resume?._id && deleteResume(resume._id)}
                      className="size-7 p-1.5 hover:bg-white/50 dark:hover:bg-gray-800/50 rounded text-slate transition-colors"
                    />
                    <PencilIcon
                      onClick={() => {
                        setEditResumeId(resume?._id || "");
                        setTitle(resume?.title || "");
                      }}
                      className="size-7 p-1.5 hover:bg-white/50 dark:hover:bg-gray-800/50 rounded text-slate transition-colors"
                    />
                  </div>
                </button>
              );
            }
          )}
        </div>

        {/* ----------- CREATE RESUME MODAL ----------- */}
        {ShowCreateResume && (
          <form
            onSubmit={createResume}
            onClick={() => setShowCreateResume(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur bg-opacity-50
          z-10 flex items-center justify-center"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-slate-50 dark:bg-gray-800 border dark:border-gray-700 shadow-md rounded-lg 
            w-full max-w-sm p-6"
            >
              <h2 className="text-xl font-bold mb-4 dark:text-gray-100">Create a CV</h2>
              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder="Enter CV Title"
                className="w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600"
                required
              />

              <button className="w-full bg-green-600 text-white py-2 rounded-md
              hover:bg-green-700 transition-colors">
                Create CV
              </button>

              <XIcon
                className="absolute top-4 right-4 text-slate-400 dark:text-gray-500
              hover:text-slate-600 dark:hover:text-gray-300 cursor-pointer transition-colors"
                onClick={() => {
                  setShowCreateResume(false);
                  setTitle("");
                }}
              />
            </div>
          </form>
        )}

        {/* ----------- UPLOAD RESUME MODAL ----------- */}
        {ShowUploadResume && (
          <form
            onSubmit={uploadResume}
            onClick={() => setShowUploadResume(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur bg-opacity-50
          z-10 flex items-center justify-center"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-slate-50 dark:bg-gray-800 border dark:border-gray-700 shadow-md rounded-lg 
            w-full max-w-sm p-6"
            >
              <h2 className="text-xl font-bold mb-4 dark:text-gray-100">Upload CV</h2>

              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder="CV Title"
                className="w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600"
                required
              />

              <div>
                <label htmlFor="resume-input" className="block text-sm text-slate-700 dark:text-gray-300">
                  Select CV PDF File
                  <div
                    className="flex flex-col items-center justify-center gap-2 border group text-slate-400 dark:text-gray-500
                  border-slate-400 dark:border-gray-600 border-dashed rounded-md p-4 py-10 my-10 cursor-pointer
                  hover:border-green-600 hover:text-green-600 transition-colors"
                  >
                    {resume ? (
                      <p className="text-green-700 dark:text-green-400">{resume.name}</p>
                    ) : (
                      <>
                        <UploadCloud className="size-14 stroke-1" />
                      </>
                    )}
                  </div>
                </label>
                <input
                  type="file"
                  id="resume-input"
                  accept=".pdf"
                  hidden
                  onChange={(e) => setResume(e.target.files[0])}
                />
              </div>

              <button
                disabled={isLoading}
                className="w-full bg-green-600 text-white py-2 rounded-md
              hover:bg-green-700 transition-colors flex items-center gap-2 justify-center "
              >
                {isLoading && (
                  <LoaderCircleIcon className="animate-spin size-4 text-white" />
                )}
                {isLoading ? "Uploading..." : "Upload CV"}
              </button>

              <XIcon
                className="absolute top-4 right-4 text-slate-400 dark:text-gray-500
              hover:text-slate-600 dark:hover:text-gray-300 cursor-pointer transition-colors"
                onClick={() => {
                  setShowUploadResume(false);
                  setTitle("");
                }}
              />
            </div>
          </form>
        )}

        {/* ----------- EDIT TITLE MODAL ----------- */}
        {editResumeId && (
          <form
            onSubmit={editTitle}
            onClick={() => setEditResumeId("")}
            className="fixed inset-0 bg-black/50 backdrop-blur bg-opacity-50
          z-10 flex items-center justify-center"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-slate-50 dark:bg-gray-800 border dark:border-gray-700 shadow-md rounded-lg 
            w-full max-w-sm p-6"
            >
              <h2 className="text-xl font-bold mb-4 dark:text-gray-100">Edit CV Title</h2>

              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder="Enter CV Title"
                className="w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600"
                required
              />

              <button className="w-full bg-green-600 text-white py-2 rounded-md
              hover:bg-green-700 transition-colors">
                Update
              </button>

              <XIcon
                className="absolute top-4 right-4 text-slate-400 dark:text-gray-500
              hover:text-slate-600 dark:hover:text-gray-300 cursor-pointer transition-colors"
                onClick={() => {
                  setEditResumeId("");
                  setTitle("");
                }}
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
