"use client";

import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import Dropdown from "@/components/Dropdown";
import { IMAGEKIT_ICONS } from "@/assets/imageKit";

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
		options: [
			{
				label: "ETH",
				USDvalue: 1,
				tokenContract: "",
				darkIcon: IMAGEKIT_ICONS.ETH_BLACK,
				lightIcon: IMAGEKIT_ICONS.ETH,
			},
			{
				label: "PLS",
				USDvalue: 2,
				tokenContract: "",
				darkIcon: IMAGEKIT_ICONS.PLS_BLACK,
				lightIcon: IMAGEKIT_ICONS.PLS,
			},
			{
				label: "USDT",
				USDvalue: 3,
				tokenContract: "",
				darkIcon: IMAGEKIT_ICONS.USDT_BLACK,
				lightIcon: IMAGEKIT_ICONS.USDT,
			},
			{
				label: "USDC",
				USDvalue: 4,
				tokenContract: "",
				darkIcon: IMAGEKIT_ICONS.USDC_BLACK,
				lightIcon: IMAGEKIT_ICONS.USDC,
			},
		],
		selected: 0,
		setSelected: fn(),
	},
};
