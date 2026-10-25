import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useContent } from "../content.jsx";

// ---- Chalk drawings ----
// Each drawing is a list of lines. They are drawn one after another, in order,
// so keep a drawing to 6 lines or fewer (the timing is in styles.css).
// "thin" lines are for small details.
const CLOUD =
  "M60,120 a40,40 0 0 1 20,-70 a50,45 0 0 1 90,-25 a45,40 0 0 1 80,5 a40,38 0 0 1 60,50 a35,35 0 0 1 -20,65 a45,35 0 0 1 -80,15 a50,35 0 0 1 -90,0 a40,35 0 0 1 -60,-40 z";

const drawings = {
  // empty cloud, the slide's "cloudText" is written inside it
  cloud: { viewBox: "10 -20 340 220", lines: [{ d: CLOUD }] },

  // thought cloud with a light bulb
  idea: {
    viewBox: "10 -20 440 220",
    lines: [
      { d: CLOUD },
      { d: "M170,112 c-22,-14 -22,-52 14,-54 c36,2 36,40 14,54 v12 h-28 z M172,132 h24 M175,140 h18", thin: true },
      { d: "M184,44 v-12 M150,58 l-10,-8 M218,58 l10,-8 M138,90 h-13 M230,90 h13", thin: true },
      { d: "M345,150 a20,14 0 1 0 40,0 a20,14 0 1 0 -40,0" },
      { d: "M394,172 a11,8 0 1 0 22,0 a11,8 0 1 0 -22,0" },
      { d: "M424,188 a6,4.5 0 1 0 12,0 a6,4.5 0 1 0 -12,0" },
    ],
  },

  // medal on a ribbon with a star
  medal: {
    viewBox: "40 0 220 215",
    lines: [
      { d: "M105,8 L140,95 M135,8 L152,50 M195,8 L160,95 M165,8 L148,50" },
      { d: "M95,145 a55,55 0 1 0 110,0 a55,55 0 1 0 -110,0" },
      { d: "M108,145 a42,42 0 1 0 84,0 a42,42 0 1 0 -84,0", thin: true },
      { d: "M150,117 L156.5,136.1 L176.6,136.3 L160.5,148.4 L166.5,167.7 L150,156 L133.5,167.7 L139.5,148.4 L123.4,136.3 L143.5,136.1 Z", thin: true },
      { d: "M225,110 l14,-8 M228,145 h16 M225,180 l14,8", thin: true },
      { d: "M75,110 l-14,-8 M72,145 h-16 M75,180 l-14,8", thin: true },
    ],
  },

  // school building with a flag
  school: {
    viewBox: "5 -5 290 215",
    lines: [
      { d: "M40,200 V95 H260 V200" },
      { d: "M25,95 L150,30 L275,95" },
      { d: "M130,200 V150 a20,20 0 0 1 40,0 V200" },
      { d: "M65,120 h35 v30 h-35 z M200,120 h35 v30 h-35 z", thin: true },
      { d: "M150,30 V2 l28,9 l-28,9", thin: true },
      { d: "M10,200 H290" },
    ],
  },

  // open book
  book: {
    viewBox: "20 5 260 195",
    lines: [
      { d: "M150,60 C120,40 70,40 30,55 V185 C70,170 120,170 150,190" },
      { d: "M150,60 C180,40 230,40 270,55 V185 C230,170 180,170 150,190" },
      { d: "M150,60 V190", thin: true },
      { d: "M50,82 C80,72 110,72 132,82 M50,107 C80,97 110,97 132,107 M50,132 C80,122 110,122 132,132", thin: true },
      { d: "M168,82 C190,72 220,72 250,82 M168,107 C190,97 220,97 250,107 M168,132 C190,122 220,122 250,132", thin: true },
      { d: "M150,34 v-18 M122,38 l-10,-14 M178,38 l10,-14", thin: true },
    ],
  },
};

