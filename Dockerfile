# Use official Node.js image
FROM mcr.microsoft.com/playwright:v1.44.1-jammy

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Install Allure CLI globally
RUN npm install -g allure-commandline --save-dev

# Copy the rest of the project files
COPY . .

# Expose ports for MCP server (if needed)
EXPOSE 9323 3000

# Default command (can be overridden in CI)
CMD ["npx", "playwright", "test"] 