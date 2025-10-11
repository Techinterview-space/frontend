import { z } from "zod";

export const SelectBoxItemSchema = <TIdType extends z.ZodTypeAny>(
  idSchema: TIdType,
) =>
  z.object({
    id: idSchema,
    name: z.string(),
  });

export type SelectBoxItem<TIdType> = {
  id: TIdType;
  name: string;
};
