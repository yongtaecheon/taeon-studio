import React from 'react';
import { useState, createContext } from "react";
import { tracklist } from "../assets/tracklist";

export interface tracklistType{
  title: string,
  music: string,
  img: string,
}

export interface MusicContextType{
  selectedMusic: tracklistType,
  setSelectedMusic: (selectedMusic: tracklistType) => void
}

export const MusicContext = createContext<MusicContextType|null>(null);

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const [selectedMusic, setSelectedMusic] = useState(tracklist.taeon[1]);
  return (
    <MusicContext.Provider value={{ selectedMusic, setSelectedMusic }}>
      {children}
    </MusicContext.Provider>
  );
}


