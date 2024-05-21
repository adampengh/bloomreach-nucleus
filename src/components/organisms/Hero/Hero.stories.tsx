import { Hero } from '../..'
import { Meta, StoryObj } from '@storybook/react';
import { Component, initialize } from '@bloomreach/spa-sdk';
import axios from 'axios';
import { BrComponent, BrComponentContext, BrPage } from '@bloomreach/react-sdk';

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
  argTypes: {
    altText: {
      control: 'text',
    },
    backgroundColor: {
      control: { type: 'color', presetColors: ['#002840', '#ffd500']}
    },
    backgroundOpacity: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
      defaultValue: 0.9,
    },
    buttonColor: {
      control: 'select',
      options: ['primary', 'secondary', 'inherit', 'default']
    },
    buttonText: {
    },
    buttonVariant: {
      control: 'select',
      options: ['contained', 'outlined', 'text'] ,
    },
    fullWidth: {
      control: 'boolean',
      defaultValue: true,
    },
    heading: {
      control: 'text',
    },
    textColor: {
      control: { type: 'color', presetColors: ['#ffffff', '#000000']},
      defaultValue: '#ffffff',
    },
  },
  args: {
    isStorybook: true,
  },
}
export default meta;
type Story = StoryObj<typeof Hero>


export const Default: Story = {
  // loaders: [
  //   async () => ({
  //     page: await initialize(configuration)
  //   })
  // ],
  args: {
    altText: 'Hero Image',
    buttonText: 'Shop Now',
    buttonColor: 'secondary',
    buttonVariant: 'contained',
    heading: 'Hero Heading',
    textColor: '#ffffff'
  },
  render: (args) =>
    <Hero {...args} />
    // <BrPage configuration={configuration} mapping={{}} page={page}>
    //   <BrComponent path="top">
    //     <BrComponentContext.Consumer>
    //       {(componentContext) => {
    //         const container = componentContext?.getChildren()?.find((child) => child.getName() === 'container')
    //         const containerItems = container?.getChildren()
    //         const component = containerItems?.find((child) => child.getName().includes('hero'))
    //         const { document: documentRef } = component?.getModels<any>()
    //         const document = page?.getContent(documentRef)
    //         return (<>
    //           { component && document && <Hero {...args} document={document} component={component} /> }
    //         </>)
    //       }}
    //     </BrComponentContext.Consumer>
    //   </BrComponent>
    // </BrPage>
};
