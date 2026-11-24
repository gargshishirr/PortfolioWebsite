import { sections } from "../../context/ui";
import { experience } from "../../data/experience";
import { profile } from "../../data/profile";
import { categoryById, projectBySlug, projects } from "../../data/projects";
import { skillGroups } from "../../data/skills";

const BANNER = String.raw` ____  _     _     _     _
/ ___|| |__ (_)___| |__ (_)_ __
\___ \| '_ \| / __| '_ \| | '__|
 ___) | | | | \__ \ | | | | |
|____/|_| |_|_|___/_| |_|_|_|`;

const TONES = {
  backend: "cyan",
  products: "violet",
  mobile: "mint",
  algorithms: "pink",
};

const seg = (text, tone) => ({ text, tone });
const line = (...segments) => segments.map((part) => (typeof part === "string" ? seg(part) : part));
const pad = (text, width) => text + " ".repeat(Math.max(1, width - text.length));
const row = (columns, ...cells) => ({ columns, cells });

export const COMMANDS = [
  ["help", "show this list"],
  ["whoami", "who is Shishir?"],
  ["ls", "list every project"],
  ["open <project>", "open a project's dossier (Tab completes)"],
  ["cat <project>", "print a project summary here"],
  ["skills", "the toolbox"],
  ["experience", "where I've worked"],
  ["contact", "ways to reach me"],
  ["resume", "open my résumé"],
  ["github | linkedin | leetcode", "open a profile"],
  ["goto <section>", sections.map((section) => section.id).join(", ")],
  ["neofetch", "system info, portfolio edition"],
  ["clear", "clear the screen"],
  ["exit", "close the terminal"],
];

const COMPLETABLE = [
  "help",
  "whoami",
  "ls",
  "open",
  "cat",
  "skills",
  "experience",
  "contact",
  "resume",
  "github",
  "linkedin",
  "leetcode",
  "goto",
  "neofetch",
  "clear",
  "exit",
];

export const welcome = () => [
  ...BANNER.split("\n").map((row) => line(seg(row, "cyan"))),
  line(""),
  line("Welcome to ", seg("shishir.sh", "mint"), ". You found the secret terminal."),
  line("Type ", seg("help", "amber"), " to see what I can do, or ", seg("ls", "amber"), " to list projects."),
  line(""),
];

const findProject = (name) => {
  if (!name) return null;
  const query = name.toLowerCase();
  return (
    projectBySlug[query] ||
    projects.find((project) => project.title.toLowerCase() === query) ||
    projects.find((project) => project.slug.startsWith(query))
  );
};

export function complete(input) {
  const [command, ...rest] = input.trimStart().split(/\s+/);
  if (!rest.length) {
    const options = COMPLETABLE.filter((name) => name.startsWith(command.toLowerCase()));
    return options.length === 1 ? `${options[0]} ` : null;
  }
  const argument = rest.join(" ").toLowerCase();
  if (["open", "cat"].includes(command)) {
    const options = projects.filter((project) => project.slug.startsWith(argument));
    return options.length === 1 ? `${command} ${options[0].slug}` : null;
  }
  if (command === "goto") {
    const options = sections.filter((section) => section.id.startsWith(argument));
    return options.length === 1 ? `goto ${options[0].id}` : null;
  }
  return null;
}

