import { Footer } from '../../../components'
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Footer> = {
  component: Footer,
  parameters: {},
  // tags: ['autodocs'],
  title: 'Bloomreach Nucleus/Organisms/Footer',
  argTypes: {},
  args: {},
}
export default meta;
type Story = StoryObj<typeof Footer>

export const Default: Story = {
  render: () =>
    <Footer />,
};
