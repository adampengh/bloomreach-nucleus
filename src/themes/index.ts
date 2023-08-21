import { BloomreachNucleus } from "./schemes";

interface ThemeMapProps {
  [key: string]: any;
}

const themeMap: ThemeMapProps = {
  nucleus: BloomreachNucleus
};

export function themeCreator(theme: string) {
  return themeMap[theme];
}
