"use client";

import Spinner from "@/components/Home/components/Spinner";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { MotionValue } from "framer-motion";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/Spinner",
  component: Spinner,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Default: Story = {
  args: {
    scrollYProgress: 0 as unknown as MotionValue<number>,
  },
};
