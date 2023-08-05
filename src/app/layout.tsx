import SideBar from "@/components/UI/SideBarComponents/Sidebar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthContextProvider } from "@/context/authContext";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Instaclone",
  description: "Clone of Instagram",
  manifest: "/manifest.json",
  icons: [
    { rel: "apple-touch-icon", url: "/icons/icon-192x192.png" },
    {
      rel: "icon",
      url: "/icons/icon-192x192.png",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <AuthContextProvider>
        <body
          className={`flex  ${inter.className} max-h-screen overflow-y-scroll`}
        >
          {children}
          <div id="modal-hook"></div>
        </body>
      </AuthContextProvider>
    </html>
  );
}
