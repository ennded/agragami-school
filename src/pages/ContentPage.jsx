import { Link, useLocation, useParams } from "react-router-dom";
import PageLayout from "../components/PageLayout.jsx";
import Section from "../components/Section.jsx";
import { findGroup } from "../data/pages.js";
import { useContent } from "../content.jsx";

export default function ContentPage() {
  const { pages } = useContent();
  const { slug } = useParams();
  const { pathname } = useLocation();
  const page = slug ? pages[slug] : null;

  if (!page) {
    return (
      <PageLayout light="Page" bold="not found">
        <p>This page does not exist.</p>
        <p>
          <Link to="/" className="btn btn--small">
            Go to home page
          </Link>
        </p>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      light={page.light}
      bold={page.bold}
      group={findGroup(pathname)}
      photos={page.photos}
    >
      {page.sections.length === 0 ? (
        <div className="todo-box">
          <strong>Content not added yet.</strong>
          <p>
            Add the text for this page in <code>src/data/pages.js</code> under{" "}
            <code>"{slug}"</code>.
          </p>
        </div>
      ) : (
        page.sections.map((s, i) => <Section key={i} section={s} />)
      )}
    </PageLayout>
  );
}
