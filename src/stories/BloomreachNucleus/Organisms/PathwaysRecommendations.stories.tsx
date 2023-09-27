import { PathwaysRecommendations } from '@/components'
import { Meta, StoryObj } from '@storybook/react';
import { Component, initialize } from '@bloomreach/spa-sdk';
import axios from 'axios';
import { BrComponent, BrComponentContext, BrPage } from '@bloomreach/react-sdk';

const configuration = {
  endpoint: 'https://profserv02.bloomreach.io/delivery/site/v1/channels/bloomreach-nucleus/pages',
  path: '/',
  httpClient: axios,
}

const meta: Meta<typeof PathwaysRecommendations> = {
  component: PathwaysRecommendations,
  parameters: {},
  tags: ['autodocs'],
  title: 'Bloomreach Nucleus/Organisms/Pathways & Recommendations',
  argTypes: {},
  args: {},
}
export default meta;
type Story = StoryObj<typeof PathwaysRecommendations>


export const Default: Story = {
  render: (args) =>
    <PathwaysRecommendations {...args} />
};
