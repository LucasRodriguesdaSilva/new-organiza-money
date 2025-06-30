import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const useFormValidation = <T extends z.ZodTypeAny>(
  schema: T,
  defaultValues?: Partial<z.infer<T>>
) => {
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const form = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as any,
  });

  const setServerError = (field: string, message: string) => {
    setValidationErrors(prev => ({ ...prev, [field]: message }));
  };

  const setGeneralError = (message: string) => {
    setValidationErrors(prev => ({ ...prev, general: message }));
  };

  const clearErrors = () => {
    setValidationErrors({});
  };

  return {
    form,
    validationErrors,
    setServerError,
    setGeneralError,
    clearErrors,
  };
}; 