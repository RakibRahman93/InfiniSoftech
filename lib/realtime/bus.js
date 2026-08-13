const listeners = new Set();

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function publish(payload) {
  for (const fn of [...listeners]) {
    try {
      fn(payload);
    } catch {
      // ignore per-listener failures
    }
  }
}