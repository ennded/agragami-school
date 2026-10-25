// All text content for the site lives here.
// It is taken from agragamiconventschool.org so the content stays the same.
// Change text here and the page updates everywhere.

export const school = {
  name: "Agragami Convent School",
  place: "Mhasala, Wardha",
  affiliation: "Affiliated to C.B.S.E. Delhi",
  motto: "Live for truth and justice",
  // Save the logo file as public/images/logo.png. Until then the old site URL is used.
  logo: "/images/logo.png",
  logoRemote:
    "http://www.agragamiconventschool.org/wp-content/uploads/2019/03/Logo-agragami-copy-copy-e1552132805268.png",
  phones: ["9370497433", "8275749668"],
  email: "mhasalaagragami@rediffmail.com",
  copyright:
    `© ${new Date().getFullYear()}. All rights reserved with Agragami Convent School, Mhasala, Wardha.`,
  mapEmbed: "https://maps.google.com/maps?q=20.749800,78.635033&z=16&output=embed",
};

// Social media links shown in the footer. Add items like:
//   { label: "Facebook", href: "https://facebook.com/..." }
export const socialLinks = [];

// Quick links shown in the footer alongside Notices and Downloads.
export const footerLinks = [
  { label: "General information", path: "/general-information" },
  { label: "Admission procedure", path: "/admission-procedure" },
  { label: "Gallery", path: "/gallery" },
  { label: "Contact us", path: "/contact-us" },
];

// "path" is ready for when the inner pages are built with a router.
export const nav = [
  { label: "Home", path: "/" },
  {
    label: "About us",
    children: [
      { label: "General information", path: "/general-information" },
      { label: "Class wise student strength", path: "/class-wise-student-strength" },
      { label: "About Agragami", path: "/about-agragami" },
      { label: "Infrastructure", path: "/infrastructure" },
      { label: "Faculty", path: "/faculty" },
      { label: "Curriculum", path: "/curriculum" },
      { label: "Message from the principal", path: "/message-from-the-principal" },
      { label: "Message from the manager", path: "/message-from-the-manager" },
      { label: "School anthem and prayer", path: "/school-anthem-and-prayer" },
    ],
  },
  {
    label: "School policies",
    children: [
      { label: "Admission procedure", path: "/admission-procedure" },
      { label: "Promotion rules", path: "/promotion-rules" },
      { label: "Rules and regulations", path: "/rules-and-regulations" },
    ],
  },
  {
    label: "Committees",
    children: [
      { label: "School cabinet", path: "/school-cabinet" },
      { label: "School managing committee", path: "/school-managing-committee" },
      { label: "Parents' teachers' association", path: "/parents-teachers-association" },
      { label: "Road safety committee", path: "/road-safety-committee" },
      { label: "Grievance redressal mechanism", path: "/grievance-redressal-mechanism" },
      { label: "POSCO", path: "/posco" },
    ],
  },
  {
    label: "Other activities",
    children: [
      { label: "House system", path: "/house-system" },
      { label: "Student activities", path: "/student-activities" },
      { label: "Teachers' training programmes", path: "/teachers-training-programmes" },
    ],
  },
  { label: "Gallery", path: "/gallery" },
  { label: "Careers", path: "/careers" },
  { label: "Contact us", path: "/contact-us" },
  { label: "Sports and games", path: "/sports-and-games" },
];

// Blackboard slides. To add a slide, copy one block and change it.
//   art:       which chalk drawing: "idea", "cloud", "medal", "school" or "book"
//              (the drawings live in src/components/Hero.jsx)
//   artSide:   "left" or "right"
//   cloudText: chalk writing inside the cloud (only for art "cloud")
//   chalkText: chalk writing under the drawing
//   kicker:    small line above the title (optional)
//   link:      page that the "Read more" link opens (optional)
export const heroSlides = [
  {
    art: "idea",
    artSide: "right",
    kicker: "Affiliated to C.B.S.E. Delhi",
    title: "Agragami Convent School",
    sub: "Mhasala, Wardha",
    chalkText: ["Live for truth", "and justice."],
  },
  {
    art: "medal",
    artSide: "left",
    chalkText: ["37 gold, 35 silver,", "36 bronze."],
    kicker: "48 scholarships and 35 cash prizes",
    title: "Agragamians' achievements",
    sub: "Competitive examinations, 2015 to 2018.",
  },
  {
    art: "school",
    artSide: "right",
    chalkText: ["Since 2005."],
    title: "Established in 2005",
    sub: "Run by the Society of Sisters of St. John, Wardha.",
    link: "/general-information",
  },
  {
    art: "book",
    artSide: "left",
    chalkText: ["English medium,", "NCERT syllabi."],
    kicker: "Academic session: April to March",
    title: "Our curriculum",
    sub: "NCERT syllabi, as per the instructions of CBSE.",
    link: "/curriculum",
  },
  {
    art: "cloud",
    artSide: "right",
    cloudText: ["Admissions", "2026-2027"],
    title: "Admission procedure",
    sub: "Class Nursery and Class I, 2026-2027.",
    link: "/admission-procedure",
  },
  // Real school photos. A slide with "image" set shows the photo instead of
  // a chalk drawing — add more of these any time from the admin panel.
  {
    image: "/images/gallery/gallery-5.jpg",
    kicker: "Our campus",
    title: "A place built for learning",
    sub: "Spacious classrooms, play areas and a green, welcoming campus.",
    link: "/infrastructure",
  },
  {
    image: "/images/gallery/gallery-3.jpg",
    kicker: "Celebrating our achievers",
    title: "Proud of every Agragamian",
    sub: "Medals, certificates and milestones our students have earned.",
    link: "/gallery",
  },
  {
    image: "/images/gallery/gallery-2.jpg",
    kicker: "School life",
    title: "Celebrations, together",
    sub: "Festivals and events that bring our school community together.",
    link: "/gallery",
  },
];

