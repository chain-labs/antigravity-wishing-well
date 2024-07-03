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

# How to use Storybook with Next.js

This is a basic example of how to use Storybook with Next.js.

## Installation and setup

To get started, run:

```bash
npx storybook@latest init
```

To update Storybook, run:

```bash
npx storybook@latest upgrade
```

## Clearing the existing Storybook setup

Remove all files and folders from directory `/src/app/stories`:

## Adding Tailwind CSS

Go to `/.storybook/preview.js` and add the following line:

```js
import "../src/app/globals.css"; // replace with the name of your tailwind css file
```

## Adding first story

Create a new file in `/src/app/stories` called `Button.tsx` and add the following content:

```tsx
"use client";

import React from "react";

export default function Button() {
  return (
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Button
    </button>
  );
}
```

Then, create a new file in `/src/app/stories` called `Button.stories.ts` and add the following content:

```tsx
"use client";

import React from "react";
import Button from "./Button";

export default {
  title: "Button",
  component: Button,
};

export const Primary = () => <Button />;
```

## Running Storybook

To run Storybook, run:

```bash
npm run storybook
# or
yarn storybook
# or
pnpm storybook
# or
bun storybook
```

Open [http://localhost:6006](http://localhost:6006) with your browser to see your stories.

## More information

Visit the [Storybook documentation](https://storybook.js.org/docs/react/get-started/introduction) to learn more.
