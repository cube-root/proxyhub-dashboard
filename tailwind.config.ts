import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        light: {
          bg: '#ffffff',
          surface: '#fafafa',
          border: '#f4f4f5',
          text: '#18181b',
          accent: '#ea580c',
        },
        dark: {
          bg: '#18181b',
          surface: '#27272a',
          border: '#3f3f46',
          text: '#fafafa',
          accent: '#ea580c',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
