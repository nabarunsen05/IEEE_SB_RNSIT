import "./globals.css";
import Navbar from "../components/Navbar";
import { Providers } from "./providers";

export const metadata = {
  title: "IEEE Student Branch | RNSIT",
  description: "Official portal for IEEE Student Branch at RNS Institute of Technology, Bangalore",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#071A2B] text-slate-100 antialiased selection:bg-[#00629B] selection:text-white">
        <Providers>
          <Navbar />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}

