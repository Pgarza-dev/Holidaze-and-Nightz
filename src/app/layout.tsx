import type { Metadata } from "next";
import "./globals.css";
import { Bodoni_Moda, Libre_Caslon_Display } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import NavBar from "@/components/NavBar";
import "slick-carousel/slick/slick.css";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
// import { Session } from "inspector";
// import LoginProvider from "@/components/LoginProvider";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-bodoni-moda",
});

const libre = Libre_Caslon_Display({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-libre-caslon-display",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bodoni.variable} ${libre.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
         
          <NavBar />
          <main className="min-h-screen">{children}</main>
          <Toaster />
          <Footer />
        
        </ThemeProvider>
      </body>
    </html>
  );
}
