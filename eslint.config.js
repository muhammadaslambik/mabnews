// =========================================================
// ESLint Configuration - MAB-News
// =========================================================

export default [
    {
        // File JavaScript yang diperiksa
        files: [
            "js/**/*.js",
            "admin-js/**/*.js"
        ],

        // File/folder yang tidak perlu diperiksa
        ignores: [
            "node_modules/**",
            "assets/**"
        ],

        languageOptions: {
            // MAB-News menggunakan JavaScript modern
            ecmaVersion: "latest",

            // JavaScript berjalan di browser
            sourceType: "script",

            globals: {
                // Browser
                window: "readonly",
                document: "readonly",
                navigator: "readonly",
                location: "readonly",
                history: "readonly",
                localStorage: "readonly",
                sessionStorage: "readonly",

                // DOM
                HTMLElement: "readonly",
                Element: "readonly",
                Node: "readonly",
                Event: "readonly",
                CustomEvent: "readonly",

                // Browser API
                URL: "readonly",
                URLSearchParams: "readonly",
                FormData: "readonly",
                FileReader: "readonly",
                fetch: "readonly",

                // Timer
                setTimeout: "readonly",
                setInterval: "readonly",
                clearTimeout: "readonly",
                clearInterval: "readonly",

                // Console
                console: "readonly",

                // Alert / dialog
                alert: "readonly",
                confirm: "readonly",
                prompt: "readonly"
            }
        },

        rules: {

            // =================================================
            // ERROR / BUG
            // =================================================

            "no-undef": "error",
            "no-unreachable": "error",
            "no-dupe-keys": "error",
            "no-duplicate-case": "error",
            "no-invalid-regexp": "error",
            "no-irregular-whitespace": "error",
            "no-self-assign": "error",
            "no-unexpected-multiline": "error",
            "use-isnan": "error",

            // =================================================
            // VARIABLE
            // =================================================

            "no-unused-vars": [
                "warn",
                {
                    "vars": "all",
                    "args": "after-used",
                    "ignoreRestSiblings": true
                }
            ],

            "no-redeclare": "error",
            "no-shadow": "warn",
            "prefer-const": "warn",

            // =================================================
            // SYNTAX / CODE QUALITY
            // =================================================

            "no-extra-semi": "error",
            "no-unexpected-multiline": "error",
            "no-unreachable-loop": "warn",

            // =================================================
            // BEST PRACTICES
            // =================================================

            "eqeqeq": [
                "warn",
                "always"
            ],

            "curly": [
                "warn",
                "multi-line"
            ],

            "no-eval": "error",
            "no-implied-eval": "error",
            "no-new-func": "error",
            "no-with": "error",

            // =================================================
            // POTENTIAL BUGS
            // =================================================

            "no-constant-condition": "warn",
            "no-control-regex": "warn",
            "no-debugger": "warn",
            "no-dupe-else-if": "error",
            "no-empty": "warn",
            "no-fallthrough": "error",
            "no-func-assign": "error",
            "no-import-assign": "error",
            "no-loss-of-precision": "error",
            "no-misleading-character-class": "error",
            "no-new-symbol": "error",
            "no-obj-calls": "error",
            "no-prototype-builtins": "warn",
            "no-self-compare": "warn",
            "no-setter-return": "error",
            "no-sparse-arrays": "warn",
            "no-this-before-super": "error",
            "no-unsafe-finally": "error",
            "no-unsafe-negation": "error",
            "no-unsafe-optional-chaining": "error",

            // =================================================
            // CLEAN CODE
            // =================================================

            "no-array-constructor": "warn",
            "no-new-object": "warn",
            "no-useless-concat": "warn",
            "no-useless-escape": "warn",
            "no-useless-return": "warn",

            // =================================================
            // CONSOLE
            // =================================================

            // console.log() diperbolehkan untuk development.
            // Tidak dibuat error agar tidak mengganggu MAB-News.
            "no-console": "off",

            // =================================================
            // COMMENTS / DEBUG
            // =================================================

            "no-warning-comments": [
                "warn",
                {
                    "terms": [
                        "TODO",
                        "FIXME"
                    ],
                    "location": "anywhere"
                }
            ]
        }
    }
];