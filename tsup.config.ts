import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  minify: true,
  splitting: false,
  treeshake: true,
  external: [
    "react",
    "react-dom",
    "react-router-dom",
    "@mui/icons-material",
    "@mui/material",
    "@mui/types",
    "@mui/x-charts",
    "@mui/x-date-pickers",
    "@mui/x-data-grid",
  ],
});
