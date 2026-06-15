import {
  buildVisitorHitPayload,
  clientIdFromUserAgent,
} from "./ga-measurement-protocol.util";

describe("clientIdFromUserAgent", () => {
  it("is stable for the same User-Agent", () => {
    const ua = "Mozilla/5.0 (compatible; GPTBot/1.2; +https://openai.com/gptbot)";
    expect(clientIdFromUserAgent(ua)).toBe(clientIdFromUserAgent(ua));
  });

  it("differs for different User-Agents", () => {
    expect(clientIdFromUserAgent("GPTBot/1.2")).not.toBe(
      clientIdFromUserAgent("ClaudeBot/1.0"),
    );
  });

  it("uses a fallback for a missing User-Agent and keeps the GA4 shape", () => {
    const id = clientIdFromUserAgent(undefined);
    expect(id).toBe(clientIdFromUserAgent(""));
    expect(id).toMatch(/^\d+\.0$/);
  });
});

describe("buildVisitorHitPayload", () => {
  it("builds a single visitor_hit event with the visitor_type param", () => {
    const payload = buildVisitorHitPayload(
      "ai-agent",
      "https://techinterview.space/companies",
      "ClaudeBot/1.0",
    );

    expect(payload.client_id).toMatch(/^\d+\.0$/);
    expect(payload.events.length).toBe(1);
    expect(payload.events[0].name).toBe("visitor_hit");
    expect(payload.events[0].params.visitor_type).toBe("ai-agent");
    expect(payload.events[0].params.page_location).toBe(
      "https://techinterview.space/companies",
    );
    expect(payload.events[0].params.engagement_time_msec).toBe("1");
  });

  it("carries the search-crawler visitor type through", () => {
    const payload = buildVisitorHitPayload(
      "search-crawler",
      "https://techinterview.space/",
      "Googlebot/2.1",
    );
    expect(payload.events[0].params.visitor_type).toBe("search-crawler");
  });
});
