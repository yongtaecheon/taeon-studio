import React from 'react';
import { useContext } from "react"
import { PlayerContext, defaultComp, defaultReverb, setDefaultEq } from "../contexts/playerContext";
import styles from "../styles/lab.module.scss";

export default function LoadEffects() {
  const playerCtx = useContext<any>(PlayerContext);
  const [comp, setComp] = [playerCtx.comp, playerCtx.setComp];
  const [eq, setEq] = [playerCtx.eq, playerCtx.setEq];
  const [reverb, setReverb] = [playerCtx.reverb, playerCtx.setReverb];

  const renderComp = () => {
    let arr = [];
    const params:any = {
      threshold: ['-100', '0', '1'], ratio: ['1', '20', '1'],
      attack: ['0', '1', '0.01'], release: ['0', '1', '0.01'],
      knee: ['0', '40', '1'], outputGain: ['0', '2', '0.01']
    };
    for (let key in comp) {
      arr.push(
        <div className={styles.params_container}>
          <strong>{key.charAt(0).toUpperCase()+key.slice(1)}</strong>
          <p>{key === 'outputGain' ? `${Math.floor(comp[key] * 100)} %` :
            (key === 'attack' || key === 'release') ? `${comp[key]} ms` :
              key === 'ratio' ? `${comp[key]} : 1` :
            key === 'threshold'? `${comp[key]} dB`:comp[key]}</p>
          <input className={styles.params} type="range"
            id={key}
            min={params[key][0]}
            max={params[key][1]}
            value={comp[key]}
            step={params[key][2]}
            onChange={(key => (e: any) => setComp({ ...comp, [key]: parseFloat(e.currentTarget.value) }))(key)} />
          <p>{params[key][0]} {key === 'outputGain' ? ` %` :
            (key === 'attack' || key === 'release') ? ` ms` :
              key === 'ratio' ? ` : 1` :
            key === 'threshold'? ` dB`:comp[key]}</p>
        </div>
      );
    }
    return arr;
  }
  const renderEq = () => {
    let arr = eq.map((q: any, idx: number) => {
      return (
        <div className={styles.params_container}>
          <strong>{q.freq} Hz</strong>
          <p>{q.gain} dB</p>
          <input className={styles.params} type="range" id={q.type} min="-10" max="10" value={q.gain} step="0.1" onChange={
            (e: any) =>
              setEq(Object.values({
                ...eq,
                [idx]: { gain: parseFloat(e.currentTarget.value), type: q.type, freq: q.freq }
              }))} />
          {/* <button className={styles.params_button} onClick={
            () =>
              setEq(Object.values({
                ...eq,
                [idx]: { gain: 0, type: q.type, freq: q.freq }
              }))}>Default</button> */}
          <p>-10 dB</p>
        </div>);
    })
    return arr;
  }
  const renderReverb = () => {
    let arr = [];
    const params:any = {mix: ['0','1','0.01'], time: ['0.01','1','0.01'], decay: ['0.01','1','0.01']}
    for (let key in reverb) {
      arr.push(
        <div className={styles.params_container}>
          <strong>{key.charAt(0).toUpperCase()+key.slice(1)}</strong>
          <p>{Math.floor(reverb[key] * 100)} %</p>
          <input type="range" className={styles.params}
            id={key}
            min={params[key][0]}
            max={params[key][1]}
            value={reverb[key]}
            step={params[key][2]}
            onChange={(key => (e: any) => setReverb({ ...reverb, [key]: parseFloat(e.currentTarget.value) }))(key)} />
          <p>{params[key][0]} %</p>
        </div>
      );
    }
    return arr;
  }
  return (
    <div className={styles.effects}>
      <div className={styles.effects_containers}>
        <div className={styles.effects_container}>
          <h1>Compressor</h1>
          <div className={styles.effects_container_adjust_comp}>
            {renderComp()}
          </div>
          <button className={styles.params_button} onClick={()=>setComp(defaultComp)}>Default</button>
        </div>
        <div className={styles.effects_container}>
          <h1>Equalizer</h1>
          <div className={styles.effects_container_adjust_eq}>
            {renderEq()}
          </div>
          <button className={styles.params_button} onClick={()=>setEq(setDefaultEq())}>Default</button>
        </div>
        <div className={styles.effects_container}>
          <h1>Reverb</h1>
          <div className={styles.effects_container_adjust_reverb}>
            {renderReverb()}
          </div>
          <button className={styles.params_button} onClick={()=>setReverb(defaultReverb)}>Default</button>
        </div>
      </div>
    </div>
  )
}