// Shown on the home page, above the Notices band.
// "photo" is empty until the admin uploads one — the section still shows with
// just the message until then.
export const principalMessage = {
  name: "Principal",
  designation: "Principal",
  photo: "",
  message: [
    "Welcome to Agragami Convent School. Our aim is to help every child grow not only in academics but also in character, confidence and compassion.",
    "We look forward to working with you and your child through this journey of learning.",
  ],
  link: "/message-from-the-principal",
};

// "href" is the link or uploaded PDF for each item. The admin panel fills it in.
export const notices = [
  { label: "Admission Notice Class Nursery 2026-2027", href: "/files/admission-notice-nursery-2026-27.pdf" },
  { label: "Admission Procedure Class I 2026-2027", href: "" },
  { label: "EPTA Member List 2024-25", href: "/files/epta-members-2024-25.pdf" },
  { label: "Notice on Book, Uniform & Summer Camp", href: "/files/notice-books-uniform-summer-camp.pdf" },
];

export const downloads = [
  { label: "Newsletter 2022-2023", href: "/files/newsletter-2022-2023.pdf" },
  { label: "Academic Calendar 2024-2025", href: "/files/academic-calendar-2024-2025.pdf" },
  { label: "Book List 2026-27", href: "/files/book-list-2026-2027.pdf" },
  { label: "Fee Structure 2024-2025", href: "/files/fee-structure-2024-2025.pdf" },
  { label: "Class X Result 2024-25", href: "/files/class-10-result-2024-25.pdf" },
];

export const achievementsIntro =
  "Agragami Convent School encourages its students not only to excel academically but to achieve all round development. Form the year 2015 to 2018 Agragamians have participated in various competitive examinations (2015-2018) and brought number of laurels to the school.";

export const achievementTabs = [
  {
    label: "Competitive exams",
    heading: "Exams, scholarships and prizes",
    items: [
      { number: 18, label: "Exams" },
      { number: 48, label: "Scholarships" },
      { number: 35, label: "Cash prizes" },
    ],
  },
  {
    label: "Medals",
    heading: "Medals won by Agragamians",
    items: [
      { number: 37, label: "Gold" },
      { number: 35, label: "Silver" },
      { number: 36, label: "Bronze" },
    ],
  },
];

// Words that rotate inside the blue box in the intro headline.
export const rotatingWins = [
  "37 gold medals",
  "35 silver medals",
  "36 bronze medals",
  "48 scholarships",
  "35 cash prizes",
];

export const basicDetails = [
  { label: "Run by", value: "Society of Sisters of St. John, Wardha" },
  { label: "Establishment year", value: "2005" },
  { label: "Affiliation no.", value: "1130217" },
  { label: "School no.", value: "30271" },
  { label: "Medium", value: "English" },
  { label: "Syllabi", value: "NCERT (as per the instructions of CBSE)" },
  { label: "Academic session", value: "April to March" },
  { label: "Affiliation period", value: "01.04.2021 to 31.03.2025" },
];

export const infoAccordion = [
  {
    title: "School hours",
    body: "08:00 am to 02:30 pm (Monday to Friday) and 08:00 am to 12:20 pm (Saturday)",
  },
  { title: "Office hours", body: "09:00 am to 02:00 pm" },
  {
    title: "Dress code",
    body: "Royal blue Pants (Boys), Skirt (Girls) & Light blue shirt with white stripes Wednesday and Saturday : P .T. uniform Pants and T-shirt of the house colours.",
  },
  {
    title: "The management",
    body: "Provincial Administration of the Indian Province of Sisters of St.John is an elected Body by the members of the Indian Province. The administration consists of Provincial as the Head and four counsellors. It is the ultimate decision making body of the Province. Provincial will be the President of all the registered Societies/Trusts that establish and administer the Educational Institutions in the Province.",
  },
  {
    title: "Governing body",
    body: "The Governing Body of the Society, funding and administering the Institution, is the highest decision and policy making body. The Body consists of The President, The Vice President, The Secretary, The Treasurer, and three trustees.",
  },
];

// The old home page cuts these quotes short with "[...]".
// Paste the full text here when you have it.
export const testimonials = [
  {
    name: "Shailesh Nawal",
    image: "/images/testimonial-shailesh.jpg",
    text: "It was a great pleasure to be present here on this occasion. Every event was organised in a systematic manner. This school is full of talents. Teachers are well qualified and have the efficiency to bring up bright citizens in future. I render my heartfelt thanks to Sr. Vidya for giving me this wonderful opportunity [...]",
  },
  {
    name: "Siddharth Meshram",
    text: "It has been a great privilege to be a part of Teachers' Day celebration at the school. The scintillating and wonderful performance by young and energetic kids has mesmerised. I wish all the luck and best wishes for all future endeavours. Also, would like the school to be a centre of value based, culture oriented,outdoor [...]",
  },
  {
    name: "Nirmaladevi S.",
    image: "/images/testimonial-nirmaladevi.jpg",
    text: "Today attend the school cabinate instllation and three plantation ceremony of the agragami school in wardha. I am happy to see that the school has excel in all the aspects of education and infrastructure. The school has achieved the listinction of being one of the best school in entire Nagpur Vision. The discipline and confidenace [...]",
  },
];
