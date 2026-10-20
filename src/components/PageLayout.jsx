import { NavLink } from "react-router-dom";
import PageBanner from "./PageBanner.jsx";
import { useContent } from "../content.jsx";

// Banner + main content + side menu. Used by every inner page.
export default function PageLayout({ light, bold, group, photos, children }) {
  const { school } = useContent();
  return (
    <>
      <PageBanner light={light} bold={bold} group={group} photos={photos} />
      <div className="container page">
        <div className="page__main">{children}</div>

        <aside className="page__side">
          {group && (
            <div className="side-box">
              <h2>{group.label}</h2>
              <ul>
                {group.children.map((c) => (
                  <li key={c.path}>
                    <NavLink to={c.path}>{c.label}</NavLink>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="side-box side-box--contact">
            <h2>Get in touch</h2>
            {school.phones.map((p) => (
              <p key={p}>
                <a href={`tel:${p}`}>{p}</a>
              </p>
            ))}
            <p>
              <a href={`mailto:${school.email}`}>{school.email}</a>
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
