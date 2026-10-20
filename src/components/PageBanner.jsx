import { Link } from "react-router-dom";
import { useContent } from "../content.jsx";

export default function PageBanner({ light, bold, group }) {
  const { school } = useContent();
  return (
    <section className="banner">
      <div className="container banner__inner">
        <p className="banner__crumbs">
          <Link to="/">Home</Link>
          {group && <span> / {group.label}</span>}
          <span> / {light} {bold}</span>
        </p>
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
