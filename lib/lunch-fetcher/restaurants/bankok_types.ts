export interface Ingestion {
  price: number;
  type: string;
}

export interface Item {
  id: string;
  name: string;
  preview: string;
  info: string;
  description: string;
  outOfStock: boolean;
  sortOrder: number;
  category: number;
  additionalItems: any[];
  ingestions: Ingestion[];
  itemCategory: string;
}

export interface ItemCategory {
  id: string;
  name: string;
  preview?: any;
  description: string;
  category: number;
}

export interface RestaurantData {
  items: Item[];
  itemCategories: ItemCategory[];
}
