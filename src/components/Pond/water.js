// Animated pond water: a soft gradient with moving caustic light, drawn in WebGL.
const VERT = `attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }`;

const FRAG = `#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec2 uRes;
uniform float uTime;
uniform float uCell;

vec2 hash2(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return fract(sin(p) * 43758.5453);
}

// Distance between the nearest and second-nearest moving cell points: small near cell borders.
float edges(vec2 x, float t) {
  vec2 n = floor(x);
  vec2 f = fract(x);
  float d1 = 8.0;
  float d2 = 8.0;
  for (int j = -1; j <= 1; j++) {
    for (int i = -1; i <= 1; i++) {
      vec2 g = vec2(float(i), float(j));
      vec2 o = hash2(n + g);
      o = 0.5 + 0.42 * sin(t + 6.2831 * o);
      vec2 r = g + o - f;
      float d = dot(r, r);
      if (d < d1) { d2 = d1; d1 = d; } else if (d < d2) { d2 = d; }
    }
  }
  return sqrt(d2) - sqrt(d1);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  vec2 p = gl_FragCoord.xy / uCell;
  float t = uTime;
  p += 0.14 * vec2(sin(p.y * 1.7 + t * 0.6), cos(p.x * 1.5 - t * 0.5));
  float e1 = edges(p, t * 0.55);
  float e2 = edges(p * 1.85 + vec2(3.1, 7.7), t * 0.8 + 1.7);
  float caustic = (1.0 - smoothstep(0.0, 0.15, e1)) * 0.75 + (1.0 - smoothstep(0.0, 0.1, e2)) * 0.25;

  vec3 deep = vec3(0.835, 0.880, 0.872);
  vec3 shallow = vec3(0.910, 0.934, 0.925);
  vec3 col = mix(deep, shallow, clamp(uv.y * 0.75 + 0.2, 0.0, 1.0));
  float a = (uv.x * 2.3 - uv.y * 1.6) * 3.0 + t * 0.08 + caustic * 1.4;
  col += 0.018 * vec3(sin(a), sin(a + 2.1), sin(a + 4.2));
  col = mix(col, vec3(0.995, 0.992, 0.975), caustic * 0.72);
  float vignette = smoothstep(1.3, 0.35, length(uv - 0.5) * 1.4);
  col *= mix(0.95, 1.0, vignette);
  gl_FragColor = vec4(col, 1.0);
}`;

function compile(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(log || "shader compile failed");
  }
  return shader;
}

export function createWater(canvas) {
  const gl = canvas.getContext("webgl", { antialias: false, alpha: false, premultipliedAlpha: false });
  if (!gl) return null;
  let program;
  try {
    program = gl.createProgram();
    gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error("link failed");
  } catch {
    return null;
  }
  gl.useProgram(program);
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const aPos = gl.getAttribLocation(program, "aPos");
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
  const uRes = gl.getUniformLocation(program, "uRes");
  const uTime = gl.getUniformLocation(program, "uTime");
  const uCell = gl.getUniformLocation(program, "uCell");
  let scale = 1;

  return {
    resize(width, height, renderScale) {
      scale = renderScale;
      canvas.width = Math.max(1, Math.round(width * renderScale));
      canvas.height = Math.max(1, Math.round(height * renderScale));
      gl.viewport(0, 0, canvas.width, canvas.height);
    },
    draw(seconds) {
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, seconds * 0.35);
      gl.uniform1f(uCell, 150 * scale);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    },
    destroy() {
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    },
  };
}
