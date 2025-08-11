import { getVendorByName, getVendorsByNameResponse } from "@/api/vendor";
import { useQuery } from "@tanstack/react-query";
interface Props {
  vendorName: string;
}
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";

// Define interfaces for TypeScript
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

export const UpperVendorViewPage = ({ vendorName }: Props) => {
  const { data, error, isLoading } = useQuery<
    getVendorsByNameResponse,
    Error,
    getVendorsByNameResponse,
    [string] // query key type
  >({
    queryKey: [`${vendorName}`],
    queryFn: async () => {
      return getVendorByName({ vendorName: vendorName });
    },
  });
  const vendor = vendorData;
  const avgRating = (
    vendor.reviews.reduce((sum, r) => sum + r.stars, 0) / vendor.reviews.length
  ).toFixed(1);
  const reviewCount = vendor.reviews.length;
  //   if (error) {
  //     return <div>Error Loading MenuItems</div>;
  //   }
  return (
    <div className="relative h-[400px] w-full">
      <img
        src={vendor.coverImage}
        alt={vendor.name}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-8">
        <h1 className="text-4xl font-bold text-white">{vendor.name}</h1>
        <p className="text-lg text-gray-200">{vendor.address}</p>
        <div className="flex items-center mt-2">
          <div className="flex">
            {[...Array(Math.round(Number(avgRating)))].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-gray-300 text-gray-300" />
            ))}
          </div>
          <span className="ml-2 text-white text-lg">
            {avgRating} ({reviewCount} reviews)
          </span>
        </div>
      </div>
    </div>
  );
};
