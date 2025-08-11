"use client";

import { Input } from "@/components/ui/input";
import { useFoodFilters } from "../../hooks/use-food-filters";

import { useEffect, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export const SearchInput = () => {
  const [filters, setFilters] = useFoodFilters();
  const [searchValue, setSearchValue] = useState(filters.search);
  const [showFilters, setShowFilters] = useState(false);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setFilters({ search: searchValue });
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [searchValue, setFilters]);

  return (
    <>
      <h1 className="text-4xl font-extrabold  mb-6 text-center">
        Find Your Favorite Restaurant
      </h1>
      {/* Enhanced typography and centered title */}

      <div className="grid grid-cols-1 md:grid-cols-7 gap-4 mb-8">
        <Input
          placeholder="Search restaurants, cuisines and dishes"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="md:col-span-6 bg-white border-amber-500 focus:border-primary rounded-lg shadow-sm transition-all duration-300 p-6"
        />

        <div className="md:col-span-1 flex ">
          <button
            onClick={() => setShowFilters(true)}
            className="flex items-center gap-2 px-4 py-3 bg-orange-100 hover:bg-orange-200 rounded-lg border border-orange-300 shadow-sm transition"
          >
            <SlidersHorizontal className="w-5 h-5 text-orange-600" />
            <span className="text-sm font-medium text-orange-800">Filters</span>
          </button>
        </div>
      </div>
      <Dialog open={showFilters} onOpenChange={setShowFilters}>
        <DialogContent className="sm:max-w-md bg-white rounded-lg shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-orange-800">
              Filter Restaurants
            </DialogTitle>
          </DialogHeader>

          {/* Category Filter */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <Select onValueChange={(value) => setFilters({ category: value })}>
              <SelectTrigger className="bg-white border rounded-md shadow-sm">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Italian">Italian</SelectItem>
                <SelectItem value="Fast Food">Fast Food</SelectItem>
                <SelectItem value="Indian">Indian</SelectItem>
                <SelectItem value="Japanese">Japanese</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Min Rating Filter */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Minimum Rating
            </label>
            <Select onValueChange={(value) => setFilters({ minRating: value })}>
              <SelectTrigger className="bg-white border rounded-md shadow-sm">
                <SelectValue placeholder="Select Rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Any</SelectItem>
                <SelectItem value="3">3+</SelectItem>
                <SelectItem value="4">4+</SelectItem>
                <SelectItem value="4.5">4.5+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogClose asChild>
            <button className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-md transition">
              Apply Filters
            </button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
};
