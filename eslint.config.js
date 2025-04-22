const tseslint = require("@typescript-eslint/eslint-plugin");
const tsParser = require("@typescript-eslint/parser");
const angulareslint = require("@angular-eslint/eslint-plugin");
const angularTemplate = require("@angular-eslint/eslint-plugin-template");
const angularParser = require("@angular-eslint/template-parser");
const prettier = require("eslint-config-prettier");

module.exports = [
  {
    ignores: ["dist/**", "node_modules/**"],
  },
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ["./tsconfig.json", "./.storybook/tsconfig.json"],
        createDefaultProgram: true,
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      "@angular-eslint": angulareslint,
    },
    rules: {
      ...tseslint.configs["recommended"].rules,
      ...angulareslint.configs.recommended.rules,
      ...prettier.rules,
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      "@typescript-eslint/no-empty-function": "off",
      "@angular-eslint/component-class-suffix": "error",
      "@angular-eslint/directive-class-suffix": "error",
      "@angular-eslint/no-empty-lifecycle-method": "off",
      "@angular-eslint/no-output-on-prefix": "warn",
    },
  },
  {
    files: ["**/*.html"],
    plugins: {
      "@angular-eslint/template": angularTemplate,
    },
    languageOptions: {
      parser: angularParser,
    },
    rules: {
      ...angularTemplate.configs.recommended.rules,
    },
  },
];
