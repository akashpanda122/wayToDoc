import type { Config } from "tailwindcss";
import { createColorSet, withAccountKitUi } from '@account-kit/react/tailwind';

/*
const config: Config = {
  content: [
    here
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
*/


export default withAccountKitUi(
  {
      content: [
          './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
          './src/components/**/*.{js,ts,jsx,tsx,mdx}',
          './src/app/**/*.{js,ts,jsx,tsx,mdx}',
      ],
      theme: {
          extend: {
              backgroundImage: {
                  'gradient-radial':
                      'radial-gradient(var(--tw-gradient-stops))',
                  'gradient-conic':
                      'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                  themelinear:
                      'linear-gradient(91.11deg, #84DFDD -0.97%, #157D7A 167.27%)',
              },
          },
      },
      plugins: [],
  },
  {
      colors: {
        "btn-primary": createColorSet("#363FF9", "#9AB7FF"),
        "fg-accent-brand": createColorSet("#363FF9", "#9AB7FF"),
      },
  }
);

//export default config;