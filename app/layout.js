export const metadata = {
  title: "NoxClip AI",
  description: "AI video clipping platform"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{
        margin: 0,
        background: "#090914",
        color: "white",
        fontFamily: "Arial"
      }}>
        {children}
      </body>
    </html>
  );
}
