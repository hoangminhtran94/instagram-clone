import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthContextProvider } from "@/context/authContext";
import GlobalModalContextProvider from "@/context/globalModalContext";
import GlobalModal from "@/components/UI/Modal/GlobalModal";
import React from "react";
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
      <body
        className={`flex  ${inter.className} max-h-screen overflow-y-scroll`}
      >
        <AuthContextProvider>
          <GlobalModalContextProvider>
            {children}
            <GlobalModal />
            <div id="modal-hook"></div>
            <div id="modal-hook-global"></div>
          </GlobalModalContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
