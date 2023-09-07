import { Hero } from '../../../components'
import { Meta, StoryObj } from '@storybook/react';
import { initialize } from '@bloomreach/spa-sdk';
import axios from 'axios';

const configuration = {
  endpoint: 'https://profserv02.bloomreach.io/delivery/site/v1/channels/bloomreach-nucleus/pages',
  path: '/',
  httpClient: axios,
}

const meta: Meta<typeof Hero> = {
  component: Hero,
  parameters: {},
  tags: ['autodocs'],
  title: 'Bloomreach Nucleus/Organisms/Hero',
  argTypes: {},
  args: {},
}
export default meta;
type Story = StoryObj<typeof Hero>


export const Default: Story = {
  loaders: [
    async () => ({
      page: await initialize(configuration)
    })
  ],
  render: (args, { loaded: { page }}) =>
    <Hero {...args} page={page} />,
};
