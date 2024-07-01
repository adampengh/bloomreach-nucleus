import {
  Box,
} from '@mui/material';

interface TabPanelProps {
  value: number;
  index: number;
  children: React.ReactNode;

  [x: string]: any;
}

export const TabPanel = ({ children, value, index, ...rest }: TabPanelProps) => {
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...rest}
    >
      {value === index && (
        <Box sx={{ py: 3, px: 0 }}>
          {children}
        </Box>
      )}
    </div>
  );
}
