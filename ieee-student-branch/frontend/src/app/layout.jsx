import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Providers } from "./providers";

export const metadata = {
  title: "IEEE Student Branch | RNSIT",
  description:
    "Official portal for IEEE Student Branch at RNS Institute of Technology, Bangalore",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="relative min-h-screen bg-[#F4F7FA] text-[#10243A] antialiased selection:bg-[#00629B] selection:text-white flex flex-col justify-between">
        {/* =========================================================
            VIBRANT YET TASTEFUL LIGHT-THEME BACKGROUND COLOR FLAIRS
            Adds visible atmospheric color blooms across the canvas
            while keeping the light theme crisp and readable.
        ========================================================= */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
          {/* Flair 1: Cyan-Blue Atmospheric Bloom (Top-Left) */}
          <div className="flair-blob -top-[10%] -left-[10%] h-[640px] w-[640px] bg-[radial-gradient(circle,rgba(56,189,248,0.45)_0%,rgba(2,132,199,0.3)_40%,transparent_72%)]" />

          {/* Flair 2: Warm Sunset Peach/Coral Bloom (Top-Right / Mid) */}
          <div
            className="flair-blob top-[15%] -right-[10%] h-[600px] w-[600px] bg-[radial-gradient(circle,rgba(251,146,60,0.38)_0%,rgba(249,115,22,0.25)_40%,transparent_72%)]"
            style={{ animationDelay: "-4s" }}
          />

          {/* Flair 3: Electric Violet-Indigo Bloom (Mid-Left) */}
          <div
            className="flair-blob top-[46%] -left-[8%] h-[560px] w-[560px] bg-[radial-gradient(circle,rgba(129,140,248,0.36)_0%,rgba(99,102,241,0.24)_40%,transparent_72%)]"
            style={{ animationDelay: "-8s" }}
          />

          {/* Flair 4: Sky-Cyan Bloom (Mid-Right) */}
          <div
            className="flair-blob top-[66%] -right-[8%] h-[580px] w-[580px] bg-[radial-gradient(circle,rgba(14,165,233,0.36)_0%,rgba(56,189,248,0.24)_40%,transparent_72%)]"
            style={{ animationDelay: "-12s" }}
          />

          {/* Flair 5: Mint-Teal Bloom (Bottom-Center) */}
          <div
            className="flair-blob -bottom-[12%] left-[25%] h-[620px] w-[620px] bg-[radial-gradient(circle,rgba(45,212,191,0.35)_0%,rgba(13,148,136,0.22)_40%,transparent_72%)]"
            style={{ animationDelay: "-6s" }}
          />

          {/* Subtle micro dot-matrix grid overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(#00629B_1.2px,transparent_1.2px)] [background-size:32px_32px] opacity-[0.04]" />
        </div>

        <Providers>
          <Navbar />
          <main className="relative z-10 flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
