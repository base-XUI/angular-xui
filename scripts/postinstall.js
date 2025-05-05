console.log(`
🚨  [@base-xui/angular-xui] TailwindCSS Required

To use this library properly, your project must have TailwindCSS set up.

Please follow these steps:

1. Install Tailwind and PostCSS:
   pnpm add -D tailwindcss postcss autoprefixer

2. Initialize Tailwind:
   npx tailwindcss init

3. Update tailwind.config.js:
   content: [
     "./src/**/*.{html,ts}",
     "./node_modules/@base-xui/angular-xui/**/*.{html,ts}"
   ]

4. In your global styles file (e.g. styles.scss), add:
   @tailwind base;
   @tailwind components;
   @tailwind utilities;

Thank you for using @base-xui/angular-xui ✨
`);
