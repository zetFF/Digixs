"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import styles from "../styles/TeamSection.module.css";
import { ArrowRight, Award, Briefcase, LinkedinIcon, TwitterIcon, Globe, Mail, User, Users2 } from "lucide-react";

export default function TeamSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const teamGridRef = useRef<HTMLDivElement>(null);
  const teamMemberRefs = useRef<HTMLDivElement[]>([]);
  const [activeFilter, setActiveFilter] = useState("all");
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

  // Set team member refs
  const setTeamMemberRef = (el: HTMLDivElement | null, index: number) => {
    if (el) {
      teamMemberRefs.current[index] = el;
    }
  };

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
    // Title animation
    if (titleRef.current) {
      const titleElements = titleRef.current.querySelectorAll(".animate-element");

      ScrollTrigger.create({
        trigger: titleRef.current,
        start: "top 85%",
        onEnter: () => {
          gsap.fromTo(titleElements, { opacity: 0, y: 50 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: "power3.out" });
        },
        once: true,
      });
    }

    // Team member animations
    teamMemberRefs.current.forEach((memberRef, index) => {
      if (memberRef) {
        ScrollTrigger.create({
          trigger: memberRef,
          start: "top 85%",
          onEnter: () => {
            gsap.fromTo(
              memberRef,
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

  // Team members data
  const teamMembers = [
    {
      id: 1,
      name: "Alex Johnson",
      title: "Creative Director",
      department: "creative",
      image: "/team/team-1.jpg",
      bio: "Leading our creative team with over 12 years of experience in design thinking and brand strategy.",
      expertise: ["Brand Strategy", "UX Design", "Art Direction"],
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
    {
      id: 2,
      name: "Sophia Chen",
      title: "Technical Lead",
      department: "development",
      image: "/team/team-2.jpg",
      bio: "Full-stack developer with expertise in React, Node.js, and cloud architecture solutions.",
      expertise: ["Front-end Development", "System Architecture", "Performance Optimization"],
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
    {
      id: 3,
      name: "Marcus Williams",
      title: "Strategy Director",
      department: "strategy",
      image: "/team/team-3.jpg",
      bio: "Digital strategist specializing in data-driven marketing campaigns and business growth.",
      expertise: ["Market Research", "Digital Strategy", "Growth Hacking"],
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
    {
      id: 4,
      name: "Olivia Taylor",
      title: "UX Designer",
      department: "creative",
      image: "/team/team-4.jpg",
      bio: "Creating intuitive user experiences through research, wireframing, and interface design.",
      expertise: ["User Research", "Wireframing", "Prototyping"],
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
    {
      id: 5,
      name: "David Park",
      title: "Frontend Developer",
      department: "development",
      image: "/team/team-5.jpg",
      bio: "Transforming designs into responsive, accessible, and performant web experiences.",
      expertise: ["React", "TypeScript", "CSS Animation"],
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
    {
      id: 6,
      name: "Emma Rodriguez",
      title: "Marketing Strategist",
      department: "strategy",
      image: "/team/team-6.jpg",
      bio: "Crafting effective marketing strategies that connect brands with their target audiences.",
      expertise: ["Content Strategy", "Campaign Planning", "Analytics"],
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
  ];

  // Filter team members based on active filter
  const filteredTeam = activeFilter === "all" ? teamMembers : teamMembers.filter((member) => member.department === activeFilter);

  // Function to get department color
  const getDepartmentColor = (department: string) => {
    switch (department) {
      case "creative":
        return "from-blue-600 to-cyan-600";
      case "development":
        return "from-purple-600 to-indigo-600";
      case "strategy":
        return "from-amber-600 to-orange-600";
      default:
        return "from-blue-600 to-purple-600";
    }
  };

  // Function to get department icon
  const getDepartmentIcon = (department: string) => {
    switch (department) {
      case "creative":
        return <Globe className="w-4 h-4" />;
      case "development":
        return <Briefcase className="w-4 h-4" />;
      case "strategy":
        return <Award className="w-4 h-4" />;
      default:
        return <User className="w-4 h-4" />;
    }
  };

  return (
    <section className="py-24 overflow-hidden relative" ref={sectionRef}>
      {/* Background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute w-full h-full bg-[url('/mesh-grid.png')] bg-cover opacity-20 mix-blend-luminosity"></div>

        <div ref={bgElementsRef} className="relative w-full h-full">
          <div className="bg-element absolute top-20 -left-20 w-96 h-96 rounded-full bg-gradient-to-r from-blue-600/10 to-cyan-600/10 blur-3xl"></div>
          <div className="bg-element absolute bottom-40 right-20 w-80 h-80 rounded-full bg-gradient-to-r from-purple-600/10 to-indigo-600/10 blur-3xl"></div>
          <div className="bg-element absolute top-1/2 left-1/3 w-64 h-64 rounded-full bg-gradient-to-r from-amber-600/10 to-orange-600/10 blur-3xl"></div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Section header */}
        <div ref={titleRef} className="text-center mb-16 max-w-3xl mx-auto">
          <Badge variant="outline" className="animate-element mb-5 inline-block px-4 py-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/20 backdrop-blur-sm rounded-full border border-cyan-500/20">
            <p className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300 text-xs font-medium tracking-widest uppercase">Our Team</p>
          </Badge>

          <h2 className="animate-element text-3xl md:text-5xl font-bold mb-5 text-balance">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Meet the Talented Minds</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">Behind Your Success</span>
          </h2>

          <p className="animate-element text-sm md:text-base text-white/70 mx-auto font-light leading-relaxed">
            Our diverse team of experts combines creativity, technical excellence, and strategic thinking to deliver exceptional digital solutions for our clients.
          </p>
        </div>

        {/* Department filter */}
        <div className="animate-element flex justify-center mb-12">
          <div className="flex flex-wrap gap-2 bg-black/20 backdrop-blur-md border border-white/10 p-1 rounded-lg">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-4 py-2 rounded-lg text-sm transition-all ${activeFilter === "all" ? "bg-gradient-to-r from-blue-500/30 to-indigo-500/30 text-white" : "text-white/70 hover:text-white"}`}>
              All
            </button>
            <button
              onClick={() => setActiveFilter("creative")}
              className={`px-4 py-2 rounded-lg text-sm transition-all ${
                activeFilter === "creative" ? "bg-gradient-to-r from-blue-500/30 to-cyan-500/30 text-white" : "text-white/70 hover:text-white"
              }`}>
              Creative
            </button>
            <button
              onClick={() => setActiveFilter("development")}
              className={`px-4 py-2 rounded-lg text-sm transition-all ${
                activeFilter === "development" ? "bg-gradient-to-r from-purple-500/30 to-indigo-500/30 text-white" : "text-white/70 hover:text-white"
              }`}>
              Development
            </button>
            <button
              onClick={() => setActiveFilter("strategy")}
              className={`px-4 py-2 rounded-lg text-sm transition-all ${
                activeFilter === "strategy" ? "bg-gradient-to-r from-amber-500/30 to-orange-500/30 text-white" : "text-white/70 hover:text-white"
              }`}>
              Strategy
            </button>
          </div>
        </div>

        {/* Team grid */}
        <div ref={teamGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredTeam.map((member, index) => (
            <div
              key={member.id}
              ref={(el) => setTeamMemberRef(el as HTMLDivElement, index)}
              className={`${styles.teamCard} group relative overflow-hidden rounded-xl border border-white/10 transition-all duration-500`}>
              {/* Member image with gradient overlay */}
              <div className="relative h-[280px] overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-b from-transparent to-black/90 z-10`}></div>
                <div className={`absolute inset-0 bg-gradient-to-t from-transparent to-black/30 z-10`}></div>

                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-700 scale-[1.01] group-hover:scale-[1.08]"
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88P//fwAJZQNhCXGfdgAAAABJRU5ErkJggg=="
                />

                {/* Department badge */}
                <div className="absolute top-4 left-4 z-20">
                  <Badge
                    className={cn(
                      "inline-flex items-center gap-1.5 py-1 px-2.5 text-xs font-medium",
                      member.department === "creative" && "bg-blue-500/20 text-blue-300 border-blue-500/30",
                      member.department === "development" && "bg-purple-500/20 text-purple-300 border-purple-500/30",
                      member.department === "strategy" && "bg-amber-500/20 text-amber-300 border-amber-500/30"
                    )}>
                    {getDepartmentIcon(member.department)}
                    <span className="capitalize">{member.department}</span>
                  </Badge>
                </div>

                {/* Gradient circle decoration */}
                <div
                  className={`absolute bottom-0 right-0 w-32 h-32 rounded-full bg-gradient-to-r ${getDepartmentColor(
                    member.department
                  )} opacity-20 blur-xl transform translate-x-1/4 translate-y-1/4 z-10`}></div>
              </div>

              {/* Content */}
              <div className="relative z-20 p-6">
                <h3 className="text-xl font-bold mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-300 group-hover:to-blue-300 transition-all duration-300">
                  {member.name}
                </h3>

                <p className="text-sm text-white/60 mb-4">{member.title}</p>

                <p className="text-sm text-white/70 mb-6">{member.bio}</p>

                {/* Expertise */}
                <div className="mb-6">
                  <h4 className="text-xs uppercase text-white/50 mb-2">Expertise</h4>
                  <div className="flex flex-wrap gap-2">
                    {member.expertise.map((skill, idx) => (
                      <span key={idx} className="text-xs py-1 px-2.5 rounded-full bg-white/10 text-white/70">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Social links */}
                <div className="flex gap-3">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-blue-600/20 transition-colors">
                    <LinkedinIcon className="w-4 h-4 text-white/70" />
                  </a>
                  <a
                    href={member.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-blue-400/20 transition-colors">
                    <TwitterIcon className="w-4 h-4 text-white/70" />
                  </a>
                  <a
                    href={`mailto:${member.name.toLowerCase().replace(" ", ".")}@company.com`}
                    className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-amber-600/20 transition-colors">
                    <Mail className="w-4 h-4 text-white/70" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-black/40 to-black/20 backdrop-blur-md border border-white/10 rounded-2xl p-10 max-w-4xl mx-auto relative overflow-hidden">
            <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-gradient-to-r from-blue-600/20 to-cyan-600/20 blur-3xl"></div>
            <div className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full bg-gradient-to-r from-indigo-600/20 to-purple-600/20 blur-3xl"></div>

            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">Join Our Growing Team</h3>
            <p className="text-white/70 mb-8 max-w-2xl mx-auto">
              We're always looking for talented individuals who are passionate about creating exceptional digital experiences. Check out our open positions.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-7 py-6 rounded-xl text-base font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 hover:-translate-y-1">
                View Open Positions
              </Button>
              <Button variant="outline" className="bg-white/5 border-white/10 text-white px-7 py-6 rounded-xl text-base font-medium hover:bg-white/10 hover:text-white transition-all duration-300">
                Meet the Full Team
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>

            {/* Floating badge */}
            <Badge variant="outline" className={`${styles.animateFloat} absolute right-10 top-6 bg-black/30 backdrop-blur-lg border border-white/10 py-2 px-4 shadow-xl flex items-center gap-2`}>
              <Users2 className="w-4 h-4 text-blue-400" />
              <span className="text-xs text-white">25+ Industry Experts</span>
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
}
