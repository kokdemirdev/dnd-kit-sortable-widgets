export type VoidFunction = () => void;

export interface IWidget {
  id: number;
  size: number;
  visible: boolean;
  title: string;
  group: "left" | "right" | "bottom";
}

export const defaultWidgets: IWidget[] = [
  {
    id: 1,
    size: 8,
    visible: true,
    title: "Teslim Edilmeyi Bekleyen Siparişler",
    group: "left"
  },
  {
    id: 2,
    size: 4,
    visible: true,
    title: "Duyurularım",
    group: "right"
  },
  {
    id: 3,
    size: 8,
    visible: true,
    title: "Haftalık Hak Ediş Tablosu",
    group: "left"
  },
  {
    id: 4,
    size: 4,
    visible: true,
    title: "Satış Performansı",
    group: "right"
  },
  {
    id: 5,
    size: 12,
    visible: true,
    title: "Ürün Listesi Tablosu",
    group: "bottom"
  },
  {
    id: 6,
    size: 12,
    visible: true,
    title: "Kritik Stok Durum Tablosu",
    group: "bottom"
  },
  {
    id: 7,
    size: 12,
    visible: true,
    title: "İade Edilen Sipariş Tablosu",
    group: "bottom"
  },
  {
    id: 8,
    size: 12,
    visible: true,
    title: "Ürün Tablosu",
    group: "bottom"
  },
  {
    id: 9,
    size: 12,
    visible: true,
    title: "Haftanın Görüntülenen Ürünleri",
    group: "bottom"
  },
];

export const generatedWidgets: IWidget[] = Array.from({ length: 20 }).map(
  (_, index) => {
    return {
      id: index + 1,
      size: index % 2 === 0 ? 8 : 4,
      visible: true,
      title: `${index + 1}. Widget Title`,
    };
  }
);
