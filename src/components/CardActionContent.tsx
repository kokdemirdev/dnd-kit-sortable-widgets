import { Box, IconButton } from '@mui/material';
import { DragIndicator, Visibility, VisibilityOff } from '@mui/icons-material';
import { useSortable } from '@dnd-kit/sortable';
import { IWidget } from '../constants.ts';

const ActionContent = ({
  enabledEditMode,
  widget,
  handleToggleVisible,
}: {
  enabledEditMode: boolean;
  widget: IWidget;
  handleToggleVisible: (id: number) => void;
}) => {
  const { attributes, listeners } = useSortable({ id: widget.id });

  return enabledEditMode && (!widget.lockVisible || !widget.lockDragging) ? (
    <Box display="flex" alignItems="center">
      {/* Show/Hide Button */}
      {!widget.lockVisible && (
        <IconButton onClick={() => handleToggleVisible(widget.id)}>
          {widget.visible ? <Visibility /> : <VisibilityOff />}
        </IconButton>
      )}
      {/* Drag Button */}
      {!widget.lockDragging && (
        <IconButton
          aria-label="drag"
          style={{ cursor: 'move' }}
          {...attributes}
          {...listeners}
        >
          <DragIndicator />
        </IconButton>
      )}
    </Box>
  ) : null;
};

export default ActionContent;
