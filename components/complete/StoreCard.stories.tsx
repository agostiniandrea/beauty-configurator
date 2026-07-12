import type { Meta, StoryObj } from "@storybook/nextjs";
import StoreCard from "./StoreCard";
import {
  mockLooks,
  mockCategories,
  mockOptions,
  mockSelectionFull,
  mockSelectionPartial,
} from "../model";

const meta: Meta<typeof StoreCard> = {
  title: "Components/StoreCard",
  component: StoreCard,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  args: {
    look: mockLooks[0],
    categories: mockCategories,
    allOptions: mockOptions,
    selection: mockSelectionFull,
    locale: "en",
    orderUrl:
      "https://beauty-configurator.vercel.app/en/configure/natural-glow/complete?base=base-light&eyes=eyes-smoky&lips=lips-nude",
  },
};

export default meta;
type Story = StoryObj<typeof StoreCard>;

export const FullyConfigured: Story = {};

export const PartialSelection: Story = {
  args: { selection: mockSelectionPartial },
};

export const Italian: Story = {
  args: { locale: "it" },
};

export const PrintView: Story = {
  parameters: {
    backgrounds: { default: "white" },
  },
};
