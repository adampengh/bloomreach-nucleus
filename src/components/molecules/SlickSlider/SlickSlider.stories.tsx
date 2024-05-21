import { Meta, StoryObj } from '@storybook/react';
import { SlickSlider } from '@/components';
import { Box, Typography } from '@mui/material';


const SlideSixteenByNine = () =>
  <Box sx={{ p: 2 }}>
    <img src='https://via.placeholder.com/1600x900' alt='1' />
  </Box>

const SlideFourByThree = () =>
  <Box sx={{ p: 2 }}>
    <img src='https://via.placeholder.com/400x300' alt='1' />
  </Box>

const SlideThreeByFour = () =>
<Box sx={{ p: 2 }}>
  <img src='https://via.placeholder.com/300x400' alt='1' />
</Box>

const PromoSlide = () => (
  <Box sx={{ p: 1 }}>
    <Typography variant="body1" sx={{ fontWeight: 700, textTransform: 'uppercase'}}>Ends 12/31</Typography>
    <img src='https://via.placeholder.com/300x200' alt='1' />
    <Typography variant="body1" sx={{ fontWeight: 700 }}>Buy One, Get One 50% Off</Typography>
    <Typography variant="body2" sx={{}}>Use Code: BOGO50</Typography>
  </Box>
)

const SLIDE_VARIANTS = {
  SlideSixteenByNine,
  SlideFourByThree,
  SlideThreeByFour,
  PromoSlide,
}

const meta: Meta<typeof SlickSlider> = {
  component: SlickSlider,
  parameters: {},
  tags: ['autodocs'],
  title: 'Bloomreach Nucleus/Molecules/Slick Slider',
  argTypes: {
    arrows: {
      control: { type: 'boolean' },
      defaultValue: true,
    },
    autoplay: {
      control: { type: 'boolean' },
      defaultValue: false,
    },
    dots: {
      control: { type: 'boolean' },
      defaultValue: true,
    },
    slide: {
      control: { type: 'radio' },
      options: Object.keys(SLIDE_VARIANTS),
      defaultValue: 'SlideSixteenByNine',
    }
  },
  args: {
    numberOfSlides: 5,
  },
}
export default meta;
type Story = StoryObj<typeof SlickSlider>


export const SingleItem: Story = {
  args: {
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 750,
    slide: 'SlideSixteenByNine'
  },
  render: ({...args}) => {
    const slide = SLIDE_VARIANTS[args.slide as keyof typeof SLIDE_VARIANTS];
    return (
    <Box sx={{ pb: 8 }}>
      <SlickSlider {...args}>
        {Array.from(Array(args.numberOfSlides)).map(() => (
          slide()
        ))}
      </SlickSlider>
    </Box>

    )
  }
};

export const MultipleItems: Story = {
  args: {
    arrows: true,
    autoplay: false,
    autoplaySpeed: 3000,
    dots: true,
    infinite: true,
    numberOfSlides: 8,
    slidesToShow: 4,
    slidesToScroll: 1,
    speed: 750,
    slide: 'SlideThreeByFour'
  },
  render: ({...args}) => {
    const slide = SLIDE_VARIANTS[args.slide as keyof typeof SLIDE_VARIANTS];
    return (
      <Box sx={{ py: 4 }}>
        <SlickSlider {...args}>
          {Array.from(Array(args.numberOfSlides)).map(() => (
            slide()
          ))}
        </SlickSlider>
      </Box>
    )
  }
};

export const PromoSlider: Story = {
  args: {
    arrows: true,
    autoplay: false,
    autoplaySpeed: 3000,
    dots: true,
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    speed: 750,
    slide: 'PromoSlide'
  },
  render: ({...args}) => {
    const slide = SLIDE_VARIANTS[args.slide as keyof typeof SLIDE_VARIANTS];
    return (
      <Box sx={{ py: 4 }}>
        <SlickSlider {...args}>
          {Array.from(Array(args.numberOfSlides)).map(() => (
            slide()
          ))}
        </SlickSlider>
      </Box>
    )
  }
};
