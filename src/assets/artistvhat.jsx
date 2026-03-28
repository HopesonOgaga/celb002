import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { auth, db } from "../firebase";
import { signInAnonymously, onAuthStateChanged } from "firebase/auth";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  where,
  limit,
  updateDoc,
} from "firebase/firestore";

const ArtistChat = ({ artist }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showAdminDrawer, setShowAdminDrawer] = useState(false);

  // Admin states
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const [allSessions, setAllSessions] = useState([]);
  const [clickCount, setClickCount] = useState(0);

  const scrollRef = useRef(null);
  const fileInputRef = useRef(null);
  const inputRef = useRef(null);

  // 🔐 Auth
  useEffect(() => {
    signInAnonymously(auth).catch(console.error);
    return onAuthStateChanged(auth, (user) => {
      if (user) setCurrentUser(user);
    });
  }, []);

  // 🔒 Lock body scroll when open on mobile
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // 🧠 Admin toggle (4 clicks)
  const handleSecretToggle = () => {
    setClickCount((prev) => {
      const next = prev + 1;
      if (next === 4) {
        if (isAdmin) {
          setIsAdmin(false);
          setSelectedSession(null);
          setShowAdminDrawer(false);
        } else {
          const password = prompt("Admin Login:");
          if (password === "N3k0") setIsAdmin(true);
          else alert("Access Denied");
        }
        return 0;
      }
      return next;
    });
    setTimeout(() => setClickCount(0), 1500);
  };

  // 📡 Fetch messages
  useEffect(() => {
    if (!artist?.id || !currentUser) return;
    const activeSession =
      isAdmin && selectedSession ? selectedSession : currentUser.uid;

    const q = query(
      collection(db, "artistChats", artist.id, "messages"),
      where("sessionId", "==", activeSession),
      orderBy("createdAt", "asc")
    );

    const unsub = onSnapshot(q, (snap) => {
      setMessages(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, [artist?.id, currentUser, isAdmin, selectedSession]);

  // 📡 Fetch sessions (admin only)
  useEffect(() => {
    if (!isAdmin || !artist?.id) return;
    const q = query(
      collection(db, "artistChats", artist.id, "messages"),
      limit(500)
    );
    const unsub = onSnapshot(q, (snap) => {
      const uids = [...new Set(snap.docs.map((doc) => doc.data().sessionId))];
      setAllSessions(uids.filter((id) => id !== currentUser?.uid));
    });
    return () => unsub();
  }, [isAdmin, artist?.id, currentUser]);

  // 📌 Format timestamp
  const formatTime = (timestamp) => {
    if (!timestamp?.seconds) return "";
    return new Date(timestamp.seconds * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // ✉️ Send message
  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || !currentUser) return;
    const targetSession =
      isAdmin && selectedSession ? selectedSession : currentUser.uid;

    await addDoc(collection(db, "artistChats", artist.id, "messages"), {
      sessionId: targetSession,
      role: isAdmin ? "ai" : "user",
      text: input,
      type: "text",
      seen: false,
      createdAt: serverTimestamp(),
    });
    setInput("");
    inputRef.current?.focus();
  };

  // 🎟️ Ticket Selection
  const handleTicketSelect = async (ticketType) => {
    if (!currentUser) return;
    const targetSession =
      isAdmin && selectedSession ? selectedSession : currentUser.uid;

    await addDoc(collection(db, "artistChats", artist.id, "messages"), {
      sessionId: targetSession,
      role: "user",
      text: `🎟️ I'd like more info on the ${ticketType}.`,
      type: "text",
      seen: false,
      createdAt: serverTimestamp(),
    });

    await addDoc(collection(db, "artistChats", artist.id, "messages"), {
      sessionId: targetSession,
      role: "ai",
      text: "Thanks for your decision, an admin will contact you shortly.",
      type: "text",
      seen: false,
      createdAt: serverTimestamp(),
    });
  };

  // 🖼️ Image upload
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file || !currentUser) return;
    if (file.size > 600 * 1024) {
      alert("Image must be under 600KB");
      return;
    }
    const reader = new FileReader();
    setIsUploading(true);
    reader.onloadend = async () => {
      const targetSession =
        isAdmin && selectedSession ? selectedSession : currentUser.uid;
      await addDoc(collection(db, "artistChats", artist.id, "messages"), {
        sessionId: targetSession,
        role: isAdmin ? "ai" : "user",
        imageUrl: reader.result,
        type: "image",
        seen: false,
        createdAt: serverTimestamp(),
      });
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  // 👁️ Mark messages seen (admin)
  useEffect(() => {
    if (!isAdmin || !selectedSession) return;
    const q = query(
      collection(db, "artistChats", artist.id, "messages"),
      where("sessionId", "==", selectedSession)
    );
    const unsub = onSnapshot(q, (snap) => {
      snap.docs.forEach(async (docSnap) => {
        const data = docSnap.data();
        if (!data.seen && data.role === "user") {
          await updateDoc(docSnap.ref, { seen: true });
        }
      });
    });
    return () => unsub();
  }, [isAdmin, selectedSession, artist?.id]);

  // 📜 Auto scroll
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isUploading]);

  // ─── Chat Panel ────────────────────────────────────────────────
  const chatPanel = (
    <motion.div
      key="chat"
      // Mobile: slide up from bottom, full screen
      // Desktop: scale from bottom-right corner
      initial={{ opacity: 0, y: "100%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "100%" }}
      transition={{ type: "spring", damping: 28, stiffness: 300 }}
      className={[
        // Base
        "flex flex-col bg-zinc-950 border border-zinc-800 shadow-2xl overflow-hidden",
        // Mobile: full screen, fixed inset, rounded top corners
        "fixed inset-0 rounded-none",
        // Tablet+: floating panel anchored bottom-right
        "sm:inset-auto sm:bottom-20 sm:right-6 sm:w-[350px] sm:h-[520px] sm:rounded-3xl sm:max-h-[80vh]",
      ].join(" ")}
      style={{
        // Respect device safe areas (notch / home bar)
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "env(safe-area-inset-bottom)",
        zIndex: 9999,
      }}
    >
      {/* ── Header ─────────────────────────────────── */}
      <div
        onClick={handleSecretToggle}
        className={`shrink-0 px-4 py-3 flex items-center justify-between cursor-pointer ${
          isAdmin ? "bg-orange-500/30" : "bg-blue-600"
        } text-white`}
      >
        <div className="flex items-center gap-3">
          {/* Mobile back / close */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
            className="sm:hidden w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white text-lg leading-none"
            aria-label="Close chat"
          >
            ‹
          </button>

          <div>
            <p className="font-bold text-sm leading-tight">
              {isAdmin ? "Admin View" : artist?.name || "Live Chat"}
            </p>
            <p className="text-[10px] opacity-75">
              {isAdmin && selectedSession
                ? `Session: ${selectedSession.slice(-6)}`
                : "Live Support"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Admin session drawer toggle (mobile) */}
          {isAdmin && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowAdminDrawer((v) => !v);
              }}
              className="sm:hidden px-2 py-1 rounded-lg bg-white/10 text-[11px] font-semibold"
            >
              👥 Sessions
            </button>
          )}

          {/* Desktop close */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
            className="hidden sm:flex w-7 h-7 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-sm"
            aria-label="Close chat"
          >
            ✕
          </button>
        </div>
      </div>

      {/* ── Admin Session Drawer (mobile, slides down) ─ */}
      <AnimatePresence>
        {isAdmin && showAdminDrawer && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="shrink-0 overflow-hidden bg-zinc-900 border-b border-zinc-800"
          >
            <div className="flex gap-2 p-3 overflow-x-auto">
              {allSessions.length === 0 && (
                <p className="text-zinc-500 text-xs py-1">No sessions yet.</p>
              )}
              {allSessions.map((id) => (
                <button
                  key={id}
                  onClick={() => {
                    setSelectedSession(id);
                    setShowAdminDrawer(false);
                  }}
                  className={`shrink-0 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                    selectedSession === id
                      ? "bg-orange-500 text-white"
                      : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                  }`}
                >
                  👤 {id.slice(-6)}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Messages ───────────────────────────────── */}
      <div
        ref={scrollRef}
        className="flex-1 px-4 py-3 overflow-y-auto space-y-3 overscroll-contain"
      >
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center gap-2 text-zinc-600">
            <span className="text-4xl">💬</span>
            <p className="text-sm">Start the conversation…</p>
          </div>
        )}

        {messages.map((m) => {
          const isMine = isAdmin ? m.role === "ai" : m.role === "user";
          return (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.18 }}
              className={`flex ${isMine ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] sm:max-w-[85%] px-3 py-2.5 rounded-2xl text-sm ${
                  isMine
                    ? "bg-blue-600 text-white rounded-tr-sm"
                    : "bg-zinc-800 text-zinc-200 rounded-tl-sm"
                }`}
              >
                {m.type === "image" ? (
                  <img
                    src={m.imageUrl}
                    alt="Upload"
                    className="rounded-xl w-full object-cover"
                  />
                ) : (
                  <p className="whitespace-pre-wrap break-words leading-relaxed">
                    {m.text}
                  </p>
                )}

                <div className="flex items-center justify-end gap-1 mt-1">
                  <span className="text-[9px] opacity-60">
                    {formatTime(m.createdAt)}
                  </span>
                  {isMine && (
                    <span
                      className={`text-[9px] ${
                        m.seen ? "text-green-300 animate-pulse" : "text-zinc-400"
                      }`}
                    >
                      {m.seen ? "✓✓" : "✓"}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}

        {isUploading && (
          <div className="flex justify-end">
            <div className="bg-zinc-800 rounded-2xl px-4 py-2.5 text-zinc-400 text-sm animate-pulse">
              Uploading…
            </div>
          </div>
        )}
      </div>

      {/* ── Ticket Chips ───────────────────────────── */}
      {!isAdmin && (
        <div
          className="shrink-0 px-3 pb-2 flex gap-2 overflow-x-auto"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {[
            { label: "🎟️ VIP ($150)", value: "VIP Ticket ($150)" },
            { label: "🎟️ General ($50)", value: "General Admission ($50)" },
          ].map((t) => (
            <button
              key={t.value}
              onClick={() => handleTicketSelect(t.value)}
              className="shrink-0 text-xs bg-zinc-800 active:bg-zinc-600 hover:bg-zinc-700 transition-colors text-white px-3 py-2 rounded-full border border-zinc-700 touch-manipulation"
            >
              {t.label}
            </button>
          ))}
        </div>
      )}

      {/* ── Input Bar ──────────────────────────────── */}
      <form
        onSubmit={handleSend}
        className="shrink-0 px-3 py-2 flex items-center gap-2 border-t border-zinc-800 bg-zinc-950"
      >
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message…"
          enterKeyHint="send"
          className="flex-1 min-w-0 bg-zinc-800 text-white placeholder-zinc-500 px-4 py-2.5 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
        />

        <input
          type="file"
          hidden
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImage}
        />

        <button
          type="button"
          onClick={() => fileInputRef.current.click()}
          className="w-10 h-10 flex items-center justify-center rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors shrink-0 touch-manipulation"
          aria-label="Attach image"
        >
          📎
        </button>

        <button
          type="submit"
          disabled={!input.trim()}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0 touch-manipulation"
          aria-label="Send message"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </form>
    </motion.div>
  );

  // ─── Desktop Admin Sidebar ─────────────────────────────────────
  const desktopAdminSidebar = isAdmin && isOpen && (
    <div className="hidden sm:flex bg-zinc-900 border border-white/10 w-20 h-[520px] rounded-2xl p-2 overflow-y-auto flex-col gap-2 fixed bottom-20 right-[382px] z-[9998]">
      {allSessions.map((id) => (
        <button
          key={id}
          onClick={() => setSelectedSession(id)}
          className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
            selectedSession === id
              ? "bg-orange-500 text-white"
              : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
          }`}
          title={id.slice(-6)}
        >
          👤
        </button>
      ))}
    </div>
  );

  return (
    <>
      {/* Desktop admin sidebar */}
      {desktopAdminSidebar}

      {/* Mobile backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 sm:hidden z-[9998]"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>{isOpen && chatPanel}</AnimatePresence>

      {/* Floating action button */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-[9999] w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-500 active:bg-blue-700 transition-colors text-white shadow-xl flex items-center justify-center touch-manipulation"
        style={{ bottom: "max(1.5rem, env(safe-area-inset-bottom))" }}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={isOpen ? "close" : "open"}
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 90 }}
            transition={{ duration: 0.15 }}
            className="text-xl leading-none"
          >
            {isOpen ? "✕" : "💬"}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </>
  );
};

export default ArtistChat;