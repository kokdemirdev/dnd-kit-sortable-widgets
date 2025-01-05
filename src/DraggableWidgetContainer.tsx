import { Box, Grid2 } from '@mui/material';
import WidgetItem from './components/WidgetItem.tsx';
import { useDashboardLayout } from './DashboardLayoutContext.tsx';
import { DndContext } from '@dnd-kit/core';

export default function DraggableWidgetContainer() {
  const { isEditing, calculatedWidgets } = useDashboardLayout();
  return (
    <Box>
      <DndContext>
        <Grid2 container spacing={2}>
          <Grid2 size={8}>
            <Grid2
              container
              spacing={2}
              bgcolor={isEditing ? 'aliceblue' : 'white'}
              padding={isEditing ? 1 : 0}
            >
              {calculatedWidgets.left.map((widget) => (
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
              {calculatedWidgets.right.map((widget) => (
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
          {calculatedWidgets.bottom.map((widget) => (
            <Grid2 key={widget.id} size={12}>
              <WidgetItem widget={widget} />
            </Grid2>
          ))}
        </Grid2>
      </DndContext>
    </Box>
  );
}
