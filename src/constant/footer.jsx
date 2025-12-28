import React from "react";

function Footer() {
  return (
    <footer className="bg-black text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-24 py-16">

        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-semibold mb-4">Let’s Neko</h3>
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
                Home
              </li>
              <li className="hover:text-white transition cursor-pointer">
                Roster
              </li>
              <li className="hover:text-white transition cursor-pointer">
                About
              </li>
              <li className="hover:text-white transition cursor-pointer">
                Contact
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm uppercase tracking-widest text-gray-500 mb-4">
              Connect
            </h4>
            <ul className="space-y-3 text-gray-400">
              <li className="hover:text-white transition cursor-pointer">
                Booking
              </li>
              <li className="hover:text-white transition cursor-pointer">
                Artist Submissions
              </li>
              <li className="hover:text-white transition cursor-pointer">
                Partnerships
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} Let’s Neko. All rights reserved.
          </p>

          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <span className="hover:text-white transition cursor-pointer">
              Instagram
            </span>
            <span className="hover:text-white transition cursor-pointer">
              X
            </span>
            <span className="hover:text-white transition cursor-pointer">
              YouTube
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
