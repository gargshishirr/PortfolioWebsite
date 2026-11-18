// Procedural koi pond life: fish that swim, notice the cursor and scatter on touch,
// plus floating lily pads, lotus flowers and surface ripples. Drawn on a 2D canvas.
const TAU = Math.PI * 2;
const rand = (min, max) => min + Math.random() * (max - min);
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const angleDiff = (from, to) => {
  let d = (to - from) % TAU;
  if (d > Math.PI) d -= TAU;
  if (d < -Math.PI) d += TAU;
  return d;
};

const VARIETIES = [
  { name: "kohaku", base: "#f8f3ec", fin: "rgba(252, 246, 238, 0.6)", spots: ["#e4512a", "#ee6633"], count: [2, 4] },
  { name: "ogon", base: "#f1b53a", sheen: "#fbe08a", fin: "rgba(248, 204, 96, 0.55)", spots: [], count: [0, 0] },
  { name: "orenji", base: "#ef7b2c", sheen: "#f9b16a", fin: "rgba(246, 150, 80, 0.5)", spots: ["#fbe9d6"], count: [0, 2] },
  { name: "showa", base: "#2b2830", fin: "rgba(70, 64, 76, 0.45)", spots: ["#e5582c", "#f4ece2", "#e5582c"], count: [3, 5] },
  { name: "tancho", base: "#f8f3ec", fin: "rgba(252, 246, 238, 0.6)", spots: [], count: [0, 0], crown: "#df4527" },
  { name: "asagi", base: "#557aa8", sheen: "#8fb1d6", fin: "rgba(120, 150, 196, 0.5)", spots: ["#e8653a"], count: [1, 2] },
  { name: "kigoi", base: "#f2d14c", sheen: "#fbe99a", fin: "rgba(246, 222, 120, 0.55)", spots: [], count: [0, 0] },
];
const ORDER = ["kohaku", "ogon", "showa", "kohaku", "orenji", "asagi", "tancho", "kigoi", "kohaku", "orenji"];

function profile(t) {
  if (t < 0.25) return 0.55 + 0.45 * Math.sin((t / 0.25) * (Math.PI / 2));
  const u = (t - 0.25) / 0.75;
  return Math.max(0.11, 1 - Math.pow(u, 1.5) * 0.88);
}

class Koi {
  constructor(pond, variety, len) {
    this.pond = pond;
    this.variety = variety;
    this.len = len;
    this.n = 14;
    this.seg = len / this.n;
    this.halfWidth = len * 0.106;
    this.cruise = rand(26, 40) * (len / 110);
    this.speed = this.cruise;
    this.heading = rand(0, TAU);
    this.phase = rand(0, TAU);
    this.seedA = rand(0, 1000);
    this.seedB = rand(0, 1000);
    this.boost = 0;
    this.threat = null;
    this.curiosity = rand(0.5, 1);
    const x = rand(pond.width * 0.12, pond.width * 0.88);
    const y = rand(pond.height * 0.12, pond.height * 0.88);
    this.spine = Array.from({ length: this.n }, (_, i) => ({
      x: x - Math.cos(this.heading) * this.seg * i,
      y: y - Math.sin(this.heading) * this.seg * i,
    }));
    this.render = this.spine.map((p) => ({ x: p.x, y: p.y, nx: 0, ny: 0 }));
    const [min, max] = variety.count;
    const spotCount = Math.round(rand(min, max));
    this.spots = Array.from({ length: spotCount }, (_, i) => ({
      t: clamp(0.12 + (i + rand(0.1, 0.9)) * (0.62 / Math.max(1, spotCount)), 0.1, 0.78),
      s: rand(-0.55, 0.55),
      r: rand(0.5, 1.05),
      stretch: rand(0.9, 1.7),
      color: variety.spots[i % variety.spots.length],
    }));
  }

  get head() {
    return this.spine[0];
  }

