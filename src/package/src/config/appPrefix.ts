// Minimal global prefix holder (no context, no store init required)
// Normalization: lowercase, replace non-alphanumerics with hyphen, collapse repeats
let prefix: string = "react-kit"; // default fallback

export function setAppPrefix(appName: string | undefined) {
  if (!appName) return; // keep default
  const normalized = appName
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  if (normalized) {
    prefix = normalized;
  }
}

export function getAppPrefix() {
  return prefix;
}
