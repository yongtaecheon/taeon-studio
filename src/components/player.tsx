import React from "react";
import { useRef, useEffect, useState, useContext } from 'react';
import useDidMountEffect from '../hooks/useDidMountEffect';
import styles from '../styles/player.module.scss'
import { MusicContext } from '../contexts/musicContext';
import { PlayerContext } from '../contexts/playerContext';

const audioContext = new window.AudioContext();

export default function Player() {
  const [isPlaying, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [isVolumeHovered, setIsVolumeHovered] = useState(false);
  const [isPanningHovered, setIsPanningHovered] = useState(false);
  const [isSkip, setIsSkip] = useState(false);
  const [isHide, setIsHide] = useState(false);

  const playerCtx = useContext<any>(PlayerContext);
  const MusicCtx = useContext<any>(MusicContext);

  const selectedMusic = MusicCtx.selectedMusic; //object
  const changeMusic = MusicCtx.changeMusic; //function

  const [volume, setVolume] = [playerCtx.volume, playerCtx.setVolume];
  const [panning, setPanning] = [playerCtx.panning, playerCtx.setPanning];
  const [comp, reverb, eq] = [playerCtx.comp, playerCtx.reverb, playerCtx.eq];
  
  const audioRef = useRef<any>(null);
  const playPauseRef = useRef<any>(null);
  const popoverRef = useRef<any>(null);
  useEffect(() => {
    const audioElement = audioRef.current;
    function generateIR(time: number, decay: number) {//reverb IR 생성
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
      let eqNodes: any = []
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
        //EQ
        audioElement.eq0Node = audioContext.createBiquadFilter();
        audioElement.eq1Node = audioContext.createBiquadFilter();
        audioElement.eq2Node = audioContext.createBiquadFilter();
        audioElement.eq3Node = audioContext.createBiquadFilter();
        audioElement.eq4Node = audioContext.createBiquadFilter();
        audioElement.eq5Node = audioContext.createBiquadFilter();
        audioElement.eq6Node = audioContext.createBiquadFilter();
        audioElement.eq7Node = audioContext.createBiquadFilter();
        eqNodes = [
          audioElement.eq0Node, audioElement.eq1Node,
          audioElement.eq2Node, audioElement.eq3Node,
          audioElement.eq4Node, audioElement.eq5Node,
          audioElement.eq6Node, audioElement.eq7Node
        ]
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
        audioElement.filterNode = eqNodes.reduce((prev: any, cur: any) => {
          return prev.connect(cur);
        }, audioElement.dynamicNode)
        //dry
        audioElement.filterNode //input
          .connect(audioElement.dryNode) //conect dynmaic source(dry)
          .connect(audioElement.reverbOutputNode)
        //wet
        audioElement.filterNode //input
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
      //eq
      eqNodes = [
        audioElement.eq0Node, audioElement.eq1Node,
        audioElement.eq2Node, audioElement.eq3Node,
        audioElement.eq4Node, audioElement.eq5Node,
        audioElement.eq6Node, audioElement.eq7Node
      ]
      eq.forEach((q: any, idx: number) => {
        eqNodes[idx].gain.value = q.gain;
        eqNodes[idx].frequency.value = q.freq;
        eqNodes[idx].type = q.type;
        // console.log(`eq ${idx} signal gain set to ${eqNodes[idx].gain.value}`);
      });
      //reverb
      audioElement.dryNode.gain.value = 1 - reverb.mix;
      audioElement.reverbNode.buffer = generateIR(reverb.time, reverb.decay);
      audioElement.wetNode.gain.value = reverb.mix;
      //pan
      audioElement.pannerNode.pan.value = panning;

      // console.log(`volume set to ${audioElement.volumeNode.gain.value}`);
      // console.log(`pan set to ${audioElement.pannerNode.pan.value}`);
      // console.log(`comp threshold set to ${audioElement.compressorNode.threshold.value}`);
      // console.log(`wet signal set to ${audioElement.wetNode.gain.value}`);
    }
  }, [volume, panning, comp, reverb, eq]);

  useEffect(() => { //새 오디오 렌더링시 totalDuration 로드가 발생하지 않아 추가로 작업
    const audioElement = audioRef.current;
    if (audioElement) {
      // canplay 이벤트가 발생하면 duration 값을 설정
      const handleCanPlay = () => {
        setTotalDuration(audioElement.duration);
      };

      audioElement.addEventListener('canplay', handleCanPlay);

      // Cleanup 이벤트 리스너
      return () => {
        audioElement.removeEventListener('canplay', handleCanPlay);
      };
    }
  }, [selectedMusic])

  useDidMountEffect(() => { //if skip to next song then autoplay
    setPlaying(true);
    setCurrentTime(0);
    const audioElement = audioRef.current;
    audioElement.play();
    console.log('useDidMountEffect called by Skip');
  }, [isSkip])

  useDidMountEffect(() => { //tracks 에서 곡 선택시 자동 재생 시작
    const audioElement = audioRef.current;
    audioElement.play();
  }, [selectedMusic])

  useEffect(() => { //change currentTime of audioElement
    const audioElement = audioRef.current;
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
    if (currentTime === totalDuration) //모두 재생시 처음으로
      setCurrentTime(0);
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

  const handlePrevNext = (e: any) => {
    const audioElement = audioRef.current;
    const val = e.currentTarget.value;
    if (val === 'next') {
      changeMusic(val);
    }
    else if (val === 'prev') {
      if (audioElement.currentTime !== 0) {
        if (audioElement.currentTime < 1) { //1초 되기 전에 눌렀을 경우 이전곡으로 이동
          changeMusic(val);
        }
        else {//0초부터 재생
          audioElement.currentTime = 0;
          setCurrentTime(0);
          audioElement.play();
        }
      }
      else {
        changeMusic(val);
      }
    }
    console.log(`Select ${val} song`);
    setIsSkip(!isSkip);
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
  const toggleVolume = (e: any) => {
    if (volume !== 0)
      setVolume(0);
    else
      setVolume(1);
  }

  const handlePanning = (e: any) => {
    const newPanning = parseFloat(e.currentTarget.value);
    setPanning(newPanning);
  }
  const togglePanning = (e: any) => {
    if (panning !== 0)
      setPanning(0);
  }
  const handleMouseOut = (e: any) => {
    if (popoverRef.current && popoverRef.current.contains(e.relatedTarget)) {
      // 마우스가 popover 안으로 들어온 경우는 무시
      return;
    }
    setIsVolumeHovered(false);
    setIsPanningHovered(false);
  }

  return (
    <div className={styles.player} >
      <audio ref={audioRef} src={selectedMusic.music} />
      {/* play buttons */}
      <div className={styles.buttons_container_play} >
        <button className={styles.buttons} value='prev' onClick={handlePrevNext}><i className="bi bi-skip-start-fill"></i></button>
        <button className={styles.buttons} ref={playPauseRef} onClick={handlePlayPause}>
          {isPlaying === true ?
            <i className='bi bi-pause-fill'></i> :
            <i className='bi bi-play-fill'></i>}
        </button>
        <button className={styles.buttons} value='next' onClick={handlePrevNext}><i className="bi bi-skip-end-fill"></i></button>
      </div>
      {/* timeline */}
      < div className={styles.timeline} >
        <span>{formatTime(currentTime)}</span>
        {!isNaN(totalDuration) && <input className={styles.timeline_progress} type="range" id="progress" min="0" max={totalDuration} value={currentTime} step="0.01" onChange={handleTime} />}
        <span>{!isNaN(totalDuration) && formatTime(totalDuration)}</span>
      </div >
      {/* volume, panning */}
      < div className={styles.buttons_container_volume} onMouseOut={handleMouseOut} >
        <button className={styles.buttons} onMouseOver={() => setIsVolumeHovered(true)} onClick={toggleVolume}>
          {volume === 1 ?
            <i className="bi bi-volume-up-fill"></i> :
            (volume === 0 ? <i className="bi bi-volume-mute-fill"></i>
              : <i className="bi bi-volume-down-fill"></i>)}
        </button>
        {
          isVolumeHovered && <div ref={popoverRef} className={styles.popover}>
            {/* <span>Volume: {Math.floor(volume * 100)}</span> */}
            <input className={styles.popover_range} type="range" id="volume" min="0" max="1" value={volume} step="0.01" onChange={handleVolume} />
          </div>
        }
      </div >
      <div className={styles.buttons_container_panning} onMouseOut={handleMouseOut}>
        <button className={styles.buttons} onMouseOver={() => setIsPanningHovered(true)} onClick={togglePanning}>
          {panning === 0 ? < i className="bi bi-arrows"></i> :
            (panning > 0 ? < i className="bi bi-arrow-right-short"></i>
              : < i className="bi bi-arrow-left-short"></i>)}
        </button>
        {isPanningHovered && <div ref={popoverRef} className={styles.popover}>
          {/* <span>Panning: {Math.floor(panning * 64)}</span> */}
          <input className={styles.popover_range} type="range" id="panner" min="-1" max="1" value={panning} step="0.01" onChange={handlePanning} />
        </div>}
      </div>
      {/* song info - title */}
      <span className={styles.title}>{selectedMusic.title}</span>
    </div >
  )
}

function formatTime(time:number) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}
