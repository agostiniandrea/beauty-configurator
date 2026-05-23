import { addons } from "storybook/manager-api";
import { create } from "storybook/theming";

addons.setConfig({
  theme: create({
    base: "light",
    brandTitle: "Beauty Configurator",
    brandUrl: "/",
    colorPrimary: "#C4857A",
    colorSecondary: "#2D1F1A",
  }),
});
