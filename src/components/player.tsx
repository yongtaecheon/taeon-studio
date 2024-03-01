import React from "react";
import { useRef, useEffect, useState, useContext } from 'react';
import styles from '../styles/player.module.scss'
import { MusicContext } from '../contexts/musicContext';
import { PlayerContext } from '../contexts/playerContext';

const audioContext = new window.AudioContext();

export default function Player() {
  const [isPlaying, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);

  const selectedMusic = useContext<any>(MusicContext).selectedMusic;
  const playerCtx = useContext<any>(PlayerContext);

  const [volume, setVolume] = [playerCtx.volume, playerCtx.setVolume];
  const [panning, setPanning] = [playerCtx.panning, playerCtx.setPanning];
  const [comp, reverb] = [playerCtx.comp, playerCtx.reverb];

  const audioRef = useRef<any>(null);
  const playPauseRef = useRef<any>(null);

  useEffect(() => {
    const audioElement = audioRef.current;

    function generateIR (time:number, decay:number) {
      const sampleRate = audioContext.sampleRate;
      const length = sampleRate * time;
      const impulse = audioContext.createBuffer(2, length, sampleRate);

      const leftImpulse = impulse.getChannelData(0);
      const rightImpulse = impulse.getChannelData(1);

      for (let i = 0; i < length; i++) {
        leftImpulse[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, decay);
        rightImpulse[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, decay);
      }

      return impulse;
    }

    if (audioElement) {
      if (!audioElement.sourceNode) {
        console.log('set default mediaElementSource')

        //Media Element Source 생성
        const source = audioContext.createMediaElementSource(audioElement);
        audioElement.sourceNode = source;

        // input Gain(Volume)
        audioElement.volumeNode = audioContext.createGain();
        //compressor
        audioElement.compressorNode = audioContext.createDynamicsCompressor();
        //outputGain (distortion)
        audioElement.outputGainNode = audioContext.createGain();
        //reverb
        audioElement.dryNode = audioContext.createGain();
        audioElement.reverbNode = audioContext.createConvolver();
        audioElement.wetNode = audioContext.createGain();
        audioElement.reverbOutputNode = audioContext.createGain();

        //Stereo pan
        audioElement.pannerNode = audioContext.createStereoPanner();

        //최종연결
        audioElement.dynamicNode =
          source
          .connect(audioElement.volumeNode) //input gain
          .connect(audioElement.compressorNode) //comp
          .connect(audioElement.outputGainNode) //comp output gain
          
        //dry
        audioElement.dynamicNode //input
          .connect(audioElement.dryNode) //conect dynmaic source(dry)
          .connect(audioElement.reverbOutputNode) 
        //wet
        audioElement.dynamicNode //input
          .connect(audioElement.reverbNode)//connect reverb wet source
          .connect(audioElement.wetNode) 
          .connect(audioElement.reverbOutputNode)
        audioElement.reverbOutputNode
          .connect(audioElement.pannerNode) //pan
          .connect(audioContext.destination);
      }
      //volume
      audioElement.volumeNode.gain.value = volume;
      //comp
      audioElement.compressorNode.threshold.value = comp.threshold;
      audioElement.compressorNode.ratio.value = comp.ratio;
      audioElement.compressorNode.attack.value = comp.attack;
      audioElement.compressorNode.release.value = comp.release;
      audioElement.compressorNode.knee.value = comp.knee;
      audioElement.outputGainNode.gain.value = comp.outputGain;
      //reverb
      audioElement.dryNode.gain.value = 1 - reverb.mix;
      audioElement.reverbNode.buffer = generateIR(reverb.time, reverb.decay);
      audioElement.wetNode.gain.value = reverb.mix;
      //pan
      audioElement.pannerNode.pan.value = panning;

      console.log(`volume set to ${audioElement.volumeNode.gain.value}`);
      console.log(`pan set to ${audioElement.pannerNode.pan.value}`);
      console.log(`comp threshold set to ${audioElement.compressorNode.threshold.value}`);
      console.log(`wet signal set to ${audioElement.wetNode.gain.value}`);
    }
  }, [volume, panning, comp, reverb]);

  useEffect(() => {

    setPlaying(false);
    setCurrentTime(0);
  }, [selectedMusic])

  useEffect(() => {
    const audioElement = audioRef.current;
    setTotalDuration(audioElement.duration);
  },[])

  useEffect(() => {
    const audioElement = audioRef.current;
    console.log(audioElement.duration);
    if (audioElement) {
      // 오디오의 전체 재생 시간
      setTotalDuration(audioElement.duration);

      // 오디오가 재생 동안 현재 시간 업데이트
      const updateTime = () => setCurrentTime(audioElement.currentTime);
      audioElement.addEventListener('timeupdate', updateTime);

      return () => {
        audioElement.removeEventListener('timeupdate', updateTime);
      };
    }
  }, [currentTime]);

  const handlePlayPause = () => {
    const audioElement = audioRef.current;
    const playPauseElement = playPauseRef.current;

    if (audioElement && playPauseElement) {
      if (audioContext.state === "suspended") {
        audioContext.resume();
      }
      if (!isPlaying) {
        audioElement.play();
      } else {
        audioElement.pause();
      }
      setPlaying(!isPlaying);
    }
  }

  const handleTime = (e: any) => {
    const newTime = parseFloat(e.currentTarget.value);
    const audioElement = audioRef.current;

    if (audioElement) {
      audioElement.currentTime = newTime;
      setCurrentTime(newTime);
    }
  }
 
  const handleVolume = (e: any) => {
    const newVolume = parseFloat(e.currentTarget.value);
    setVolume(newVolume);
  }

  const handlePanning = (e: any) => {
    const newPanning = parseFloat(e.currentTarget.value);
    setPanning(newPanning);
  }

  return (
    <div className={styles.player}>
      <audio ref={audioRef} src={selectedMusic.music}/>
      <span>{selectedMusic.title}</span>
      <input type="range" id="progress" min="0" max={totalDuration} value={currentTime} step="0.01" onChange={handleTime}/>
      <span>
        {formatTime(currentTime)} / {formatTime(totalDuration)}
      </span>
      <button className={styles.playPause} ref={playPauseRef} onClick={handlePlayPause}>
        {isPlaying === true ?
          <i className={`bi bi-pause-fill ${styles.playPause_text}`}></i> :
          <i className={`bi bi-play-fill ${styles.playPause_text}`}></i>}
      </button>
      <input type="range" id="volume" min="0" max="1" value={volume} step="0.01" onChange={handleVolume} />
      <span>Volume: {Math.floor(volume*100)}</span>
      <input type="range" id="panner" min="-1" max="1" value={panning} step="0.01" onChange={handlePanning} />
      <button type="button" onClick={()=>setPanning(0)}>set Pan to default</button>
      <span>Pan: {Math.floor(panning*64)}</span>
    </div>
  )
}

function formatTime(time:number) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}
