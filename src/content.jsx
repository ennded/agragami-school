// One place that gives every component its content.
//
// The website starts with the built-in text from src/data/site.js and
// src/data/pages.js. Then it asks the server for anything the admin has
// changed and uses that instead. If the server cannot be reached, the
// built-in text stays, so the site never shows up empty.
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import * as site from "./data/site.js";
import { pages, galleryCategories, galleryItems } from "./data/pages.js";

export const API_URL = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");
const IS_PREVIEW = import.meta.env.VITE_PREVIEW === "1";
const CACHE_KEY = "agragami-content";

export const defaults = {
  school: site.school,
  nav: site.nav,
  heroSlides: site.heroSlides,
  principalMessage: site.principalMessage,
  notices: site.notices,
  downloads: site.downloads,
  achievementsIntro: site.achievementsIntro,
  achievementTabs: site.achievementTabs,
  rotatingWins: site.rotatingWins,
  basicDetails: site.basicDetails,
  infoAccordion: site.infoAccordion,
  testimonials: site.testimonials,
  galleryCategories,
  galleryItems,
  socialLinks: site.socialLinks,
  footerLinks: site.footerLinks,
  pages,
};

// Lays the admin's saved changes over the built-in content.
// A saved key like "page:faculty" replaces that one page.
export function mergeContent(saved = {}) {
  const out = { ...defaults, pages: { ...defaults.pages } };
  for (const [key, data] of Object.entries(saved)) {
    if (key.startsWith("page:")) {
      const slug = key.slice(5);
      if (data && typeof data === "object") {
        out.pages[slug] = { ...data, sections: data.sections || [] };
      }
    } else if (key === "school") {
      out.school = { ...defaults.school, ...data };
    } else if (key === "principalMessage") {
      out.principalMessage = { ...defaults.principalMessage, ...data };
    } else if (key in defaults && key !== "pages") {
      out[key] = data;
    }
  }
  return out;
}

function readCache() {
  try {
    return JSON.parse(localStorage.getItem(CACHE_KEY)) || {};
  } catch {
    return {};
  }
}

const ContentContext = createContext({ ...defaults, saved: {}, reload: () => {} });

export function ContentProvider({ children }) {
  // The last saved changes are remembered in the browser, so returning
  // visitors see them straight away instead of the built-in text first.
  const [saved, setSaved] = useState(IS_PREVIEW ? {} : readCache);

  const reload = useCallback(async () => {
    if (IS_PREVIEW) return;
    try {
      const res = await fetch(`${API_URL}/api/content`);
      if (!res.ok) return;
      const { content } = await res.json();
      setSaved(content || {});
      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify(content || {}));
      } catch {
        // storage can be blocked, the site works without it
      }
    } catch {
      // server not reachable: keep showing what we have
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  const value = useMemo(() => ({ ...mergeContent(saved), saved, reload }), [saved, reload]);
  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent() {
  return useContext(ContentContext);
}
