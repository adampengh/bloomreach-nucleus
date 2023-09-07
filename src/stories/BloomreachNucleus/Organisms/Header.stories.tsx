import { Header } from '../../../components'
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Header> = {
  component: Header,
  parameters: {},
  // tags: ['autodocs'],
  title: 'Bloomreach Nucleus/Organisms/Header',
  argTypes: {},
  args: {},
}
export default meta;
type Story = StoryObj<typeof Header>

export const Default: Story = {
  render: () =>
    <Header />,
};
