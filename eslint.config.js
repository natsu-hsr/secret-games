import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import importPlugin from "eslint-plugin-import";

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'import': importPlugin,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      "quotes": [
        "error",
        "single",
        {
          "avoidEscape": true,
          "allowTemplateLiterals": false
        }
      ],
      "import/order": [
        "warn",
        {
          "groups": [
            "builtin",
            "external",
            "internal",
            ["parent", "sibling"],
            "index"
          ],
          "pathGroups": [
            {
              "pattern": "@assets/**",
              "group": "index",
              "position": "after"
            },
            {
              "pattern": "@*/**",
              "group": "internal",
              "position": "after"
            },
          ],
          "pathGroupsExcludedImportTypes": ["internal", "react"],
          'newlines-between': 'always',
          "alphabetize": {
            "order": 'asc',
            "caseInsensitive": true,
          }
        }
      ],
      "max-len": [
        "warn",
        {
          "code": 121,
          "ignorePattern": "^(import\\s.+\\sform\\s.+|\\} from)",
        }
      ],
      "object-curly-spacing": ["error", "never"],
      "@typescript-eslint/no-unused-vars": ["warn", {
        vars: "all",
        args: "after-used",
        ignoreRestSiblings: false,
      }],
    },
  },
)


