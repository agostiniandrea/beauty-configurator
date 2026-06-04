import type { Meta, StoryObj } from "@storybook/nextjs";
import SummaryPanel from "./SummaryPanel";
import { mockCategories, mockOptions, mockSelectionPartial, mockSelectionFull } from "../model";

const meta: Meta<typeof SummaryPanel> = {
  title: "Components/SummaryPanel",
  component: SummaryPanel,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    categories: mockCategories,
    options: mockOptions,
    selection: {},
  },
};

export default meta;
type Story = StoryObj<typeof SummaryPanel>;

export const Empty: Story = {};

export const PartiallyFilled: Story = {
  args: { selection: mockSelectionPartial },
};

export const FullyConfigured: Story = {
  args: { selection: mockSelectionFull },
};
