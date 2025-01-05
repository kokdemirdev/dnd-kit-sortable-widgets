import { Card, CardHeader, IconButton, Stack } from '@mui/material';
import { IWidget } from '../constants.ts';
import { Visibility, VisibilityOff, DragIndicator } from '@mui/icons-material';
import { useDashboardLayout } from '../DashboardLayoutContext.tsx';

interface IProps {
  widget: IWidget;
}

export default function WidgetItem({ widget }: IProps) {
  const { isEditing, toggleVisibilityItemById } = useDashboardLayout();

  return (
    <Card>
      <CardHeader
        title={widget.title}
        action={
          isEditing ? (
            <Stack direction="row">
              {!widget.lockVisible && (
                <IconButton onClick={() => toggleVisibilityItemById(widget.id)}>
                  {widget.visible ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              )}
              {!widget.lockDragging && (
                <IconButton sx={{ cursor: 'move' }}>
                  <DragIndicator />
                </IconButton>
              )}
            </Stack>
          ) : (
            <></>
          )
        }
      />
    </Card>
  );
}