function ChalkArt({ name }) {
  const art = drawings[name] || drawings.cloud;
  return (
    <svg className="chalk-art" viewBox={art.viewBox} aria-hidden="true">
      {art.lines.map((l, i) => (
        <path
          key={i}
          pathLength="1"
          className={`chalk-line ${l.thin ? "chalk-line--thin" : ""}`}
          d={l.d}
        />
      ))}
    </svg>
  );
}

export default function Hero() {
  const { heroSlides, school } = useContent();
  const [active, setActive] = useState(0);
  const count = heroSlides.length;
  const go = (n) => setActive((n + count) % count);

  useEffect(() => {
    // 9 seconds, long enough for the chalk drawing to finish
    const id = setInterval(() => setActive((a) => (a + 1) % count), 9000);
    return () => clearInterval(id);
  }, [count, active]);

  if (count === 0) return null;

  return (
    <section className="hero">
      {/* shared rough-chalk filter */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <filter id="chalk" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="2" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="3" />
        </filter>
      </svg>

      <div className="hero__slides">
        {heroSlides.map((s, i) => {
          const text = (
            <div className="hero__text">
              {s.kicker && <p className="hero__kicker">{s.kicker}</p>}
              {i === 0 ? (
                <h1 className="hero__title">{s.title}</h1>
              ) : (
                <h2 className="hero__title">{s.title}</h2>
              )}
              <p className="hero__sub">{s.sub}</p>
              {s.link && (
                <Link to={s.link} className="hero__more" tabIndex={i === active ? 0 : -1}>
                  Read more
                </Link>
              )}
            </div>
          );

          // A slide with a photo shows it full-width instead of the chalk drawing.
          if (s.image) {
            return (
              <div
                key={i}
                className={`hero__slide hero__slide--photo ${i === active ? "is-active" : ""}`}
                style={{ backgroundImage: `url(${s.image})` }}
                aria-hidden={i !== active}
              >
                <div className="hero__photo-overlay" />
                <div className="container hero__slide-inner hero__slide-inner--photo">{text}</div>
              </div>
            );
          }

          const chalk = (
            <div className="hero__chalk">
              <div className={`hero__art hero__art--${s.art}`}>
                <ChalkArt name={s.art} />
                {s.cloudText && (
                  <p className="script hero__cloud-text">
                    {s.cloudText.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </p>
                )}
              </div>
              {s.chalkText && (
                <p className="script hero__chalk-text">
                  {(s.chalkText || []).map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </p>
              )}
            </div>
          );
          return (
            <div
              key={i}
              className={`hero__slide hero__slide--art-${s.artSide === "left" ? "left" : "right"} ${i === active ? "is-active" : ""}`}
              aria-hidden={i !== active}
            >
              <div className="container hero__slide-inner">
                {s.artSide === "left" ? (
                  <>
                    {chalk}
                    {text}
                  </>
                ) : (
                  <>
                    {text}
                    {chalk}
                  </>
                )}
              </div>
            </div>
          );
        })}

        <button className="hero__arrow hero__arrow--prev" aria-label="Previous slide" onClick={() => go(active - 1)}>
          <svg viewBox="0 0 8 12" aria-hidden="true">
            <path d="M6.5 1L1.5 6l5 5" fill="none" stroke="currentColor" strokeWidth="2.2" />
          </svg>
        </button>
        <button className="hero__arrow hero__arrow--next" aria-label="Next slide" onClick={() => go(active + 1)}>
          <svg viewBox="0 0 8 12" aria-hidden="true">
            <path d="M1.5 1l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="2.2" />
          </svg>
        </button>

        <div className="hero__dots">
          {heroSlides.map((s, i) => (
            <button
              key={s.title}
              className={i === active ? "is-active" : ""}
              aria-label={`Slide ${i + 1}`}
              onClick={() => setActive(i)}
            />
          ))}
        </div>
      </div>

      <div className="hero__cta">
        <div className="container hero__cta-inner">
          <div>
            <p className="script hero__cta-script">{school.motto}</p>
            <p className="hero__cta-text">
              {school.name}, {school.place}. {school.affiliation}.
            </p>
          </div>
          <Link to="/about-agragami" className="btn">
            Click here to read more
          </Link>
        </div>
      </div>
    </section>
  );
}
