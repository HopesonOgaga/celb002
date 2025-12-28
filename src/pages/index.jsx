import React from "react";
import HeaderNav from "../constant/nav";
import Footer from "../constant/footer";

function HomePage() {
  return (
    <section className="min-h-screen bg-black text-white relative overflow-hidden">
      <HeaderNav />

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        {/* Background Video */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          src="/video/westernshot.mp4"
          autoPlay
          loop
          muted
          playsInline
        />

        {/* Optional: Dark Overlay to make text pop */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-10"></div>

        {/* Content Layer */}
        <div className="relative z-20 max-w-4xl text-center flex flex-col items-center text-white">
          <h1 className="text-5xl md:text-8xl font-semibold tracking-tight mb-6">
            Let’s Neko
          </h1>

          <p className="text-base md:text-xl text-gray-200 max-w-2xl mb-10">
            A curated portfolio platform showcasing musicians and creatives
            shaping Texas culture and global influence.
          </p>

          <button className="px-8 py-3 rounded-full bg-white text-black font-medium hover:scale-105 transition cursor-pointer">
            Explore Portfolio
          </button>

          {/* Scroll indicator */}
          <div className="mt-10 flex flex-col items-center text-xs text-gray-300">
            <span className="mb-2 tracking-widest uppercase">Scroll</span>
            <div className="w-px h-12 bg-white/60 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* ABOUT / PLATFORM */}
      <section className="min-h-screen flex items-center px-6 md:px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 w-full">
          {/* TEXT */}
          <div className="flex flex-col justify-center">
            <span className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-6">
              Texas Talent Portfolio
            </span>

            <h2 className="text-4xl md:text-6xl font-semibold leading-tight mb-8">
              Curating artists
              <br />
              that define the moment.
            </h2>

            <p className="text-gray-400 text-lg leading-relaxed max-w-xl mb-10">
              Let’s Neko is a modern portfolio and management platform focused
              on visibility, identity, and growth. We spotlight artists with
              clear vision and cultural relevance, connecting talent to
              meaningful opportunities across media and industry.
            </p>

            <button className="w-fit px-7 py-3 rounded-full border border-white/30 hover:bg-white hover:text-black transition">
              View Roster
            </button>
          </div>

          {/* VISUAL COLLAGE */}
          <div className="relative grid grid-cols-2 gap-5">
            <img
              src="/images/austin.jpg"
              alt="Artist portrait"
              className="h-64 w-full object-cover rounded-2xl"
            />
            <img
              src="/images/erik.jpg"
              alt="Live performance"
              className="h-80 w-full object-cover rounded-2xl translate-y-10"
            />
            <img
              src="/images/melanie.jpg"
              alt="Studio session"
              className="h-72 w-full object-cover rounded-2xl"
            />
            <img
              src="/images/travis.jpg"
              alt="On stage"
              className="h-60 w-full object-cover rounded-2xl translate-y-14"
            />

            {/* Ambient glow */}
            <div className="absolute inset-0 bg-white/5 blur-3xl rounded-full -z-10"></div>
          </div>
        </div>
      </section>
      <Footer></Footer>
    </section>
  );
}

export default HomePage;
