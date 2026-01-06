import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ArtistChat = ({ artistName }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Data for the agents (You can change these to real numbers/emails)
  const contactInfo = {
    phone: "+1 301 531 5445",
    email: `Support@Creativeartistspot.com`,
    hours: "9 AM - 5 PM CST"
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-85 sm:w-96 bg-zinc-950 border border-zinc-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header with Agent Info */}
            <div className="p-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold">Tour Support</h3>
                  <p className="text-blue-100 text-xs opacity-90">Direct access to {artistName}'s team</p>
                </div>
                <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform">
                  ✕
                </button>
              </div>
            </div>

            {/* Chat Body */}
            <div className="p-6 space-y-6 bg-zinc-950">
              {/* Welcome Message */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex-shrink-0 flex items-center justify-center text-xs font-bold">
                  {artistName[0]}
                </div>
                <div className="bg-zinc-900 p-4 rounded-2xl rounded-tl-none border border-zinc-800">
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Welcome to the <strong>{artistName}</strong> fan portal. Our live agents are ready to assist you with booking, VIP passes, or tour inquiries.
                  </p>
                </div>
              </div>

              {/* Contact Details Card */}
              <div className="space-y-3">
                <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold ml-1">
                  Official Contact Channels
                </p>
                
                {/* Phone */}
                
                <a href={`tel:${contactInfo.phone}`} className="flex items-center justify-between p-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl transition-colors group">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">📞</span>
                    <div>
                      <p className="text-xs text-zinc-500">Call Agent</p>
                      <p className="text-sm text-white font-medium">{contactInfo.phone}</p>
                    </div>
                  </div>
                  <span className="text-blue-500 group-hover:translate-x-1 transition-transform">→</span>
                </a>

                {/* Email */}
                <a href={`mailto:${contactInfo.email}`} className="flex items-center justify-between p-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl transition-colors group">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">✉️</span>
                    <div>
                      <p className="text-xs text-zinc-500">Email Inquiry</p>
                      <p className="text-sm text-white font-medium">{contactInfo.email}</p>
                    </div>
                  </div>
                  <span className="text-blue-500 group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </div>

              {/* Operating Hours */}
              <div className="text-center py-2">
                <p className="text-[11px] text-zinc-600 italic">
                  Available Mon-Fri: {contactInfo.hours}
                </p>
              </div>
            </div>

            {/* Bottom Footer CTA */}
            <div className="p-4 bg-zinc-900/50 border-t border-zinc-800 text-center">
              <button className="text-xs text-blue-400 hover:text-blue-300 font-medium transition-colors">
                Request a Callback
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative group w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:scale-110 transition-all duration-300"
      >
        <span className="text-2xl group-hover:rotate-12 transition-transform">
          {isOpen ? "✕" : "💬"}
        </span>
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-black" />
        )}
      </button>
    </div>
  );
};

export default ArtistChat;