import { VisitorType } from "./visitor-type.util";

const GA_MP_ENDPOINT = "https://www.google-analytics.com/mp/collect";
const DEFAULT_MEASUREMENT_ID = "G-6GS9Y7GJD3";
const SEND_TIMEOUT_MS = 1500;

/**
 * Derives a stable, low-cardinality client id from the User-Agent with an FNV-1a
 * hash. Avoids `node:crypto` so this stays a pure module the spec can run under
 * browser-based Karma. Stability keeps GA4's "users" count sane: one bot
 * identity maps to roughly one user.
 */
export function clientIdFromUserAgent(userAgent: string | undefined): string {
  const source = userAgent && userAgent.length > 0 ? userAgent : "unknown";
  let hash = 0x811c9dc5;
  for (let i = 0; i < source.length; i++) {
    hash ^= source.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  // GA4 expects a "<id>.<timestamp>" shape; the trailing 0 keeps the format
  // without a real timestamp, which we intentionally omit.
  return `${(hash >>> 0).toString()}.0`;
}

export interface VisitorHitPayload {
  client_id: string;
  events: {
    name: "visitor_hit";
    params: {
      visitor_type: VisitorType;
      page_location: string;
      engagement_time_msec: string;
    };
  }[];
}

export function buildVisitorHitPayload(
  visitorType: VisitorType,
  pageLocation: string,
  userAgent: string | undefined,
): VisitorHitPayload {
  return {
    client_id: clientIdFromUserAgent(userAgent),
    events: [
      {
        name: "visitor_hit",
        params: {
          visitor_type: visitorType,
          page_location: pageLocation,
          engagement_time_msec: "1",
        },
      },
    ],
  };
}

/**
 * Fire-and-forget send of a `visitor_hit` event to GA4 via the Measurement
 * Protocol. No-op unless `GA_MP_API_SECRET` is set, so dev/local stay silent.
 * The bot's User-Agent is deliberately NOT forwarded: GA4 auto-drops hits from
 * known bots by UA, and omitting it is what lets these hits survive into
 * reports.
 */
export function sendVisitorHit(
  visitorType: VisitorType,
  pageLocation: string,
  userAgent: string | undefined,
): void {
  const apiSecret = process.env["GA_MP_API_SECRET"];
  if (!apiSecret) return;

  const measurementId =
    process.env["GA_MEASUREMENT_ID"] || DEFAULT_MEASUREMENT_ID;
  const payload = buildVisitorHitPayload(visitorType, pageLocation, userAgent);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), SEND_TIMEOUT_MS);

  void fetch(
    `${GA_MP_ENDPOINT}?measurement_id=${measurementId}&api_secret=${apiSecret}`,
    {
      method: "POST",
      body: JSON.stringify(payload),
      signal: controller.signal,
    },
  )
    // Analytics must never affect request handling; swallow all errors.
    .catch(() => undefined)
    .finally(() => clearTimeout(timeout));
}
