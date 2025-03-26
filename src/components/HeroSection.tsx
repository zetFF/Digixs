"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import styles from "../styles/HeroSection.module.css";
// Import Lucide icons
import { BarChart3, Palette, CodeXml } from "lucide-react";

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const imageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const orbsRef = useRef<HTMLDivElement>(null);

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

  // Fungsi untuk menetapkan referensi ke array
  const setCardRef = (el: HTMLDivElement | null, index: number) => {
    if (el) {
      cardsRef.current[index] = el;
    }
  };

  // Parallax effect for orbs
  useEffect(() => {
    if (orbsRef.current) {
      const orbs = orbsRef.current.querySelectorAll(".orb");
      orbs.forEach((orb, index) => {
        const speed = index * 0.05 + 0.1;
        gsap.to(orb, {
          x: (mousePosition.x / window.innerWidth - 0.5) * 30 * speed,
          y: (mousePosition.y / window.innerHeight - 0.5) * 30 * speed,
          duration: 1,
          ease: "power2.out",
        });
      });
    }
  }, [mousePosition]);

  // GSAP animations
  useEffect(() => {
    // GSAP animations on page load
    const tl = gsap.timeline();

    if (textRef.current) {
      // Split text animation
      const badge = textRef.current.querySelector(".badge");
      const title = textRef.current.querySelectorAll(".title-part");
      const subtitle = textRef.current.querySelector("p");
      const buttons = textRef.current.querySelectorAll("button");

      if (badge && title && subtitle && buttons) {
        tl.fromTo(badge, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" })
          .fromTo(title, { opacity: 0, x: -50 }, { opacity: 1, x: 0, stagger: 0.2, duration: 0.8, ease: "power3.out" })
          .fromTo(subtitle, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.6")
          .fromTo(buttons, { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.2, duration: 0.6, ease: "back.out(1.7)" }, "-=0.4");
      }
    }

    // Animate image section
    if (imageRef.current) {
      const mockups = imageRef.current.querySelectorAll(".mockup");
      tl.fromTo(
        mockups,
        { opacity: 0, y: 100, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.15,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.6"
      );
    }

    // Stats animation
    if (statsRef.current) {
      const statItems = statsRef.current.querySelectorAll(".stat-item");

      ScrollTrigger.create({
        trigger: statsRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.fromTo(statItems, { opacity: 0, y: 30 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: "power3.out" });
        },
        once: true,
      });
    }

    // Cards animation
    cardsRef.current.forEach((cardRef, index) => {
      if (cardRef) {
        ScrollTrigger.create({
          trigger: cardRef,
          start: "top 85%",
          onEnter: () => {
            gsap.fromTo(
              cardRef,
              { opacity: 0, y: 50 },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: index * 0.1,
                ease: "power3.out",
              }
            );
          },
          once: true,
        });
      }
    });
  }, []);

  // Map service to corresponding Lucide icon
  const getServiceIcon = (iconName: string, accentColor: string) => {
    const className = cn("w-6 h-6", accentColor === "purple" && "text-purple-400", accentColor === "blue" && "text-blue-400", accentColor === "pink" && "text-pink-400");

    switch (iconName) {
      case "strategy":
        return <BarChart3 className={className} />;
      case "creative":
        return <Palette className={className} />;
      case "technology":
        return <CodeXml className={className} />;
      default:
        return <BarChart3 className={className} />;
    }
  };

  return (
    <div className="pt-24 md:pt-32 overflow-hidden relative" ref={heroRef}>
      {/* Background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute w-full h-full bg-[url('/mesh-grid.png')] bg-cover opacity-20 mix-blend-luminosity"></div>

        <div className="absolute top-20 left-0 w-full h-full">
          <div ref={orbsRef} className="relative w-full h-full">
            <div className={`${styles.orb} ${styles.animateFloatSlow} absolute w-72 h-72 rounded-full bg-gradient-to-b from-purple-600/20 to-transparent -left-32 top-40 blur-3xl`}></div>
            <div className={`${styles.orb} ${styles.animateFloat} absolute w-72 h-72 rounded-full bg-gradient-to-b from-blue-600/20 to-transparent right-0 top-60 blur-3xl`}></div>
            <div className={`${styles.orb} ${styles.animateFloatDelay} absolute w-72 h-72 rounded-full bg-gradient-to-b from-pink-600/20 to-transparent left-1/3 bottom-20 blur-3xl`}></div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto">
        {/* Hero Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-24">
          {/* Text content */}
          <div className="lg:col-span-6 space-y-8" ref={textRef}>
            <div className="badge inline-block px-4 py-2 bg-gradient-to-r from-purple-500/10 to-purple-500/20 backdrop-blur-sm rounded-full border border-purple-500/20">
              <p className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-blue-300 text-xs font-medium tracking-widest uppercase">Digital Marketing Agency</p>
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-none">
                <span className="title-part block text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Elevate Your</span>
                <span className="title-part block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">Digital Presence</span>
              </h1>
              <p className="text-base md:text-base text-white max-w-xl leading-relaxed">
                We craft exceptional digital experiences that convert visitors into loyal customers. Our data-driven approach ensures measurable results that grow your business.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-7 py-5 rounded-xl text-base font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 hover:-translate-y-1">
                Get Started
              </Button>
              <Button variant="outline" className="bg-white/5 border-white/10 text-white px-7 py-5 rounded-xl text-base font-medium hover:bg-white/10 hover:text-white transition-all duration-300">
                View Our Work
              </Button>
            </div>

            {/* Floating badges */}
            <div className="hidden lg:block relative w-full">
              <Badge variant="outline" className={`${styles.animateFloat} absolute -right-4 top-10 bg-black/30 backdrop-blur-lg border border-white/10 py-2 px-4 shadow-xl flex items-center gap-2`}>
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <span className="text-xs text-white">AI-Powered Insights</span>
              </Badge>
            </div>
          </div>

          {/* Mockup images */}
          <div className="lg:col-span-6 relative h-[400px] md:h-[450px] lg:h-[500px]" ref={imageRef}>
            {/* Mockup image 1 */}
            <div className="mockup absolute top-[5%] left-[5%] w-[45%] h-auto aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl transform -rotate-6 hover:-rotate-3 transition-all duration-500">
              <Image src="/wa1.jpg" alt="Mobile Application" fill className="object-cover" />
            </div>

            {/* Mockup image 2 */}
            <div className="mockup absolute top-[20%] right-[5%] w-[55%] h-auto aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl transform rotate-6 hover:rotate-3 transition-all duration-500">
              <Image src="/wa2.jpg" alt="Dashboard Interface" fill className="object-cover" />
            </div>

            {/* Mockup image 3 */}
            <div className="mockup absolute bottom-[5%] left-[15%] w-[65%] h-auto aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl transform rotate-3 hover:rotate-0 transition-all duration-500">
              <Image src="/wa3.jpg" alt="Analytics Dashboard" fill className="object-cover" />
            </div>

            {/* Floating stats card */}
            <div className={`${styles.animateFloatSlow} mockup absolute bottom-[15%] right-[10%] p-4 bg-black/60 backdrop-blur-md rounded-xl border border-white/10 shadow-xl`}>
              <div className="text-xs text-gray-400 uppercase tracking-widest mb-1">Conversion Rate</div>
              <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">+143%</div>
              <div className="w-full h-1.5 bg-gray-700 rounded-full mt-2 overflow-hidden">
                <div className="h-full w-[75%] bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats section */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 p-6 md:p-8 bg-gradient-to-r from-purple-900/10 to-blue-900/10 backdrop-blur-md rounded-xl border border-white/10 mb-24">
          {[
            { value: "10+", label: "Years Experience", icon: "crown" },
            { value: "200+", label: "Projects Completed", icon: "check" },
            { value: "95%", label: "Client Satisfaction", icon: "star" },
            { value: "24/7", label: "Support", icon: "clock" },
          ].map((stat, index) => (
            <div key={index} className="stat-item flex gap-3 items-center">
              <div
                className={cn(
                  "w-12 h-12 rounded-lg flex items-center justify-center",
                  index === 0 && "bg-purple-500/20 text-purple-400",
                  index === 1 && "bg-blue-500/20 text-blue-400",
                  index === 2 && "bg-pink-500/20 text-pink-400",
                  index === 3 && "bg-emerald-500/20 text-emerald-400"
                )}>
                {stat.icon === "crown" && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"></path>
                  </svg>
                )}
                {stat.icon === "check" && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                    <path d="m9 12 2 2 4-4"></path>
                  </svg>
                )}
                {stat.icon === "star" && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                )}
                {stat.icon === "clock" && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                )}
              </div>
              <div>
                <div className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">{stat.value}</div>
                <div className="text-xs uppercase tracking-widest text-gray-400 font-medium">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Services Section */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-purple-500/10 to-purple-500/20 backdrop-blur-sm rounded-full border border-purple-500/20 mb-5">
              <p className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-blue-300 text-xs font-medium tracking-widest uppercase">Our Services</p>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-5 text-balance bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">Comprehensive Digital Solutions</h2>
            <p className="text-sm md:text-base text-white/70 max-w-2xl mx-auto font-light leading-relaxed">
              From strategy development to creative execution and technical implementation, we provide end-to-end solutions to elevate your digital presence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Strategy",
                icon: "strategy",
                description: "Data-driven approach to maximize your digital potential and ROI.",
                features: ["Market Research", "Competitor Analysis", "Target Audience Profiling"],
                accent: "purple",
              },
              {
                title: "Creative",
                icon: "creative",
                description: "Eye-catching designs that establish brand identity and engage users.",
                features: ["UI/UX Design", "Content Creation", "Brand Development"],
                accent: "blue",
              },
              {
                title: "Technology",
                icon: "technology",
                description: "Cutting-edge solutions built for performance and scalability.",
                features: ["Web Development", "Mobile Apps", "Cloud Infrastructure"],
                accent: "pink",
              },
            ].map((service, index) => (
              <Card
                key={index}
                className="bg-gradient-to-b from-gray-900/90 to-gray-900/40 border-0 backdrop-blur-md overflow-hidden rounded-xl transition-all duration-300 group hover:shadow-xl hover:shadow-purple-900/10">
                <CardContent className="p-6 relative" ref={(el) => setCardRef(el as HTMLDivElement, index)}>
                  <div
                    className={cn(
                      "absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2",
                      service.accent === "purple" && "bg-purple-600/10 group-hover:bg-purple-600/20",
                      service.accent === "blue" && "bg-blue-600/10 group-hover:bg-blue-600/20",
                      service.accent === "pink" && "bg-pink-600/10 group-hover:bg-pink-600/20"
                    )}></div>

                  <div
                    className={cn(
                      "icon-container w-12 h-12 mb-6 flex items-center justify-center transition-all duration-300 rounded-lg",
                      service.accent === "purple" && "bg-gradient-to-br from-purple-500 to-violet-600 group-hover:shadow-[0_0_30px_rgba(124,58,237,0.5)]",
                      service.accent === "blue" && "bg-gradient-to-br from-blue-500 to-cyan-600 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]",
                      service.accent === "pink" && "bg-gradient-to-br from-pink-500 to-rose-600 group-hover:shadow-[0_0_30px_rgba(219,39,119,0.5)]"
                    )}>
                    {getServiceIcon(service.icon, service.accent)}
                  </div>

                  <div className="mb-6 flex items-center gap-5">
                    <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 transition-all duration-300">
                      {service.title}
                    </h3>
                  </div>

                  <p className="text-sm text-white/70 mb-6 leading-relaxed">{service.description}</p>

                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500/80"></div>
                        <span className="text-xs text-white/80">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className="mt-8 bg-white/5 hover:bg-white/10 border-0 text-white/90 hover:text-white text-xs font-normal rounded-lg py-2 px-3 transition-colors duration-200"
                    variant="outline">
                    Learn more
                    <svg className="ml-1.5 w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
