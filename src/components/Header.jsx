import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useContent } from "../content.jsx";

export default function Header() {
  const { school, nav } = useContent();
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openItem, setOpenItem] = useState(null); // used on mobile only
  // Tries the local logo first, then the old site, then a placeholder.
  const [logoState, setLogoState] = useState("local");

  // Close the mobile menu whenever the page changes.
  useEffect(() => {
    setMenuOpen(false);
    setOpenItem(null);
  }, [pathname]);

  return (
    <>
      <div className="topbar">
        <div className="container topbar__inner">
          <p>
            Call us on:{" "}
            {school.phones.map((p, i) => (
              <span key={p}>
                <a href={`tel:${p}`}>{p}</a>
                {i < school.phones.length - 1 ? ", " : ""}
              </span>
            ))}
            <span className="topbar__sep">|</span>
            <a href={`mailto:${school.email}`}>{school.email}</a>
          </p>
          <p className="topbar__note">{school.affiliation}</p>
        </div>
      </div>

      <header className="header">
        <div className="container header__inner">
          <Link to="/" className="brand">
            {logoState === "none" ? (
              <span className="brand__logo brand__logo--placeholder">Logo</span>
            ) : (
              <img
                src={logoState === "local" ? school.logo : school.logoRemote}
                alt={`${school.name} logo`}
                className="brand__logo"
                onError={() => setLogoState(logoState === "local" ? "remote" : "none")}
              />
            )}
            <span className="brand__text">
              <strong className="brand__name">{school.name}</strong>
              <small className="brand__tag">{school.place}</small>
            </span>
          </Link>

          <button
            className="menu-btn"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>

          <nav className={`nav ${menuOpen ? "nav--open" : ""}`}>
            <ul>
              {nav.map((item, i) => {
                const groupActive =
                  item.children && item.children.some((c) => c.path === pathname);
                return (
                  <li
                    key={item.label}
                    className={`nav__item ${item.children ? "has-children" : ""} ${
                      openItem === i ? "is-open" : ""
                    }`}
                  >
                    {item.children ? (
                      <>
                        <button
                          className={`nav__link ${groupActive ? "is-active" : ""}`}
                          aria-expanded={openItem === i}
                          onClick={() => setOpenItem(openItem === i ? null : i)}
                        >
                          {item.label}
                          <svg viewBox="0 0 10 6" className="nav__caret" aria-hidden="true">
                            <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" />
                          </svg>
                        </button>
                        <ul className="dropdown">
                          {item.children.map((c) => (
                            <li key={c.label}>
                              <NavLink to={c.path}>{c.label}</NavLink>
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : (
                      <NavLink
                        to={item.path}
                        end
                        className={({ isActive }) => `nav__link ${isActive ? "is-active" : ""}`}
                      >
                        {item.label}
                      </NavLink>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}
