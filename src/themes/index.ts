import {
  BaseLight,
  BaseDark,
  BloomreachNucleusDark,
  BloomreachNucleusLight,
} from "./schemes";

interface ThemeMapProps {
  [key: string]: any;
}

const themeMap: ThemeMapProps = {
  BaseLight,
  BaseDark,
  BloomreachNucleusDark: BloomreachNucleusDark,
  BloomreachNucleusLight: BloomreachNucleusLight,
};

export function themeCreator(theme: string) {
  return themeMap[theme];
}
