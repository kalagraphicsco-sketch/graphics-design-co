import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { Menu, Shield, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useIsAdmin } from "../hooks/useQueries";

interface NavbarProps {
  onAdminClick: () => void;
}

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Team", href: "#team" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({ onAdminClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const queryClient = useQueryClient();
  const { data: isAdmin } = useIsAdmin();
  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === "logging-in";

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
    } else {
      try {
        await login();
      } catch (e: any) {
        if (e?.message === "User is already authenticated") {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-navy/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a
            href="#hero"
            className="flex items-center gap-2 group"
            data-ocid="nav.link"
          >
            <div className="w-9 h-9 bg-orange rounded-lg flex items-center justify-center shadow-orange">
              <span className="text-white font-display font-bold text-lg">
                N
              </span>
            </div>
            <span className="text-white font-display font-semibold text-lg tracking-tight">
              Studio Nova
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-white/80 hover:text-white text-sm font-medium transition-colors duration-200"
                data-ocid="nav.link"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {isAdmin && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onAdminClick}
                className="text-white/80 hover:text-white hover:bg-white/10 gap-1.5"
                data-ocid="nav.admin.button"
              >
                <Shield className="w-4 h-4" />
                Admin
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleAuth}
              disabled={isLoggingIn}
              className="text-white/70 hover:text-white hover:bg-white/10 text-sm"
              data-ocid="nav.login.button"
            >
              {isLoggingIn
                ? "Logging in..."
                : isAuthenticated
                  ? "Logout"
                  : "Login"}
            </Button>
            <a href="#contact">
              <Button
                size="sm"
                className="bg-orange hover:bg-orange-hover text-white rounded-full px-5 font-semibold shadow-orange transition-all"
                data-ocid="nav.cta.button"
              >
                GET A QUOTE
              </Button>
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            data-ocid="nav.mobile.toggle"
          >
            {mobileOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-navy-dark border-t border-white/10"
          >
            <div className="px-4 py-4 flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-white/80 hover:text-white py-2 text-sm font-medium"
                  data-ocid="nav.link"
                >
                  {link.label}
                </a>
              ))}
              {isAdmin && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    onAdminClick();
                  }}
                  className="flex items-center gap-2 text-orange py-2 text-sm font-medium"
                  data-ocid="nav.admin.button"
                >
                  <Shield className="w-4 h-4" /> Admin Panel
                </button>
              )}
              <div className="flex gap-3 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleAuth}
                  disabled={isLoggingIn}
                  className="border-white/30 text-white hover:bg-white/10 flex-1"
                  data-ocid="nav.login.button"
                >
                  {isLoggingIn
                    ? "Logging in..."
                    : isAuthenticated
                      ? "Logout"
                      : "Login"}
                </Button>
                <Button
                  size="sm"
                  onClick={() => {
                    setMobileOpen(false);
                    document
                      .querySelector("#contact")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="flex-1 bg-orange hover:bg-orange-hover text-white rounded-full font-semibold"
                  data-ocid="nav.cta.button"
                >
                  GET A QUOTE
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
