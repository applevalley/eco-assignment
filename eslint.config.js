import js from "@eslint/js";
import globals from "globals";
import eslintReactPluginHooks from "eslint-plugin-react-hooks";
import eslintReactPlugin from "eslint-plugin-react";
import eslintReactPluginRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist", "node_modules"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{js, jsx, ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": eslintReactPluginHooks,
      "react-refresh": eslintReactPluginRefresh,
      react: eslintReactPlugin,
    },
    rules: {
      ...eslintReactPlugin.configs.flat.recommended.rules,
      ...eslintReactPluginHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    },
  }
);
