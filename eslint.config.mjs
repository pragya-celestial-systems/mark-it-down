import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        window: "readonly",
        document: "readonly",
        console: "readonly",
      },
    },
    env: {
      browser: true,
      es6: true,
    },
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      "indent": ["error", 2],
      "eqeqeq": "error",
      "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
      "no-unused-vars": ["warn", { "args": "none", "ignoreRestSiblings": true }],
      "quotes": ["error", "single", { "avoidEscape": true }],
      "comma-dangle": ["error", "always-multiline"],
      "semi": ["error", "always"],
      "no-var": "error",
      "object-curly-spacing": ["error", "always"],
      "max-len": ["warn", { "code": 100 }],
      "react/no-deprecated": "warn",
      "react/function-component-definition": [
        "error",
        { "namedComponents": "arrow-function" },
      ],
      "react/jsx-pascal-case": "error",
      "react/jsx-key": "error",
      "react/prop-types": ["warn", { "skipUndeclared": true }],
    },
  },
];
