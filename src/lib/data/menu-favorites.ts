/** Homepage “Customer Favorites” menu (from design reference). */
export type MenuFavoriteItem = { name: string; price: string };

export type MenuFavoriteColumn = {
  title: string;
  items: MenuFavoriteItem[];
};

export const menuFavorites: MenuFavoriteColumn[] = [
  {
    title: "Breads",
    items: [
      { name: "Classic Sourdough", price: "$6.00" },
      { name: "Honey Whole Wheat", price: "$5.50" },
      { name: "Rosemary Focaccia", price: "$5.00" },
      { name: "Seeded Rye", price: "$5.75" },
      { name: "Brioche Loaf", price: "$7.00" },
    ],
  },
  {
    title: "Pastries & Bites",
    items: [
      { name: "Butter Croissant", price: "$4.00" },
      { name: "Almond Danish", price: "$4.50" },
      { name: "Blueberry Muffin", price: "$3.75" },
      { name: "Cinna Roll", price: "$4.00" },
      { name: "Brownie Bar", price: "$3.50" },
    ],
  },
  // {
  //   title: "Cakes & Sweets",
  //   items: [
  //     { name: "Lemon Tart", price: "$5.25" },
  //     { name: "Choco Layer Cake", price: "$6.00" },
  //     { name: "Cheesecake Slice", price: "$5.50" },
  //     { name: "Mocha Mousse", price: "$4.75" },
  //     { name: "Seasonal Galette", price: "$5.00" },
  //   ],
  // },
];
