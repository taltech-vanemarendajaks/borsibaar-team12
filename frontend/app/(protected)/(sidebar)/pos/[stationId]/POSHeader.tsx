"use client";

import { useRouter } from "next/navigation";
import { ShoppingCart, ArrowLeft, User, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CategoryFilter } from "./CategoryFilter";
import { BarStation, CurrentUser, Category } from "./types";

interface POSHeaderProps {
  station: BarStation | null;
  currentUser: CurrentUser | null;
  categories: Category[];
  selectedCategory: number | null;
  searchTerm: string;
  productCount: number;
  onCategoryChange: (categoryId: number | null) => void;
  onSearchChange: (term: string) => void;
}

export function POSHeader({
  station,
  currentUser,
  categories,
  selectedCategory,
  searchTerm,
  productCount,
  onCategoryChange,
  onSearchChange,
}: POSHeaderProps) {
  const router = useRouter();

  return (
    <div className="rounded-lg bg-card p-6 shadow-sm mb-6 border-1 border-[color-mix(in oklab, var(--ring) 50%, transparent)]">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push("/pos")}
            className="mr-2"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <ShoppingCart className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-100">
              {station?.name || "Loading..."}
            </h1>
            {station?.description && (
              <p className="text-sm text-gray-400">{station.description}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-6">
          {currentUser && (
            <div className="flex items-center gap-2 text-sm">
              <User className="w-4 h-4 text-blue-400" />
              <span className="text-gray-300">
                {currentUser.name || currentUser.email}
              </span>
              {currentUser.role && (
                <span className="px-2 py-1 bg-blue-900 text-blue-200 rounded-full text-xs">
                  {currentUser.role}
                </span>
              )}
            </div>
          )}
          <div className="text-sm text-gray-400">Products: {productCount}</div>
        </div>
      </div>

      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={onCategoryChange}
      />

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 w-5 h-5" />
        <Input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2"
        />
      </div>
    </div>
  );
}
