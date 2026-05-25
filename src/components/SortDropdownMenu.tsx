import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { type SortOption } from "../types/sorting";
import {
  ArrowUpDown,
  DollarSign,
  Hash,
  Calendar,
  Bike,
  Check,
} from "lucide-react";

interface SortDropdownMenuProps {
  onSort: (option: SortOption) => void;
  currentSort: SortOption;
}

interface SortOptionConfig {
  value: SortOption;
  label: string;
  icon: React.ReactNode;
  group: "price" | "name" | "performance" | "year";
}

export const SortDropdownMenu: React.FC<SortDropdownMenuProps> = ({
  onSort,
  currentSort,
}) => {
  const sortOptions: SortOptionConfig[] = [
    {
      value: "price-asc",
      label: "Price: Low to High",
      icon: <DollarSign className="w-4 h-4" />,
      group: "price",
    },
    {
      value: "price-desc",
      label: "Price: High to Low",
      icon: <DollarSign className="w-4 h-4" />,
      group: "price",
    },
    {
      value: "name-asc",
      label: "Name: A to Z",
      icon: <Hash className="w-4 h-4" />,
      group: "name",
    },
    {
      value: "name-desc",
      label: "Name: Z to A",
      icon: <Hash className="w-4 h-4" />,
      group: "name",
    },
    {
      value: "horsepower-desc",
      label: "Horsepower: High to Low",
      icon: <Bike className="w-4 h-4" />,
      group: "performance",
    },
    {
      value: "year-desc",
      label: "Year: Newest First",
      icon: <Calendar className="w-4 h-4" />,
      group: "year",
    },
    {
      value: "year-asc",
      label: "Year: Oldest First",
      icon: <Calendar className="w-4 h-4" />,
      group: "year",
    },
  ];

  const getGroupLabel = (group: string) => {
    const labels = {
      price: "💰 Price",
      name: "📝 Name",
      performance: "⚡ Performance",
      year: "📅 Year",
    };
    return labels[group as keyof typeof labels];
  };

  const groupedOptions = sortOptions.reduce(
    (acc, option) => {
      if (!acc[option.group]) acc[option.group] = [];
      acc[option.group].push(option);
      return acc;
    },
    {} as Record<string, SortOptionConfig[]>,
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="gap-2 bg-white border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition-all"
        >
          <ArrowUpDown className="w-4 h-4" />
          <span className="hidden sm:inline">Sort</span>
          <span className="sm:hidden">Sort</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72 bg-white border-gray-200 shadow-xl">
        <DropdownMenuLabel className="flex items-center gap-2">
          <ArrowUpDown className="w-4 h-4 text-orange-500" />
          <span>Sort Motorcycles</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {Object.entries(groupedOptions).map(([group, options]) => (
          <React.Fragment key={group}>
            <div className="px-2 py-1.5">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {getGroupLabel(group)}
              </p>
            </div>
            {options.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onClick={() => onSort(option.value)}
                className={`cursor-pointer py-2 px-3 ${
                  currentSort === option.value
                    ? "bg-orange-50 text-orange-600 font-medium"
                    : "hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-1 rounded ${
                        currentSort === option.value
                          ? "text-orange-600"
                          : "text-gray-500"
                      }`}
                    >
                      {option.icon}
                    </div>
                    <span className="text-sm">{option.label}</span>
                  </div>
                  {currentSort === option.value && (
                    <Check className="w-4 h-4 text-orange-500" />
                  )}
                </div>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
