import { UniqueIdentifier } from '@dnd-kit/core';

export type VoidFunction = () => void;

export interface IWidget {
  id: number;
  size: number;
  visible: boolean;
  title: string;
  group: 1 | 2;
  lockVisible: boolean;
  lockDragging: boolean;
}

export interface IGroupedWidget {
  left: IWidget[];
  right: IWidget[];
  bottom: IWidget[];
}

export interface IGroupedUniqueWidget {
  left: UniqueIdentifier[];
  right: UniqueIdentifier[];
  bottom: UniqueIdentifier[];
}

export const defaultWidgets: IWidget[] = [
  {
    id: 1,
    size: 8,
    visible: true,
    title: 'Teslim Edilmeyi Bekleyen Siparişler',
    group: 1,
    lockVisible: true,
    lockDragging: true,
  },
  {
    id: 2,
    size: 4,
    visible: true,
    title: 'Duyurularım',
    group: 2,
    lockVisible: true,
    lockDragging: false,
  },
  {
    id: 3,
    size: 8,
    visible: true,
    title: 'Haftalık Hak Ediş Tablosu',
    group: 1,
    lockVisible: false,
    lockDragging: false,
  },
  {
    id: 4,
    size: 4,
    visible: true,
    title: 'Satış Performansı',
    group: 2,
    lockVisible: true,
    lockDragging: false,
  },
  {
    id: 5,
    size: 12,
    visible: true,
    title: 'Ürün Listesi Tablosu',
    group: 1,
    lockVisible: false,
    lockDragging: false,
  },
  {
    id: 6,
    size: 12,
    visible: true,
    title: 'Kritik Stok Durum Tablosu',
    group: 1,
    lockVisible: false,
    lockDragging: false,
  },
  {
    id: 7,
    size: 12,
    visible: true,
    title: 'İade Edilen Sipariş Tablosu',
    group: 1,
    lockVisible: false,
    lockDragging: false,
  },
  {
    id: 8,
    size: 12,
    visible: true,
    title: 'Ürün Tablosu',
    group: 1,
    lockVisible: false,
    lockDragging: false,
  },
  {
    id: 9,
    size: 12,
    visible: true,
    title: 'Haftanın Görüntülenen Ürünleri',
    group: 1,
    lockVisible: false,
    lockDragging: false,
  },
];

export const wait = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const calculateGroupedWidgets = (widgets: IWidget[]): IGroupedWidget => {
  return {
    left: widgets.filter((i) => i.group === 1).slice(0, 3),
    right: widgets.filter((i) => i.group === 2),
    bottom: widgets.filter((i) => i.group === 1).slice(3),
  };
};

export const toggleVisibility = (widgets: IWidget[], widgetId: number) => {
  return widgets.map((item) => {
    return item.id === widgetId
      ? { ...item, visible: !item.visible }
      : item;
  });
}