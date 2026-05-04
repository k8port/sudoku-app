// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  // Tell Tailwind where to find your content files (adjust the paths as needed)
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;

