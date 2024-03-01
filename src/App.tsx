/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import {Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import Player from './components/player';
import { PlayerProvider } from "./contexts/playerContext";
import { MusicProvider } from "./contexts/musicContext";
import Main from './pages/main';
import About from './pages/about';
import Lab from './pages/lab';
import Tracks from './pages/tracks';

export default function App() {
  const pathname = useLocation().pathname;
  console.log('App.tsx rendered');
  return (
    <div className='App'>
        {pathname !== '/' && <Header />}
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
      {pathname !== '/' && <Footer />}
    </div>
  )
}
