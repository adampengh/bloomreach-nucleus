import { Image } from '@/components'
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Image> = {
  component: Image,
  parameters: {},
  tags: ['autodocs'],
  title: 'Bloomreach Nucleus/Atoms/Image',
  args: {},
  argTypes: {
    src: {
      control: 'select',
      options: ['Image-1x1.jpg', 'Image-2x3.jpg', 'Image-3x2.jpg', 'Image-3x4.jpg', 'Image-3x4_alt.jpg', 'Image-4x3.jpg', 'Image-16x9.jpg']
    },
    srcSecondary: {
      control: 'select',
      options: ['Image-1x1.jpg', 'Image-2x3.jpg', 'Image-3x2.jpg', 'Image-3x4.jpg', 'Image-3x4_alt.jpg', 'Image-4x3.jpg', 'Image-16x9.jpg']
    }
  },
}
export default meta;
type Story = StoryObj<typeof Image>

export const Default: Story = {
  args: {
    src: 'Image-3x4.jpg',
  },
  render: ({ ...args }) =>
    <Image
      src={`/assets/images/placeholders/${args.src}`}
      alt='Image'
      srcSecondary={args.srcSecondary ? `/assets/images/placeholders/${args.srcSecondary}` : undefined}
      height={300}
      width={200}
    />
};
