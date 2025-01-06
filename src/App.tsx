import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useState } from "react";
import { IWidget, WidgetGroupId } from "./types.ts";
import { Container, Grid2 } from "@mui/material";
import { WidgetContainer } from "./components/WidgetContainer.tsx";
import { defaultWidgets } from "./data.ts";
import { createPortal } from "react-dom";
import { Widget } from "./components/Widget.tsx";
import { hasDraggableData } from "./utils.ts";
import { arrayMove } from "@dnd-kit/sortable";

function App() {
  const [widgets, setWidgets] = useState<IWidget[]>(defaultWidgets);
  const [activeWidget, setActiveWidget] = useState<IWidget | null>(null);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const onDragStart = (event: DragStartEvent) => {
    if (!hasDraggableData(event.active)) return;
    const data = event.active.data.current;

    if (data?.type === "Widget") {
      setActiveWidget(data.widget);
      return;
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    setActiveWidget(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (!hasDraggableData(active)) return;

    // const activeData = active.data.current;

    if (activeId === overId) return;
  };
  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    if (!hasDraggableData(active) || !hasDraggableData(over)) return;

    const activeData = active.data.current;
    const overData = over.data.current;

    const isActiveAWidget = activeData?.type === "Widget";
    const isOverAWidget = overData?.type === "Widget";

    if (!isActiveAWidget) return;

    // İkisinden biri true dönerse yasaklı, ikisi birden yada hiç biri right değilse geçecek.
    if (
      [
        activeData?.widget.group === "right",
        overData?.widget.group === "right",
      ].filter((i) => i).length === 1
    )
      return;

    // Im dropping a Widget over another Widget
    if (isActiveAWidget && isOverAWidget) {
      setWidgets((widgets) => {
        const activeIndex = widgets.findIndex((t) => t.id === activeId);
        const overIndex = widgets.findIndex((t) => t.id === overId);
        const activeWidget = widgets[activeIndex];
        const overWidget = widgets[overIndex];
        if (
          activeWidget &&
          overWidget &&
          activeWidget.group !== overWidget.group
        ) {
          activeWidget.group = overWidget.group;
          return arrayMove(widgets, activeIndex, overIndex - 1);
        }

        return arrayMove(widgets, activeIndex, overIndex);
      });
    }

    const isOverAColumn = overData?.type === "Column";

    // Im dropping a Widget over a group
    if (isActiveAWidget && isOverAColumn) {
      setWidgets((widgets) => {
        const activeIndex = widgets.findIndex((t) => t.id === activeId);
        const activeTask = widgets[activeIndex];
        if (activeTask) {
          activeTask.group = overId as WidgetGroupId;
          return arrayMove(widgets, activeIndex, activeIndex);
        }
        return widgets;
      });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
    >
      <Container maxWidth="lg">
        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 12, sm: 8 }}>
            <WidgetContainer
              widgets={widgets.filter((widget) => widget.group === "left")}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <WidgetContainer
              widgets={widgets.filter((widget) => widget.group === "right")}
            />
          </Grid2>
        </Grid2>
        <WidgetContainer
          widgets={widgets.filter((widget) => widget.group === "bottom")}
          boxProps={{ marginTop: 2 }}
        />
      </Container>
      {"document" in window &&
        createPortal(
          <DragOverlay>
            {activeWidget && <Widget widget={activeWidget} isOverlay />}
          </DragOverlay>,
          document.body,
        )}
    </DndContext>
  );
}

export default App;
