import ThemeProvider from '@/themes/ThemeProvider';
import { CssBaseline } from '@mui/material';


import {
  Button
} from '@mui/material'


interface AppProps {}

const App = ({}: AppProps): JSX.Element => {
  return (
    <div>
      <ThemeProvider>
        <CssBaseline />

      </ThemeProvider>
    </div>
  )
}

export default App;
