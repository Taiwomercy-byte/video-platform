"use client";

import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  const handleUpload = async () => {
    if (!file) return alert("Select a file");

    const formData = new FormData();
    formData.append("file", file);

    const uploadRes = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const uploadData = await uploadRes.json();

    setVideoUrl(uploadData.url);

    await fetch("/api/save-video", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description: "",
        file_url: uploadData.url,
      }),
    });
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Upload Video</h1>

      <input
        type="text"
        placeholder="Video title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br /><br />

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br /><br />

      <button onClick={handleUpload}>Upload</button>

      {videoUrl && (
        <div>
          <h3>Preview</h3>
          <video controls width="500">
            <source src={videoUrl} type="video/mp4" />
          </video>
        </div>
      )}
    </div>
  );
}