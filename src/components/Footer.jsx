import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SocialIcon from "./SocialIcon.jsx";
import { useContent } from "../content.jsx";

export default function Footer() {
  const { school, notices, downloads, socialLinks, footerLinks } = useContent();
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <footer className="footer">
      <div className="container">
        <span className="footer__tab script">Get in touch</span>

        <div className="footer__grid">
          <div>
            <h3>Contact us</h3>
            <p className="footer__label">Address</p>
            <p>
              {school.name}, {school.place}
            </p>
            <p className="footer__label">Phone no</p>
            {school.phones.map((p) => (
              <p key={p}>
                <a href={`tel:${p}`}>{p}</a>
              </p>
            ))}
            <p className="footer__label">Email-id</p>
            <p>
              <a href={`mailto:${school.email}`}>{school.email}</a>
            </p>
            {socialLinks && socialLinks.length > 0 && (
              <div className="footer__social">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    className="footer__social-link"
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    title={s.label}
                  >
                    <SocialIcon label={s.label} href={s.href} />
                  </a>
                ))}
              </div>
            )}
          </div>

          <div>
            <h3>Notices</h3>
            <ul>
              {notices.map((n) => (
                <li key={n.label}>
                  <a href={n.href || "#"}>{n.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3>Downloads</h3>
            <ul>
              {downloads.map((d) => (
                <li key={d.label}>
                  <a href={d.href || "#"}>{d.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {footerLinks && footerLinks.length > 0 && (
            <div>
              <h3>Quick links</h3>
              <ul>
                {footerLinks.map((l) => (
                  <li key={l.label}>
                    <Link to={l.path}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>{school.copyright}</p>
          <p>Designed &amp; developed by <strong>Ripen Strategy Pvt. Ltd.</strong></p>
        </div>
      </div>

      <button
        className={`to-top ${shown ? "to-top--visible" : ""}`}
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <svg viewBox="0 0 12 8" aria-hidden="true">
          <path d="M1 7l5-5 5 5" fill="none" stroke="currentColor" strokeWidth="2.5" />
        </svg>
      </button>
    </footer>
  );
}
