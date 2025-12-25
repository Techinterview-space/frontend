module.exports = {
    "root": true,
    "ignorePatterns": ["projects/**/*"],
    "overrides": [
        {
            "files": ["*.ts"],
            "env": {
                "browser": true,
                "es2021": true,
                "node": true
            },
            "extends": [
                "eslint:recommended",
                "plugin:@typescript-eslint/recommended",
                "plugin:@angular-eslint/recommended"
            ],
            "parser": "@typescript-eslint/parser",
            "parserOptions": {
                "ecmaVersion": "latest",
                "project": ["tsconfig.json"],
                "createDefaultProgram": true
            },
            "plugins": [
                "@typescript-eslint",
                "@angular-eslint"
            ],
            "rules": {
                "@typescript-eslint/no-explicit-any": "off",
                "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }],
                "@typescript-eslint/ban-types": "off",
                "@typescript-eslint/ban-ts-comment": "off",
                "@angular-eslint/prefer-inject": "off",
                "@angular-eslint/prefer-standalone": "off",
                "@angular-eslint/no-empty-lifecycle-method": "warn",
                "@angular-eslint/directive-selector": [
                    "error",
                    { "type": "attribute", "prefix": "app", "style": "camelCase" }
                ],
                "@angular-eslint/component-selector": [
                    "error",
                    { "type": "element", "prefix": "app", "style": "kebab-case" }
                ]
            }
        },
        {
            "files": ["*.html"],
            "extends": ["plugin:@angular-eslint/template/recommended"],
            "parser": "@angular-eslint/template-parser",
            "rules": {
                "@angular-eslint/template/eqeqeq": "warn"
            }
        },
        {
            "files": [".eslintrc.{js,cjs}"],
            "env": {
                "node": true
            },
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ]
}
