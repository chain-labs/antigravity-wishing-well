"use client";

import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import Dropdown from "./Dropdown";

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
		iconSrc: require("@/assets/icons/pill-points.svg"),
		iconAlt: "Icon",
		options: [
			{ label: "Option 1", value: 1 },
			{ label: "Option 2", value: 2 },
			{ label: "Option 3", value: 3 },
		],
		selected: "Option 1",
		setSelected: fn(),
	},
};
