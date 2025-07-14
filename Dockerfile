# Use official Node.js image
FROM mcr.microsoft.com/playwright:v1.54.0-jammy

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

# Install Java (needed for Allure)
RUN apt-get update && \
    apt-get install -y openjdk-17-jre && \
    apt-get clean

ENV JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
ENV PATH=$JAVA_HOME/bin:$PATH


# Default command (can be overridden in CI)
CMD ["npx", "playwright", "test"] 