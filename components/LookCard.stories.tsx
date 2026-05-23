import type { Meta, StoryObj } from "@storybook/nextjs";
import LookCard from "./LookCard";
import { mockLooks } from "./model";

const meta: Meta<typeof LookCard> = {
  title: "Components/LookCard",
  component: LookCard,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof LookCard>;

export const Natural: Story = {
  args: { look: mockLooks[0] },
};

export const Evening: Story = {
  args: { look: mockLooks[1] },
};

export const MobileView: Story = {
  args: { look: mockLooks[0] },
  parameters: { viewport: { defaultViewport: "mobile1" } },
};
