"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import styles from "../styles/ProcessSection.module.css";
import { ArrowRight, Lightbulb, PenTool, Code, BarChart4, Rocket } from "lucide-react";

export default function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const stepItemsRef = useRef<HTMLDivElement[]>([]);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
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

  // Set step refs
  const setStepRef = (el: HTMLDivElement | null, index: number) => {
    if (el) {
      stepItemsRef.current[index] = el;
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

    // Timeline animation
    if (timelineRef.current) {
      ScrollTrigger.create({
        trigger: stepsRef.current,
        start: "top 75%",
        end: "bottom 20%",
        onUpdate: (self) => {
          gsap.to(timelineRef.current, {
            height: `${self.progress * 100}%`,
            duration: 0.1,
            ease: "none",
          });
        },
      });
    }

    // Animate each process step with improved transitions
    stepItemsRef.current.forEach((step, index) => {
      if (step) {
        // Elements within each step to animate
        const stepIcon = step.querySelector(".step-icon-container");
        const stepTitle = step.querySelector("h3");
        const stepDescription = step.querySelector("p");
        const stepDetails = step.querySelectorAll("li");
        const stepButton = step.querySelector("button");
        const stepImage = step.querySelector(".step-image-container");

        // Create a timeline for this step
        const stepTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: step,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });

        // Add animations to the timeline with appropriate staggering
        stepTimeline
          .fromTo(step, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: "power2.out" })
          .fromTo(stepIcon, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }, "-=0.2")
          .fromTo(stepTitle, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }, "-=0.3")
          .fromTo(stepDescription, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }, "-=0.2")
          .fromTo(stepDetails, { x: index % 2 === 0 ? -20 : 20, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.1, duration: 0.4, ease: "power2.out" }, "-=0.2")
          .fromTo(stepButton, { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }, "-=0.1")
          .fromTo(
            stepImage,
            {
              opacity: 0,
              x: index % 2 === 0 ? -50 : 50,
              rotateY: index % 2 === 0 ? "-15deg" : "15deg",
            },
            {
              opacity: 1,
              x: 0,
              rotateY: "0deg",
              duration: 0.6,
              ease: "power3.out",
            },
            "-=0.5"
          );
      }
    });
  }, []);

  // Process steps data
  const processSteps = [
    {
      id: 1,
      title: "Discovery",
      description: "We begin by understanding your business goals, target audience, and competitive landscape to identify opportunities for growth.",
      icon: <Lightbulb className="w-6 h-6 text-amber-400" />,
      color: "amber",
      image: "/discovery.jpg",
      details: ["Stakeholder interviews", "Market research", "Competitive analysis", "Goal definition"],
    },
    {
      id: 2,
      title: "Strategy",
      description: "Based on insights gathered, we develop a comprehensive digital strategy tailored to your specific business needs and objectives.",
      icon: <BarChart4 className="w-6 h-6 text-purple-400" />,
      color: "purple",
      image: "/strategy.jpg",
      details: ["Budget planning", "ROI forecasting", "Channel selection", "Timeline development"],
    },
    {
      id: 3,
      title: "Design",
      description: "Our creative team crafts visually stunning and user-focused designs that align with your brand identity and business objectives.",
      icon: <PenTool className="w-6 h-6 text-blue-400" />,
      color: "blue",
      image: "/design.jpg",
      details: ["UI/UX design", "Brand adherence", "Wireframing", "User testing"],
    },
    {
      id: 4,
      title: "Development",
      description: "We transform designs into high-performing digital solutions using the latest technologies and development methodologies.",
      icon: <Code className="w-6 h-6 text-cyan-400" />,
      color: "cyan",
      image: "/development.jpg",
      details: ["Front-end coding", "Back-end systems", "Content integration", "Quality assurance"],
    },
    {
      id: 5,
      title: "Launch & Growth",
      description: "After successful deployment, we continuously optimize your digital assets to maximize performance and drive ongoing growth.",
      icon: <Rocket className="w-6 h-6 text-pink-400" />,
      color: "pink",
      image: "/launch.jpg",
      details: ["Performance monitoring", "A/B testing", "Conversion optimization", "Continuous improvement"],
    },
  ];

  // Function to get step color
  const getStepColor = (color: string) => {
    switch (color) {
      case "amber":
        return "from-amber-600 to-orange-600";
      case "purple":
        return "from-purple-600 to-violet-600";
      case "blue":
        return "from-blue-600 to-indigo-600";
      case "cyan":
        return "from-cyan-600 to-blue-600";
      case "pink":
        return "from-pink-600 to-rose-600";
      default:
        return "from-purple-600 to-blue-600";
    }
  };

  // Function to get step background color
  const getStepBgColor = (color: string) => {
    switch (color) {
      case "amber":
        return "bg-amber-600/10 group-hover:bg-amber-600/20";
      case "purple":
        return "bg-purple-600/10 group-hover:bg-purple-600/20";
      case "blue":
        return "bg-blue-600/10 group-hover:bg-blue-600/20";
      case "cyan":
        return "bg-cyan-600/10 group-hover:bg-cyan-600/20";
      case "pink":
        return "bg-pink-600/10 group-hover:bg-pink-600/20";
      default:
        return "bg-purple-600/10 group-hover:bg-purple-600/20";
    }
  };

  return (
    <section className="py-24 overflow-hidden relative" ref={sectionRef}>
      {/* Background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute w-full h-full bg-[url('/mesh-grid.png')] bg-cover opacity-20 mix-blend-luminosity"></div>

        <div ref={bgElementsRef} className="relative w-full h-full">
          <div className="bg-element absolute top-20 -left-20 w-96 h-96 rounded-full bg-gradient-to-r from-amber-600/10 to-orange-600/10 blur-3xl"></div>
          <div className="bg-element absolute bottom-40 right-20 w-80 h-80 rounded-full bg-gradient-to-r from-cyan-600/10 to-blue-600/10 blur-3xl"></div>
          <div className="bg-element absolute top-1/2 left-1/3 w-64 h-64 rounded-full bg-gradient-to-r from-pink-600/10 to-purple-600/10 blur-3xl"></div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Section header */}
        <div ref={titleRef} className="text-center mb-16 max-w-3xl mx-auto">
          <Badge variant="outline" className="animate-element mb-5 inline-block px-4 py-2 bg-gradient-to-r from-amber-500/10 to-amber-500/20 backdrop-blur-sm rounded-full border border-amber-500/20">
            <p className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-300 text-xs font-medium tracking-widest uppercase">Our Process</p>
          </Badge>

          <h2 className="animate-element text-3xl md:text-5xl font-bold mb-5 text-balance">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">How We Turn Your Vision</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-red-400">Into Digital Reality</span>
          </h2>

          <p className="animate-element text-sm md:text-base text-white/70 mx-auto font-light leading-relaxed">
            Our proven 5-step methodology ensures we deliver exceptional results that meet your business objectives while exceeding your expectations at every stage.
          </p>
        </div>

        {/* Process steps */}
        <div ref={stepsRef} className="relative">
          {/* Timeline line */}
          <div className="absolute left-[50%] top-0 w-px h-0 bg-gradient-to-b from-amber-500/80 via-purple-500/80 to-pink-500/80 transform -translate-x-1/2 z-10" ref={timelineRef}></div>

          {/* Process steps */}
          <div className="relative z-20">
            {processSteps.map((step, index) => (
              <div
                key={step.id}
                ref={(el) => setStepRef(el as HTMLDivElement, index)}
                className={`group relative mb-24 md:mb-32 last:mb-0 flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                onMouseEnter={() => setActiveStep(index)}>
                {/* Step number */}
                <div className="absolute left-[50%] md:top-[4.5rem] w-12 h-12 rounded-full bg-black border-2 border-white/20 flex items-center justify-center transform -translate-x-1/2 z-30">
                  <span className={`text-transparent bg-clip-text bg-gradient-to-r ${getStepColor(step.color)} font-bold`}>{step.id}</span>
                </div>

                {/* Step content */}
                <div className={`relative md:w-[50%] ${index % 2 === 0 ? "md:pr-16" : "md:pl-16"} mb-12 md:mb-0`}>
                  {/* Content card */}
                  <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-6 md:p-8 transition-all duration-300 hover:shadow-xl hover:shadow-amber-900/10">
                    {/* Color accent line */}
                    <div className={`absolute top-0 ${index % 2 === 0 ? "right-0 md:right-16" : "left-0 md:left-16"} h-2 w-16 rounded-b-xl bg-gradient-to-r ${getStepColor(step.color)}`}></div>

                    {/* Icon */}
                    <div className={`step-icon-container mb-6 inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${getStepColor(step.color)} p-[1px]`}>
                      <div className="bg-black/60 w-full h-full rounded-xl flex items-center justify-center">{step.icon}</div>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80">{step.title}</h3>

                    {/* Description */}
                    <p className="text-white/70 text-sm leading-relaxed mb-6">{step.description}</p>

                    {/* Details list */}
                    <ul className="grid grid-cols-2 gap-3 mb-8">
                      {step.details.map((detail, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs text-white/80">
                          <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${getStepColor(step.color)}`}></div>
                          {detail}
                        </li>
                      ))}
                    </ul>

                    {/* Learn more button */}
                    <Button className={`px-4 py-2 rounded-lg text-xs bg-gradient-to-r ${getStepColor(step.color)} hover:opacity-90 text-white shadow-md shadow-black/20`}>
                      Learn More
                      <ArrowRight className="ml-2 w-3 h-3" />
                    </Button>
                  </div>
                </div>

                {/* Step image */}
                <div className={`relative md:w-[50%] ${index % 2 === 0 ? "md:pl-16" : "md:pr-16"}`}>
                  <div className={`step-image-container relative h-[300px] md:h-[400px] overflow-hidden rounded-xl border border-white/10 shadow-xl shadow-black/30 ${styles.imageHover}`}>
                    <div className={`absolute inset-0 bg-gradient-to-b opacity-50 ${index % 2 === 0 ? "from-transparent to-black/80" : "from-black/80 to-transparent"}`}></div>

                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      className="object-cover"
                      placeholder="blur"
                      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88P//fwAJZQNhCXGfdgAAAABJRU5ErkJggg=="
                    />

                    {/* Decorative elements */}
                    <div className={`absolute ${index % 2 === 0 ? "bottom-6 right-6" : "top-6 left-6"} w-24 h-24 rounded-full ${getStepBgColor(step.color)} backdrop-blur-xl opacity-70`}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA section */}
        <div className="mt-24 text-center">
          <div className="bg-gradient-to-r from-black/40 to-black/20 backdrop-blur-md border border-white/10 rounded-2xl p-10 max-w-4xl mx-auto relative overflow-hidden">
            <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-gradient-to-r from-amber-600/20 to-orange-600/20 blur-3xl"></div>
            <div className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 blur-3xl"></div>

            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">Ready to Start Your Digital Journey?</h3>
            <p className="text-white/70 mb-8 max-w-2xl mx-auto">Our team is ready to guide you through every step of the process, ensuring a seamless and successful digital transformation.</p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Button className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-7 py-6 rounded-xl text-base font-medium hover:shadow-lg hover:shadow-amber-500/30 transition-all duration-300 hover:-translate-y-1">
                Schedule a Consultation
              </Button>
              <Button variant="outline" className="bg-white/5 border-white/10 text-white px-7 py-6 rounded-xl text-base font-medium hover:bg-white/10 hover:text-white transition-all duration-300">
                View Our Portfolio
              </Button>
            </div>

            {/* Floating badge */}
            <Badge variant="outline" className={`${styles.animateFloat} absolute right-10 top-6 bg-black/30 backdrop-blur-lg border border-white/10 py-2 px-4 shadow-xl flex items-center gap-2`}>
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <span className="text-xs text-white">98% Client Satisfaction</span>
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
}
