import type { Meta, StoryObj } from '@storybook/react';

import { ButtonUsed } from './ButtonUsed';

const meta: Meta<typeof ButtonUsed> = {
  component: ButtonUsed,
};

export default meta;
type Story = StoryObj<typeof ButtonUsed>;

export const Primary: Story = {
  args: {
    textButton: 'Button',
    isDisabled: false,
    onClick: () => {}
  },
};