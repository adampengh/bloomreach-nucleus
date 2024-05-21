import {
  BaseLight,
  BaseDark,
  BloomreachNucleusDark,
  BloomreachNucleusLight,
  CrewLight,
  CrewDark,
} from "./schemes";

interface ThemeMapProps {
  [key: string]: any;
}

const themeMap: ThemeMapProps = {
  BaseLight,
  BaseDark,
  BloomreachNucleusDark: BloomreachNucleusDark,
  BloomreachNucleusLight: BloomreachNucleusLight,
  CrewLight,
  CrewDark,
};

export function themeCreator(theme: string) {
  return themeMap[theme];
}
