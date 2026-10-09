"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function HeroSection() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const statsRefs = useRef([]);
  const visualRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      tl.from(titleRef.current, {
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      }).from(
        statsRefs.current,
        {
          y: 20,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
        },
        "-=0.6"
      );

      gsap.to(visualRef.current, {
        x: "70vw",
        scale: 1.15,
        rotate: 5,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=1200",
          scrub: 1,
          pin: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const addToStatsRef = (el) => {
    if (el && !statsRefs.current.includes(el)) {
      statsRefs.current.push(el);
    }
  };

  return (
    <main className="bg-[#0d0d0d] text-white min-h-[200vh]">
      <section
        ref={containerRef}
        className="relative h-screen w-full flex flex-col items-center pt-24 md:pt-32 overflow-hidden"
      >
        <h1
          ref={titleRef}
          className="text-3xl md:text-5xl lg:text-7xl font-bold tracking-[0.5em] md:tracking-[0.8em] uppercase text-center mb-16 z-10"
        >
          W E L C O M E <br className="md:hidden" /> I T Z F I Z Z
        </h1>

        <div className="flex flex-wrap justify-center gap-12 md:gap-24 z-10 px-4">
          {[
            { value: "99%", label: "Fluidity" },
            { value: "120FPS", label: "Performance" },
            { value: "100%", label: "Satisfaction" },
          ].map((stat, index) => (
            <div
              key={index}
              ref={addToStatsRef}
              className="flex flex-col items-center"
            >
              <span className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
                {stat.value}
              </span>
              <span className="text-xs md:text-sm text-gray-400 mt-2 uppercase tracking-[0.2em]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        <div
          ref={visualRef}
          className="absolute bottom-20 left-[-20%] md:left-[-10%] w-[300px] md:w-[600px] z-20"
        >
          <img
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1000&auto=format&fit=crop"
            alt="Sports Car"
            className="w-full h-auto rounded-xl shadow-2xl shadow-blue-500/20"
          />
        </div>
      </section>

      <section className="h-screen bg-[#111] flex flex-col items-center justify-center border-t border-gray-800">
        <h2 className="text-3xl font-light tracking-[0.3em] text-gray-500">
          KEEP SCROLLING
        </h2>
        <p className="mt-4 text-gray-600 font-mono">Observe the smooth scrub logic above.</p>
      </section>
    </main>
  );
}