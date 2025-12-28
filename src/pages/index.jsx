import React from "react";
import HeaderNav from "../constant/nav";

function HomePage() {
  return (
    <section className="min-h-screen bg-black text-white relative overflow-hidden">
      <HeaderNav />

      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center text-center px-6">
        <div className="max-w-3xl">
          {/* Artist name */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">
          lET'S  NEKO
          </h1>

          {/* Tagline */}
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            Texas born sound. Global spirit. Music beyond borders.
          </p>

          {/* CTA buttons */}
          <div className="flex items-center justify-center gap-4">
            <button className="px-6 py-3 bg-white text-black font-medium rounded-full hover:opacity-90 transition cursor-pointer ">
              Explore Neko
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-sm text-gray-400">
          <span className="mb-2">Scroll</span>
          <div className="w-[1px] h-10 bg-gray-400 animate-pulse"></div>
        </div>
      </section>
    </section>
  );
}

export default HomePage;
