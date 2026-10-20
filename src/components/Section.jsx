import ImageGrid from "./ImageGrid.jsx";

// Renders one section from src/data/pages.js.
export default function Section({ section }) {
  const [light, bold] = (section.heading || "").split("|");

  return (
    <section className="block">
      {section.heading && (
        <h2 className="section-title">
          {bold ? (
            <>
              {light} <strong>{bold}</strong>
            </>
          ) : (
            <strong>{light}</strong>
          )}
        </h2>
      )}

      {section.sub && <h3 className="block__sub">{section.sub}</h3>}

      {section.image && <img className="block__image" src={section.image} alt="" />}

      {section.text && section.text.map((t, i) => <p key={i}>{t}</p>)}

      {section.list && (
        <ul className="bullets">
          {section.list.map((l, i) => (
            <li key={i}>{l}</li>
          ))}
        </ul>
      )}

      {section.facts && (
        <dl className="facts">
          {section.facts.map((f) => (
            <div key={f.label}>
              <dt>{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>
      )}

      {section.images && <ImageGrid images={section.images} />}

      {section.links && (
        <ul className="doc-links">
          {section.links.map((l) => (
            <li key={l.label}>
              {l.href && l.href !== "#" ? (
                <a href={l.href} target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 16 16" aria-hidden="true">
                    <path d="M8 2v8m0 0l-3-3m3 3l3-3M3 13h10" fill="none" stroke="currentColor" strokeWidth="1.6" />
                  </svg>
                  {l.label}
                </a>
              ) : (
                <span className="doc-link--unavailable">
                  <svg viewBox="0 0 16 16" aria-hidden="true">
                    <path d="M8 2v8m0 0l-3-3m3 3l3-3M3 13h10" fill="none" stroke="currentColor" strokeWidth="1.6" />
                  </svg>
                  {l.label}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}

      {section.table && (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                {section.table.head.map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.table.rows.map((r, i) => (
                <tr key={i}>
                  {r.map((c, j) => (
                    <td key={j}>{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
