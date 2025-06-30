# Estrutura de Pastas - Next.js + Tailwind + shadcn/ui

```
my-nextjs-app/
├── .env.local                      # Variáveis de ambiente locais
├── .env.example                    # Exemplo de variáveis de ambiente
├── .gitignore                      # Arquivos ignorados pelo Git
├── .eslintrc.json                  # Configuração do ESLint
├── .prettierrc                     # Configuração do Prettier
├── next.config.js                  # Configuração do Next.js
├── package.json                    # Dependências e scripts
├── README.md                       # Documentação do projeto
├── tailwind.config.js              # Configuração do Tailwind CSS
├── tsconfig.json                   # Configuração do TypeScript
├── components.json                 # Configuração do shadcn/ui
├── postcss.config.js               # Configuração do PostCSS
│
├── public/                         # Arquivos estáticos
│   ├── images/                     # Imagens
│   ├── icons/                      # Ícones
│   ├── favicon.ico                 # Favicon
│   └── robots.txt                  # Robots.txt
│
├── src/                           # Código fonte principal
│   ├── app/                       # App Router (Next.js 13+)
│   │   ├── globals.css            # Estilos globais + Tailwind
│   │   ├── layout.tsx             # Layout raiz
│   │   ├── page.tsx               # Página inicial
│   │   ├── loading.tsx            # Componente de loading
│   │   ├── error.tsx              # Componente de erro
│   │   ├── not-found.tsx          # Página 404
│   │   │
│   │   ├── (auth)/                # Grupo de rotas de autenticação
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── register/
│   │   │       └── page.tsx
│   │   │
│   │   ├── dashboard/             # Rota dashboard
│   │   │   ├── page.tsx
│   │   │   ├── layout.tsx
│   │   │   └── settings/
│   │   │       └── page.tsx
│   │   │
│   │   └── api/                   # API Routes
│   │       ├── auth/
│   │       │   └── route.ts
│   │       └── users/
│   │           └── route.ts
│   │
│   ├── components/                # Componentes reutilizáveis
│   │   ├── ui/                    # Componentes shadcn/ui
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── form.tsx
│   │   │   ├── label.tsx
│   │   │   ├── select.tsx
│   │   │   ├── table.tsx
│   │   │   ├── toast.tsx
│   │   │   └── toaster.tsx
│   │   │
│   │   ├── layout/                # Componentes de layout
│   │   │   ├── header.tsx
│   │   │   ├── footer.tsx
│   │   │   ├── sidebar.tsx
│   │   │   └── navigation.tsx
│   │   │
│   │   ├── forms/                 # Componentes de formulários
│   │   │   ├── login-form.tsx
│   │   │   ├── contact-form.tsx
│   │   │   └── user-form.tsx
│   │   │
│   │   └── common/                # Componentes comuns
│   │       ├── loading-spinner.tsx
│   │       ├── error-boundary.tsx
│   │       ├── modal.tsx
│   │       └── data-table.tsx
│   │
│   ├── lib/                       # Utilitários e configurações
│   │   ├── utils.ts               # Utilitários gerais (cn, etc.)
│   │   ├── auth.ts                # Configuração de autenticação
│   │   ├── db.ts                  # Configuração do banco de dados
│   │   ├── api.ts                 # Cliente API
│   │   └── constants.ts           # Constantes da aplicação
│   │
│   ├── hooks/                     # Custom hooks
│   │   ├── use-local-storage.ts
│   │   ├── use-debounce.ts
│   │   ├── use-auth.ts
│   │   └── use-toast.ts
│   │
│   ├── context/                   # Context providers
│   │   ├── auth-context.tsx
│   │   ├── theme-context.tsx
│   │   └── toast-context.tsx
│   │
│   ├── store/                     # Estado global (Zustand/Redux)
│   │   ├── auth-store.ts
│   │   ├── user-store.ts
│   │   └── ui-store.ts
│   │
│   ├── types/                     # Definições de tipos TypeScript
│   │   ├── auth.ts
│   │   ├── user.ts
│   │   ├── api.ts
│   │   └── global.d.ts
│   │
│   └── styles/                    # Estilos adicionais
│   |   ├── components.css         # Estilos de componentes
│   |    └── utilities.css          # Classes utilitárias customizadas
|   |__ modules/
|   |     |-- auth/ui/view        # views das páginas, onde fica todo o layout da página feito como um 'use client' 
|   |     |-- home/ui/view        # views das páginas, onde fica todo o layout da página feito como um 'use client'
|   |     |-- ...                 # views das páginas, onde fica todo o layout da página feito como um 'use client'

│
├── docs/                          # Documentação
│   ├── api.md
│   ├── deployment.md
│   └── contributing.md
│
└── tests/                         # Testes
    ├── __mocks__/                 # Mocks para testes
    ├── components/                # Testes de componentes
    ├── pages/                     # Testes de páginas
    ├── utils/                     # Testes de utilitários
    └── setup.ts                   # Configuração dos testes
```

