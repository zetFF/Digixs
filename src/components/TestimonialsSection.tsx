"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import styles from "../styles/TestimonialsSection.module.css";
import { ArrowLeft, ArrowRight, Quote, Star, Users, Globe, Award, ChevronRight, ChevronLeft } from "lucide-react";

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const testimonialCardsRef = useRef<HTMLDivElement[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const bgElementsRef = useRef<HTMLDivElement>(null);
  const sliderTrackRef = useRef<HTMLDivElement>(null);
  const [visibleItems, setVisibleItems] = useState(3);

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

  // Set testimonial card refs
  const setCardRef = (el: HTMLDivElement | null, index: number) => {
    if (el) {
      testimonialCardsRef.current[index] = el;
    }
  };

  // Parallax effect for background elements
  useEffect(() => {
    if (bgElementsRef.current) {
      const elements = bgElementsRef.current.querySelectorAll(".bg-element");
      elements.forEach((element, index) => {
        const speed = index * 0.05 + 0.1;
        gsap.to(element, {
          x: (mousePosition.x / window.innerWidth - 0.5) * 50 * speed,
          y: (mousePosition.y / window.innerHeight - 0.5) * 50 * speed,
          duration: 1,
          ease: "power2.out",
        });
      });
    }
  }, [mousePosition]);

  // Check visible items based on window width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setVisibleItems(3);
      } else if (window.innerWidth >= 768) {
        setVisibleItems(2);
      } else {
        setVisibleItems(1);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

    // Testimonial cards animation
    testimonialCardsRef.current.forEach((cardRef, index) => {
      if (cardRef) {
        ScrollTrigger.create({
          trigger: cardRef,
          start: "top 85%",
          onEnter: () => {
            gsap.fromTo(
              cardRef,
              { opacity: 0, y: 80, rotateY: -5 },
              {
                opacity: 1,
                y: 0,
                rotateY: 0,
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

    // Slider track animation with ScrollTrigger
    if (testimonialsRef.current && window.innerWidth >= 768) {
      const testimonials = gsap.utils.toArray(".testimonial-card");

      ScrollTrigger.create({
        trigger: testimonialsRef.current,
        start: "top 70%",
        end: "+=300",
        scrub: 1,
        onEnter: () => {
          gsap.to(testimonials, {
            scale: 1,
            opacity: 1,
            stagger: 0.1,
            ease: "power2.out",
            duration: 0.8,
          });
        },
      });

      // Add parallax effect to each testimonial
      testimonials.forEach((testimonial, i) => {
        const depth = i % 2 === 0 ? 0.8 : 1.2;

        ScrollTrigger.create({
          trigger: testimonial as Element,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
          onUpdate: (self: ScrollTrigger) => {
            gsap.to(testimonial as Element, {
              y: self.progress * 30 * depth,
              duration: 0.1,
            });
          },
        });
      });
    }

    // GSAP transition for slider
    if (sliderTrackRef.current) {
      const extraOffset = window.innerWidth < 768 ? 0 : 32; // Adjust for gap
      const itemWidth = sliderTrackRef.current.querySelector(".testimonial-card")?.clientWidth ?? 0;
      const offset = (itemWidth + extraOffset) * activeIndex;

      gsap.to(sliderTrackRef.current, {
        x: -offset,
        duration: 0.8,
        ease: "power3.out",
      });
    }
  }, [activeIndex]);

  // Handle navigation
  const handlePrevSlide = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const handleNextSlide = () => {
    setActiveIndex((prev) => (prev < testimonials.length - visibleItems ? prev + 1 : prev));
  };

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      client: "Sophia Chen",
      role: "Marketing Director",
      company: "Envision Media",
      logo: "/clients/client-1.svg",
      industry: "marketing",
      content:
        "Working with this team transformed our digital presence completely. We've seen a 200% increase in engagement and our conversion rates have never been higher. The strategic approach and attention to detail was exactly what we needed.",
      rating: 5,
      avatar: "/testimonials/client-1.jpg",
      color: "blue",
    },
    {
      id: 2,
      client: "Marcus Johnson",
      role: "Chief Technology Officer",
      company: "TechVault Systems",
      logo: "/clients/client-2.svg",
      industry: "technology",
      content:
        "The development team delivered a platform that exceeded our expectations. Their technical expertise and innovative solutions helped us overcome complex challenges. The result is a scalable system that our entire organization relies on daily.",
      rating: 5,
      avatar: "/testimonials/client-2.jpg",
      color: "purple",
    },
    {
      id: 3,
      client: "Emily Rodriguez",
      role: "E-commerce Manager",
      company: "StyleHub",
      logo: "/clients/client-3.svg",
      industry: "retail",
      content:
        "Our online sales increased by 150% since the redesign. The user experience is seamless, and our customers love the new interface. The team was responsive to our feedback and delivered an exceptional e-commerce solution.",
      rating: 5,
      avatar: "/testimonials/client-3.jpg",
      color: "pink",
    },
    {
      id: 4,
      client: "David Williams",
      role: "Operations Director",
      company: "BuildWell Construction",
      logo: "/clients/client-4.svg",
      industry: "construction",
      content:
        "The custom solution provided streamlined our project management processes and saved us countless hours. The team showed a remarkable understanding of our industry-specific needs and delivered a tool that's become indispensable.",
      rating: 4,
      avatar: "/testimonials/client-4.jpg",
      color: "amber",
    },
    {
      id: 5,
      client: "Olivia Parker",
      role: "Creative Director",
      company: "Artisinal Studios",
      logo: "/clients/client-5.svg",
      industry: "design",
      content:
        "As a design studio, we have high standards for creative work, and this agency surpassed them all. Their approach blends creativity with data-driven decisions, resulting in branding that truly resonates with our target audience.",
      rating: 5,
      avatar: "/testimonials/client-5.jpg",
      color: "cyan",
    },
    {
      id: 6,
      client: "James Henderson",
      role: "CEO",
      company: "NexGen Startups",
      logo: "/clients/client-6.svg",
      industry: "technology",
      content:
        "From concept to execution, the team provided strategic insights that helped us refine our vision. Their comprehensive approach to digital transformation gave us the competitive edge we needed in the marketplace.",
      rating: 5,
      avatar: "/testimonials/client-6.jpg",
      color: "emerald",
    },
  ];

  // Map industry to icon
  const getIndustryIcon = (industry: string) => {
    switch (industry) {
      case "marketing":
        return <Globe className="w-4 h-4" />;
      case "technology":
        return <Award className="w-4 h-4" />;
      case "retail":
        return <Users className="w-4 h-4" />;
      case "construction":
        return <Globe className="w-4 h-4" />;
      case "design":
        return <Award className="w-4 h-4" />;
      default:
        return <Globe className="w-4 h-4" />;
    }
  };

  // Get testimonial color
  const getTestimonialColor = (color: string) => {
    switch (color) {
      case "blue":
        return "from-blue-600 to-indigo-600";
      case "purple":
        return "from-purple-600 to-violet-600";
      case "pink":
        return "from-pink-600 to-rose-600";
      case "amber":
        return "from-amber-600 to-orange-600";
      case "cyan":
        return "from-cyan-600 to-blue-600";
      case "emerald":
        return "from-emerald-600 to-teal-600";
      default:
        return "from-purple-600 to-blue-600";
    }
  };

  return (
    <section className="py-24 overflow-hidden relative" ref={sectionRef}>
      {/* Background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute w-full h-full bg-[url('/mesh-grid.png')] bg-cover opacity-20 mix-blend-luminosity"></div>

        <div ref={bgElementsRef} className="relative w-full h-full">
          <div className="bg-element absolute top-20 -left-20 w-96 h-96 rounded-full bg-gradient-to-r from-blue-600/10 to-indigo-600/10 blur-3xl"></div>
          <div className="bg-element absolute bottom-40 right-20 w-80 h-80 rounded-full bg-gradient-to-r from-pink-600/10 to-purple-600/10 blur-3xl"></div>
          <div className="bg-element absolute top-1/2 left-1/3 w-64 h-64 rounded-full bg-gradient-to-r from-amber-600/10 to-orange-600/10 blur-3xl"></div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Section header */}
        <div ref={titleRef} className="text-center mb-16 max-w-3xl mx-auto">
          <Badge variant="outline" className="animate-element mb-5 inline-block px-4 py-2 bg-gradient-to-r from-blue-500/10 to-blue-500/20 backdrop-blur-sm rounded-full border border-blue-500/20">
            <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300 text-xs font-medium tracking-widest uppercase">Testimonials</p>
          </Badge>

          <h2 className="animate-element text-3xl md:text-5xl font-bold mb-5 text-balance">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">What Our Clients</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">Say About Us</span>
          </h2>

          <p className="animate-element text-sm md:text-base text-white/70 mx-auto font-light leading-relaxed">
            Don't just take our word for it. Hear from the businesses who have experienced transformative results through our partnership.
          </p>
        </div>

        {/* Testimonials slider */}
        <div ref={testimonialsRef} className="relative">
          {/* Navigation and stats */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500/20 to-indigo-500/20 flex items-center justify-center backdrop-blur-lg">
                <Quote className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-xs text-white/70">Client Satisfaction</p>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-3 h-3 fill-blue-400 text-blue-400" />
                  ))}
                  <span className="text-sm font-bold text-white ml-1">4.9/5</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                onClick={handlePrevSlide}
                disabled={activeIndex === 0}
                className={`w-10 h-10 rounded-full p-0 ${activeIndex === 0 ? "bg-white/5 text-white/40" : "bg-white/10 text-white hover:bg-white/20 hover:text-white"}`}>
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button
                onClick={handleNextSlide}
                disabled={activeIndex >= testimonials.length - visibleItems}
                className={`w-10 h-10 rounded-full p-0 ${
                  activeIndex >= testimonials.length - visibleItems ? "bg-white/5 text-white/40" : "bg-white/10 text-white hover:bg-white/20 hover:text-white"
                }`}>
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Testimonial slider */}
          <div className="overflow-hidden">
            <div ref={sliderTrackRef} className="flex gap-8 transition-transform duration-700 ease-out">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  ref={(el) => setCardRef(el as HTMLDivElement, index)}
                  className={`testimonial-card flex-shrink-0 w-full md:w-[calc(50%-16px)] xl:w-[calc(33.333%-21.333px)] ${styles.testimonialCard}`}>
                  {/* Card content */}
                  <div className="h-full bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 transition-all duration-300 hover:shadow-xl hover:shadow-blue-900/10 relative overflow-hidden group">
                    {/* Background accent */}
                    <div className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full bg-gradient-to-r from-blue-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl"></div>

                    {/* Border accent */}
                    <div className={`absolute top-0 left-8 h-1 w-16 rounded-b-xl bg-gradient-to-r ${getTestimonialColor(testimonial.color)}`}></div>

                    {/* Quote icon */}
                    <div className="absolute top-6 right-8 text-white/10">
                      <Quote className="w-16 h-16" />
                    </div>

                    {/* Testimonial content */}
                    <div className="relative z-10">
                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className={`w-4 h-4 ${star <= testimonial.rating ? "fill-amber-400 text-amber-400" : "text-white/20"}`} />
                        ))}
                      </div>

                      {/* Testimonial text */}
                      <blockquote className="text-white/80 text-sm leading-relaxed mb-6">"{testimonial.content}"</blockquote>

                      {/* Client info */}
                      <div className="flex items-center gap-4">
                        {/* Avatar */}
                        <div className="relative w-14 h-14 rounded-full border-2 border-white/10 overflow-hidden">
                          <Image src={testimonial.avatar} alt={testimonial.client} fill className="object-cover" />
                        </div>

                        {/* Client details */}
                        <div>
                          <h4 className="font-bold text-white">{testimonial.client}</h4>
                          <p className="text-xs text-white/60">{testimonial.role}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <p className="text-xs text-white/80">{testimonial.company}</p>
                            <Badge
                              className={cn(
                                "inline-flex items-center gap-1 py-0.5 px-1.5 text-[10px] font-medium",
                                testimonial.industry === "marketing" && "bg-blue-500/20 text-blue-300 border-blue-500/30",
                                testimonial.industry === "technology" && "bg-purple-500/20 text-purple-300 border-purple-500/30",
                                testimonial.industry === "retail" && "bg-pink-500/20 text-pink-300 border-pink-500/30",
                                testimonial.industry === "construction" && "bg-amber-500/20 text-amber-300 border-amber-500/30",
                                testimonial.industry === "design" && "bg-cyan-500/20 text-cyan-300 border-cyan-500/30"
                              )}>
                              {getIndustryIcon(testimonial.industry)}
                              <span className="capitalize">{testimonial.industry}</span>
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination indicator */}
          <div className="flex justify-center items-center gap-2 mt-8">
            {Array.from({ length: testimonials.length - visibleItems + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full ${activeIndex === index ? "bg-blue-500 w-6" : "bg-white/20"} transition-all duration-300`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* View all testimonials button */}
        <div className="flex justify-center mt-12">
          <Button className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-7 py-6 rounded-xl text-base font-medium hover:shadow-lg transition-all">
            View All Testimonials
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>

        {/* Floating decorator elements */}
        <div className="hidden lg:block">
          <Badge variant="outline" className={`${styles.animateFloat} absolute left-10 top-[30%] bg-black/30 backdrop-blur-lg border border-white/10 py-2 px-4 shadow-xl flex items-center gap-2`}>
            <Award className="w-4 h-4 text-amber-400" />
            <span className="text-xs text-white">Named Top Agency 2023</span>
          </Badge>

          <Badge
            variant="outline"
            className={`${styles.animateFloatDelay} absolute right-10 bottom-[20%] bg-black/30 backdrop-blur-lg border border-white/10 py-2 px-4 shadow-xl flex items-center gap-2`}>
            <Users className="w-4 h-4 text-blue-400" />
            <span className="text-xs text-white">Over 200+ Success Stories</span>
          </Badge>
        </div>
      </div>
    </section>
  );
}
