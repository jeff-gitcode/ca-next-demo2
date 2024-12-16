# CA Next Demo2

## Video

![alt text](./doc/next2-demo.gif)

## Tech Stack

- [x] nextjs
- [x] turbo
- [x] pocketbase
- [x] tailwind
- [x] ca
- [x] swr
- [x] jest-fetch-mock
- [x] @testing-library/react
- [x] jest-preview
- [x] husky
- [x] Lint-Staged
- [x] Commitlint
- [x] storybook
- [x] playwright

```javascript

# node
# nvm
https://github.com/coreybutler/nvm-windows#installation--upgrades
$ nvm ls available

# node
$ nvm install v22.12.0
$ nvm use 22.12.0
$ node -v
$ npm -v
$ npm install --global yarn

# github
$ gh auth login
C:\dev\nextjs\ca-next-demo2>gh auth login
? Where do you use GitHub? GitHub.com
? What is your preferred protocol for Git operations on this host? HTTPS
? Authenticate Git with your GitHub credentials? Yes
? How would you like to authenticate GitHub CLI? Login with a web browser

! First copy your one-time code: AAAA-8888
Press Enter to open https://github.com/login/device in your browser...
✓ Authentication complete.
- gh config set -h github.com git_protocol https
✓ Configured git protocol
✓ Logged in as jeff-gitcode
! You were already logged in to this account

 $ git config --global user.email "you@example.com"
 $ git config --global user.name "Your Name"


C:\dev\nextjs>npx create-next-app@latest --ts ca-next-demo
√ What is your project named? ... ca-next-demo
√ Would you like to use TypeScript? ... No / Yes
√ Would you like to use ESLint? ... No / Yes
√ Would you like to use Tailwind CSS? ... No / Yes
√ Would you like to use `src/` directory? ... No / Yes
√ Would you like to use App Router? (recommended) ... No / Yes
√ Would you like to customize the default import alias (@/*)? ... No / Yes
√ What import alias would you like configured? ... @/*
Creating a new Next.js app in C:\dev\nextjs\ca-next-demo3.

Using npm.

Initializing project with template: app-tw


Installing dependencies:
- react
- react-dom
- next

Installing devDependencies:
- typescript
- @types/node
- @types/react
- @types/react-dom
- postcss
- tailwindcss
- eslint
- eslint-config-next
-
-

$ cd ca-next-demo
$ yarn

# pocketbase
# download from https://github.com/pocketbase/pocketbase/releases/download/v0.22.12/pocketbase_0.22.12_windows_amd64.zip

$ pocketbase.exe serve
2024/05/24 22:40:29 Server started at http://127.0.0.1:8090
├─ REST API: http://127.0.0.1:8090/api/
└─ Admin UI: http://127.0.0.1:8090/_/


$ yarn add swr

$ yarn add react-hook-form @hookform/resolvers zod
$ yarn add @hookform/error-message
$ yarn add dotenv
$ yarn add @next/env
$ yarn add inversify reflect-metadata

# clear cache
$ rm -rf .next
$ rm -rf node_modules package-lock.json
$ rm -rf node_modules yarn.lock
```

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev

## test
$ yarn add -D jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom
$ yarn add -D @types/jest
$ yarn add create-jest
$ yarn add -D ts-node
# Do you need to install type definitions for node? Try `npm i --save-dev @types/node` and then add 'node' to the types field in your tsconfig.
$ yarn add -D @types/node
# example shows how to configure Jest to work with Next.js.
$ npx create-next-app --example with-jest with-jest-app
# husky
$ yarn add -D husky
$ npx husky init
# Lint-Staged
$ yarn add -D lint-staged
# Commitlint
$ yarn add -D @commitlint/{cli,config-conventional} @commitlint/types conventional-changelog-atom
# storybook
$ npx storybook@latest init
$ yarn add -D  @storybook/addon-console

#vitest
$ yarn add -D vitest

# playwright （need write-access to users/abc/appData/local/ms-playwright folder in windows）
$ yarn create playwright
# $ yarn add -D @playwright/test@latest
$ yarn playwright --version

$ yarn playwright test
#or
$ yarn playwright test --ui
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
