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
    return calculatedWidgets.filter((i) => i.group === 1).slice(0, 2);
  }, [calculatedWidgets]);
  const rightCalculatedWidgets = useMemo(() => {
    return calculatedWidgets.filter((i) => i.group === 2);
  }, [calculatedWidgets]);
  const bottomCalculatedWidgets = useMemo(() => {
    return calculatedWidgets.filter((i) => i.group === 1).slice(2);
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

        // Grupları sayısal olarak değerlendiriyoruz
        const activeGroup = activeWidget.group;
        const overGroup = overWidget.group;

        if (activeGroup === overGroup) {
          // Aynı grup ise izin ver.
          setDraftWidgets(arrayMove(draftWidgets, oldIndex, newIndex));
        } else {
          // Farklı gruplar arasında taşımaya izin verme
          alert('Cannot move widgets between different groups!');
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
              <Grid container spacing={2}>
                <SortableContext
                  items={leftCalculatedWidgets.concat(bottomCalculatedWidgets)} // Left and Bottom combined for dragging
                  strategy={rectSortingStrategy}
                >
                  {leftCalculatedWidgets.map((widget: IWidget) => (
                    <WidgetItem
                      key={widget.id}
                      widget={widget}
                      enabledEditMode={enabledEditMode}
                      handleToggleVisible={handleToggleVisible}
                    />
                  ))}
                </SortableContext>
              </Grid>
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
