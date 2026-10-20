import { useEffect, useState } from "react";
import { useContent } from "../content.jsx";

export default function Testimonials() {
  const { testimonials } = useContent();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (testimonials.length < 2) return;
    const id = setInterval(
      () => setActive((i) => (i + 1) % testimonials.length),
      5000
    );
    return () => clearInterval(id);
  }, [testimonials.length]);

  if (!testimonials.length) return null;
  const t = testimonials[active];

  return (
    <section className="voices">
      <div className="container voices__slide">
        <h2 className="section-title voices__heading">
          From the <strong>visitor's book</strong>
        </h2>

        <div className="voices__card">
          <blockquote className="quote quote--main">
            <p>{t.text}</p>
          </blockquote>

          <div className="quote__author">
            {t.image && <img src={t.image} alt={t.name} />}
            <div>
              <strong>{t.name}</strong>
              <span>visitor</span>
            </div>
          </div>
        </div>

        <div className="dots">
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={i === active ? "is-active" : ""}
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={() => setActive(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
