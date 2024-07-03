'use client';

import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import HeroItemCard from '@/components/HeroItemCard';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/HeroItemCard',
  component: HeroItemCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundImage: { control: 'object' },
  },
  args: {
    backgroundImage: require('@/assets/mining.png'),
  },
} satisfies Meta<typeof HeroItemCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Hero Item Card',
    description: 'This is a hero item card.',
    backgroundImage: require('@/assets/mining.png'),
    animateFrom: 'none',
  },
};

export const AnimateLeft: Story = {
  args: {
    title: 'Hero Item Card',
    description: 'This is a hero item card.',
    backgroundImage: require('@/assets/mining.png'),
    animateFrom: 'left',
  },
};

export const AnimateRight: Story = {
  args: {
    title: 'Hero Item Card',
    description: 'This is a hero item card.',
    backgroundImage: require('@/assets/mining.png'),
    animateFrom: 'right',
  },
};

export const AnimateBottom: Story = {
  args: {
    title: 'Hero Item Card',
    description: 'This is a hero item card.',
    backgroundImage: require('@/assets/mining.png'),
    animateFrom: 'bottom',
  },
};
