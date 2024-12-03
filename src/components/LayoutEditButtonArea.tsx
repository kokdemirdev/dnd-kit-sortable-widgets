import { Box, Button, Stack } from '@mui/material';
import { Edit, HighlightOff } from '@mui/icons-material';
import { VoidFunction } from '../constants.ts';

export interface LayoutEditButtonAreaProps {
  enabledEditMode: boolean;
  onClickEnableEditMode: VoidFunction;
  onClickSaveEditMode: VoidFunction;
  onClickCancelEditMode: VoidFunction;
}

const LayoutEditButtonArea = ({
  enabledEditMode,
  onClickEnableEditMode,
  onClickCancelEditMode,
  onClickSaveEditMode,
}: LayoutEditButtonAreaProps) => {
  return (
    <Box>
      {!enabledEditMode && (
        <Stack direction="row">
          <Button startIcon={<Edit />} onClick={onClickEnableEditMode}>
            Paneli Düzenle
          </Button>
        </Stack>
      )}
      {enabledEditMode && (
        <Stack direction="row">
          <Button startIcon={<Edit />} onClick={onClickSaveEditMode}>
            Kaydet ve Çık
          </Button>
          <Button startIcon={<HighlightOff />} onClick={onClickCancelEditMode}>
            İptal
          </Button>
        </Stack>
      )}
    </Box>
  );
};

export default LayoutEditButtonArea;
