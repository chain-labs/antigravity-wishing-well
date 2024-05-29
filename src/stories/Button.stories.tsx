import type { Meta, StoryObj } from "@storybook/react";

import Button from "../components/Button";
import IMAGEKIT from "../app/home/images";
import Image from "next/image";
import { fn } from "@storybook/test";

const meta = {
	component: Button,
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

const childComponent: React.ReactNode = (
	<>
		<Image
			src={IMAGEKIT.ICON_PLS}
			alt="pls-btn"
			width={52}
			height={52}
			className="absolute left-0 z-1 opacity-35"
		/>
		<p className="uppercase z-20">wishwell.PLS</p>
		<Image src={IMAGEKIT.ICON_COPY} alt="share" width={20} height={20} />
	</>
);

export const Default: Story = {
	args: {
		children: childComponent,
		onClick: fn(),
		className: "self-start overflow-hidden",
		secondary: false,
	},
};
