import { useContent } from "../content.jsx";

export default function PageBanner({ light, bold, photos }) {
  const { school } = useContent();
  const pics = (photos || []).filter(Boolean).slice(0, 2);
  return (
    <section className="banner">
      <div className="container banner__inner">
        <div className="banner__text">
          <h1 className="banner__title">
            {light} <strong>{bold}</strong>
          </h1>
          <p className="banner__sub">
            {school.name}, {school.place}
          </p>
        </div>

        {pics.length > 0 && (
          <div className="banner__photos">
            {pics.map((src, i) => (
              <img key={src} src={src} alt="" className={`banner__photo banner__photo--${i === 0 ? "a" : "b"}`} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
