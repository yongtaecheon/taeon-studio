import React, { useEffect, useState } from 'react';
import { useContext } from "react";
import { tracklist } from "../assets/tracklist"
import { MusicContext } from "../contexts/musicContext";
import styles from '../styles/tracks.module.scss';

export default function LoadTracklist() {
  const ctx = useContext<any>(MusicContext);
  const [ImgIdx, setImgIdx] = useState < { [key: string]: number }>({taeon:3, arbor:3}); // controls the rendering limit of image,
  const [maxImgIdx, setMaxImgIdx] = useState(4); //rendering amount when clicked See More button

  //responsive loading
  useEffect(() => {
    if (window.innerWidth < 650) {
      setMaxImgIdx(2);
      setImgIdx({taeon:0, arbor:0});
    }
    else if (window.innerWidth < 1000) {
      setMaxImgIdx(2);
      setImgIdx({taeon:1, arbor:1});
    }
    else if (window.innerWidth < 1300) {
      setMaxImgIdx(3);
      setImgIdx({taeon:2, arbor:2});
    }
  }, []);

  const renderTracklists = () => {
    let arr = [];
    for (let key in tracklist) {
      arr.push(
        <div>
          <hr />
          <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
          <div className={styles.tracklist}>
            {tracklist[key].map((music, idx) => idx <= ImgIdx[key] ? (<div key={music.title} className={styles.image_container}>
              <img className={styles.image} key={music.title} src={music.img} alt={music.title} onClick={() => {
                ctx.setMusicIdx({ artist: key, idx: idx })
                ctx.setSelectedMusic(music)
              }} />
              <p className={styles.image_title}>{music.title}</p>
            </div>) : <></>)}
          </div>
          {tracklist[key].length > ImgIdx[key]+1 ? <button key={key} value={key} className={styles.button} onClick={(e: any) => setImgIdx({ ...ImgIdx, [e.currentTarget.value]: ImgIdx[e.currentTarget.value] + maxImgIdx })}>See More</button> : <></>}
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