## Arquivos de Configuração Principais

### `components.json` (shadcn/ui)
```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "src/app/globals.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

### `src/app/globals.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    /* mais variáveis CSS do shadcn/ui */
  }
}
```

### `src/lib/utils.ts`
```typescript
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

## Comandos para Configuração

```bash
# Criar projeto Next.js
npx create-next-app@latest my-nextjs-app --typescript --tailwind --eslint --app

# Instalar shadcn/ui
npx shadcn-ui@latest init

# Adicionar componentes shadcn/ui
npx shadcn-ui@latest add button input card dialog form
```

## Características da Estrutura

- **App Router**: Utiliza o novo sistema de roteamento do Next.js 13+
- **Componentes shadcn/ui**: Organizados na pasta `components/ui/`
- **Tipagem**: Tipos TypeScript organizados por domínio
- **Hooks Customizados**: Lógica reutilizável em hooks
- **Separação de Responsabilidades**: Cada pasta tem uma função específica
- **Escalabilidade**: Estrutura preparada para crescimento do projeto


---- Novas adições cursor

# Módulo de Autenticação

Este módulo implementa o sistema de autenticação usando Zustand para gerenciamento de estado e comunicação direta com a API Laravel.

## 📁 Estrutura

```
src/
├── store/
│   └── auth-store.ts           # Gerenciamento de estado (Zustand)
├── services/
│   └── auth.service.ts         # Requisições para API Laravel
├── types/
│   └── auth.ts                 # Tipos TypeScript
├── lib/
│   ├── api.ts                  # Configuração do axios
│   └── validations.ts          # Schemas de validação (Zod)
└── modules/auth/
    └── ui/view/
        └── sign-up-view.tsx    # Componente de registro
    └── ui/validations/
        └── registerSchema.tsx    # Validação Registro
        └── loginSchema.tsx    # Validação Login
```

## 🚀 Funcionalidades Implementadas

### ✅ Cadastro de Usuários
- Formulário de registro com validação Zod
- Integração com Zustand store
- Comunicação direta com API Laravel
- Tratamento de erros
- Redirecionamento após sucesso

## 🔧 Configuração Necessária

### 1. Variáveis de Ambiente
Crie um arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

### 2. Backend Laravel
Certifique-se de que o backend Laravel tenha as seguintes rotas:

```php
// routes/api.php
Route::post('/auth/register', [AuthController::class, 'register']);
```

## 🔄 Fluxo de Dados (Corrigido)

1. **Usuário preenche formulário** → SignUpView
2. **Validação client-side** → Zod schema
3. **Service faz requisição** → AuthService → Laravel
4. **Atualização do estado** → Zustand store
5. **Redirecionamento** → Dashboard

## 📝 Como Usar

### Acessar a página de registro:
```
http://localhost:3000/sign-up
```

### Componente SignUpView:
```typescript
import SignUpView from "@/modules/auth/ui/view/sign-up-view";

// Usar em uma página
const Page = () => {
  return <SignUpView />;
};
```

## 🎯 Separação de Responsabilidades

### **Store (Zustand)**
- ✅ Gerencia estado da aplicação
- ✅ Persistência no localStorage
- ❌ NÃO faz requisições

### **Service**
- ✅ Faz requisições para API Laravel
- ✅ Trata erros de rede
- ❌ NÃO gerencia estado

### **Componente**
- ✅ Renderiza UI
- ✅ Usa store e service
- ✅ Validação de formulário

### **Validação**
- ✅ **Frontend (Zod)**: UX imediata
- ✅ **Backend (Laravel)**: Segurança

## 🎯 Próximos Passos

- [ ] Implementar login
- [ ] Implementar logout
- [ ] Proteção de rotas
- [ ] Refresh token
- [ ] Recuperação de senha
- [ ] Verificação de email

## 🛠️ Dependências

