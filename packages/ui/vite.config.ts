import react from "@vitejs/plugin-react";
// import { resolve } from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  // root: resolve(__dirname, "src"),
  // build: {
  //   outDir: "../dist"
  // },
  plugins: [react()]
});
