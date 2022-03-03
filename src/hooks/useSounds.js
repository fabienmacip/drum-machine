import { useEffect, useRef } from "react";
import * as Tone from "tone";

import kick from "assets/sounds/kick.wav";
import hh from "assets/sounds/hh.wav";
import tom from "assets/sounds/tom.wav";
import clap from "assets/sounds/clap.wav";

export default function useSounds() {

  const mySampler = useRef(null);

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
        soundPlay("C4");
        break;
      case "d":
        soundPlay("D#4");
        break;
      case "j":
        soundPlay("F#4");
        break;
      case "k":
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
      soundPlay: () => soundPlay("C4")
    },
    {
      soundPlay: () => soundPlay("D#4")
    },
    {
      soundPlay: () => soundPlay("F#4")
    },
    {
      soundPlay: () => soundPlay("A4")
    },
  ];

  return { buttonsList };
}