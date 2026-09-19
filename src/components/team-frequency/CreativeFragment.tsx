"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import styles from "./CreativeFragment.module.css";
import { useInView } from "@/lib/useInView";
import type { FrequencyAsset } from "@/data/team-frequency";

export function CreativeFragment({
  asset,
  className,
  gravityRef,
  sizes = "(min-width: 1024px) 22vw, 40vw",
  priority = false,
}: {
  asset: FrequencyAsset;
  className?: string;
  gravityRef?: (node: HTMLDivElement | null) => void;
  sizes?: string;
  priority?: boolean;
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.1);

  const setRefs = (node: HTMLDivElement | null) => {
    ref.current = node;
    gravityRef?.(node);
  };

  return (
    <div
      ref={setRefs}
      className={[styles.fragment, inView ? styles.isVisible : "", className].filter(Boolean).join(" ")}
      style={{ "--rotate": `${asset.rotate ?? 0}deg` } as CSSProperties}
      aria-hidden={asset.decorative ? "true" : undefined}
    >
      <Image
        src={asset.src}
        width={asset.width}
        height={asset.height}
        alt={asset.decorative ? "" : asset.alt}
        aria-hidden={asset.decorative ? "true" : undefined}
        className={styles.image}
        sizes={sizes}
        priority={priority}
      />
    </div>
  );
}
