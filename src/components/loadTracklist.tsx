import React, { useState } from 'react';
import { useContext } from "react";
import { tracklist } from "../assets/tracklist"
import { MusicContext } from "../contexts/musicContext";
import styles from '../styles/tracks.module.scss';

export default function LoadTracklist() {
  const ctx = useContext<any>(MusicContext);
  const [maxImgIdx, setMaxImgIdx] = useState(3); // controls the rendering limit of image,

  const renderTracklists = () => {
    let arr = [];
    for (let key in tracklist) {
      arr.push(
        <div>
          <hr />
          <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
          <div className={styles.tracklist}>
            {tracklist[key].map((music, idx) => idx <= maxImgIdx ? (<div key={music.title} className={styles.image_container}>
              <img className={styles.image} key={music.title} src={music.img} alt={music.title} onClick={() => {
                ctx.setMusicIdx({ artist: key, idx: idx })
                ctx.setSelectedMusic(music)
              }} />
              <p className={styles.image_title}>{music.title}</p>
            </div>) : <></>)}
          </div>
          {key === 'taeon' ? <button className={styles.button} onClick={() => setMaxImgIdx(prev => prev + 4)}>See More</button> : <></>}
        </div>
      );
    }
    return arr;
  } 

  return (
    <div className={styles.tracklist_container}>
      {renderTracklists()}
    </div>
  )
}
