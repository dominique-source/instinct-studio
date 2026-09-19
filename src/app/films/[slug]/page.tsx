import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "./page.module.css";
import { FilmPlayer } from "@/components/FilmPlayer";
import { primeVideos, getPrimeVideoBySlug, getNextPrimeVideo } from "@/data/prime-videos";

export function generateStaticParams() {
  return primeVideos.map((video) => ({ slug: video.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const video = getPrimeVideoBySlug(slug);

  if (!video) {
    return { title: "Film not found" };
  }

  const description = `Watch ${video.title} on Instinct Studio.`;

  return {
    title: video.title,
    description,
    openGraph: {
      title: video.title,
      description,
      images: [{ url: video.poster }],
    },
  };
}

export default async function FilmPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const video = getPrimeVideoBySlug(slug);

  if (!video) {
    notFound();
  }

  const nextVideo = getNextPrimeVideo(video);

  return (
    <article className="section">
      <div className="container">
        <div className={styles.playerFrame}>
          <FilmPlayer
            youtubeId={video.youtubeId}
            poster={video.poster}
            title={video.title}
          />
        </div>

        <header className={styles.header}>
          <p className="eyebrow">Prime Video</p>
          <h1 className={`display display--lg ${styles.title}`}>{video.title}</h1>
        </header>
      </div>

      {nextVideo && (
        <div className={styles.nextSection}>
          <div className="container">
            <Link href={`/films/${nextVideo.slug}`} className={styles.nextLink}>
              <div>
                <p className="eyebrow">Next project</p>
                <p className={`display display--md ${styles.nextTitle}`}>
                  {nextVideo.title}
                </p>
              </div>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      )}
    </article>
  );
}
