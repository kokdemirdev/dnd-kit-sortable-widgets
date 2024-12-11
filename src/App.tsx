import { SnackbarProvider } from 'notistack';
import Dashboard from './Dashboard.tsx';

function App() {
  return (
    <SnackbarProvider autoHideDuration={1000}>
      <Dashboard />
    </SnackbarProvider>
  );
}

export default App;
