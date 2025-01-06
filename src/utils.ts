import { Active, DataRef, Over } from "@dnd-kit/core";

export const wait = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

type DraggableData = "widget";

export const hasDraggableData = <T extends Active | Over>(
  entry: T | null | undefined,
): entry is T & { data: DataRef<DraggableData> } =>
  entry ? entry.data.current?.type === "Widget" : false;

export const randomNumber = (min: number = 0, max: number = 5) => {
  return Math.floor(Math.random() * (max - min)) + min;
};
