"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { SignInFormData } from "@/types/auth/auth";
import { AuthService } from "@/services/auth/auth.service";
import { useAuthStore } from "@/store/auth-store";
import { useRouter } from "nextjs-toploader/app";
import { useState } from "react";

const SignInView = () => {

  const { setUser, setToken } = useAuthStore();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignInFormData>();

  const onSubmit: SubmitHandler<SignInFormData> = async (data) => {
    console.log("Dados enviados:", data);
    setLoading(true);
    const result = await AuthService.login(data);

    if (result.success && result.user && result.token) {
      // Registro bem-sucedido
      setUser(result.user);
      setToken(result.token);
      setLoading(false);

      // Limpar formulário
      reset();

      // Redirecionar para dashboard
      router.push("/dashboard");

    } else {
      // Erro no registro
      setLoading(false);
      if (result.message) {
        console.error("Erro ao fazer login:", result.message);
      }
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="p-6">
            <h2 className="text-2x1 font-bold mb-4">Fazer Login</h2>
            <p className="text-muted-foreground mb-6">
              Preencha os dados abaixo para se logar
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Digite seu e-mail"
                  className="border-cinze-500"
                  {...register("email", {
                    required: "O e-mail é obrigatório",
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Digite sua senha"
                  className="border-cinze-500"
                  {...register("password", {
                    required: "A senha é obrigatória",
                  })}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password.message}</p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Carregando..." : "Logar"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Esqueceu a senha?{" "}
                <a href="/auth/forgot-password"
                  className="underline underline-offset-4 text-primary hover:text-primary-dark"> Recuperar senha
                </a>
              </p>
            </div>
          </div>

          <div className="bg-gray-50 p-6 flex items-center justify-center">
            <div className="text center">
              <h3 className="text-x1 font-semibold mb-2">
                Bem-vindo ao Organiza Money
              </h3>
              <p className="text-gray-600">
                Organize suas finanças de forma simples e eficiente
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our{" "}
        <a href="#" className="underline underline-offset-4">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="underline underline-offset-4">
          Privacy Policy
        </a>
      </div>
    </div>
  );
};

export default SignInView;
