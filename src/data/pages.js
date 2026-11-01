// Content for every inner page.
//
// The key is the page address (for example "faculty" is the page /faculty).
// "light" + "bold" make the big page heading.
// "sections" is the page body. A page with an empty "sections" list shows a
// "content not added yet" box, so you can see which pages still need text.
//
// A section can have any of these:
//   heading:  "Light part|Bold part"   (the "|" splits light and bold text)
//   sub:      "A smaller coloured sub heading"
//   text:     ["paragraph one", "paragraph two"]
//   list:     ["bullet one", "bullet two"]
//   facts:    [{ label: "Medium", value: "English" }]
//   links:    [{ label: "Fire Safety Certificate", href: "/files/fire.pdf" }]
//   table:    { head: ["Class", "Boys"], rows: [["I", "20"]] }
//   image:    "/images/photo.jpg"

import { nav } from "./site.js";

export const pages = {
  "general-information": {
    light: "General",
    bold: "information",
    sections: [
      {
        heading: "Basic|details",
        facts: [
          { label: "Name", value: "Agragami Convent School, C.B.S.E" },
          { label: "Run by", value: "Society of Sisters of St. John, Wardha" },
          { label: "Establishment year", value: "2005" },
          { label: "Affiliation period", value: "01.04.2021 to 31.03.2025" },
          { label: "Affiliation no", value: "1130217" },
          { label: "School no.", value: "30271" },
          { label: "Motto", value: "Live for TRUTH and JUSTICE" },
          { label: "Medium", value: "English" },
          { label: "Syllabi", value: "NCERT (as per the instructions of CBSE)" },
          { label: "Academic session", value: "April to March" },
          {
            label: "School hours",
            value:
              "08:00 am to 02:30 pm (Monday to Friday) and 08:00 am to 12:20 pm (Saturday)",
          },
          { label: "Office hours", value: "09:00 am to 02:00 pm" },
        ],
      },
      {
        heading: "Documents and|certificates",
        // Put the PDF files in public/files/ and set href, e.g. "/files/affiliation-copy.pdf"
        links: [
          { label: "Affiliation Copy", href: "#" },
          { label: "Building Safety Certificate", href: "#" },
          { label: "Fire Safety Certificate", href: "#" },
          { label: "Health and Sanitation Certificate", href: "#" },
          { label: "NOC", href: "#" },
          { label: "Recognition Certificate", href: "#" },
          { label: "Self Certification", href: "#" },
          { label: "Society Registration Certificate", href: "#" },
          { label: "Last Three-Year Result", href: "#" },
          { label: "Affidavit Copy", href: "#" },
          { label: "Drinking Water", href: "#" },
          { label: "Land Certificate", href: "#" },
          { label: "Mandatory Disclosure Details SARAS 4.0", href: "#" },
          { label: "Mandatory Disclosure Details SARAS 5.0", href: "#" },
        ],
      },
      {
        heading: "Dress|code",
        text: [
          "Royal blue Pants (Boys), Skirt (Girls) & Light blue shirt with white stripes Wednesday and Saturday : P .T. uniform Pants and T-shirt of the house colours.",
        ],
      },
      {
        heading: "The|management",
        text: [
          "Provincial Administration of the Indian Province of Sisters of St.John is an elected Body by the members of the Indian Province. The administration consists of Provincial as the Head and four counsellors. It is the ultimate decision making body of the Province. Provincial will be the President of all the registered Societies/Trusts that establish and administer the Educational Institutions in the Province.",
        ],
      },
      {
        heading: "Governing|body",
        text: [
          "The Governing Body of the Society, funding and administering the Institution, is the highest decision and policy making body. The Body consists of The President, The Vice President, The Secretary, The Treasurer, and three trustees.",
        ],
      },
    ],
  },

  // ---- About us ----
  "class-wise-student-strength": {
    light: "Class wise",
    bold: "student strength",
    sections: [
      {
        heading: "Student|strength",
        image: "/images/class-strength.jpg",
      },
    ],
  },

  "about-agragami": {
    light: "About",
    bold: "Agragami",
    sections: [
      {
        heading: "The|emblem",
        image: "/images/emblem.png",
        text: [
          "Agragami – The forerunner – is St. John the Baptist, a prophet who prepared the way for Jesus Christ.",
          "The initial of 'J' and 'B' joined and crowned by the cross forms the main part of the emblem. The waves suggest the waters of river Jordan where St. John the Baptist baptized thousands of people.",
          "The Holy Bible shows John as the man of integrity, the fearless ascetic, the humble and selfless forerunner of Christ. The burning torch in the emblem is a symbol of his zealous life. The zeal for God's kingdom fills him with fire.",
          "John stood for truth and justice and risked his head and his future. He remains as a burning torch for us and for people of all times.",
        ],
      },
      {
        heading: "St. John|the Baptist",
        image: "/images/john-baptist.jpg",
        text: [
          "Saint John the Baptist, the Patron of the Sisters of St. John, was a disciple of Christ. He was the forerunner – Agragami – of Jesus Christ. The Society of Sisters of St. John was founded in 1919 and started its presence in India in 1972. The society responds to the needs of the time and is engaged in various activities such as education both formal and informal, rehabilitation of the differently abled and destitute, health care, empowerment of women, and spiritual and pastoral care.",
        ],
      },
      {
        heading: "Vision|statement",
        text: [
          "The Society of Sisters of St. John, which constitutes a religious society in the Catholic Church, was founded by a German priest, Fr. John Mary Haw (1871–1949). His intense love and zeal to spread the kingdom of God inspired him to work for the liberation of the downtrodden.",
          "We take up the challenge of educating children and youth with love and compassion of Jesus Christ, the supreme Guru. We recognize the unique personality and development of each one and try to bring out the best in every student through a sound physical, emotional, intellectual, moral, cultural and spiritual formation.",
        ],
      },
      {
        heading: "Motto of|the school",
        text: [
          "To live for justice and truth.",
          "It is the character formed by the practice of certain values which makes every Agragami student aware of justice and gives him/her courage to live for the truth. We work to maintain academic excellence in and through curricular activities. We instill in them the spirit of patriotism and prepare them to live as responsible citizens.",
        ],
      },
    ],
  },

  infrastructure: {
    light: "Our",
    bold: "infrastructure",
    sections: [
      {
        heading: "Digital|classrooms",
        text: [
          "To create a brighter tomorrow for today's students, every classroom is equipped with digital boards, which include interaction, assessments, self-learning, and hands-on lab. These digital lessons make teaching and learning enjoyable.",
        ],
      },
      {
        heading: "Science|lab",
        text: [
          "The science lab, equipped with models, apparatus, chemicals and reagents, develops scientific learning among students and cultivates a deeper and more profound interest in this field.",
        ],
        image: "/images/infrastructure-science-lab.jpg",
      },
      {
        heading: "Computer|lab",
        text: [
          "The computer lab keeps students and teachers engaged in creating technology-based projects and provides computer services to the school community.",
        ],
        image: "/images/infrastructure-computer-lab.png",
      },
      {
        heading: "Library",
        text: [
          "The library plays an important role in providing knowledge to young minds. It helps in developing reading skills and creates a positive impact on academic development.",
        ],
      },
      {
        heading: "Maths|lab",
        text: [
          "The maths lab helps students apply theoretical knowledge in practical form to ensure and visualise its application in their lives. It helps in developing the child's mental ability through puzzles.",
        ],
        image: "/images/infrastructure-maths-lab.jpg",
      },
      {
        heading: "Other|facilities",
        list: ["New Building", "Mother Building", "Principal's Office", "Administrative Office", "School Garden"],
      },
    ],
  },

  faculty: {
    light: "Our",
    bold: "faculty",
    sections: [
      { heading: "Class|teachers", image: "/images/class-teachers.jpeg" },
      { heading: "Faculty|group photo", image: "/images/faculty-1.jpeg" },
      { heading: "Faculty|2022–23", image: "/images/faculty-2.jpeg" },
      { heading: "Faculty|2023–24", image: "/images/faculty-3.jpeg" },
    ],
  },

  curriculum: {
    light: "Our",
    bold: "curriculum",
    sections: [
      {
        heading: "Subjects|offered",
        text: ["The school follows NCERT syllabi as per the instructions of CBSE. The medium of instruction is English."],
        list: [
          "English – Classes IX and X",
          "Mathematics – Classes IX and X",
          "Science – Classes IX and X",
          "Social Science – Classes IX and X",
          "Hindi – Classes IX and X",
        ],
      },
      { heading: "English|syllabus", image: "/images/curriculum-english-ix.jpeg" },
      { image: "/images/curriculum-english-x.jpeg" },
      { heading: "Mathematics|syllabus", image: "/images/curriculum-maths.jpeg" },
      { heading: "Science|syllabus", image: "/images/curriculum-science.jpeg" },
      { heading: "Social Science|syllabus", image: "/images/curriculum-social.jpeg" },
      { heading: "Hindi|syllabus", image: "/images/curriculum-hindi.jpeg" },
    ],
  },

  "message-from-the-principal": {
    light: "Message from the",
    bold: "principal",
    sections: [
      {
        heading: "From the|principal's desk",
        text: [
          "Once the River became very proud of the tremendous flow of its water. The River felt that it was so powerful that it could wash away everything — the mountains, houses, trees, animals, humans, etc.",
          "One day the River proudly asked the Ocean, \"Tell me, what should I bring for you? Houses, animals, humans, trees, whatever you want, I can uproot and bring with me.\"",
          "The Ocean understood that the River had become egoistic. He said, \"If you want to bring something for me, uproot some grass and bring it.\"",
          "The River said, \"Is that all? I'll bring it right away.\" While passing through the field, the River exerted its full force on the grass, but the grass did not get uprooted. The River tried several times, but failed.",
          "Eventually the River gave up and reached the Ocean and said, \"I can uproot trees, houses, mountains — but whenever I apply force to uproot the grass, it bends down and I pass from above, empty-handed.\"",
          "The Ocean listened carefully and said with a smile, \"Those who are hard and rigid like mountains and trees are easily uprooted. But the one who has learned the humility of grass cannot be disturbed even by the fiercest of winds or violent storms.\"",
          "May the festival of lights enlighten each of us to cultivate rays of humility in life. Stay blessed.",
        ],
      },
    ],
  },

  "message-from-the-manager": {
    light: "Message from the",
    bold: "manager",
    sections: [
      {
        heading: "From the|manager's desk",
        text: [
          "There are two ways to establish competitive advantage – do things better than others, or do things differently. What we can or cannot do, what we consider possible or impossible, is rarely a measure of our true capacity. It is more likely a measure of our beliefs about who we are.",
          "Therefore, my dear students, keep striving to achieve all within your capacity. Keep moving till you touch the heights meant for you. Nothing needs to bother you, nothing needs to worry you. \"Master yourself\" – the excellent piece of knowledge – one can achieve.",
          "God bless you and keep you successful and cheerful.",
          "— Sr. Arpita Mathew SJB",
        ],
      },
    ],
  },
  "school-anthem-and-prayer": {
    light: "School",
    bold: "anthem and prayer",
    sections: [
      {
        heading: "School|anthem",
        text: [
          "We have a vision for tomorrow\nJust believe, just believe,\nWe have a goal for Agragami\nWe can achieve, we can achieve.",
          "You and me'll do our part\nStand together, heart to heart\nWe're going to show the world\nWhat Agragami can be,\nWe can achieve, We can achieve.",
          "There is Leadership and Excellence, that we can strive for\nWe are given justice and Truthfulness to stand for.",
          "There's spirit, in the air,\nIt's a feeling, we all share\nWe're going to show the world,\nWhat Agragami can be\nWe can achieve, We can achieve.",
          "Count on me Agragami\nCount on me, to give my best and more\nYou and me… We can achieve.",
        ],
      },
      {
        heading: "Our|Father",
        text: [
          "Our Father in heaven,\nHoly be your name,\nYour Kingdom come,\nYour will be done on earth as it is in heaven.\nGive us today our daily bread\nand forgive us our sins\nas we forgive those who sin against us.\nDo not bring us to the test\nbut deliver us from evil.\n— Amen.",
        ],
      },
      {
        heading: "Prayer before|class",
        text: [
          "Almighty God, I thank you for this new day.\nThank you for giving me good parents, teachers and friends.\nBless me as I begin to study.\nFill me with your grace to study my lessons.\nTransform me Lord into a responsible and hardworking student.\nHelp me to be attentive and obedient.\n— Amen.",
        ],
      },
      {
        heading: "Prayer after|class",
        text: [
          "O God, I thank you for this fruitful day.\nThank you for all that I could learn today.\nEnable my memory to retain what I have studied.\nBe with me on my way home.\n— Amen.",
        ],
      },
      {
        heading: "Prayer before|examination",
        text: [
          "Dear God, bless us on this day of examination.\nStrengthen our memory.\nKeep us healthy in mind and body.\nMay this examination be a joyful experience for us.\n— Amen.",
        ],
      },
      {
        heading: "Prayer before|meals",
        text: [
          "Almighty God, we thank you for this food.\nBless those people who work in the field.\nBless those who have prepared this food.\nMay this food be the source of our strength.\n— Amen.",
        ],
      },
    ],
  },

  // ---- School policies ----
  "admission-procedure": {
    light: "Admission",
    bold: "procedure",
    sections: [
      {
        heading: "Admission",
        text: [
          "Admission is open to all pupils irrespective of caste, creed and social status.",
          "Admissions to classes are subject to availability of seats.",
        ],
      },
      {
        heading: "Fees",
        text: [
          "The school fees can be paid in two instalments. The first instalment is to be paid before the first term (April to September), and the second instalment before the second term (October to March).",
        ],
      },
    ],
  },

  "promotion-rules": {
    light: "Promotion",
    bold: "rules",
    sections: [
      {
        heading: "General rules for|examination and promotion",
        text: [
          "The progress of the pupil is evaluated by a regular process of evaluation. A progress report is issued after each evaluation.",
        ],
        list: [
          "A student should get a minimum of 40% marks in each subject.",
          "There will be no re-examination at any time for any reason under any circumstances, except when a student is required to represent the school in activities outside.",
          "A student found copying, or helping others to copy during any examinations, will be disqualified in that subject. Such a student is liable for expulsion from the school.",
        ],
      },
    ],
  },

  "rules-and-regulations": {
    light: "Rules and",
    bold: "regulations",
    sections: [
      {
        heading: "Rules of|discipline",
        list: [
          "Every pupil must have a copy of the Students Manual, which must be brought to school on all school days.",
          "All pupils must reach the school well in time.",
          "All pupils should be habitually clean and neatly dressed.",
          "Pupils are responsible for the safe custody of their books and belongings.",
          "The school building and premises should be kept clean and tidy.",
          "Any damage caused to school property will have to be made good.",
          "Being an English medium school, all pupils are expected to speak English in the school premises.",
          "Pupils who do not abide by the rules and regulations will be dismissed from the school.",
          "Permission from the Principal is necessary for leaving the school premises during school hours.",
          "It is compulsory on the part of the pupils to participate in co-curricular and other activities of the school.",
          "Pupils in one class are not allowed to be in any other class even during the intervals.",
        ],
      },
      {
        heading: "Attendance",
        text: [
          "A student must have a minimum of 90% attendance for promotion to the higher classes. A deficiency of 10% may be condoned by the Principal on medical grounds.",
        ],
      },
      {
        heading: "Leave of|absence",
        text: [
          "Leave of absence may be granted to a pupil for sufficient cause but only on prior written application from parents. Leave for more than two days is to be granted by the Principal only.",
          "If pupils are absent from school for more than a fortnight (2 weeks) their names will be struck off from the rolls, and as a rule they are not readmitted. If readmitted, they will have to pay the re-admission fee again.",
          "If a pupil is absent due to illness or any other reason, the Principal must be informed immediately and the pupil on returning must bring a note from the parents or guardians. In case of illness, a medical certificate is essential.",
          "Pupils must return to school after the holidays on the appointed day and be present on the closing day of each term.",
          "The school authorities will not be responsible for anything happening to a student before school hours or after school hours.",
        ],
      },
    ],
  },

  // ---- Committees ----
  "school-cabinet": {
    light: "School",
    bold: "cabinet",
    sections: [
      {
        heading: "Cabinet|members",
        text: [
          "School cabinet members were elected through a democratic method for the academic year 2019-2020. On 1st July 2019, those who filed nominations presented their agenda. Students of classes 1 to 10 cast their votes and the result was declared on 3rd July. The principal administered the oath to the leaders.",
        ],
        table: {
          head: ["Sr. No.", "Member name", "Designation"],
          rows: [
            ["1", "Shreyash Bhongade", "School Captain"],
            ["2", "Tanvi Ganvir", "School Captain"],
            ["3", "Piyush Khonde", "School Vice Captain"],
            ["4", "Labanshree Maheshgauri", "School Vice Captain"],
            ["5", "Yash Dhavle", "Sports Captain"],
            ["6", "Rakshanda Talwekar", "Sports Captain"],
            ["7", "Arnav Sagane", "Sports Vice Captain"],
            ["8", "Gargi Tekade", "Sports Vice Captain"],
            ["9", "Paras Bisane", "Blue House Captain"],
            ["10", "Swamini Kanse", "Blue House Captain"],
            ["11", "Sajal Umak", "Blue House Vice Captain"],
            ["12", "Muktai Jibhkate", "Blue House Vice Captain"],
            ["13", "Mayank Bobade", "Green House Captain"],
            ["14", "Radhika Jachak", "Green House Captain"],
            ["15", "Parth Kolhe", "Green House Vice Captain"],
            ["16", "Shruti Tiwari", "Green House Vice Captain"],
            ["17", "Nishant Khot", "Red House Captain"],
            ["18", "Kshipra Patil", "Red House Captain"],
            ["19", "Aditya Kadam", "Red House Vice Captain"],
            ["20", "Tamanna Hirani", "Red House Vice Captain"],
            ["21", "Aditya Kaushik", "Yellow House Captain"],
            ["22", "Nandini Adchule", "Yellow House Vice Captain"],
            ["23", "Shreyash Mundaokar", "Yellow House Vice Captain"],
            ["24", "Astha Choudhari", "Yellow House Vice Captain"],
          ],
        },
      },
    ],
  },

  "school-managing-committee": { light: "School", bold: "managing committee", sections: [] },

  "parents-teachers-association": {
    light: "Parents' teachers'",
    bold: "association",
    sections: [
      {
        heading: "EPTA|members",
        text: ["The elected members of the Parents-Teachers Association (EPTA) are listed in the document below."],
        links: [{ label: "EPTA Member List 2024-25", href: "/files/epta-members-2024-25.pdf" }],
      },
    ],
  },

  "road-safety-committee": {
    light: "Road safety",
    bold: "committee",
    sections: [
      {
        heading: "Committee|members",
        table: {
          head: ["Sr. No.", "Name", "Designation"],
          rows: [
            ["1", "Sr. Jessy Joseph", "President"],
            ["2", "Mr. Hemant Madhyaswar", "Secretary"],
            ["3", "Mrs. Kanchan Dhamane", "Parents Representative"],
            ["4", "Mr. Dareshwar Korde", "Vice President"],
            ["5", "Mr. Ambadas Manekar", "Vice President"],
            ["6", "Mr. Hemant Madhyaswar", "Member"],
            ["7", "Mr. Rajesh Nagrale", "Member"],
            ["8", "Mr. Harish Korde", "Member"],
          ],
        },
      },
    ],
  },

  "grievance-redressal-mechanism": {
    light: "Grievance redressal",
    bold: "mechanism",
    sections: [
      {
        heading: "Committee|members",
        table: {
          head: ["Sr. No.", "Name", "Post", "Designation"],
          rows: [
            ["1", "Sr. Vidya Joseph", "Principal", "Chairperson"],
            ["2", "Mrs. Anjali Lokare", "Teacher", "Member Secretary"],
            ["3", "Kanchan Dhamane", "Parent", "Member PTA"],
            ["4", "Mrs. Arti Sontakke", "Parent", "Member Parent"],
          ],
        },
      },
      {
        heading: "Class-wise teacher|representatives",
        table: {
          head: ["Sr. No.", "Name", "Class", "Role"],
          rows: [
            ["1", "Mrs. Megha Shambharkar", "I", "Member"],
            ["2", "Sr. Philomina Thomas", "II", "Member"],
            ["3", "Miss. Bhagyashali Gaikwad", "III", "Member"],
            ["4", "Mrs. Sheala Parvez", "IV", "Member"],
            ["5", "Mrs. Nabeela Sheikh", "V", "Member"],
            ["6", "Nafisa Khan", "VI", "Member"],
            ["7", "Nalini Deshmukh", "VII", "Member"],
            ["8", "Mrs. Jayashree Haware", "VIII", "Member"],
            ["9", "Bhupedra Dhore", "IX", "Member"],
            ["10", "Mrs. Trupti Katakwar", "X", "Member"],
          ],
        },
      },
    ],
  },

  posco: {
    light: "",
    bold: "POSCO",
    sections: [
      {
        heading: "Committee|members",
        table: {
          head: ["Sr. No.", "Member name", "Designation"],
          rows: [
            ["1", "Sr. Jessy Joseph", "Principal"],
            ["2", "Sr. Mandakini Behera", "Vice Principal"],
            ["3", "Sr. Sunanda Koikkari", "Admin Staff"],
            ["4", "Sr. Dhannya Antony", "Supervisor"],
            ["5", "Sr. Divya Palatty", "School Counsellor"],
            ["6", "Sr. Sima Jose", "Child Helpline Representative"],
            ["7", "Mrs. Sheala Parvez", "Parent Representative"],
            ["8", "Mr. Bhupedra Dhore", "Teacher Representative"],
            ["9", "Mrs. Pallavi Wankhede", "Clerk"],
            ["10", "Mr. Arif Ali", "Clerk"],
            ["11", "Yash Dukre", "Student Representative"],
            ["12", "Gargi Kothe", "Student Representative"],
          ],
        },
      },
    ],
  },

  // ---- Other activities ----
  "house-system": {
    light: "House",
    bold: "system",
    sections: [
      {
        heading: "Brahmaputra|Blue House",
        text: [
          "Brahmaputra Blue House depicts that there is no limit for achieving success and that no boundaries can stop you from reaching your destination.",
        ],
      },
      {
        heading: "Ravi|Red House",
        text: [
          "Ravi Red House represents one's behaviour of mixing with others and spreading etiquettes and manners.",
        ],
      },
      {
        heading: "Ganga|Green House",
        text: [
          "Ganga Green House represents the symbol of purity, courage, forgiveness, religiousness, and tolerance to absorb and dispose of evil activities.",
        ],
      },
      {
        heading: "Yamuna|Yellow House",
        text: [
          "Yamuna Yellow House represents love, respect and compassion for every individual around and teaches us to stay in harmony.",
        ],
      },
    ],
  },

  "student-activities": {
    light: "Student",
    bold: "activities",
    sections: [
      {
        heading: "Co-curricular|activities",
        text: [
          "For the all-round development of personality, a variety of co-curricular activities are arranged for the students. Training is imparted for vocal music, drawing, dance and karate. Cultural and literary competitions are organised on a regular basis.",
        ],
        list: [
          "Sports Club",
          "Literary Club",
          "Science Club",
          "Arts Club",
          "Maths Club",
          "Health & Wellness Club",
          "Integrity Club",
        ],
      },
    ],
  },

  "teachers-training-programmes": {
    light: "Teachers' training",
    bold: "programmes",
    sections: [
      {
        heading: "Capacity building|training",
        text: [
          "Capacity Building Training of life skills was conducted for the teachers in our school. Along with 33 teachers from CBSE schools, they attended a session by Mrs. Neeru Kupai, the resource person, who spoke on life skills and how they help in education.",
        ],
      },
    ],
  },

  // ---- Single pages ----
  careers: { light: "", bold: "Careers", sections: [] },
  "sports-and-games": {
    light: "Sports and",
    bold: "games",
    photos: ["/images/sports/sports-1.jpeg", "/images/sports/sports-3.jpeg"],
    sections: [
      {
        heading: "Sports at Agragami",
        text: ["Agragami Convent School believes in the all-round development of every student. Sports and physical education form an integral part of school life, helping students build fitness, teamwork, discipline, and a competitive spirit alongside academic excellence."],
      },
      {
        heading: "Sports day 2024 — photo gallery",
        type: "image-grid",
        images: [
          "/images/sports/sports-1.jpeg",
          "/images/sports/sports-2.jpeg",
          "/images/sports/sports-3.jpeg",
          "/images/sports/sports-4.jpeg",
          "/images/sports/sports-5.jpeg",
          "/images/sports/sports-6.jpeg",
          "/images/sports/sports-7.jpeg",
          "/images/sports/sports-8.jpeg",
          "/images/sports/sports-9.jpeg",
          "/images/sports/sports-10.jpeg",
          "/images/sports/sports-11.jpeg",
          "/images/sports/sports-12.jpeg",
          "/images/sports/sports-13.jpeg",
          "/images/sports/sports-14.jpeg",
          "/images/sports/sports-15.jpeg",
          "/images/sports/sports-16.jpeg",
        ],
      },
    ],
  },
};

