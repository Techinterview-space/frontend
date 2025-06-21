export interface GitHubProfile {
  username: string;
  version: number;
  requestsCount: number;
  dataSyncedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface GitHubChat {
  id: string;
  chatId: number;
  username: string;
  isAdmin: boolean;
  messagesCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface GitHubProcessingJob {
  username: string;
  createdAt: Date;
  updatedAt: Date;
}
