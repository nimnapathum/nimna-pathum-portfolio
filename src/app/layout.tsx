import "./globals.css";
import React from "react";
import { APP_CONFIG } from "../constants";

export const metadata = {
  title: APP_CONFIG.name,
  description: APP_CONFIG.description,
  keywords: APP_CONFIG.keywords,
  authors: [{ name: APP_CONFIG.author }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
