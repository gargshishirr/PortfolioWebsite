import { projects } from "./projects";

const groups = [
  {
    title: "Languages",
    skills: ["C#", "Java", "TypeScript", "JavaScript", "Python", "C++", "C", "SQL", "KQL", "Kotlin"],
  },
  {
    title: "Backend & distributed systems",
    skills: [
      ".NET 8",
      "ASP.NET Core",
      "Spring Boot",
      "Node.js",
      "Express",
      "FastAPI",
      "Kafka",
      "Redis",
      "Socket.io",
      "Microservices",
      "RBAC",
    ],
  },
  {
    title: "Data & storage",
    skills: ["PostgreSQL", "SQLite", "MongoDB", "MySQL", "Prisma", "Kusto", "Delta Lake", "Apache Iceberg"],
  },
  {
    title: "Cloud & DevOps",
    skills: ["Azure", "AWS", "Docker", "Terraform", "Prometheus", "Grafana", "Linux", "Git"],
  },
  {
    title: "Frontend & mobile",
    skills: ["React", "React Native", "Expo", "Vite", "CSS Modules", "HTML", "CSS"],
  },
  {
    title: "Testing, automation & ML",
    skills: ["Playwright", "pytest", "Hypothesis", "Vitest", "Jest", "TensorFlow", "Keras", "pandas", "scikit-learn"],
  },
];

export const projectsUsing = (skill) =>
  projects.filter((project) => project.stack.includes(skill));

export const skillGroups = groups.map((group) => ({
  ...group,
  skills: group.skills.map((name) => ({
    name,
    count: projectsUsing(name).length,
  })),
}));

export const allStackItems = [
  ...new Set(projects.flatMap((project) => project.stack)),
].sort((a, b) => a.localeCompare(b));
