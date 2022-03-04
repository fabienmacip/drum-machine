import { useState, useEffect, useRef } from "react";
import * as Tone from "tone";

import kick from "assets/sounds/kick.wav";
import hh from "assets/sounds/hh.wav";
import tom from "assets/sounds/tom.wav";
import clap from "assets/sounds/clap.wav";

export default function useSounds() {

  const mySampler = useRef(null);

  const [isKickPlayed, setIsKickPlayed] = useState(false);
  const [isHhPlayed, setIsHhPlayed] = useState(false);
  const [isTomPlayed, setIsTomPlayed] = useState(false);
  const [isClapPlayed, setIsClapPlayed] = useState(false);

  useEffect(() => {
    const sampler = new Tone.Sampler({

        "C4": kick,
        "D#4": hh,
        "F#4": tom,
        "A4": clap,
    }).toDestination();

    Tone.loaded().then(() => {
      //sampler.triggerAttackRelease(["Eb4", "G4", "Bb4"], 4);
      mySampler.current = sampler;
    })
  }, [])

  function soundPlay(note) {
    mySampler.current.triggerAttackRelease([note], 4);
  }

  function handleKeyDown({key}){
    switch(key){
      case "f":
        setIsKickPlayed(true);
        window.setTimeout(() => {
          setIsKickPlayed(false)
        }, 300);
        soundPlay("C4");
        break;
      case "d":
        setIsHhPlayed(true);
        window.setTimeout(() => {
          setIsHhPlayed(false)
        }, 300);        
        soundPlay("D#4");
        break;
      case "j":
        setIsTomPlayed(true);
        window.setTimeout(() => {
          setIsTomPlayed(false)
        }, 300);        
        soundPlay("F#4");
        break;
      case "k":
        setIsClapPlayed(true);
        window.setTimeout(() => {
          setIsClapPlayed(false)
        }, 300);        
        soundPlay("A4");
        break;
            
      default: break;
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return() => {
      window.removeEventListener("keydown", handleKeyDown);
    }
  })

  const buttonsList = [
    {
      soundPlay: () => soundPlay("C4"),
      isPlayed: isKickPlayed,
    },
    {
      soundPlay: () => soundPlay("D#4"),
      isPlayed: isHhPlayed,
    },
    {
      soundPlay: () => soundPlay("F#4"),
      isPlayed: isTomPlayed,
    },
    {
      soundPlay: () => soundPlay("A4"),
      isPlayed: isClapPlayed,
    },
  ];

  return { buttonsList };
}