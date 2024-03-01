import React from 'react';
import { useContext } from "react";
import { tracklist } from "../assets/tracklist"
import { MusicContext } from "../contexts/musicContext";


export default function LoadTracklist() {
  const ctx = useContext<any>(MusicContext);
  return (
    <div>
      <div>
        {tracklist.taeon.map((music) => <img key={music.title} width="400" src={music.img} alt='img' onClick={()=>ctx.setSelectedMusic(music)} />)}
      </div>
      <div>  
        {tracklist.arbor.map((music) => <img key={music.title} width="400" src={music.img} alt='img' onClick={() => ctx.setSelectedMusic(music)} />)}
      </div>
    </div>
  )
}
