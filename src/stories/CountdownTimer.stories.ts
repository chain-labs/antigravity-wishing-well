"use client";

import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import CountdownTimer from "@/components/CountdownTimer";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/CountdownTimer",
  component: CountdownTimer,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof CountdownTimer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    state: {
      days: 1,
      hours: 2,
      mins: 3,
      secs: 4,
      phase: 3,
      era: "minting",
      claimStarted: false,
      claimTransition: false,
    },
  },
};
