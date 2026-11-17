export const CATEGORIES = [
  {
    id: "Technology",
    name: "Technology",
    badge: "Tech & AI",
    iconName: "Cpu",
    count: 5,
    description: "Explore AI breakthroughs, cloud infrastructure, cybersecurity, and next-gen developer tooling.",
    image: "/assets/categories/cat_technology.webp"
  },
  {
    id: "Business",
    name: "Business",
    badge: "Growth & Capital",
    iconName: "Briefcase",
    count: 3,
    description: "Connect with global venture capitalists, fintech visionaries, and executive leadership pioneers.",
    image: "/assets/categories/cat_business.webp"
  },
  {
    id: "Design",
    name: "Design",
    badge: "UI/UX & Creative",
    iconName: "Palette",
    count: 3,
    description: "Master modern design systems, motion graphics, enterprise design sprints, and user craft.",
    image: "/assets/categories/cat_design.webp"
  },
  {
    id: "Education",
    name: "Education",
    badge: "Academia & EdTech",
    iconName: "GraduationCap",
    count: 2,
    description: "Discover revolutionary EdTech platforms, pedagogical AI tools, and higher-ed research forums.",
    image: "/assets/categories/cat_education.webp"
  }
];

export const SPEAKERS = [
  {
    id: "sp-1",
    name: "Dr. Elena Vance",
    role: "Chief AI Scientist",
    company: "QuantumCorp Research",
    image: "/assets/speakers/speaker_elena.webp",
    bio: "Pioneer in transformer architectures and neural symbolic computing with 15+ years across Stanford and CERN.",
    social: { twitter: "https://twitter.com", linkedin: "https://linkedin.com" }
  },
  {
    id: "sp-2",
    name: "Marcus Thorne",
    role: "VP of Cloud Platform",
    company: "CloudScale Global",
    image: "/assets/speakers/speaker_marcus.webp",
    bio: "Architecting hyper-scale distributed infrastructure serving over 400M daily active requests globally.",
    social: { twitter: "https://twitter.com", linkedin: "https://linkedin.com" }
  },
  {
    id: "sp-3",
    name: "Aisha Patel",
    role: "Head of Product Design",
    company: "Figma Studio Lab",
    image: "/assets/speakers/speaker_aisha.webp",
    bio: "Key advocate for accessible, tokens-first enterprise design systems and author of 'The Atomic Design Shift'.",
    social: { twitter: "https://twitter.com", linkedin: "https://linkedin.com" }
  },
  {
    id: "sp-4",
    name: "David Kim",
    role: "Managing Partner",
    company: "Apex Ventures & Partners",
    image: "/assets/speakers/speaker_david.webp",
    bio: "Early-stage investor in 14 unicorns across enterprise SaaS, AI infrastructure, and frontier robotics.",
    social: { twitter: "https://twitter.com", linkedin: "https://linkedin.com" }
  },
  {
    id: "sp-5",
    name: "Sarah Jenkins",
    role: "Director of Educational Tech",
    company: "Cambridge Global Institute",
    image: "/assets/speakers/speaker_sarah.webp",
    bio: "Leading research on adaptive learning algorithms and personalized student assessment frameworks worldwide.",
    social: { twitter: "https://twitter.com", linkedin: "https://linkedin.com" }
  },
  {
    id: "sp-6",
    name: "Javier Rodriguez",
    role: "Chief Cyber Defense Officer",
    company: "Sentinel Labs",
    image: "/assets/speakers/speaker_javier.webp",
    bio: "Former intelligence cyber strategist specializing in zero-trust architectures and automated threat mitigation.",
    social: { twitter: "https://twitter.com", linkedin: "https://linkedin.com" }
  },
  {
    id: "sp-7",
    name: "Priya Sharma",
    role: "Principal Big Data Architect",
    company: "NeuralBase Systems",
    image: "/assets/speakers/speaker_priya.webp",
    bio: "Building streaming machine learning pipelines and real-time inference engines for autonomous systems.",
    social: { twitter: "https://twitter.com", linkedin: "https://linkedin.com" }
  },
  {
    id: "sp-8",
    name: "Alex Rivera",
    role: "Executive Creative Director",
    company: "Studio Pulse & Motion",
    image: "/assets/speakers/speaker_alex.webp",
    bio: "Emmy-winning creative director blending cinematic motion design with interactive WebGL experiences.",
    social: { twitter: "https://twitter.com", linkedin: "https://linkedin.com" }
  }
];

