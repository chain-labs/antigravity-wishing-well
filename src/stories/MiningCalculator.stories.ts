"use client";

import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import MiningCalculator from "@/components/Mining/MiningCalculator";
import { TOKEN_OPTIONS } from "@/components/Mining/constants";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/MiningCalculator",
  component: MiningCalculator,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof MiningCalculator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tokenBalance: "120",
    points: 440000,
    value: 40000,
    setValue: () => {}, // Add a dummy setValue function
    conversionRateToUSD: 0.245,
    era: 2,
    phase: 1,
    multiplyer: 33,
    inputOptions: TOKEN_OPTIONS,
    setSelectedToken: () => {}, // Add a dummy setSelectedToken function
    selectedToken: 0,
  },
};
