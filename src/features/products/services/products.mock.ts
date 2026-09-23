import { mockProducts } from "@/features/products/services/products.mock-data";
import type { ProductsService } from "@/features/products/services/products.service";

/**
 * In-memory catalog used while no backend exists.
 * In-memory implementation of the catalog query contract.
 */
export const mockProductsService: ProductsService = {
  async list(query) {
    const search = query.search?.toLowerCase();
    let items = mockProducts.filter((product) => {
      const matchesSearch =
        !search ||
        `${product.name} ${product.notes}`.toLowerCase().includes(search);
      const matchesCategory =
        !query.categories?.length && !query.category
          ? true
          : query.categories?.length
            ? query.categories.includes(product.category)
            : product.category === query.category;
      const matchesFamily =
        !query.scentFamilies?.length ||
        query.scentFamilies.includes(product.scentFamily);
      const matchesOccasion =
        !query.occasions?.length || query.occasions.includes(product.occasion);
      const matchesMin =
        query.minPrice === undefined || product.price >= query.minPrice;
      const matchesMax =
        query.maxPrice === undefined || product.price <= query.maxPrice;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesFamily &&
        matchesOccasion &&
        matchesMin &&
        matchesMax
      );
    });

    if (query.sort) {
      items = [...items].sort((left, right) => {
        if (query.sort === "name-asc")
          return left.name.localeCompare(right.name);
        if (query.sort === "name-desc")
          return right.name.localeCompare(left.name);
        return query.sort === "price-asc"
          ? left.price - right.price
          : right.price - left.price;
      });
    }

    const page = query.page ?? 1;
    const pageSize = query.pageSize ?? 6;
    const total = items.length;
    const start = (page - 1) * pageSize;

    return {
      items: items.slice(start, start + pageSize),
      total,
      page,
      pageSize,
    };
  },

  async getById(id) {
    return mockProducts.find((product) => product.id === id) ?? null;
  },
};
