# Taeon Studio
[https://taeon-studio.vercel.app](https://taeon-studio.vercel.app)

![MainPage](https://github.com/yongtaecheon/taeon-studio/assets/42794553/10e7d9eb-a56c-4a9d-a72b-ea0461a88b58)
This is a music streaming, effecting studio for my covered/arranged musics.

## Used Skill Stacks
- React.js
- Typescript, HTML, SCSS
- Web Audio API
- Started with Next.js 14 but faced compatibility issues on Web Audio API. Migrated to React.js.

## Audio Context Architecture
![Audio Context Architecture](https://github.com/yongtaecheon/taeon-studio/assets/42794553/6af93583-7109-4d0c-98f3-965c91b52fb5)

## Key Features
### About
  -  My descriptions about music
### Tracks
  - Choose songs by selecting the artwork of the songs
### Lab
  - Can add Effects(Compressor, Equalizer and Reverb) to AudioContext in Player.tsx
  1. Compressor
    - Can adjust Threshold, Ratio, Attack, Release, Knee and Output Gain
  2. Equalizer
    - 8-band Equalizer
    - 60, 250 Hz (low end - mid low)
    - 700, 1500 Hz (mid - mid high)
    - 2500, 4000, 7500, 15000 Hz (high - high end)
    - 60Hz and 15000Hz are Shelf filter (Lowshelf, Highshelf)
    - Other frequencies are Peaking filter
  3. Reverb
    - Based on Convolution Reverb (based on Impulse Response)
    - Can adjust Mix(between dry and wet signal), Time(length of Reverb) and Decay(Reverb decreasing time) 
  More Effects will be added.
### Player
  - Audio Context created from here
  - Can adjust next/previous songs, audio timeline, volume and panning(left to right). 

## npm requirements
- `npm i node-sass`
- `npm i sass-loader`
- `npm i react-router-dom@6`
- `npm i file-loader`