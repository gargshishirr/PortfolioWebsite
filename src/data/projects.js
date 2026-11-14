import accessdeskApproval from "../assets/projects/accessdesk-approval.webp";
import accessdeskAudit from "../assets/projects/accessdesk-audit.webp";
import accessdeskMobile from "../assets/projects/accessdesk-mobile.webp";
import boggle from "../assets/projects/boggle.webp";
import kharchaAdd from "../assets/projects/kharcha-add.webp";
import kharchaHistory from "../assets/projects/kharcha-history.webp";
import kharchaInsights from "../assets/projects/kharcha-insights.webp";
import kharchaSplit from "../assets/projects/kharcha-split.webp";
import pathfinder from "../assets/projects/pathfinder.webp";
import pinterest from "../assets/projects/pinterest.webp";
import proctorcode from "../assets/projects/proctorcode.webp";
import reqlab from "../assets/projects/reqlab.webp";
import wanderlyDark from "../assets/projects/wanderly-dark.webp";
import wanderlyDiscover from "../assets/projects/wanderly-discover.webp";
import wanderlyMatch from "../assets/projects/wanderly-match.webp";
import wanderlyTrips from "../assets/projects/wanderly-trips.webp";

const GITHUB = "https://github.com/gargshishirr";

export const categories = [
  {
    id: "backend",
    label: "Backend & Infra",
    constellation: "The Engine",
    color: "var(--cyan)",
  },
  {
    id: "products",
    label: "Full-stack Products",
    constellation: "The Arena",
    color: "var(--violet)",
  },
  {
    id: "mobile",
    label: "Mobile & Frontend",
    constellation: "The Pocket",
    color: "var(--mint)",
  },
  {
    id: "algorithms",
    label: "Algorithms & ML",
    constellation: "The Lab",
    color: "var(--pink)",
  },
];

