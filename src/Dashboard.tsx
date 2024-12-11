import { useSnackbar } from 'notistack';
import { useCallback, useMemo, useState } from 'react';
import { defaultWidgets, IWidget, VoidFunction } from './constants.ts';
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
} from '@dnd-kit/sortable';
import { Box, Container, Grid2 as Grid } from '@mui/material';
import { closestCenter, DndContext, MeasuringStrategy } from '@dnd-kit/core';
import LayoutEditButtonArea from './components/LayoutEditButtonArea.tsx';
import WidgetItem from './components/WidgetItem.tsx';

const Dashboard = () => {
  const { enqueueSnackbar } = useSnackbar();
  // States
  const [widgets, setWidgets] = useState<IWidget[]>(defaultWidgets);
  const [draftWidgets, setDraftWidgets] = useState<IWidget[]>(defaultWidgets);
  const [enabledEditMode, setEnabledEditMode] = useState<boolean>(false);

  // Memo Functions
  const calculatedWidgets: IWidget[] = useMemo(() => {
    return enabledEditMode ? draftWidgets : widgets.filter((i) => i.visible);
  }, [draftWidgets, enabledEditMode, widgets]);

  const leftCalculatedWidgets = useMemo(() => {
    return calculatedWidgets.filter((i) => i.group === 'left');
  }, [calculatedWidgets]);
  const rightCalculatedWidgets = useMemo(() => {
    return calculatedWidgets.filter((i) => i.group === 'right');
  }, [calculatedWidgets]);
  const bottomCalculatedWidgets = useMemo(() => {
    return calculatedWidgets.filter((i) => i.group === 'bottom');
  }, [calculatedWidgets]);

  // Callback Functions
  const onClickEnableEditMode: VoidFunction = useCallback(() => {
    setEnabledEditMode(true);
  }, [setEnabledEditMode]);

  const onClickCancelEditMode: VoidFunction = useCallback(() => {
    setDraftWidgets(widgets);
    setEnabledEditMode(false);
    enqueueSnackbar('Canceled', { variant: 'default' });
  }, [enqueueSnackbar, widgets]);

  const onClickSaveEditMode: VoidFunction = useCallback(() => {
    setWidgets(draftWidgets.filter((i) => i.visible));
    setEnabledEditMode(false);
    enqueueSnackbar('Successfully', { variant: 'success' });
  }, [draftWidgets, enqueueSnackbar]);

  const handleDragEnd = useCallback(
    (event: any) => {
      const { active, over } = event;

      if (active.id !== over.id) {
        const oldIndex = draftWidgets.findIndex((i) => i.id === active.id);
        const newIndex = draftWidgets.findIndex((i) => i.id === over.id);

        const activeWidget = draftWidgets[oldIndex];
        const overWidget = draftWidgets[newIndex];

        // Check if we are dragging between Left and Bottom groups
        if (
          (activeWidget.group === 'left' && overWidget.group === 'bottom') ||
          (activeWidget.group === 'bottom' && overWidget.group === 'left')
        ) {
          // Allow dragging between left and bottom
          const updatedWidgets = [...draftWidgets];
          updatedWidgets[oldIndex] = {
            ...activeWidget,
            group: overWidget.group,
          };
          setDraftWidgets(updatedWidgets);
        } else if (
          activeWidget.group !== 'right' &&
          overWidget.group !== 'right'
        ) {
          // If not dragging within the 'right' group, just reorder within the same group
          setDraftWidgets(arrayMove(draftWidgets, oldIndex, newIndex));
        } else if (
          activeWidget.group === 'right' &&
          overWidget.group === 'right'
        ) {
          // In right group
          setDraftWidgets(arrayMove(draftWidgets, oldIndex, newIndex));
        }
        // If we're trying to move a widget into the 'right' group, do nothing
        else {
          // Prevent adding/removing items from 'right'
          alert('Cannot move widget to "Right" group!');
        }
      }
    },
    [draftWidgets]
  );

  const handleToggleVisible = useCallback((id: number) => {
    setDraftWidgets((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, visible: !item.visible } : item
      )
    );
  }, []);

  return (
    <Container fixed sx={{ padding: 2 }}>
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        measuring={{ droppable: { strategy: MeasuringStrategy.Always } }}
      >
        <LayoutEditButtonArea
          enabledEditMode={enabledEditMode}
          onClickEnableEditMode={onClickEnableEditMode}
          onClickCancelEditMode={onClickCancelEditMode}
          onClickSaveEditMode={onClickSaveEditMode}
        />
        <Box>
          <Grid container spacing={2}>
            <Grid size={8}>
              <SortableContext
                items={leftCalculatedWidgets.concat(bottomCalculatedWidgets)} // Left and Bottom combined for dragging
                strategy={rectSortingStrategy}
              >
                <Grid container spacing={2}>
                  {leftCalculatedWidgets.map((widget: IWidget) => (
                    <WidgetItem
                      key={widget.id}
                      widget={widget}
                      enabledEditMode={enabledEditMode}
                      handleToggleVisible={handleToggleVisible}
                    />
                  ))}
                </Grid>
              </SortableContext>
            </Grid>
            <Grid size={4}>
              <SortableContext
                items={rightCalculatedWidgets}
                strategy={rectSortingStrategy} // Only sorting within the Right group
              >
                <Grid container spacing={2}>
                  {rightCalculatedWidgets.map((widget: IWidget) => (
                    <WidgetItem
                      key={widget.id}
                      widget={widget}
                      enabledEditMode={enabledEditMode}
                      handleToggleVisible={handleToggleVisible}
                    />
                  ))}
                </Grid>
              </SortableContext>
            </Grid>
          </Grid>
          <SortableContext
            items={bottomCalculatedWidgets}
            strategy={rectSortingStrategy}
          >
            <Grid container spacing={2} marginTop={2}>
              {bottomCalculatedWidgets.map((widget: IWidget) => (
                <WidgetItem
                  key={widget.id}
                  widget={widget}
                  enabledEditMode={enabledEditMode}
                  handleToggleVisible={handleToggleVisible}
                />
              ))}
            </Grid>
          </SortableContext>
        </Box>
      </DndContext>
    </Container>
  );
};

export default Dashboard;
