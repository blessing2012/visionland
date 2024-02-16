module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "import"],
  extends: [
    "eslint:recommended",
    "plugin:import/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  rules: {
    // Basic
    "no-multiple-empty-lines": ["error", { max: 1, maxBOF: 0, maxEOF: 1 }],
    "object-curly-spacing": ["error", "always"],
    "array-bracket-spacing": ["error", "never"],
    "computed-property-spacing": ["error", "never"],
    "comma-dangle": ["error", "always-multiline"],
    "eol-last": ["error", "always"],
    "no-trailing-spaces": "error",
    "brace-style": ["error", "1tbs", { "allowSingleLine": true }],
    // TypeScript
    "@typescript-eslint/semi": "error",
    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    // Import
    "import/no-unresolved": "off",
    "import/no-named-as-default-member": "off",
    "import/no-named-as-default": "off",
    "import/order": [
      "warn",
      {
        groups: [
          "builtin",
          "external",
          "parent",
          "sibling",
          "index",
          "object",
          "type",
          "unknown",
        ],
        alphabetize: {
          order: "asc",
        },
      },
    ],
  },
  ignorePatterns: ["**/*.js"],
};
