import { Link } from "react-router-dom";
import { useContent } from "../content.jsx";

export default function PrincipalMessage() {
  const { principalMessage } = useContent();
  const { name, designation, photo, message, link } = principalMessage || {};
  const paragraphs = (message || []).filter(Boolean);

  if (!paragraphs.length) return null;

  return (
    <section className="principal">
      <div className="container principal__grid">
        <div className="principal__photo-wrap">
          {photo ? (
            <img className="principal__photo" src={photo} alt={name || "Principal"} />
          ) : (
            <span className="principal__photo principal__photo--placeholder">Photo</span>
          )}
        </div>

        <div className="principal__text">
          <h2 className="section-title">
            A word from the <strong>principal's desk</strong>
          </h2>

          {paragraphs.map((p, i) => (
            <p key={i} className="principal__message">
              {p}
            </p>
          ))}

          <p className="principal__signature">
            — {name || "Principal"}
            {designation && designation !== name ? `, ${designation}` : ""}
          </p>

          {link && (
            <Link to={link} className="principal__link">
              Read the full message
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
