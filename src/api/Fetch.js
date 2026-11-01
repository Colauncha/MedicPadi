export function Fetch(url, options) {
  return fetch(url, {
    ...options,
    credentials: "include"
  });
}