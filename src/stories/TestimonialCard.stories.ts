'use client';

import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import TesimonialCard from '@/components/TestimonialCard';
import { MotionValue } from 'framer-motion';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/TesimonialCard',
  component: TesimonialCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof TesimonialCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'John Doe',
    shortDescription: 'This is a short description.',
    fullDescription: 'This is a longer description.',
    externalLink: 'https://example.com',
    marginTestimonial: '0' as unknown as MotionValue<string>,
  },
};
