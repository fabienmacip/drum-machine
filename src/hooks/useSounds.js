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

  const buttonsList = [
    {
      soundPlay: () => mySampler.current.triggerAttackRelease(["C4"], 4)
    },
    {
      soundPlay: () => mySampler.current.triggerAttackRelease(["D#4"], 4)
    },
    {
      soundPlay: () => mySampler.current.triggerAttackRelease(["F#4"], 4)
    },
    {
      soundPlay: () => mySampler.current.triggerAttackRelease(["A4"], 4)
    },
  ];

  return { buttonsList };
}