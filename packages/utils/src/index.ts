export function uniqueSorted(values: string[]) {
  return Array.from(new Set(values.map((value) => value.trim()).filter(Boolean))).sort((a, b) => a.localeCompare(b));
}

export function clampScore(value: number) {
  return Math.max(0, Math.min(100, Math.round(value)));
}
