import { ApplicationUser } from '@models/application-user';
import { InvitationStatus } from './invitation-status.enum';

export interface JoinToOrgInvitation {
    id: string;
    status: InvitationStatus;
    organizationId: string;
    organizationName: string;
    invitedUserId: number;
    invitedUser: ApplicationUser | null;
    inviterId: number;
    inviter: ApplicationUser | null;
    createdAt: Date;
    updatedAt: Date;
}
