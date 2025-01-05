import { SnackbarProvider } from 'notistack';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { MultipleContainers } from './MultipleContainers.tsx';

const theme = createTheme({});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider autoHideDuration={1000}>
        <MultipleContainers />
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
