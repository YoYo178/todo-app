FROM node:26-alpine AS builder
WORKDIR /app

COPY package.json pnpm-lock.yaml tsconfig.* eslint.config.ts pnpm-workspace.yaml ./

# Starting node v5, corepack is no longer shipped by default
RUN npm install -g corepack

RUN corepack enable

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

FROM node:26-alpine AS production
WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN npm install -g corepack

RUN corepack enable

RUN pnpm install --prod --frozen-lockfile

COPY --from=builder /app/dist ./dist

CMD ["node", "./dist/index.js"]

