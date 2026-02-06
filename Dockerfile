# common base
FROM serversideup/php:8.3-fpm-nginx-alpine AS base
USER root
RUN install-php-extensions intl pdo_sqlite pcntl zip

# Builder Node for Vite/React/Inertia/Bootstrap
FROM node:20-alpine AS node-builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY resources/js resources/js
# COPY vite.config.js .
RUN npm run build

# Production
FROM base AS production
ENV PHP_OPCACHE_ENABLE=1
USER www-data
WORKDIR /var/www/html
COPY --chown=www-data:www-data composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader --no-interaction
COPY --chown=www-data:www-data . .
COPY --from=node-builder /app/public/build ./public/build
RUN composer dump-autoload --optimize && \
    php artisan config:cache && \
    php artisan route:cache && \
    php artisan view:cache

EXPOSE 8080
