/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'maroon': '#8D2828',
      'antique': '#faebd7',
    },
    extend: {
      height: {
        112: "28rem",
        128: "32rem",
        144: "36rem",
        160: "40rem",
        176: "44rem",
        192: "48rem",
        208: "52rem",
        224: "56rem",
        240: "60rem",
        256: "64rem",
        288: "72rem",
        320: "80rem",
        384: "96rem",
        448: "112rem",
        512: "128rem",
        576: "144rem",
      },
      top: {
        250: "62.5rem", // 1000px
      },
    },
  },
  plugins: [],
};