// Gallery photos. Put files in public/images/gallery/ and set "image".
// Categories are the same as the old site.
export const galleryCategories = [
  "News and Media",
  "Photos",
  "Sports And Games",
  "Students Achievement",
];

export const galleryItems = [
  { title: "School building", category: "Photos", image: "/images/gallery/gallery-1.jpg" },
  { title: "School building exterior", category: "Photos", image: "/images/gallery/gallery-2.jpg" },
  { title: "School campus", category: "Photos", image: "/images/gallery/gallery-3.jpg" },
  { title: "Students on campus", category: "Photos", image: "/images/gallery/gallery-4.jpg" },
  { title: "School activity", category: "Photos", image: "/images/gallery/gallery-5.jpg" },
  { title: "School event", category: "Photos", image: "/images/gallery/gallery-6.jpg" },
  { title: "Students at event", category: "Photos", image: "/images/gallery/gallery-8.jpeg" },
  { title: "Chanda Live-In 2022", category: "News and Media", image: "/images/gallery/gallery-9.jpg" },
  { title: "Chanda Live-In 2022", category: "News and Media", image: "/images/gallery/gallery-10.jpg" },
  { title: "School activity 2021", category: "News and Media", image: "/images/gallery/gallery-11.jpg" },
  { title: "School activity 2021", category: "News and Media", image: "/images/gallery/gallery-12.jpg" },
  { title: "Students achievement 2022", category: "Students Achievement", image: "/images/gallery/gallery-14.jpg" },
];

// Finds the menu group a page belongs to, for the breadcrumb and the side menu.
export function findGroup(path) {
  return nav.find((item) => item.children && item.children.some((c) => c.path === path)) || null;
}
