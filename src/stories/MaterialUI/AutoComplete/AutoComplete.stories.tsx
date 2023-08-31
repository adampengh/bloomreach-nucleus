import { Autocomplete, TextField } from '@mui/material';
import { Meta, StoryObj } from '@storybook/react';
import { top100Films } from './data';

const meta: Meta<typeof Autocomplete> = {
  component: Autocomplete,
  parameters: {},
  tags: ['autodocs'],
  title: 'Material UI/Autocomplete',
  argTypes: {},
}
export default meta;
type Story = StoryObj<typeof Autocomplete>

export const MultipleValues: Story = {
  render: () =>
    <Autocomplete
      multiple
      id="tags-standard"
      options={top100Films}
      getOptionLabel={(option) => option.title}
      defaultValue={[top100Films[13]]}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="standard"
          label="Multiple values"
          placeholder="Favorites"
        />
      )}
    />,
};
