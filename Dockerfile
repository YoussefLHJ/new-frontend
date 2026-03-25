# ============================================================
# Stage 1: Build the Angular application
# ============================================================
FROM node:22-alpine AS build

WORKDIR /app

# Copy dependency manifests first to leverage Docker layer caching.
# This layer is only rebuilt when package.json or package-lock.json change.
COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps

# Copy the rest of the source code and build for production
COPY . .
RUN npm run build

# ============================================================
# Stage 2: Serve the built application with Nginx
# ============================================================
FROM nginx:1.27-alpine

# Profile determines which nginx/ssl config set to use (localhost | prod)
ARG PROFILE=localhost
ENV PROFILE=${PROFILE}

RUN mkdir -p /etc/nginx/ssl

# Copy the compiled Angular output (application builder outputs to browser/)
COPY --from=build /app/dist/sakai-ng/browser /usr/share/nginx/html

# Copy profile-specific Nginx configuration
COPY src/zyn/nginx/${PROFILE}/nginx.conf  /etc/nginx/nginx.conf
COPY src/zyn/nginx/${PROFILE}/default.conf /etc/nginx/conf.d/default.conf

# Copy profile-specific SSL certificates
COPY src/zyn/ssl/${PROFILE}/cert.pem /etc/nginx/ssl/cert.pem
COPY src/zyn/ssl/${PROFILE}/key.pem  /etc/nginx/ssl/key.pem

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
