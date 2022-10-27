import { TopLink } from "./Partials";
import { RestaurantsList } from "./RestaurantsList";
import { fetchAllCached } from "../lib/lunch-fetcher/fetch-restaurants";

export default async function Page() {
  const restaurants = await fetchAllCached();
  return (
    <>
      <TopLink showToday />
      <RestaurantsList showToday restaurants={restaurants} />
    </>
  );
}
