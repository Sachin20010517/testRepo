# Stage 1: Build the application
FROM node:20 AS build

WORKDIR /app

# Copy package.json and package-lock.json 
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Stage 2: Create the distroless image
FROM gcr.io/distroless/nodejs20

WORKDIR /app

# Copy files from the build stage
COPY --from=build /app /app

# Expose the port the app runs on
EXPOSE 8000

# Set the command to run the application
CMD ["index.js"]
