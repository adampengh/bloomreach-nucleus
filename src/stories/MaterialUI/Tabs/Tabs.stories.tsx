import { SyntheticEvent, useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Box, Tabs as MuiTabs, Tab } from '@mui/material';

const meta: Meta<typeof MuiTabs> = {
  component: MuiTabs,
  parameters: {},
  tags: ['autodocs'],
  title: 'Material UI/Tabs',
  argTypes: {},
}
export default meta;
type Story = StoryObj<typeof MuiTabs>


const TabPanel = ({
  children,
  value,
  index,
  ...rest
}: {
  children: React.ReactNode;
  value: number;
  index: number;
}) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...rest}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}


const Tabs = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <MuiTabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Item One" />
          <Tab label="Item Two" />
          <Tab label="Item Three" />
        </MuiTabs>
      </Box>
      <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </Box>
  )
}

export const Default: Story = {
  render: () => <Tabs />,
};
