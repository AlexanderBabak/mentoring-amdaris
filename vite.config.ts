import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      features: resolve(__dirname, "src/features"),
      __generated__: resolve(__dirname, "src/__generated__"),
    },
  },
  plugins: [svgr({ svgrOptions: { icon: true } }), react()],
});
