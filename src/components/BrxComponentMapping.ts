import withBrxComponentWrapper from "@/lib/withBrxComponentWrapper";
import {
  Hero,
  StoreListing,
  StoreLocator,
} from "./index";

export const BrxComponentMapping = {
  Hero: withBrxComponentWrapper(Hero),
  StoreListing,
  StoreLocator,
}
