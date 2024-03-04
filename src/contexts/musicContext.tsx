import React from 'react';
import { useState, createContext } from "react";
import { tracklist } from "../assets/tracklist";

export interface tracklistType{
  title: string,
  music: string,
  img: string,
}
export interface musicIdxType{
  artist: string,
  idx: number,
}

export interface MusicContextType{
  selectedMusic: tracklistType,
  setSelectedMusic: (selectedMusic: tracklistType) => void,
  musicIdx: musicIdxType,
  setMusicIdx: (musicIx: musicIdxType) => void,
  changeMusic: (state:string) => void
}

export const MusicContext = createContext<MusicContextType|null>(null);

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const [musicIdx, setMusicIdx] = useState({ artist: 'taeon', idx:3});
  const [selectedMusic, setSelectedMusic] = useState(tracklist.taeon[musicIdx.idx]);
  const changeMusic = (state: string) => {
    console.log(`changeMusic called by ${state}`)
    let copy = {...musicIdx};
    if (state === 'prev') {
      if (musicIdx.idx === 0) { //first song then move to last song
        if (musicIdx.artist === 'taeon') {
          copy.artist = 'arbor';
          copy.idx = tracklist.arbor.length - 1;
        }
        else if(musicIdx.artist === 'arbor'){
          copy.artist = 'taeon';
          copy.idx = tracklist.taeon.length - 1;
        }
      }
      else
        copy.idx -= 1;
      setMusicIdx(copy);
    }
    else if (state === 'next') {//last song then move to first song of next artist
      if (musicIdx.idx === tracklist.taeon.length - 1 && musicIdx.artist==='taeon'){
          copy.artist = 'arbor';
          copy.idx = 0;
      }
      else if(musicIdx.idx === tracklist.arbor.length - 1 && musicIdx.artist==='arbor'){
        copy.artist = 'taeon';
        copy.idx = 0;
      }
      else
        copy.idx += 1;
      setMusicIdx(copy);
    }
    if (musicIdx.artist === 'taeon')
      setSelectedMusic(tracklist.taeon[musicIdx.idx]);
    else if(musicIdx.artist === 'arbor')
      setSelectedMusic(tracklist.arbor[musicIdx.idx]);
  }
  return (
    <MusicContext.Provider value={{ selectedMusic, setSelectedMusic, musicIdx, setMusicIdx, changeMusic }}>
      {children}
    </MusicContext.Provider>
  );
}


