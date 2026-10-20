import { useEffect, useState } from "react";
import PageBanner from "../components/PageBanner.jsx";
import { useContent } from "../content.jsx";

export default function Gallery() {
  const { galleryCategories, galleryItems } = useContent();
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState(null); // index of open photo

  const items =
    filter === "All" ? galleryItems : galleryItems.filter((g) => g.category === filter);

  // Close on Escape, navigate with arrow keys
  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((i) => (i + 1) % items.length);
      if (e.key === "ArrowLeft") setLightbox((i) => (i - 1 + items.length) % items.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, items.length]);

  return (
    <>
      <PageBanner light="" bold="Gallery" />
      <div className="container gallery">
        <div className="tabs gallery__tabs">
          {["All", ...galleryCategories].map((c) => (
            <button
              key={c}
              className={`tabs__tab ${filter === c ? "is-active" : ""}`}
              onClick={() => setFilter(c)}
            >
              {c}
            </button>
          ))}
        </div>

        {items.length === 0 ? (
          <p className="gallery__empty">No photos in this category yet.</p>
        ) : (
          <ul className="gallery__grid">
            {items.map((g, i) => (
              <li
                key={i}
                className="gallery__item"
                onClick={() => g.image && setLightbox(i)}
                style={{ cursor: g.image ? "zoom-in" : "default" }}
              >
                <div className="gallery__thumb">
                  {g.image ? (
                    <img src={g.image} alt={g.title} loading="lazy" />
                  ) : (
                    <div className="gallery__placeholder">Photo</div>
                  )}
                  {g.image && <span className="gallery__zoom-hint">&#x2922;</span>}
                </div>
                <p>
                  <strong>{g.title}</strong>
                  <span>{g.category}</span>
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Lightbox */}
      {lightbox !== null && items[lightbox]?.image && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <button className="lightbox__close" aria-label="Close" onClick={() => setLightbox(null)}>&#x2715;</button>
          <button
            className="lightbox__prev"
            aria-label="Previous"
            onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + items.length) % items.length); }}
          >&#8249;</button>
          <img
            src={items[lightbox].image}
            alt={items[lightbox].title}
            onClick={(e) => e.stopPropagation()}
          />
          <p className="lightbox__caption">{items[lightbox].title}</p>
          <button
            className="lightbox__next"
            aria-label="Next"
            onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % items.length); }}
          >&#8250;</button>
        </div>
      )}
    </>
  );
}
