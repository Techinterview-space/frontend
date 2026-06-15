import { classifyVisitor, VisitorType } from "./visitor-type.util";

describe("classifyVisitor", () => {
  const cases: { name: string; ua: string | undefined; expected: VisitorType }[] =
    [
      {
        name: "real Chrome on macOS",
        ua: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        expected: "human",
      },
      {
        name: "real Safari on iPhone",
        ua: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1",
        expected: "human",
      },
      {
        name: "GPTBot training crawler",
        ua: "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; GPTBot/1.2; +https://openai.com/gptbot",
        expected: "ai-agent",
      },
      {
        name: "ChatGPT-User live fetcher",
        ua: "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; ChatGPT-User/1.0; +https://openai.com/bot",
        expected: "ai-agent",
      },
      {
        name: "ClaudeBot",
        ua: "Mozilla/5.0 (compatible; ClaudeBot/1.0; +claudebot@anthropic.com)",
        expected: "ai-agent",
      },
      {
        name: "PerplexityBot",
        ua: "Mozilla/5.0 (compatible; PerplexityBot/1.0; +https://perplexity.ai/bot)",
        expected: "ai-agent",
      },
      {
        name: "Google-Extended wins over Googlebot substring",
        ua: "Mozilla/5.0 (compatible; Google-Extended/1.0)",
        expected: "ai-agent",
      },
      {
        name: "Applebot-Extended wins over Applebot substring",
        ua: "Mozilla/5.0 (compatible; Applebot-Extended/1.0; +http://www.apple.com/go/applebot)",
        expected: "ai-agent",
      },
      {
        name: "Googlebot search crawler",
        ua: "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
        expected: "search-crawler",
      },
      {
        name: "bingbot",
        ua: "Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)",
        expected: "search-crawler",
      },
      {
        name: "plain Applebot",
        ua: "Mozilla/5.0 (Device; OS) AppleWebKit (KHTML, like Gecko) Version Safari (Applebot/0.1; +http://www.apple.com/go/applebot)",
        expected: "search-crawler",
      },
      {
        name: "missing user-agent",
        ua: undefined,
        expected: "human",
      },
      {
        name: "empty user-agent",
        ua: "",
        expected: "human",
      },
    ];

  cases.forEach(({ name, ua, expected }) => {
    it(`classifies ${name} as ${expected}`, () => {
      expect(classifyVisitor(ua)).toBe(expected);
    });
  });
});
