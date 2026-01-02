import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"; // Note: ensure it's react-router-dom
import HomePage from "./pages";
import ArtistProfile from "./constant/artistprop";
import { ARTIST_DATA } from "./constant/artistdata";

function App() {
  return (
    <BrowserRouter>
    <ScrollToTop></ScrollToTop>
      <Routes>
        <Route path="/" element={<HomePage />} />

        {/* Dynamic route for all other artists */}
        <Route path="/artist/:artistId" element={<ArtistWrapper />} />
      </Routes>
    </BrowserRouter>
  );
}

import { useParams } from "react-router-dom";
import ScrollToTop from "./assets/scroll";

function ArtistWrapper() {
  const { artistId } = useParams();
  const artist = ARTIST_DATA[artistId];

  if (!artist) {
    return (
      <div className="text-white bg-black h-screen flex items-center justify-center">
        Artist Not Found
      </div>
    );
  }

  return <ArtistProfile data={artist} />;
}

export default App;
