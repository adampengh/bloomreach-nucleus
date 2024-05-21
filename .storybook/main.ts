import type { StorybookConfig } from '@storybook/nextjs';
import path from 'path';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
    '@storybook/addon-styling',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  core: {
    builder: '@storybook/builder-webpack5',
  },
  docs: {
    autodocs: 'tag',
  },
  previewHead: async (head) => `
    ${head}
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Taviraj:wght@300;400;500;700&family=Montserrat:wght@300;400;500;700&display=swap" rel="stylesheet">
    <style>
      @font-face {
        font-family: "Bloomreach Sans";
        src:
            url(https://www.bloomreach.com/css/fonts/BloomreachSans-Regular.woff2)format("woff2"),
            url(https://www.bloomreach.com/css/fonts/BloomreachSans-Regular.woff)format("woff");
        font-weight: 400;
        font-style: normal;
        font-display: block
      }
      @font-face {
        font-family: "Bloomreach Sans";
        src:
            url(https://www.bloomreach.com/css/fonts/BloomreachSans-Medium.woff2)format("woff2"),
            url(https://www.bloomreach.com/css/fonts/BloomreachSans-Medium.woff)format("woff");
        font-weight: 700;
        font-style: normal;
        font-display: block
      }
    </style>

    <link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
    <link rel="stylesheet" type="text/css" href="./storybook.css" />
  `,
  staticDirs: ['../public'],
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      // allowSyntheticDefaultImports: false,
      // esModuleInterop: false,
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
      propFilter: (prop) =>
        prop.parent ? !/node_modules\/(?!@mui)/.test(prop.parent.fileName) : true,
    }
  },
  async webpackFinal(config, { configType }) {
    if (config?.resolve?.alias) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "@/components": path.resolve(__dirname, "../src/components"),
        "@/context": path.resolve(__dirname, "../src/context"),
        "@/layouts": path.resolve(__dirname, "../src/layouts"),
        "@/lib": path.resolve(__dirname, "../src/lib"),
        "@/pages": path.resolve(__dirname, "../src/pages"),
        "@/styles": path.resolve(__dirname, "../src/styles"),
        "@/theme": path.resolve(__dirname, "../src/theme"),
      }
    }
    return config
  },
};

export default config;
