const attempts = new Map<string, { count: number; resetAt: number }>();

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 5;

export function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = attempts.get(ip);

  if (!record || now > record.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  record.count++;
  return record.count > MAX_REQUESTS;
}

export function getRateLimitRetryAfter(ip: string): number {
  const record = attempts.get(ip);
  if (!record) return 0;
  return Math.ceil((record.resetAt - Date.now()) / 1000);
}
