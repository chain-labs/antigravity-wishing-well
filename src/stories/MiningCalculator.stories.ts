"use client";

import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import MiningCalculator from "@/components/MiningCalculator";

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
		value: 40000,
		conversionRateToUSD: 0.245,
		era: 2,
		phase: 1,
		multiplyer: 33,
		inputOptions: [{
			label: "PLS",
			value: 0.245,
		}, {
			label: "AGLP",
			value: 0.3,
		}],
	},
};
