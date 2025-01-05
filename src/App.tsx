import { SnackbarProvider } from 'notistack';
import Dashboard from './Dashboard.tsx';
import { DashboardLayoutProvider } from './DashboardLayoutContext.tsx';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';

const theme = createTheme({});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DashboardLayoutProvider>
        <SnackbarProvider autoHideDuration={1000}>
          <Dashboard />
        </SnackbarProvider>
      </DashboardLayoutProvider>
    </ThemeProvider>
  );
}

export default App;
