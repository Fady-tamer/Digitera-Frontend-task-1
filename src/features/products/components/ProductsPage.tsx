"use client";

import Link from "next/link";
import { ProductBreadcrumbs } from "@/features/products/components/ProductBreadcrumbs";
import { ProductFilters } from "@/features/products/components/ProductFilters";
import { ProductGrid } from "@/features/products/components/ProductGrid";
import { ProductPagination } from "@/features/products/components/ProductPagination";
import { ProductSortControl } from "@/features/products/components/ProductSort";
import { productPaths } from "@/features/products/paths";
import { useProducts } from "@/features/products/hooks/useProducts";
import type { ProductSearchParams } from "@/features/products/types/product.types";
import { parseProductListQuery } from "@/features/products/utils/product.utils";

type ProductsPageProps = {
  searchParams: ProductSearchParams;
};

export function ProductsPage({ searchParams }: ProductsPageProps) {
  const query = parseProductListQuery(searchParams);
  const productsQuery = useProducts(query);

  return (
    <section className="overflow-x-hidden bg-[#faf8f5] text-[#1a1a1a]">
      <ProductBreadcrumbs />
      <div className="flex w-full flex-col items-start px-4 pb-8 sm:px-6 md:px-10 lg:px-20 lg:pb-10">
        <h1 className="w-full font-[family-name:var(--font-instrument-serif)] text-[40px] leading-tight text-[#1a1a1a] sm:text-[52px] lg:text-[64px] lg:leading-normal">
          All Fragrances
        </h1>
        <p className="mt-2 w-full text-[14px] font-normal text-[#605a54] sm:mt-0">
          Cultivated formulations curated to command atmospheric space.
        </p>
      </div>
      <div className="flex flex-col items-stretch gap-8 px-4 pb-16 sm:px-6 md:px-10 lg:flex-row lg:items-start lg:gap-12 lg:px-20 lg:pb-[100px]">
        <ProductFilters />
        <div className="flex min-w-0 flex-1 flex-col items-start gap-6">
          <ProductSortControl
            value={query.sort ?? "price-desc"}
            availableCount={productsQuery.data?.total ?? 0}
          />
          <ProductGrid
            products={productsQuery.data?.items ?? []}
            isLoading={productsQuery.isLoading}
          />
          <ProductPagination
            page={productsQuery.data?.page ?? query.page ?? 1}
            pageSize={productsQuery.data?.pageSize ?? query.pageSize ?? 6}
            total={productsQuery.data?.total ?? 0}
          />
        </div>
      </div>
      <footer className="home-footer">
        <div className="home-footer-brand">
          <div>ODORATUS</div>
          <p>
            An independent olfactory house cultivating slow-luxury liquid
            narratives. Every bottle is hand-poured in small batches using
            sustainably sourced botanicals.
          </p>
          <span>◎ &nbsp; ◌ &nbsp; ◉</span>
        </div>
        <div>
          <b>Collections</b>
          <Link href={productPaths.list}>La Maison</Link>
          <Link href={productPaths.list}>Private Reserve</Link>
          <Link href={productPaths.list}>Scented Candles</Link>
          <Link href={productPaths.list}>Discovery Sets</Link>
        </div>
        <div>
          <b>Customer Care</b>
          <Link href={productPaths.list}>Olfactory Consultation</Link>
          <Link href={productPaths.list}>Shipping &amp; Returns</Link>
          <Link href={productPaths.list}>Atelier Appointments</Link>
          <Link href={productPaths.list}>Care Guide</Link>
        </div>
        <div>
          <b>About Us</b>
          <Link href={productPaths.list}>Our Philosophy</Link>
          <Link href={productPaths.list}>Sourcing Standards</Link>
          <Link href={productPaths.list}>Sustainability Commitments</Link>
          <Link href={productPaths.list}>Journal</Link>
        </div>
      </footer>
    </section>
  );
}
