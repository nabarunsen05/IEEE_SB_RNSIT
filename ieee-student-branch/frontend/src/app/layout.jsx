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
      <body className="min-h-screen bg-white text-[#10243A] antialiased selection:bg-[#00629B] selection:text-white flex flex-col justify-between">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
