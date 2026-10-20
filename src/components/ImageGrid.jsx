import { useEffect, useState } from "react";

export default function ImageGrid({ images }) {
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((i) => (i + 1) % images.length);
      if (e.key === "ArrowLeft") setLightbox((i) => (i - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, images.length]);

  return (
    <>
      <div className="section-img-grid">
        {images.map((src, i) => (
          <div
            key={i}
            className="section-img-grid__thumb"
            onClick={() => setLightbox(i)}
          >
            <img src={src} alt="" loading="lazy" />
            <span className="gallery__zoom-hint">&#x2922;</span>
          </div>
        ))}
      </div>

      {lightbox !== null && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <button className="lightbox__close" onClick={() => setLightbox(null)}>&#x2715;</button>
          <button
            className="lightbox__prev"
            onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + images.length) % images.length); }}
          >&#8249;</button>
          <img
            src={images[lightbox]}
            alt=""
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="lightbox__next"
            onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % images.length); }}
          >&#8250;</button>
        </div>
      )}
    </>
  );
}
