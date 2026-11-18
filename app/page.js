
"use client";

import { useState } from "react";

export default function Home() {
  const [video, setVideo] = useState(null);
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");

  return (
    <main style={{
      minHeight: "100vh",
      background: "#090914",
      color: "white",
      fontFamily: "Arial",
      padding: "25px 16px"
    }}>
      <header style={{maxWidth: 850, margin: "auto"}}>
        <h1 style={{color: "#a78bfa"}}>NOXCLIP AI</h1>
        <p>Turn long videos into short-form content.</p>

        <section style={card}>
          <h2>🎬 Create your clips</h2>
          <p>Upload a video from your phone</p>

          <input
            type="file"
            accept="video/*"
            onChange={e => setVideo(e.target.files[0])}
          />

          {video && <p>Selected: {video.name}</p>}

          <hr style={line}/>

          <p>Or paste a YouTube video link</p>
          <input
            style={field}
            placeholder="https://youtube.com/watch?v=..."
            value={url}
            onChange={e => setUrl(e.target.value)}
          />

          <button style={button} onClick={() => {
            setMessage(
              video || url.trim()
                ? "Input received. Clipping engine is not connected yet."
                : "Please upload a video or enter a link."
            );
          }}>
            Generate Clips
          </button>

          <p style={{color:"#c4b5fd"}}>{message}</p>
        </section>

        <section style={card}>
          <h2>NOXCLIP PRO</h2>
          <h1>₹899 / month</h1>
          <p>20 clips every billing cycle</p>
          <p>AI-powered short video workflow</p>
          <button style={button}
            onClick={() => setMessage("Subscription setup is coming next.")}>
            Get Pro
          </button>
        </section>

        <p style={{textAlign:"center", color:"#777"}}>
          © 2026 NoxClip AI
        </p>
      </header>
    </main>
  );
}

const card = {
  background:"#17152b",
  border:"1px solid #373052",
  borderRadius:16,
  padding:22,
  marginTop:25
};

const field = {
  width:"100%",
  boxSizing:"border-box",
  padding:14,
  marginTop:10,
  background:"#24213b",
  color:"white",
  border:"1px solid #55477b",
  borderRadius:8
};

const button = {
  width:"100%",
  padding:15,
  marginTop:18,
  background:"#8b5cf6",
  color:"white",
  border:0,
  borderRadius:9,
  fontWeight:"bold"
};

const line = {
  borderColor:"#373052",
  margin:"25px 0"
};
              
