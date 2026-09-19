"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "./FilmFrame.module.css";
import { prefersReducedMotion } from "@/lib/motion";
import type { FilmWallFrame } from "@/data/services";

const directionClass: Record<FilmWallFrame["direction"], string> = {
  left: styles["from-left"],
  right: styles["from-right"],
  up: styles["from-up"],
};

export function FilmFrame({ frame, href }: { frame: FilmWallFrame; href: string }) {
  const frameRef = useRef<HTMLAnchorElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = frameRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const frameNode = frameRef.current;
    const imageNode = imageRef.current;
    if (!frameNode || !imageNode) return;

    let ticking = false;

    const applyParallax = () => {
      ticking = false;
      const rect = frameNode.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const frameCenter = rect.top + rect.height / 2;
      const offset = Math.max(
        -16,
        Math.min(16, (viewportCenter - frameCenter) * 0.06)
      );
      imageNode.style.transform = `translate3d(0, ${offset}px, 0)`;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(applyParallax);
    };

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          applyParallax();
          window.addEventListener("scroll", onScroll, { passive: true });
        } else {
          window.removeEventListener("scroll", onScroll);
        }
      },
      { rootMargin: "20% 0px" }
    );

    visibilityObserver.observe(frameNode);

    return () => {
      visibilityObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <Link
      ref={frameRef}
      href={href}
      className={[
        styles.frame,
        styles[frame.size],
        directionClass[frame.direction],
        isVisible ? styles.isVisible : "",
        frame.connectorBefore ? styles.connectorBefore : "",
        frame.overlap ? styles.overlap : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span className={styles.number}>
        {String(frame.number).padStart(2, "0")}/08
      </span>

      <div ref={imageRef} className={styles.imageLayer}>
        <Image
          src={frame.image}
          alt={frame.imageAlt}
          fill
          sizes="(min-width: 900px) 90vw, 100vw"
          className={styles.image}
        />
      </div>

      <div className={styles.scrim} aria-hidden="true" />
      <div className={styles.grain} aria-hidden="true" />

      <div className={styles.content}>
        <h3 className={styles.title}>{frame.title}</h3>
        <p className={styles.description}>{frame.description}</p>
        <span className={styles.viewWork}>View work</span>
      </div>
    </Link>
  );
}
