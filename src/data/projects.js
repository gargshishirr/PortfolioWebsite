import accessdeskAudit from "../assets/projects/accessdesk-audit.webp";
import accessdeskHome from "../assets/projects/accessdesk-home.webp";
import accessdeskMobile from "../assets/projects/accessdesk-mobile.webp";
import accessdeskRequest from "../assets/projects/accessdesk-request.webp";
import accessdeskSignin from "../assets/projects/accessdesk-signin.webp";
import accessdeskTimeline from "../assets/projects/accessdesk-timeline.webp";
import adgateChaos from "../assets/projects/adgate-chaos.webp";
import adgateExplain from "../assets/projects/adgate-explain.webp";
import adgateMobile from "../assets/projects/adgate-mobile.webp";
import adgatePlayground from "../assets/projects/adgate-playground.webp";
import boggleRun from "../assets/projects/boggle-run.webp";
import codebattleAccepted from "../assets/projects/codebattle-accepted.webp";
import codebattleBattle from "../assets/projects/codebattle-battle.webp";
import codebattleCreate from "../assets/projects/codebattle-create.webp";
import codebattleLobby from "../assets/projects/codebattle-lobby.webp";
import cryptoDataset from "../assets/projects/crypto-dataset.webp";
import medrecordsCard from "../assets/projects/medrecords-card.webp";
import medrecordsLabs from "../assets/projects/medrecords-labs.webp";
import medrecordsMobile from "../assets/projects/medrecords-mobile.webp";
import medrecordsOverview from "../assets/projects/medrecords-overview.webp";
import medrecordsSummary from "../assets/projects/medrecords-summary.webp";
import kharchaAdd from "../assets/projects/kharcha-add.webp";
import kharchaHistory from "../assets/projects/kharcha-history.webp";
import kharchaInsights from "../assets/projects/kharcha-insights.webp";
import kharchaSplit from "../assets/projects/kharcha-split.webp";
import pathfinder from "../assets/projects/pathfinder.webp";
import pinterest from "../assets/projects/pinterest.webp";
import proctorcode from "../assets/projects/proctorcode.webp";
import proctorcodeExam from "../assets/projects/proctorcode-exam.webp";
import proctorcodeReport from "../assets/projects/proctorcode-report.webp";
import reqlab from "../assets/projects/reqlab.webp";
import wanderlyDark from "../assets/projects/wanderly-dark.webp";
import wanderlyDiscover from "../assets/projects/wanderly-discover.webp";
import wanderlyMatch from "../assets/projects/wanderly-match.webp";
import wanderlyTrips from "../assets/projects/wanderly-trips.webp";

const GITHUB = "https://github.com/gargshishirr";

export const categories = [
  { id: "backend", label: "Backend & Tools", color: "var(--c-backend)" },
  { id: "products", label: "Full-stack Products", color: "var(--c-products)" },
  { id: "mobile", label: "Mobile & Frontend", color: "var(--c-mobile)" },
  { id: "algorithms", label: "Algorithms & ML", color: "var(--c-algorithms)" },
];

