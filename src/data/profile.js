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
  resume:
    "https://drive.google.com/file/d/1s2BG52Thgxuz6uA54qMmyhRoPQHB5m4M/view?usp=drive_link",
  education: {
    degree: "B.Tech, Computer Engineering",
    school: "Delhi Technological University",
    short: "DTU",
    years: "2021 – 2025",
    grade: "CGPA 8.61",
  },
  intro:
    "Software engineer at Microsoft building OneLake's access-control APIs. I build backend systems that fail safely, real-time products that feel instant, and tools people enjoy using.",
  about: [
    "I'm a software engineer at Microsoft on OneLake Security, the access-control layer of Microsoft Fabric. I interned on OneLake in 2024 and came back full-time in 2025. Today I build the APIs that SQL, Kusto, Spark and Power BI call to decide who can see which rows and columns.",
    "I like the hard, invisible parts of software: hot paths measured in milliseconds, caches that have to be correct, and systems that stay honest when a dependency goes down. Outside work I keep shipping side projects, from a fail-closed ad gate on Kafka and Redis to a multiplayer coding arena and a UPI expense tracker.",
  ],
  funFacts: [
    { icon: "🏸", text: "Badminton captain" },
    { icon: "📷", text: "Photographer" },
    { icon: "🎮", text: "Gamer" },
    { icon: "🎬", text: "Movie buff" },
    { icon: "🍜", text: "Crazy-level foodie" },
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
