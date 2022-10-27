import { TopLink } from "../Partials";
import { RestaurantsList } from "../RestaurantsList";
import { fetchAllCached } from "../../lib/lunch-fetcher/fetch-restaurants";

export default async function WeekPage() {
  const restaurants = await fetchAllCached();
  return (
    <>
      <TopLink showToday={false} />
      <RestaurantsList showToday={false} restaurants={restaurants} />
    </>
  );
}
