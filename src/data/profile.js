import photo from "../assets/profile.webp";

export const profile = {
  name: "Shishir Garg",
  firstName: "Shishir",
  role: "Software Engineer",
  company: "Microsoft",
  team: "OneLake Security",
  location: "India",
  photo,
  email: "gargshishirr@gmail.com",
  resume: `${import.meta.env.BASE_URL}Shishir-Garg-Resume.pdf`,
  education: {
    degree: "B.Tech, Computer Engineering",
    school: "Delhi Technological University",
    short: "DTU",
    years: "2021 – 2025",
    grade: "CGPA 8.61",
  },
  intro:
    "I'm a software engineer at Microsoft, building large-scale distributed systems for OneLake, the data lake behind Microsoft Fabric. Outside work I build side projects, from a fail-closed ad gate to a multiplayer coding arena.",
  about: [
    "I studied Computer Engineering at Delhi Technological University, interned on Microsoft's OneLake team in 2024 and joined full-time in 2025. These days I work on the distributed services that decide who can see which rows and columns, at billions of requests a month.",
    "I like the invisible parts of software: hot paths measured in milliseconds, caches that have to be correct, and systems that stay honest when a dependency goes down. Off the keyboard you'll find me on a badminton court, behind a camera, gaming, watching movies or hunting for good food.",
  ],
  socials: [
    {
      label: "GitHub",
      handle: "@gargshishirr",
      href: "https://github.com/gargshishirr",
    },
    {
      label: "LinkedIn",
      handle: "in/shishir-garg-86a308209",
      href: "https://www.linkedin.com/in/shishir-garg-86a308209/",
    },
    {
      label: "LeetCode",
      handle: "@Hawkeye101",
      href: "https://leetcode.com/Hawkeye101",
    },
  ],
};
