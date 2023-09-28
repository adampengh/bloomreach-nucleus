import { Autocomplete, TextField, darken, lighten, styled } from '@mui/material';
import { Meta, StoryObj } from '@storybook/react';
import { countries } from './countries';

const meta: Meta<typeof Autocomplete> = {
  component: Autocomplete,
  parameters: {},
  tags: ['autodocs'],
  title: 'Material UI/Autocomplete',
  argTypes: {},
}
export default meta;
type Story = StoryObj<typeof Autocomplete>

const GroupHeader = styled('div')(({ theme }) => ({
  position: 'sticky',
  top: '-8px',
  padding: '4px 10px',
  color: theme.palette.primary.main,
  backgroundColor:
    theme.palette.mode === 'light'
      ? lighten(theme.palette.primary.light, 0.85)
      : darken(theme.palette.primary.main, 0.8),
}));

const GroupItems = styled('ul')({
  padding: 0,
});

const options = countries.map((option) => {
  const firstLetter = option.name[0].toUpperCase();
  return {
    firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
    ...option,
  };
});


export const Default: Story = {
  render: () =>
    <Autocomplete
      id="tags-standard"
      options={options}
      getOptionLabel={(option) => `${option.name} (${option.code})`}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="standard"
          label="Default"
          placeholder="Default"
        />
      )}
    />,
};

export const Multiple: Story = {
  render: () =>
    <Autocomplete
      multiple
      id="tags-standard"
      options={options}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="standard"
          label="Multiple"
          placeholder="Multiple"
        />
      )}
    />,
};

export const Grouped: Story = {
  render: () =>
    <Autocomplete
      id="tags-standard"
      options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
      groupBy={(option) => option.firstLetter}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="standard"
          label="Grouped"
          placeholder="Grouped"
        />
      )}
      renderGroup={(params) => (
        <li key={params.key}>
          <GroupHeader>{params.group}</GroupHeader>
          <GroupItems>{params.children}</GroupItems>
        </li>
      )}
    />,
};
