"use client";

import { useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import styles from "./ShowreelPlayer.module.css";

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${mins}:${secs}`;
}

export function ShowreelPlayer({
  videoUrl,
  posterUrl,
  title,
  triggerLabel,
  triggerClassName,
}: {
  /** Empty string renders the accessible "coming soon" state instead of a player. */
  videoUrl: string;
  posterUrl: string;
  title: string;
  triggerLabel: ReactNode;
  triggerClassName?: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const open = () => dialogRef.current?.showModal();

  const close = () => {
    videoRef.current?.pause();
    setIsPlaying(false);
    dialogRef.current?.close();
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    setCurrentTime(video.currentTime);
    setProgress(video.duration ? (video.currentTime / video.duration) * 100 : 0);
  };

  const handleSeek: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    const value = Number(event.target.value);
    video.currentTime = (value / 100) * video.duration;
    setProgress(value);
  };

  return (
    <>
      <button
        type="button"
        onClick={open}
        className={triggerClassName ?? `btn ${styles.trigger}`}
      >
        <span className={styles.playIcon} aria-hidden="true">
          ▶
        </span>
        {triggerLabel}
      </button>

      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-label={`${title} showreel player`}
        onClose={() => setIsPlaying(false)}
        onClick={(event) => {
          if (event.target === dialogRef.current) close();
        }}
      >
        <div className={styles.frame}>
          <button
            type="button"
            className={styles.closeButton}
            onClick={close}
            aria-label="Close showreel"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
              <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="1" y1="1" x2="15" y2="15" />
                <line x1="15" y1="1" x2="1" y2="15" />
              </g>
            </svg>
          </button>

          {videoUrl ? (
            <video
              ref={videoRef}
              className={styles.media}
              poster={posterUrl}
              muted={isMuted}
              playsInline
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
              onEnded={() => setIsPlaying(false)}
            >
              <source src={videoUrl} />
            </video>
          ) : (
            <>
              <Image
                src={posterUrl}
                alt=""
                className={styles.media}
                width={1600}
                height={900}
                unoptimized
              />
              <div className={styles.comingSoon} role="status">
                <p className={styles.comingSoonTitle}>Showreel coming soon</p>
                <p className="meta">The final cut is in the works.</p>
              </div>
            </>
          )}
        </div>

        {videoUrl && (
          <div className={styles.controls}>
            <button
              type="button"
              className={styles.controlButton}
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause showreel" : "Play showreel"}
            >
              {isPlaying ? "❚❚" : "▶"}
            </button>
            <button
              type="button"
              className={styles.controlButton}
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute showreel" : "Mute showreel"}
            >
              {isMuted ? "🔇" : "🔊"}
            </button>
            <input
              type="range"
              className={styles.progress}
              min={0}
              max={100}
              step={0.1}
              value={progress}
              onChange={handleSeek}
              aria-label="Seek showreel"
            />
            <span className={styles.time} aria-hidden="true">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>
        )}
      </dialog>
    </>
  );
}
