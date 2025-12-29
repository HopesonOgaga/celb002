import React from "react";
import { motion } from "framer-motion";

const CELEBRITIES = [
  { id: 1, name: "Keith Urban ", role: "Vocalist", img: "/images/celebs/keith.jpeg" },
  { id: 2, name: "Kenny Chesney ", role: "vocalist", img: "/images/kenny/kenyy.jpeg" },
  { id: 3, name: "George Strait ", role: "songwriter", img: "/images/george/george.jpeg" },
  { id: 4, name: "Tim Mcgraw", role: "Songwriter", img: "/images/tim/tim.jpeg" },
 { id: 5, name: "Jason Aldean ", role: "Vocalist", img: "/images/jason/jason.jpeg" },
 { id: 6, name: "Luke Bryan", role: "Vocalist", img: "/images/luke/luke.jpeg" },
];

const CelebritySection = () => {
  return (
    <section className="bg-black py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Modern Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-sm uppercase tracking-[0.4em] text-neutral-500 mb-4 font-semibold">
              The Collective
            </h2>
            <h3 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">
              Featured <span className="italic text-neutral-400">Talent.</span>
            </h3>
          </div>
          <p className="text-neutral-400 text-lg max-w-xs border-l border-neutral-800 pl-6">
            The faces behind the sounds that are redefining the Texas landscape.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CELEBRITIES.map((person, index) => (
            <motion.div
              key={person.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative h-[500px] w-full overflow-hidden rounded-3xl bg-neutral-900"
            >
              {/* Image with subtle zoom on hover */}
              <img
                src={person.img}
                alt={person.name}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:opacity-60"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

              {/* Text Content */}
              <div className="absolute bottom-0 left-0 p-8 w-full translate-y-4 transition-transform duration-500 group-hover:translate-y-0">
                <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-1 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  {person.role}
                </p>
                <h4 className="text-2xl font-bold text-white mb-4">
                  {person.name}
                </h4>
                
                {/* Modern CTA inside card */}
                <div className="h-[1px] w-0 bg-white transition-all duration-500 group-hover:w-full" />
                <button className="mt-4 text-[10px] uppercase tracking-widest text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CelebritySection;