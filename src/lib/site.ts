export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://gsithinktank.com";

export const siteConfig = {
  name: "Governance and Security Initiative",
  shortName: "GSi",
  tagline: "From Bengal to beyond . . .",
  title: "Governance and Security Initiative",
  description:
    "Independent think tank and training academy in Dhaka working on governance, national security, cybersecurity, AI policy, and public-interest reform.",
  email: "asheer.gsi@gmail.com",
  location: "Shyamoli, Road 1, House 7/7, Dhaka, Bangladesh",
  socials: {
    founderLinkedIn: "https://www.linkedin.com/in/asheer-shah",
    companyLinkedIn: "https://www.linkedin.com/company/gsi-dhaka/",
    facebook: "https://www.facebook.com/share/1AmTQ9jbVu/?mibextid=wwXIfr",
    instagram:
      "https://www.instagram.com/gsi.rangpur?igsh=cmxnMXYxZ2d2bmZ2&utm_source=qr",
    dailyStarLive:
      "https://web.facebook.com/DailyStarNews/videos/3556201781198145",
  },
} as const;

export const primaryNavigation = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/analysis", label: "Analysis" },
  { href: "/training", label: "Training" },
  { href: "/articles", label: "Articles" },
  { href: "/podcast", label: "Podcast" },
  { href: "/#contact", label: "Contact" },
] as const;

export const archivedHomeSections = {
  services: {
    eyebrow: "What we did",
    title:
      "Research, training, and policy engagement across critical governance challenges.",
    description:
      "GSi works across research, public commentary, training, and issue-based initiatives bridging governance, national security, cybersecurity, and AI policy.",
    cards: [
      {
        title: "Policy research and writing",
        description:
          "Briefs, essays, explainers, and long-form analysis on governance, security, digital policy, and public-sector reform.",
        items: [
          "Cybersecurity governance and digital resilience",
          "AI policy, deepfakes, and information integrity",
          "Governance, elections, and institutional accountability",
        ],
      },
      {
        title: "Strategic dialogue and commentary",
        description:
          "Public engagement through interviews, panels, and media conversations that translate complex policy issues for wider audiences.",
        items: [
          "Television and live discussion appearances",
          "Founder commentary on emerging conflict technologies",
          "Public-interest explainers for policy and civic audiences",
        ],
      },
      {
        title: "Training and capacity building",
        description:
          "Custom learning programmes for institutions working on cybersecurity, AI governance, strategic risk, and public policy practice.",
        items: [
          "Executive briefings and workshops",
          "Team training for regulators, NGOs, and universities",
          "Practical modules with Bangladesh-focused case studies",
        ],
      },
      {
        title: "Public-interest initiatives",
        description:
          "Issue-based initiatives that connect governance ideas to local needs, especially digital access and environmental quality.",
        items: [
          "Ward 28 public Wi-Fi initiative",
          "Shyamoli-Agargaon canal rehabilitation advocacy",
          "Community-centred urban and civic engagement",
        ],
      },
    ],
  },
} as const;

