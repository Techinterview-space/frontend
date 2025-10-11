import { z } from "zod";
import { UserRole } from "./enums";

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
});

export type ApplicationUser = z.infer<typeof ApplicationUserSchema>;
