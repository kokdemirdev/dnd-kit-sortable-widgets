import { IWidget } from "../types.ts";
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  styled,
} from "@mui/material";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DragIndicator } from "@mui/icons-material";

interface StyledCardProps {
  isOverlay?: boolean;
  isDragging?: boolean;
}

const StyledCard = styled(Card)<StyledCardProps>(
  ({ theme, isOverlay, isDragging }) => ({
    // Eğer isDragging varsa
    ...(isDragging && {
      ring: "2px solid",
      opacity: 0.3, // Opaklık değişikliği
    }),

    // Eğer isOverlay varsa
    ...(isOverlay && {
      ring: "2px solid",
      ringColor: theme.palette.primary.main, // Özel ring rengi
    }),

    // Kartın temel stilleri
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    transition: "all 0.3s ease", // Geçiş animasyonu
  }),
);

type Props = {
  widget: IWidget;
  isOverlay?: boolean;
};

export const Widget = ({ widget, isOverlay }: Props) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: widget.id,
    data: {
      type: "Widget",
      widget,
    },
    attributes: {
      roleDescription: "Widget",
    },
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  return (
    <StyledCard
      ref={setNodeRef}
      isDragging={isDragging} // Bu prop yalnızca stilize edilmek için kullanılıyor
      isOverlay={isOverlay} // Bu prop da yalnızca stilize edilmek için kullanılıyor
      style={style} // Inline stil
    >
      <CardHeader
        title={widget.title}
        action={
          <IconButton {...attributes} {...listeners}>
            <DragIndicator />
          </IconButton>
        }
      />
      <CardContent>
        {Array.from({ length: widget.row }).map((_, index) => (
          <p>Lorem {index}</p>
        ))}
      </CardContent>
    </StyledCard>
  );
};
