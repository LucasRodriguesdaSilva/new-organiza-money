import { z } from "zod";

export const loginSchema = z.object({
    email: z
      .string()
      .email("E-mail inválido")
      .min(1, "E-mail é obrigatório"),
    password: z
      .string()
      .min(1, "Senha é obrigatória"),
  });
  
  export type LoginFormData = z.infer<typeof loginSchema>; 