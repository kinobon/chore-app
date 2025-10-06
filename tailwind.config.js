/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2196f3",
        success: "#4caf50",
        error: "#f44336",
      },
    },
  },
  plugins: [],
};