export const homeContent = {
  hero: {
    eyebrow: "Governance and Security Initiative",
    title: "Policy thinking for a more secure public future.",
    description:
      "GSi is a Bangladesh-rooted think tank and training academy working across governance, security, cyber policy, AI, and public-interest reform.",
    points: [
      "Research",
      "Training",
      "Public dialogue",
    ],
    video: {
      label: "Intro video",
      title: "Meet GSi in under a few minutes",
      description:
        "A concise introduction to the initiative, its focus areas, and the kind of public-interest work visitors can explore next.",
      embedUrl: "https://youtu.be/ApAvTMdAUmQ?si=pmE1m9uYUHp0E0Qe",
    },
  },
  proof: [
    {
      title: "What visitors will get",
      description:
        "A quick introduction to the organisation, the issues it works on, and the kind of research and training they can explore next.",
    },
    {
      title: "Research-led",
      description:
        "Articles, policy commentary, and public analysis on cyber governance, AI, geopolitics, climate, and accountability.",
    },
    {
      title: "Training-ready",
      description:
        "Institutional learning formats for public bodies, development partners, media teams, universities, and mission-driven organisations.",
    },
    {
      title: "Community-facing",
      description:
        "Work that links policy thinking with local action, including digital inclusion and environmental advocacy initiatives.",
    },
  ],
  analysis: {
    eyebrow: "Analysis",
    title: "Byte-sized analysis for fast-moving policy and security developments.",
    description:
      "Recent nuggets from GSi on cyber incidents, geopolitics, governance, and public-interest developments that need quick but credible context.",
  },
  focusAreas: [
    {
      title: "Cybersecurity and digital resilience",
      description:
        "Phishing, cyber governance, digital safety, corporate accountability, and institutional preparedness.",
    },
    {
      title: "AI governance and information integrity",
      description:
        "Disinformation, deepfakes, platform governance, freedom of expression, and public-interest AI policy.",
    },
    {
      title: "Geopolitics and emerging conflict technologies",
      description:
        "Spyware, cyber warfare, autonomous systems, strategic risk, and the political implications of new military technologies.",
    },
    {
      title: "Governance and democratic accountability",
      description:
        "Electoral guidance, institutional reform, public administration, and accountability in Bangladesh.",
    },
    {
      title: "Climate, urban, and environmental governance",
      description:
        "Landfill pollution, plastic waste, drainage failure, climate security, and practical policy responses.",
    },
    {
      title: "Community digital inclusion",
      description:
        "Digital access, public connectivity, and locally grounded interventions that reduce exclusion.",
    },
  ],
  initiatives: [
    {
      title: "Ward 28 digital access initiative",
      description:
        "GSi launched free public Wi-Fi zones in underserved communities in Shyamoli-Agargaon, with plans to expand access for students, youth, and residents.",
    },
    {
      title: "Canal cleanup and green public space advocacy",
      description:
        "Following a site visit near the Liberation War Museum, GSi highlighted the public-health and environmental risks of a polluted canal and proposed community-led rehabilitation.",
    },
  ],
} as const;

export const organizationProfile = {
  overview:
    "Governance and Security Initiative (GSi) is an independent think tank and training academy based in Dhaka. Its work sits at the intersection of governance, national security, cybersecurity, AI policy, and broader public-interest reform.",
  positioning:
    "GSi combines research, dialogue, training, and issue-based civic engagement. It works as a platform that blends a think tank, a training academy, and a cybersecurity-oriented advisory practice.",
  principles: [
    "Evidence-backed policy writing over generic institutional language.",
    "Bangladesh-rooted analysis with regional and global relevance.",
    "Practical delivery formats that connect research to training and public dialogue.",
  ],
} as const;

