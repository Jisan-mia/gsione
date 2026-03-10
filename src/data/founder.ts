export interface Publication {
  id: number
  title: string
  authors: string
  year: string
  venue: string
  type: 'journal' | 'book' | 'policy-brief' | 'media'
  url?: string
  doi?: string
}

export interface Expertise {
  title: string
  description: string
}

export const founderInfo = {
  name: 'Asheer Shah',
  title: 'Founder & Director',
  organization: 'Governance and Security Initiative (GSi)',
  email: 'asheer.gsi@gmail.com',
  linkedin: 'https://www.linkedin.com/in/asheer-shah',
  
  image: '/founder.jpg',
  
  biography: {
    intro: 'Asheer Shah is the Founder and Director of the Governance and Security Initiative (GSi), an independent policy research platform dedicated to advancing governance solutions for cybersecurity, emerging technologies, climate security, and international affairs. His work focuses on the intersection of digital security, artificial intelligence governance, and geopolitical risk in an increasingly technology-driven world.',
    
    education: [
      {
        degree: "Master's in Cybersecurity Governance",
        institution: 'Leiden University, Netherlands',
        focus: 'Cyber espionage, digital crime, behavioral cybersecurity, and artificial intelligence governance'
      },
      {
        degree: "Bachelor's in Global Studies and Governance",
        institution: 'Independent University, Bangladesh',
        focus: 'Minor in Economics'
      }
    ],
    
    experience: [
      {
        role: 'Clingendael Institute',
        organization: 'Netherlands',
        description: 'Delivered training programs on global AI governance models for diplomats and humanitarian professionals.'
      },
      {
        role: 'Research Associate',
        organization: 'Bangladesh Institute of Peace and Security Studies',
        description: 'Contributed to policy research on cyber governance, misinformation, climate security, and regional strategic affairs.'
      }
    ]
  },
  
  expertise: [
    {
      title: 'Cybersecurity Governance',
      description: 'Developing frameworks for national and organizational cybersecurity strategies'
    },
    {
      title: 'Artificial Intelligence Governance and Ethics',
      description: 'Policy frameworks for responsible AI development and deployment'
    },
    {
      title: 'Behavioral Cybersecurity',
      description: 'Understanding human factors in security decision-making'
    },
    {
      title: 'Cyber Espionage and Digital Crime',
      description: 'Analysis of state-sponsored cyber operations and digital threats'
    },
    {
      title: 'Technology Policy and Global Governance',
      description: 'International cooperation on emerging technology regulation'
    },
    {
      title: 'Climate Security',
      description: 'Nexus of climate change and security policy'
    },
    {
      title: 'Indo-Pacific Strategic Affairs',
      description: 'Regional security dynamics in the Indo-Pacific'
    }
  ],
  
  publications: [
    {
      id: 1,
      title: 'High-Tech US-Israel-Iran War: The Homecoming of AI',
      authors: 'Shah, A.',
      year: '2024',
      venue: 'The Daily Star – Geopolitical Insights',
      type: 'media' as const
    },
    {
      id: 2,
      title: 'Role of renewable energy policy in ensuring net-zero carbon emissions and energy sustainability: A Bangladesh perspective',
      authors: 'Islam, E., Shah, A., & Karim, T. A.',
      year: '2023',
      venue: 'Moving Toward Net-Zero Carbon Society (Springer, Cham)',
      type: 'book' as const,
      doi: 'https://doi.org/10.1007/978-3-031-24545-9_4'
    },
    {
      id: 3,
      title: 'Strengthening the role of Bimstec: Route to Asian Union',
      authors: 'Shah, Md. A.',
      year: '2022',
      venue: 'Journal of International Affairs, 24(1)',
      type: 'journal' as const,
      doi: 'https://doi.org/10.58710/jiav24n1y2022a01'
    },
    {
      id: 4,
      title: 'The urgency of common Bay of Bengal climate security framework',
      authors: 'Shah, A.',
      year: '2023',
      venue: 'Peace and Security Review, 12(26), 23–46',
      type: 'journal' as const
    },
    {
      id: 5,
      title: "Bangladesh's Economic Development & the Bay of Bengal",
      authors: 'Hussain, I. A., Shah, A., & Marjuk, O.',
      year: '2022',
      venue: 'The Financial Express',
      type: 'media' as const
    },
    {
      id: 6,
      title: 'Asian Cyber Security Community (ACSC): A collaborative approach to Cyber Governance and Management',
      authors: 'Shah, A.',
      year: '2023',
      venue: 'BIPSS Policy Brief',
      type: 'policy-brief' as const
    },
    {
      id: 7,
      title: 'G20 Global Crypto Policy: Digital Asset Security and governance',
      authors: 'Shah, A.',
      year: '2023',
      venue: 'BIPSS Policy Analysis',
      type: 'policy-brief' as const
    },
    {
      id: 8,
      title: "Voter's Guide for Bangladesh Elections 2023",
      authors: 'Shah, A.',
      year: '2023',
      venue: 'Prothom Alo',
      type: 'media' as const
    }
  ],
  
  mediaEngagement: {
    highlight: 'Asheer frequently contributes analysis and commentary on cybersecurity, emerging technologies, geopolitics, and global governance. He recently appeared in a live interview with The Daily Star\'s Geopolitical Insights, where he discussed the evolving risks of spyware and AI-driven warfare.',
    outlets: ['The Daily Star', 'The Financial Express', 'Prothom Alo', 'Peace and Security Review', 'BIPSS']
  }
}

export const gsiSocialLinks = {
  linkedin: 'https://www.linkedin.com/company/gsi-dhaka/',
  facebook: 'https://www.facebook.com/share/1AmTQ9jbVu/?mibextid=wwXIfr',
  instagram: 'https://www.instagram.com/gsi.rangpur?igsh=cmxnMXYxZ2d2bmZ2&utm_source=qr',
  email: 'asheer.gsi@gmail.com'
}

export const featuredPublications = founderInfo.publications.slice(0, 4)
