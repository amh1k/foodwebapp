"use client";
import {
  getMenuItemsByVendorId,
  getMenuItemsByVendorIdResponse,
} from "@/api/menuItems";
import { useFoodFilters } from "@/modules/food/hooks/use-food-filters";
import { useQuery } from "@tanstack/react-query";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
interface Review {
  id: number;
  customerName: string;
  stars: number;
  comment: string;
}

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
}

interface Vendor {
  id: number;
  name: string;
  address: string;
  coverImage: string;
  categories: string[];
  reviews: Review[];
  menuItems: MenuItem[];
}

// Dummy Data
const vendorData: Vendor = {
  id: 1,
  name: "Cafe Delight",
  address: "123 Coffee Street, Food City",
  coverImage: "https://source.unsplash.com/1600x500/?restaurant,food",
  categories: ["Coffee", "Ice Cream", "Pastries"],
  reviews: [
    { id: 1, customerName: "Alice", stars: 5, comment: "Amazing coffee!" },
    { id: 2, customerName: "Bob", stars: 4, comment: "Great desserts" },
    {
      id: 3,
      customerName: "Charlie",
      stars: 5,
      comment: "Best latte in town!",
    },
  ],
  menuItems: [
    {
      id: 1,
      name: "Latte",
      description: "Smooth espresso with steamed milk",
      price: 4.5,
      imageUrl: "https://source.unsplash.com/400x300/?latte",
      category: "Coffee",
    },
    {
      id: 2,
      name: "Cappuccino",
      description: "Bold espresso with foamy milk",
      price: 4.0,
      imageUrl: "https://source.unsplash.com/400x300/?cappuccino",
      category: "Coffee",
    },
    {
      id: 3,
      name: "Vanilla Ice Cream",
      description: "Creamy homemade vanilla ice cream",
      price: 3.0,
      imageUrl: "https://source.unsplash.com/400x300/?icecream",
      category: "Ice Cream",
    },
    {
      id: 4,
      name: "Chocolate Ice Cream",
      description: "Rich chocolate flavor",
      price: 3.2,
      imageUrl: "https://source.unsplash.com/400x300/?chocolate-icecream",
      category: "Ice Cream",
    },
    {
      id: 5,
      name: "Croissant",
      description: "Flaky buttery French pastry",
      price: 2.5,
      imageUrl: "https://source.unsplash.com/400x300/?croissant",
      category: "Pastries",
    },
  ],
};

interface Props {
  vendorName: string;
}
export const MenuItemsListView = async ({ vendorName }: Props) => {
  const [filters, setFilters] = useFoodFilters();
  const { data, error, isLoading } = useQuery<
    getMenuItemsByVendorIdResponse,
    Error,
    getMenuItemsByVendorIdResponse,
    [string, typeof filters] // query key typ
  >({
    queryKey: ["MenuItems", filters],
    queryFn: async () => {
      return getMenuItemsByVendorId({ id: vendorName });
    },
  });
  const vendor = vendorData;
  const avgRating = (
    vendor.reviews.reduce((sum, r) => sum + r.stars, 0) / vendor.reviews.length
  ).toFixed(1);
  const reviewCount = vendor.reviews.length;
  return (
    <section className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">Menu</h2>
      <Tabs defaultValue={vendor.categories[0]} className="w-full">
        <TabsList className="flex justify-start gap-2 bg-gray-200 p-2 rounded-lg">
          {vendor.categories.map((cat) => (
            <TabsTrigger
              key={cat}
              value={cat}
              className="px-4 py-2 text-gray-700 hover:bg-gray-300 rounded-md transition data-[state=active]:bg-gray-300"
            >
              {cat}
            </TabsTrigger>
          ))}
        </TabsList>

        {vendor.categories.map((cat) => (
          <TabsContent key={cat} value={cat} className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {vendor.menuItems
                .filter((item) => item.category === cat)
                .map((item) => (
                  <Card
                    key={item.id}
                    className="overflow-hidden bg-white shadow-md hover:shadow-lg transition-shadow"
                  >
                    <div className="relative h-48 w-full">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader className="p-4">
                      <CardTitle className="text-xl text-gray-800 truncate">
                        {item.name}
                      </CardTitle>
                      <p className="text-sm text-gray-500 line-clamp-2">
                        {item.description}
                      </p>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="font-semibold text-gray-800">
                        ${item.price.toFixed(2)}
                      </p>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
};
