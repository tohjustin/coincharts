export const size = {
  tiny: "2px",
  small: "4px",
  medium: "8px",
  large: "16px",
  huge: "24px",
  enormous: "32px",
};

export const fontSize = {
  tiny: "12px",
  small: "14px",
  medium: "16px",
  large: "18px",
  huge: "24px",
  mega: "48px",
};

export const fontWeight = {
  ultraLight: 100,
  thin: 200,
  light: 300,
  regular: 400,
  medium: 500,
  demiBold: 600,
  bold: 700,
  heavy: 800,
};

export const font = {
  fontFamily: `
  "Avenir Next",
  -apple-system,
  BlinkMacSystemFont,
  "Segoe UI",
  "Roboto",
  "Oxygen",
  "Ubuntu",
  "Cantarell",
  "Fira Sans",
  "Droid Sans",
  "Helvetica Neue",
  sans-serif`,
};

export const monospaceFont = {
  fontFamily: `
  "Monaco",
  monospace;`,
};

export const fontFamily = {
  regular: font.fontFamily,
  monospace: monospaceFont.fontFamily,
};

export const color = {
  /* Coincharts */
  coincharts: "#0667D0",
  coinchartsLight: "#7AA4DE",
  coinchartsGray: "#7D95B6",
  coinchartsGrayLight: "#BECADA",
  coinchartsPastel: "#BCD1EE",
  coinchartsSmoke: "#EBF1FA",

  /* Dark Grays */
  slate: "#9BA6B2",
  slateLight: "#DAE1E9",
  slateDark: "#4E5C6E",

  /* Light Grays */
  smoke: "#F4F7FA",
  smokeLight: "#F9FBFC",

  /* UI */
  neutral: "#3C90DF",
  neutralDark: "#2E7BC4",
  positive: "#61CA00",
  positiveDark: "#4BAD02",
  warning: "#F8B700",
  warningDark: "#E6A314",
  warningBlack: "#564A0E",
  negative: "#FF4949",
  negativeDark: "#E82F2F",
  moneyGreen: "#00C57F",
  moneyGreenDark: "#00AA6D",
  steel: "#1A3650",

  /* Currencies */
  bitcoin: "#FFB119",
  bitcoinLight: "#FFEBC5",
  litecoin: "#B5B5B5",
  litecoinLight: "#ECECEC",
  ethereum: "#6F7CBA",
  ethereumLight: "#F0F1F8",
  bitcoinCash: "#8DC451",
  bitcoinCashLight: "#E2F0D2",

  /* Misc. */
  white: "#FFFFFF",
  black: "#000000",
  mask: "rgba(26,54,80,0.7)",

  /* Label colors */
  labelWarning: "#FCF0BF",
  labelWarningDark: "#CCA301",
  labelPositive: "#D7F1BF",
  labelNegative: "#FFD1D1",
};

export const border = {
  border: `1px solid ${color.slateLight}`,
  noRadius: "0px",
  subtleRadius: "2px",
  borderRadius: `${size.small}`,
  radius: `${size.small}`,
  insetRadius: "3px",
};

export const boxShadow = {
  default: "0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)",
};

export const animation = {
  default: "all 0.25s ease",
  speed: "0.25s ease",
};

export const height = {
  dashboard: "450px",
};

export const width = {
  desktopMax: "1500px",
  desktopMin: "980px",
};

export default {
  ...color,
  ...border,
  ...fontWeight,
  ...fontSize,
  ...font,
  ...size,

  /* Dimensions */
  height,
  width,

  /* Shadow */
  boxShadow: boxShadow.default,

  /* Animation timing */
  animationDefault: animation.default,

  /* Z-index */
  zIndexDropdown: 100,
  zIndexBackdrop: -10,

  fontFamily: `"Avenir Next",
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    "Roboto",
    "Oxygen",
    "Ubuntu",
    "Cantarell",
    "Fira Sans",
    "Droid Sans",
    "Helvetica Neue",
    sans-serif;`,

  monospaceFontFamily: `
    monospace;`,
};
