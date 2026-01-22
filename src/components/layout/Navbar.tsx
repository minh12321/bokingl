import React, { useState ,useEffect} from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from "react-router-dom";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";


import { 
  Calendar, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  Globe,
  LayoutDashboard
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';



const Navbar = () => {
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const direction = useScrollDirection(12);
  const isActive = (path: string) => location.pathname === path;
  const [activeMenu, setActiveMenu] = useState<"main" | "services">("main");

  const un = JSON.parse(localStorage.getItem("user"));
  const unf = un?.full_name?.charAt(0) ?? "";
  


  const navLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/services', label: t('nav.services') },
    { path: '/booking', label: t('nav.booking') },
    { path: '/dashboard', label: t('nav.dashboard') },
    { path: '/lo', label: t('nav.login') },
  ];

  const [showA, setShowA] = useState(true);
  const [showB, setShowB] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const login = localStorage.getItem("login");
    setIsLoggedIn(login === "true");
  }, []);



  return (
    <nav
      className={clsx(
        "fixed top-0 left-0 right-0 z-50",
        "glass border-b border-border",
        "transition-transform duration-300 ease-out",
        direction === "down" ? "-translate-y-full" : "translate-y-0"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center transition-transform group-hover:scale-110">
              <Calendar className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">Cắn đá</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 relative">
            {navLinks.map((link) => {
              const active = isActive(link.path);

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className="relative px-4 py-2 text-sm font-medium"
                >
                  {active && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute inset-0 rounded-lg bg-primary"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}

                  <span
                    className={clsx(
                      "relative z-10 transition-colors",
                      active
                        ? "text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {link.label}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-2">
            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="w-9 h-9">
                  <Globe className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem 
                  onClick={() => setLanguage('en')}
                  className={language === 'en' ? 'bg-secondary' : ''}
                >
                  🇺🇸 English
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setLanguage('vi')}
                  className={language === 'vi' ? 'bg-secondary' : ''}
                >
                  🇻🇳 Tiếng Việt
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Toggle */}
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="w-9 h-9" >
              {theme === 'light' ? (
                <Moon className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4" />
              )}
            </Button>

            {/* Auth Buttons */}

            {!isLoggedIn ? (
              <>
                <Button
                  variant="ghost"
                  className="text-sm"
                  onClick={() => navigate("/lo")}
                >
                  {t("nav.login")}
                </Button>

                <Button
                  className="text-sm gradient-primary text-primary-foreground hover:opacity-90"
                  onClick={() => navigate("/lo")}
                >
                  {t("nav.signup")}
                </Button>
              </>
            ) : (
              <>
              <Button
                variant="outline"
                onClick={() => {
                  localStorage.removeItem("login");
                  setIsLoggedIn(false);
                  navigate("/lo");
                }}
              >
                {t("nav.logout")}
              </Button>
              <Button
                  className="text-sm gradient-primary text-primary-foreground hover:opacity-90 rounded-full"
                  onClick={() => navigate("/profile")} 
                >
                  {unf}
                </Button></>
            )}
          </div> 

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-secondary"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border animate-slide-up">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex items-center gap-2 px-4 pt-4 border-t border-border mt-2">
                <Button variant="ghost" size="icon" onClick={toggleTheme}>
                  {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Globe className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setLanguage('en')}>
                      🇺🇸 English
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setLanguage('vi')}>
                      🇻🇳 Tiếng Việt
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex flex-col gap-2 px-4 pt-4">
              {!isLoggedIn ? (
              <>
                <Button variant="outline" className="w-full" onClick={() => navigate("/lo")}>
                  {t('nav.login')}
                </Button >
                <Button className="w-full gradient-primary text-primary-foreground" onClick={() => navigate("/lo")}>
                  {t('nav.signup')}
                </Button>
              
              </>
            ) : (
              <>
              <Button
                variant="outline"
                onClick={() => {
                  localStorage.removeItem("accessToken");
                  setIsLoggedIn(false);
                  navigate("/lo");
                }}
              >
                {t("nav.logout")}
              </Button>
              <Button
                  className="w-full gradient-primary text-primary-foreground "
                  onClick={() => navigate("/profile")}
                >
                  {t("nav.info")}
                </Button></>
            )}</div>
              
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
