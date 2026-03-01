export interface MonitoredChannel {
  id: number;
  channelExternalId: number;
  channelName: string;
  discussionChatExternalId: number | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateMonitoredChannelRequest {
  channelExternalId: number;
  channelName: string;
  discussionChatExternalId: number | null;
}

export interface UpdateMonitoredChannelRequest {
  channelName: string;
  discussionChatExternalId: number | null;
  isActive: boolean;
}

export interface MonthlyStatsRunDto {
  id: number;
  monitoredChannelId: number;
  month: Date;
  triggerSource: number;
  triggerSourceAsString: string;
  calculatedAtUtc: Date;
  postsCountTotal: number;
  averagePostsPerDay: number;
  mostLikedPostId: number | null;
  mostLikedPostRef: string | null;
  mostLikedPostLikes: number | null;
  mostCommentedPostId: number | null;
  mostCommentedPostRef: string | null;
  mostCommentedPostComments: number | null;
  maxPostsDayUtc: Date | null;
  maxPostsCount: number;
  minPostsDayUtc: Date | null;
  minPostsCount: number;
}

export interface RunMonthlyStatsResponse {
  runs: MonthlyStatsRunDto[];
  errors: RunMonthlyStatsError[];
}

export interface RunMonthlyStatsError {
  monitoredChannelId: number;
  channelName: string;
  errorMessage: string;
}

export interface SendStatsRunResponse {
  success: boolean;
  errorMessage: string | null;
}
