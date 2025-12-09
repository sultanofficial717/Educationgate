import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, GraduationCap, Calculator, Search, Users, Globe, FileText, MessageCircle } from "lucide-react";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AuthModal } from "@/components/AuthModal";

const navLinks = [
  { href: "/", label: "Home", icon: GraduationCap },
  { href: "/universities", label: "Universities", icon: Search },
  { href: "/entry-tests", label: "Entry Tests", icon: FileText },
  { href: "/merit-calculator", label: "Merit Calculator", icon: Calculator },
  { href: "/tutors", label: "Find Tutors", icon: Users },
  { href: "/study-abroad", label: "Study Abroad", icon: Globe },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <nav className="container mx-auto px-4 sm:px-10 lg:px-10">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img 
              src={logo} 
              alt="Edu-360 Logo" 
              className="h-16 w-auto transition-transform group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="text-2xl font-extrabold text-gradient animate-fade-in drop-shadow-sm tracking-tight leading-none">
                EDU360
              </span>
              <span className="text-[10px] font-bold text-primary tracking-widest uppercase leading-tight">
                Education for Everyone
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/ai-edubot">
              <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary/10 flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                AI EduBot
              </Button>
            </Link>
            <AuthModal>
              <Button variant="accent" size="sm">
                Get Started
              </Button>
            </AuthModal>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.href;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    {link.label}
                  </Link>
                );
              })}
              <div className="pt-4 px-4 flex flex-col gap-3">
                <Link to="/ai-edubot" className="w-full" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/10 flex items-center gap-2 justify-center">
                    <MessageCircle className="w-4 h-4" />
                    AI EduBot
                  </Button>
                </Link>
                <AuthModal>
                  <Button variant="accent" className="w-full">
                    Get Started
                  </Button>
                </AuthModal>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
