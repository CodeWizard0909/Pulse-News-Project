const articles = [
  // ─── FEATURED / BREAKING ───────────────────────────────────────
  {
    id: 0,
    category: "Technology",
    title: "OpenAI Unveils GPT-6: A New Era of Reasoning Machines",
    excerpt:
      "The latest foundation model demonstrates unprecedented chain-of-thought reasoning, scoring above human baselines on graduate-level science exams and redefining what consumers can expect from AI assistants.",
    source: "The Verge",
    time: "32 minutes ago",
    image: "https://picsum.photos/seed/breaking1/900/500",
    featured: true,
  },

  // ─── SPORTS ────────────────────────────────────────────────────
  {
    id: 1,
    category: "Sports",
    title: "Champions League Semi-Final: Madrid Stuns Bayern in Extra Time",
    excerpt:
      "A 94th-minute volley from Vinícius Jr. sealed a dramatic comeback at the Santiago Bernabéu, sending Real Madrid to their fourth consecutive final.",
    source: "ESPN",
    time: "1 hour ago",
    image: "https://picsum.photos/seed/sport1/600/400",
  },
  {
    id: 2,
    category: "Sports",
    title: "NBA Playoffs: Celtics and Thunder Emerge as Conference Favorites",
    excerpt:
      "Boston's smothering defense and OKC's explosive young core have made them the clear frontrunners heading into the second round of the 2026 playoffs.",
    source: "Bleacher Report",
    time: "3 hours ago",
    image: "https://picsum.photos/seed/sport2/600/400",
  },
  {
    id: 3,
    category: "Sports",
    title: "Formula 1: Verstappen Clinches Pole Position in Imola Qualifying",
    excerpt:
      "Max Verstappen's blistering 1:14.2 lap silenced critics who predicted Red Bull's decline, setting up a mouth-watering race day showdown with McLaren.",
    source: "Autosport",
    time: "5 hours ago",
    image: "https://picsum.photos/seed/sport3/600/400",
  },

  // ─── ARTIFICIAL INTELLIGENCE ───────────────────────────────────
  {
    id: 4,
    category: "Artificial Intelligence",
    title: "Google DeepMind's AlphaFold 4 Predicts Protein Interactions at Atomic Scale",
    excerpt:
      "The newest AlphaFold iteration models multi-protein complexes with near-experimental accuracy, potentially revolutionizing drug discovery timelines.",
    source: "Nature",
    time: "2 hours ago",
    image: "https://picsum.photos/seed/ai1/600/400",
  },
  {
    id: 5,
    category: "Artificial Intelligence",
    title: "EU Passes Landmark AI Liability Directive After Two-Year Debate",
    excerpt:
      "Companies deploying high-risk AI systems will now face strict liability for harms caused, a move Silicon Valley lobbyists had fought to water down.",
    source: "Reuters",
    time: "4 hours ago",
    image: "https://picsum.photos/seed/ai2/600/400",
  },
  {
    id: 6,
    category: "Artificial Intelligence",
    title: "Autonomous Coding Agents Ship Production Code at Fortune 500 Firms",
    excerpt:
      "A survey of 200 engineering leaders reveals that AI agents now write and merge roughly 18% of production code, up from 3% just twelve months ago.",
    source: "TechCrunch",
    time: "6 hours ago",
    image: "https://picsum.photos/seed/ai3/600/400",
  },

  // ─── DEFENSE ───────────────────────────────────────────────────
  {
    id: 7,
    category: "Defense",
    title: "Pentagon Awards $14B Contract for Next-Gen Stealth Drone Fleet",
    excerpt:
      "Northrop Grumman will produce the MQ-Next unmanned combat aerial vehicles designed to operate alongside sixth-generation manned fighters.",
    source: "Defense One",
    time: "1 hour ago",
    image: "https://picsum.photos/seed/def1/600/400",
  },
  {
    id: 8,
    category: "Defense",
    title: "NATO Deploys AI-Powered Cyber Shield Across Eastern Flank",
    excerpt:
      "A new automated threat-detection network can identify and neutralize state-sponsored intrusions in under 90 seconds, officials say.",
    source: "Jane's Defence",
    time: "7 hours ago",
    image: "https://picsum.photos/seed/def2/600/400",
  },
  {
    id: 9,
    category: "Defense",
    title: "India Successfully Tests Hypersonic Cruise Missile from Submarine Platform",
    excerpt:
      "The test marks a strategic milestone, placing India among a handful of nations with submarine-launched hypersonic strike capability.",
    source: "The Hindu",
    time: "9 hours ago",
    image: "https://picsum.photos/seed/def3/600/400",
  },

  // ─── ENTERTAINMENT ────────────────────────────────────────────
  {
    id: 10,
    category: "Entertainment",
    title: "Beyoncé's 'Renaissance World Tour' Film Breaks Opening-Day Records",
    excerpt:
      "The concert documentary earned $78 million globally on its first day, surpassing the records set by Taylor Swift's Eras Tour film.",
    source: "Variety",
    time: "45 minutes ago",
    image: "https://picsum.photos/seed/ent1/600/400",
  },
  {
    id: 11,
    category: "Entertainment",
    title: "Studio Ghibli Announces First-Ever Live-Action Series for Netflix",
    excerpt:
      "Hayao Miyazaki's studio will adapt 'The Wind Rises' into a six-part limited series, blending practical effects with hand-drawn animation overlays.",
    source: "Deadline",
    time: "3 hours ago",
    image: "https://picsum.photos/seed/ent2/600/400",
  },
  {
    id: 12,
    category: "Entertainment",
    title: "GTA VI Gameplay Reveal Draws 42 Million Concurrent Viewers",
    excerpt:
      "Rockstar's highly anticipated 25-minute gameplay showcase became the most-watched gaming event in history, eclipsing Fortnite's live concerts.",
    source: "IGN",
    time: "8 hours ago",
    image: "https://picsum.photos/seed/ent3/600/400",
  },

  // ─── BUSINESS ─────────────────────────────────────────────────
  {
    id: 13,
    category: "Business",
    title: "Apple Becomes First Company to Reach $5 Trillion Market Cap",
    excerpt:
      "Fueled by strong Vision Pro sales and services revenue, Apple crossed the historic threshold during Tuesday's trading session.",
    source: "Bloomberg",
    time: "2 hours ago",
    image: "https://picsum.photos/seed/biz1/600/400",
  },
  {
    id: 14,
    category: "Business",
    title: "Global Venture Capital Investment Surges 40% in Q1 2026",
    excerpt:
      "AI infrastructure and climate tech led the recovery, with mega-rounds above $100M accounting for nearly half of all funding.",
    source: "Financial Times",
    time: "5 hours ago",
    image: "https://picsum.photos/seed/biz2/600/400",
  },
  {
    id: 15,
    category: "Business",
    title: "Stripe Files Confidentially for IPO, Targeting $100B Valuation",
    excerpt:
      "The payments giant's long-awaited public listing could become the largest tech IPO since ARM's Nasdaq debut in 2023.",
    source: "Wall Street Journal",
    time: "10 hours ago",
    image: "https://picsum.photos/seed/biz3/600/400",
  },

  // ─── ARTS ─────────────────────────────────────────────────────
  {
    id: 16,
    category: "Arts",
    title: "Restored Vermeer Painting Reveals Hidden Second Figure Under X-Ray",
    excerpt:
      "Conservators at the Rijksmuseum discovered a previously unknown portrait beneath 'Girl with a Pearl Earring,' sparking worldwide intrigue.",
    source: "The Guardian",
    time: "4 hours ago",
    image: "https://picsum.photos/seed/art1/600/400",
  },
  {
    id: 17,
    category: "Arts",
    title: "Venice Biennale 2026 Opens with Immersive AI-Human Collaboration Pavilion",
    excerpt:
      "Artist Refik Anadol and a team of neuroscientists created a living sculpture that evolves based on visitors' brainwave patterns.",
    source: "Artnet News",
    time: "6 hours ago",
    image: "https://picsum.photos/seed/art2/600/400",
  },
  {
    id: 18,
    category: "Arts",
    title: "Pulitzer Prize for Fiction Goes to Debut Novelist from Lagos",
    excerpt:
      "Adaeze Okoro's 'The Cartographer's Daughter' was praised for its lyrical prose and unflinching portrayal of postcolonial identity.",
    source: "New York Times",
    time: "12 hours ago",
    image: "https://picsum.photos/seed/art3/600/400",
  },

  // ─── TECHNOLOGY ───────────────────────────────────────────────
  {
    id: 19,
    category: "Technology",
    title: "Rust Overtakes C++ in TIOBE Index for First Time",
    excerpt:
      "Memory-safe systems programming has reached a tipping point as major OS kernels and browsers increasingly adopt Rust as their default language.",
    source: "Ars Technica",
    time: "3 hours ago",
    image: "https://picsum.photos/seed/tech1/600/400",
  },
  {
    id: 20,
    category: "Technology",
    title: "SpaceX Starship Completes First Orbital Refueling Demo",
    excerpt:
      "Two Starship vehicles successfully transferred 150 tons of liquid oxygen in low-Earth orbit, a critical milestone for NASA's Artemis IV mission.",
    source: "SpaceNews",
    time: "5 hours ago",
    image: "https://picsum.photos/seed/tech2/600/400",
  },
  {
    id: 21,
    category: "Technology",
    title: "Samsung Unveils Tri-Fold Smartphone with 10-Inch Unfolded Display",
    excerpt:
      "The Galaxy Z Tri-Fold packs three seamless AMOLED panels into a device that folds down to standard phone size, shipping this summer.",
    source: "Wired",
    time: "7 hours ago",
    image: "https://picsum.photos/seed/tech3/600/400",
  },
  {
    id: 22,
    category: "Technology",
    title: "Mozilla Launches Privacy-First Cloud Suite to Rival Google Workspace",
    excerpt:
      "The open-source foundation's new productivity tools offer end-to-end encryption by default, targeting enterprises wary of Big Tech data practices.",
    source: "The Register",
    time: "11 hours ago",
    image: "https://picsum.photos/seed/tech4/600/400",
  },
];

export default articles;
