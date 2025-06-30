"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRegister } from "@/modules/auth/hooks";

const SignUpView = () => {
  const { register, handleSubmit, errors, isLoading, validationErrors } = useRegister();

  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Criar conta</h2>
            <p className="text-muted-foreground mb-6">
              Preencha os dados abaixo para criar sua conta
            </p>
            
            {validationErrors.general && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                {validationErrors.general}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome completo</Label>
                <Input
                  id="name"
                  {...register("name")}
                  placeholder="Digite seu nome completo"
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="Digite seu e-mail"
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                  placeholder="Digite sua senha"
                  className={errors.password ? "border-red-500" : ""}
                />
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password_confirmation">Confirmar senha</Label>
                <Input
                  id="password_confirmation"
                  type="password"
                  {...register("password_confirmation")}
                  placeholder="Confirme sua senha"
                  className={errors.password_confirmation ? "border-red-500" : ""}
                />
                {errors.password_confirmation && (
                  <p className="text-sm text-red-500">{errors.password_confirmation.message}</p>
                )}
              </div>

              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? 'Criando conta...' : 'Criar conta'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Já tem uma conta?{" "}
                <a href="/sign-in" className="text-primary hover:underline">
                  Faça login
                </a>
              </p>
            </div>
          </div>
          
          <div className="bg-gray-50 p-6 flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Bem-vindo ao Organiza Money</h3>
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

export default SignUpView;
