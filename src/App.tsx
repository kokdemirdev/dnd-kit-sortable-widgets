import { Box, Grid2 as Grid, Container } from '@mui/material';
import { useCallback, useMemo, useState } from 'react';
import LayoutEditButtonArea from './components/LayoutEditButtonArea.tsx';
import { generatedWidgets, IWidget, VoidFunction } from './constants.ts';
import WidgetItem from './components/WidgetItem.tsx';

import { DndContext, closestCenter, MeasuringStrategy } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from '@dnd-kit/sortable';

function App() {
  // States
  const [widgets, setWidgets] = useState<IWidget[]>(generatedWidgets);
  const [draftWidgets, setDraftWidgets] = useState<IWidget[]>(generatedWidgets);
  const [enabledEditMode, setEnabledEditMode] = useState<boolean>(false);

  // Memo Functions
  const calculatedWidgets: IWidget[] = useMemo(() => {
    return enabledEditMode ? draftWidgets : widgets;
  }, [draftWidgets, enabledEditMode, widgets]);

  // Callback Functions
  const onClickEnableEditMode: VoidFunction = useCallback(() => {
    setEnabledEditMode(true);
  }, [setEnabledEditMode]);

  const onClickCancelEditMode: VoidFunction = useCallback(() => {
    setDraftWidgets(widgets);
    setEnabledEditMode(false);
  }, [widgets]);

  const onClickSaveEditMode: VoidFunction = useCallback(() => {
    setWidgets(draftWidgets);
    alert('saved');
    setEnabledEditMode(false);
  }, [draftWidgets]);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = draftWidgets.findIndex((i) => i.id === active.id);
      const newIndex = draftWidgets.findIndex((i) => i.id === over.id);
      setDraftWidgets(arrayMove(draftWidgets, oldIndex, newIndex));
    }
  };

  return (
    <Container fixed sx={{ padding: 2 }}>
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        measuring={{ droppable: { strategy: MeasuringStrategy.Always } }}
      >
        <SortableContext
          items={calculatedWidgets}
          strategy={rectSortingStrategy}
        >
          <LayoutEditButtonArea
            enabledEditMode={enabledEditMode}
            onClickEnableEditMode={onClickEnableEditMode}
            onClickCancelEditMode={onClickCancelEditMode}
            onClickSaveEditMode={onClickSaveEditMode}
          />
          <Box>
            <Grid container spacing={2}>
              {calculatedWidgets.map((widget: IWidget) => (
                <WidgetItem
                  key={widget.id}
                  widget={widget}
                  enabledEditMode={enabledEditMode}
                />
              ))}
            </Grid>
          </Box>
        </SortableContext>
      </DndContext>
    </Container>
  );
}

export default App;
