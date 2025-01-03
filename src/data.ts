export type UniqueIdentifier = string | number;

export interface ITransformedWidget {
  id: string; // BE verisi ile bu id üzerinden eşleşiyor.
  visible: boolean; // Görünürlük verisi
  title: string; // Pratikte bir işe yaramıyor, sadece geliştirme yaparken IDleri akılda tutmamak için bu veri eklendi.
  group: number; // Ekranda ki grubu
  order: number; // Sıralaması
  lockVisible: boolean; // Görünürlük ayarının yapılıp yapılmayacağı
  lockDragging: boolean; // Sıralama ayarının yapılıp yapılmayacağı
  checkStaticPermission: boolean; // Statik olarak görünüm mantığı eklenmiş koda. Kontrol edilmeli mi verisi.
  staticPermission: boolean; // Statik yetkinin değeri
  openContainerTooltip: boolean;
  row: number;
}

export const defaultWidgets: ITransformedWidget[] = [
  {
    id: '1',
    visible: true,
    title: 'Ürün Listesi Tablosu',
    group: 1,
    order: 1,
    lockVisible: false,
    lockDragging: false,
    checkStaticPermission: true,
    staticPermission: false,
    openContainerTooltip: false,
    row: 10,
  },
  {
    id: '2',
    visible: true,
    title: 'Kritik Stok Durum Tablosu',
    group: 1,
    order: 2,
    lockVisible: false,
    lockDragging: false,
    checkStaticPermission: true,
    staticPermission: false,
    openContainerTooltip: false,
    row: 5,
  },
  {
    id: '3',
    visible: true,
    title: 'İade Edilen Sipariş Tablosu',
    group: 1,
    order: 3,
    lockVisible: false,
    lockDragging: false,
    checkStaticPermission: true,
    staticPermission: false,
    openContainerTooltip: false,
    row: 10,
  },
  {
    id: '4',
    visible: true,
    title: 'Haftanın Satan Ürünleri',
    group: 1,
    order: 4,
    lockVisible: false,
    lockDragging: false,
    checkStaticPermission: true,
    staticPermission: false,
    openContainerTooltip: false,
    row: 10,
  },
  {
    id: '5',
    visible: true,
    title: 'Haftanın İade Edilen Ürünleri',
    group: 1,
    order: 5,
    lockVisible: false,
    lockDragging: false,
    checkStaticPermission: true,
    staticPermission: false,
    openContainerTooltip: false,
    row: 10,
  },
  {
    id: '6',
    visible: true,
    title: 'Duyurularım',
    group: 2,
    order: 1,
    lockVisible: true,
    lockDragging: false,
    checkStaticPermission: false,
    staticPermission: false,
    openContainerTooltip: false,
    row: 10,
  },
  {
    id: '7',
    visible: true,
    title: 'Satış Performansı',
    group: 2,
    order: 2,
    lockVisible: true,
    lockDragging: false,
    checkStaticPermission: true,
    staticPermission: false,
    openContainerTooltip: false,
    row: 10,
  },
];
