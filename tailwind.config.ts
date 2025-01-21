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
          surface: '#f3f4f6',
          border: '#e5e7eb',
          text: '#111827',
        },
        dark: {
          bg: '#111827',
          surface: '#1f2937',
          border: '#374151',
          text: '#f9fafb',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
