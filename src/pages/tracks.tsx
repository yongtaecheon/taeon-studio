import React from 'react';
import LoadTracklist from "../components/loadTracklist"
import styles from '../styles/tracks.module.scss';

export default function Tracks() {
  return (
    <div className={styles.tracks}>
      <h1>Tracks</h1>
      <span>Select songs to listen!</span>
      <LoadTracklist/>
    </div>
  )
}
