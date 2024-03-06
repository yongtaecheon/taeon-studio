import React from 'react';
import { useContext } from "react"
import { PlayerContext, defaultComp, defaultReverb } from "../contexts/playerContext";
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
    let key: string;
    for (key in comp) {
      arr.push(
        <div>
          <p>{key}</p>
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
        </div>
      );
    }
    arr.push(<button onClick={()=>setComp(defaultComp)}>Default</button>)
    return arr;
  }
  const renderEq = () => {
    let arr = eq.map((q: any, idx: number) => {
      return <div>
        <p>{q.freq} Hz</p>
        <input className={styles.params} type="range" id={q.type} min="-10" max="10" value={q.gain} step="0.1" onChange={
          (e: any) =>
          setEq(Object.values({
            ...eq,
            [idx]: { gain: parseFloat(e.currentTarget.value), type: q.type, freq:q.freq }
          }))} />
        <button onClick={
          () =>
          setEq(Object.values({
            ...eq,
            [idx]: { gain: 0, type: q.type, freq:q.freq }
          }))}>Default</button>
        <br/>
      </div>
    })
    return arr;
  }
  const renderReverb = () => {
    let arr = [];
    let key: string;
    const params:any = {mix: ['0','1','0.01'], time: ['0.01','1','0.01'], decay: ['0.01','1','0.01']}
    for (key in reverb) {
      arr.push(
        <div>  
          <p>{key}</p>
          <p>{Math.floor(reverb[key] * 100)} %</p>
          <input type="range" className={styles.params}
            id={key}
            min={params[key][0]}
            max={params[key][1]}
            value={reverb[key]}
            step={params[key][2]}
            onChange={(key => (e: any) => setReverb({ ...reverb, [key]: parseFloat(e.currentTarget.value) }))(key)} />
        </div>
      );
    }
    arr.push(<button onClick={()=>setReverb(defaultReverb)}>Default</button>)
    return arr;
  }
  return (
    <div className={styles.effects}>
      <div className={styles.effects_containers}>
        <div className={styles.effects_container}>
          <h1>Compressor</h1>
          <p>recommend you to turn down the volume.</p>
          <div className={styles.effects_container_adjust}>
            {renderComp()}
          </div>
        </div>
        <div className={styles.effects_container}>
          <h1>Equalizer</h1>
          <div className={styles.effects_container_adjust}>
            {renderEq()}
          </div>
        </div>
        <div className={styles.effects_container}>
          <h1>Reverb</h1>
          <div className={styles.effects_container_adjust}>
            {renderReverb()}
          </div>
        </div>
      </div>
    </div>
  )
}
