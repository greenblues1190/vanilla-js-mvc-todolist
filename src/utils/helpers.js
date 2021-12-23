export function $(selector, scope) {
  return (scope || document).querySelector(selector);
}

export function $all(selector, scope) {
  return (scope || document).querySelectorAll(selector);
}
