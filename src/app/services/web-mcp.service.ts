import { isPlatformBrowser } from "@angular/common";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";

interface WebMcpTool {
  name: string;
  description: string;
  inputSchema: object;
  execute: (input: Record<string, unknown>) => Promise<unknown> | unknown;
}

interface WebMcpProvider {
  provideContext?: (context: { tools: WebMcpTool[] }) => void;
}

declare global {
  interface Navigator {
    modelContext?: WebMcpProvider;
  }
}

const FRONTEND_ORIGIN = "https://techinterview.space";

@Injectable({ providedIn: "root" })
export class WebMcpService {
  constructor(@Inject(PLATFORM_ID) private readonly platformId: object) {}

  register(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const modelContext = navigator.modelContext;
    if (!modelContext?.provideContext) {
      return;
    }

    modelContext.provideContext({
      tools: [
        {
          name: "search-salaries-overview",
          description:
            "Look up aggregate IT salary statistics on Techinterview.space. Returns the canonical URL for the public salaries overview page, optionally filtered by profession.",
          inputSchema: {
            type: "object",
            properties: {
              profession: {
                type: "string",
                description:
                  "Optional profession slug to filter the overview (e.g. 'backend-developer'). Omit to get the unfiltered overview.",
              },
            },
            additionalProperties: false,
          },
          execute: (input: Record<string, unknown>) => {
            const profession =
              typeof input?.["profession"] === "string"
                ? (input["profession"] as string).trim()
                : "";
            const url = profession
              ? `${FRONTEND_ORIGIN}/salaries/overview?profession=${encodeURIComponent(profession)}`
              : `${FRONTEND_ORIGIN}/salaries/overview`;
            return {
              url,
              contentType: "text/html",
              description:
                "Server-rendered overview with grade, city, profession, experience, age, gender, skills, and industry breakdowns.",
            };
          },
        },
        {
          name: "search-companies",
          description:
            "Search company reviews on Techinterview.space by company name. Returns the canonical URL for the companies listing, optionally pre-filtered by query.",
          inputSchema: {
            type: "object",
            properties: {
              query: {
                type: "string",
                description: "Company name or partial name to search for.",
              },
            },
            additionalProperties: false,
          },
          execute: (input: Record<string, unknown>) => {
            const query =
              typeof input?.["query"] === "string"
                ? (input["query"] as string).trim()
                : "";
            const url = query
              ? `${FRONTEND_ORIGIN}/companies?q=${encodeURIComponent(query)}`
              : `${FRONTEND_ORIGIN}/companies`;
            return {
              url,
              contentType: "text/html",
              description:
                "Employer ratings and individual reviews. Pages include EmployerAggregateRating and Review structured data.",
            };
          },
        },
        {
          name: "fetch-site-overview",
          description:
            "Fetch the agent-skill markdown summarising Techinterview.space content surfaces, public endpoints, and attribution guidance.",
          inputSchema: {
            type: "object",
            properties: {},
            additionalProperties: false,
          },
          execute: () => ({
            url: `${FRONTEND_ORIGIN}/.well-known/agent-skills/site-overview/SKILL.md`,
            contentType: "text/markdown",
            description:
              "Canonical agent-skill markdown. Cite content as 'Techinterview.space' using each page's canonical URL.",
          }),
        },
      ],
    });
  }
}
