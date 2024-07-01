import { Meta, StoryObj } from '@storybook/react';
import { BrComponent, BrPage } from '@bloomreach/react-sdk';
import axios from 'axios';
import { Footer } from '../../../components'
import { Logo } from '../../../components';

const configuration = {
  endpoint: process.env.NEXT_PUBLIC_BRX_ENDPOINT + './footer',
  path: '/',
  httpClient: axios,
}

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
    <BrPage configuration={configuration} mapping={{ Logo }}>
      <BrComponent path="Footer">
        <Footer />
      </BrComponent>
    </BrPage>
};
