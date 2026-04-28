import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from "kimi-plugin-inspect-react"

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1]

// https://vite.dev/config/
export default defineConfig({
  base:
    process.env.GITHUB_ACTIONS && repositoryName
      ? `/${repositoryName}/`
      : "/",
  plugins: [inspectAttr(), react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
