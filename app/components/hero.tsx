"use client";

import { useEffect, useRef, useState } from "react";
import { ScrollReset } from "./scroll-reset";
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  const [bgLoaded, setBgLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    setBgLoaded(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (videoRef.current) {
        if (window.scrollY > 0) {
          videoRef.current.pause();
        } else {
          videoRef.current.play();
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMute = () => {
    setIsMuted(prev => !prev);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  return (
    <>
      <ScrollReset />
      <section className="mt-[4rem] relative w-full overflow-hidden">
        <div
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            bgLoaded ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundColor: "#000" }}
        />
        {bgLoaded && (
          <div className="relative w-full pb-[56.25%] md:pb-0 md:h-screen">
            <video
              ref={videoRef}
              className="absolute top-0 left-0 w-full h-full object-cover"
              src="/videos/herovideomain.mp4"
              autoPlay
              loop
              muted={isMuted}
              playsInline
            />
          </div>
        )}
        <Button
          onClick={toggleMute}
          className="absolute top-4 left-4 z-10 rounded-full p-2 shadow-md"
        >
          {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
        </Button>
      </section>
    </>
  );
}
