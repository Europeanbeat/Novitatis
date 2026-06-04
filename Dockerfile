# Production image for the Next.js 16 site, used by Dokploy.
FROM node:22-slim

WORKDIR /app

# Install dependencies first so this layer is cached when only code changes.
COPY package*.json ./
RUN npm install

# Copy the rest of the source and build the production bundle.
COPY . .
RUN npm run build

ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

# `next start` serves the build produced above.
CMD ["npm", "start"]