  update(dt, time, fish, pointer, fears) {
    const { width, height } = this.pond;
    const head = this.head;
    let dx = Math.cos(this.heading);
    let dy = Math.sin(this.heading);
    let weight = 2.2;
    let wx = dx * weight;
    let wy = dy * weight;

    const wander = Math.sin(time * 0.37 + this.seedA) * 0.6 + Math.sin(time * 0.13 + this.seedB) * 0.4;
    wx += Math.cos(this.heading + wander * 1.4) * 0.9;
    wy += Math.sin(this.heading + wander * 1.4) * 0.9;

    const margin = this.len * 0.7;
    const ahead = { x: head.x + dx * this.len * 1.6, y: head.y + dy * this.len * 1.6 };
    const out =
      Math.max(0, margin - ahead.x) + Math.max(0, ahead.x - (width - margin)) +
      Math.max(0, margin - ahead.y) + Math.max(0, ahead.y - (height - margin));
    if (out > 0) {
      const toX = width / 2 - head.x;
      const toY = height / 2 - head.y;
      const d = Math.hypot(toX, toY) || 1;
      const strength = clamp(out / margin, 0, 2.5) * 3;
      wx += (toX / d) * strength;
      wy += (toY / d) * strength;
    }

    for (const other of fish) {
      if (other === this) continue;
      const ox = head.x - other.head.x;
      const oy = head.y - other.head.y;
      const d = Math.hypot(ox, oy);
      const range = (this.len + other.len) * 0.45;
      if (d > 0 && d < range) {
        const push = (1 - d / range) * 2.2;
        wx += (ox / d) * push;
        wy += (oy / d) * push;
      }
    }

    // Taps leave a fear zone for a few seconds: koi inside swim out of it, and koi outside steer around it.
    let afraid = false;
    for (const fear of fears) {
      const ax = head.x - fear.x;
      const ay = head.y - fear.y;
      const d = Math.hypot(ax, ay) || 1;
      const reach = fear.radius * 1.35;
      if (d >= reach) continue;
      const fade = clamp((fear.until - time) / 1.5, 0, 1);
      const closeness = 1 - d / reach;
      const push = (3 + closeness * 12) * fade;
      wx += (ax / d) * push;
      wy += (ay / d) * push;
      if (d < fear.radius) {
        afraid = true;
        this.boost = Math.max(this.boost, (0.35 + closeness * 0.65) * fade);
      }
    }

    let target = null;
    if (!afraid && pointer.curious && this.curiosity > 0.62) {
      const pd = Math.hypot(pointer.x - head.x, pointer.y - head.y);
      if (pd < 340) {
        target = { x: pointer.x + Math.cos(time * 0.7 + this.seedB) * this.len * 0.45, y: pointer.y + Math.sin(time * 0.7 + this.seedB) * this.len * 0.45 };
      }
    }
    if (target) {
      const tx = target.x - head.x;
      const ty = target.y - head.y;
      const d = Math.hypot(tx, ty) || 1;
      const pull = clamp(d / 160, 0.4, 1.6) * 1.8;
      wx += (tx / d) * pull;
      wy += (ty / d) * pull;
    }

    if (this.threat && this.boost > 0.05) {
      const ax = head.x - this.threat.x;
      const ay = head.y - this.threat.y;
      const d = Math.hypot(ax, ay) || 1;
      wx += (ax / d) * 7 * this.boost;
      wy += (ay / d) * 7 * this.boost;
    }

    const desired = Math.atan2(wy, wx);
    // Turning rate scales with speed so koi sweep in wide arcs instead of curling up.
    const turnRate = this.boost > 0.2 ? 5 : clamp(this.speed / (this.len * 0.5), 0.55, 2.2);
    const maxTurn = turnRate * dt;
    this.heading += clamp(angleDiff(this.heading, desired), -maxTurn, maxTurn);

    let targetSpeed = this.cruise * (1 + this.boost * 4);
    if (target) {
      const d = Math.hypot(target.x - head.x, target.y - head.y);
      targetSpeed *= clamp(d / 120, 0.55, 1.25);
    }
    // Startled koi accelerate almost instantly, then ease back to cruising.
    const response = targetSpeed > this.speed && this.boost > 0.2 ? 7 : 2.5;
    this.speed += (targetSpeed - this.speed) * Math.min(1, dt * response);
    this.boost *= Math.exp(-dt * 1.5);

    dx = Math.cos(this.heading);
    dy = Math.sin(this.heading);
    head.x += dx * this.speed * dt;
    head.y += dy * this.speed * dt;

    // Follow-the-leader spine with a bend limit so the body curves smoothly.
    let prevAngle = this.heading;
    for (let i = 1; i < this.n; i++) {
      const a = this.spine[i - 1];
      const b = this.spine[i];
      let angle = Math.atan2(a.y - b.y, a.x - b.x);
      angle = prevAngle + clamp(angleDiff(prevAngle, angle), -0.17, 0.17);
      b.x = a.x - Math.cos(angle) * this.seg;
      b.y = a.y - Math.sin(angle) * this.seg;
      prevAngle = angle;
    }
    this.phase += dt * (2.4 + (this.speed / this.len) * 5.5);
  }

