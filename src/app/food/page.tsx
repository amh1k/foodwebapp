import { getAllVendors } from "@/api/vendor";
import { FoodFilters } from "@/modules/food/hooks/use-food-filters";
import FoodOrder from "@/modules/food/ui/views/food-order-view";

import {
  HydrationBoundary,
  dehydrate,
  QueryClient,
} from "@tanstack/react-query";
import { Suspense } from "react";

const defaultFilters: FoodFilters = {
  search: "",
  tags: [],
  category: "",
  minRating: "",
};
export default async function Page() {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["vendors"],
    queryFn: async ({ pageParam = 1 }) => {
      return getAllVendors({ pageParam, filters: { ...defaultFilters } });
    },
    initialPageParam: undefined,
    //getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<div>loading vendors...</div>}>
        <FoodOrder />
      </Suspense>
    </HydrationBoundary>
  );
}
