import { useState } from "react";
import { useContent } from "../content.jsx";

export default function Achievements() {
  const { achievementTabs, infoAccordion } = useContent();
  const [tab, setTab] = useState(0);
  const [open, setOpen] = useState(0);
  const current = achievementTabs[tab] || achievementTabs[0];
  if (!current) return null;

  return (
    <section className="container">
      <div className="panel">
        <div className="panel__head">Agragamians' achievements</div>
        <div className="panel__body">
          <div className="tabs" role="tablist">
            {achievementTabs.map((t, i) => (
              <button
                key={t.label}
                role="tab"
                aria-selected={i === tab}
                className={`tabs__tab ${i === tab ? "is-active" : ""}`}
                onClick={() => setTab(i)}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="tabs__content">
            <div>
              <h3 className="panel__title">{current.heading}</h3>
              <ul className="stats">
                {(current.items || []).map((it, i) => (
                  <li key={it.label} className="stat">
                    <div className={`stat__ring stat__ring--${i % 3}`}>
                      <div className="stat__circle">
                        <strong>{it.number}</strong>
                        <span>{it.label}</span>
                      </div>
                    </div>
                    <div className="stat__card">
                      <h4>
                        {it.number} {(it.label || "").toLowerCase()}
                      </h4>
                      <p>Competitive examinations, 2015 to 2018.</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="panel__title">Good to know</h3>
              <div className="accordion">
                {infoAccordion.map((a, i) => (
                  <div key={a.title} className={`accordion__item ${open === i ? "is-open" : ""}`}>
                    <button
                      aria-expanded={open === i}
                      onClick={() => setOpen(open === i ? null : i)}
                    >
                      <span className="accordion__plus">{open === i ? "−" : "+"}</span>
                      {a.title}
                      <span className="accordion__arrow" aria-hidden="true" />
                    </button>
                    {open === i && <p>{a.body}</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
