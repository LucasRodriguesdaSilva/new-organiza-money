# 🎨 Next.js Frontend

Aplicação frontend moderna desenvolvida com Next.js 14, TypeScript, Tailwind CSS e Docker.

## 📋 Índice

- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Desenvolvimento](#desenvolvimento)
- [Build e Deploy](#build-e-deploy)
- [Testes](#testes)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Comandos Úteis](#comandos-úteis)
- [Contribuição](#contribuição)

## 🔧 Pré-requisitos

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0 ou **yarn** >= 1.22.0
- **Docker** >= 20.10 (opcional)
- **Docker Compose** >= 2.0 (opcional)

## 📦 Instalação

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/seu-frontend.git
cd seu-frontend
```

### 2. Instalação com Docker (Recomendado)
```bash
# Desenvolvimento
make dev
# ou
docker-compose up -d

# Produção
make prod
# ou
docker-compose --profile production up -d
```

### 3. Instalação Local
```bash
# Instalar dependências
npm install

# Iniciar desenvolvimento
npm run dev
```

## ⚙️ Configuração

### 1. Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# API Backend
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_API_VERSION=v1

# Autenticação
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=sua_chave_secreta_aqui

# Banco de Dados (se usar Prisma)
DATABASE_URL="postgresql://user:password@localhost:5432/database"

# Uploadcare (se usar para uploads)
NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY=sua_chave_publica

# Analytics (opcional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_HOTJAR_ID=1234567

# Sentry (opcional)
SENTRY_DSN=https://sua-dsn@sentry.io/projeto
NEXT_PUBLIC_SENTRY_DSN=https://sua-dsn@sentry.io/projeto

# Stripe (se usar pagamentos)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

# Modo de desenvolvimento
NODE_ENV=development
```

### 2. Configuração do Next.js

Arquivo `next.config.js`:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuração para produção
  output: 'standalone',
  
  // Otimizações de imagem
  images: {
    domains: ['localhost', 'api.seudominio.com'],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Configurações experimentais
  experimental: {
    typedRoutes: true,
  },
  
  // Redirects
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },
  
  // Headers de segurança
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
```

### 3. Configuração do TypeScript

Arquivo `tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/hooks/*": ["./src/hooks/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/styles/*": ["./src/styles/*"],
      "@/types/*": ["./src/types/*"],
      "@/utils/*": ["./src/utils/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### 4. Configuração do Tailwind CSS

Arquivo `tailwind.config.js`:
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};
```

## 🚀 Desenvolvimento

### Iniciar Servidor de Desenvolvimento

```bash
# Com Docker
make dev

# Localmente
npm run dev

# Com debug
npm run dev -- --turbo
```

### Estrutura do Projeto App Router

```
src/
├── app/                    # App Router (Next.js 13+)
│   ├── (auth)/            # Grupo de rotas de autenticação
│   │   ├── login/
│   │   └── register/
│   ├── dashboard/         # Área restrita
│   ├── api/              # API Routes
│   │   ├── auth/
│   │   └── health/
│   ├── globals.css       # Estilos globais
│   ├── layout.tsx        # Layout principal
│   ├── page.tsx          # Página inicial
│   └── loading.tsx       # Loading UI
├── components/           # Componentes reutilizáveis
│   ├── ui/              # Componentes base
│   ├── forms/           # Formulários
│   └── layout/          # Componentes de layout
├── hooks/               # Custom hooks
├── lib/                 # Bibliotecas e configurações
├── stores/              # Estado global (Zustand)
├── types/               # Definições TypeScript
└── utils/               # Utilitários
```

### Comandos de Desenvolvimento

```bash
# Instalar dependência
npm install nome-da-biblioteca

# Adicionar dependência de desenvolvimento
npm install -D nome-da-biblioteca

# Atualizar dependências
npm update

# Verificar vulnerabilidades
npm audit

# Limpar cache
npm cache clean --force
```

## 🏗️ Build e Deploy

### Build Local

```bash
# Build de produção
npm run build

# Iniciar servidor de produção
npm start

# Analisar bundle
npm run analyze
```

### Deploy com Docker

```bash
# Build para produção
docker-compose --profile production up -d

# Ou usando Make
make prod
```

### Deploy Automático

O projeto inclui GitHub Actions para deploy automático. Configure os secrets necessários:

```
DOCKER_USERNAME=seu_usuario_docker
DOCKER_PASSWORD=sua_senha_docker
HOST=ip_do_servidor
USERNAME=usuario_ssh
SSH_KEY=chave_privada_ssh
NEXT_PUBLIC_API_URL=https://api.seudominio.com
```

## 🧪 Testes

### Configuração de Testes

Arquivo `jest.config.js`:
```javascript
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/app/layout.tsx',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};

module.exports = createJestConfig(customJestConfig);
```

### Executar Testes

```bash
# Testes unitários
npm run test

# Testes em modo watch
npm run test:watch

# Testes com cobertura
npm run test:ci

# Testes E2E
npm run test:e2e

# Com Docker
make test
```

### Estrutura de Testes

```
tests/
├── __mocks__/           # Mocks
├── unit/               # Testes unitários
├── integration/        # Testes de integração
├── e2e/               # Testes E2E (Playwright)
└── setup.ts           # Configuração dos testes
```

## 📝 Comandos Úteis

### Scripts do Package.json

```bash
npm run dev          # Desenvolvimento
npm run build        # Build produção
npm run start        # Servidor produção
npm run lint         # ESLint
npm run lint:fix     # Corrigir ESLint
npm run format       # Prettier
npm run format:check # Verificar formatação
npm run type-check   # Verificar tipos
npm run test         # Testes
npm run test:e2e     # Testes E2E
npm run analyze      # Analisar bundle
```

### Makefile

```bash
make help           # Mostrar ajuda
make dev            # Desenvolvimento
make prod           # Produção
make build          # Build imagens
make logs           # Ver logs
make shell          # Acessar container
make install        # Instalar dependências
make lint           # Executar linting
make test           # Executar testes
```

## 🎨 Estilização

### Tailwind CSS

```jsx
// Exemplo de componente estilizado
export function Button({ children, variant = 'primary' }) {
  const baseClasses = 'px-4 py-2 rounded-lg font-medium transition-colors';
  const variantClasses = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900',
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]}`}>
      {children}
    </button>
  );
}
```

### CSS Modules (alternativo)

```css
/* styles/Button.module.css */
.button {
  @apply px-4 py-2 rounded-lg font-medium transition-colors;
}

.primary {
  @apply bg-blue-500 hover:bg-blue-600 text-white;
}
```

## 🔌 Integração com API

### Cliente HTTP

```typescript
// lib/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
});

// Interceptor para token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

### Hooks Personalizados

```typescript
// hooks/useAuth.ts
import { useState, useEffect } from 'react';
import api from '@/lib/api';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async () => {
    try {
      const response = await api.get('/user');
      setUser(response.data);
    } catch (error) {
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  return { user, loading };
}
```

## 🔒 Segurança

### Configurações Implementadas

- ✅ Headers de segurança
- ✅ Sanitização de dados
- ✅ Validação de formulários
- ✅ Proteção CSRF
- ✅ Rate limiting
- ✅ Autenticação segura

### Middleware de Autenticação

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/dashboard/:path*',
};
```

## 📊 Performance

### Otimizações Implementadas

- ✅ Code splitting automático
- ✅ Lazy loading de componentes
- ✅ Otimização de imagens
- ✅ Compressão gzip
- ✅ Service Workers (PWA)
- ✅ Bundle analyzer

### Lighthouse CI

O projeto inclui Lighthouse CI para monitoramento de performance:

```javascript
// lighthouserc.js
module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:3000'],
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
      },
    },
  },
};
```

## 🤝 Contribuição

### Padrões de Código

- **ESLint** + **Prettier** para formatação
- **TypeScript** para tipagem
- **Conventional Commits** para mensagens
- **Husky** para git hooks

### Workflow de Desenvolvimento

1. Fork o repositório
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Desenvolva e teste sua funcionalidade
4. Commit suas mudanças (`git commit -m 'feat: adiciona nova funcionalidade'`)
5. Push para a branch (`git push origin feature/nova-funcionalidade`)
6. Abra um Pull Request

### Pre-commit Hooks

```json
// .husky/pre-commit
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npm run lint
npm run type-check
npm run test
```

## 📞 Suporte

- **Documentação Next.js**: [Next.js Docs](https://nextjs.org/docs)
- **Issues**: [GitHub Issues](https://github.com/seu-usuario/seu-frontend/issues)
- **Discord**: [Next.js Discord](https://discord.gg/nextjs)

## 🌐 URLs Úteis

- **Desenvolvimento**: http://localhost:3000
- **Produção**: https://seudominio.com
- **Storybook**: http://localhost:6006 (se configurado)
- **Bundle Analyzer**: http://localhost:8888 (após `npm run analyze`)

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

**Desenvolvido com ❤️ usando Next.js + TypeScript**