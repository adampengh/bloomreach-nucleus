import { TypographyOptions } from "@mui/material/styles/createTypography";

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    serifxxxl: true;
  }
}

export interface ExtendedTypographyOptions extends TypographyOptions {
  serifxxxl?: React.CSSProperties;
}

export const typography: ExtendedTypographyOptions = {
  fontFamily:
    '"Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,
  htmlFontSize: 14,
  h1: {
    fontFamily: "Taviraj",
    fontWeight: 500,
    fontSize: "3rem",
    lineHeight: 1,
    margin: "0 0 2rem 0",
  },
  h2: {
    fontFamily: "Taviraj",
    fontWeight: 500,
    fontSize: "2.5rem",
    lineHeight: 1,
    margin: "0 0 1.5rem 0",
  },
  h3: {
    fontFamily: "Taviraj",
    fontWeight: 500,
    fontSize: "2rem",
    lineHeight: 1,
    margin: "0 0 1.25rem 0",
  },
  h4: {
    fontFamily: "Taviraj",
    fontWeight: 500,
    fontSize: "1.5rem",
  },
  h5: {
    fontWeight: 500,
    fontSize: "1.25rem",
    fontFamily: "Taviraj",
  },
  h6: {
    fontSize: "1rem",
  },
  subtitle1: {
    fontSize: 18,
  },
  subtitle2: {
    fontWeight: 400,
    fontSize: 16,
  },
  body1: {
    fontSize: 14,
  },
  body2: {
    fontSize: 12,
  },
  button: {
    fontWeight: 600,
  },
  caption: {
    fontSize: 13,
    textTransform: "uppercase",
  },
  overline: {
    fontSize: 13,
    fontWeight: 700,
    textTransform: "uppercase",
  },
};
