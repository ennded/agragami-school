import { useContent } from "../content.jsx";

export default function PageBanner({ light, bold }) {
  const { school } = useContent();
  return (
    <section className="banner">
      <div className="container banner__inner">
        <h1 className="banner__title">
          {light} <strong>{bold}</strong>
        </h1>
        <p className="banner__sub">
          {school.name}, {school.place}
        </p>
      </div>
    </section>
  );
}
