import { TYPE_CONTAINER_NO_MARKUP } from "@bloomreach/spa-sdk";
import withBrxComponentWrapper from "../lib/withBrxComponentWrapper";
import {
  Hero,
  InGridBanner,
  Logo,
  PathwaysRecommendations,
  StoreListing,
  StoreLocator,
} from "./index";

export const BrxComponentMapping = {
  Hero: withBrxComponentWrapper(Hero),
  InGridBanner: withBrxComponentWrapper(InGridBanner),
  Logo,
  PathwaysRecommendations,
  StoreListing,
  StoreLocator,

  // [TYPE_CONTAINER_NO_MARKUP]: withBrxComponentWrapper("div"),
}
