import React from "react";
// 1. IMPORT the chatbot component here
import ArtistChat from "../assets/artistvhat.jsx";

const SectionTitle = ({ children, className = "" }) => (
  <h2 className={`text-3xl md:text-5xl font-bold mb-8 tracking-tight ${className}`}>
    {children}
  </h2>
);

const ArtistProfile = ({ data }) => {
  if (!data) return <div className="text-white p-10">Artist not found.</div>;

  return (
    <div className="text-slate-100 bg-black font-sans selection:bg-blue-500/30">
      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 z-10" />
        <img
          src={data.heroImage}
          alt={data.name}
          className="absolute inset-0 w-full h-full object-cover scale-105 opacity-60"
        />
        
        <div className="relative text-center px-6 max-w-4xl z-20">
          <span className="uppercase tracking-[0.3em] text-sm mb-4 block text-blue-400 font-medium">
            {data.subtitle}
          </span>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 drop-shadow-2xl uppercase">
            {data.name}
          </h1>
          <p className="text-lg md:text-2xl text-slate-300 leading-relaxed max-w-2xl mx-auto font-light">
            {data.about}
          </p>
        </div>
      </section>

      {/* HIGHLIGHTS SECTION */}
      <section className="bg-zinc-900/50 border-y border-zinc-800 py-32">
        <div className="max-w-5xl mx-auto px-6">
          <SectionTitle>Career Highlights</SectionTitle>
          <div className="grid sm:grid-cols-2 gap-6">
            {data.highlights.map((item, idx) => (
              <div key={idx} className="flex items-center p-6 bg-zinc-900 border border-zinc-800 rounded-lg hover:border-blue-500/50 transition-colors">
                <span className="text-3xl mr-4">{item.icon}</span>
                <span className="text-slate-300 text-lg">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ALBUMS SECTION */}
      <section className="max-w-6xl mx-auto px-6 py-32">
        <SectionTitle>Discography</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.albums.map((album) => (
            <div key={album} className="group relative overflow-hidden bg-zinc-900 p-8 rounded-2xl border border-zinc-800 hover:bg-zinc-800 transition-all duration-300">
              <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
              <h3 className="text-xl font-medium text-slate-200">{album}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* MOVEMENT SECTION */}
      <section className="relative py-32 bg-blue-900/10 overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-black mb-6 italic tracking-tighter uppercase">
            {data.movement.name}
          </h2>
          <p className="text-slate-300 text-xl leading-relaxed font-light">
            {data.movement.description}
          </p>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full" />
      </section>

      {/* 2. PLACE THE CHATBOT HERE */}
      <ArtistChat artistName={data.name} />

    </div>
  );
};

export default ArtistProfile;