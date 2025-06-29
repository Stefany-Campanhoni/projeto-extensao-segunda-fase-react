import react from "@vitejs/plugin-react"
import path from "path"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@assets": path.resolve(__dirname, "src/assets"),
      "@components": path.resolve(__dirname, "src/components"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@custom-types": path.resolve(__dirname, "src/types"),
      "@api": path.resolve(__dirname, "src/api"),
      "@routes": path.resolve(__dirname, "src/routes"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@security": path.resolve(__dirname, "src/security"),
    },
  },
})
