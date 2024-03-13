import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const IBMplex = IBM_Plex_Sans({ 
  subsets: ["latin"] ,
  weight: ['400','500','600','700'] ,
  variable: '--font-ibm-plex'
});

export const metadata: Metadata = {
  title: "AIPhotoGen",
  description: "Ai-powered image generator and editor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("font-IBMPlex antialiased", IBMplex.variable)}>{children}</body>
    </html>
  );
}
