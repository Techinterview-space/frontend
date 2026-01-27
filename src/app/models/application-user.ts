import { z } from "zod";
import { UserRole } from "./enums";

export enum AuthProvider {
  Email = "Email",
  Google = "Google",
  GitHub = "GitHub",
}

export const ApplicationUserSchema = z.object({
  id: z.number(),
  email: z.string().nullable(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  fullname: z.string(),
  pictureProfile: z.string().nullable(),
  roles: z.array(z.nativeEnum(UserRole)),
  emailConfirmed: z.boolean(),
  unsubscribeMeFromAll: z.boolean(),
  identityId: z.number().nullable(),
  isMfaEnabled: z.boolean(),
  deletedAt: z.date().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
  // Security-related fields
  authProvider: z.nativeEnum(AuthProvider).optional(),
  failedLoginAttempts: z.number().optional(),
  lockedUntil: z.date().nullable().optional(),
  isLockedOut: z.boolean().optional(),
  hasPendingEmailVerification: z.boolean().optional(),
});

export type ApplicationUser = z.infer<typeof ApplicationUserSchema>;
