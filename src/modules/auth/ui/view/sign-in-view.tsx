"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { SignInFormData } from "@/types/auth/auth";

const SignInView = () => {

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<SignInFormData>();

  const onSubmit: SubmitHandler<SignInFormData> = (data) => {
    console.log("Dados enviados:", data);
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
                  {...register("email", {required: "O e-mail é obrigatório"})}
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
                  {...register("password", {required: "A senha é obrigatória" })}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password.message}</p>
                )}
              </div>

              <Button type="submit" className="w-full">
                Logar
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                esqueceu a senha?{" "}
              </p>
            </div>
          </div>

          <div className="bg-gray-50 p-6 flex items-center justify-center">
            <div className="text center">
              <h3 className="text-x1 font-semibold mb-2">Bem-vindo ao Organiza Money</h3>
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
