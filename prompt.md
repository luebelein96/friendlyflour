Build a beautiful, fun, modern ecommerce website for a gluten-free baked goods brand called “friendly flour”.

Tech stack:
- Next.js
- React
- TypeScript
- Tailwind CSS
- Use mock product data for now
- Use local state/context for cart functionality
- Make the project structured so Stripe checkout can be added later

Brand direction:
friendly flour should feel:
- warm
- playful
- elevated
- artisan
- modern
- welcoming
- slightly premium but not stiff

The brand is a gluten-free bakery / packaged food brand. The visual style should feel joyful, memorable, and highly brandable. Think modern specialty food brand meets boutique bakery. Avoid generic corporate SaaS styling.

Design goals:
- Fun landing page with strong visual hierarchy
- Beautiful typography
- Soft organic shapes
- Subtle micro-animations and hover states
- High-end but approachable
- Clean, airy layout with excellent spacing
- Mobile responsive
- Conversion-focused

Use a color palette that feels natural, baked, and fresh. Think warm neutrals, cream, soft tan, muted sage, golden brown, and one playful accent color. The site should feel distinctive and polished.

Pages / sections to include:

1. Landing Page
Create a full homepage with:
- Header / navbar
  - Logo text: friendly flour
  - Links: Shop, About, FAQ
  - Cart icon with item count
- Hero section
  - Strong headline
  - Short supporting copy
  - Primary CTA: Shop Now
  - Secondary CTA: Our Story
  - Add fun visual treatment like floating shapes, grain, illustrations, or layered cards
- Featured products section
  - 3–4 bestsellers shown as product cards
- Brand story section
  - Brief section explaining friendly flour as joyful gluten-free baked goods made with care
- “Why friendly flour” section
  - 3–4 value props such as gluten-free, small batch, thoughtfully made, delicious texture
- Testimonial / social proof section
- Email signup / newsletter section
- Footer

2. Shop / Products Page
Create a dedicated shop page that includes:
- Product grid
- Filter or category pills
- Sort dropdown
- Product cards with:
  - image
  - product name
  - short description
  - price
  - add to cart button
  - optional badge like Best Seller or New
- Use mock products such as:
  - Gluten-Free Chocolate Chip Cookies
  - Rustic Brownie Mix
  - Cinnamon Coffee Cake Mix
  - Soft Bake Vanilla Cake Mix
  - Seasonal Strawberry Muffin Mix
  - Granola or snack item if needed
- Include a product detail modal or dedicated product page if helpful

3. Cart
Build a working cart experience:
- Slide-out cart drawer or dedicated cart page
- Users can:
  - add items
  - increase/decrease quantity
  - remove items
  - see subtotal
- Cart state should persist during the session
- Add a clear checkout CTA

4. Checkout Page
Create a clean, polished mock checkout page with:
- Contact information form
- Shipping address form
- Order summary
- Promo code input
- Payment section UI (mocked)
- Place order button
This can be a front-end only checkout for now, but structure it clearly for future Stripe integration.

5. About Page
Include:
- Brand story
- Mission
- Simple visuals or image placeholders
- A tone that feels human and charming

6. FAQ Page
Include common questions like:
- Are your products certified gluten-free?
- How long do baked goods last?
- Do you ship?
- Are mixes easy to make?
- Do you offer seasonal flavors?

Functionality requirements:
- Fully responsive
- Reusable components
- Clean folder structure
- Mock data stored in a separate file
- Cart functionality implemented cleanly
- Use React context or similar for cart state
- Prepare architecture so payment integration can be added later
- Smooth transitions and hover animations
- Accessible buttons/forms

Creative direction:
- Do not make it look like a generic template
- Do not make it feel too rustic or too minimal
- It should feel branded and memorable
- Add tasteful motion and delight
- Use nice product card layouts and soft rounded corners
- The homepage should immediately feel like a real premium food brand

Copy direction:
Write tasteful placeholder copy that matches the brand. Keep it warm, playful, and polished. Avoid overly trendy or cheesy language.

Deliverables:
- Complete frontend implementation
- Clean, reusable components
- Well-structured pages
- Mock ecommerce flow from shop to cart to checkout
- Make it feel like a real consumer packaged food brand website ready for iteration

Bonus:
- Add a “featured in” or “loved by” strip
- Add a product quick-view interaction
- Add subtle parallax or motion accents in the hero
- Add a sticky add-to-cart interaction on mobile if appropriate