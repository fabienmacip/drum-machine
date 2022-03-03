import { useEffect, useRef } from "react";
import * as Tone from "tone";

export default function useSounds() {

  const mySampler = useRef(null);

  useEffect(() => {
    const sampler = new Tone.Sampler({
      urls: {
        "C4": "C4.mp3",
        "D#4": "Ds4.mp3",
        "F#4": "Fs4.mp3",
        "A4": "A4.mp3",
      },
      release: 1,
      baseUrl: "https://tonejs.github.io/audio/salamander/",
    }).toDestination();

    Tone.loaded().then(() => {
      //sampler.triggerAttackRelease(["Eb4", "G4", "Bb4"], 4);
      mySampler.current = sampler;
    })
  }, [])

  

  return;
}