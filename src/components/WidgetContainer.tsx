import { SortableContext } from "@dnd-kit/sortable";
import { IWidget } from "../types.ts";
import { useMemo } from "react";
import { Widget } from "./Widget.tsx";
import { Box, BoxProps, Grid2 } from "@mui/material";

type Props = {
  widgets: IWidget[];
  boxProps?: BoxProps;
};
export const WidgetContainer = ({ widgets, boxProps }: Props) => {
  const widgetIds = useMemo(() => {
    return widgets.map((task) => task.id);
  }, [widgets]);
  return (
    <Box bgcolor="aliceblue" p={2} {...boxProps}>
      <SortableContext items={widgetIds}>
        <Grid2 container spacing={2}>
          {widgets.map((widget) => (
            <Grid2 key={widget.id} size={12}>
              <Widget widget={widget} />
            </Grid2>
          ))}
        </Grid2>
      </SortableContext>
    </Box>
  );
};
