import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid2 as Grid,
} from '@mui/material';
import CardActionContent from './CardActionContent.tsx';
import { IWidget } from '../constants.ts';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export interface WidgetItemProps {
  widget: IWidget;
  enabledEditMode: boolean;
}

const WidgetItem = ({ widget, enabledEditMode }: WidgetItemProps) => {
  const { setNodeRef, transform, transition } = useSortable({ id: widget.id });

  const style: any = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Grid size={12}>
      <Box ref={setNodeRef} style={style}>
        <Card>
          <CardHeader
            title={widget.title}
            action={
              <CardActionContent
                enabledEditMode={enabledEditMode}
                widget={widget}
              />
            }
          />
          <CardContent>
            {/* Kartın içeriği buraya gelecek */}
            İçerik burada.
          </CardContent>
        </Card>
      </Box>
    </Grid>
  );
};

export default WidgetItem;
