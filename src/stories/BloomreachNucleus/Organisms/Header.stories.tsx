import { Meta, StoryObj } from '@storybook/react';
import { BrComponent, BrPage } from '@bloomreach/react-sdk';
import axios from 'axios';
import { Header } from '../../../components'

const configuration = {
  endpoint: 'https://profserv02.bloomreach.io/delivery/site/v1/channels/bloomreach-nucleus/pages./footer',
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
    <BrPage configuration={configuration} mapping={{}}>
      <BrComponent path="Header">
        <Header />
      </BrComponent>
    </BrPage>
};
