interface Restaurant {
  name: string;
  url: string;
  days: RestaurantDayMenu[];
}

type WeekDay =
  | "Söndag"
  | "Måndag"
  | "Tisdag"
  | "Onsdag"
  | "Torsdag"
  | "Freday"
  | "Lördag";

interface RestaurantDayMenu {
  wday: WeekDay;
  items: FoodItem[];
}

interface FoodItem {
  name: string;
  title?: string;
}