export const projects = [
  {
    slug: "adgate",
    title: "AdGate",
    category: "backend",
    year: 2026,
    featured: true,
    visibility: "public",
    tagline: "Real-time ad eligibility that fails closed. Try breaking it in your browser.",
    summary:
      "The gate an ad server calls inline on every request. In a few milliseconds it decides which candidate ads may serve, enforcing daily budgets and even pacing from a near-real-time Kafka spend pipeline, placement and keyword policy, and invalid-traffic checks. If any signal is missing, stale or unreachable, it declines with a structured reason code instead of serving optimistically. A browser playground lets anyone send requests, fast-forward the day and break Redis or Kafka to watch it fail closed.",
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
      "TypeScript",
      "Vite",
    ],
    highlights: [
      "A live playground runs the real decision rules in the browser, ported to TypeScript and proven identical to the Java engine on 906 golden test vectors.",
      "In the playground, chaos switches take down Redis, slow it, stall the spend pipeline or a single Kafka partition, and an Explain panel shows all 13 rules a decision went through.",
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
    links: {
      live: "https://gargshishirr.github.io/adgate/",
      source: `${GITHUB}/adgate`,
    },
    images: [
      { src: adgatePlayground, kind: "desktop", alt: "AdGate playground: a request composer, live traffic with spend tracking the even-pacing line, and chaos switches" },
      { src: adgateExplain, kind: "desktop", alt: "AdGate playground Explain panel: a PACING_THROTTLED decline with all 13 engine rules checked in order" },
      { src: adgateChaos, kind: "desktop", alt: "AdGate playground with slow Redis and a stalled Kafka partition switched on, and decisions failing closed with DEADLINE_EXCEEDED and SPEND_DATA_STALE" },
      { src: adgateMobile, kind: "phone", alt: "AdGate playground on a phone" },
    ],
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
    images: [
      { src: codebattleBattle, kind: "desktop", alt: "A live CodeBattle round: problem tabs, an accepted submission, and a scoreboard with solve times and a wrong-attempt penalty" },
      { src: codebattleAccepted, kind: "desktop", alt: "CodeBattle problem view with the Two Sum statement, a JavaScript solution and an Accepted verdict, 27 of 27 tests passed" },
      { src: codebattleLobby, kind: "desktop", alt: "CodeBattle room lobby with a room code, three players marked ready, and chat" },
      { src: codebattleCreate, kind: "desktop", alt: "CodeBattle create-room dialog with difficulty, topic, time limit, rated, sudden death and live code options" },
    ],
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
    links: { live: "https://gargshishirr.github.io/kharcha/" },
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
      { src: proctorcodeReport, kind: "desktop", alt: "ProctorCode admin integrity report: score 65 of 100, a violation timeline with no-face and window-switch events, and the submitted code" },
      { src: proctorcodeExam, kind: "desktop", alt: "A live ProctorCode exam: the AI proctor camera panel flagging no face detected, the problem statement, an activity monitor and the code editor" },
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
    tagline: "Temporary access, approved by the right people, ending on its own.",
    summary:
      "Employees request temporary access to internal systems, the right approvers say yes or no, access ends on its own, and every change lands in a hash-chained audit log. A guided demo walks you through the whole flow in about 60 seconds, signing you in as each person with one click. Built to WCAG 2.2 AA with zero JavaScript.",
    stack: ["Python", "FastAPI", "SQLite", "Hypothesis", "Playwright", "axe-core", "Prometheus"],
    highlights: [
      "A 60-second guided demo: one-click sign-in as the requester, their manager, the system owner and security, with a checklist that ticks off from real data.",
      "Before you submit, the form shows exactly who must approve and why, derived from the real policy and tested against it.",
      "A property-tested policy routes approvals by resource sensitivity and role. Critical and admin access always add security.",
      "Four-eyes by construction, and separation-of-duties rules re-checked at final approval, so parallel approvals can never combine into a forbidden pair.",
      "Grants expire automatically: the check API refuses access the second a grant expires, even before the sweeper runs.",
      "SHA-256 hash-chained audit entries are written in the same transaction, and verification points to the first tampered entry.",
      "Concurrency-safe with BEGIN IMMEDIATE and versioned requests. Strict CSP, CSRF tokens and open-redirect protection.",
    ],
    metrics: [
      { value: "60 s", label: "guided demo of the full flow" },
      { value: "265", label: "tests, incl. 36 browser accessibility checks" },
      { value: "0 KB", label: "JavaScript shipped" },
    ],
    links: { source: `${GITHUB}/accessdesk` },
    images: [
      { src: accessdeskSignin, kind: "desktop", alt: "AccessDesk demo sign-in with a guided-demo button and one-click persona cards for the requester, manager, resource owner and security reviewer" },
      { src: accessdeskHome, kind: "desktop", alt: "AccessDesk home with the 60-second guided checklist on step 3 and the requester's active access" },
      { src: accessdeskRequest, kind: "desktop", alt: "AccessDesk request form for Production Database with role cards, duration presets and a summary of who will approve" },
      { src: accessdeskTimeline, kind: "desktop", alt: "AccessDesk request timeline: requested, approved by the manager and the owner, granted, and ending on its own" },
      { src: accessdeskAudit, kind: "desktop", alt: "AccessDesk audit log with the hash chain verified" },
      { src: accessdeskMobile, kind: "phone", alt: "AccessDesk home on a phone" },
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
    tagline: "Four deep-learning architectures, one decade of hourly Bitcoin prices.",
    summary:
      "A research project that benchmarks recurrent, convolutional and attention-based networks on ten years of hourly BTC/USD candles, using a strict chronological split so every model is tested on a market regime it has never seen.",
    stack: ["Python", "TensorFlow", "Keras", "pandas", "NumPy", "scikit-learn", "Jupyter"],
    highlights: [
      "Compares LSTM, GRU, an L2-regularized 1-D CNN and a Transformer encoder with 4-head self-attention.",
      "Trains on 87,644 hourly candles from CryptoCompare (Feb 2015 to Feb 2025), with CoinGecko, CoinAPI and 1-minute BTC/USD data for cross-checks.",
      "Uses 60-hour sliding windows and a chronological 70/10/20 train/validation/test split, with scaling fitted on training data only to avoid look-ahead leakage.",
      "Uses early stopping and dropout, and compares models on RMSE, MAE and MAPE.",
    ],
    metrics: [
      { value: "87,644", label: "hourly candles" },
      { value: "4", label: "architectures compared" },
      { value: "60 h", label: "input window" },
    ],
    links: {},
    images: [
      { src: cryptoDataset, kind: "desktop", alt: "Chart of hourly BTC/USD closing prices from 2015 to 2025, shaded into 70% training, 10% validation and 20% test periods" },
    ],
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
      live: "https://gargshishirr.github.io/Pathfinder_Visualiser/",
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
    slug: "boggle",
    title: "Boggle Solver",
    category: "algorithms",
    year: 2023,
    featured: false,
    visibility: "public",
    tagline: "Finds every word on a random Boggle board with a Trie and DFS.",
    summary:
      "A C++ program that rolls a random board from the 16 classic Boggle dice, loads a 194,000-word dictionary into a Trie, and finds every valid word on the board in one pass.",
    stack: ["C++", "Trie", "DFS"],
    highlights: [
      "Rolls a fresh 4×4 board from the real Boggle dice on every run.",
      "Loads a 194,433-word English dictionary into a 26-way Trie for constant-time prefix checks.",
      "DFS with backtracking explores all 8 neighbours but only follows letters that continue a Trie prefix, so dead ends are pruned immediately.",
      "In six test runs it found between 70 and 136 words per board.",
    ],
    metrics: [
      { value: "194k", label: "dictionary words" },
      { value: "136", label: "words found on one board" },
      { value: "8", label: "neighbours searched per cell" },
    ],
    links: { source: `${GITHUB}/Boggle` },
    images: [
      { src: boggleRun, kind: "desktop", alt: "A Boggle board with the path of the longest word found, ORIENTS, next to the solver's terminal output listing 136 words" },
    ],
  },
  {
    slug: "medrecords",
    title: "MedRecords",
    category: "mobile",
    year: 2026,
    featured: true,
    visibility: "public",
    tagline: "Your family's health, in one calm place.",
    summary:
      "A private health-record app for a whole family. Profiles hold vitals with live status, a medication checklist with reminders, records with encrypted photos and PDFs, lab trends against reference ranges, a children's vaccine schedule, a one-page doctor summary and a printable emergency card. It installs like an app, works offline, and keeps everything in the browser, with no server and no account.",
    stack: ["React", "TypeScript", "Vite", "WebCrypto", "IndexedDB", "Service Worker", "React Router", "Vitest", "GitHub Actions"],
    highlights: [
      "Photos and PDFs attached to records are checked by their bytes, shrunk and stripped of GPS data, then encrypted with AES-GCM in IndexedDB.",
      "An optional passcode lock (PBKDF2 + AES-GCM) encrypts everything at rest, and backups carry the files without ever exporting the key.",
      "Reminders through .ics calendar files with alarms, plus notifications while open, and warnings when a new medicine clashes with an allergy.",
      "A one-page doctor summary to print or save as PDF, and a children's vaccine schedule that works out what is due from the birth date.",
      "Hand-built SVG lab charts that shade the reference range and flag out-of-range points, with keyboard tooltips and a table fallback.",
      "Installs as a PWA and works offline, meets WCAG AA in both themes, and is covered by 119 Vitest tests.",
    ],
    metrics: [
      { value: "3", label: "family profiles with 18 months of history" },
      { value: "119", label: "Vitest tests" },
      { value: "0", label: "servers: data stays in your browser" },
    ],
    links: {
      live: "https://gargshishirr.github.io/MedRecords/",
      source: `${GITHUB}/MedRecords`,
    },
    images: [
      { src: medrecordsOverview, kind: "desktop", alt: "MedRecords overview: vitals cards with sparklines and status pills, today's medication checklist, upcoming appointments and latest lab results" },
      { src: medrecordsSummary, kind: "desktop", alt: "MedRecords doctor summary: one page with allergies, conditions, current medicines, flagged lab results, latest readings and recent visits" },
      { src: medrecordsLabs, kind: "desktop", alt: "MedRecords lab trends: an LDL cholesterol line chart with a shaded reference range and a highlighted out-of-range point" },
      { src: medrecordsCard, kind: "desktop", alt: "MedRecords emergency card with blood group, allergies, conditions, medications, emergency contacts and a QR code" },
      { src: medrecordsMobile, kind: "phone", alt: "MedRecords overview on a phone with vitals cards and a bottom tab bar" },
    ],
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
