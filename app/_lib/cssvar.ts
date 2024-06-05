export default function cssvar(name: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(name);
}
