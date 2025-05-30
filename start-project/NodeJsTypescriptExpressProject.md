# NodeJS Typescript with Express Project

First create a directory to project

```sh
mkdir newproject
cd newproject
```

Configure NPM package.json of the project:

```sh
npm init
# if you just want start the project without fill the fields you can just run
# npm init -y
```

Add typescript to project with types to node:

```sh
npm i -D typescript @types/node
```

Create initial tsconfig.json:

```sh
npx tsc --init --experimentalDecorators true --emitDecoratorMetadata true --target ES2017 --rootDir ./src --outDir ./dist
```

Create src directory:

```sh
mkdir -p src
```

Configure dist in `.gitignore` file

```sh
echo "/dist" >> .gitignore
```

Install ts-node and nodemon to use in dev environment:

```sh
npm i -D ts-node nodemon
```

Configure nodemon:

```sh
cat <<EOF | tee nodemon.json
{
  "watch": ["src"],
  "ext": ".ts,.js",
  "ignore": [],
  "exec": "ts-node ./src/index.ts"
}
EOF
```

Add scripts `start`, `start:dev` and `start:dev-watch` to `package.json`:

```json
  "start": "node ./dist/index.js",
  "start:dev": "node -r ts-node/register ./src/index.ts",
  "start:dev-watch": "nodemon",
```

Add scripts `build`, `build:clean` and `build:ts` to `package.json`:

```json
  "build": "npm run build:clean && npm run build:ts",
  "build:clean": "rm -rf dist",
  "build:ts": "tsc",
```

Install express

```sh
npm i express
npm i -D @types/express
```

Configures app of the project:

```sh
cat <<EOF | tee src/app.ts
import express, { Request, Response, NextFunction, Express } from "express";

const app: Express = express();

app.use(express.json());

// Catch error
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500).json({ error: err.message });
});

export default app;
EOF
```

Configures server / index of the project:

```sh
cat <<EOF | tee src/index.ts
import app from "./app";

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(\`Server running at http://localhost:\${port} !\`);
});
EOF
```

Configures `.editorconfig`:

```sh
cat <<EOF | tee .editorconfig
root = true

[*]
indent_style = space
indent_size = 2
charset = utf-8
trim_trailing_whitespace = false
insert_final_newline = true
EOF
```

Configures `Prettier`:

```sh
cat <<EOF | tee .prettierrc
{
    "endOfLine": "auto",
    "semi": true,
    "trailingComma": "es5",
    "singleQuote": false,
    "printWidth": 120,
    "tabWidth": 2
}
EOF
```

Install eslint and its dependencies:

```sh
npm i -D eslint prettier @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-airbnb-base eslint-config-prettier eslint-plugin-import eslint-plugin-prettier
```

Configures eslint:

```sh
cat <<EOF | tee .eslintrc.json
{
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "airbnb-base",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import/typescript",
        "prettier/@typescript-eslint",
        "plugin:prettier/recommended"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
        "prettier/prettier": "error",
        "no-console": "off",
        "no-unused-vars":"off",
        "no-underscore-dangle": "off",
        "import/no-cycle":"off",
        "import/prefer-default-export":"off",
        "import/no-extraneous-dependencies": ["error", {"devDependencies": true}],
        "lines-between-class-members": 0,
        "class-methods-use-this": 0,
        "max-classes-per-file": 0,
        "import/extensions": [
            "error",
            "ignorePackages",
            {
                "js": "never",
                "jsx": "never",
                "ts": "never",
                "tsx": "never"
            }
        ]
    }
}
EOF
```

Add script `lint` and `lint:fix` to `package.json`:

```json
  "lint": "eslint --ext .ts src/",
  "lint:fix": "npm run lint -- --fix",
```


Add packages to Jest

```sh
npm i -D jest ts-jest eslint-plugin-jest @types/jest
```


Update eslint config with Jest:

```sh
cat <<EOF | tee .eslintrc.json
{
    "env": {
        "browser": true,
        "es6": true,
        "jest": true
    },
    "extends": [
        "airbnb-base",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import/typescript",
        "prettier",
        "plugin:prettier/recommended"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "plugins": [
        "@typescript-eslint",
        "eslint-plugin-jest",
        "jest"
    ],
    "rules": {
        "prettier/prettier": "error",
        "no-console": "off",
        "no-unused-vars":"off",
        "no-underscore-dangle": "off",
        "import/no-cycle":"off",
        "import/prefer-default-export":"off",
        "import/no-extraneous-dependencies": ["error", {"devDependencies": true}],
        "lines-between-class-members": 0,
        "class-methods-use-this": 0,
        "max-classes-per-file": 0,
        "import/extensions": [
            "error",
            "ignorePackages",
            {
                "js": "never",
                "jsx": "never",
                "ts": "never",
                "tsx": "never"
            }
        ],
        "jest/no-disabled-tests": "warn",
        "jest/no-focused-tests": "error",
        "jest/no-identical-title": "error",
        "jest/prefer-to-have-length": "warn",
        "jest/valid-expect": "error"
    }
}
EOF
```

Add scripts `test` and `test:coverage` to `package.json`:

```json
  "test": "jest",
  "test:coverage": "npm test -- --coverage",
```