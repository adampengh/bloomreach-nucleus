import type { Meta, StoryObj } from '@storybook/react';
import { Card } from '.';
import { Button, CardActions, CardContent, Typography } from '@mui/material';
// import { Button } from '@mui/material'

const meta: Meta<typeof Card> = {
  title: 'Material UI/Card',
  component: Card,
  tags: ['autodocs'],
  args: {},
  argTypes: {}
}

export default meta;
type Story = StoryObj<typeof Card>

export const Basic: Story = {
  args: {},
  render: ({...args}) => (
    <Card {...args}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="div">
          be•nev•o•lent
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  )
}
