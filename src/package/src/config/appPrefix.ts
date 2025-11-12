let prefix: string = "react-kit";

export function setAppPrefix(appName: string | undefined) {
  if (!appName) return;
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
