//import { FoodFilters } from "@/modules/food/hooks/use-food-filters";
import { FoodFilters } from "@/modules/food/hooks/use-food-filters";
import { VendorProfile } from "@/types";

interface getAllVendorProps {
  pageParam?: number | undefined | null;
  filters: FoodFilters;
}
export interface getAllVendorResponse {
  nextCursor: number | null;
  vendors: (VendorProfile & { avgRating: number })[];
}
interface getVendorByNameProps {
  vendorName: string;
}
export interface getVendorsByNameResponse {
  vendor: VendorProfile;
  ratingDistribution: Record<number, number>;
}

export const getAllVendors = async ({
  pageParam,
  filters,
}: getAllVendorProps): Promise<getAllVendorResponse> => {
  const res = await fetch(
    `/api/vendors/getAll?page=${pageParam}&limit={10}&cursor=${
      pageParam || ""
    }&search=${filters.search}&minRating=${filters.minRating}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

      credentials: "include",
    }
  );
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Error getting list of all vendors");
  } else {
    return res.json();
  }
};
export const getVendorByName = async ({
  vendorName,
}: getVendorByNameProps): Promise<getVendorsByNameResponse> => {
  const res = await fetch(`/api/vendors/getVendorByName/${vendorName}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },

    credentials: "include",
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Error getting list of all vendors");
  } else {
    return res.json();
  }
};
