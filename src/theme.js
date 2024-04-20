// color design tokens export
export const colorTokens = {
  grey: {
    0: "#FFFFFF",
    10: "#F6F6F6",
    50: "#F0F0F0",
    100: "#E0E0E0",
    200: "#C2C2C2",
    300: "#A3A3A3",
    400: "#858585",
    500: "#666666",
    600: "#4D4D4D",
    700: "#333333",
    800: "#1A1A1A",
    900: "#0A0A0A",
    1000: "#000000",
  },
  primary: {
    // RED
    50: "#FFE6E6",
    100: "#FFCCCC",
    200: "#FF9999",
    300: "#FF4D4D",
    400: "#FF1A1A",
    500: "#E60000",
    600: "#B30000",
    700: "#800000",
    800: "#4D0000",
    900: "#1A0000",
  },
};

// mui theme settings
export const themeSettings = () => {
  return {
    palette: {
      // palette values for light mode
      primary: {
        dark: colorTokens.primary[700],
        main: colorTokens.primary[500],
        light: colorTokens.primary[50],
      },
      neutral: {
        dark: colorTokens.grey[700],
        main: colorTokens.grey[500],
        mediumMain: colorTokens.grey[400],
        medium: colorTokens.grey[300],
        light: colorTokens.grey[50],
      },
      background: {
        default: colorTokens.grey[50],
        alt: colorTokens.grey[0],
      },
    },
    typography: {
      fontFamily: ["Rubik", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};