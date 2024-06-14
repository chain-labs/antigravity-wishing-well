"use client";

import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import Form from "./Form";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: "Example/Form",
	component: Form,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {},
	args: {
		defaultSuccess: false,
	},
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		defaultSuccess: false,
		formTitle: "Ignite Your <br /> Boosters.",
		formDescription: "Get all Antigravity updates in your inbox.",
		successTitle: "Success!",
		successDescription: `You&apos;ll get all Antigravity updates in your inbox. <br /> Stay tune!.`,
	},
};

export const Success: Story = {
	args: {
		defaultSuccess: true,
		formTitle: "Ignite Your <br /> Boosters.",
		formDescription: "Get all Antigravity updates in your inbox.",
		successTitle: "Success!",
		successDescription: `You&apos;ll get all Antigravity updates in your inbox. <br /> Stay tune!.`,
	},
};
