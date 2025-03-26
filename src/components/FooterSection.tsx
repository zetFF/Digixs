"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "../styles/FooterSection.module.css";
import { ArrowRight, Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, MapPin, Phone, Globe, ChevronRight, Send } from "lucide-react";

export default function FooterSection() {
  const footerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const bgElementsRef = useRef<HTMLDivElement>(null);

  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // Mouse move effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Parallax effect for background elements
  useEffect(() => {
    if (bgElementsRef.current) {
      const elements = bgElementsRef.current.querySelectorAll(".bg-element");
      elements.forEach((element, index) => {
        const speed = index * 0.05 + 0.1;
        gsap.to(element, {
          x: (mousePosition.x / window.innerWidth - 0.5) * 40 * speed,
          y: (mousePosition.y / window.innerHeight - 0.5) * 40 * speed,
          duration: 1,
          ease: "power2.out",
        });
      });
    }
  }, [mousePosition]);

  // GSAP animations
  useEffect(() => {
    // CTA section animations
    if (ctaRef.current) {
      const ctaElements = ctaRef.current.querySelectorAll(".animate-element");

      ScrollTrigger.create({
        trigger: ctaRef.current,
        start: "top 85%",
        onEnter: () => {
          gsap.fromTo(ctaElements, { opacity: 0, y: 50 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: "power3.out" });
        },
        once: true,
      });
    }

    // Footer links animations
    if (linksRef.current) {
      const columnElements = linksRef.current.querySelectorAll(".footer-column");

      ScrollTrigger.create({
        trigger: linksRef.current,
        start: "top 85%",
        onEnter: () => {
          gsap.fromTo(columnElements, { opacity: 0, y: 30 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.7, ease: "power3.out" });
        },
        once: true,
      });
    }

    // Social icons animation
    if (contentRef.current) {
      const socialIcons = contentRef.current.querySelectorAll(".social-icon");

      ScrollTrigger.create({
        trigger: socialIcons[0],
        start: "top 90%",
        onEnter: () => {
          gsap.fromTo(socialIcons, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, stagger: 0.05, duration: 0.5, ease: "back.out(1.7)" });
        },
        once: true,
      });
    }
  }, []);

  // Current year for copyright
  const currentYear = new Date().getFullYear();

  return (
    <footer className="pt-24 pb-10 overflow-hidden relative" ref={footerRef}>
      {/* Background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute w-full h-full bg-[url('/mesh-grid.png')] bg-cover opacity-20 mix-blend-luminosity"></div>

        <div ref={bgElementsRef} className="relative w-full h-full">
          <div className="bg-element absolute top-20 -left-20 w-96 h-96 rounded-full bg-gradient-to-r from-purple-600/10 to-blue-600/10 blur-3xl"></div>
          <div className="bg-element absolute bottom-40 right-20 w-80 h-80 rounded-full bg-gradient-to-r from-pink-600/10 to-purple-600/10 blur-3xl"></div>
          <div className="bg-element absolute top-1/2 left-1/3 w-64 h-64 rounded-full bg-gradient-to-r from-blue-600/10 to-cyan-600/10 blur-3xl"></div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4" ref={contentRef}>
        {/* Newsletter & CTA Section */}
        <div ref={ctaRef} className="mb-20">
          <div className="bg-gradient-to-r from-black/40 to-black/20 backdrop-blur-md border border-white/10 rounded-2xl p-10 md:p-14 max-w-6xl mx-auto relative overflow-hidden">
            <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-gradient-to-r from-purple-600/20 to-blue-600/20 blur-3xl"></div>
            <div className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full bg-gradient-to-r from-purple-600/20 to-blue-600/20 blur-3xl"></div>

            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <Badge
                  variant="outline"
                  className="animate-element mb-5 inline-block px-4 py-2 bg-gradient-to-r from-purple-500/10 to-purple-500/20 backdrop-blur-sm rounded-full border border-purple-500/20">
                  <p className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-blue-300 text-xs font-medium tracking-widest uppercase">Stay Updated</p>
                </Badge>

                <h2 className="animate-element text-3xl md:text-4xl font-bold mb-5 text-balance">
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Subscribe to Our</span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">Newsletter</span>
                </h2>

                <p className="animate-element text-sm md:text-base text-white/70 font-light leading-relaxed mb-6">
                  Get the latest insights, tips, and updates on digital marketing trends delivered straight to your inbox.
                </p>
              </div>

              <div className="animate-element">
                <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-6 relative">
                  <form className="space-y-4">
                    <div>
                      <label htmlFor="email" className="text-sm text-white/70 mb-2 block">
                        Email Address
                      </label>
                      <div className="relative">
                        <Input
                          type="email"
                          id="email"
                          placeholder="yourname@example.com"
                          className="bg-black/30 border-white/10 text-white py-6 px-4 rounded-lg w-full focus:border-purple-500 focus:ring-purple-500/20"
                        />
                        <Mail className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="consent" className="bg-black/50 border-white/20 rounded text-purple-500 focus:ring-purple-500/30" />
                      <label htmlFor="consent" className="text-xs text-white/60">
                        I agree to receive marketing communications from your company
                      </label>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-6 rounded-xl text-base font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300">
                      Subscribe Now
                      <Send className="ml-2 w-4 h-4" />
                    </Button>
                  </form>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <Badge variant="outline" className={`${styles.animateFloat} absolute right-10 top-6 bg-black/30 backdrop-blur-lg border border-white/10 py-2 px-4 shadow-xl flex items-center gap-2`}>
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <span className="text-xs text-white">Weekly Digital Insights</span>
            </Badge>
          </div>
        </div>

        {/* Footer links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-16" ref={linksRef}>
          {/* Company information */}
          <div className="footer-column lg:col-span-4">
            <div className="mb-8">
              <Image src="/logo.svg" alt="Digital Agency Logo" width={180} height={40} />
            </div>

            <p className="text-white/70 text-sm leading-relaxed mb-6">
              We're a full-service digital agency specializing in creating exceptional brand experiences that drive measurable business growth.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-purple-400" />
                </div>
                <span className="text-sm text-white/80">123 Innovation Way, Tech City, TC 10101</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-purple-400" />
                </div>
                <span className="text-sm text-white/80">contact@digitalagency.com</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-purple-400" />
                </div>
                <span className="text-sm text-white/80">+1 (555) 123-4567</span>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-8">
              <a
                href="#"
                className="social-icon w-9 h-9 rounded-full bg-white/5 hover:bg-gradient-to-br hover:from-purple-500/70 hover:to-blue-500/70 flex items-center justify-center transition-all duration-300">
                <Facebook className="w-4 h-4 text-white/80" />
              </a>
              <a
                href="#"
                className="social-icon w-9 h-9 rounded-full bg-white/5 hover:bg-gradient-to-br hover:from-purple-500/70 hover:to-blue-500/70 flex items-center justify-center transition-all duration-300">
                <Twitter className="w-4 h-4 text-white/80" />
              </a>
              <a
                href="#"
                className="social-icon w-9 h-9 rounded-full bg-white/5 hover:bg-gradient-to-br hover:from-purple-500/70 hover:to-blue-500/70 flex items-center justify-center transition-all duration-300">
                <Instagram className="w-4 h-4 text-white/80" />
              </a>
              <a
                href="#"
                className="social-icon w-9 h-9 rounded-full bg-white/5 hover:bg-gradient-to-br hover:from-purple-500/70 hover:to-blue-500/70 flex items-center justify-center transition-all duration-300">
                <Linkedin className="w-4 h-4 text-white/80" />
              </a>
              <a
                href="#"
                className="social-icon w-9 h-9 rounded-full bg-white/5 hover:bg-gradient-to-br hover:from-purple-500/70 hover:to-blue-500/70 flex items-center justify-center transition-all duration-300">
                <Youtube className="w-4 h-4 text-white/80" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-column lg:col-span-2">
            <h3 className="text-white font-bold mb-6 text-lg">Quick Links</h3>
            <ul className="space-y-3">
              {["Home", "About Us", "Services", "Portfolio", "Blog", "Careers", "Contact"].map((link) => (
                <li key={link} className="group">
                  <Link href="#" className="flex items-center text-white/70 hover:text-white text-sm group-hover:translate-x-1 transition-all duration-300">
                    <ChevronRight className="w-3 h-3 mr-2 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="footer-column lg:col-span-2">
            <h3 className="text-white font-bold mb-6 text-lg">Our Services</h3>
            <ul className="space-y-3">
              {["Digital Marketing", "Web Development", "UI/UX Design", "Brand Strategy", "Content Creation", "SEO Optimization", "Social Media"].map((service) => (
                <li key={service} className="group">
                  <Link href="#" className="flex items-center text-white/70 hover:text-white text-sm group-hover:translate-x-1 transition-all duration-300">
                    <ChevronRight className="w-3 h-3 mr-2 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="footer-column lg:col-span-2">
            <h3 className="text-white font-bold mb-6 text-lg">Resources</h3>
            <ul className="space-y-3">
              {["Case Studies", "Testimonials", "Blog Articles", "eBooks & Guides", "Webinars", "Tools & Resources", "Newsletter"].map((resource) => (
                <li key={resource} className="group">
                  <Link href="#" className="flex items-center text-white/70 hover:text-white text-sm group-hover:translate-x-1 transition-all duration-300">
                    <ChevronRight className="w-3 h-3 mr-2 text-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {resource}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="footer-column lg:col-span-2">
            <h3 className="text-white font-bold mb-6 text-lg">Support</h3>
            <ul className="space-y-3">
              {["Help Center", "FAQs", "Contact Support", "Privacy Policy", "Terms of Service", "Cookie Policy", "Sitemap"].map((item) => (
                <li key={item} className="group">
                  <Link href="#" className="flex items-center text-white/70 hover:text-white text-sm group-hover:translate-x-1 transition-all duration-300">
                    <ChevronRight className="w-3 h-3 mr-2 text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8"></div>

        {/* Copyright and legal */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-white/50 text-sm">© {currentYear} Digital Agency. All rights reserved.</div>

          <div className="flex items-center gap-6">
            <Link href="#" className="text-white/50 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-white/50 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="text-white/50 hover:text-white text-sm transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
