
"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function Home() {
  const [video, setVideo] = useState(null);
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function uploadVideo() {
    if (!supabase) {
      setMessage("Supabase configuration missing.");
      return;
    }

    if (!video) {
      setMessage(
        url.trim()
          ? "YouTube link importing is not connected yet."
          : "Please select a video first."
      );
      return;
    }

    if (!video.type.startsWith("video/")) {
      setMessage("Please select a valid video file.");
      return;
    }

    if (video.size > 50 * 1024 * 1024) {
      setMessage("Video must be smaller than 50 MB.");
      return;
    }

    setLoading(true);
    setMessage("Checking login...");

    try {
      const {
        data: { user },
        error: userError
      } = await supabase.auth.getUser();

      if (userError) {
        throw userError;
      }

      if (!user) {
        setMessage("Please login before uploading a video.");
        return;
      }

      const safeName = video.name.replace(
        /[^a-zA-Z0-9._-]/g,
        "_"
      );

      const filePath =
        `${user.id}/${Date.now()}-${safeName}`;

      setMessage("Uploading your video...");

      const { data, error: uploadError } =
        await supabase.storage
          .from("noxclip-videos")
          .upload(filePath, video, {
            contentType: video.type,
            upsert: false
          });

      if (uploadError) {
        console.error(
          "SUPABASE UPLOAD ERROR:",
          uploadError
        );

        throw new Error(
          `${uploadError.message} | Status: ${
            uploadError.statusCode || "Unknown"
          }`
        );
      }

      setMessage(
        "Video uploaded successfully! AI clipping engine is not connected yet."
      );

      setVideo(null);

      const fileInput =
        document.getElementById("video-upload");

      if (fileInput) {
        fileInput.value = "";
      }

    } catch (error) {
      console.error("UPLOAD FAILED:", error);

      setMessage(
        error.message || "Video upload failed."
      );

    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{
      minHeight: "100vh",
      background: "#090914",
      color: "white",
      fontFamily: "Arial",
      padding: "25px 16px"
    }}>
      <header style={{
        maxWidth: 850,
        margin: "auto"
      }}>

        <h1 style={{ color: "#a78bfa" }}>
          NOXCLIP AI
        </h1>

        <a href="/auth" style={{
          display: "inline-block",
          color: "white",
          background: "#8b5cf6",
          padding: "12px 20px",
          borderRadius: 8,
          textDecoration: "none",
          marginTop: 10
        }}>
          Login / Sign Up
        </a>

        <p>
          Turn long videos into short-form content.
        </p>

        <section style={card}>
          <h2>🎬 Create your clips</h2>

          <p>Upload a video from your phone</p>

          <input
            id="video-upload"
            type="file"
            accept="video/*"
            onChange={e =>
              setVideo(e.target.files[0] || null)
            }
          />

          {video && (
            <p>
              Selected: {video.name}
            </p>
          )}

          <hr style={line} />

          <p>Or paste a YouTube video link</p>

          <input
            style={field}
            placeholder="https://youtube.com/watch?v=..."
            value={url}
            onChange={e => setUrl(e.target.value)}
          />

          <button
            style={{
              ...button,
              opacity: loading ? 0.6 : 1
            }}
            onClick={uploadVideo}
            disabled={loading}
          >
            {loading ? "Uploading..." : "Upload Video"}
          </button>

          <p style={{ color: "#c4b5fd" }}>
            {message}
          </p>
        </section>

        <section style={card}>
          <h2>NOXCLIP PRO</h2>

          <h1>₹899 / month</h1>

          <p>20 clips every billing cycle</p>

          <p>AI-powered short video workflow</p>

          <button
            style={button}
            onClick={() =>
              setMessage(
                "Subscription setup is coming next."
              )
            }
          >
            Get Pro
          </button>
        </section>

        <p style={{
          textAlign: "center",
          color: "#777"
        }}>
          © 2026 NoxClip AI
        </p>

      </header>
    </main>
  );
}

const card = {
  background: "#17152b",
  border: "1px solid #373052",
  borderRadius: 16,
  padding: 22,
  marginTop: 25
};

const field = {
  width: "100%",
  boxSizing: "border-box",
  padding: 14,
  marginTop: 10,
  background: "#24213b",
  color: "white",
  border: "1px solid #55477b",
  borderRadius: 8
};

const button = {
  width: "100%",
  padding: 15,
  marginTop: 18,
  background: "#8b5cf6",
  color: "white",
  border: 0,
  borderRadius: 9,
  fontWeight: "bold",
  cursor: "pointer"
};

const line = {
  borderColor: "#373052",
  margin: "25px 0"
};
