export interface Restaurant {
  name: string;
  url: string;
  days: RestaurantDayMenu[];
}

export enum WeekDay {
  Sunday = "Söndag",
  Monday = "Måndag",
  Tuesday = "Tisdag",
  Wednesday = "Onsdag",
  Thursday = "Torsdag",
  Friday = "Fredag",
  Saturday = "Lördag"
}


export interface RestaurantDayMenu {
  wday: WeekDay;
  items: FoodItem[];
}

export interface FoodItem {
  name: string;
  title?: string;
}
