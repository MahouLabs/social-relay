# Use the official Bun image
FROM oven/bun:1

# Set working directory
WORKDIR /app

# Copy package.json
COPY package.json ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy the rest of the application
COPY . .

# Generate Db migrations
RUN bun run db:generate

# Run Db migrations
RUN bun run db:migrate

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["bun", "run", "src/index.ts"] 