export const EVENTS = [
  {
    id: "event-ai-summit-2026",
    title: "Global AI & Quantum Computing Summit 2026",
    tagline: "Unveiling the Frontier of Artificial General Intelligence and Quantum Algorithms",
    category: "Technology",
    date: "2026-12-14",
    formattedDate: "December 14, 2026",
    time: "09:00 AM – 05:30 PM EST",
    location: "San Francisco, CA",
    venue: "Moscone Center – West Hall, 747 Howard St",
    isFeatured: true,
    isMajorUpcoming: true,
    price: "$299",
    type: "Conference & Keynote",
    image: "/assets/events/event_ai_summit.webp",
    bannerImage: "/assets/general/hero_event.webp",
    totalSeats: 350,
    availableSeats: 28,
    shortDescription: "Join 3,000+ engineers, researchers, and tech founders to explore generative agent pipelines, quantum machine learning, and high-performance neural compute.",
    description: "The Global AI & Quantum Computing Summit is the premier gathering for software architects, data scientists, and frontier technology executives. Across two action-packed days, discover groundbreaking developments in foundation models, hardware acceleration, and the practical convergence of quantum circuits with neural networks. Gain direct insights from world-renowned keynote speakers, participate in interactive technical workshops, and network with leading enterprise engineering teams.",
    highlights: [
      "Keynote addresses from leading Stanford and CERN quantum researchers",
      "Live demonstrations of quantum computing algorithms running on real qpu hardware",
      "Hands-on architectural review of 100B+ parameter generative pipelines",
      "Exclusive VIP executive networking dinner and investor meet-and-greet",
      "Full digital access to all session recordings and speaker slide decks"
    ],
    agenda: [
      { time: "09:00 AM", title: "Registration, Breakfast & Exhibition Open", speaker: "Stackly Welcome Team" },
      { time: "10:00 AM", title: "Opening Keynote: The Quantum Leap in Transformer Architectures", speaker: "Dr. Elena Vance" },
      { time: "11:30 AM", title: "Breakout: Hardware Acceleration & GPU Cluster Optimization", speaker: "Marcus Thorne" },
      { time: "01:00 PM", title: "Catered Executive Networking Lunch & Tech Demo Booths", speaker: "All Attendees" },
      { time: "02:15 PM", title: "Deep Dive: Streaming Neural Inference at Scale", speaker: "Priya Sharma" },
      { time: "04:00 PM", title: "Panel: Safety, Alignment and the Next Decade of Enterprise AI", speaker: "Panel of Industry Leaders" },
      { time: "05:00 PM", title: "Closing Remarks & Networking Cocktail Reception", speaker: "Stackly Team" }
    ],
    speakers: ["sp-1", "sp-2", "sp-7"],
    tags: ["Artificial Intelligence", "Quantum", "Machine Learning", "Cloud"]
  },
  {
    id: "event-fintech-forum",
    title: "NextGen Fintech & Digital Assets Forum",
    tagline: "Navigating Open Banking, Decentralized Liquidity, and Global Regulatory Shifts",
    category: "Business",
    date: "2026-12-18",
    formattedDate: "December 18, 2026",
    time: "09:30 AM – 04:45 PM EST",
    location: "New York, NY",
    venue: "Metropolitan Pavilion, 125 W 18th St",
    isFeatured: true,
    price: "$249",
    type: "Summit & Roundtable",
    image: "/assets/events/event_fintech_forum.webp",
    bannerImage: "/assets/events/event_fintech_forum.webp",
    totalSeats: 250,
    availableSeats: 14,
    shortDescription: "Explore the intersection of cross-border financial rails, institutional digital asset custody, and real-time algorithmic risk modeling.",
    description: "The NextGen Fintech & Digital Assets Forum unites financial leaders, tier-1 venture investors, regulatory experts, and high-frequency fintech pioneers. Delve into real-world case studies detailing the modernization of core banking infrastructure, compliance-first digital asset protocols, and AI-driven automated underwriting.",
    highlights: [
      "Fireside chats with leading venture capitalists and sovereign wealth fund managers",
      "Analysis of real-time payment rails (FedNow, SEPA Instant) and global interoperability",
      "Workshops on algorithmic liquidity management and fraud defense",
      "Networking breakfast connecting 60+ pre-seed to Series B fintech founders"
    ],
    agenda: [
      { time: "09:30 AM", title: "Morning Welcome & Breakfast Lounge", speaker: "Host" },
      { time: "10:15 AM", title: "The Next Decade of Cross-Border Settlement", speaker: "David Kim" },
      { time: "11:45 AM", title: "Regulatory Realism: Compliance in Distributed Finance", speaker: "Guest Panel" },
      { time: "01:00 PM", title: "Networking Luncheon & Founder Showcases", speaker: "All Attendees" },
      { time: "02:30 PM", title: "AI in Predictive Underwriting & Fraud Prevention", speaker: "Marcus Thorne" },
      { time: "04:15 PM", title: "Fintech Pitch Competition & Award Ceremony", speaker: "Venture Jury" }
    ],
    speakers: ["sp-4", "sp-2"],
    tags: ["Fintech", "Banking", "Venture Capital", "Finance"]
  },
  {
    id: "event-ux-design-craft",
    title: "UX/UI Design Craft & Product Strategy 2026",
    tagline: "Elevating User Experiences from First Wireframe to Global Production Scale",
    category: "Design",
    date: "2026-12-21",
    formattedDate: "December 21, 2026",
    time: "10:00 AM – 05:00 PM GMT",
    location: "London, UK",
    venue: "King's Place Conference Centre, 9 York Way",
    isFeatured: true,
    price: "Free",
    type: "Design Masterclass",
    image: "/assets/events/event_ux_craft.webp",
    bannerImage: "/assets/events/event_ux_craft.webp",
    totalSeats: 200,
    availableSeats: 35,
    shortDescription: "A hands-on masterclass dedicated to world-class user research methodologies, micro-interactions, and conversion-centered product ergonomics.",
    description: "Craft is the competitive differentiator of 2026. Join Europe's premier product designers, design system engineers, and creative leads for an immersive deep dive into user research synthesis, design token governance, and emotional micro-interactions that captivate modern audiences.",
    highlights: [
      "Real-world critique sessions reviewing live SaaS and consumer mobile apps",
      "Figma variable workflows and responsive typography masterclass",
      "User research methodologies that surface hidden user pain points",
      "Certificate of Completion verified by Stackly Design Guild"
    ],
    agenda: [
      { time: "10:00 AM", title: "Design Sprint Kickoff & Welcome Coffee", speaker: "Stackly Design Guild" },
      { time: "10:45 AM", title: "The Anatomy of Micro-Interactions", speaker: "Aisha Patel" },
      { time: "12:15 PM", title: "Interactive Workshop: From User Interview to Wireframe", speaker: "Alex Rivera" },
      { time: "01:30 PM", title: "Creative Community Lunch", speaker: "All Attendees" },
      { time: "02:45 PM", title: "Design Systems in the Age of Spatial & AI UI", speaker: "Aisha Patel" },
      { time: "04:15 PM", title: "Portfolio Reviews & Q&A Open Stage", speaker: "Alex Rivera" }
    ],
    speakers: ["sp-3", "sp-8"],
    tags: ["UX Design", "Figma", "Product Strategy", "UI"]
  },
  {
    id: "event-cloud-devops",
    title: "Cloud Architecture & DevOps Days 2026",
    tagline: "Mastering Zero-Downtime Deployments, Kubernetes at Scale, and GitOps",
    category: "Technology",
    date: "2026-12-28",
    formattedDate: "December 28, 2026",
    time: "08:30 AM – 04:30 PM PST",
    location: "San Francisco, CA",
    venue: "Yerba Buena Center for the Arts, 701 Mission St",
    isFeatured: false,
    price: "$199",
    type: "Technical Summit",
    image: "/assets/events/event_cloud_devops.webp",
    bannerImage: "/assets/events/event_cloud_devops.webp",
    totalSeats: 300,
    availableSeats: 42,
    shortDescription: "Dive into cloud-native scalability, multi-region failover automation, serverless observability, and automated infrastructure as code.",
    description: "Scale with confidence. Cloud Architecture & DevOps Days delivers battle-tested blueprints for high-availability cloud deployments. Hear directly from principal cloud architects on managing thousands of microservices, cutting cloud expenditure by 40%, and maintaining ironclad reliability.",
    highlights: [
      "In-depth analysis of multi-cloud Kubernetes orchestration challenges",
      "Automated CI/CD pipelines with integrated security scanning",
      "FinOps strategies that drastically optimize compute infrastructure spend",
      "Interactive troubleshooting clinic with live outage simulation"
    ],
    agenda: [
      { time: "08:30 AM", title: "Check-in & Morning Refreshments", speaker: "Host" },
      { time: "09:15 AM", title: "Designing for 99.999% SLA in Distributed Environments", speaker: "Marcus Thorne" },
      { time: "11:00 AM", title: "Observability Metrics: Tracing the Needle in the Cloud Haystack", speaker: "Priya Sharma" },
      { time: "12:30 PM", title: "Engineers Lunch & Networking Hall", speaker: "All Attendees" },
      { time: "01:45 PM", title: "Workshop: Zero-Trust Mesh & Infrastructure as Code", speaker: "Javier Rodriguez" },
      { time: "03:30 PM", title: "Lightning Talks & Engineering Roundtable", speaker: "Community Speakers" }
    ],
    speakers: ["sp-2", "sp-6", "sp-7"],
    tags: ["DevOps", "Kubernetes", "Cloud", "SRE"]
  },
  {
    id: "event-edtech-future",
    title: "Future of Learning: Global EdTech Expo",
    tagline: "Transforming K-12 and Higher Education Through Adaptive Technologies",
    category: "Education",
    date: "2027-01-08",
    formattedDate: "January 08, 2027",
    time: "09:00 AM – 05:00 PM CET",
    location: "Berlin, Germany",
    venue: "Berlin Congress Center (bcc), Alexanderstraße 11",
    isFeatured: true,
    price: "Free",
    type: "Expo & Symposia",
    image: "/assets/events/event_edtech_expo.webp",
    bannerImage: "/assets/events/event_edtech_expo.webp",
    totalSeats: 400,
    availableSeats: 68,
    shortDescription: "Explore AI personalized tutoring, immersive STEM laboratories, and scalable lifelong education systems reshaping modern schools.",
    description: "The Global EdTech Expo convenes over 1,500 educators, university chancellors, learning scientists, and technology innovators. Experience firsthand the revolutionary digital classrooms, adaptive curriculum generators, and accessibility tools breaking geographic barriers.",
    highlights: [
      "Keynote on generative AI in curriculum design and personalized feedback",
      "Showcase of 40+ leading EdTech startups from across Europe and the US",
      "Policy roundtables addressing student data privacy and algorithmic equity",
      "Free teacher training and resource toolkits provided to all participants"
    ],
    agenda: [
      { time: "09:00 AM", title: "Registration & EdTech Exhibition Opening", speaker: "Berlin Host" },
      { time: "09:45 AM", title: "Keynote: Individualized Learning at Population Scale", speaker: "Sarah Jenkins" },
      { time: "11:15 AM", title: "Panel: Bridging the Digital Divide in Secondary Education", speaker: "Academic Leaders" },
      { time: "01:00 PM", title: "Networking Luncheon & Interactive Demos", speaker: "All Attendees" },
      { time: "02:30 PM", title: "Hands-on: Building Interactive Virtual Classrooms", speaker: "Sarah Jenkins" },
      { time: "04:15 PM", title: "EdTech Innovation Pitch & Grant Awards", speaker: "Stackly Education Fund" }
    ],
    speakers: ["sp-5"],
    tags: ["EdTech", "Education", "Innovation", "Teaching"]
  },
  {
    id: "event-women-leadership",
    title: "Executive Women in Leadership Conference",
    tagline: "Empowering Next-Generation Executives Across Tech, Venture, and Enterprise",
    category: "Business",
    date: "2027-01-14",
    formattedDate: "January 14, 2027",
    time: "10:00 AM – 06:00 PM EST",
    location: "New York, NY",
    venue: "The Glasshouse, 660 12th Ave",
    isFeatured: false,
    price: "$179",
    type: "Conference & Mentorship",
    image: "/assets/events/event_women_leadership.webp",
    bannerImage: "/assets/events/event_women_leadership.webp",
    totalSeats: 220,
    availableSeats: 19,
    shortDescription: "A high-impact gathering featuring keynote leadership panels, executive negotiation workshops, and curated peer mentorship circles.",
    description: "Designed for ambitious directors, VPs, and founders, this conference delivers actionable strategies for navigating corporate boardrooms, securing Series A-C venture capital, and building resilient organizational cultures that outperform the market.",
    highlights: [
      "Executive salary and equity negotiation masterclass",
      "1-on-1 speed mentorship sessions with Fortune 500 C-suite leaders",
      "Interactive crisis leadership and investor relations simulations",
      "Exclusive alumni network membership with quarterly follow-up sessions"
    ],
    agenda: [
      { time: "10:00 AM", title: "Breakfast, Networking & Badge Collection", speaker: "Host" },
      { time: "10:45 AM", title: "Keynote: Leading Through Market Volatility", speaker: "Dr. Elena Vance" },
      { time: "12:00 PM", title: "The Art of the Strategic Boardroom Presentation", speaker: "Aisha Patel" },
      { time: "01:15 PM", title: "Executive Mentorship Luncheon", speaker: "All Attendees" },
      { time: "03:00 PM", title: "Workshop: Building High-Performance Remote Teams", speaker: "Guest Mentors" },
      { time: "05:00 PM", title: "Cocktail Hour & Leadership Network Circle", speaker: "Stackly Executive Guild" }
    ],
    speakers: ["sp-1", "sp-3"],
    tags: ["Leadership", "Business", "Executive", "Mentorship"]
  },
  {
    id: "event-design-systems-summit",
    title: "Enterprise Design Systems & Figma Deep Dive",
    tagline: "Architecting Reusable Component Libraries, Design Tokens, and Code Sync",
    category: "Design",
    date: "2027-01-20",
    formattedDate: "January 20, 2027",
    time: "09:30 AM – 04:30 PM PST",
    location: "San Francisco, CA",
    venue: "San Francisco Marriott Marquis, 780 Mission St",
    isFeatured: false,
    price: "$149",
    type: "Hands-on Workshop",
    image: "/assets/events/event_design_systems.webp",
    bannerImage: "/assets/events/event_design_systems.webp",
    totalSeats: 180,
    availableSeats: 11,
    shortDescription: "Learn how global technology companies synchronize multi-brand design tokens between Figma and production React codebases seamlessly.",
    description: "Bridge the gap between design and engineering. This intense one-day workshop covers the full design token lifecycle: naming conventions, multi-platform theming, dark mode semantics, automated visual regression testing, and creating seamless developer handoffs.",
    highlights: [
      "Live teardown of enterprise design systems at scale (Spotify, Uber, Stripe)",
      "Automated token pipeline setup using GitHub Actions and Style Dictionary",
      "Building accessible components conforming to WCAG 2.2 AAA guidelines",
      "Take-home design system starter repository in Figma and React"
    ],
    agenda: [
      { time: "09:30 AM", title: "Welcome & Token Taxonomy Overview", speaker: "Aisha Patel" },
      { time: "10:30 AM", title: "Figma Variables: Modes, Scopes, and Collections", speaker: "Aisha Patel" },
      { time: "12:00 PM", title: "Hands-on Exercise: Building Accessible Primitive Sets", speaker: "Workshop Lab" },
      { time: "01:00 PM", title: "Lunch Break & Peer System Demos", speaker: "All Attendees" },
      { time: "02:00 PM", title: "Connecting Figma to React: Automated Token CI/CD", speaker: "Alex Rivera" },
      { time: "03:45 PM", title: "Governance, Versioning, and Design System Adoption", speaker: "Panel & Q&A" }
    ],
    speakers: ["sp-3", "sp-8"],
    tags: ["Design Systems", "Figma", "React", "Frontend"]
  },
  {
    id: "event-cyber-defense-2027",
    title: "CyberSec Defense & Ethical Hacking Symposium",
    tagline: "Hardening Critical Infrastructure Against Advanced Persistent Threats",
    category: "Technology",
    date: "2027-01-26",
    formattedDate: "January 26, 2027",
    time: "09:00 AM – 06:00 PM JST",
    location: "Tokyo, Japan",
    venue: "Tokyo International Forum, 3-5-1 Marunouchi, Chiyoda-ku",
    isFeatured: true,
    price: "$299",
    type: "Symposium & Live Lab",
    image: "/assets/events/event_cyber_defense.webp",
    bannerImage: "/assets/events/event_cyber_defense.webp",
    totalSeats: 260,
    availableSeats: 22,
    shortDescription: "Real-world red-team exercises, zero-day threat simulations, API vulnerabilities, and AI-accelerated malware analysis.",
    description: "The premier cybersecurity conference in the Asia-Pacific region. Gathering top offensive security researchers, enterprise CISOs, and ethical hackers to stress-test real-world attack vectors, examine post-quantum encryption protocols, and explore next-generation SOC automation.",
    highlights: [
      "Live Capture-The-Flag (CTF) tournament with $10,000 in bounties",
      "Hardware hacking village testing IoT vulnerabilities and firmware extraction",
      "Analysis of nation-state threat intelligence and supply-chain exploits",
      "Direct networking with security recruiters from global defense and finance firms"
    ],
    agenda: [
      { time: "09:00 AM", title: "Security Briefing & Tournament Registration", speaker: "Tokyo Ops" },
      { time: "10:00 AM", title: "Keynote: Zero-Trust Realities in Multi-Cloud Enterprises", speaker: "Javier Rodriguez" },
      { time: "11:30 AM", title: "Live Demonstration: Attacking AI Model Weights & APIs", speaker: "Dr. Elena Vance" },
      { time: "01:00 PM", title: "Networking Lunch & CTF Kickoff", speaker: "All Attendees" },
      { time: "02:30 PM", title: "Workshop: Automated Incident Response & EDR Forensics", speaker: "Javier Rodriguez" },
      { time: "05:00 PM", title: "CTF Awards Ceremony & Networking Mixer", speaker: "Symposium Judges" }
    ],
    speakers: ["sp-6", "sp-1"],
    tags: ["Cybersecurity", "InfoSec", "Ethical Hacking", "Zero-Trust"]
  },
  {
    id: "event-venture-pitch-summit",
    title: "Global Startup Pitch & Venture Capital Summit",
    tagline: "Connecting 50 High-Growth Early-Stage Startups with Top-Tier Global Investors",
    category: "Business",
    date: "2027-02-04",
    formattedDate: "February 04, 2027",
    time: "10:00 AM – 06:30 PM GMT",
    location: "London, UK",
    venue: "Tobacco Dock, Tobacco Quay, Wapping Ln",
    isFeatured: false,
    price: "$199",
    type: "Pitch Summit & Expo",
    image: "/assets/events/event_venture_pitch.webp",
    bannerImage: "/assets/events/event_venture_pitch.webp",
    totalSeats: 300,
    availableSeats: 31,
    shortDescription: "Experience 50 curated Seed and Series A pitches across AI, sustainability, healthcare, and developer tools in front of 120+ active venture partners.",
    description: "The Global Startup Pitch & Venture Capital Summit is the definitive launchpad for high-growth tech enterprises. Startups pitch on the main stage, while 1-on-1 investor matchmaking suites host hundreds of confidential investment discussions throughout the day.",
    highlights: [
      "Over $500M in deployable venture capital represented by attending funds",
      "Guaranteed minimum 3 curated investor meetings for participating founders",
      "Workshops on term sheet negotiation, cap table hygiene, and scaling past $10M ARR",
      "Celebratory startup showcase cocktail reception on the Thames"
    ],
    agenda: [
      { time: "10:00 AM", title: "Founder-Investor Registration & VIP Lounge", speaker: "Stackly Ventures" },
      { time: "10:45 AM", title: "Keynote: What Top VCs Look for in 2027 Startups", speaker: "David Kim" },
      { time: "11:45 AM", title: "Batch 1 Pitches: Enterprise AI & Developer Tools", speaker: "15 Startups" },
      { time: "01:15 PM", title: "Investor Matchmaking Luncheon", speaker: "All Attendees" },
      { time: "02:30 PM", title: "Batch 2 Pitches: ClimateTech, Bio & Fintech", speaker: "20 Startups" },
      { time: "05:00 PM", title: "Summit Winner Announcement & Investment Offers", speaker: "David Kim & Jury" },
      { time: "05:45 PM", title: "Evening Networking Reception", speaker: "All Attendees" }
    ],
    speakers: ["sp-4"],
    tags: ["Startups", "Venture Capital", "Fundraising", "Pitching"]
  },
  {
    id: "event-data-science-masterclass",
    title: "Applied Machine Learning & Big Data Workshop",
    tagline: "Building High-Throughput Feature Stores, Real-Time Inference, and MLOps",
    category: "Technology",
    date: "2027-02-12",
    formattedDate: "February 12, 2027",
    time: "09:00 AM – 04:00 PM EST",
    location: "Online / Virtual",
    venue: "Stackly Virtual Conference Campus (Interactive 3D Stages)",
    isFeatured: false,
    price: "Free",
    type: "Virtual Workshop",
    image: "/assets/events/event_data_science.webp",
    bannerImage: "/assets/events/event_data_science.webp",
    totalSeats: 500,
    availableSeats: 85,
    shortDescription: "A comprehensive virtual workshop covering Ray, Apache Spark, vector database optimization, and continuous model drift monitoring in production.",
    description: "Designed for intermediate to senior data engineers and ML practitioners. Learn directly how industry-leading teams maintain data quality at petabyte scale, construct low-latency feature stores, and deploy vector embeddings for instant semantic search.",
    highlights: [
      "Access to pre-configured cloud GPU sandboxes for all participants",
      "Live code walkthrough implementing high-speed RAG with vector indices",
      "Best practices for detecting data drift, concept drift, and model decay",
      "Interactive Discord community channel with dedicated mentor assistance"
    ],
    agenda: [
      { time: "09:00 AM", title: "Virtual Campus Opens & Environment Setup Check", speaker: "Tech Leads" },
      { time: "09:30 AM", title: "Architecture: Petabyte Data Pipelines with Spark & Ray", speaker: "Priya Sharma" },
      { time: "11:00 AM", title: "Lab 1: Deploying Vector Embeddings with Milvus & Pinecone", speaker: "Priya Sharma" },
      { time: "12:30 PM", title: "Virtual Networking Lounges & Coffee Break", speaker: "Community" },
      { time: "01:30 PM", title: "Lab 2: Automated MLOps & Model Monitoring in Production", speaker: "Marcus Thorne" },
      { time: "03:15 PM", title: "Live Q&A and Certification Distribution", speaker: "Priya Sharma" }
    ],
    speakers: ["sp-7", "sp-2"],
    tags: ["Data Science", "Machine Learning", "Python", "MLOps"]
  },
  {
    id: "event-stem-innovators-forum",
    title: "STEM Academic Leadership & Research Forum",
    tagline: "Connecting Groundbreaking University Laboratories with Global Industry R&D",
    category: "Education",
    date: "2027-02-19",
    formattedDate: "February 19, 2027",
    time: "09:30 AM – 05:00 PM CET",
    location: "Berlin, Germany",
    venue: "Humboldt Graduate Center, Unter den Linden 6",
    isFeatured: false,
    price: "$99",
    type: "Academic Forum",
    image: "/assets/events/event_stem_innovators.webp",
    bannerImage: "/assets/events/event_stem_innovators.webp",
    totalSeats: 160,
    availableSeats: 15,
    shortDescription: "Fostering collaboration between elite academic researchers, doctoral fellows, and corporate R&D teams in nanotechnology, biosensing, and robotics.",
    description: "Bridging the gap between cutting-edge academic discoveries and commercialization. The STEM Academic Leadership Forum features paper presentations, patent licensing discussions, and grant funding workshops designed to translate laboratory breakthroughs into scalable enterprise products.",
    highlights: [
      "Presentation of 20 peer-reviewed research papers across biotech and robotics",
      "Panel on navigating intellectual property and university technology transfer",
      "Matchmaking sessions between PhD candidates and leading enterprise R&D labs",
      "Publication in the annual Stackly STEM Research Proceedings"
    ],
    agenda: [
      { time: "09:30 AM", title: "Academic Welcome & Registration", speaker: "Faculty Board" },
      { time: "10:15 AM", title: "Keynote: Commercializing Fundamental Scientific Research", speaker: "Sarah Jenkins" },
      { time: "11:45 AM", title: "Research Track 1: Applied Nanotechnology & Sensors", speaker: "Visiting Professors" },
      { time: "01:00 PM", title: "Faculty & Industry Luncheon", speaker: "All Attendees" },
      { time: "02:15 PM", title: "Research Track 2: Neural Interfaces & Humanoid Robotics", speaker: "Dr. Elena Vance" },
      { time: "04:00 PM", title: "Grant Funding & Research Fellowship Awards", speaker: "Sarah Jenkins" }
    ],
    speakers: ["sp-5", "sp-1"],
    tags: ["STEM", "Research", "Robotics", "Academia"]
  },
  {
    id: "event-brand-motion-design",
    title: "Brand Identity & Motion Design Masterclass",
    tagline: "Infusing Dynamic Visual Storytelling, 3D Typography, and Kinetic Systems",
    category: "Design",
    date: "2027-02-27",
    formattedDate: "February 27, 2027",
    time: "10:00 AM – 05:30 PM GMT",
    location: "London, UK",
    venue: "Somerset House – River Rooms, Strand",
    isFeatured: false,
    price: "$169",
    type: "Masterclass & Studio",
    image: "/assets/events/event_brand_motion.webp",
    bannerImage: "/assets/events/event_brand_motion.webp",
    totalSeats: 150,
    availableSeats: 8,
    shortDescription: "A premier creative masterclass uncovering the secrets of kinetic brand typography, 3D brand toolkits, and dynamic interactive identity systems.",
    description: "Static brands are a thing of the past. In this intensive masterclass led by celebrated creative directors, explore how motion principles define modern digital brands. Learn how to choreograph fluid transitions, build generative brand guidelines, and export optimized assets for high-performance web and mobile products.",
    highlights: [
      "In-depth breakdown of award-winning brand identity case studies",
      "Live After Effects, Cinema 4D, and Rive motion workflow demonstrations",
      "Guidelines for translating kinetic brand rules into CSS and WebGL code",
      "Personalized creative critiques of your brand portfolio or studio reel"
    ],
    agenda: [
      { time: "10:00 AM", title: "Doors Open, Coffee & Visual Inspiration Gallery", speaker: "Host" },
      { time: "10:45 AM", title: "Motion as Brand Identity: The Principles of Kinetic Systems", speaker: "Alex Rivera" },
      { time: "12:15 PM", title: "Hands-on: Choreographing Responsive 3D Brand Assets", speaker: "Alex Rivera" },
      { time: "01:30 PM", title: "Creative Directors Lunch & Studio Showcase", speaker: "All Attendees" },
      { time: "02:45 PM", title: "Exporting for the Web: Rive, Lottie, and Code Integration", speaker: "Aisha Patel" },
      { time: "04:30 PM", title: "Live Portfolio Review & Creative Networking Drinks", speaker: "Alex Rivera" }
    ],
    speakers: ["sp-8", "sp-3"],
    tags: ["Motion Design", "Branding", "3D Typography", "Creative"]
  }
];

