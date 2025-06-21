export interface GitHubProfile {
  id: string;
  githubId: number;
  username: string;
  avatarUrl: string | null;
  profileUrl: string;
  name: string | null;
  bio: string | null;
  location: string | null;
  email: string | null;
  publicRepos: number;
  followers: number;
  following: number;
  createdAt: string;
  updatedAt: string;
}

export interface GitHubChat {
  id: string;
  chatId: number;
  chatName: string | null;
  usageCount: number;
  githubProfiles: GitHubProfile[];
  createdAt: string;
  updatedAt: string;
}

export interface GitHubProcessingJob {
  id: string;
  jobType: string;
  status: GitHubJobStatus;
  githubProfileId: string | null;
  githubProfile: GitHubProfile | null;
  errorMessage: string | null;
  processedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export enum GitHubJobStatus {
  Pending = 0,
  Processing = 1,
  Completed = 2,
  Failed = 3,
}