  scare(point, strength) {
    this.threat = { x: point.x, y: point.y };
    this.boost = Math.max(this.boost, strength);
  }

  computeRender() {
    const amp = this.halfWidth * 0.42 * clamp(this.speed / this.cruise, 0.6, 1.6);
    for (let i = 0; i < this.n; i++) {
      const p = this.spine[i];
      const q = this.spine[Math.max(0, i - 1)];
      const r = this.spine[Math.min(this.n - 1, i + 1)];
      let tx = q.x - r.x;
      let ty = q.y - r.y;
      const d = Math.hypot(tx, ty) || 1;
      tx /= d;
      ty /= d;
      const nx = -ty;
      const ny = tx;
      const t = i / (this.n - 1);
      const wave = Math.sin(this.phase - i * 0.55) * amp * Math.pow(t, 1.3);
      const out = this.render[i];
      out.x = p.x + nx * wave;
      out.y = p.y + ny * wave;
      out.nx = nx;
      out.ny = ny;
      out.tx = tx;
      out.ty = ty;
    }
  }

  at(t) {
    const f = t * (this.n - 1);
    const i = Math.min(this.n - 2, Math.floor(f));
    const k = f - i;
    const a = this.render[i];
    const b = this.render[i + 1];
    return {
      x: a.x + (b.x - a.x) * k,
      y: a.y + (b.y - a.y) * k,
      nx: a.nx + (b.nx - a.nx) * k,
      ny: a.ny + (b.ny - a.ny) * k,
      tx: a.tx,
      ty: a.ty,
      w: profile(t) * this.halfWidth,
    };
  }

  bodyPath(ctx) {
    const W = this.halfWidth;
    const pts = [];
    const head = this.render[0];
    pts.push({ x: head.x + head.tx * W * 0.85, y: head.y + head.ty * W * 0.85 });
    for (let i = 0; i < this.n; i++) {
      const p = this.render[i];
      const w = profile(i / (this.n - 1)) * W;
      pts.push({ x: p.x + p.nx * w, y: p.y + p.ny * w });
    }
    const tail = this.render[this.n - 1];
    pts.push({ x: tail.x - tail.tx * W * 0.25, y: tail.y - tail.ty * W * 0.25 });
    for (let i = this.n - 1; i >= 0; i--) {
      const p = this.render[i];
      const w = profile(i / (this.n - 1)) * W;
      pts.push({ x: p.x - p.nx * w, y: p.y - p.ny * w });
    }
    ctx.beginPath();
    const last = pts[pts.length - 1];
    ctx.moveTo((last.x + pts[0].x) / 2, (last.y + pts[0].y) / 2);
    for (let i = 0; i < pts.length; i++) {
      const p = pts[i];
      const q = pts[(i + 1) % pts.length];
      ctx.quadraticCurveTo(p.x, p.y, (p.x + q.x) / 2, (p.y + q.y) / 2);
    }
    ctx.closePath();
  }

