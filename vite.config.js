import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

  resolve: {
    alias: {
  //     // Alias @ para o diretório src, facilitando importações
      "@": path.resolve(__dirname, "./src"),
    },
  },

  // tipos de aqruivos que o Vite deve tratar como assets estáticos
  assetsInclude: ["**/*.svg", "**/*.csv"],
});
