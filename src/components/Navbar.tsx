"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import gsap from "gsap";
import { motion, AnimatePresence } from "framer-motion";

// Define navigation items structure
const navItems = [
  {
    title: "Services",
    href: "/services",
    submenu: [
      {
        title: "Digital Marketing",
        description: "Strategic campaigns that deliver results",
        href: "/services/digital-marketing",
        icon: "chart",
      },
      {
        title: "Web Development",
        description: "Custom websites and applications",
        href: "/services/web-development",
        icon: "code",
      },
      {
        title: "Brand Strategy",
        description: "Identity design and positioning",
        href: "/services/brand-strategy",
        icon: "target",
      },
      {
        title: "Content Creation",
        description: "Engaging content that converts",
        href: "/services/content-creation",
        icon: "edit",
      },
    ],
  },
  {
    title: "Work",
    href: "/work",
    submenu: [
      {
        title: "Case Studies",
        description: "Results we've achieved for clients",
        href: "/work/case-studies",
        icon: "folder",
      },
      {
        title: "Portfolio",
        description: "Our creative showcase",
        href: "/work/portfolio",
        icon: "image",
      },
    ],
  },
  { title: "About", href: "/about" },
  { title: "Blog", href: "/blog" },
  { title: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [searchActive, setSearchActive] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);
  const [currentTime, setCurrentTime] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const megaMenuRef = useRef<HTMLDivElement>(null);

  // Update time display
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Handle window scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Handle click outside mega menu
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (megaMenuRef.current && !megaMenuRef.current.contains(e.target as Node)) {
        setActiveSubmenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Toggle search
  const toggleSearch = () => {
    setSearchActive(!searchActive);
    setTimeout(() => {
      if (!searchActive && searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, 100);
  };

  return (
    <div className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300", scrolled ? "bg-gray-950 backdrop-blur-md" : "bg-transparent")}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo & Navigation */}
          <div className="flex items-center gap-6">
            {/* Logo with digital style */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-white/5 bg-[length:16px_16px]"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-500 opacity-80 [mask-image:radial-gradient(farthest-side_at_top_right,white,transparent)]"></div>
                <span className="text-white font-bold text-xl relative z-10">D</span>
              </div>
              <span className="text-white text-xl font-bold tracking-tight hidden md:inline-block">
                Digix<span className="text-purple-400">.</span>
              </span>

              {/* Digital timestamp */}
              <div className="hidden md:flex items-center text-xs font-mono text-white/50 ml-2 border-l border-white/10 pl-3">
                <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse mr-1.5"></div>
                <span>{currentTime}</span>
              </div>
            </Link>

            {/* Desktop navigation links */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item, index) => (
                <div key={item.title} className="relative group">
                  {item.submenu ? (
                    <button
                      onMouseEnter={() => setActiveSubmenu(item.title)}
                      className={cn("nav-button px-3 py-2 rounded-lg text-sm transition-colors", activeSubmenu === item.title ? "text-white" : "text-gray-300 hover:text-white hover:bg-white/5")}>
                      <span>{item.title}</span>
                      <svg className={cn("ml-1 w-4 h-4 inline-block transition-transform", activeSubmenu === item.title && "rotate-180")} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "nav-button px-3 py-2 rounded-lg text-sm transition-colors relative group",
                        pathname === item.href ? "text-white" : "text-gray-300 hover:text-white hover:bg-white/5"
                      )}>
                      <span>{item.title}</span>

                      {/* Active indicator - glowing dot and line */}
                      {pathname === item.href && (
                        <>
                          <span className="absolute -bottom-1 left-3 right-3 h-[2px] bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></span>
                          <span className="absolute -bottom-1 left-1/2 w-1 h-1 bg-purple-400 rounded-full shadow-glow-sm transform -translate-x-1/2 translate-y-[-0.5px]"></span>
                        </>
                      )}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
          </div>

          {/* Desktop Right Side Actions */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Notification button with count badge */}
            <button className="nav-button p-2 text-gray-300 hover:text-white rounded-full hover:bg-white/5 transition-colors relative">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
              </svg>

              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center rounded-full bg-purple-500 text-white text-[10px] font-semibold">{notificationCount}</span>
              )}
            </button>

            {/* Login button with digital effects */}
            <Button variant="ghost" className="text-sm text-white/90 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10" onClick={() => console.log("Login clicked")}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              Login
            </Button>

            {/* Get Started button with futuristic glow effect */}
            <Button className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-purple-blue transition-all duration-300 px-4">
              <span className="relative z-10">Get Started</span>

              {/* Scan line animation */}
              <span className="absolute inset-0 overflow-hidden">
                <span
                  className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent transform translate-y-0 transition-transform animate-scan"
                  style={{
                    animationDuration: "2s",
                  }}></span>
              </span>

              {/* Digital noise pattern */}
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></span>

              {/* Glow effect */}
              <span className="absolute -inset-1 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-300 pointer-events-none"></span>
            </Button>
          </div>

          {/* Mobile Navigation Trigger with digital aesthetic */}
          <div className="flex lg:hidden items-center gap-2">
            {/* Mobile search */}
            {searchActive ? (
              <div className="relative w-full max-w-[180px]">
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search..."
                  className="nav-button pl-8 pr-8 py-1.5 bg-white/5 border border-white/10 rounded-full text-white/90 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500/40 focus:border-purple-500/40 placeholder-white/40 w-full transition-all duration-300"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
                <button onClick={toggleSearch} className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              </div>
            ) : (
              <button onClick={toggleSearch} className="nav-button p-2 text-gray-300 hover:text-white rounded-full hover:bg-white/5 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </button>
            )}

            {/* Mobile menu trigger - enhanced with animations */}
            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="nav-button text-white hover:bg-white/5 digital-element" onClick={() => setMenuOpen(true)}>
                  <div className="w-6 flex flex-col items-end space-y-1.5">
                    <span className="h-[2px] w-6 bg-white rounded-full transform transition-all"></span>
                    <span className="h-[2px] w-4 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full transform transition-all"></span>
                    <span className="h-[2px] w-5 bg-white rounded-full transform transition-all"></span>
                  </div>
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="bg-gradient-to-b from-gray-900 to-gray-950 border-white/10 w-full sm:w-80 p-0 overflow-y-auto">
                <div className="flex flex-col h-full">
                  {/* Mobile menu header with digital brand identity */}
                  <div className="p-6 border-b border-white/10">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center mr-3 relative overflow-hidden">
                        <div className="absolute inset-0 bg-grid-white/5 bg-[length:16px_16px]"></div>
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-500 opacity-80 [mask-image:radial-gradient(farthest-side_at_top_right,white,transparent)]"></div>
                        <span className="text-white font-bold text-xl relative z-10">D</span>
                      </div>
                      <span className="text-white text-xl font-bold tracking-tight">
                        DigitalX<span className="text-purple-400">.</span>
                      </span>
                    </div>

                    {/* Digital time display */}
                    <div className="mt-4 flex items-center justify-between text-xs text-white/50 font-mono">
                      <div className="flex items-center gap-1.5">
                        <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></div>
                        <span>ONLINE</span>
                      </div>
                      <div>{currentTime}</div>
                    </div>
                  </div>

                  {/* Mobile search bar with cybernetic style */}
                  <div className="p-6 border-b border-white/10">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search..."
                        className="pl-9 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white/90 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/40 placeholder-white/40 w-full"
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.3-4.3" />
                      </svg>
                    </div>
                  </div>

                  {/* Mobile menu navigation with animated indicators */}
                  <nav className="flex-1 py-6 px-4 overflow-y-auto">
                    <div className="space-y-1">
                      <div className="pb-2 mb-4 border-b border-white/5">
                        <SheetClose asChild>
                          <Link
                            href="/"
                            className={cn(
                              "flex items-center px-4 py-2.5 rounded-lg transition-all",
                              pathname === "/" ? "bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-white font-medium" : "text-gray-300 hover:text-white hover:bg-white/5"
                            )}>
                            <svg className="mr-3 h-5 w-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                              />
                            </svg>
                            <span>Home</span>

                            {pathname === "/" && (
                              <div className="ml-auto flex items-center">
                                <div className="h-1.5 w-1.5 rounded-full bg-purple-400"></div>
                              </div>
                            )}
                          </Link>
                        </SheetClose>
                      </div>

                      {/* Mobile navigation items with collapsible sections */}
                      {navItems.map((item, index) => (
                        <div key={item.title} className="mb-1 last:mb-0">
                          {item.submenu ? (
                            <div>
                              <button
                                onClick={() => setActiveSubmenu(activeSubmenu === item.title ? null : item.title)}
                                className={cn(
                                  "w-full flex items-center justify-between px-4 py-2.5 rounded-lg transition-all",
                                  activeSubmenu === item.title ? "bg-gradient-to-r from-purple-500/10 to-blue-500/10 text-white font-medium" : "text-gray-300 hover:text-white hover:bg-white/5"
                                )}>
                                <span>{item.title}</span>
                                <svg
                                  className={cn("h-4 w-4 transition-transform duration-200", activeSubmenu === item.title ? "transform rotate-180" : "")}
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                              </button>

                              {/* Submenu items */}
                              {activeSubmenu === item.title && (
                                <div className="mt-1 pl-4 pr-1 py-1 space-y-1">
                                  {item.submenu.map((subItem) => (
                                    <SheetClose key={subItem.title} asChild>
                                      <Link
                                        href={subItem.href}
                                        className={cn(
                                          "flex items-center px-4 py-2.5 rounded-lg transition-all",
                                          pathname === subItem.href ? "bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-white font-medium" : "text-gray-300 hover:text-white hover:bg-white/5"
                                        )}>
                                        <span>{subItem.title}</span>
                                        {pathname === subItem.href && (
                                          <div className="ml-auto flex items-center">
                                            <div className="h-1.5 w-1.5 rounded-full bg-purple-400"></div>
                                          </div>
                                        )}
                                      </Link>
                                    </SheetClose>
                                  ))}
                                </div>
                              )}
                            </div>
                          ) : (
                            <SheetClose asChild>
                              <Link
                                href={item.href}
                                className={cn(
                                  "flex items-center px-4 py-2.5 rounded-lg transition-all",
                                  pathname === item.href ? "bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-white font-medium" : "text-gray-300 hover:text-white hover:bg-white/5"
                                )}>
                                <span>{item.title}</span>
                                {pathname === item.href && (
                                  <div className="ml-auto flex items-center">
                                    <div className="h-1.5 w-1.5 rounded-full bg-purple-400"></div>
                                  </div>
                                )}
                              </Link>
                            </SheetClose>
                          )}
                        </div>
                      ))}
                    </div>
                  </nav>

                  {/* Bottom actions with futuristic styling */}
                  <div className="p-6 border-t border-white/10 space-y-4">
                    <Button variant="ghost" className="w-full border border-white/10 text-white hover:bg-white/10 group">
                      <span className="mr-2 text-xs font-mono bg-white/10 px-1.5 py-0.5 rounded group-hover:bg-white/20 transition-colors">CTRL+L</span>
                      Login
                    </Button>

                    <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white relative overflow-hidden group">
                      <span className="relative z-10">Get Started</span>
                      <span className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      </span>
                    </Button>

                    {/* Digital signature */}
                    <div className="text-center text-xs text-white/30 font-mono mt-6">
                      <div className="flex items-center justify-center space-x-1">
                        <div className="h-1 w-1 rounded-full bg-green-500 animate-pulse"></div>
                        <span>SYSTEM ONLINE</span>
                        <div className="h-1 w-1 rounded-full bg-green-500 animate-pulse"></div>
                      </div>
                      <div className="mt-1">VERSION 2.3.4</div>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Add the mega menu overlay component */}
      <AnimatePresence>
        {activeSubmenu && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              onClick={() => setActiveSubmenu(null)}
            />

            <motion.div
              ref={megaMenuRef}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 w-full z-50 bg-gray-900/95 backdrop-blur-xl shadow-2xl">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {navItems
                    .find((item) => item.title === activeSubmenu)
                    ?.submenu?.map((item) => (
                      <Link key={item.title} href={item.href} className="group p-3 rounded-lg hover:bg-white/5 transition-colors relative overflow-hidden" onClick={() => setActiveSubmenu(null)}>
                        {/* Digital gradient border effect */}
                        <div className="absolute inset-0 border border-white/10 rounded-lg group-hover:border-purple-500/30 transition-colors"></div>

                        {/* Icon */}
                        <div className="w-8 h-8 rounded-md bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center mb-3">
                          <RenderIcon name={item.icon} />
                        </div>

                        <h4 className="font-medium text-white mb-1 group-hover:text-purple-400 transition-colors">{item.title}</h4>
                        {item.description && <p className="text-sm text-white/60 group-hover:text-white/80 transition-colors">{item.description}</p>}

                        {/* Animated hover indicator */}
                        <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-300"></div>
                      </Link>
                    ))}
                </div>

                {/* Featured content section */}
                <div className="mt-8 pt-6 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-white/70">FEATURED</h3>
                    <Button variant="link" className="text-xs text-purple-400 hover:text-purple-300">
                      View All
                      <svg className="ml-1 w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Button>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-4">
                    {/* We'll generate three placeholder featured items */}
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="bg-white/5 rounded-lg overflow-hidden group hover:bg-white/10 transition-colors">
                        <div className="h-24 bg-gradient-to-br from-purple-900/40 to-blue-900/40 relative">
                          {/* Placeholder background pattern */}
                          <div className="absolute inset-0 opacity-20 bg-[url('/grid-pattern.svg')] bg-repeat bg-[length:24px_24px]"></div>
                        </div>
                        <div className="p-3">
                          <h5 className="text-sm font-medium text-white group-hover:text-purple-300 transition-colors">Featured Project {item}</h5>
                          <p className="text-xs text-white/60 mt-1">Strategic digital transformation</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// Helper component to render icons
function RenderIcon({ name }: { name?: string }) {
  // Default to a placeholder icon if none specified
  if (!name) {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-purple-400">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4" />
        <path d="M12 8h.01" />
      </svg>
    );
  }
  // Map icon names to SVG components
  const icons: { [key: string]: React.ReactElement } = {
    chart: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-purple-400">
        <path d="M21 21H3" />
        <path d="M21 21V7.8c0-1.68 0-2.52-.327-3.162a3 3 0 0 0-1.311-1.311C18.72 3 17.88 3 16.2 3h-2.4c-1.68 0-2.52 0-3.162.327a3 3 0 0 0-1.311 1.311C9 5.28 9 6.12 9 7.8V21" />
        <path d="M9 21V12.6c0-1.68 0-2.52-.327-3.162a3 3 0 0 0-1.311-1.311C6.72 8 5.88 8 4.2 8H3v13" />
      </svg>
    ),
    code: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-cyan-400">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    target: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-400">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
    edit: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-pink-400">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    ),
    folder: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-yellow-400">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
      </svg>
    ),
    image: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-400">
        <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="m21 15-5-5L5 21" />
      </svg>
    ),
  };

  return icons[name] || icons.chart;
}