export const projects = [
  {
    slug: "adgate",
    title: "AdGate",
    category: "backend",
    year: 2026,
    featured: true,
    visibility: "public",
    tagline: "Real-time ad eligibility that fails closed, and tells you why.",
    summary:
      "The gate an ad server calls inline on every request. In a few milliseconds it decides which candidate ads may serve, enforcing daily budgets and even pacing from a near-real-time Kafka spend pipeline, placement and keyword policy, and invalid-traffic checks. If any signal is missing, stale or unreachable, it declines with a structured reason code instead of serving optimistically.",
    stack: [
      "Java",
      "Spring Boot",
      "Kafka",
      "Redis",
      "Lua",
      "Resilience4j",
      "Prometheus",
      "Grafana",
      "Docker",
    ],
    highlights: [
      "One pipelined Redis round trip on the hot path returns an atomic snapshot of spend, partition watermarks and the device's traffic counter.",
      "Effectively-once spend accounting: at-least-once Kafka delivery feeds an idempotent Redis Lua ledger.",
      "Per-partition low watermarks prove spend freshness, so a stalled partition fails closed only the campaigns it carries.",
      "Decisions are a pure function of (request, state snapshot), so any recent decision can be explained and replayed exactly.",
      "Timeouts, a circuit breaker, bounded reconnect backoff and readiness-gated warm-up. Analytics publishing never blocks serving.",
    ],
    metrics: [
      { value: "2.5–3.5 ms", label: "p50 latency at 150 req/s" },
      { value: "0 / 13,498", label: "requests errored, incl. injected failures" },
      { value: "495 / 495", label: "charges applied exactly once through a 21 s Redis outage" },
      { value: "15,749", label: "decision records published, 0 dropped" },
    ],
    links: { source: `${GITHUB}/adgate` },
    images: [],
  },
  {
    slug: "codebattle",
    title: "CodeBattle",
    category: "products",
    year: 2026,
    featured: true,
    visibility: "private",
    tagline: "Real-time coding battles with friends, judged live.",
    summary:
      "Create a room, share the code and race your friends on classic data-structures and algorithms problems. A LeetCode-style editor and sandboxed judge runs JavaScript, Python and C++ against hidden tests, while a live scoreboard, chat and Elo ratings keep it competitive.",
    stack: [
      "React",
      "Node.js",
      "Express",
      "Socket.io",
      "CodeMirror",
      "SQLite",
      "Docker",
      "C++",
      "Python",
    ],
    highlights: [
      "100 original problems (30 Easy, 55 Medium, 15 Hard) across 14 topics, with LeetCode-style starter code.",
      "Judge for JavaScript, Python 3 and C++20 with full verdicts: Accepted, Wrong Answer, Runtime Error, Time Limit, Memory Limit and Compile Error.",
      "Sandboxed execution: macOS sandbox-exec with no network or file writes, or an unprivileged user with CPU, memory and file-size limits in Docker.",
      "Rooms for 1–10 players with ICPC-style penalties, chat, spectators, sudden-death mode, rematches and quick 1v1 matchmaking.",
      "Elo ratings, rating charts, a global leaderboard and a practice mode with submission history.",
    ],
    metrics: [
      { value: "100", label: "original DSA problems" },
      { value: "3", label: "judged languages" },
      { value: "1–10", label: "players per battle" },
      { value: "14", label: "problem topics" },
    ],
    links: {},
    images: [],
  },
  {
    slug: "wanderly",
    title: "Wanderly",
    category: "products",
    year: 2026,
    featured: true,
    visibility: "private",
    tagline: "Find someone to travel with, matched on real trip overlap.",
    summary:
      "Wanderly matches people heading to the same place at the same time, shows exactly what they have in common, and opens a chat once both say yes. Hosts can open their trips to others, with group chats, references and safety tools built in.",
    stack: [
      "React",
      "TypeScript",
      "Vite",
      "Express",
      "Prisma",
      "PostgreSQL",
      "Server-Sent Events",
      "Capacitor",
      "Zod",
    ],
    highlights: [
      "Trips come first: overlapping trips rank highest, and every card gives honest reasons such as “Both in Marrakech, 2–6 Dec” instead of a made-up score.",
      "Swipe deck with undo, requests to join trips, trip group chats and post-trip references.",
      "Live messages, matches and requests over a single Server-Sent Events stream, with a polling fallback.",
      "Safety by design: women-only mode, two-way report and block, and verified-email badges.",
      "OKLCH design tokens with WCAG AA contrast in light and dark themes. Every screen passes an axe-core scan.",
    ],
    metrics: [
      { value: "4,000+", label: "cities for distance matching" },
      { value: "1", label: "live-update stream per app" },
      { value: "AA", label: "contrast in both themes" },
    ],
    links: { live: "https://wanderly-fna8.onrender.com" },
    images: [
      { src: wanderlyDiscover, kind: "desktop", alt: "Wanderly Discover screen on desktop: a traveller card with shared trip reasons next to their trips and interests" },
      { src: wanderlyMatch, kind: "phone", alt: "Wanderly match dialog on a phone with a Matched stamp" },
      { src: wanderlyTrips, kind: "phone", alt: "Wanderly trip card on a phone with photo, host, dates and budget" },
      { src: wanderlyDark, kind: "desktop", alt: "Wanderly trip deck in dark mode" },
    ],
  },
  {
    slug: "kharcha",
    title: "Kharcha",
    category: "mobile",
    year: 2026,
    featured: true,
    visibility: "private",
    tagline: "One-tap expense tracking for India, with UPI auto-import.",
    summary:
      "Log a spend in one tap, see where the money goes, and split bills with friends. On Android, a native module auto-imports UPI payments from GPay, PhonePe, Paytm and bank SMS, and everything stays on the phone with no sign-up.",
    stack: ["React Native", "Expo", "TypeScript", "Kotlin", "Expo Router", "Jest"],
    highlights: [
      "Amount-first keypad: type the amount, tap a category, done.",
      "A native Kotlin module captures UPI payments from GPay, PhonePe, Paytm and bank SMS on Android.",
      "Splitwise-style splits with friends and groups, settled up through UPI.",
      "CSV statement import for banks, Paytm and GPay, plus monthly budgets and category insights.",
      "Private by design: local-only storage and no account.",
    ],
    metrics: [
      { value: "1 tap", label: "to log a spend" },
      { value: "22", label: "designed screens" },
      { value: "0", label: "sign-ups required" },
    ],
    links: {},
    images: [
      { src: kharchaAdd, kind: "phone", alt: "Kharcha add-expense keypad showing ₹250" },
      { src: kharchaSplit, kind: "phone", alt: "Kharcha split screen with group balances" },
      { src: kharchaInsights, kind: "phone", alt: "Kharcha insights with budget ring and category breakdown" },
      { src: kharchaHistory, kind: "phone", alt: "Kharcha history list of auto-imported UPI payments" },
    ],
  },
  {
    slug: "proctorcode",
    title: "ProctorCode",
    category: "products",
    year: 2026,
    featured: false,
    visibility: "public",
    tagline: "AI-proctored coding assessments with a live integrity score.",
    summary:
      "Candidates take timed coding tests in a locked-down, monitored environment, while administrators author tests and review integrity reports with a violation timeline and the submitted code.",
    stack: [
      "React",
      "Vite",
      "Node.js",
      "Express",
      "SQLite",
      "face-api.js",
      "Monaco Editor",
      "JWT",
    ],
    highlights: [
      "Webcam gaze and face tracking with face-api.js flags looking away, no face and multiple faces.",
      "Detects tab switches, window changes, clipboard use and fullscreen exits, and blocks dev-tools, print and right-click.",
      "A live integrity score drops with every violation, and a session that hits 0 is terminated automatically.",
      "Monaco editor with countdown, autosave and a sandboxed Web Worker JavaScript runner.",
      "JWT auth with admin and candidate roles, on SQLite via Node's built-in node:sqlite.",
    ],
    metrics: [
      { value: "Live", label: "integrity scoring" },
      { value: "2", label: "roles: admin and candidate" },
    ],
    links: {
      live: "https://proctorcode.onrender.com",
      source: `${GITHUB}/proctorcode`,
    },
    images: [
      { src: proctorcode, kind: "desktop", alt: "ProctorCode sign-in page listing AI gaze tracking, environment lockdown and clipboard guard" },
    ],
  },
  {
    slug: "accessdesk",
    title: "AccessDesk",
    category: "backend",
    year: 2026,
    featured: false,
    visibility: "public",
    tagline: "Just-in-time access requests with a tamper-evident audit log.",
    summary:
      "Employees request temporary access to internal systems, the right approvers say yes or no, access ends on its own, and every change lands in a hash-chained audit log. Built to WCAG 2.2 AA with zero JavaScript.",
    stack: ["Python", "FastAPI", "SQLite", "Hypothesis", "Playwright", "axe-core", "Prometheus"],
    highlights: [
      "A property-tested policy routes approvals by resource sensitivity and role. Critical and admin access always add security.",
      "Four-eyes by construction, and separation-of-duties rules re-checked at final approval, so parallel approvals can never combine into a forbidden pair.",
      "Grants expire automatically: the check API refuses access the second a grant expires, even before the sweeper runs.",
      "SHA-256 hash-chained audit entries are written in the same transaction, and verification points to the first tampered entry.",
      "Concurrency-safe with BEGIN IMMEDIATE and versioned requests. Strict CSP, CSRF tokens and open-redirect protection.",
    ],
    metrics: [
      { value: "2.2 AA", label: "WCAG target" },
      { value: "0 KB", label: "JavaScript shipped" },
      { value: "SHA-256", label: "hash-chained audit log" },
    ],
    links: { source: `${GITHUB}/accessdesk` },
    images: [
      { src: accessdeskApproval, kind: "desktop", alt: "AccessDesk approval page for a payroll admin console request" },
      { src: accessdeskAudit, kind: "desktop", alt: "AccessDesk audit log with a verified hash chain" },
      { src: accessdeskMobile, kind: "phone", alt: "AccessDesk request details on a narrow mobile screen" },
    ],
  },
  {
    slug: "reqlab",
    title: "ReqLab",
    category: "backend",
    year: 2026,
    featured: false,
    visibility: "public",
    tagline: "A self-hostable, Postman-style API client with no build step.",
    summary:
      "Build, send and inspect HTTP requests from a clean web UI with collections, environments, history and code generation, backed by a tiny stateless Node.js proxy so the browser is never blocked by CORS.",
    stack: ["Node.js", "Express", "JavaScript", "HTML", "CSS", "Docker"],
    highlights: [
      "Every HTTP method, params synced two-way with the URL, raw, form and multipart bodies, and Bearer, Basic or API-key auth.",
      "A server-side proxy bypasses CORS and captures status, headers, timing and size, with an optional SSRF guard for private hosts.",
      "Collections, tabs, history and environments with {{variables}} resolved everywhere.",
      "Exports requests as cURL or fetch, and imports Postman v2 collections.",
      "Secrets never leave the browser: everything lives in localStorage and the server writes nothing to disk.",
    ],
    metrics: [
      { value: "1", label: "runtime dependency" },
      { value: "0", label: "build steps" },
      { value: "7", label: "HTTP methods" },
    ],
    links: { source: `${GITHUB}/reqlab` },
    images: [
      { src: reqlab, kind: "desktop", alt: "ReqLab sending a GET request to the GitHub API with a pretty-printed JSON response" },
    ],
  },
  {
    slug: "crypto-forecasting",
    title: "Crypto Price Forecasting",
    category: "algorithms",
    year: 2025,
    featured: false,
    visibility: "private",
    tagline: "A comparative study of deep-learning models for Bitcoin prices.",
    summary:
      "A research project that benchmarks recurrent, convolutional and attention-based neural networks on several Bitcoin price datasets to compare how well each architecture forecasts price movement.",
    stack: ["Python", "TensorFlow", "Keras", "pandas", "NumPy", "scikit-learn", "Jupyter"],
    highlights: [
      "Compares LSTM, GRU, 1-D CNN and Transformer (multi-head attention) architectures.",
      "Data from CryptoCompare, CoinGecko and CoinAPI, including 10 years of daily prices and 1-minute BTC/USD data.",
      "Regularized training with L2 penalties and early stopping, evaluated with RMSE.",
    ],
    metrics: [
      { value: "4", label: "architectures compared" },
      { value: "10 yrs", label: "of daily price data" },
    ],
    links: {},
    images: [],
  },
  {
    slug: "pathfinder",
    title: "Pathfinder Visualiser",
    category: "algorithms",
    year: 2025,
    featured: false,
    visibility: "public",
    tagline: "Watch pathfinding and maze algorithms think, one cell at a time.",
    summary:
      "An interactive grid where you draw walls, place a source and a target, generate mazes, and watch search algorithms explore the grid and trace the shortest path in real time.",
    stack: ["JavaScript", "HTML", "CSS"],
    highlights: [
      "Animates searches such as Dijkstra, BFS and Greedy Best-First across the grid.",
      "Generates mazes, or lets you draw walls by hand.",
      "Colour-coded visited cells and the final path make each algorithm's behaviour easy to compare.",
    ],
    metrics: [],
    links: {
      live: "https://pathfinder-visualiser-tau.vercel.app",
      source: `${GITHUB}/Pathfinder_Visualiser`,
    },
    images: [
      { src: pathfinder, kind: "desktop", alt: "Pathfinding Visualizer grid showing visited cells, walls and a yellow shortest path" },
    ],
  },
  {
    slug: "pinterest-clone",
    title: "Pinterest Clone",
    category: "products",
    year: 2025,
    featured: false,
    visibility: "public",
    tagline: "A full-stack Pinterest clone with auth, uploads and a feed.",
    summary:
      "An end-to-end Pinterest-style app: register and log in, upload images to your profile, and browse a shared feed, rendered server-side with EJS.",
    stack: ["Node.js", "Express", "MongoDB", "Mongoose", "EJS", "Passport.js", "Multer"],
    highlights: [
      "Session-based authentication with Passport local strategy.",
      "Image uploads with Multer, stored against the user's profile.",
      "Feed and profile pages rendered server-side with EJS.",
    ],
    metrics: [],
    links: { source: `${GITHUB}/PinterestClone` },
    images: [
      { src: pinterest, kind: "desktop", alt: "Pinterest Clone sign-up screen" },
    ],
  },
  {
    slug: "mangoplay",
    title: "MangoPlay",
    category: "backend",
    year: 2024,
    featured: false,
    visibility: "public",
    tagline: "Backend foundations for a real-time app.",
    summary:
      "The backend groundwork for a real-time app: an Express server on MongoDB with Socket.io, environment-based configuration and centralised error handling.",
    stack: ["Node.js", "Express", "MongoDB", "Mongoose", "Socket.io"],
    highlights: [
      "Express server with a Mongoose connection layer and environment-based config.",
      "Centralised not-found and error-handling middleware.",
      "Socket.io and validator set up as the base for real-time features and input validation.",
    ],
    metrics: [],
    links: { source: `${GITHUB}/MangoPlay` },
    images: [],
  },
  {
    slug: "boggle",
    title: "Boggle Solver",
    category: "algorithms",
    year: 2023,
    featured: false,
    visibility: "public",
    tagline: "Finds every word on a random Boggle board with a Trie and DFS.",
    summary:
      "A C++ program that generates a random Boggle board, builds a Trie-based dictionary from an English word list, and finds every valid word on the board.",
    stack: ["C++", "Trie", "DFS"],
    highlights: [
      "Rolls a random 4×4 board from Boggle dice on every run.",
      "Loads an English word list into a Trie for fast prefix lookups.",
      "DFS with backtracking follows only prefixes that exist in the Trie, so dead ends are pruned immediately.",
    ],
    metrics: [],
    links: { source: `${GITHUB}/Boggle` },
    images: [{ src: boggle, kind: "square", alt: "A Boggle board of lettered dice" }],
  },
  {
    slug: "medrecords",
    title: "MedRecords",
    category: "mobile",
    year: 2023,
    featured: false,
    visibility: "public",
    tagline: "A clean React dashboard for medical records.",
    summary:
      "A medical-records dashboard UI built in React, with a sidebar, a top bar, a records listing and an activity feed, styled with SCSS.",
    stack: ["React", "SCSS", "JavaScript"],
    highlights: [
      "Component-based layout: sidebar, top section, listing and activity panels.",
      "A dedicated SCSS stylesheet per section for maintainable styling.",
    ],
    metrics: [],
    links: { source: `${GITHUB}/MedRecords` },
    images: [],
  },
  {
    slug: "parking-management",
    title: "Parking Management",
    category: "algorithms",
    year: 2023,
    featured: false,
    visibility: "public",
    tagline: "An object-oriented C++ system for parking records and earnings.",
    summary:
      "A console application that registers vehicles across five types, timestamps every entry and update, tracks earnings per vehicle type, and persists everything to files.",
    stack: ["C++", "OOP", "File I/O"],
    highlights: [
      "Object-oriented model (Vehicle extends VehicleType) covering cars, buses, trucks, bikes and cycles.",
      "Add, search, update and delete vehicle records with creation and update timestamps.",
      "Earnings tracked per vehicle type and persisted to file storage.",
    ],
    metrics: [],
    links: { source: `${GITHUB}/Parking-Management` },
    images: [],
  },
];

export const projectBySlug = Object.fromEntries(
  projects.map((project) => [project.slug, project]),
);

export const categoryById = Object.fromEntries(
  categories.map((category) => [category.id, category]),
);
