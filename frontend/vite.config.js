import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["react-modal"], // ✅ Force Vite to pre-bundle CJS module
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/], // ✅ Ensure CJS modules are handled
    },
  },
});
