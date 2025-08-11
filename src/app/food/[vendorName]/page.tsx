import { getMenuItemsByVendorId } from "@/api/menuItems";
import { loadFoodFilters } from "@/modules/food/hooks/use-food-filters-server";
import { MenuItemsListView } from "@/modules/vendors/ui/views/menu-items-list-view";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Suspense } from "react";

interface Props {
  params: Promise<{ vendorName: string }>;
}

const page = async ({ params }: Props) => {
  const { vendorName } = await params;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["MenuItems"],
    queryFn: async () => {
      return getMenuItemsByVendorId({ id: vendorName });
    },
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<div>Loading...</div>}>
        <MenuItemsListView vendorName={vendorName} />
      </Suspense>
    </HydrationBoundary>
  );
};
export default page;
