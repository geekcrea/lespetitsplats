import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    languageOptions: {
      // Inclure à la fois les globales pour le navigateur et Node.js
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  pluginJs.configs.recommended,
];