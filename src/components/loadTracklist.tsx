import React from 'react';
import { useContext } from "react";
import { tracklist } from "../assets/tracklist"
import { MusicContext } from "../contexts/musicContext";
import styles from '../styles/tracks.module.scss';

export default function LoadTracklist() {
  const ctx = useContext<any>(MusicContext);
  return (
    <div className={styles.tracklist_container}>
      <div className={styles.tracklist}>
        {tracklist.taeon.map((music) => <div className={styles.image_container}><img className={styles.image} key={music.title} src={music.img} alt={music.title} onClick={() => ctx.setSelectedMusic(music)} /></div>)}
        {tracklist.arbor.map((music) => <div className={styles.image_container}><img className={styles.image} key={music.title} src={music.img} alt={music.title} onClick={() => ctx.setSelectedMusic(music)} /></div>)}
      </div>
    </div>
  )
}
