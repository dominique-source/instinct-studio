import type { Metadata } from "next";
import styles from "./page.module.css";
import { FilmCard } from "@/components/FilmCard";
import { primeVideos } from "@/data/prime-videos";

export const metadata: Metadata = {
  title: "Films",
  description:
    "Prime Videos from Instinct Studio — six selected films centred on athletes.",
};

export default function FilmsPage() {
  return (
    <div className="section">
      <div className="container">
        <div className={styles.header}>
          <p className="eyebrow">Prime Videos</p>
          <h1 className="display display--md">Six selected films.</h1>
        </div>

        <div className={styles.grid}>
          {primeVideos.map((video, index) => (
            <FilmCard
              key={video.youtubeId}
              video={video}
              priority={index === 0}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
