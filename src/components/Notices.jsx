import { useContent } from "../content.jsx";

export default function Notices() {
  const { notices, downloads } = useContent();
  return (
    <section className="band">
      <div className="container">
        <h2 className="band__title">Notices</h2>
        <div className="band__grid">
          <div>
            <p className="band__kicker">Latest from the school</p>
            <h3 className="band__heading">Notice board</h3>
            <hr />
            <ul className="link-list">
              {notices.map((n) => (
                <li key={n.label}>
                  {n.href ? <a href={n.href} target="_blank" rel="noopener noreferrer">{n.label}</a> : <span>{n.label}</span>}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="band__kicker">For parents and students</p>
            <h3 className="band__heading">Downloads</h3>
            <hr />
            <ul className="link-list link-list--two">
              {downloads.map((d) => (
                <li key={d.label}>
                  {d.href ? <a href={d.href} target="_blank" rel="noopener noreferrer">{d.label}</a> : <span>{d.label}</span>}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
