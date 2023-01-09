/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "list-background": "url('@/assets/bg-image.jpg')",
        "mountain-background": "url('@/assets/bg-image-mountains.jpg')",
      },
      boxShadow: {
        opal: "0 4px 6px -1px rgba(129, 182, 172, .1), 0 2px 4px -1px rgba(129, 182, 172, .06)",
      },
      colors: {
        opal: {
          50: "#f3f7f6",
          100: "#e7efed",
          200: "#dae7e3",
          300: "#cededa",
          400: "#c2d6d1",
          500: "#b8cec8",
          600: "#9dbeb6",
          700: "#81b6ac",
          800: "#85ada3",
          900: "#78a591",
        },
        darkslategray: {
          800: "#2f4f4f",
        },
        mountainpurple: {
          600: "#47192a",
          800: "#55304b",
        },
        mountainsalmon: {
          800: "#e06250",
        },
      },
    },
  },
  plugins: [],
};
