import { Hero } from '../../../components'
import { Meta, StoryObj } from '@storybook/react';
import { Component, initialize } from '@bloomreach/spa-sdk';
import axios from 'axios';
import { BrComponent, BrComponentContext, BrPage } from '@bloomreach/react-sdk';
import WithBrxComponentWrapper from '../../../lib/withBrxComponentWrapper';

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
    <BrPage configuration={configuration} mapping={{}} page={page}>
      <BrComponent path="top">
        <BrComponentContext.Consumer>
          {(componentContext) => {
            const container = componentContext?.getChildren()?.find((child) => child.getName() === 'container')
            const containerItems = container?.getChildren()
            const component = containerItems?.find((child) => child.getName().includes('hero'))
            const { document: documentRef } = component?.getModels<any>()
            const document = page?.getContent(documentRef)
            return (<>
              { component && document && <Hero {...args} document={document} component={component} /> }
            </>)
          }}
        </BrComponentContext.Consumer>
      </BrComponent>
    </BrPage>
};
