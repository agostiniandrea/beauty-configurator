import type { Meta, StoryObj } from "@storybook/nextjs";
import CategoryNav from "./CategoryNav";
import { mockCategories } from "./model";

const meta: Meta<typeof CategoryNav> = {
  title: "Components/CategoryNav",
  component: CategoryNav,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    categories: mockCategories,
    currentStep: 0,
    completedSteps: new Set(),
    onSelect: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof CategoryNav>;

export const FirstStep: Story = {};

export const MiddleStep: Story = {
  args: {
    currentStep: 1,
    completedSteps: new Set([0]),
  },
};

export const AllComplete: Story = {
  args: {
    currentStep: 2,
    completedSteps: new Set([0, 1]),
  },
};
