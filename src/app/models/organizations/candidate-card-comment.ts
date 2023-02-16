export interface CandidateCardComment {
    id: number;
    comment: string;
    authorId: number;
    authorName: string | null;
    candidateCardId: string;
    createdAt: Date;
}
