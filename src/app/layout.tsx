import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Simple Hub",
  description: "A really simple restaurant application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-200 bg-opacity-70 text-gray-900 font-mono">
        {children}
      </body>
    </html>
  );
}
