import type { Meta, StoryObj } from '@storybook/react';

import RainbowKit from '../components/RainbowKit';

const meta = {
  component: RainbowKit,
} satisfies Meta<typeof RainbowKit>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};