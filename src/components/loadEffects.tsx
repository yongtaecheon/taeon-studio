import React from 'react';
import { useContext } from "react"
import { PlayerContext } from "../contexts/playerContext";
import styles from "../styles/lab.module.scss";

export default function LoadEffects() {
  const playerCtx = useContext<any>(PlayerContext);
  const [comp, setComp] = [playerCtx.comp, playerCtx.setComp];
  const [reverb, setReverb] = [playerCtx.reverb, playerCtx.setReverb];
  return (
    <div className={styles.effects}>
      <div className={styles.comp}>
        <h1>Compressor</h1>
        <p>recommend you to turn down the volume.</p>
        <p>threshold</p>
        <span>{comp.threshold}</span>
        <input type="range" id="threshold" min="-100" max="0" value={comp.threshold} step="1" onChange={(e: any) => setComp({ ...comp, threshold: parseInt(e.currentTarget.value) })} />
        <p>ratio</p>
        <span>{comp.ratio}</span>
        <input type="range" id="ratio" min="1" max="20" value={comp.ratio} step="1" onChange={(e: any) => setComp({ ...comp, ratio: parseInt(e.currentTarget.value) })} />
        <p>attack</p>
        <span>{(comp.attack).toFixed(2)}</span>
        <input type="range" id="attack" min="0" max="1" value={comp.attack} step="0.01" onChange={(e: any) => setComp({ ...comp, attack: parseFloat(e.currentTarget.value) })} />
        <p>relase</p>
        <span>{(comp.release).toFixed(2)}</span>
        <input type="range" id="release" min="0" max="1" value={comp.release} step="0.01" onChange={(e: any) => setComp({ ...comp, release: parseFloat(e.currentTarget.value) })} />
        <p>knee</p>
        <span>{comp.knee}</span>
        <input type="range" id="knee" min="0" max="40" value={comp.knee} step="1" onChange={(e: any) => setComp({ ...comp, knee: parseInt(e.currentTarget.value) })} />
        <p>output Gain - you can use it as Distortion</p>
        <span>{Math.floor(comp.outputGain*100)}</span>
        <input type="range" id="knee" min="0" max="2" value={comp.outputGain} step="0.01" onChange={(e: any) => setComp({ ...comp, outputGain: parseFloat(e.currentTarget.value) })} />
      </div>
      <div className={styles.reverb}>
        <h1>Reverb</h1>
        <p>mix</p>
        <span>{Math.floor(reverb.mix * 100)}%</span>
        <input type="range" id="threshold" min="0" max="1" value={reverb.mix} step="0.01" onChange={(e: any) => setReverb({ ...reverb, mix: parseFloat(e.currentTarget.value) })} />
        <p>Reverb time</p>
        <span>{Math.floor(reverb.time * 100)}%</span>
        <input type="range" id="threshold" min="0.01" max="1" value={reverb.time} step="0.01" onChange={(e: any) => setReverb({ ...reverb, time: parseFloat(e.currentTarget.value) })} />
        <p>Decay</p>
        <span>{Math.floor(reverb.decay * 100)}%</span>
        <input type="range" id="threshold" min="0.01" max="1" value={reverb.decay} step="0.01" onChange={(e: any) => setReverb({ ...reverb, decay: parseFloat(e.currentTarget.value) })} />
      </div>
    </div>
  )
}
