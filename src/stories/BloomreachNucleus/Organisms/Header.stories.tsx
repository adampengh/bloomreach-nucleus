import { Meta, StoryObj } from '@storybook/react';
import { BrComponent, BrPage } from '@bloomreach/react-sdk';
import axios from 'axios';
import { Header, Logo } from '@/components'

const configuration = {
  endpoint: process.env.NEXT_PUBLIC_BRX_ENDPOINT + './header',
  path: '/',
  httpClient: axios,
}

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
    <BrPage configuration={configuration} mapping={{ Logo }}>
      <BrComponent path="Header">
        <Header />
      </BrComponent>
    </BrPage>
};
