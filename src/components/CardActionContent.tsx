import { Box, IconButton } from '@mui/material';
import { DragIndicator, Visibility, VisibilityOff } from '@mui/icons-material';
import { useSortable } from '@dnd-kit/sortable';
import { IWidget } from '../constants.ts';

const ActionContent = ({
  enabledEditMode,
  widget,
}: {
  enabledEditMode: boolean;
  widget: IWidget;
}) => {
  const { attributes, listeners } = useSortable({ id: widget.id });

  return enabledEditMode ? (
    <Box display="flex" alignItems="center">
      <IconButton aria-label="expand">
        {widget.visible ? <Visibility /> : <VisibilityOff />}
      </IconButton>
      {/* Drag Button */}
      <IconButton
        aria-label="drag"
        style={{ cursor: 'move' }}
        {...attributes}
        {...listeners}
      >
        <DragIndicator />
      </IconButton>
      {/* Show/Hide Button */}
    </Box>
  ) : null;
};

export default ActionContent;