export const founderProfile = {
  id: "asheer-shah",
  name: "Asheer Shah",
  role: "Founder & Director",
  affiliation: "Governance and Security Initiative (GSi)",
  image: "/founder.jpg",
  introduction: [
    "Asheer Shah is the Founder and Director of the Governance and Security Initiative (GSi). His work focuses on cybersecurity governance, artificial intelligence policy, emerging technologies, climate security, and international affairs.",
    "He completed a Master’s degree in Cybersecurity Governance at Leiden University in the Netherlands, where his work focused on cyber espionage, digital crime, behavioural cybersecurity, and AI governance. He previously studied Global Studies and Governance at Independent University, Bangladesh, with a minor in Economics.",
    "His professional experience includes work with the Clingendael Institute in the Netherlands and the Bangladesh Institute of Peace and Security Studies (BIPSS), alongside research, writing, training delivery, and public commentary across policy platforms and media outlets.",
  ],
  highlights: [
    "Cybersecurity governance, AI policy, and emerging technology risk",
    "Academic background spanning Leiden University and Independent University, Bangladesh",
    "Research, training, and public commentary across policy and media platforms",
  ],
  educationList: [
    "Master’s in Cybersecurity Governance, Leiden University, Netherlands",
    "Bachelor’s in Global Studies and Governance, Independent University, Bangladesh",
  ],
  experienceList: [
    "Clingendael Institute, Netherlands",
    "Bangladesh Institute of Peace and Security Studies (BIPSS)",
    "Founder and Director, Governance and Security Initiative",
  ],
  socialLinks: [
    {
      label: "LinkedIn",
      href: siteConfig.socials.founderLinkedIn,
    },
  ],
  education: [
    {
      title: "Leiden University, Netherlands",
      subtitle: "Master’s in Cybersecurity Governance",
      detail:
        "Research focus on cyber espionage, digital crime, behavioural cybersecurity, and AI governance.",
    },
    {
      title: "Independent University, Bangladesh",
      subtitle: "Bachelor’s in Global Studies and Governance",
      detail: "Minor in Economics.",
    },
  ],
  experience: [
    {
      title: "Clingendael Institute",
      detail:
        "Delivered training on global AI governance models for diplomats and humanitarian professionals.",
    },
    {
      title: "Bangladesh Institute of Peace and Security Studies (BIPSS)",
      detail:
        "Worked as a Research Associate contributing to cyber governance, misinformation, climate security, and regional strategic affairs.",
    },
    {
      title: "Governance and Security Initiative",
      detail:
        "Leads interdisciplinary research projects, training tracks, and public-facing analysis on governance, security, and emerging technology policy.",
    },
  ],
  expertise: [
    "Cybersecurity governance",
    "Artificial intelligence governance and ethics",
    "Behavioural cybersecurity",
    "Cyber espionage and digital crime",
    "Technology policy and global governance",
    "Climate security",
    "Indo-Pacific strategic affairs",
  ],
  engagements: [
    {
      title: "The Daily Star live discussion on the US-Israel-Iran conflict",
      detail:
        "Featured commentary on spyware, cyber warfare, and AI-enabled weapons in modern conflict.",
      href: siteConfig.socials.dailyStarLive,
    },
    {
      title: "Public commentary on AI, social media, and democracy",
      detail:
        "Writing and speaking on deepfakes, disinformation, platform governance, and rights-based responses in Bangladesh.",
      href: undefined,
    },
    {
      title: "Training and policy dialogue",
      detail:
        "Executive-facing programmes and public discussions that translate complex technology policy debates into institutional action.",
      href: undefined,
    },
  ],
  publications: [
    {
      title:
        "Role of renewable energy policy in ensuring net-zero carbon emissions and energy sustainability: A Bangladesh perspective",
      venue: "Springer book chapter",
      year: "2023",
      href: "https://doi.org/10.1007/978-3-031-24545-9_4",
    },
    {
      title: "Strengthening the Role of BIMSTEC: Route to Asian Union",
      venue: "Journal of International Affairs",
      year: "2022",
      href: "https://doi.org/10.58710/jiav24n1y2022a01",
    },
    {
      title: "The Urgency of a Common Bay of Bengal Climate Security Framework",
      venue: "Peace and Security Review",
      year: "2023",
      href: "https://bipss.org.bd/peace-and-security-review-volume-12-number-26-fourth-quarter-2023/",
    },
    {
      title: "Bangladesh’s Economic Development & the Bay of Bengal",
      venue: "The Financial Express",
      year: "2022",
      href: "https://today.thefinancialexpress.com.bd/29th-anniversary-issue-3/bangladeshs-economic-development-the-bay-of-bengal-1670320950",
    },
    {
      title:
        "Asian Cyber Security Community (ACSC): A Collaborative Approach to Cyber Governance and Management",
      venue: "BIPSS",
      year: "2023",
      href: "https://bipss.org.bd/asian-cyber-security-community-acsc/",
    },
    {
      title: "G20 Global Crypto Policy: Digital Asset Security and Governance",
      venue: "BIPSS",
      year: "2023",
      href: "https://bipss.org.bd/g20-global-crypto-policy-digital-asset-security-and-governance/",
    },
    {
      title: "Voter’s Guide for Bangladesh Elections 2023",
      venue: "Prothom Alo",
      year: "2023",
      href: "https://en.prothomalo.com/opinion/n00cb0e5d8",
    },
  ],
} as const;

