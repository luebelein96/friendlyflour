export type MenuFavoriteItem = { name: string; price: string };

export type MenuFavoriteColumn = {
  title: string;
  items: MenuFavoriteItem[];
};

/** Homepage “Customer favorites” menu — hardcoded (not from Square). */
export const MENU_FAVORITES_COLUMNS: MenuFavoriteColumn[] = [
  {
    title: "Breads",
    items: [
      { name: "Ciabatta rolls", price: "$10" },
      { name: "Bagels (4 pack)", price: "$14" },
      { name: "Pizza Dough", price: "$10" },
      { name: "Sandwich Loaf", price: "$8" },
      { name: "Burger Buns", price: "$8" },
    ],
  },
  {
    title: "Pastries + Treats",
    items: [
      { name: "Chocolate Chip Cookie", price: "$3" },
      { name: "Mini Cake", price: "$12" },
      { name: "Blueberry Cheesecake Bun", price: "$10" },
      { name: "Strawberry Cheesecake Bar", price: "$4" },
    ],
  },
];
