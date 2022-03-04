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

  // Chargement d'un sample personnalisé, via le bouton FILE en haut-droite de chaque pad
  function handleSampleChange(note, file) {
    let fileURL = URL.createObjectURL(file);
    let buffer = new Tone.Buffer(fileURL); 
    mySampler.current.add(note, buffer, () => alert("Sample successfully changed."));
  }

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
      id: "kick",
      handleSampleChange: (e) => handleSampleChange("C4", e.target.files[0]),
    },
    {
      soundPlay: () => soundPlay("D#4"),
      isPlayed: isHhPlayed,
      id: "hh",
      handleSampleChange: (e) => handleSampleChange("D#4", e.target.files[0]),
    },
    {
      soundPlay: () => soundPlay("F#4"),
      isPlayed: isTomPlayed,
      id: "tom",
      handleSampleChange: (e) => handleSampleChange("F#4", e.target.files[0]),
    },
    {
      soundPlay: () => soundPlay("A4"),
      isPlayed: isClapPlayed,
      id: "clap",
      handleSampleChange: (e) => handleSampleChange("A4", e.target.files[0]),
    },
  ];

  return { buttonsList };
}