export const leadershipProfiles = [founderProfile] as const;

export const legalContent = {
  privacy: {
    title: "Privacy Policy",
    effectiveDate: "April 25, 2026",
    description:
      "How the GSi website handles contact requests, local theme preferences, and linked third-party platforms.",
    sections: [
      {
        title: "What this site collects",
        body: "This website is primarily an informational publishing platform. We do not run user accounts or gated dashboards. If you contact GSi through a mailto-based inquiry flow, the information you choose to send is handled through your own email provider and then received by GSi via email.",
      },
      {
        title: "How information is used",
        body: "Contact details and inquiry messages may be used to reply to partnership requests, media inquiries, research collaboration proposals, or training discussions. GSi should not use submitted information for unrelated marketing activity without consent.",
      },
      {
        title: "Theme preference storage",
        body: "If you switch between light and dark mode, the site saves that preference in your browser's local storage. This value stays on your device and is used only to load the chosen theme consistently on later visits.",
      },
      {
        title: "Analytics and advertising",
        body: "The current site does not set advertising cookies, create user profiles, or run a behavioural analytics stack. If analytics or embedded third-party tools are added later, this policy should be updated before launch.",
      },
      {
        title: "Third-party services",
        body: "The website links out to external platforms including LinkedIn, Facebook, Instagram, and media or publication sites. Those platforms operate under their own privacy practices, and users should review them directly when leaving this website.",
      },
      {
        title: "Data retention",
        body: "Because contact is handled through email, retention depends on normal business correspondence practices. If you need a message or personal detail removed from active records, contact GSi directly at the published email address.",
      },
    ],
  },
  terms: {
    title: "Terms of Use",
    effectiveDate: "April 25, 2026",
    description:
      "Basic terms for using the GSi website, reading content, and making contact.",
    sections: [
      {
        title: "Informational use",
        body: "The website is intended to present GSi’s public profile, published writing, training areas, and contact information. Content is offered for informational and educational use unless otherwise stated.",
      },
      {
        title: "Intellectual property",
        body: "Unless credited to another publisher or source, original copy on this site should be treated as the work of GSi or its credited authors. Reuse should preserve attribution and should not distort the original meaning.",
      },
      {
        title: "No professional advice",
        body: "Articles, training descriptions, and public commentary are provided for general information. They should not be treated as legal, security, diplomatic, financial, or other professional advice for a specific situation.",
      },
      {
        title: "Accuracy and availability",
        body: "GSi aims to keep public information accurate and useful, but publication dates, external sources, programme formats, and linked resources may change over time. The site may also be updated or temporarily unavailable without notice.",
      },
      {
        title: "External links",
        body: "Links to external publications, media appearances, and social platforms are provided for reference. GSi cannot guarantee the continued availability or policies of those third-party sites.",
      },
      {
        title: "No formal engagement created",
        body: "Viewing the site or sending an inquiry does not create a consulting, advisory, or training agreement. Any formal collaboration should be confirmed separately in writing.",
      },
    ],
  },
  cookies: {
    title: "Cookie Policy",
    effectiveDate: "April 25, 2026",
    description:
      "A simple explanation of the minimal browser-side storage used by the GSi site.",
    sections: [
      {
        title: "No essential website cookies",
        body: "The current public site does not use login, shopping, advertising, or analytics cookies. Visitors can read pages, articles, and training information without accepting a cookie banner.",
      },
      {
        title: "Theme preference storage",
        body: "The light or dark theme choice is saved in browser local storage rather than a cookie. The value is used only to apply the chosen theme before the page paints, which helps avoid a first-load colour flicker.",
      },
      {
        title: "No advertising profile",
        body: "The site is not designed as an ad-tech property and does not rely on behavioural advertising cookies.",
      },
      {
        title: "Managing preferences",
        body: "Visitors can clear local browser storage or use browser privacy controls to remove saved theme preferences at any time.",
      },
    ],
  },
} as const;
