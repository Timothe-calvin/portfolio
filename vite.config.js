import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/", // Root path for deployment. Change if hosting in a subfolder.
  server: {
    port: 5173,      // Optional: default dev server port
    open: true,      // Automatically opens browser on `npm run dev`
  },
  build: {
    outDir: "dist",  // Default output directory for production build
    sourcemap: true, // Optional: include sourcemaps for debugging
  },
});
