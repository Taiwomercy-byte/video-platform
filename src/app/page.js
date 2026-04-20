"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [file, setFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [videos, setVideos] = useState([]);

  const fetchVideos = async () => {
    const res = await fetch("/api/videos");
    const data = await res.json();
    setVideos(data);
  };

  useEffect(() => {
    fetchVideos();
  }, []);

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
        title: "New Video",
        description: "",
        file_url: uploadData.url,
      }),
    });

    fetchVideos(); // refresh list
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Upload Video</h1>

      <input type="file" onChange={(e) => setFile(e.target.files[0])} />

      <br /><br />

      <button onClick={handleUpload}>Upload</button>

      <h2 style={{ marginTop: 40 }}>All Videos</h2>

      <div>
        {videos.map((video) => (
          <div key={video.id} style={{ marginBottom: 20 }}>
            <p>{video.title}</p>
            <video controls width="400">
              <source src={video.file_url} type="video/mp4" />
            </video>
          </div>
        ))}
      </div>
    </div>
  );
}