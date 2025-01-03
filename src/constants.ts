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
