import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { AuthService } from "@/services/auth/auth.service";
import { registerSchema, type RegisterFormData } from "../ui/validation/registerSchema";
import { useFormValidation } from "@/hooks/use-form-validation";
import { useState } from "react";

export const useRegister = () => {
  const { setUser, setToken } = useAuthStore();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const { form, validationErrors, setGeneralError, clearErrors } = useFormValidation(registerSchema);
  const { register, handleSubmit, formState: { errors }, reset } = form;

  const onSubmit = async (data: RegisterFormData) => {
    clearErrors();
    setLoading(true);

    const result = await AuthService.registrar(data);

    if (result.success && result.user && result.token) {
      // Registro bem-sucedido
      setUser(result.user);
      setToken(result.token);
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
    loading,
    validationErrors,

    // Ações
    reset,
  };
}; 