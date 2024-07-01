import { Typography } from '.';

export default {
  title: 'Material UI/Typography',
  component: Typography,
  parameters: {
  },
  tags: ['autodocs'],
  argTypes: {
    align: {
      description: 'Set the text-align on the component',
      options: ['left', 'center', 'right', 'justify'],
      control: { type: 'select' }
    },
    component: {
      description: 'The component used for the root node. Either a string to use a HTML element or a component.',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span'],
      control: { type: 'select' }
    },
    variant: {
      description: 'Applies the theme typography styles.',
      options: ['body1', 'body2', 'button', 'caption', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'inherit', 'overline', 'subtitle1', 'subtitle2', 'serifxxxl'],
      control: { type: 'select' }
    },
  },
};

export const Heading1 = {
  args: {
    variant: 'h1',
    component: 'h1',
    text: 'Heading level 1',
  },
};

export const Heading2 = {
  args: {
    variant: 'h2',
    component: 'h2',
    text: 'Heading level 2',
  },
};

export const Heading3 = {
  args: {
    variant: 'h3',
    component: 'h3',
    text: 'Heading level 3',
  },
};

export const Heading4 = {
  args: {
    variant: 'h4',
    component: 'h4',
    text: 'Heading level 4',
  },
};

export const Heading5 = {
  args: {
    variant: 'h5',
    component: 'h5',
    text: 'Heading level 5',
  },
};

export const Heading6 = {
  args: {
    variant: 'h6',
    component: 'h6',
    text: 'Heading level 6',
  },
};

export const Body1 = {
  args: {
    variant: 'body1',
    component: 'p',
    text: 'Everyone has the right to freedom of thought, conscience and religion; this right includes freedom to change his religion or belief, and freedom, either alone or in community with others and in public or private, to manifest his religion or belief in teaching, practice, worship and observance. Everyone has the right to freedom of opinion and expression; this right includes freedom to hold opinions without interference and to seek, receive and impart information and ideas through any media and regardless of frontiers. Everyone has the right to rest and leisure, including reasonable limitation of working hours and periodic holidays with pay.',
  }
};

export const Body2 = {
  args: {
    variant: 'body2',
    component: 'p',
    text: 'Everyone has the right to freedom of thought, conscience and religion; this right includes freedom to change his religion or belief, and freedom, either alone or in community with others and in public or private, to manifest his religion or belief in teaching, practice, worship and observance. Everyone has the right to freedom of opinion and expression; this right includes freedom to hold opinions without interference and to seek, receive and impart information and ideas through any media and regardless of frontiers. Everyone has the right to rest and leisure, including reasonable limitation of working hours and periodic holidays with pay.',
  }
};

export const Button = {
  args: {
    variant: 'button',
    component: 'p',
    text: 'Button',
  },
};

export const Caption = {
  args: {
    variant: 'caption',
    component: 'p',
    text: 'Everyone has the right to freedom of thought, conscience and religion; this right includes freedom to change his religion or belief.',
  }
};

export const Subtitle1 = {
  args: {
    variant: 'subtitle1',
    component: 'p',
    text: 'Everyone has the right to freedom of thought, conscience and religion; this right includes freedom to change his religion or belief, and freedom, either alone or in community with others and in public or private, to manifest his religion or belief in teaching, practice, worship and observance. Everyone has the right to freedom of opinion and expression; this right includes freedom to hold opinions without interference and to seek, receive and impart information and ideas through any media and regardless of frontiers. Everyone has the right to rest and leisure, including reasonable limitation of working hours and periodic holidays with pay.',
  }
};

export const Subtitle2 = {
  args: {
    variant: 'subtitle2',
    component: 'p',
    text: 'Everyone has the right to freedom of thought, conscience and religion; this right includes freedom to change his religion or belief, and freedom, either alone or in community with others and in public or private, to manifest his religion or belief in teaching, practice, worship and observance. Everyone has the right to freedom of opinion and expression; this right includes freedom to hold opinions without interference and to seek, receive and impart information and ideas through any media and regardless of frontiers. Everyone has the right to rest and leisure, including reasonable limitation of working hours and periodic holidays with pay.',
  }
};

export const SerifXXXL = {
  args: {
    variant: 'serifxxxl',
    component: 'h1',
    text: 'Everyone has the right to freedom of thought, conscience and religion.',
  }
};