  drawFin(ctx, x, y, angle, length, width, color) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(length * 0.35, -width, length, -width * 0.15);
    ctx.quadraticCurveTo(length * 0.7, width * 0.55, 0, 0);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
  }

  draw(ctx, dpr) {
    this.computeRender();
    const W = this.halfWidth;
    const v = this.variety;
    const flap = Math.sin(this.phase * 0.55);

    // Pectoral and pelvic fins sit under the body.
    for (const [t, scale, swing] of [[0.2, 1, 0.25], [0.5, 0.55, 0.15]]) {
      const p = this.at(t);
      const back = Math.atan2(-p.ty, -p.tx);
      for (const side of [-1, 1]) {
        const angle = back + side * (1.0 - swing * flap * side);
        this.drawFin(ctx, p.x + p.nx * p.w * side * 0.7, p.y + p.ny * p.w * side * 0.7, angle, this.len * 0.17 * scale, this.len * 0.075 * scale, v.fin);
      }
    }

    // Tail fin.
    const tail = this.render[this.n - 1];
    const before = this.render[this.n - 3];
    const tailAngle = Math.atan2(tail.y - before.y, tail.x - before.x) + Math.sin(this.phase - this.n * 0.55) * 0.35;
    ctx.save();
    ctx.translate(tail.x, tail.y);
    ctx.rotate(tailAngle);
    const tl = this.len * 0.26;
    ctx.beginPath();
    ctx.moveTo(-W * 0.2, 0);
    ctx.quadraticCurveTo(tl * 0.45, -W * 1.5, tl, -W * 1.25);
    ctx.quadraticCurveTo(tl * 0.62, -W * 0.2, tl * 0.72, 0);
    ctx.quadraticCurveTo(tl * 0.62, W * 0.2, tl, W * 1.25);
    ctx.quadraticCurveTo(tl * 0.45, W * 1.5, -W * 0.2, 0);
    ctx.fillStyle = v.fin;
    ctx.fill();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.28)";
    ctx.lineWidth = 0.8;
    for (const k of [-0.8, -0.3, 0.3, 0.8]) {
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(tl * 0.9, W * 1.15 * k);
      ctx.stroke();
    }
    ctx.restore();

    // Body with a soft shadow on the pond floor.
    ctx.save();
    ctx.shadowColor = "rgba(28, 52, 54, 0.24)";
    ctx.shadowBlur = this.len * 0.09 * dpr;
    ctx.shadowOffsetX = this.len * 0.07 * dpr;
    ctx.shadowOffsetY = this.len * 0.11 * dpr;
    this.bodyPath(ctx);
    ctx.fillStyle = v.base;
    ctx.fill();
    ctx.restore();

    ctx.save();
    this.bodyPath(ctx);
    ctx.clip();
    if (v.sheen) {
      const a = this.at(0.1);
      const b = this.at(0.9);
      const g = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
      g.addColorStop(0, v.sheen);
      g.addColorStop(0.55, "rgba(255,255,255,0)");
      ctx.fillStyle = g;
      ctx.globalAlpha = 0.55;
      ctx.fillRect(Math.min(a.x, b.x) - this.len, Math.min(a.y, b.y) - this.len, Math.abs(a.x - b.x) + this.len * 2, Math.abs(a.y - b.y) + this.len * 2);
      ctx.globalAlpha = 1;
    }
    for (const spot of this.spots) {
      const p = this.at(spot.t);
      const cx = p.x + p.nx * spot.s * p.w;
      const cy = p.y + p.ny * spot.s * p.w;
      const r = spot.r * W;
      ctx.fillStyle = spot.color;
      ctx.beginPath();
      ctx.ellipse(cx, cy, r * spot.stretch, r, Math.atan2(p.ty, p.tx), 0, TAU);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(cx - p.tx * r * 0.9, cy - p.ty * r * 0.9, r * 0.72, 0, TAU);
      ctx.fill();
    }
    if (v.crown) {
      const p = this.at(0.07);
      ctx.fillStyle = v.crown;
      ctx.beginPath();
      ctx.arc(p.x - p.tx * W * 0.1, p.y - p.ty * W * 0.1, W * 0.62, 0, TAU);
      ctx.fill();
    }
    // A highlight along the back gives the body some volume.
    ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
    ctx.lineWidth = W * 0.55;
    ctx.lineCap = "round";
    ctx.beginPath();
    for (let i = 1; i < this.n * 0.75; i++) {
      const p = this.render[i];
      if (i === 1) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    }
    ctx.stroke();
    ctx.restore();

    this.bodyPath(ctx);
    ctx.strokeStyle = "rgba(60, 40, 40, 0.1)";
    ctx.lineWidth = 1;
    ctx.stroke();

    const eye = this.at(0.055);
    ctx.fillStyle = "#231a1f";
    for (const side of [-1, 1]) {
      ctx.beginPath();
      ctx.arc(eye.x + eye.nx * eye.w * 0.62 * side, eye.y + eye.ny * eye.w * 0.62 * side, Math.max(1.1, W * 0.11), 0, TAU);
      ctx.fill();
    }
  }
}

