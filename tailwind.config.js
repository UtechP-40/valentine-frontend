/** @type {import('tailwindcss').Config} */
import tailwindScroll from "tailwind-scrollbar";
export default {
  content: [ "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    ],
  theme: {
    extend: {},
  },
  plugins: [tailwindScroll],
}

