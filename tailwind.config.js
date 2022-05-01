module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "sb-norm": "#4682b4",
        "sb-dark": "#31697e",
        "sb-light": "#d8f4ff",
        "sb-med": "#b1eaff",
      },
      textColor: {
        term: "#32CD32",
      },
      borderColor: {
        term: "#32CD32",
      },
      fontFamily: {
        header: ['"M PLUS 1 Code"', "sans-serif"],
        name: ["Genos", "sans-serif"],
        term: ["VT323", "monospace"],
      },
      keyframes: {
        blinker: {
          to: {
            visibility: "hidden",
          },
        },
        greyscale: {
          " 0%, 100% ": { filter: "grayscale(0%)" },
          "50%": { filter: "grayscale(100%)" },
        },
        zoomIn: {
          "0%": { transform: "scale(.1, .1)" },
          "100%": { transform: "scale(1, 1)" },
        },
      },
      animation: {
        blinker: "blinker 0.9s steps(2, start) infinite",
        greyscale: "greyscale 2.5s ease-in-out",
        zoomIn: "zoomIn 5s ease-in",
      },
      typography: {
        DEFAULT: {
          css: {
            color: "#31697e",
            a: {
              color: "#3182ce",
              "&:hover": {
                color: "#2c5282",
                color: "#4682b4",
                cursor: "pointer",
              },
            },
            h1: {
              color: "#31697e",
              fontWeight: "normal",
            },
            h2: {
              color: "#31697e",
              fontWeight: "normal",
            },
            h3: {
              color: "#31697e",
              fontWeight: "normal",
            },
            h4: {
              color: "#31697e",
              fontWeight: "normal",
            },
          },
        },
      },
    },
  },
  variants: {
    extend: {
      display: ["hover", "focus"],
      borderStyle: ["hover", "focus"],
      borderWidth: ["hover", "focus"],
      borderColor: ["active"],
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
