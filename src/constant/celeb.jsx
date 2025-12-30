import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // Import Link for navigation

const CELEBRITIES = [
  { id: 1, name: "Keith Urban", role: "Vocalist", img: "/images/celebs/keith.jpeg", slug: "urban" },
  { id: 2, name: "Kenny Chesney", role: "Vocalist", img: "/images/kenny/kenyy.jpeg", slug: "kenny" },
  { id: 3, name: "George Strait", role: "Songwriter", img: "/images/george/george.jpeg", slug: "strait" },
  { id: 4, name: "Tim Mcgraw", role: "Songwriter", img: "/images/tim/tim.jpeg", slug: "mcgraw" },
  { id: 5, name: "Jason Aldean", role: "Vocalist", img: "/images/jason/jason.jpeg", slug: "aldean" },
  { id: 6, name: "Luke Bryan", role: "Vocalist", img: "/images/luke/luke.jpeg", slug: "bryan" },
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
            The faces behind the sounds that are redefining the landscape.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CELEBRITIES.map((person, index) => (
            <Link 
              key={person.id} 
              to={person.slug === "kenny" ? "/kenny" : `/artist/${person.slug}`}
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative h-[600px] w-full overflow-hidden rounded-3xl bg-neutral-900 cursor-pointer"
              >
                {/* Image */}
                <img
                  src={person.img}
                  alt={person.name}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:opacity-50"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />

                {/* Text Content */}
                <div className="absolute bottom-0 left-0 p-10 w-full translate-y-8 transition-transform duration-500 group-hover:translate-y-0">
                  <p className="text-xs uppercase tracking-[0.2em] text-blue-400 mb-2 opacity-0 transition-opacity duration-500 group-hover:opacity-100 font-bold">
                    {person.role}
                  </p>
                  <h4 className="text-3xl font-bold text-white mb-4">
                    {person.name}
                  </h4>
                  
                  {/* Decorative Line */}
                  <div className="h-[1px] w-0 bg-blue-500 transition-all duration-500 group-hover:w-full" />
                  
                  <p className="mt-4 text-[10px] uppercase tracking-widest text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100 font-semibold">
                    View Profile —
                  </p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CelebritySection;