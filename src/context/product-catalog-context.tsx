"use client";

import {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import type { ProductCatalogPayload } from "@/lib/data/get-catalog";
import type { Product } from "@/types/product";

export type ProductCatalogContextValue = ProductCatalogPayload & {
  getProductById: (id: string) => Product | undefined;
  getProductBySlug: (slug: string) => Product | undefined;
};

const ProductCatalogContext = createContext<ProductCatalogContextValue | null>(
  null
);

export function ProductCatalogProvider({
  children,
  value,
}: {
  children: ReactNode;
  value: ProductCatalogPayload;
}) {
  const merged = useMemo<ProductCatalogContextValue>(() => {
    const byId = new Map(value.products.map((p) => [p.id, p]));
    const bySlug = new Map(value.products.map((p) => [p.slug, p]));
    return {
      ...value,
      getProductById: (id: string) => byId.get(id),
      getProductBySlug: (slug: string) => bySlug.get(slug),
    };
  }, [value]);

  return (
    <ProductCatalogContext.Provider value={merged}>
      {children}
    </ProductCatalogContext.Provider>
  );
}

export function useProductCatalog(): ProductCatalogContextValue {
  const ctx = useContext(ProductCatalogContext);
  if (!ctx) {
    throw new Error(
      "useProductCatalog must be used within ProductCatalogProvider"
    );
  }
  return ctx;
}
