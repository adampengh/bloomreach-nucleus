import { TYPE_CONTAINER_ITEM_UNDEFINED } from '@bloomreach/spa-sdk';
import BrxComponentWrapper from '@/lib/BrxComponentWrapper';
import {
  Banner,
  Content,
  Hero,
  InGridBanner,
  Logo,
  PathwaysRecommendations,
  StoreListing,
  StoreLocator,
  TitleAndText,
} from '@/components';
import { BrxComponentUndefined } from './BrxComponentUndefined';

// Help Center
import { HelpCenterSearchBar } from '@/components/organisms/HelpCenter/HelpCenterSearchBar';
import { HelpCenterMenu } from '@/components/organisms/HelpCenter/HelpCenterMenu';
import { HelpCenterArticle } from '@/components/organisms/HelpCenter/HelpCenterArticle';
import { HelpCenterSearchResults } from '@/components/organisms/HelpCenter/HelpCenterSearchResults';
import { HelpCenterTopicsList } from '@/components/organisms/HelpCenter/HelpCenterTopicsList';

export const BrxComponentMapping = {
  Banner: BrxComponentWrapper(Banner),
  Content: BrxComponentWrapper(Content),
  Hero: BrxComponentWrapper(Hero),
  InGridBanner: InGridBanner,
  Logo,
  PathwaysRecommendations: BrxComponentWrapper(PathwaysRecommendations),
  StoreListing,
  StoreLocator,
  TitleAndText,

  // Help Center
  HelpCenterSearchBar,
  HelpCenterMenu,
  HelpCenterSearchResults,
  HelpCenterTopicsList,
  HelpCenterArticle,

  // Undefined components
  // [TYPE_CONTAINER_ITEM_UNDEFINED]: BrxComponentUndefined,
}
