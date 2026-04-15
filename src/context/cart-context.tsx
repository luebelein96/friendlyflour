"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useProductCatalog } from "@/context/product-catalog-context";
import { maxPurchasableQuantity } from "@/lib/product-stock";
import type { CartLine } from "@/types/product";
import type { Product } from "@/types/product";

const STORAGE_KEY = "friendly-flour-cart";

type CartContextValue = {
  lines: CartLine[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addProduct: (productId: string, quantity?: number) => void;
  setQuantity: (productId: string, quantity: number) => void;
  removeLine: (productId: string) => void;
  clearCart: () => void;
  itemCount: number;
};

const CartContext = createContext<CartContextValue | null>(null);

function clampLinesToStock(
  prev: CartLine[],
  getProductById: (id: string) => Product | undefined
): CartLine[] {
  const next: CartLine[] = [];
  for (const line of prev) {
    const p = getProductById(line.productId);
    if (!p) continue;
    const max = maxPurchasableQuantity(p);
    if (max <= 0) continue;
    const q = Math.min(line.quantity, max);
    if (q > 0) next.push({ productId: line.productId, quantity: q });
  }
  if (
    prev.length === next.length &&
    prev.every(
      (l, i) =>
        l.productId === next[i].productId && l.quantity === next[i].quantity
    )
  ) {
    return prev;
  }
  return next;
}

function readStoredLines(
  getProductById: (id: string) => Product | undefined
): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    const rows = parsed.filter(
      (row): row is CartLine =>
        typeof row === "object" &&
        row !== null &&
        "productId" in row &&
        "quantity" in row &&
        typeof (row as CartLine).productId === "string" &&
        typeof (row as CartLine).quantity === "number"
    );
    return clampLinesToStock(rows, getProductById);
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { getProductById, products } = useProductCatalog();
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Hydrate from sessionStorage after mount (client-only).
    queueMicrotask(() => {
      setLines(readStoredLines(getProductById));
      setHydrated(true);
    });
  }, [getProductById]);

  useEffect(() => {
    if (!hydrated) return;
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, hydrated]);

  /** Re-clamp when catalog/stock updates (e.g. after refresh) so cart never exceeds availability. */
  useEffect(() => {
    if (!hydrated) return;
    setLines((prev) => clampLinesToStock(prev, getProductById));
  }, [hydrated, products, getProductById]);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen((o) => !o), []);

  const addProduct = useCallback(
    (productId: string, quantity = 1) => {
      const p = getProductById(productId);
      if (!p) return;
      const max = maxPurchasableQuantity(p);
      if (max <= 0) return;
      setLines((prev) => {
        const idx = prev.findIndex((l) => l.productId === productId);
        const current = idx === -1 ? 0 : prev[idx].quantity;
        const nextQty = Math.min(current + quantity, max);
        if (nextQty <= current) return prev;
        if (idx === -1) return [...prev, { productId, quantity: nextQty }];
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: nextQty };
        return next;
      });
      setIsOpen(true);
    },
    [getProductById]
  );

  const setQuantity = useCallback(
    (productId: string, quantity: number) => {
      if (quantity < 1) {
        setLines((prev) => prev.filter((l) => l.productId !== productId));
        return;
      }
      const p = getProductById(productId);
      if (!p) {
        setLines((prev) => prev.filter((l) => l.productId !== productId));
        return;
      }
      const max = maxPurchasableQuantity(p);
      const q = Math.min(quantity, max);
      if (max <= 0 || q < 1) {
        setLines((prev) => prev.filter((l) => l.productId !== productId));
        return;
      }
      setLines((prev) =>
        prev.map((l) =>
          l.productId === productId ? { ...l, quantity: q } : l
        )
      );
    },
    [getProductById]
  );

  const removeLine = useCallback((productId: string) => {
    setLines((prev) => prev.filter((l) => l.productId !== productId));
  }, []);

  const clearCart = useCallback(() => setLines([]), []);

  const itemCount = useMemo(
    () =>
      lines.reduce(
        (sum, l) => (getProductById(l.productId) ? sum + l.quantity : sum),
        0
      ),
    [lines, getProductById]
  );

  const value = useMemo(
    () => ({
      lines,
      isOpen,
      openCart,
      closeCart,
      toggleCart,
      addProduct,
      setQuantity,
      removeLine,
      clearCart,
      itemCount,
    }),
    [
      lines,
      isOpen,
      openCart,
      closeCart,
      toggleCart,
      addProduct,
      setQuantity,
      removeLine,
      clearCart,
      itemCount,
      getProductById,
    ]
  );

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
