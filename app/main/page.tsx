"use client";

import { useState } from "react";
import HeaderSignOut from "@/app/components/HeaderSignOut";
import FileUpload from "@/app/components/FileUpload";
import DetailsForm from "@/app/components/DetailsForm";
import { useRouter } from "next/navigation";

export default function MainPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [details, setDetails] = useState<string>("");
  const router = useRouter();

  return (
    <div className="page-container">
      <HeaderSignOut onSignOut={() => router.push("/intro")} />

      <div className="portal-container">
        <h1 className="portal-heading">Bank Document Submission Portal</h1>

        <FileUpload selectedFile={selectedFile} setSelectedFile={setSelectedFile} />
        <DetailsForm details={details} setDetails={setDetails} />

        <button
          type="button"
          className="submit-document-button"
          onClick={() => {
            if (!selectedFile || !details.trim()) return alert("Fill all fields!");
            alert("Document submitted successfully!");
            setSelectedFile(null);
            setDetails("");
          }}
        >
          Submit Document
        </button>
      </div>
    </div>
  );
}
