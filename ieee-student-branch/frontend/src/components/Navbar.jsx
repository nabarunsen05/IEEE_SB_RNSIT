import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", to: "/" },
  { name: "About", to: "/about" },
  { name: "Events", to: "/events" },
  { name: "Projects", to: "/projects" },
  { name: "Domains", to: "/domains" },
  { name: "Team", to: "/team" },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-[#071A2B]/90 backdrop-blur-lg">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3"
          onClick={() => setMenuOpen(false)}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#00629B] font-bold text-white">
            IEEE
          </div>

          <div className="leading-tight">
            <p className="font-bold text-white">IEEE SB</p>
            <p className="text-xs text-slate-400">RNSIT</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const active = isActive(link.to);

            return (
              <Link
                key={link.name}
                to={link.to}
                className={`relative py-2 text-sm font-medium transition ${
                  active
                    ? "text-[#29A9E0]"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                {link.name}

                {/* Active underline */}
                {active && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-[#29A9E0]" />
                )}
              </Link>
            );
          })}

          {/* Join Us */}
          <Link
            to="/join"
            className={`rounded-full px-5 py-2.5 text-sm font-semibold text-white transition ${
              isActive("/join")
                ? "bg-[#0077B8]"
                : "bg-[#00629B] hover:bg-[#0077B8]"
            }`}
          >
            Join Us
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="text-white md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="border-t border-white/10 bg-[#071A2B] px-6 py-5 md:hidden">
          <div className="flex flex-col gap-2">

            {navLinks.map((link) => {
              const active = isActive(link.to);

              return (
                <Link
                  key={link.name}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className={`rounded-lg px-4 py-3 text-sm font-medium transition ${
                    active
                      ? "bg-[#00629B]/20 text-[#29A9E0]"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {/* Mobile Join Us */}
            <Link
              to="/join"
              onClick={() => setMenuOpen(false)}
              className="mt-2 rounded-lg bg-[#00629B] px-5 py-3 text-center font-semibold text-white transition hover:bg-[#0077B8]"
            >
              Join Us
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;