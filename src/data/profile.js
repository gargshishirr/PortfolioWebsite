import photo from "../assets/profile.webp";

export const profile = {
  name: "Shishir Garg",
  firstName: "Shishir",
  role: "Software Engineer",
  location: "India",
  photo,
  email: "gargshishirr@gmail.com",
  resume:
    "https://drive.google.com/file/d/1s2BG52Thgxuz6uA54qMmyhRoPQHB5m4M/view?usp=drive_link",
  education: {
    degree: "B.Tech, Computer Engineering",
    school: "Delhi Technological University",
  },
  intro:
    "I build backend systems that fail safely, real-time products that feel instant, and tools people actually enjoy using.",
  about: [
    "I'm a software engineer from India who studied Computer Engineering at Delhi Technological University. I like the hard, invisible parts of software: hot paths measured in milliseconds, data that has to be counted exactly once, and systems that stay honest when a dependency goes down.",
    "I interned at Microsoft on OneLake, where I designed a public API for batch shortcut creation, and I've since shipped everything from an ad-eligibility service on Kafka and Redis to a travel-matching app, a UPI expense tracker and a multiplayer coding arena.",
  ],
  funFacts: [
    { icon: "🎮", text: "Video game enthusiast" },
    { icon: "🏅", text: "Loves playing sports" },
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
