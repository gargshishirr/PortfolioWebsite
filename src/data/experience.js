import microsoft from "../assets/logos/microsoft.webp";
import lumiq from "../assets/logos/lumiq.webp";
import districtd from "../assets/logos/districtd.webp";

export const experience = [
  {
    role: "Software Engineer",
    team: "OneLake Security · Microsoft Fabric",
    organisation: "Microsoft",
    logo: microsoft,
    start: "Jun 2025",
    end: "Present",
    current: true,
    summary:
      "I build large-scale distributed systems for OneLake, the data lake behind Microsoft Fabric. My services enforce access control for SQL, Kusto, Spark and Power BI at query time, at billions of requests a month.",
    metrics: [
      { value: "Billions", label: "requests a month across 4+ engines" },
      { value: "−96%", label: "p99 latency on partner APIs" },
      { value: "−90%", label: "role-mutation payload size" },
      { value: "~7,000", label: "nodes running my Redis cache" },
    ],
    points: [
      "Shipped granular role-management CRUD APIs for OneLake's RBAC platform, replacing coarse batch updates with per-role operations to cut role-mutation payloads by 90% and enable safe concurrent edits.",
      "Cut p99 latency of partner APIs by 96% by parallelizing service fan-out and adding an ETag-versioned cache, reducing per-table security lookups from O(N) to O(1).",
      "Built service-to-service OneSecurity APIs (row/column security, role metadata, RLS bitmaps) that SQL, Kusto, Spark and Power BI call at query time, enforcing RBAC across 4+ engines at billions of requests a month.",
      "Designed a dedicated Redis cache for OneLake security data, rolled out across 57 caches and nearly 7,000 nodes.",
      "Cut p99 latency by up to 74% in production by caching translated row-level security rules for role-metadata APIs.",
      "Built the fix for a high-severity MSRC vulnerability and root-caused production incidents in OneLake APIs.",
      "Led design reviews, authored design docs and TSGs for OneLake security, and mentored engineers through implementation and code reviews.",
    ],
    tags: ["C#", ".NET 8", "ASP.NET Core", "Azure", "Redis", "Kusto / KQL", "Distributed systems", "RBAC"],
  },
  {
    role: "Software Engineering Intern",
    team: "OneLake · Microsoft Fabric",
    organisation: "Microsoft",
    logo: microsoft,
    start: "May 2024",
    end: "Jul 2024",
    note: "Returned full-time in June 2025",
    points: [
      "Designed and shipped a public batch shortcut-creation API for OneLake in C#/.NET, collapsing many calls into one request to reduce partition-node latency and load.",
      "Learned Microsoft Fabric's architecture end to end and backed the service-layer integration with comprehensive unit and integration tests.",
      "Worked in an agile scrum team, took part in code reviews and delivered a production-ready feature.",
    ],
    tags: ["C#", ".NET", "REST APIs", "OneLake"],
  },
  {
    role: "DevOps Intern",
    organisation: "Lumiq.AI",
    logo: lumiq,
    start: "Jun 2023",
    end: "Jul 2023",
    points: [
      "Automated deployment of a containerized Nginx endpoint on AWS EC2 with Terraform and Docker, replacing manual setup with one-command provisioning.",
      "Worked with AWS Lambda, API Gateway and EC2, Linux and shell, SSL certificates, and SSH access to VMs and containers.",
    ],
    tags: ["AWS", "Terraform", "Docker", "Linux"],
  },
  {
    role: "Software Engineering Intern",
    organisation: "DistrictD",
    logo: districtd,
    start: "May 2023",
    end: "Jun 2023",
    points: [
      "Built C++/Node.js APIs to sync data from a master to child databases with success loopbacks and proper logging, in an agile, scrum-based team.",
    ],
    tags: ["C++", "Node.js", "Agile"],
  },
];

export const achievements = [
  {
    icon: "🏆",
    title: "JEE Advanced AIR 9090",
    detail: "JEE Main: 99.17 percentile (AIR 8422)",
  },
  {
    icon: "🏸",
    title: "Captain, DTU Badminton Team",
    detail: "5 All-India inter-university tournament wins and runner-up at the Open Delhi State Championship",
  },
  {
    icon: "📷",
    title: "Founder & Head, DTU Photography Society",
    detail: "Started the society and covered 6 major events and national college fests",
  },
];
