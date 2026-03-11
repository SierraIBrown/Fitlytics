import type { Metadata } from "next";
import "./globals.css";
import { Inter, Poppins } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

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
      <body className={`${inter.variable} ${poppins.variable}`}>
        <NavBar />
        {children}
      </body>
    </html>
  )
}