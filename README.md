# TypeScript Compiler

[tsc CLI Options](https://www.typescriptlang.org/docs/handbook/compiler-options.html)

#### Start a live-server
```bash
yarn start
```

#### Run a compile based on a backwards look through the fs for a tsconfig.json
```bash
tsc
```
---
#### Emit JS for just the index.ts with the compiler defaults
```bash
tsc index.ts
```
---
#### Emit JS for any .ts files in the folder src, with the default settings
```bash
tsc src/*.ts
```
---
#### Emit files referenced in with the compiler settings from tsconfig.production.json
```bash
tsc --project tsconfig.production.json
```
---
#### Emit d.ts files for a js file with showing compiler options which are booleans
```bash
tsc index.js --declaration --emitDeclarationOnly
```
---
#### Emit a single .js file from two files via compiler options which take string arguments
```bash
tsc app.ts util.ts --target esnext --outfile index.js
```
---