export const TESTIMONIALS = [
  {
    id: "test-1",
    name: "Jessica Miller",
    role: "Lead Product Manager",
    company: "Stripe",
    avatar: "/assets/testimonials/avatar_jessica.webp",
    rating: 5,
    quote: "Stackly conferences are in a league of their own. The caliber of speakers, the immaculate scheduling, and the direct access to frontier engineering leads transformed our product roadmap for the entire year.",
    eventAttended: "Global AI & Quantum Computing Summit"
  },
  {
    id: "test-2",
    name: "Daniel Chen",
    role: "Senior Frontend Architect",
    company: "Vercel",
    avatar: "/assets/testimonials/avatar_daniel.webp",
    rating: 5,
    quote: "Registering through Stackly was effortless. The instant badge generation, live schedule updates, and responsive website made attending in-person workshops frictionless. An indispensable platform for modern professionals.",
    eventAttended: "Enterprise Design Systems Summit"
  },
  {
    id: "test-3",
    name: "Amira Al-Mansoor",
    role: "Design Director",
    company: "Spotify Design",
    avatar: "/assets/testimonials/avatar_amira.webp",
    rating: 5,
    quote: "The visual presentation and curation of events on Stackly sets a gold standard. The workshops are deeply practical, providing tangible takeaways that our team implemented the very next Monday.",
    eventAttended: "UX/UI Design Craft & Product Strategy"
  },
  {
    id: "test-4",
    name: "Thomas Wright",
    role: "Founder & CEO",
    company: "Horizon Ventures",
    avatar: "/assets/testimonials/avatar_thomas.webp",
    rating: 5,
    quote: "As an investor, Stackly is my go-to hub for discovering high-signal business summits and founder showcases. The networking sessions facilitated through their platform have resulted in three major syndicate deals.",
    eventAttended: "Global Startup Pitch & VC Summit"
  }
];

