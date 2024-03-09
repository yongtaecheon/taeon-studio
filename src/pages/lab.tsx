import React from 'react';
import LoadEffects from "../components/loadEffects";
import styles from '../styles/lab.module.scss';

export default function Lab() {
  return (
    <div className={styles.lab}>
      <h1>Lab</h1>
      <p>You can apply your custom effects on my songs.</p>
      <p>Effect chain goes <strong>Original Music</strong> → <strong>Compressor</strong> → <strong>Equalizer</strong> → <strong>Reverb</strong></p>
      <hr/>
      <LoadEffects />
    </div>
  )
}
