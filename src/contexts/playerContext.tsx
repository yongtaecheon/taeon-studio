import { useState, createContext, useMemo } from "react";

export interface Comp{
  threshold: number, //-100~0
  ratio: number, //1~20
  attack: number, //0~1
  release: number, //0~1
  knee: number, //0~40
  outputGain: number, //0~1
  // threshold: -24, ratio: 12, attack: 0.003, release: 0.25, knee: 30
}

export interface EQ{
  gain: number,
  type: string, //lowshelf, highshelf, peaking
}

export interface Reverb{
  time: number, //0~1
  decay: number, //0~1
  mix: number, //0~1
}

export interface PlayerContextType{
  volume: number,
  setVolume: (value: number) => void,
  comp:Comp,
  setComp: (value: Comp) => void,
  eq: EQ[],
  setEq: (value:EQ[]) => void,
  reverb: Reverb,
  setReverb: (value: Reverb) => void,
  panning: number,
  setPanning: (value: number) => void,
}

export const PlayerContext = createContext<PlayerContextType|null>(null);

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  let eqObj:EQ[] = [];
  for (let i = 0; i < 8; i++){
    if (i === 0)
      eqObj.push({ gain: 0, type: 'lowshelf' });
    else if (i === 7)
      eqObj.push({ gain: 0, type: 'highshelf' });
    else
      eqObj.push({ gain: 0, type: 'peaking' });
  }
  const [volume, setVolume] = useState(1);
  const [eq, setEq] = useState<EQ[]>(eqObj);
  const [comp, setComp] = useState<Comp>({ threshold: 0, ratio: 1, attack: 0, release: 0, knee: 0, outputGain: 1 })
  const [reverb, setReverb] = useState<Reverb>({ time: 0.01, decay: 0.01, mix: 0 });
  const [panning, setPanning] = useState(0);
  
  return (
    <PlayerContext.Provider value={{
      volume, setVolume,
      comp, setComp,
      eq, setEq,
      reverb, setReverb,
      panning, setPanning,
    }}>
      {children}
    </PlayerContext.Provider>
  );
}


