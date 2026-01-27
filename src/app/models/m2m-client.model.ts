export interface M2mClientModel {
  id: number;
  name: string;
  description: string | null;
  clientId: string;
  scopes: string[];
  isActive: boolean;
  createdByUserId: number;
  createdByUserEmail: string;
  lastUsedAt: Date | null;
  lastUsedIpAddress: string | null;
  rateLimitPerMinute: number | null;
  rateLimitPerDay: number | null;
  createdAt: Date;
}

export interface M2mClientCreateRequest {
  name: string;
  description: string | null;
  scopes: string[];
  rateLimitPerMinute: number | null;
  rateLimitPerDay: number | null;
}

export interface M2mClientCreateResponse {
  id: number;
  name: string;
  clientId: string;
  clientSecret: string;
  scopes: string[];
  createdAt: Date;
}

export interface M2mClientUpdateRequest {
  name: string;
  description: string | null;
  rateLimitPerMinute: number | null;
  rateLimitPerDay: number | null;
}

export interface M2mTokenResponse {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  scopes: string[];
}

export const M2M_SCOPES = [
  {
    value: "salaries:read",
    label: "Read Salaries",
    description: "Access salary data",
  },
  {
    value: "salaries:write",
    label: "Write Salaries",
    description: "Create/update salary records",
  },
  {
    value: "interviews:read",
    label: "Read Interviews",
    description: "Access interview data",
  },
  {
    value: "interviews:write",
    label: "Write Interviews",
    description: "Create/update interviews",
  },
  {
    value: "companies:read",
    label: "Read Companies",
    description: "Access company data",
  },
  {
    value: "companies:write",
    label: "Write Companies",
    description: "Create/update companies",
  },
  {
    value: "users:read",
    label: "Read Users",
    description: "Access user data (admin)",
  },
  {
    value: "users:write",
    label: "Write Users",
    description: "Manage users (admin)",
  },
  {
    value: "stats:read",
    label: "Read Statistics",
    description: "Access analytics data",
  },
  { value: "*", label: "Full Access", description: "Access all endpoints" },
] as const;
