import "./globals.css";

export const metadata = {
  title: "locator",
  description: "A real-time location-based app built with Socket.IO.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
