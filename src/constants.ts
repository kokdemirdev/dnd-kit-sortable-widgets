export type VoidFunction = () => void;

export interface IWidget {
  id: number;
  size: number;
  visible: boolean;
}

export const defaultWidgets: IWidget[] = [
  {
    id: 1,
    size: 6,
    visible: true,
  },
  {
    id: 2,
    size: 6,
    visible: true,
  },
  {
    id: 3,
    size: 6,
    visible: true,
  },
  {
    id: 4,
    size: 6,
    visible: true,
  },
  {
    id: 5,
    size: 6,
    visible: true,
  },
];

export const generatedWidgets: IWidget[] = Array.from({ length: 20 }).map(
  (_, index) => {
    return {
      id: index + 1,
      size: index % 2 === 0 ? 8 : 4,
      visible: true,
    };
  }
);
