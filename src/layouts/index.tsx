import React from 'react';
import { Page } from '@bloomreach/spa-sdk';

// Layouts
import { OneColumn } from './xpages/OneColumn';
import { TwoColumn } from './xpages/TwoColumn';
import { HelpCenterLayout } from './pages/HelpCenterLayout';

const PageLayout = ({ page }: { page?: Page }) => {
  if (!page) return null

  const layout = page?.getComponent()?.getName() || 'one-column';
  console.log('layout', layout)
  switch (layout) {
    case 'one-column':
      return <OneColumn />;
    case 'two-column':
      return <TwoColumn />;
    case 'help-center-page':
    case 'help-center-article':
    case 'help-center-topics-list':
    case 'help-center-search-results':
      return <HelpCenterLayout />;
    default:
      return <OneColumn />;
  }
}

export default PageLayout
