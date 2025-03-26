"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import styles from "../styles/WorkShowcase.module.css";
import { ArrowUpRight, Award, BarChart3, Globe, Users } from "lucide-react";

export default function WorkShowcaseSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const projectCardsRef = useRef<HTMLDivElement[]>([]);
  const [activeTab, setActiveTab] = useState("all");
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

  // Set card refs
  const setCardRef = (el: HTMLDivElement | null, index: number) => {
    if (el) {
      projectCardsRef.current[index] = el;
    }
  };

  // GSAP animations
  useEffect(() => {
    // Section title animations
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

    // Project cards animation
    projectCardsRef.current.forEach((cardRef, index) => {
      if (cardRef) {
        ScrollTrigger.create({
          trigger: cardRef,
          start: "top 85%",
          onEnter: () => {
            gsap.fromTo(
              cardRef,
              { opacity: 0, y: 80 },
              {
                opacity: 1,
                y: 0,
                duration: 0.9,
                delay: index * 0.15,
                ease: "power3.out",
              }
            );
          },
          once: true,
        });
      }
    });

    // Improved horizontal scroll for projects on larger screens
    if (projectsRef.current && window.innerWidth >= 1024) {
      const container = projectsRef.current;
      const panels = gsap.utils.toArray<HTMLElement>(".project-card");
      const totalWidth = panels.reduce((acc, panel) => acc + panel.offsetWidth + 24, 0); // Including gap

      // Create scroll indicator elements
      const scrollIndicator = document.createElement("div");
      scrollIndicator.className = styles.scrollIndicator;
      container.appendChild(scrollIndicator);

      // Timeline for smoother entrance and exit transitions
      const horizontalScrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          pin: true,
          pinSpacing: true,
          start: "top 15%",
          end: () => `+=${totalWidth - container.offsetWidth + 500}`, // Add extra scroll distance for smoother exit
          scrub: 1, // Smoother scrub value
          invalidateOnRefresh: true, // Recalculate on window resize
          anticipatePin: 1, // Smoother pin behavior
          onEnter: () => {
            // Entrance transition
            gsap.to(container, {
              className: `${styles.horizontalScrollContainer} ${styles.activeScroll}`,
              duration: 0.5,
              ease: "power2.inOut",
            });

            gsap.to(scrollIndicator, {
              opacity: 1,
              duration: 0.5,
              delay: 0.2,
              ease: "power2.inOut",
            });
          },
          onLeaveBack: () => {
            // Exit transition when scrolling back up
            gsap.to(container, {
              className: styles.horizontalScrollContainer,
              duration: 0.5,
              ease: "power2.inOut",
            });

            gsap.to(scrollIndicator, {
              opacity: 0,
              duration: 0.3,
              ease: "power2.inOut",
            });
          },
          onLeave: () => {
            // Exit transition when scrolling past section
            gsap.to(container, {
              className: styles.horizontalScrollContainer,
              duration: 0.5,
              ease: "power2.inOut",
            });

            gsap.to(scrollIndicator, {
              opacity: 0,
              duration: 0.3,
              ease: "power2.inOut",
            });
          },
          onEnterBack: () => {
            // Re-enter transition when scrolling back down
            gsap.to(container, {
              className: `${styles.horizontalScrollContainer} ${styles.activeScroll}`,
              duration: 0.5,
              ease: "power2.inOut",
            });

            gsap.to(scrollIndicator, {
              opacity: 1,
              duration: 0.5,
              delay: 0.2,
              ease: "power2.inOut",
            });
          },
        },
      });

      // Add the horizontal scroll animation to the timeline
      horizontalScrollTimeline.to(panels, {
        x: () => -(totalWidth - container.offsetWidth),
        ease: "power1.inOut", // Smoother easing for better transition feel
        duration: 1, // Controlled by scrub, but helps with initial easing
      });

      // Add movement to each card for parallax-like effect
      panels.forEach((panel, i) => {
        const rotationValue = i % 2 === 0 ? 1 : -1;

        ScrollTrigger.create({
          trigger: panel,
          containerAnimation: horizontalScrollTimeline, // Link to main timeline for better sync
          start: "left center",
          end: "right center",
          scrub: 0.5, // Smoother scrub
          toggleClass: { targets: panel, className: styles.activeCard },
          onUpdate: (self) => {
            // Smoother panel transitions
            gsap.to(panel, {
              rotateZ: rotationValue * self.progress * 0.5, // Subtle rotation
              scale: 0.95 + self.progress * 0.1, // Subtle scale
              duration: 0.4, // Increased for smoother motion
              ease: "power2.out", // Better easing
            });
          },
        });
      });
    }
  }, []);

  // Project data
  const projects = [
    {
      id: 1,
      title: "Streamline Finance",
      category: "technology",
      image: "/project1.jpg", // Replace with actual image path
      logo: "/client-logo1.png", // Replace with actual logo path
      stats: [
        { label: "Conversion Rate", value: "+142%" },
        { label: "User Engagement", value: "+87%" },
      ],
      tags: ["Web App", "FinTech", "UI/UX"],
    },
    {
      id: 2,
      title: "Ecolution Brand",
      category: "creative",
      image: "/project2.jpg", // Replace with actual image path
      logo: "/client-logo2.png", // Replace with actual logo path
      stats: [
        { label: "Brand Recognition", value: "+96%" },
        { label: "Social Followers", value: "12.5K" },
      ],
      tags: ["Branding", "Social Media", "Design"],
    },
    {
      id: 3,
      title: "Retail Analytics",
      category: "strategy",
      image: "/project3.jpg", // Replace with actual image path
      logo: "/client-logo3.png", // Replace with actual logo path
      stats: [
        { label: "Revenue Growth", value: "+35%" },
        { label: "Customer Retention", value: "+68%" },
      ],
      tags: ["Analytics", "E-commerce", "Strategy"],
    },
    {
      id: 4,
      title: "Wellness Connect",
      category: "technology",
      image: "/project4.jpg", // Replace with actual image path
      logo: "/client-logo4.png", // Replace with actual logo path
      stats: [
        { label: "App Downloads", value: "125K" },
        { label: "User Satisfaction", value: "97%" },
      ],
      tags: ["Mobile App", "Healthcare", "UX"],
    },
    {
      id: 5,
      title: "Urban Living",
      category: "creative",
      image: "/project5.jpg", // Replace with actual image path
      logo: "/client-logo5.png", // Replace with actual logo path
      stats: [
        { label: "Market Reach", value: "+210%" },
        { label: "Campaign ROI", value: "6.8x" },
      ],
      tags: ["Real Estate", "Marketing", "Design"],
    },
  ];

  // Filter projects based on active tab
  const filteredProjects = activeTab === "all" ? projects : projects.filter((project) => project.category === activeTab);

  // Map category to icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "strategy":
        return <BarChart3 className="w-4 h-4" />;
      case "creative":
        return <Award className="w-4 h-4" />;
      case "technology":
        return <Globe className="w-4 h-4" />;
      default:
        return <BarChart3 className="w-4 h-4" />;
    }
  };

  return (
    <section className="py-24 overflow-hidden relative" ref={sectionRef}>
      {/* Background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute w-full h-full bg-[url('/mesh-grid.png')] bg-cover opacity-20 mix-blend-luminosity"></div>

        <div ref={bgElementsRef} className="relative w-full h-full">
          <div className="bg-element absolute top-20 -left-20 w-96 h-96 rounded-full bg-gradient-to-r from-purple-600/10 to-blue-600/10 blur-3xl"></div>
          <div className="bg-element absolute bottom-40 right-20 w-80 h-80 rounded-full bg-gradient-to-r from-pink-600/10 to-purple-600/10 blur-3xl"></div>
          <div className="bg-element absolute top-1/2 left-1/3 w-64 h-64 rounded-full bg-gradient-to-r from-blue-600/10 to-cyan-600/10 blur-3xl"></div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Section header */}
        <div ref={titleRef} className="text-center mb-16 max-w-3xl mx-auto">
          <Badge
            variant="outline"
            className="animate-element mb-5 inline-block px-4 py-2 bg-gradient-to-r from-purple-500/10 to-purple-500/20 backdrop-blur-sm rounded-full border border-purple-500/20">
            <p className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-blue-300 text-xs font-medium tracking-widest uppercase">Our Work</p>
          </Badge>

          <h2 className="animate-element text-3xl md:text-5xl font-bold mb-5 text-balance">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Transforming Businesses</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">With Digital Excellence</span>
          </h2>

          <p className="animate-element text-sm md:text-base text-white/70 mx-auto font-light leading-relaxed">
            Explore our portfolio of successful projects that have helped businesses achieve their digital goals and make a lasting impact in their industries.
          </p>
        </div>

        {/* Tabs for filtering */}
        <div className="animate-element flex justify-center mb-12">
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-black/20 backdrop-blur-md border border-white/10 p-1">
              <TabsTrigger value="all" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500/30 data-[state=active]:to-blue-500/30 data-[state=active]:backdrop-blur-sm">
                All Work
              </TabsTrigger>
              <TabsTrigger
                value="strategy"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500/30 data-[state=active]:to-blue-500/30 data-[state=active]:backdrop-blur-sm">
                Strategy
              </TabsTrigger>
              <TabsTrigger
                value="creative"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500/30 data-[state=active]:to-blue-500/30 data-[state=active]:backdrop-blur-sm">
                Creative
              </TabsTrigger>
              <TabsTrigger
                value="technology"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500/30 data-[state=active]:to-blue-500/30 data-[state=active]:backdrop-blur-sm">
                Technology
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Project cards - Horizontally scrollable on desktop */}
        <div ref={projectsRef} className={`relative lg:min-h-[600px] ${styles.horizontalScrollContainer}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:flex lg:flex-nowrap lg:gap-6 lg:overflow-visible">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                ref={(el) => setCardRef(el as HTMLDivElement, index)}
                className={`project-card ${styles.projectCard} group relative flex-shrink-0 lg:w-[450px] overflow-hidden rounded-2xl border border-white/10 transition-all duration-500 ${
                  activeTab !== "all" && project.category !== activeTab ? "hidden" : ""
                }`}>
                <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/60 to-black/90 z-10"></div>

                {/* Project image */}
                <div className="relative h-[500px] w-full overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    fill
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88P//fwAJZQNhCXGfdgAAAABJRU5ErkJggg=="
                  />
                </div>

                {/* Content overlay */}
                <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 md:p-8">
                  {/* Client logo */}
                  <div className="mb-4 w-16 h-16 bg-black/30 backdrop-blur-md rounded-xl flex items-center justify-center p-3 border border-white/10">
                    <Image src={project.logo} alt="Client Logo" width={40} height={40} className="opacity-90" />
                  </div>

                  {/* Category badge */}
                  <div className="mb-3">
                    <Badge
                      className={cn(
                        "inline-flex items-center gap-1.5 py-1 px-2.5 text-xs font-medium",
                        project.category === "strategy" && "bg-purple-500/20 text-purple-300 border-purple-500/30",
                        project.category === "creative" && "bg-pink-500/20 text-pink-300 border-pink-500/30",
                        project.category === "technology" && "bg-blue-500/20 text-blue-300 border-blue-500/30"
                      )}>
                      {getCategoryIcon(project.category)}
                      <span className="capitalize">{project.category}</span>
                    </Badge>
                  </div>

                  {/* Project title */}
                  <h3 className="text-2xl md:text-3xl font-bold mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-300 group-hover:to-blue-300 transition-all duration-300">
                    {project.title}
                  </h3>

                  {/* Project stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {project.stats.map((stat, idx) => (
                      <div key={idx} className="border-l-2 border-purple-500/50 pl-3">
                        <div className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-blue-300">{stat.value}</div>
                        <div className="text-xs text-white/60">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, idx) => (
                      <span key={idx} className="text-xs py-1 px-2.5 rounded-full bg-white/10 text-white/70">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* View case study button */}
                  <Button className="w-full bg-gradient-to-r from-purple-600/90 to-blue-600/90 text-white border-0 rounded-xl hover:shadow-lg hover:shadow-purple-900/20 transition-all">
                    View Case Study
                    <ArrowUpRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View all work button */}
        <div className="flex justify-center mt-12">
          <Button className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-7 py-6 rounded-xl text-base font-medium hover:shadow-lg transition-all">
            View All Case Studies
            <ArrowUpRight className="ml-2 w-4 h-4" />
          </Button>
        </div>

        {/* Floating decorator elements */}
        <div className="hidden lg:block">
          <Badge variant="outline" className={`${styles.animateFloat} absolute right-10 top-40 bg-black/30 backdrop-blur-lg border border-white/10 py-2 px-4 shadow-xl flex items-center gap-2`}>
            <Users className="w-4 h-4 text-blue-400" />
            <span className="text-xs text-white">Trusted by 500+ Clients</span>
          </Badge>
        </div>
      </div>
    </section>
  );
}
