import type { Meta, StoryObj } from "@storybook/nextjs";
import OptionGrid from "./OptionGrid";
import { mockOptions } from "./model";

const baseOptions = mockOptions.filter((o) => o.categoryId === "base");

const meta: Meta<typeof OptionGrid> = {
  title: "Components/OptionGrid",
  component: OptionGrid,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  args: {
    options: baseOptions,
    selectedOptionId: undefined,
    onSelect: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof OptionGrid>;

export const NoneSelected: Story = {};

export const OneSelected: Story = {
  args: { selectedOptionId: "base-light" },
};

export const WithPricedOption: Story = {
  args: {
    options: mockOptions.filter((o) => o.categoryId === "eyes"),
    selectedOptionId: "eyes-smoky",
  },
};

export const Empty: Story = {
  args: { options: [] },
};
