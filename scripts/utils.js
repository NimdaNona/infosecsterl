export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export function lerp(start, end, amount) {
  return start + (end - start) * amount;
}

export function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function projectToScreen(vector, camera, width, height) {
  const projected = vector.clone().project(camera);
  return {
    x: (projected.x + 1) / 2 * width,
    y: (-projected.y + 1) / 2 * height,
  };
}
