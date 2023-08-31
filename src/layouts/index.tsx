import React from "react";
import { Page, TYPE_CONTAINER_NO_MARKUP } from "@bloomreach/spa-sdk";

// Layouts
import { OneColumn } from "./OneColumn";
import { TwoColumn } from "./TwoColumn";

const PageLayout = ({ page }: { page?: Page }) => {
  if (!page) return null

  const layout = page.getComponent().getName() || 'one-column';
  console.log('Page Layout:', layout)
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
