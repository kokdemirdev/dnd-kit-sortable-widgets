import { Box, Grid2 } from '@mui/material';
import WidgetItem from './components/WidgetItem.tsx';
import { useDashboardLayout } from './DashboardLayoutContext.tsx';

export default function DraggableWidgetContainer() {
  const { isEditing, groupedWidgets } = useDashboardLayout();
  return (
    <Box>
      <Grid2 container spacing={2}>
        <Grid2 size={8}>
          <Grid2
            container
            spacing={2}
            bgcolor={isEditing ? 'aliceblue' : 'white'}
            padding={isEditing ? 1 : 0}
          >
            {groupedWidgets.left.map((widget) => (
              <Grid2 key={widget.id} size={12}>
                <WidgetItem widget={widget} />
              </Grid2>
            ))}
          </Grid2>
        </Grid2>
        <Grid2 size={4}>
          <Grid2
            container
            spacing={2}
            bgcolor={isEditing ? 'aliceblue' : 'white'}
            padding={isEditing ? 1 : 0}
          >
            {groupedWidgets.right.map((widget) => (
              <Grid2 key={widget.id} size={12}>
                <WidgetItem widget={widget} />
              </Grid2>
            ))}
          </Grid2>
        </Grid2>
      </Grid2>
      <Grid2
        container
        spacing={2}
        marginTop={2}
        bgcolor={isEditing ? 'aliceblue' : 'white'}
        padding={isEditing ? 1 : 0}
      >
        {groupedWidgets.bottom.map((widget) => (
          <Grid2 key={widget.id} size={12}>
            <WidgetItem widget={widget} />
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
}
