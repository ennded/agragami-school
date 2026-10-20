// What the admin can edit, and with which kind of form field.
//
// Field types:
//   text, number, textarea   plain inputs
//   lines                    one item per line (saved as a list)
//   select                   a dropdown, needs "options"
//   file                     a link, with an "Upload" button for a PDF or photo
//   list                     repeatable group of fields, needs "fields"
//   table                    a grid with column titles and rows
//
// To make something new editable: add it here, and make sure the page reads
// it through useContent() (see src/content.jsx).
import { nav } from "../data/site.js";
import { pages, galleryCategories } from "../data/pages.js";

const linkList = (what) => ({
  type: "list",
  itemName: what,
  fields: [
    { name: "label", label: "Title", type: "text" },
    { name: "href", label: "Link or file", type: "file", help: "Upload a PDF, or paste a link." },
  ],
});

const pageFields = [
  { name: "light", label: "Page title, thin part", type: "text" },
  { name: "bold", label: "Page title, bold part", type: "text" },
  {
    name: "photos",
    label: "Photos for the two frames at the top (one link per line)",
    type: "photos",
  },
  {
    name: "sections",
    label: "Sections",
    type: "list",
    itemName: "section",
    help: "A page is made of sections. Fill only the parts a section needs.",
    fields: [
      { name: "heading", label: "Heading", type: "text", help: 'Use | to split thin and bold text, for example "Our|faculty".' },
      { name: "sub", label: "Small coloured sub heading", type: "text" },
      { name: "image", label: "Photo", type: "file" },
      { name: "text", label: "Paragraphs (one per line)", type: "lines", rows: 6 },
      { name: "list", label: "Bullet points (one per line)", type: "lines", rows: 4 },
      {
        name: "facts",
        label: "Label and value pairs",
        type: "list",
        itemName: "pair",
        fields: [
          { name: "label", label: "Label", type: "text" },
          { name: "value", label: "Value", type: "text" },
        ],
      },
      { name: "table", label: "Table", type: "table" },
      { name: "links", label: "Files and links", ...linkList("file") },
    ],
  },
];

// Menu group for each page, so the page list in the admin follows the site menu.
function pageGroup(slug) {
  const item = nav.find((n) => n.children && n.children.some((c) => c.path === `/${slug}`));
  return item ? item.label : "Other pages";
}