class Pad {
  constructor(spec, pond) {
    this.spec = spec;
    this.vx = 0;
    this.vy = 0;
    this.ox = 0;
    this.oy = 0;
    this.spin = rand(-0.02, 0.02);
    this.rot = spec.rot ?? rand(0, TAU);
    this.bob = rand(0, TAU);
    this.layout(pond);
  }

  layout(pond) {
    this.ax = this.spec.fx * pond.width;
    this.ay = this.spec.fy * pond.height;
    this.r = this.spec.r * pond.padBase;
  }

  get x() {
    return this.ax + this.ox;
  }

  get y() {
    return this.ay + this.oy;
  }

  push(px, py, strength) {
    const dx = this.x - px;
    const dy = this.y - py;
    const d = Math.hypot(dx, dy) || 1;
    const range = 180 + this.r;
    if (d > range) return;
    const f = (1 - d / range) * strength;
    this.vx += (dx / d) * f;
    this.vy += (dy / d) * f;
    this.spin += (Math.random() - 0.5) * f * 0.004;
  }

  update(dt) {
    this.vx += (-this.ox * 6 - this.vx * 2.4) * dt;
    this.vy += (-this.oy * 6 - this.vy * 2.4) * dt;
    this.ox += this.vx * dt;
    this.oy += this.vy * dt;
    this.rot += this.spin * dt;
    this.spin *= Math.exp(-dt * 0.4);
    this.bob += dt * 0.6;
  }

  draw(ctx, dpr) {
    const { x, y } = this;
    const r = this.r * (1 + Math.sin(this.bob) * 0.012);
    const notch = this.rot + Math.sin(this.bob * 0.7) * 0.05;
    const path = () => {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.arc(x, y, r, notch + 0.2, notch - 0.2 + TAU);
      ctx.closePath();
    };
    ctx.save();
    ctx.shadowColor = "rgba(24, 62, 44, 0.24)";
    ctx.shadowBlur = r * 0.18 * dpr;
    ctx.shadowOffsetX = r * 0.08 * dpr;
    ctx.shadowOffsetY = r * 0.14 * dpr;
    path();
    const g = ctx.createRadialGradient(x - r * 0.25, y - r * 0.3, r * 0.1, x, y, r);
    g.addColorStop(0, "#b3da92");
    g.addColorStop(0.55, "#7fb764");
    g.addColorStop(1, "#4f8c45");
    ctx.fillStyle = g;
    ctx.fill();
    ctx.restore();

    ctx.save();
    path();
    ctx.clip();
    ctx.strokeStyle = "rgba(232, 248, 214, 0.38)";
    ctx.lineWidth = Math.max(0.8, r * 0.018);
    for (let k = 0; k < 11; k++) {
      const a = notch + 0.45 + (k * (TAU - 0.9)) / 10;
      ctx.beginPath();
      ctx.moveTo(x + Math.cos(a) * r * 0.08, y + Math.sin(a) * r * 0.08);
      ctx.quadraticCurveTo(x + Math.cos(a + 0.08) * r * 0.55, y + Math.sin(a + 0.08) * r * 0.55, x + Math.cos(a) * r * 0.95, y + Math.sin(a) * r * 0.95);
      ctx.stroke();
    }
    ctx.restore();

    path();
    ctx.strokeStyle = "rgba(42, 92, 40, 0.35)";
    ctx.lineWidth = Math.max(1, r * 0.025);
    ctx.stroke();

    if (this.spec.flower) drawLotus(ctx, x + Math.cos(notch + Math.PI) * r * 0.12, y + Math.sin(notch + Math.PI) * r * 0.12, r * 0.62, this.rot * 0.5 + this.bob * 0.05);
  }
}

