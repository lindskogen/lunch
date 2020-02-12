export interface Restaurant {
  name: string;
  url: string;
  days: RestaurantDayMenu[];
}

export type WeekDay =
  | "Söndag"
  | "Måndag"
  | "Tisdag"
  | "Onsdag"
  | "Torsdag"
  | "Fredag"
  | "Lördag";

export interface RestaurantDayMenu {
  wday: WeekDay;
  items: FoodItem[];
}

export interface FoodItem {
  name: string;
  title?: string;
}