export const editors = [
  {
    group: "Whole site",
    id: "school",
    title: "School details",
    type: "object",
    fields: [
      { name: "name", label: "School name", type: "text" },
      { name: "place", label: "Place", type: "text" },
      { name: "affiliation", label: "Affiliation line", type: "text" },
      { name: "motto", label: "Motto", type: "text" },
      { name: "phones", label: "Phone numbers (one per line)", type: "lines", rows: 3 },
      { name: "email", label: "Email", type: "text" },
      { name: "logo", label: "Logo", type: "file" },
      { name: "copyright", label: "Copyright line in the footer", type: "text" },
      {
        name: "mapEmbed",
        label: "Google Maps embed URL",
        type: "text",
        help: 'In Google Maps, click Share → Embed a map → copy the src="…" value and paste it here.',
      },
    ],
  },
  {
    group: "Whole site",
    id: "nav",
    title: "Navigation menu",
    type: "list",
    itemName: "menu item",
    help: "Each item is either a direct link (fill in the page address) or a dropdown (leave the page address blank and add dropdown links).",
    fields: [
      { name: "label", label: "Label", type: "text" },
      { name: "path", label: "Page address (e.g. /gallery) — leave blank for a dropdown", type: "text" },
      {
        name: "children",
        label: "Dropdown links",
        type: "list",
        itemName: "link",
        fields: [
          { name: "label", label: "Label", type: "text" },
          { name: "path", label: "Page address (e.g. /faculty)", type: "text" },
        ],
      },
    ],
  },
  { group: "Whole site", id: "notices", title: "Notices", ...linkList("notice") },
  { group: "Whole site", id: "downloads", title: "Downloads", ...linkList("download") },
  {
    group: "Whole site",
    id: "socialLinks",
    title: "Social media links",
    type: "list",
    itemName: "link",
    help: "These appear in the footer under the contact details.",
    fields: [
      { name: "label", label: "Platform name (e.g. Facebook)", type: "text" },
      { name: "href", label: "Full URL", type: "text" },
    ],
  },
  {
    group: "Whole site",
    id: "footerLinks",
    title: "Footer quick links",
    type: "list",
    itemName: "link",
    help: "Shown as a 'Quick links' column in the footer.",
    fields: [
      { name: "label", label: "Label", type: "text" },
      { name: "path", label: "Page address (e.g. /gallery)", type: "text" },
    ],
  },

  {
    group: "Home page",
    id: "heroSlides",
    title: "Blackboard slides",
    type: "list",
    itemName: "slide",
    fields: [
      { name: "title", label: "Title", type: "text" },
      { name: "sub", label: "Line under the title", type: "text" },
      { name: "kicker", label: "Small line above the title", type: "text" },
      {
        name: "art",
        label: "Chalk drawing",
        type: "select",
        options: ["idea", "medal", "school", "book", "cloud"],
      },
      { name: "artSide", label: "Drawing side", type: "select", options: ["left", "right"] },
      { name: "chalkText", label: "Chalk writing under the drawing (one line each)", type: "lines", rows: 2 },
      { name: "cloudText", label: "Chalk writing inside the cloud (only for the cloud drawing)", type: "lines", rows: 2 },
      { name: "link", label: '"Read more" page address, for example /curriculum', type: "text" },
    ],
  },
  { group: "Home page", id: "achievementsIntro", title: "Achievements text", type: "textarea", rows: 6 },
  {
    group: "Home page",
    id: "rotatingWins",
    title: "Changing words in the headline",
    type: "lines",
    rows: 6,
    help: 'Shown after "Agragamians have brought home". One per line.',
  },
  {
    group: "Home page",
    id: "achievementTabs",
    title: "Achievement numbers",
    type: "list",
    itemName: "tab",
    fields: [
      { name: "label", label: "Tab name", type: "text" },
      { name: "heading", label: "Heading", type: "text" },
      {
        name: "items",
        label: "Numbers",
        type: "list",
        itemName: "number",
        fields: [
          { name: "number", label: "Number", type: "number" },
          { name: "label", label: "What it counts", type: "text" },
        ],
      },
    ],
  },
  {
    group: "Home page",
    id: "basicDetails",
    title: "General information tiles",
    type: "list",
    itemName: "tile",
    fields: [
      { name: "label", label: "Label", type: "text" },
      { name: "value", label: "Value", type: "text" },
    ],
  },
  {
    group: "Home page",
    id: "infoAccordion",
    title: "Good to know (hours, dress code)",
    type: "list",
    itemName: "item",
    fields: [
      { name: "title", label: "Title", type: "text" },
      { name: "body", label: "Text", type: "textarea", rows: 4 },
    ],
  },
  {
    group: "Home page",
    id: "testimonials",
    title: "Testimonials",
    type: "list",
    itemName: "testimonial",
    fields: [
      { name: "name", label: "Name", type: "text" },
      { name: "text", label: "What they wrote", type: "textarea", rows: 5 },
    ],
  },

  {
    group: "Gallery",
    id: "galleryCategories",
    title: "Gallery categories",
    type: "lines",
    rows: 6,
    help: "One category per line. Photos are sorted into these groups.",
  },
  {
    group: "Gallery",
    id: "galleryItems",
    title: "Gallery photos",
    type: "list",
    itemName: "photo",
    fields: [
      { name: "title", label: "Title", type: "text" },
      { name: "category", label: "Category", type: "select", options: galleryCategories },
      { name: "image", label: "Photo", type: "file" },
    ],
  },

  // one editor per page, in menu order
  ...Object.keys(pages).map((slug) => ({
    group: pageGroup(slug),
    id: `page:${slug}`,
    title: `${pages[slug].light} ${pages[slug].bold}`.trim(),
    type: "object",
    fields: pageFields,
  })),
];
