FROM node:18-alpine AS base

# Instalar dependências necessárias
RUN apk add --no-cache libc6-compat

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências
RUN npm ci --only=production && npm cache clean --force

# Estágio de desenvolvimento
FROM base AS development

# Instalar todas as dependências (incluindo devDependencies)
RUN npm ci

# Copiar código fonte
COPY . .

# Expor porta
EXPOSE 3000

# Definir comando padrão para desenvolvimento
CMD ["npm", "run", "dev"]

# Estágio de build
FROM base AS builder

# Instalar todas as dependências
RUN npm ci

# Copiar código fonte
COPY . .

# Definir variável de ambiente para build
ENV NEXT_TELEMETRY_DISABLED 1

# Fazer build da aplicação
RUN npm run build

# Estágio de produção
FROM node:18-alpine AS production

# Instalar dependências do sistema
RUN apk add --no-cache libc6-compat

# Criar usuário não-root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos necessários do estágio builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Alterar propriedade dos arquivos
RUN chown -R nextjs:nodejs /app

# Usar usuário não-root
USER nextjs

# Expor porta
EXPOSE 3000

# Definir variáveis de ambiente
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
ENV PORT 3000

# Comando para iniciar a aplicação
CMD ["node", "server.js"]