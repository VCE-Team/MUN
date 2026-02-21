'use client';

import { useEffect, useRef, useState } from 'react';
import { ScrollReset } from './scroll-reset';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Hero() {
  const [bgLoaded, setBgLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setBgLoaded(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (videoRef.current) {
        if (window.scrollY > 0) {
          videoRef.current.pause();
        } else {
          void videoRef.current.play();
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Load the (large) hero video only when the section is about to be visible.
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first?.isIntersecting) {
          setShouldLoadVideo(true);
          observer.disconnect();
        }
      },
      { root: null, rootMargin: '300px 0px', threshold: 0.01 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
      return;
    }
    setIsMuted((prev) => !prev);
  };

  return (
    <>
      <ScrollReset />
      <section ref={sectionRef} className="relative w-full overflow-hidden">
        <div
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            bgLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundColor: '#000' }}
        />
        {bgLoaded && (
          <div className="relative w-screen pb-[56.25%] md:pb-0 md:h-[56vh] lg:h-[70vh] xl:h-[90vh] 2xl:h-[92vh]">
            {shouldLoadVideo ? (
              <video
                ref={videoRef}
                className="absolute top-0 left-0 w-full h-full object-cover"
                autoPlay
                loop
                muted={isMuted}
                playsInline
                preload="metadata"
                poster="/videos/optimized/herovideomain-poster.jpg"
              >
                <source
                  src="/videos/optimized/herovideomain.webm"
                  type="video/webm"
                />
                <source
                  src="/videos/optimized/herovideomain.mp4"
                  type="video/mp4"
                />
              </video>
            ) : (
              <div
                className="absolute top-0 left-0 w-full h-full bg-center bg-cover"
                style={{
                  backgroundImage:
                    "url('/videos/optimized/herovideomain-poster.jpg')",
                }}
              />
            )}
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
