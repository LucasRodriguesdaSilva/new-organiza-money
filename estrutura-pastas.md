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
│   │   ├── validations.ts         # Schemas de validação (Zod)
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
│       ├── components.css         # Estilos de componentes
│       └── utilities.css          # Classes utilitárias customizadas
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