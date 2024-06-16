"use client";

import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import Pill from "./Pill";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: "Example/Pill",
	component: Pill,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {},
	args: {},
} satisfies Meta<typeof Pill>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
        text: "Pill",
    },
};

export const WithIcon: Story = {
	args: {
		text: "Points",
		iconSrc: require("@/app/assets/icons/pill-points.svg"),
		iconAlt: "Icon",
	},
};
