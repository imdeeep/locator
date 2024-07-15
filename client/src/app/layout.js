import AuthWrapper from "@/components/AuthWrapper";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

export const metadata = {
  title: "Locator",
  description: "A real-time location-based app built with Socket.IO.",
};

export default function RootLayout({ children }) {
  return (
    <>
    <AuthProvider>
    <html lang="en">
      <body>
        <AuthWrapper>
        {children}
        </AuthWrapper>
        </body>
    </html>
    </AuthProvider>
    </>
  );
}