export function run(raw, actions) {
  const input = raw.trim();
  const [command = "", ...args] = input.split(/\s+/);
  const argument = args.join(" ");
  const lower = command.toLowerCase();

  switch (lower) {
    case "":
      return [];
    case "help":
      return [
        line(seg("Available commands", "mint")),
        ...COMMANDS.map(([name, description]) =>
          row("28ch minmax(0, 1fr)", seg(name, "amber"), seg(description, "muted")),
        ),
      ];
    case "whoami":
      return [
        line(seg(profile.name, "cyan"), " — ", `${profile.role} @ ${profile.company}, ${profile.team}`),
        line(seg(`${profile.education.degree}, ${profile.education.school} (${profile.education.grade})`, "muted")),
        line(profile.intro),
      ];
    case "ls":
    case "projects":
      return [
        line(seg(`${projects.length} projects`, "mint"), seg("  (open <name> to explore)", "muted")),
        ...projects.map((project) =>
          row(
            "20ch 5ch minmax(0, 1fr)",
            seg(project.slug, TONES[project.category]),
            seg(String(project.year), "muted"),
            seg(project.tagline),
          ),
        ),
      ];
    case "open":
    case "cat": {
      const project = findProject(argument);
      if (!project) {
        return [
          line(seg(`${lower}: ${argument || "missing project name"}: no such project`, "err")),
          line(seg("Try ", "muted"), seg("ls", "amber"), seg(" to see every project.", "muted")),
        ];
      }
      if (lower === "open") {
        actions.openProject(project.slug);
        return [line(seg("→ ", "mint"), `Opening ${project.title}…`)];
      }
      return [
        line(seg(project.title, TONES[project.category]), seg(`  ${categoryById[project.category].label} · ${project.year}`, "muted")),
        line(project.summary),
        ...project.highlights.map((highlight) => line(seg("  ✦ ", TONES[project.category]), highlight)),
        line(seg(`  stack: ${project.stack.join(", ")}`, "muted")),
        project.links.live ? line(seg("  live: ", "muted"), seg(project.links.live, "cyan")) : null,
        project.links.source ? line(seg("  code: ", "muted"), seg(project.links.source, "cyan")) : null,
      ].filter(Boolean);
    }
    case "skills":
    case "stack":
      return skillGroups.map((group) =>
        line(seg(pad(group.title, 20), "amber"), group.skills.map((skill) => skill.name).join(" · ")),
      );
    case "experience":
    case "exp":
      return experience.flatMap((item) => [
        line(seg(item.organisation, "cyan"), " — ", item.role, seg(`  ${item.start} → ${item.end}`, "muted")),
        ...(item.team ? [line(seg(`  ${item.team}`, "muted"))] : []),
        ...item.points.map((point) => line(seg("  › ", "muted"), point)),
      ]);
    case "contact":
      return [
        line(seg(pad("email", 10), "amber"), profile.email),
        ...profile.socials.map((social) => line(seg(pad(social.label.toLowerCase(), 10), "amber"), social.href)),
      ];
    case "resume":
    case "cv":
      window.open(profile.resume, "_blank", "noopener");
      return [line(seg("→ ", "mint"), "Opening résumé in a new tab…")];
    case "github":
    case "linkedin":
    case "leetcode": {
      const social = profile.socials.find((item) => item.label.toLowerCase() === lower);
      window.open(social.href, "_blank", "noopener");
      return [line(seg("→ ", "mint"), `Opening ${social.label}…`)];
    }
    case "goto":
    case "cd": {
      const target = sections.find((section) => section.id === argument.toLowerCase());
      if (!target) {
        return [
          line(seg(`${lower}: ${argument || "(nothing)"}: no such section`, "err")),
          line(seg(`sections: ${sections.map((section) => section.id).join(", ")}`, "muted")),
        ];
      }
      actions.goto(target.id);
      return [line(seg("→ ", "mint"), `Warping to ${target.label}…`)];
    }
    case "neofetch": {
      const live = projects.filter((project) => project.links.live).length;
      const art = ["    ✦     ", "  ✦   ✦   ", " ✦  SG  ✦ ", "  ✦   ✦   ", "    ✦     ", "          ", "          "];
      const info = [
        [seg("guest", "mint"), "@", seg("shishir.sh", "cyan")],
        [seg("OS        ", "amber"), "Portfolio (React + Vite)"],
        [seg("Host      ", "amber"), `${profile.role} @ ${profile.company}`],
        [seg("Projects  ", "amber"), `${projects.length} (${live} live)`],
        [seg("Shell     ", "amber"), "C# · Java · TypeScript · Python · C++"],
        [seg("Uptime    ", "amber"), "shipping since 2023"],
        [seg("Education ", "amber"), `DTU, B.Tech CSE · ${profile.education.grade}`],
      ];
      return art.map((row, index) => line(seg(row, "violet"), ...(info[index] || [])));
    }
    case "clear":
    case "cls":
      return "clear";
    case "exit":
    case "quit":
    case "q":
      actions.close();
      return [];
    case "sudo":
      if (/^hire[- ]?(me|shishir)?$/i.test(argument)) {
        setTimeout(() => {
          window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent("Let's work together")}`;
        }, 900);
        return [
          line(seg("[sudo] password for guest: ", "muted"), "********"),
          line(seg("✓ Access granted. ", "mint"), "Opening a direct channel to Shishir…"),
        ];
      }
      return [line(seg("guest is not in the sudoers file. This incident will be reported to /dev/null.", "err"))];
    case "hire":
    case "hire-me":
      return [line("Did you mean ", seg("sudo hire-me", "amber"), "? 👀")];
    case "echo":
      return [line(argument)];
    case "date":
      return [line(new Date().toString())];
    case "pwd":
      return [line("/home/guest/universe")];
    case "rm":
      return [line(seg("Nice try. These projects are load-bearing.", "pink"))];
    case "hi":
    case "hello":
    case "hey":
      return [line("Hey there 👋  Type ", seg("help", "amber"), " to look around.")];
    default:
      return [
        line(seg(`command not found: ${command}`, "err")),
        line(seg("Type ", "muted"), seg("help", "amber"), seg(" for a list of commands.", "muted")),
      ];
  }
}
