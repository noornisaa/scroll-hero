// @ts-nocheck
/* eslint-disable */
"use client";

import { useEffect, useRef } from "react";
// ... rest of your code stays exactly the same
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
    // Register the ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    let ctx = gsap.context(() => {
      // ==========================================
      // 1. Initial Load Animation
      // ==========================================
      const tl = gsap.timeline();
      
      // Headline appears smoothly (fade + move up)
      tl.from(titleRef.current, {
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      })
      // Statistics stagger in one by one with a subtle delay
      .from(
        statsRefs.current,
        {
          y: 20,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2, // staggered reveal
          ease: "power2.out",
        },
        "-=0.6" // start before title animation completely finishes
      );

      // ==========================================
      // 2. Scroll-Based Animation (Core Feature)
      // ==========================================
      gsap.to(visualRef.current, {
        x: "70vw",       // Move horizontally across the screen
        scale: 1.15,     // Slight zoom effect for premium feel
        rotate: 5,       // Slight rotation for natural motion
        ease: "none",    // 'none' is best for scrubbed scroll animations
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=1200", // Controls how long the scroll drives the animation
          scrub: 1,      // 1-second lag creates a buttery smooth interpolation
          pin: true,     // Pins the section to the viewport while animating
        },
      });
    }, containerRef);

    return () => ctx.revert(); // Cleanup GSAP contexts on unmount
  }, []);

  // Helper to push refs into an array for staggering
  const addToStatsRef = (el) => {
    if (el && !statsRefs.current.includes(el)) {
      statsRefs.current.push(el);
    }
  };

  return (
    <main className="bg-[#0d0d0d] text-white min-h-[200vh]">
      {/* --- HERO SECTION (First Screen) --- */}
      <section
        ref={containerRef}
        className="relative h-screen w-full flex flex-col items-center pt-24 md:pt-32 overflow-hidden"
      >
        {/* Letter-Spaced Headline */}
        <h1
          ref={titleRef}
          className="text-3xl md:text-5xl lg:text-7xl font-bold tracking-[0.5em] md:tracking-[0.8em] uppercase text-center mb-16 z-10"
        >
          W E L C O M E <br className="md:hidden" /> I T Z F I Z Z
        </h1>

        {/* Impact Metrics / Statistics */}
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

        {/* Main Visual Element (e.g., A Car) */}
        <div
          ref={visualRef}
          className="absolute bottom-20 left-[-20%] md:left-[-10%] w-[300px] md:w-[600px] z-20"
        >
          {/* Use standard img tag for easier GitHub Pages compatibility */}
          <img
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1000&auto=format&fit=crop"
            alt="Sports Car"
            className="w-full h-auto rounded-xl shadow-2xl shadow-blue-500/20"
          />
        </div>
      </section>

      {/* --- DUMMY CONTENT SECTION (To allow scrolling) --- */}
      <section className="h-screen bg-[#111] flex flex-col items-center justify-center border-t border-gray-800">
        <h2 className="text-3xl font-light tracking-[0.3em] text-gray-500">
          KEEP SCROLLING
        </h2>
        <p className="mt-4 text-gray-600 font-mono">Observe the smooth scrub logic above.</p>
      </section>
    </main>
  );
}