import React, { useState } from 'react';
import { useContext } from "react";
import { tracklist } from "../assets/tracklist"
import { MusicContext } from "../contexts/musicContext";
import styles from '../styles/tracks.module.scss';

export default function LoadTracklist() {
  const ctx = useContext<any>(MusicContext);
  const [maxImgIdx, setMaxImgIdx] = useState(3);

  return (
    <div className={styles.tracklist_container}>
      <div>
        <hr/>
        <span>Taeon</span>
        <div className={styles.tracklist}>
          {tracklist.taeon.map((music, idx) => idx <= maxImgIdx ? (<div key={music.title} className={styles.image_container}>
            <img className={styles.image} key={music.title} src={music.img} alt={music.title} onClick={() => {
              ctx.setMusicIdx({artist:'taeon', idx: idx})
              ctx.setSelectedMusic(music)
            }} />
            <p className={styles.image_title}>{music.title}</p>
          </div>) : <></>)}
        </div>
        <button className={styles.button} onClick={()=>setMaxImgIdx(prev=>prev+4)}>See More</button>
      </div>
      <div>
        <hr/>
        <span>Arbor</span>
        <div className={styles.tracklist}>
          {tracklist.arbor.map((music, idx) => <div key={music.title} className={styles.image_container}>
            <img className={styles.image} key={music.title} src={music.img} alt={music.title} onClick={() => {
              ctx.setMusicIdx({artist:'arbor', idx: idx})
              ctx.setSelectedMusic(music)
            }} />
            <p className={styles.image_title}>{music.title}</p>
          </div>)}
        </div>
      </div>
    </div>
  )
}