function petal(ctx, x, y, angle, length, width, inner, outer) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  const g = ctx.createLinearGradient(0, 0, length, 0);
  g.addColorStop(0, inner);
  g.addColorStop(1, outer);
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(length * 0.35, -width, length * 0.8, -width * 0.7, length, 0);
  ctx.bezierCurveTo(length * 0.8, width * 0.7, length * 0.35, width, 0, 0);
  ctx.fill();
  ctx.strokeStyle = "rgba(196, 92, 124, 0.25)";
  ctx.lineWidth = 0.6;
  ctx.stroke();
  ctx.restore();
}

function drawLotus(ctx, x, y, size, rot) {
  ctx.save();
  ctx.shadowColor = "rgba(120, 40, 70, 0.22)";
  ctx.shadowBlur = size * 0.25;
  ctx.shadowOffsetY = size * 0.08;
  const layers = [
    { n: 8, len: size, wid: size * 0.32, rot, inner: "#fde6ec", outer: "#e47d9b" },
    { n: 7, len: size * 0.74, wid: size * 0.27, rot: rot + 0.32, inner: "#fff1f4", outer: "#ee9db3" },
    { n: 6, len: size * 0.48, wid: size * 0.2, rot: rot + 0.15, inner: "#fff7f8", outer: "#f5bccb" },
  ];
  for (const layer of layers) {
    for (let k = 0; k < layer.n; k++) {
      petal(ctx, x, y, layer.rot + (k * TAU) / layer.n, layer.len, layer.wid, layer.inner, layer.outer);
    }
    ctx.shadowColor = "transparent";
  }
  ctx.fillStyle = "#f5cf5a";
  ctx.beginPath();
  ctx.arc(x, y, size * 0.15, 0, TAU);
  ctx.fill();
  ctx.fillStyle = "#d9a12a";
  for (let k = 0; k < 7; k++) {
    const a = (k * TAU) / 7 + rot;
    ctx.beginPath();
    ctx.arc(x + Math.cos(a) * size * 0.08, y + Math.sin(a) * size * 0.08, size * 0.022, 0, TAU);
    ctx.fill();
  }
  ctx.restore();
}

const LAYOUTS = {
  edges: [
    { fx: -0.015, fy: 0.3, r: 0.085, flower: true, rot: 0.4 },
    { fx: 0.06, fy: 0.5, r: 0.045, rot: 2.6 },
    { fx: -0.01, fy: 0.9, r: 0.07, flower: true, rot: 3.9 },
    { fx: 1.02, fy: 0.18, r: 0.08, flower: true, rot: 2.2 },
    { fx: 0.95, fy: 0.34, r: 0.04, rot: 4.4 },
    { fx: 0.985, fy: 0.84, r: 0.06, rot: 5.6 },
  ],
  corners: [
    { fx: 0.02, fy: 0.12, r: 0.06, flower: true, rot: 0.6 },
    { fx: 0.085, fy: 0.3, r: 0.035, rot: 2.9 },
    { fx: 0.97, fy: 0.8, r: 0.065, flower: true, rot: 4.2 },
    { fx: 0.9, fy: 0.95, r: 0.035, rot: 1.4 },
    { fx: 1.0, fy: 0.55, r: 0.04, rot: 3.3 },
  ],
  none: [],
};

