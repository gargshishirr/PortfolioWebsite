export const VIEW = { width: 1000, height: 620 };

export const POSITIONS = {
  adgate: [170, 150],
  accessdesk: [335, 100],
  reqlab: [375, 240],
  mangoplay: [205, 285],
  codebattle: [610, 165],
  wanderly: [790, 100],
  proctorcode: [885, 235],
  "pinterest-clone": [705, 295],
  kharcha: [150, 455],
  medrecords: [320, 535],
  "crypto-forecasting": [560, 445],
  pathfinder: [705, 480],
  boggle: [860, 420],
  "parking-management": [800, 565],
};

export const EDGES = [
  ["adgate", "accessdesk"],
  ["accessdesk", "reqlab"],
  ["reqlab", "mangoplay"],
  ["mangoplay", "adgate"],
  ["codebattle", "wanderly"],
  ["wanderly", "proctorcode"],
  ["proctorcode", "pinterest-clone"],
  ["pinterest-clone", "codebattle"],
  ["kharcha", "medrecords"],
  ["crypto-forecasting", "pathfinder"],
  ["pathfinder", "boggle"],
  ["pathfinder", "parking-management"],
];

export const LABELS = {
  backend: [120, 52],
  products: [575, 52],
  mobile: [100, 395],
  algorithms: [520, 385],
};

const seeded = (seed) => () => {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
};

const random = seeded(42);
export const DUST = Array.from({ length: 140 }, () => ({
  x: random() * VIEW.width,
  y: random() * VIEW.height,
  r: 0.4 + random() * 1.3,
  o: 0.15 + random() * 0.5,
}));
