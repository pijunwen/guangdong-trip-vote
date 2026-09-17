import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        pc: path.resolve(__dirname, "pc/index.html"),
        app: path.resolve(__dirname, "app/index.html"),
        meiziping: path.resolve(__dirname, "app/meiziping.html"),
      },
    },
  },
  server: { host: "0.0.0.0", port: 3000 },
});