- `zustand` - Gerenciamento de estado
- `axios` - Cliente HTTP
- `zod` - Validação de schemas
- `react-hook-form` - Gerenciamento de formulários
- `@hookform/resolvers` - Integração Zod + React Hook Form 


--- att cursor

# Módulo de Autenticação

Este módulo implementa o sistema de autenticação usando Zustand para gerenciamento de estado, hooks customizados para lógica de negócio e comunicação direta com a API Laravel.

## 📁 Estrutura

```
src/
├── store/
│   └── auth-store.ts                    # Gerenciamento de estado (Zustand)
├── services/
│   └── auth.service.ts                  # Requisições para API Laravel
├── types/
│   └── auth.ts                          # Tipos TypeScript
├── lib/
│   └── api.ts                           # Configuração do axios
└── modules/auth/
    ├── hooks/
    │   ├── use-auth.ts                  # Hook principal de autenticação
    │   ├── use-register.ts              # Hook específico para registro
    │   ├── use-login.ts                 # Hook específico para login
    │   ├── use-form-validation.ts       # Hook genérico para validação
    │   └── index.ts                     # Exportações centralizadas
    ├── ui/
    │   ├── validation/
    │   │   └── registerSchema.ts        # Schema de validação Zod
    │   └── view/
    │       └── sign-up-view.tsx         # Componente de registro
    └── README.md                        # Esta documentação
```

## 🚀 Funcionalidades Implementadas

### ✅ Cadastro de Usuários
- Formulário de registro com validação Zod
- Hooks customizados para melhor organização
- Integração com Zustand store
- Comunicação direta com API Laravel
- Tratamento de erros
- Redirecionamento após sucesso

## 🎯 Hooks Customizados

### **useAuth** - Hook Principal
```typescript
const { user, isAuthenticated, register, logout } = useAuth();
```

### **useRegister** - Hook Específico
```typescript
const { register, handleSubmit, errors, isLoading } = useRegister();
```

### **useFormValidation** - Hook Genérico
```typescript
const { form, validationErrors, setGeneralError } = useFormValidation(schema);
```

## 📝 Como Usar

### Componente Simplificado:
```typescript
import { useRegister } from "@/modules/auth/hooks";

const SignUpView = () => {
  const { register, handleSubmit, errors, isLoading } = useRegister();
  
  return (
    <form onSubmit={handleSubmit}>
      <input {...register("name")} />
      {errors.name && <span>{errors.name.message}</span>}
      <button disabled={isLoading}>Cadastrar</button>
    </form>
  );
};
```

### Criando Novos Hooks:
```typescript
import { useFormValidation } from "@/modules/auth/hooks";

export const useCustomForm = () => {
  const { form, validationErrors, setGeneralError } = useFormValidation(customSchema);
  const { register, handleSubmit, errors } = form;
  
  // Sua lógica aqui...
  
  return { register, handleSubmit, errors, validationErrors };
};
```

## 🔧 Configuração Necessária

### 1. Variáveis de Ambiente
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

### 2. Backend Laravel
```php
Route::post('/auth/register', [AuthController::class, 'register']);
```

## 🔄 Fluxo de Dados

1. **Usuário preenche formulário** → SignUpView
2. **Hook useRegister** → Validação + Requisição
3. **Service AuthService** → Comunicação com Laravel
4. **Store Zustand** → Atualização de estado
5. **Hook useRegister** → Redirecionamento

## 🎯 Benefícios dos Hooks

### **Legibilidade**
- Componentes mais limpos e focados na UI
- Lógica de negócio encapsulada nos hooks

### **Reutilização**
- Hooks podem ser usados em múltiplos componentes
- Lógica compartilhada entre diferentes formulários

### **Testabilidade**
- Hooks podem ser testados isoladamente
- Separação clara entre UI e lógica

### **Manutenibilidade**
- Mudanças na lógica não afetam a UI
- Estrutura modular e organizada

## 🎯 Próximos Passos

- [ ] Implementar login com useLogin hook
- [ ] Implementar logout
- [ ] Proteção de rotas
- [ ] Refresh token
- [ ] Recuperação de senha
- [ ] Verificação de email

## 🛠️ Dependências

- `zustand` - Gerenciamento de estado
- `axios` - Cliente HTTP
- `zod` - Validação de schemas
- `react-hook-form` - Gerenciamento de formulários
- `@hookform/resolvers` - Integração Zod + React Hook Form
