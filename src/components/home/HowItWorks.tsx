import React from "react";
import { SectionHeading } from "../ui/SectionHeading";
import { ShieldCheck, Truck, Star, HeartHandshake } from "lucide-react";

const steps = [
  {
    icon: <ShieldCheck size={32} />,
    title: "100% Authentic",
    description:
      "All our products are certified, ethically sourced, and undergo strict quality checks.",
  },
  {
    icon: <HeartHandshake size={32} />,
    title: "Energized & Blessed",
    description:
      "Yantras and idols are ritually energized (Pran Pratishtha) by Vedic scholars before shipping.",
  },
  {
    icon: <Truck size={32} />,
    title: "Fast & Safe Delivery",
    description:
      "We ensure safe packaging and fast delivery so your sacred items reach you in perfect condition.",
  },
  {
    icon: <Star size={32} />,
    title: "Satisfaction Guaranteed",
    description:
      "Over 10,000 happy devotees trust us for their spiritual and pooja needs.",
  },
];

export function HowItWorks() {
  return (
    <section className="relative py-28 overflow-hidden bg-text-dark">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-fixed opacity-40"
        style={{ backgroundImage: "url('why.jpeg')" }}
      />

      <div className="w-full px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4 drop-shadow-md">
            Why Shop With Us?
          </h2>
          <p className="text-ivory/90 max-w-2xl mx-auto text-lg drop-shadow">
            We are committed to providing the purest and most authentic
            spiritual products for your rituals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12 max-w-7xl mx-auto">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:bg-white/20 hover:border-saffron/80 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_-12px_rgba(255,165,0,0.2)]"
            >
              <div className="size-20 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-saffron mb-6 shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover:scale-110 group-hover:text-gold transition-all duration-500">
                {step.icon}
              </div>
              <h3 className="font-serif font-bold text-xl text-white mb-3 tracking-wide">
                {step.title}
              </h3>
              <p className="text-white/80 leading-relaxed text-sm font-light">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
