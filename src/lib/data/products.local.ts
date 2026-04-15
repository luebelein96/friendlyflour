import type { Product } from "@/types/product";

/** Replace per product with `/product-imgs/...` when photos are ready */
const IMG_TBD =
  "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80";

/** Offline / fallback catalog when Square is not configured or returns nothing. */
export const localProducts: Product[] = [
  {
    id: "p-cc-cookies",
    slug: "gluten-free-chocolate-chip-cookies",
    name: "Chocolate Chip Cookies",
    shortDescription: "Buttery edges, soft centers, and chips in every bite.",
    description:
      "Our signature cookies are mixed in small batches with premium chocolate and a touch of brown butter warmth. No gluten, all joy—baked until the edges curl just so and the centers stay tender.",
    priceCents: 1299,
    category: "cookies",
    imageUrl:
      "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&q=80",
    imageAlt: "Stack of chocolate chip cookies on parchment",
    badge: "bestseller",
  },
  {
    id: "p-blueberry-cheesecake-bun",
    slug: "blueberry-cheesecake-bun",
    name: "Blueberry Cheesecake Bun",
    shortDescription: "Swirls of berry, creamy filling, soft brioche-style roll.",
    description:
      "A gluten-free bakery favorite: tender dough folded with wild blueberry and a light cheesecake ripple. Baked until the top just kisses gold—best slightly warm, impossible to share.",
    priceCents: 499,
    category: "snacks",
    imageUrl: "/product-imgs/blueberry-brioche.png",
    imageAlt: "Blueberry cheesecake bun on a plate",
    badge: "bestseller",
  },
  {
    id: "p-blueberry-cheesecake-bar",
    slug: "blueberry-cheesecake-bar",
    name: "Blueberry Cheesecake Bar",
    shortDescription:
      "Buttery crust, creamy cheesecake, jammy blueberries, golden streusel.",
    description:
      "Square-cut and ready to share (or not): a crisp shortbread base, silky cheesecake layer, whole blueberries, and a toasted crumble topping. Gluten-free, fully indulgent, best served chilled or just barely warm.",
    priceCents: 599,
    category: "snacks",
    imageUrl: "/product-imgs/bb-cheesecake-bar.jpeg",
    imageAlt:
      "Blueberry cheesecake bars with streusel topping on a speckled plate",
    badge: "new",
  },
  {
    id: "p-pizza-dough-mix",
    slug: "gluten-free-pizza-dough-mix",
    name: "Pizza Dough Mix",
    shortDescription: "Stretchy crust, crisp bottom—Friday night pies without the gluten.",
    description:
      "Add water and olive oil for dough that pulls and bubbles like the real thing. Rest it for a deeper flavor or bake the same day—either way you get a crust worth folding in half.",
    priceCents: 1399,
    category: "mixes",
    imageUrl:
      "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=800&q=80",
    imageAlt: "Pizza dough being stretched by hand",
  },
  {
    id: "p-vanilla-cake-mix",
    slug: "soft-bake-vanilla-cake-mix",
    name: "Soft Bake Vanilla Cake Mix",
    shortDescription: "Cloud-light vanilla with a golden crust.",
    description:
      "Birthdays, Tuesdays, whatever—this is the vanilla cake you actually want to eat. Real vanilla, a hint of almond, and a crumb so soft it barely whispers.",
    priceCents: 1599,
    category: "mixes",
    imageUrl:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80",
    imageAlt: "Vanilla layer cake with frosting",
    badge: "new",
  },
  {
    id: "p-strawberry-muffin-mix",
    slug: "seasonal-strawberry-muffin-mix",
    name: "Seasonal Strawberry Muffin Mix",
    shortDescription: "Bright berry pockets in a tender muffin crown.",
    description:
      "A limited-run favorite: freeze-dried strawberries folded into a gentle batter. Dome-topped, bakery-style muffins without the gluten guesswork.",
    priceCents: 1699,
    category: "mixes",
    imageUrl:
      "https://images.unsplash.com/photo-1607955661039-a2f2bb103b91?w=800&q=80",
    imageAlt: "Fresh muffins in a tin",
    badge: "new",
  },
  {
    id: "p-sesame-bagel",
    slug: "sesame-bagels",
    name: "Sesame Bagels",
    shortDescription: "Toasty seeds, chewy crumb—breakfast or sandwich ready.",
    description:
      "Classic gluten-free bagels rolled in sesame and baked until the outside snaps and the inside stays satisfyingly dense. Toast and schmear, or build your favorite sandwich.",
    priceCents: 449,
    category: "snacks",
    imageUrl: IMG_TBD,
    imageAlt: "Sesame bagels (photo coming soon)",
  },
  {
    id: "p-cheddar-bagel",
    slug: "cheddar-bagels",
    name: "Cheddar Bagels",
    shortDescription: "Sharp cheese baked right in—savory from the first bite.",
    description:
      "Gluten-free dough folded with aged cheddar for pockets of melty, salty goodness. Great on their own or as the base for an egg sandwich.",
    priceCents: 449,
    category: "snacks",
    imageUrl: IMG_TBD,
    imageAlt: "Cheddar bagels (photo coming soon)",
  },
  {
    id: "p-jalapeno-cheddar-bagel",
    slug: "jalapeno-cheddar-bagels",
    name: "Jalapeño Cheddar Bagels",
    shortDescription: "Mild heat, big cheese—weekend brunch energy.",
    description:
      "Diced jalapeños and cheddar woven through every ring. Warm, a little spicy, and built for cream cheese or a fried egg on top.",
    priceCents: 449,
    category: "snacks",
    imageUrl: IMG_TBD,
    imageAlt: "Jalapeño cheddar bagels (photo coming soon)",
  },
  {
    id: "p-plain-bagel",
    slug: "plain-bagels",
    name: "Plain Bagels",
    shortDescription: "The blank canvas—chewy, golden, gluten-free.",
    description:
      "Our everyday bagel: simple, reliable, and perfect for whatever you spread on it. Boiled and baked the old-school way, without the gluten.",
    priceCents: 399,
    category: "snacks",
    imageUrl: IMG_TBD,
    imageAlt: "Plain bagels (photo coming soon)",
  },
  {
    id: "p-pizza",
    slug: "gluten-free-pizza",
    name: "Pizza",
    shortDescription: "Crisp crust, house sauce, cheese that actually melts.",
    description:
      "Take-and-bake or ready-to-eat gluten-free pies—topped and finished in our kitchen so you get pizzeria pull without the wheat.",
    priceCents: 1499,
    category: "snacks",
    imageUrl: IMG_TBD,
    imageAlt: "Gluten-free pizza (photo coming soon)",
  },
  {
    id: "p-cinnamon-rolls",
    slug: "cinnamon-rolls",
    name: "Cinnamon Rolls",
    shortDescription: "Swirls of cinnamon sugar, soft pull-apart layers.",
    description:
      "Glazed or naked—your call. These rolls are built for slow mornings: warm spice, tender dough, and a little nostalgia in every spiral.",
    priceCents: 599,
    category: "snacks",
    imageUrl: IMG_TBD,
    imageAlt: "Cinnamon rolls (photo coming soon)",
  },
  {
    id: "p-cookie-dough-rolls",
    slug: "cookie-dough-rolls",
    name: "Cookie Dough Rolls",
    shortDescription: "Sweet spirals with chunks of safe-to-enjoy dough inside.",
    description:
      "Part cinnamon-roll logic, part cookie obsession—rolled dough studded with chocolate chip cookie pieces. Bake until your kitchen smells like a bakery.",
    priceCents: 649,
    category: "snacks",
    imageUrl: IMG_TBD,
    imageAlt: "Cookie dough rolls (photo coming soon)",
  },
  {
    id: "p-brownie-cookies",
    slug: "brownie-cookies",
    name: "Brownie Cookies",
    shortDescription: "Fudgy centers, crackly edges—the best of both worlds.",
    description:
      "When you can’t pick between a brownie and a cookie, you don’t have to. Dense, chocolate-forward, and just shy of decadent.",
    priceCents: 549,
    category: "cookies",
    imageUrl: IMG_TBD,
    imageAlt: "Brownie cookies (photo coming soon)",
  },
  {
    id: "p-hamburger-buns",
    slug: "hamburger-buns",
    name: "Hamburger Buns",
    shortDescription: "Soft, sturdy, and sized for the grill.",
    description:
      "Gluten-free buns that won’t fall apart mid-burger. Lightly toasted flavor, enough structure for sauces and toppings, weekend cookout approved.",
    priceCents: 699,
    category: "snacks",
    imageUrl: IMG_TBD,
    imageAlt: "Hamburger buns (photo coming soon)",
  },
  {
    id: "p-ciabatta-rolls",
    slug: "ciabatta-rolls",
    name: "Ciabatta Rolls",
    shortDescription: "Open crumb, olive-oil richness, sandwich hero.",
    description:
      "Rustic Italian-style rolls with a crisp shell and airy interior—ideal for paninis, dipping, or tearing warm from the bag.",
    priceCents: 549,
    category: "snacks",
    imageUrl: IMG_TBD,
    imageAlt: "Ciabatta rolls (photo coming soon)",
  },
  {
    id: "p-white-bread",
    slug: "white-bread",
    name: "White Bread",
    shortDescription: "Classic sandwich loaf—tender slices, everyday reliable.",
    description:
      "Soft gluten-free white bread for PB&J, toast, and grilled cheese. No crumbly compromise—just a loaf you’ll actually finish.",
    priceCents: 799,
    category: "snacks",
    imageUrl: IMG_TBD,
    imageAlt: "White bread loaf (photo coming soon)",
  },
  {
    id: "p-biscuits",
    slug: "biscuits",
    name: "Biscuits",
    shortDescription: "Flaky layers, buttery finish—breakfast or dinner side.",
    description:
      "Buttermilk-style gluten-free biscuits baked tall. Split them for honey butter, gravy, or fried chicken—Southern comfort, friendly flour style.",
    priceCents: 499,
    category: "snacks",
    imageUrl: IMG_TBD,
    imageAlt: "Biscuits (photo coming soon)",
  },
];

export const localCategoryLabels = new Map<string, string>([
  ["cookies", "Cookies"],
  ["mixes", "Baking mixes"],
  ["snacks", "Snacks"],
]);

export const staticFilterCategories: { id: string; label: string }[] = [
  { id: "all", label: "All" },
  { id: "cookies", label: "Cookies" },
  { id: "mixes", label: "Baking mixes" },
  { id: "snacks", label: "Snacks" },
];

export const defaultFeaturedProductIds = [
  "p-cc-cookies",
  "p-blueberry-cheesecake-bun",
  "p-blueberry-cheesecake-bar",
  "p-vanilla-cake-mix",
];
