import React from "react";
import { Page } from "@bloomreach/spa-sdk";

// Layouts
import { OneColumn } from "./xpages/OneColumn";
import { TwoColumn } from "./xpages/TwoColumn";

const PageLayout = ({ page }: { page?: Page }) => {
  if (!page) return null

  const layout = page?.getComponent()?.getName() || 'one-column';
  switch (layout) {
    case ('one-column' || 'store-locator'):
      return <OneColumn />;
    case 'two-column':
      return <TwoColumn />;
    default:
      return <OneColumn />;
  }
}

export default PageLayout
