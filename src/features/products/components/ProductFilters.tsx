"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils/cn";

type FilterOption = {
  id: string;
  label: string;
};

type CheckboxTone = "gold" | "ink";

const CATEGORIES: FilterOption[] = [
  { id: "pure-extractions", label: "Pure Extractions" },
  { id: "private-reserve", label: "Private Reserve" },
  { id: "atelier-oils", label: "Atelier Oils" },
  { id: "discovery-vault", label: "Discovery Vault" },
];

const SCENT_FAMILIES: FilterOption[] = [
  { id: "floral", label: "Floral" },
  { id: "woody", label: "Woody" },
  { id: "oriental", label: "Oriental" },
  { id: "fresh", label: "Fresh" },
];

const OCCASIONS: FilterOption[] = [
  { id: "personal-use", label: "Personal Use" },
  { id: "wedding", label: "Wedding" },
  { id: "gift-sets", label: "Gift Sets" },
  { id: "birthday", label: "Birthday" },
];

function FilterCheckbox({
  option,
  checked,
  tone,
  onChange,
}: {
  option: FilterOption;
  checked: boolean;
  tone: CheckboxTone;
  onChange: () => void;
}) {
  return (
    <label className="relative flex w-full cursor-pointer items-center gap-2.5">
      <input
        type="checkbox"
        className="absolute inset-0 z-10 size-full cursor-pointer opacity-0"
        checked={checked}
        onChange={onChange}
      />
      <span
        className={cn(
          "size-4 shrink-0 rounded-[2px] border border-solid border-[#ebe6de]",
          checked && tone === "gold" && "bg-[#c5a880]",
          checked && tone === "ink" && "bg-[#1a1a1a]",
          !checked && "bg-white",
          "pointer-events-none",
        )}
      />
      <span className="text-[13px] font-normal whitespace-nowrap text-[#1a1a1a]">
        {option.label}
      </span>
    </label>
  );
}

function FilterBlock({
  title,
  options,
  selected,
  tone,
  onToggle,
}: {
  title: string;
  options: FilterOption[];
  selected: string[];
  tone: CheckboxTone;
  onToggle: (id: string) => void;
}) {
  return (
    <div className="flex w-full flex-col items-start gap-4">
      <p className="text-[12px] font-bold uppercase whitespace-nowrap text-[#1a1a1a]">
        {title}
      </p>
      <div className="flex w-full flex-col items-start gap-3">
        {options.map((option) => (
          <FilterCheckbox
            key={option.id}
            option={option}
            tone={tone}
            checked={selected.includes(option.id)}
            onChange={() => onToggle(option.id)}
          />
        ))}
      </div>
    </div>
  );
}

function toggleValue(values: string[], id: string) {
  return values.includes(id)
    ? values.filter((value) => value !== id)
    : [...values, id];
}

export function ProductFilters() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selectedValues = (key: string) =>
    searchParams.get(key)?.split(",").filter(Boolean) ?? [];
  const categories = selectedValues("categories");
  const scentFamilies = selectedValues("scentFamilies");
  const occasions = selectedValues("occasions");
  const minPrice = Number(searchParams.get("minPrice") ?? 100);
  const maxPrice = Number(searchParams.get("maxPrice") ?? 400);
  const selectedCount =
    categories.length + scentFamilies.length + occasions.length;

  function updateFilter(key: string, id: string) {
    const params = new URLSearchParams(searchParams.toString());
    const values = selectedValues(key);
    const nextValues = toggleValue(values, id);

    if (nextValues.length) params.set(key, nextValues.join(","));
    else params.delete(key);
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  }

  function updatePrice(key: "minPrice" | "maxPrice", value: string) {
    const params = new URLSearchParams(searchParams.toString());
    const nextValue = Number(value);
    const boundedValue =
      key === "minPrice"
        ? Math.min(nextValue, maxPrice - 5)
        : Math.max(nextValue, minPrice + 5);

    params.set(key, String(boundedValue));
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <aside className="w-full shrink-0 lg:w-[260px]">
      <button
        type="button"
        className="flex w-full items-center justify-between rounded border border-solid border-[#ebe6de] bg-white px-4 py-3 text-[12px] font-semibold uppercase text-[#1a1a1a] lg:hidden"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <span>Filters{selectedCount > 0 ? ` (${selectedCount})` : ""}</span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/icons/chevron-down.svg"
          alt=""
          width={14}
          height={14}
          className={cn("transition-transform", open && "rotate-180")}
        />
      </button>
      <div
        className={cn(
          "flex-col items-start gap-8",
          open ? "mt-6 flex" : "hidden",
          "lg:mt-0 lg:flex",
        )}
      >
        <FilterBlock
          title="Category"
          options={CATEGORIES}
          selected={categories}
          tone="gold"
          onToggle={(id) => updateFilter("categories", id)}
        />
        <div className="h-px w-full bg-[#ebe6de]" />
        <FilterBlock
          title="Scent Family"
          options={SCENT_FAMILIES}
          selected={scentFamilies}
          tone="ink"
          onToggle={(id) => updateFilter("scentFamilies", id)}
        />
        <div className="h-px w-full bg-[#ebe6de]" />
        <FilterBlock
          title="Occasion"
          options={OCCASIONS}
          selected={occasions}
          tone="ink"
          onToggle={(id) => updateFilter("occasions", id)}
        />
        <div className="h-px w-full bg-[#ebe6de]" />
        <div className="flex w-full flex-col items-start gap-4">
          <p className="text-[12px] font-bold uppercase whitespace-nowrap text-[#1a1a1a]">
            Price Range
          </p>
          <div className="flex w-full max-w-[260px] flex-col items-start gap-3 lg:max-w-none">
            <div className="relative flex h-1 w-full items-center bg-[#ebe6de]">
              <div
                className="absolute top-0 h-1 bg-[#c5a880]"
                style={{
                  left: `${((minPrice - 100) / 300) * 100}%`,
                  right: `${((400 - maxPrice) / 300) * 100}%`,
                }}
              />
              <input
                aria-label="Minimum price"
                type="range"
                min="100"
                max="395"
                step="5"
                value={minPrice}
                onChange={(event) =>
                  updatePrice("minPrice", event.target.value)
                }
                className="absolute inset-x-0 z-20 h-4 w-full cursor-pointer opacity-0"
              />
              <input
                aria-label="Maximum price"
                type="range"
                min="105"
                max="400"
                step="5"
                value={maxPrice}
                onChange={(event) =>
                  updatePrice("maxPrice", event.target.value)
                }
                className="absolute inset-x-0 z-20 h-4 w-full cursor-pointer opacity-0"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/icons/slider-handle.svg"
                alt=""
                width={16}
                height={16}
                className="absolute top-[-6px]"
                style={{ left: `${((minPrice - 100) / 300) * 100}%` }}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/icons/slider-handle.svg"
                alt=""
                width={16}
                height={16}
                className="absolute top-[-6px]"
                style={{ left: `${((maxPrice - 100) / 300) * 100}%` }}
              />
            </div>
            <div className="flex w-full items-start justify-between text-[12px] font-normal whitespace-nowrap text-[#1a1a1a]">
              <p>${minPrice}</p>
              <p>${maxPrice}</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
