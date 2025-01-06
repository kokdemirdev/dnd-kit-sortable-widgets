import { UniqueIdentifier } from "@dnd-kit/core";

export type WidgetGroupId = "left" | "right" | "bottom";

export interface IWidget {
  id: UniqueIdentifier;
  size: number;
  visible: boolean;
  title: string;
  group: WidgetGroupId;
  lockVisible: boolean;
  lockDragging: boolean;
  row: number;
}
