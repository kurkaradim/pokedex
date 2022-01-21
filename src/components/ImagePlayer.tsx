import React, { useState, useEffect, useRef } from "react";
import "./ImagePlayer.scss";

export interface ImagePlayerProps {
  url: string,
  imgURL: string
} 


const useAudio = (url: string) => {
  const audio = useRef<HTMLAudioElement | undefined>(typeof Audio !== 'undefined' ? new Audio(url) : undefined);
  const [playing, setPlaying] = useState(false);
  const toggle = () => {
    if(!audio?.current?.error){
      setPlaying(!playing)};
    }
   
  useEffect(() => {
    if(playing){
      audio.current?.pause();
      audio.current?.play();
    } 
}, [playing]);

  useEffect(() => {
    audio.current?.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.current?.removeEventListener('ended', () => setPlaying(false));
    };
  }, []);

  return [playing, toggle] as const;
};


const ImagePlayer: React.FC<ImagePlayerProps> = (props: ImagePlayerProps) => {
    const { url, imgURL } = props;
    const [playing, toggle] = useAudio(url);

  return (
    <div className="image">
      <img className={"imageCry"} onClick={toggle} src={imgURL}></img>
    </div>
  );
};

export default ImagePlayer;