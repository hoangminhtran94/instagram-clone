import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthContextProvider } from "@/context/authContext";
import GlobalModalContextProvider from "@/context/globalModalContext";
import GlobalModal from "@/components/UI/Modal/GlobalModal";
import React from "react";
import { getUserDataFromToken } from "@/actions/action";
import ReactQueryContextProvider from "@/context/ReactQueryContext";

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserDataFromToken();

  return (
    <html lang="en">
      <body
        className={`flex  ${inter.className} max-h-screen overflow-y-scroll`}
      >
        <ReactQueryContextProvider>
          <AuthContextProvider user={user}>
            <GlobalModalContextProvider>
              {children}
              <GlobalModal />
              <div id="modal-hook"></div>
              <div id="modal-hook-global"></div>
            </GlobalModalContextProvider>
          </AuthContextProvider>
        </ReactQueryContextProvider>
      </body>
    </html>
  );
}
