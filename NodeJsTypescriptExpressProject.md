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