import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const SansCode = localFont({
  src: "../public/fonts/GoogleSansCode.ttf"
});

export const metadata: Metadata = {
  title: "Nimna Pathum",
  description: "Confessions of a Software Engineer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${SansCode.className} antialiased px-32`}
      >
        {children}
      </body>
    </html>
  );
}
