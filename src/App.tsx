import {
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid2 as Grid,
  Stack,
  Typography,
} from '@mui/material';
import { defaultWidgets, ITransformedWidget } from './data.ts';
import { useMemo, useState } from 'react';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function WidgetCard({ widget }: { widget: ITransformedWidget }) {
  return (
    <Card sx={{ mb: 2 }}>
      <CardHeader
        title={widget.title}
        action={
          <Stack direction="row" justifyItems="center">
            {widget.visible ? <VisibilityOffIcon /> : <VisibilityIcon />}
            <DragIndicatorIcon />
          </Stack>
        }
      />
    </Card>
  );
}

function App() {
  const [widgets] = useState<ITransformedWidget[]>(defaultWidgets);

  const leftWidgets = useMemo(
    () => widgets.filter((widget) => widget.group === 1).slice(0, 2),
    [widgets]
  );
  const rightWidgets = useMemo(
    () => widgets.filter((widget) => widget.group === 2),
    [widgets]
  );
  const bottomWidgets = useMemo(
    () => widgets.filter((widget) => widget.group === 1).slice(2),
    [widgets]
  );

  return (
    <Container maxWidth="lg">
      <Typography variant="h3" align="center">
        Widget Sortable
      </Typography>
      <Grid container spacing={5}>
        <Grid size={8}>
          {leftWidgets.map((widget) => (
            <WidgetCard widget={widget} />
          ))}
        </Grid>
        <Grid size={4}>
          {rightWidgets.map((widget) => (
            <WidgetCard widget={widget} />
          ))}
        </Grid>
      </Grid>
      <Grid container spacing={5}>
        <Grid size={12}>
          {bottomWidgets.map((widget) => (
            <WidgetCard widget={widget} />
          ))}
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
