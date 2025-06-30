import { z } from "zod";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { useFormValidation } from "@/hooks/use-form-validation";

// Schema de validação para login
const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(1, "Senha é obrigatória"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const useLogin = () => {
  const { setUser, setToken, setLoading, setError, isLoading } = useAuthStore();
  const router = useRouter();
  
  const { form, validationErrors, setGeneralError, clearErrors } = useFormValidation(loginSchema);
  const { register, handleSubmit, formState: { errors }, reset } = form;

  const onSubmit = async (data: LoginFormData) => {
    clearErrors();
    setLoading(true);
    setError(null);
    
    // Aqui você implementaria a lógica de login
    // const result = await AuthService.login(data);
    
    // Por enquanto, apenas simula
    console.log('Login data:', data);
    
    setLoading(false);
    return { success: true };
  };

  return {
    // Formulário
    register,
    handleSubmit: handleSubmit(onSubmit as any),
    errors,
    
    // Estado
    isLoading,
    validationErrors,
    
    // Ações
    reset,
  };
}; 