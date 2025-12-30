import React from "react";

// 1. Data arrays for cleaner JSX
const HIGHLIGHTS = [
  { icon: "🏆", text: "Multiple CMA & ACM Award winner" },
  { icon: "🎵", text: "Over 30 million albums sold worldwide" },
  { icon: "📀", text: "Numerous Billboard No.1 albums" },
  { icon: "🎤", text: "Highest-grossing touring artists" },
  { icon: "🏟", text: "Record-breaking stadium tours" },
  { icon: "🌴", text: "Creator of No Shoes Nation" },
];

const ALBUMS = [
  "When the Sun Goes Down", "The Road and the Radio", 
  "Just Who I Am", "Life On A Rock", "Here and Now", "Born"
];

const SectionTitle = ({ children, className = "" }) => (
  <h2 className={`text-3xl md:text-5xl font-bold mb-8 tracking-tight ${className}`}>
    {children}
  </h2>
);

const Kenny = () => {
  return (
    <div className="text-slate-100 bg-black font-sans selection:bg-blue-500/30">
      
      {/* HERO SECTION - Improved with a subtle gradient overlay */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden" >
        
        <img
          src="/images/kenny-hero.jpg"
          alt="Kenny Chesney"
          className="absolute inset-0 w-full h-full object-cover scale-105 animate-subtle-zoom opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
        
        <div className="relative text-center px-6 max-w-4xl">
          <span className="uppercase tracking-[0.3em] text-sm mb-4 block text-blue-400 font-medium">Country Legend</span>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 drop-shadow-2xl">
            KENNY CHESNEY
          </h1>
          <p className="text-lg md:text-2xl text-slate-300 leading-relaxed max-w-2xl mx-auto font-light">
            The soundtrack of freedom, open roads, beach nights, and
            unforgettable summers.
          </p>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="max-w-5xl mx-auto px-6 py-32">
        <div className="grid md:grid-cols-3 gap-12">
          <SectionTitle className="md:col-span-1">About Kenny</SectionTitle>
          <div className="md:col-span-2 space-y-8 text-slate-400 leading-relaxed text-xl font-light">
            <p>
              Kenny Chesney is an unmistakable sense of freedom. Across decades, 
              he has built a career defined by authenticity and connection.
            </p>
            <p>
              Whether blending country with rock energy or island-inspired sounds,
              Kenny’s music feels personal, emotional, and timeless.
            </p>
          </div>
        </div>
      </section>

      {/* CAREER HIGHLIGHTS - Improved with a Grid Card style */}
      <section className="bg-zinc-900/50 border-y border-zinc-800 py-32">
        <div className="max-w-5xl mx-auto px-6">
          <SectionTitle>Career Highlights</SectionTitle>
          <div className="grid sm:grid-cols-2 gap-6">
            {HIGHLIGHTS.map((item, idx) => (
              <div key={idx} className="flex items-center p-4 bg-zinc-900 border border-zinc-800 rounded-lg hover:border-blue-500/50 transition-colors">
                <span className="text-2xl mr-4">{item.icon}</span>
                <span className="text-slate-300 text-lg">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MUSIC & ALBUMS - Better Grid UI */}
      <section className="max-w-6xl mx-auto px-6 py-32">
        <SectionTitle>Discography</SectionTitle>
        <p className="text-slate-400 text-xl max-w-3xl mb-12 font-light">
          Kenny’s discography reflects growth and fearless creativity. From heartfelt ballads to stadium anthems.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ALBUMS.map((album) => (
            <div 
              key={album} 
              className="group relative overflow-hidden bg-zinc-900 p-8 rounded-2xl border border-zinc-800 hover:bg-zinc-800 transition-all duration-300 cursor-default"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
              <h3 className="text-xl font-medium text-slate-200 group-hover:translate-x-2 transition-transform">
                {album}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* NO SHOES NATION - Call to action style */}
      <section className="relative py-32 bg-blue-900/10 overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-black mb-6 italic tracking-tighter">
            NO SHOES NATION
          </h2>
          <p className="text-slate-300 text-xl leading-relaxed font-light">
            It isn’t just a fan base — it’s a mindset. It represents freedom, 
            authenticity, and living life on your own terms.
          </p>
        </div>
        {/* Decorative element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full" />
      </section>

      <footer className="py-12 text-center text-zinc-500 text-sm border-t border-zinc-900">
        © {new Date().getFullYear()} Kenny Chesney Fan Portal
      </footer>
    </div>
  );
};

export default Kenny;