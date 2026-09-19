"use client";

import { useEffect, useRef } from "react";
import styles from "./VimeoModal.module.css";

export function VimeoModal({
  vimeoId,
  title,
  onClose,
}: {
  vimeoId: string;
  title: string;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<Element | null>(null);

  useEffect(() => {
    triggerRef.current = document.activeElement;
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      if (triggerRef.current instanceof HTMLElement) {
        triggerRef.current.focus();
      }
    };
  }, [onClose]);

  return (
    <div
      className={styles.overlay}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <button
          ref={closeRef}
          type="button"
          className={styles.close}
          onClick={onClose}
        >
          Close ✕
        </button>
        <div className={styles.frame}>
          <iframe
            src={`https://player.vimeo.com/video/${vimeoId}?title=0&byline=0&portrait=0`}
            title={title}
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
