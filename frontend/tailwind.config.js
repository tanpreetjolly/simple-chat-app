/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#3D3B3B",
        primary: "#72D2C2",
        primarySecond: "#E3D35A",
        secondary: "#30E0A1",
        tertiary: "#EB7050",
      },
    },
  },
  plugins: [],
};

