import { useContent } from "../content.jsx";

export default function BasicDetails() {
  const { basicDetails } = useContent();
  return (
    <section className="details">
      <div className="container">
        <h2 className="section-title">
          General <strong>information</strong>
        </h2>
        <ul className="details__grid">
          {basicDetails.map((d) => (
            <li key={d.label} className="details__item">
              <span className="details__icon" aria-hidden="true">
                <svg viewBox="0 0 16 16">
                  <path d="M3 8.5l3.2 3L13 4.5" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
              </span>
              <div>
                <h3>{d.label}</h3>
                <p>{d.value}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
