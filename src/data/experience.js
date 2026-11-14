import microsoft from "../assets/logos/microsoft.webp";
import lumiq from "../assets/logos/lumiq.webp";
import districtd from "../assets/logos/districtd.webp";

export const experience = [
  {
    role: "Software Engineering Intern",
    organisation: "Microsoft",
    logo: microsoft,
    start: "May 2024",
    end: "Jul 2024",
    points: [
      "Designed and implemented a public API endpoint for batch shortcut creation in OneLake using C#, significantly optimizing partition-node performance by reducing latency and load.",
    ],
    tags: ["C#", "REST APIs", "OneLake"],
  },
  {
    role: "DevOps Intern",
    organisation: "Lumiq.AI",
    logo: lumiq,
    start: "Jun 2023",
    end: "Jul 2023",
    points: [
      "Completed a bootcamp covering cloud computing, SSL certificates, Unix/Linux and shell, Docker images and containers, and AWS (EC2, API Gateway, Lambda).",
      "Used SSH to operate VMs and containers, and built a web application with HTML and CSS.",
    ],
    tags: ["AWS", "Docker", "Linux", "SSH"],
  },
  {
    role: "Software Engineering Intern",
    organisation: "DistrictD",
    logo: districtd,
    start: "May 2023",
    end: "Jun 2023",
    points: [
      "Built C++/Node.js APIs to sync data from a master to child databases with success loopbacks and proper logging, working in an agile, scrum-based team.",
    ],
    tags: ["C++", "Node.js", "Agile"],
  },
];
