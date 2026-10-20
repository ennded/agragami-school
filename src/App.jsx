import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import ContentPage from "./pages/ContentPage.jsx";
import Gallery from "./pages/Gallery.jsx";
import Contact from "./pages/Contact.jsx";
import { useContent } from "./content.jsx";

const AdminApp = lazy(() => import("./admin/AdminApp.jsx"));

function ScrollToTop() {
  const { pathname } = useLocation();
  const { pages } = useContent();
  useEffect(() => {
    window.scrollTo(0, 0);
    const slug = pathname.replace(/^\//, "");
    const page = pages[slug];
    const suffix = " — Agragami Convent School";
    if (pathname === "/") document.title = "Agragami Convent School, Mhasala, Wardha";
    else if (pathname === "/gallery") document.title = "Gallery" + suffix;
    else if (pathname === "/contact-us") document.title = "Contact us" + suffix;
    else if (page) document.title = [page.light, page.bold].filter(Boolean).join(" ") + suffix;
    else document.title = "Agragami Convent School, Mhasala, Wardha";
  }, [pathname, pages]);
  return null;
}

export default function App() {
  const { pathname } = useLocation();

  if (pathname.startsWith("/admin")) {
    return (
      <Suspense fallback={null}>
        <AdminApp />
      </Suspense>
    );
  }

  return (
    <>
      <ScrollToTop />
      {import.meta.env.VITE_PREVIEW === "1" && (
        <p className="preview-note">Design preview. This is not the live school website.</p>
      )}
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact-us" element={<Contact />} />
          {/* Every other page is driven by src/data/pages.js */}
          <Route path="/:slug" element={<ContentPage />} />
          <Route path="*" element={<ContentPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
