"use client";

import { useState } from "react";
import Image from "next/image";

export default function MainPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    if (!selectedFile) return alert("Please select an image ⚠️");

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const res = await fetch("http://127.0.0.1:8000/upload-image", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) return alert(`Upload failed ❌: ${data.detail}`);

      alert("Uploaded successfully 🎉");
      setSelectedFile(null);
      setPreviewUrl(null);
    } catch {
      alert("Server error, try again later ⚠️");
    }
  }

  function handleFileSelect(file: File | null) {
    setSelectedFile(file);
    if (file) setPreviewUrl(URL.createObjectURL(file));
    else setPreviewUrl(null);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-teal-900 to-green-800 p-10">
      <div className="card w-[500px] bg-white/10 backdrop-blur-xl shadow-xl border border-white/20 rounded-3xl p-12 space-y-10 text-center">
        
        <h1 className="text-4xl font-extrabold text-white drop-shadow-2xl leading-snug">
          Bank Document <br /> Submission Portal
        </h1>

        <div className="form-control w-full max-w-sm mx-auto space-y-4">
          <label htmlFor="upload-file" className="text-white font-semibold text-lg tracking-wide">
            Upload Image
          </label>

          <div className="p-6 border-2 border-dashed border-teal-400 rounded-xl bg-white/10 hover:bg-white/20 transition-all">
            <input
              id="upload-file"
              type="file"
              accept="image/*"
              className="file-input file-input-bordered file-input-primary w-full"
              onChange={(e) => handleFileSelect(e.target.files?.[0] ?? null)}
            />
          </div>
        </div>

        {/* 🖼 Image Preview Using Next.js Image */}
        {previewUrl && (
          <div className="flex justify-center">
            <div className="relative w-64 h-64 border border-white/20 rounded-xl shadow-lg overflow-hidden">
              <Image
                src={previewUrl}
                alt="Preview"
                fill
                className="object-contain bg-black/10"
              />
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={handleSubmit}
          className="btn btn-primary w-full rounded-xl font-bold shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-200 tracking-wide text-lg py-4"
        >
          Submit Image
        </button>
      </div>
    </div>
  );
}
