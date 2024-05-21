import { TYPE_CONTAINER_ITEM_UNDEFINED } from "@bloomreach/spa-sdk";
import BrxComponentWrapper from "@/lib/BrxComponentWrapper";
import {
  Banner,
  Hero,
  InGridBanner,
  Logo,
  PathwaysRecommendations,
  StoreListing,
  StoreLocator,
  TitleAndText,
} from "../components/index";
import { BrxComponentUndefined } from "./BrxComponentUndefined";

export const BrxComponentMapping = {
  Banner: BrxComponentWrapper(Banner),
  Hero: BrxComponentWrapper(Hero),
  InGridBanner: InGridBanner,
  Logo,
  PathwaysRecommendations,
  StoreListing,
  StoreLocator,
  TitleAndText,
  [TYPE_CONTAINER_ITEM_UNDEFINED]: BrxComponentUndefined,
}
