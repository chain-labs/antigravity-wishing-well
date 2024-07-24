"use client";

import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import Dropdown from "@/components/Dropdown";
import { IMAGEKIT_ICONS } from "@/assets/imageKit";
import { TOKEN_OPTIONS } from "@/components/Mining/constants";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/Dropdown",
  component: Dropdown,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: TOKEN_OPTIONS,
    selected: 0,
    setSelected: fn(),
  },
};
