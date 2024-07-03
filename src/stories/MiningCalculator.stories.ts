'use client';

import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import MiningCalculator from '@/components/Mining/MiningHero.test/NonContributed/MiningCalculator';
import { IMAGEKIT_ICONS } from '@/assets/imageKit';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/MiningCalculator',
  component: MiningCalculator,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof MiningCalculator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 40000,
    setValue: () => {}, // Add a dummy setValue function
    conversionRateToUSD: 0.245,
    era: 2,
    phase: 1,
    multiplyer: 33,
    inputOptions: [
      {
        label: 'ETH',
        USDvalue: 1,
        tokenContract: '',
        icon: IMAGEKIT_ICONS.ETH_BLACK,
      },
      {
        label: 'PLS',
        USDvalue: 2,
        tokenContract: '',
        icon: IMAGEKIT_ICONS.PLS_BLACK,
      },
      {
        label: 'USDT',
        USDvalue: 3,
        tokenContract: '',
        icon: IMAGEKIT_ICONS.USDT_BLACK,
      },
      {
        label: 'USDC',
        USDvalue: 4,
        tokenContract: '',
        icon: IMAGEKIT_ICONS.USDC_BLACK,
      },
    ],
    setSelectedToken: () => {}, // Add a dummy setSelectedToken function
  },
};
