/// <reference types="vitest" />

import path from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/server.ts"),
      name: "server",
      fileName: "server",
      formats: ["cjs", "es"]
    },
  },
  test: {
    globals: true
  },
  plugins: [dts()]
});