export function createLife(canvas, options) {
  const ctx = canvas.getContext("2d");
  const pond = { width: 1, height: 1, padBase: 1 };
  let dpr = 1;
  let fish = [];
  let pads = [];
  let ripples = [];
  let fears = [];
  let nextAmbient = rand(2, 5);
  const pointer = { x: 0, y: 0, curious: false, lastMove: -10, speed: 0, inside: false, calmUntil: 0 };

  const fishCount = () => {
    if (typeof options.fish === "number") return options.fish;
    return clamp(Math.round((pond.width * pond.height) / 160000), 3, 7);
  };

  function populate() {
    const count = fishCount();
    const base = clamp(Math.min(pond.width, pond.height) * 0.17, 62, 138);
    const offset = Math.floor(Math.random() * ORDER.length);
    fish = Array.from({ length: count }, (_, i) => {
      const variety = VARIETIES.find((v) => v.name === ORDER[(i + offset) % ORDER.length]);
      return new Koi(pond, variety, base * rand(0.78, 1.12));
    });
  }

  return {
    resize(width, height, ratio) {
      const first = pond.width === 1;
      pond.width = width;
      pond.height = height;
      pond.padBase = Math.max(width * 0.78, height * 0.5);
      dpr = ratio;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      if (first) {
        populate();
        pads = (LAYOUTS[options.pads] || []).map((spec) => new Pad(spec, pond));
      } else {
        pads.forEach((pad) => pad.layout(pond));
        for (const f of fish) {
          for (const p of f.spine) {
            p.x = clamp(p.x, 0, width);
            p.y = clamp(p.y, 0, height);
          }
        }
        if (Math.abs(fish.length - fishCount()) > 1) populate();
      }
    },

    warmUp(seconds) {
      for (let t = 0; t < seconds; t += 1 / 30) this.update(1 / 30, t);
    },

    update(dt, time) {
      fears = fears.filter((fear) => time < fear.until);
      // After a tap, koi ignore the cursor for a while so they don't swim straight back to it.
      pointer.curious = pointer.inside && pointer.speed < 260 && time - pointer.lastMove < 2.5 && time > pointer.calmUntil;
      for (const f of fish) f.update(dt, time, fish, pointer, fears);
      for (const pad of pads) pad.update(dt);
      ripples = ripples.filter((r) => (r.age += dt) < r.life);
      if (options.ambient !== false && time > nextAmbient) {
        nextAmbient = time + rand(3.5, 7.5);
        ripples.push({ x: rand(0.15, 0.85) * pond.width, y: rand(0.15, 0.85) * pond.height, age: 0, life: 2.4, scale: 0.55 });
      }
    },

    draw() {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, pond.width, pond.height);
      for (const f of fish) f.draw(ctx, dpr);
      for (const r of ripples) {
        const fade = Math.pow(1 - r.age / r.life, 1.6);
        for (let j = 0; j < 3; j++) {
          const radius = (r.age * 75 + j * 15) * r.scale;
          if (radius <= 0) continue;
          ctx.beginPath();
          ctx.arc(r.x, r.y, radius, 0, TAU);
          ctx.strokeStyle = `rgba(255, 255, 255, ${fade * (0.75 - j * 0.2)})`;
          ctx.lineWidth = 1.6;
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(r.x, r.y, Math.max(0, radius - 2.5), 0, TAU);
          ctx.strokeStyle = `rgba(52, 86, 90, ${fade * (0.16 - j * 0.04)})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }
      for (const pad of pads) pad.draw(ctx, dpr);
    },

    pointerMove(x, y, time, kind) {
      const dt = Math.max(0.016, time - pointer.lastMove);
      const speed = Math.hypot(x - pointer.x, y - pointer.y) / dt;
      pointer.speed = pointer.inside ? pointer.speed * 0.6 + speed * 0.4 : 0;
      pointer.x = x;
      pointer.y = y;
      pointer.inside = kind === "mouse" || kind === "pen";
      pointer.lastMove = time;
      if (speed > 700) {
        for (const f of fish) {
          if (Math.hypot(f.head.x - x, f.head.y - y) < f.len * 1.1) f.scare({ x, y }, 0.9);
        }
      }
      if (kind === "touch" && time - (pointer.lastTrail || 0) > 0.09) {
        pointer.lastTrail = time;
        ripples.push({ x, y, age: 0, life: 1.6, scale: 0.6 });
        for (const f of fish) {
          if (Math.hypot(f.head.x - x, f.head.y - y) < 160) f.scare({ x, y }, 1);
        }
      }
    },

    pointerLeave() {
      pointer.inside = false;
    },

    tap(x, y, time) {
      ripples.push({ x, y, age: 0, life: 2.2, scale: 1 });
      const radius = clamp(Math.min(pond.width, pond.height) * 0.42, 190, 340);
      fears.push({ x, y, radius, until: time + 4.5 });
      if (fears.length > 4) fears.shift();
      pointer.calmUntil = time + 7;
      for (const f of fish) {
        const d = Math.hypot(f.head.x - x, f.head.y - y);
        if (d < radius) f.scare({ x, y }, 0.6 + 0.6 * (1 - d / radius));
      }
      for (const pad of pads) pad.push(x, y, 140);
    },
  };
}
