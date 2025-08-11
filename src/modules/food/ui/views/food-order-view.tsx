"use client";

import { Card, CardContent } from "@/components/ui/card";
import { SearchInput } from "../components/search-input";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { getAllVendorResponse, getAllVendors } from "@/api/vendor";
import { useFoodFilters } from "../../hooks/use-food-filters";

interface Restaurant {
  id: number;
  name: string;
  category: string;
  avgRating: number;
  priceLevel: number;
  reviewCount: number;
  imageUrl: string;
}

const mockRestaurants: Restaurant[] = [
  {
    id: 1,
    name: "Pizza Palace",
    category: "Italian",
    avgRating: 4.5,
    priceLevel: 2,
    reviewCount: 120,
    imageUrl:
      "https://images.unsplash.com/photo-1513106580091-1d82408b8f6a?w=600",
  },
  {
    id: 2,
    name: "Burger Town",
    category: "Fast Food",
    avgRating: 4.2,
    priceLevel: 1,
    reviewCount: 85,
    imageUrl:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600",
  },
  {
    id: 3,
    name: "Curry Corner",
    category: "Indian",
    avgRating: 4.7,
    priceLevel: 3,
    reviewCount: 150,
    imageUrl:
      "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600",
  },
  {
    id: 4,
    name: "Sushi Spot",
    category: "Japanese",
    avgRating: 4.8,
    priceLevel: 4,
    reviewCount: 200,
    imageUrl:
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600",
  },
];

export default function FoodOrder() {
  const [filters, setFilters] = useFoodFilters();
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useSuspenseInfiniteQuery<
      getAllVendorResponse,
      Error, // error type
      getAllVendorResponse,
      [string, typeof filters], // query key type
      number | undefined | null // pageParam type
    >({
      queryKey: ["vendors", filters],
      queryFn: async ({ pageParam }) => {
        return getAllVendors({ pageParam, filters: { ...filters } });
      },
      initialPageParam: undefined,
      getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    });

  return (
    <div className="min-h-screen p-6 ">
      <div className="max-w-[1400px] mx-auto">
        <SearchInput />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockRestaurants.map((restaurant) => (
            <Card
              key={restaurant.id}
              className="bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 rounded-2xl overflow-hidden transform hover:-translate-y-1 "
            >
              <div className="relative">
                <img
                  src={restaurant.imageUrl}
                  alt={restaurant.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded-bl-lg">
                  {restaurant.category}
                </div>
              </div>
              <CardContent className="p-6 ">
                <h2 className="text-2xl font-bold text-orange-900 mb-3 truncate">
                  {restaurant.name}
                </h2>
                <div className="flex items-center mb-3">
                  <span className="text-yellow-500 text-lg font-semibold">
                    {restaurant.avgRating}
                  </span>
                  <span className="text-yellow-500 ml-1">★</span>
                  <span className="text-gray-500 text-sm ml-2">
                    ({restaurant.reviewCount} reviews)
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Price:{" "}
                  <span className="text-green-600 font-medium">
                    {"$".repeat(restaurant.priceLevel)}
                  </span>
                </p>
                <button className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors duration-200">
                  View Menu
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
