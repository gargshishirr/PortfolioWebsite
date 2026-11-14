import { projects } from "./projects";

const groups = [
  {
    title: "Languages",
    skills: ["Java", "TypeScript", "JavaScript", "Python", "C++", "C#", "Kotlin"],
  },
  {
    title: "Backend & data",
    skills: [
      "Spring Boot",
      "Node.js",
      "Express",
      "FastAPI",
      "Kafka",
      "Redis",
      "Socket.io",
      "Prisma",
      "PostgreSQL",
      "SQLite",
      "MongoDB",
      "MySQL",
    ],
  },
  {
    title: "Frontend & mobile",
    skills: ["React", "React Native", "Expo", "Vite", "HTML", "CSS", "SCSS"],
  },
  {
    title: "ML & data science",
    skills: ["TensorFlow", "Keras", "pandas", "scikit-learn", "Jupyter"],
  },
  {
    title: "Cloud & DevOps",
    skills: ["Docker", "AWS", "Azure", "Prometheus", "Grafana", "Linux"],
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
