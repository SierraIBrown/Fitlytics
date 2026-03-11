import type { Metadata } from "next";
import "./globals.css";
import NavBar from "../components/NavBar";

export const metadata: Metadata = {
  title: "Fitlytics",
  description: "Track training. Visualize progress.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>){
  return(
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <NavBar />
        {children}
      </body>
    </html>
  )
}