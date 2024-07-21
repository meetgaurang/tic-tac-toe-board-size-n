import globals from "globals";
import pluginJs from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  { languageOptions: { globals: globals.browser } },
  {
    files: ["**/*.js"],
    rules: pluginJs.configs.recommended.rules,
  },
  {
    // Turns off all rules that might conflict with Prettier
    files: ["**/*.js"],
    rules: eslintConfigPrettier.rules,
  },
];
