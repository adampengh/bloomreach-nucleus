
import { Alert } from '.';

export default {
  title: 'Material UI/Alert',
  component: Alert,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {
    severity: {
      control: { type: 'select' },
      defaultValue: 'success',
      options: ['success', 'info', 'warning', 'error']
    },
    variant: {
      control: { type: 'select' },
      defaultValue: 'filled',
      options: ['filled', 'outlined', 'standard']
    },
  },
};

// ================================================
// Success
// ================================================
export const Success = {
  args: {
    severity: 'success',
    text: 'This is an success alert — check it out!',
    variant: 'standard',
  },
};
export const SuccessFilled = {
  args: {
    severity: 'success',
    text: 'This is an success alert — check it out!',
    variant: 'filled',
  },
};
export const SuccessOutlined = {
  args: {
    severity: 'success',
    text: 'This is an success alert — check it out!',
    variant: 'outlined',
  },
};

// ================================================
// Info
// ================================================
export const Info = {
  args: {
    severity: 'info',
    text: 'This is an info alert — check it out!',
    variant: 'standard',
  },
};
export const InfoFilled = {
  args: {
    severity: 'info',
    text: 'This is an info alert — check it out!',
    variant: 'filled',
  },
};
export const InfoOutlined = {
  args: {
    severity: 'info',
    text: 'This is an info alert — check it out!',
    variant: 'outlined',
  },
};

// ================================================
// Warning
// ================================================
export const Warning = {
  args: {
    severity: 'warning',
    text: 'This is an warning alert — check it out!',
    variant: 'standard',
  },
};
export const WarningFilled = {
  args: {
    severity: 'warning',
    text: 'This is an warning alert — check it out!',
    variant: 'filled',
  },
};
export const WarningOutlined = {
  args: {
    severity: 'warning',
    text: 'This is an warning alert — check it out!',
    variant: 'outlined',
  },
};

// ================================================
// Error
// ================================================
export const Error = {
  args: {
    text: 'This is an error alert — check it out!',
    severity: 'error',
    variant: 'standard',
  },
};
export const ErrorFilled = {
  args: {
    severity: 'error',
    text: 'This is an error alert — check it out!',
    variant: 'filled',
  },
};
export const ErrorOutlined = {
  args: {
    severity: 'error',
    variant: 'outlined',
    text: 'This is an error alert — check it out!',
  },
};
