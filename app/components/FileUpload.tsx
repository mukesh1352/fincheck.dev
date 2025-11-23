"use client";

import { useState } from "react";

interface Props {
  selectedFile: File | null;
  setSelectedFile: (file: File | null) => void;
}

export default function FileUpload({ selectedFile, setSelectedFile }: Props) {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <button
      type="button"
      className={`upload-area ${isDragging ? "dragging" : ""}`}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setIsDragging(false);
      }}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragging(false);
        setSelectedFile(e.dataTransfer.files?.[0] ?? null);
      }}
      onClick={() => document.getElementById("fileInput")?.click()}
    >
      <svg className="upload-icon" viewBox="0 0 24 24" stroke="currentColor">
        <title>Upload file</title>
        <path d="M21 15v4H5V15" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
      </svg>

      <p className="upload-text">Upload Your Document</p>
      <p className="upload-subtext">Drag & drop or click</p>

      <input
        id="fileInput"
        type="file"
        className="file-input"
        onChange={(e) => setSelectedFile(e.target.files?.[0] ?? null)}
        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
      />

      <label htmlFor="fileInput" className="select-file-button">
        Select File
      </label>

      {selectedFile && (
        <div className="selected-file">
          <span>{selectedFile.name}</span>
        </div>
      )}
    </button>
  );
}
