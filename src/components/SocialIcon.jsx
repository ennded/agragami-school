// Picks an icon for a social link automatically, from its URL (or label as
// a fallback) — the admin just pastes a label and a link, no icon to pick.
function detectPlatform(label, href) {
  const text = `${label || ""} ${href || ""}`.toLowerCase();
  if (text.includes("facebook") || text.includes("fb.com")) return "facebook";
  if (text.includes("instagram")) return "instagram";
  if (text.includes("youtube") || text.includes("youtu.be")) return "youtube";
  if (text.includes("twitter") || text.includes("x.com")) return "twitter";
  if (text.includes("linkedin")) return "linkedin";
  if (text.includes("whatsapp") || text.includes("wa.me")) return "whatsapp";
  if (text.includes("telegram") || text.includes("t.me")) return "telegram";
  if (text.includes("pinterest")) return "pinterest";
  return "link";
}

const icons = {
  facebook: (
    <path d="M13.5 9H15V6.3h-1.8c-2 0-3.2 1.2-3.2 3.3V11H8v2.6h2V21h3v-7.4h2.1l.4-2.6h-2.5v-1c0-.6.2-1 .5-1Z" />
  ),
  instagram: (
    <>
      <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.3" cy="6.7" r="1.1" />
    </>
  ),
  youtube: (
    <>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M10.3 9.3v5.4l4.8-2.7Z" />
    </>
  ),
  twitter: <path d="M5 5l14 14M19 5L5 19" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />,
  linkedin: (
    <>
      <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="4" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="7.6" cy="8" r="1.1" />
      <path d="M7.6 10.8v6.1M11 10.8v6.1M11 13.4c0-1.6 1.1-2.6 2.3-2.6 1.3 0 2.1.9 2.1 2.7v3.4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </>
  ),
  whatsapp: (
    <path
      d="M12 3.2a8.8 8.8 0 0 0-7.6 13.3L3.2 20.8l4.4-1.2A8.8 8.8 0 1 0 12 3.2Zm0 1.8a7 7 0 0 1 5.9 10.7c-.1.2-.1.4 0 .6l.9 2.4-2.5-.9a.6.6 0 0 0-.6 0A7 7 0 1 1 12 5Z"
    />
  ),
  telegram: (
    <path d="M3.5 11.6 19.8 5c.7-.3 1.4.3 1.1 1.1l-2.8 13c-.2.9-.9 1.1-1.5.7l-4-3-2 1.9c-.2.2-.4.3-.7.2l.3-4.2 7.6-6.9c.3-.3-.1-.4-.4-.2L8 12.3l-4.2-1.3c-.9-.3-.9-.9-.3-1.1Z" />
  ),
  pinterest: (
    <path d="M12 3a9 9 0 0 0-3.3 17.4c0-.7-.1-1.9.1-2.7l1.3-5.5s-.3-.7-.3-1.6c0-1.5.9-2.6 1.9-2.6.9 0 1.4.7 1.4 1.5 0 .9-.6 2.3-.9 3.6-.3 1.1.5 1.9 1.6 1.9 1.9 0 3.2-2.4 3.2-5.3 0-2.2-1.5-3.8-4.1-3.8-3 0-4.9 2.3-4.9 4.8 0 .9.3 1.5.7 2 .2.2.2.3.1.5l-.2 1c-.1.3-.3.4-.5.2-1.4-.6-2.1-2.2-2.1-4 0-3 2.5-6.5 7.4-6.5 4 0 6.5 2.8 6.5 5.9 0 4-2.2 7-5.4 7-1.1 0-2.1-.6-2.4-1.2l-.7 2.6c-.2.9-.7 1.9-1.1 2.6A9 9 0 1 0 12 3Z" />
  ),
  link: (
    <path
      d="M9.5 14.5 14.5 9.5M11 7.5l1-1a3 3 0 0 1 4.2 4.2l-1 1M13 16.5l-1 1a3 3 0 0 1-4.2-4.2l1-1"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  ),
};

export default function SocialIcon({ label, href }) {
  const platform = detectPlatform(label, href);
  return (
    <svg className="footer__social-icon" viewBox="0 0 24 24" aria-hidden="true">
      {icons[platform]}
    </svg>
  );
}
