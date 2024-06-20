import { z } from "zod";

export const OrderSchema = z.object({
    name: z.string().min(5, "El nombre debe tener al menos 5 caracteres"),    
});