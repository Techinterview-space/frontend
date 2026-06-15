/**
 * Classifies an incoming request by its `User-Agent` into one of three buckets.
 * GA4 runs client-side and never fires for non-JS bots, so the SSR server is the
 * only place crawler and AI-agent traffic can be observed. Detection is
 * best-effort: a `User-Agent` can be spoofed, so this is for measurement, not
 * access control.
 */
export type VisitorType = "ai-agent" | "search-crawler" | "human";

/**
 * AI agents: model-training/indexing crawlers AND live, on-demand fetchers.
 * The "-User"/"SearchBot" variants mean a real person is reading the page
 * through an AI assistant, which is the most valuable bucket for us to know.
 */
const AI_AGENT_PATTERNS: readonly RegExp[] = [
  /GPTBot/i,
  /ChatGPT-User/i,
  /OAI-SearchBot/i,
  /ClaudeBot/i,
  /Claude-User/i,
  /Claude-SearchBot/i,
  /anthropic-ai/i,
  /PerplexityBot/i,
  /Perplexity-User/i,
  /Google-Extended/i,
  /Google-CloudVertexBot/i,
  /Applebot-Extended/i,
  /Meta-ExternalAgent/i,
  /Bytespider/i,
  /CCBot/i,
  /cohere-ai/i,
  /DuckAssistBot/i,
  /YouBot/i,
  /Amazonbot/i,
];

const SEARCH_CRAWLER_PATTERNS: readonly RegExp[] = [
  /Googlebot/i,
  /bingbot/i,
  /Slurp/i,
  /DuckDuckBot/i,
  /YandexBot/i,
  /Baiduspider/i,
  /Applebot/i,
  /facebookexternalhit/i,
  /Twitterbot/i,
  /LinkedInBot/i,
  /Discordbot/i,
  /TelegramBot/i,
];

export function classifyVisitor(userAgent: string | undefined): VisitorType {
  // Real browsers always send a User-Agent; treat a missing one as human since
  // we never block on this signal and would rather not mislabel a person.
  if (!userAgent) return "human";

  // AI patterns are checked first so "-Extended"/"-User" variants win over their
  // plain search-crawler counterparts (e.g. Google-Extended vs Googlebot).
  if (AI_AGENT_PATTERNS.some((pattern) => pattern.test(userAgent))) {
    return "ai-agent";
  }
  if (SEARCH_CRAWLER_PATTERNS.some((pattern) => pattern.test(userAgent))) {
    return "search-crawler";
  }
  return "human";
}
