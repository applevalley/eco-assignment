/** @type {import('tailwindcss').Config} */

const pxToRem = (px, base = 16) => `${px / base}rem`;
const range = (start, end) => {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        desktop: "1920px",
        desktop_small: "1440px",
        pad: "1080px",
        pad_small: "768px",
        mobile: "425px",
      },
      boxShadow: {
        8: "0px 2px 8px 0px rgba(165, 163, 171, 0.08)",
        12: "0px 3px 12px 0px rgba(165, 163, 171, 0.18)",
        16: "0px 4px 16px 0px rgba(148, 148, 165, 0.20)",
        20: "0px 6px 20px 0px rgba(148, 148, 165, 0.28)",
        24: "0px 8px 24px 0px rgba(148, 148, 165, 0.36)",
      },
      spacing: {
        ...range(1, 1400).reduce((acc, px) => {
          acc[`${px}pxr`] = pxToRem(px);
          return acc;
        }, {}),
      },
      width: ({ theme }) => theme("spacing"),
      height: ({ theme }) => theme("spacing"),
      size: ({ theme }) => theme("spacing"),
      gap: ({ theme }) => theme("spacing"),
      margin: ({ theme }) => theme("spacing"),
      padding: ({ theme }) => theme("spacing"),
    },
  },
  plugins: [],
};
