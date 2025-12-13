"use client";

import { useState } from "react";

export default function MainPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [description, setDescription] = useState<string>("");

  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    if (!selectedFile) return alert("Please select an image ⚠️");

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("description", description);

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
      setDescription("");
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
    <>
      <style jsx>{`
        .container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #0f172a 0%, #115e59 50%, #166534 100%);
          padding: 2.5rem;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        }

        .card {
          width: 100%;
          max-width: 500px;
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 24px;
          padding: 3rem;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }

        .title {
          font-size: 2rem;
          font-weight: 700;
          color: white;
          text-align: center;
          margin: 0 0 2.5rem 0;
          line-height: 1.3;
          letter-spacing: -0.02em;
        }

        .form-section {
          margin-bottom: 2rem;
        }

        .label {
          display: block;
          color: white;
          font-size: 0.95rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
          letter-spacing: 0.01em;
        }

        .upload-area {
          padding: 2rem;
          border: 2px dashed #5eead4;
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.05);
          transition: all 0.2s ease;
          cursor: pointer;
        }

        .upload-area:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: #2dd4bf;
        }

        .file-input {
          width: 100%;
          padding: 0.75rem;
          background: rgba(255, 255, 255, 0.95);
          border: 1px solid rgba(0, 0, 0, 0.15);
          border-radius: 8px;
          font-size: 0.9rem;
          color: #1f2937;
          cursor: pointer;
          transition: all 0.2s ease;
          display: block;
        }

        .file-input:hover {
          background: white;
          border-color: #0d9488;
        }

        .file-input::file-selector-button {
          padding: 0.5rem 1.25rem;
          margin-right: 1rem;
          background: #0d9488;
          color: white;
          border: none;
          border-radius: 6px;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .file-input::file-selector-button:hover {
          background: #0f766e;
        }

        .text-input {
          width: 100%;
          padding: 0.75rem 1rem;
          background: rgba(255, 255, 255, 0.95);
          border: 1px solid rgba(0, 0, 0, 0.15);
          border-radius: 8px;
          font-size: 0.95rem;
          color: #1f2937;
          transition: all 0.2s ease;
          font-family: inherit;
        }

        .text-input:focus {
          outline: none;
          background: white;
          border-color: #0d9488;
          box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.1);
        }

        .text-input::placeholder {
          color: rgba(0, 0, 0, 0.4);
        }

        .preview-container {
          display: flex;
          justify-content: center;
          margin-bottom: 2rem;
        }

        .preview-box {
          position: relative;
          width: 280px;
          height: 280px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          overflow: hidden;
          background: rgba(0, 0, 0, 0.2);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
        }

        .preview-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .submit-button {
          width: 100%;
          padding: 1rem;
          background: #0d9488;
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: 0.02em;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 12px rgba(13, 148, 136, 0.3);
        }

        .submit-button:hover {
          background: #0f766e;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(13, 148, 136, 0.4);
        }

        .submit-button:active {
          transform: translateY(0);
        }
      `}</style>

      <div className="container">
        <div className="card">
          <h1 className="title">
            Bank Document<br />Submission Portal
          </h1>

          <div className="form-section">
            <label htmlFor="description" className="label">
              Account Number
            </label>
            <input
              id="description"
              type="text"
              className="text-input"
              placeholder="Enter Account Number"
              value={description}
              onChange={(e) => {
                const value = e.target.value;
                if (value === "" || /^\d+$/.test(value)) {
                  setDescription(value);
                }
              }}
            />
          </div>

          <div className="form-section">
            <label htmlFor="upload-file" className="label">
              Upload Image
            </label>

            <div className="upload-area">
              <input
                id="upload-file"
                type="file"
                accept="image/*"
                className="file-input"
                onChange={(e) => handleFileSelect(e.target.files?.[0] ?? null)}
              />
            </div>
          </div>

          {previewUrl && (
            <div className="preview-container">
              <div className="preview-box">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="preview-image"
                />
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={handleSubmit}
            className="submit-button"
          >
            Submit Image
          </button>
        </div>
      </div>
    </>
  );
}