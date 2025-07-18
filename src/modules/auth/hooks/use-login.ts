import { useAuthStore } from "@/store/auth-store";
import { useFormValidation } from "@/hooks/use-form-validation";
import { loginSchema, LoginFormData } from "@/modules/auth/ui/validation/loginSchema";

export const useLogin = () => {
  const { setLoading, setError, isLoading } = useAuthStore();
  
  const { form, clearErrors } = useFormValidation(loginSchema);
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
    handleSubmit: handleSubmit(onSubmit),
    errors,
    
    // Estado
    isLoading,
    
    // Ações
    reset,
  };
}; 