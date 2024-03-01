/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/navigation';
import Footer from './components/footer';
import Player from './components/player';
import { PlayerProvider } from "./contexts/playerContext";
import { MusicProvider } from "./contexts/musicContext";
import Main from './pages/main';
import About from './pages/about';
import Lab from './pages/lab';
import Tracks from './pages/tracks';

export default function App() {
  console.log('App.tsx rendered');
  return (
    <div className='App'>
      <BrowserRouter>
        <Navigation />
        <PlayerProvider>
          <MusicProvider>
            <Routes>
              <Route path="/" element={<Main />}></Route>
              <Route path="/about" element={<About />}></Route>
              <Route path="/lab" element={<Lab />}></Route>
              <Route path="/tracks" element={<Tracks/>}></Route>
            </Routes>
            <Player />
          </MusicProvider>
        </PlayerProvider>
      </BrowserRouter>
      <Footer />
    </div>
  )
}
