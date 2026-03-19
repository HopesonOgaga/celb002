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

  // Admin states
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const [allSessions, setAllSessions] = useState([]);
  const [clickCount, setClickCount] = useState(0);

  const scrollRef = useRef(null);
  const fileInputRef = useRef(null);

  const contactInfo = {
    phone: artist?.phone || "+1 000 000 0000",
    email: artist?.email || "support@artist.com",
  };

  // 🔐 Auth
  useEffect(() => {
    signInAnonymously(auth).catch(console.error);
    return onAuthStateChanged(auth, (user) => {
      if (user) setCurrentUser(user);
    });
  }, []);

  // 🧠 Admin toggle (4 clicks)
  const handleSecretToggle = () => {
    setClickCount((prev) => {
      const next = prev + 1;

      if (next === 4) {
        if (isAdmin) {
          setIsAdmin(false);
          setSelectedSession(null);
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
      const uids = [
        ...new Set(snap.docs.map((doc) => doc.data().sessionId)),
      ];
      setAllSessions(uids.filter((id) => id !== currentUser?.uid));
    });

    return () => unsub();
  }, [isAdmin, artist?.id, currentUser]);

  // 📌 Format timestamp
  const formatTime = (timestamp) => {
    if (!timestamp?.seconds) return "";
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleTimeString([], {
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

  // 👁️ Mark messages as seen (admin)
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

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end gap-3">
      
      {/* Admin sidebar */}
      {isAdmin && isOpen && (
        <div className="bg-zinc-900 border border-white/10 w-20 h-[520px] rounded-2xl p-2 overflow-y-auto flex flex-col gap-2">
          {allSessions.map((id) => (
            <button
              key={id}
              onClick={() => setSelectedSession(id)}
              className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                selectedSession === id
                  ? "bg-orange-500 text-white"
                  : "bg-zinc-800 text-zinc-400"
              }`}
            >
              👤
            </button>
          ))}
        </div>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            className="w-[350px] h-[520px] bg-zinc-950 border border-zinc-800 rounded-3xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div
              onClick={handleSecretToggle}
              className={`p-4 flex justify-between items-center cursor-pointer ${
                isAdmin ? "bg-orange-500/20" : "bg-blue-600"
              } text-white`}
            >
              <div>
                <p className="font-bold text-sm">
                  {isAdmin ? "Admin View" : artist?.name}
                </p>
                <p className="text-[10px] opacity-80">
                  {isAdmin && selectedSession
                    ? `Session: ${selectedSession.slice(-6)}`
                    : "Live Support"}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
              >
                ✕
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-3">
              {messages.map((m) => {
                const isMine = isAdmin ? m.role === "ai" : m.role === "user";

                return (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className={`flex ${
                      isMine ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div className="max-w-[80%] p-3 rounded-xl bg-blue-600 text-white text-sm">
                      
                      {m.type === "image" ? (
                        <img src={m.imageUrl} className="rounded-lg" />
                      ) : (
                        m.text
                      )}

                      {/* Timestamp */}
                      <div className="text-[9px] opacity-70 mt-1 text-right">
                        {formatTime(m.createdAt)}
                      </div>

                      {/* Seen / Sent */}
                      {isMine && (
                        <div className="text-[9px] mt-1 text-right">
                          {m.seen ? (
                            <span className="text-green-300 animate-pulse">
                              ✓✓ Seen
                            </span>
                          ) : (
                            <span className="text-zinc-300">✓ Sent</span>
                          )}
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-3 flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-zinc-800 text-white p-2 rounded-xl"
              />

              <input
                type="file"
                hidden
                ref={fileInputRef}
                onChange={handleImage}
              />

              <button type="button" onClick={() => fileInputRef.current.click()}>
                📎
              </button>

              <button type="submit">➤</button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-blue-600 text-white"
      >
        {isOpen ? "✕" : "💬"}
      </button>
    </div>
  );
};

export default ArtistChat;