export const STATS = [
  { value: "50,000+", label: "Active Attendees", description: "Global professionals and leaders" },
  { value: "140+", label: "Curated Conferences", description: "Across 24 premier host cities" },
  { value: "98.8%", label: "Satisfaction Rate", description: "Verified post-event feedback" },
  { value: "350+", label: "Industry Keynotes", description: "From Fortune 500 & frontier labs" }
];

export const WHY_CHOOSE_US = [
  {
    icon: "Award",
    title: "World-Class Keynotes",
    description: "Learn directly from researchers, venture partners, and executives shaping the frontier of tech, design, and business.",
    image: "/assets/general/hero_event.webp"
  },
  {
    icon: "Users",
    title: "Curated High-Signal Networking",
    description: "Connect with verified attendees, founders, and hiring directors through structured roundtables and VIP receptions.",
    image: "/assets/general/about_conference.webp"
  },
  {
    icon: "Compass",
    title: "Verified Hands-On Workshops",
    description: "Every masterclass is vetted for rigorous practical application, live coding, and actionable enterprise playbooks.",
    image: "/assets/general/about_workshop.webp"
  },
  {
    icon: "Zap",
    title: "Instant Digital Passes & Certificates",
    description: "Immediate registration confirmation, digital QR admission passes, and verifiable certificates of completion.",
    image: "/assets/events/event_cloud_devops.webp"
  },
  {
    icon: "ShieldCheck",
    title: "Seamless Self-Service Management",
    description: "Cancel, update, or transfer your registration anytime with zero friction right from your personal dashboard.",
    image: "/assets/events/event_data_science.webp"
  },
  {
    icon: "Globe",
    title: "Hybrid & Global Access",
    description: "Attend in person at world-renowned venues or participate live with interactive high-definition virtual campuses.",
    image: "/assets/events/event_cyber_defense.webp"
  }
];
