import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-black text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-24 py-16">
        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-semibold mb-4">
              Creative artist spot
            </h3>
            <p className="text-gray-400 max-w-md leading-relaxed">
              A curated portfolio platform spotlighting musicians and creatives
              shaping Texas culture and global influence.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm uppercase tracking-widest text-gray-500 mb-4">
              Explore
            </h4>
            <ul className="space-y-3 text-gray-400">
              <li className="hover:text-white transition cursor-pointer">
                <a href="/">Home</a>
              </li>

              <li className="hover:text-white transition cursor-pointer">
                <a href="#about">About</a>
              
              </li>
              <li className="hover:text-white transition cursor-pointer">
                <a href="mailto:Support@Creativeartistspot.com">Contact</a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          {/* <div>
          
          </div> */}
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} Creative artist spot All rights
            reserved.
          </p>

          {/* <div className="flex items-center gap-6 mt-4 md:mt-0">
            <span className="hover:text-white transition cursor-pointer">
              Instagram
            </span>
            <span className="hover:text-white transition cursor-pointer">
              X
            </span>
            <span className="hover:text-white transition cursor-pointer">
              YouTube
            </span>
          </div> */}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
