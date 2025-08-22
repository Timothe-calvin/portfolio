/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // Include all JS/TS files in src
  ],
  theme: {
    extend: {
      container: {
        center: true,      // Center the container
        padding: "1rem",   // Default padding
      },
      colors: {
        beige: "#f5f5dc",  // Add a custom beige color
      },
    },
  },
  plugins: [],
};
