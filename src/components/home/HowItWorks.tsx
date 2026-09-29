import React from "react";
import { ShieldCheck, Truck, Star, HeartHandshake } from "lucide-react";

const steps = [
  {
    icon: "https://cdn-icons-png.flaticon.com/128/10645/10645744.png",
    title: "100% Authentic",
    description:
      "All our products are certified, ethically sourced, and undergo strict quality checks.",
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/128/6581/6581547.png",
    title: "Energized & Blessed",
    description:
      "Yantras and idols are ritually energized (Pran Pratishtha) by Vedic scholars before shipping.",
  },
  {
   icon: "https://cdn-icons-png.flaticon.com/128/8441/8441282.png",
    title: "Fast & Safe Delivery",
    description:
      "We ensure safe packaging and fast delivery so your sacred items reach you in perfect condition.",
  },
  {
   icon: "https://cdn-icons-png.flaticon.com/128/1379/1379505.png",
    title: "Satisfaction Guaranteed",
    description:
      "Over 10,000 happy devotees trust us for their spiritual and pooja needs.",
  },
];

export function HowItWorks() {
  return (
    <section className="relative py-28 overflow-hidden bg-text-dark">
      {/* Background with overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('why.jpeg')" }}
      />
      {/* Dark overlay for better text contrast */}
      <div className="absolute inset-0 z-[1] bg-black/40" />

      {/* Decorative Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-saffron/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-300/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-saffron font-semibold tracking-[0.2em] uppercase text-xs mb-4 block">
            Our Promise
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 drop-shadow-lg">
            Why Shop With Us?
          </h2>
          <p className="text-white/70 text-lg leading-relaxed font-light">
            We are committed to providing the purest and most authentic
            spiritual products for your rituals, delivered with utmost devotion and care.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8 mt-12">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="relative flex flex-col items-center text-center group
                bg-white/[0.04] backdrop-blur-xl
                border border-white/10
                rounded-[2rem] p-8 sm:p-10
                hover:bg-white/[0.08] hover:border-saffron/50
                transition-all duration-500
                hover:-translate-y-2
                shadow-2xl overflow-hidden"
            >
              {/* Card Hover Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-saffron/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              {/* Icon Box */}
              <div
                className="relative size-20 rounded-2xl
                  bg-white/5 border border-white/10
                  flex items-center justify-center
                  text-saffron mb-8 shadow-inner
                  group-hover:scale-110
                  group-hover:bg-saffron/20
                  group-hover:text-amber-200
                  transition-all duration-500
                  transform rotate-3 group-hover:rotate-0"
              >
                {/* Glow behind icon */}
                <div className="absolute inset-0 bg-saffron/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img src={step.icon} alt="icon" height={35} width={35}/>
              </div>

              {/* Title */}
              <h3
                className="font-serif font-bold text-xl text-white mb-4
                  tracking-wide group-hover:text-white transition-colors duration-300"
              >
                {step.title}
              </h3>

              {/* Description */}
              <p
                className="text-white/60 leading-relaxed text-sm font-light
                  group-hover:text-white/80 transition-colors duration-300"
              >
                {step.description}
              </p>

              {/* Subtle bottom accent line */}
              <div className="mt-6 h-1 w-12 rounded-full bg-gradient-to-r from-saffron to-amber-300 opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>

        {/* Optional trust line */}
        <div className="mt-16 text-center">
          <p className="text-white/50 text-sm">
            Trusted by devotees across India and abroad for authentic spiritual products.
          </p>
        </div>
      </div>
    </section>
  );
}