import {
  Backdrop,
  CircularProgress,
  Container,
  Divider,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { useDashboardLayout } from './DashboardLayoutContext.tsx';
import { Edit, Cancel, Save } from '@mui/icons-material';
import GridContainer from './GridContainer.tsx';

export default function Dashboard() {
  const { isEditing, handleEdit, handleSave, handleCancel, loading } =
    useDashboardLayout();
  return (
    <Container maxWidth="lg">
      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Typography component="h1" variant="h4" align="center">
        Test
      </Typography>
      <Stack spacing={2} direction="row">
        {!isEditing ? (
          <IconButton onClick={handleEdit} disabled={loading}>
            <Edit />
          </IconButton>
        ) : (
          <>
            <IconButton onClick={handleSave} disabled={loading}>
              <Save />
            </IconButton>
            <IconButton onClick={handleCancel} disabled={loading}>
              <Cancel />
            </IconButton>
          </>
        )}
      </Stack>
      <Divider sx={{ my: 2 }} />
      <GridContainer />
    </Container>
  );
}
