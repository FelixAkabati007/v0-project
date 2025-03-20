// This file provides type declarations for v0-specific imports

declare module "@v0/tailwind.config?server_layer" {
  import type { Config } from "tailwindcss"
  const config: Config
  export default config
}

declare module "@v0/*" {
  const value: any
  export default value
}

