"use client";

import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import Button from "@/components/Button";

const meta = {
	title: "Example/Button",
	component: Button,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {},
	args: {},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		innerText: "Click me",
		size: "medium",
	},
};

export const Secondary: Story = {
	args: {
		secondary: true,
		innerText: "Secondary",
		size: "medium",
	},
};

export const ButtonWithIcon: Story = {
	args: {
		innerText: "Refresh",
		iconSrc: require("@/assets/icons/refresh.svg"),
		size: "medium",
	},
};

export const ButtonWithNoSparkles: Story = {
	args: {
		innerText: "No sparkles",
		disableSparkels: true,
		size: "medium",
	},
};
