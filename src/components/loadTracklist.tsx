import React from 'react';
import { useContext } from "react";
import { tracklist } from "../assets/tracklist"
import { MusicContext } from "../contexts/musicContext";


export default function LoadTracklist() {
  const ctx = useContext<any>(MusicContext);
  return (
    <div>
      {tracklist.taeon.map((music) => <img key={music.title} width="500" src={music.img} alt='img' onClick={()=>ctx.setSelectedMusic(music)} />)}
      {tracklist.arbor.map((music) => <img key={music.title} width="500" src={music.img} alt='img' onClick={()=>ctx.setSelectedMusic(music)} />)}
    </div>
  )
}
