import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { AuthService } from "@/services/auth.service";
import { registerSchema, type RegisterFormData } from "../ui/validation/registerSchema";
import { useFormValidation } from "@/hooks/use-form-validation";

export const useRegister = () => {
  const { setUser, setToken, setLoading, setError, isLoading } = useAuthStore();
  const router = useRouter();
  
  const { form, validationErrors, setGeneralError, clearErrors } = useFormValidation(registerSchema);
  const { register, handleSubmit, formState: { errors }, reset } = form;

  const onSubmit = async (data: RegisterFormData) => {
    clearErrors();
    setLoading(true);
    setError(null);
    
    const result = await AuthService.register(data);
    
    if (result.success && result.data) {
      // Registro bem-sucedido
      setUser(result.data.user);
      setToken(result.data.token);
      setLoading(false);
      
      // Limpar formulário
      reset();
      
      // Redirecionar para dashboard
      router.push('/dashboard');
      
      return { success: true };
    } else {
      // Erro no registro
      setLoading(false);
      if (result.message) {
        setGeneralError(result.message);
      }
      
      return { success: false, message: result.message };
    }
  };

  return {
    // Formulário
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    
    // Estado
    isLoading,
    validationErrors,
    
    // Ações
    reset,
  };
}; 