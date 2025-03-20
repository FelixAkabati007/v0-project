// This file provides compatibility with the v0 environment
// It's used to handle specific imports that v0 might be looking for

// Export the tailwind config for v0 to use
export { default as tailwindConfig } from "./tailwind.config"

// Export any other configurations that v0 might need
export const serverLayer = {
  // Add any server-specific configurations here
}

