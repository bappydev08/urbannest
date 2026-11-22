import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME || "NEXORA Admin";

  if (!email || !password || password.length < 12) {
    throw new Error("Set ADMIN_EMAIL and an ADMIN_PASSWORD of at least 12 characters in .env.");
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.user.upsert({
    where: { email: email.toLowerCase() },
    update: { name, passwordHash, role: "ADMIN" },
    create: {
      name,
      email: email.toLowerCase(),
      passwordHash,
      role: "ADMIN",
    },
  });

  const demoProducts: Array<[string, string, string, number, number, number, string]> = [
    ["Premium Wireless Headphones","Electronics","https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700",2490,3290,25,"Immersive wireless sound with comfortable all-day cushioning."],
    ["Classic Leather Backpack","Fashion","https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=700",1890,2490,18,"A durable and stylish backpack for work and travel."],
    ["Ceramic Coffee Set","Home","https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=700",1290,1590,32,"A refined ceramic set for daily coffee rituals."],
    ["Running Sneakers","Fashion","https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700",2990,3990,12,"Lightweight sneakers designed for comfort and performance."],
    ["Smart Fitness Watch","Electronics","https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700",3590,4290,20,"Track activity, sleep and everyday wellness."],
    ["Luxury Skincare Collection","Beauty","https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=700",1590,1990,15,"A carefully selected collection for a complete skincare routine."],
    ["Minimal Desk Lamp","Home","https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=700",2190,2790,16,"Modern task lighting with a clean, compact silhouette."],
    ["Everyday Travel Watch","Accessories","https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=700",2790,3490,14,"A versatile watch for work, weekends and travel."],
    ["Noise Cancelling Earbuds","Electronics","https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=700",2790,3590,22,"Compact wireless earbuds with active noise control."],
    ["Linen Summer Shirt","Fashion","https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=700",1490,1890,27,"Lightweight linen shirt for warm, relaxed days."],
    ["Portable Bluetooth Speaker","Electronics","https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=700",3290,3990,18,"Rich portable sound for home and outdoor use."],
    ["Leather Card Holder","Accessories","https://images.unsplash.com/photo-1627123424574-724758594e93?w=700",890,1190,35,"Slim genuine-leather card holder with a modern finish."],
    ["Canvas Tote Bag","Fashion","https://images.unsplash.com/photo-1553062407-98eeb64c6a5?w=700",990,1290,30,"A spacious everyday tote made for work and shopping."],
    ["Stoneware Dinner Set","Home","https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=700",2390,2990,11,"Elegant stoneware dishes for everyday dining."],
    ["Hydrating Face Serum","Beauty","https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=700",1190,1490,25,"A lightweight serum designed to hydrate and refresh skin."],
    ["Mechanical Keyboard","Electronics","https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=700",4490,5290,9,"Responsive mechanical keyboard for work and gaming."],
    ["Wool Blend Coat","Fashion","https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=700",5990,7490,8,"A tailored cold-weather coat with a premium finish."],
    ["Digital Scent Diffuser","Home","https://images.unsplash.com/photo-1603006905003-be475563bc59?w=700",1890,2290,20,"Quiet diffuser technology for a fragrant living space."],
    ["Rose Gold Sunglasses","Accessories","https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=700",1690,2190,17,"Polarized sunglasses with a polished modern frame."],
    ["Vitamin C Cleanser","Beauty","https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=700",790,990,40,"A gentle cleanser that leaves skin fresh and balanced."],
    ["4K Action Camera","Electronics","https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=700",6490,7990,7,"Capture travel and adventure footage in high resolution."],
    ["Classic Denim Jacket","Fashion","https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?w=700",3290,3990,13,"Timeless denim with a comfortable regular fit."],
    ["Sculptural Table Vase","Home","https://images.unsplash.com/photo-1618220179428-22790b461013?w=700",1390,1790,19,"A sculptural accent vase for shelves and tabletops."],
    ["Silk Hair Scrunchies","Beauty","https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=700",590,790,50,"Soft silk scrunchies that reduce hair pulling."],
    ["Leather Crossbody Bag","Accessories","https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=700",2490,3190,15,"Compact hands-free bag with organized storage."],
    ["Wireless Charging Pad","Electronics","https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=700",1290,1690,29,"Convenient wireless charging for compatible devices."],
    ["Cotton Lounge Set","Fashion","https://images.unsplash.com/photo-1598032895397-b9472444bf93?w=700",1790,2290,24,"A soft matching set made for relaxed indoor comfort."],
    ["Bamboo Desk Organizer","Home","https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=700",1090,1390,21,"Natural desk storage for notes, pens and accessories."],
    ["Nourishing Lip Balm","Beauty","https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=700",490,690,45,"Moisturizing everyday balm with a smooth finish."],
    ["Everyday Sunglass Case","Accessories","https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=700",690,890,38,"Protective hard-shell case for sunglasses and readers."],
    ["Smart LED Desk Light","Electronics","https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=700",1990,2490,23,"Adjustable smart lighting with multiple brightness modes."],
    ["Premium Chino Pants","Fashion","https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=700",2190,2790,26,"Comfortable chinos with a clean tapered fit."],
    ["Ceramic Aroma Candle","Home","https://images.unsplash.com/photo-1603006905003-be475563bc59?w=700",990,1290,36,"A calming scented candle in a reusable ceramic vessel."],
    ["Gentle Facial Moisturizer","Beauty","https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=700",1390,1790,28,"Daily lightweight moisture for soft, balanced skin."],
    ["Minimal Wristband","Accessories","https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=700",790,990,33,"Simple wearable wristband for casual everyday style."],
    ["Portable Power Bank","Electronics","https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=700",1790,2290,31,"High-capacity backup power for phones and tablets."],
    ["Knit Pullover Sweater","Fashion","https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=700",2690,3290,17,"Soft knit pullover with a cozy relaxed shape."],
    ["Memory Foam Cushion","Home","https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=700",890,1190,42,"Supportive cushion for chairs, sofas and reading corners."],
    ["Natural Clay Mask","Beauty","https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=700",1090,1390,34,"Purifying mask for refreshed and clarified skin."],
    ["Stainless Steel Bottle","Accessories","https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=700",890,1190,44,"Insulated bottle that keeps drinks hot or cold."],
    ["Smartphone Gimbal","Electronics","https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?w=700",5490,6790,10,"Stable smartphone mount for smooth video recording."],
    ["Classic Oxford Shirt","Fashion","https://images.unsplash.com/photo-1603252109303-2751441dd157?w=700",1990,2490,28,"A crisp versatile shirt for smart casual dressing."],
    ["Acacia Serving Board","Home","https://images.unsplash.com/photo-1556911220-bff31c812dba?w=700",1190,1590,22,"Natural acacia board for cheese, snacks and presentation."],
    ["Body Care Gift Set","Beauty","https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=700",1890,2390,16,"A coordinated set of nourishing everyday body care."],
    ["Braided Leather Belt","Accessories","https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=700",1490,1890,20,"Flexible braided belt with a classic metal buckle."],
    ["Compact Dash Camera","Electronics","https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=700",3990,4990,12,"Discreet road recording with loop and motion features."],
    ["Premium Polo Shirt","Fashion","https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=700",1390,1790,30,"Breathable polo shirt with a structured everyday fit."],
    ["Foldable Laundry Hamper","Home","https://images.unsplash.com/photo-1586201375761-83865001e31c?w=700",790,990,26,"Lightweight collapsible hamper for bedrooms and laundry rooms."],
    ["Hydrating Sheet Masks","Beauty","https://images.unsplash.com/photo-1619451334792-150fd785ee74?w=700",690,890,48,"A set of soothing sheet masks for weekly skin refreshment."],
    ["Classic Baseball Cap","Accessories","https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=700",790,990,40,"Adjustable cotton cap with an embroidered finish."],
  ];

  for (const [name, category, image, price, oldPrice, stock, description] of demoProducts) {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const product = { name, slug, description, category, image, price, oldPrice, stock };
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    });
  }

  console.log("NEXORA admin and demo products are ready.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
