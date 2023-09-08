import withBrxComponentWrapper from "../lib/withBrxComponentWrapper";
import {
  Hero,
  InGridBanner,
  StoreListing,
  StoreLocator,
} from "./index";

export const BrxComponentMapping = {
  Hero: withBrxComponentWrapper(Hero),
  InGridBanner: withBrxComponentWrapper(InGridBanner),
  StoreListing,
  StoreLocator,
}
