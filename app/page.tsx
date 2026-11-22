
"use client";

import { useEffect, useMemo, useState } from "react";

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  oldPrice: number;
  image: string;
  rating: number;
  stock: number;
  description: string;
};

const initialProducts: Product[] = [
  {
    id: "demo-1",
    name: "Premium Wireless Headphones",
    category: "Electronics",
    price: 2490,
    oldPrice: 3290,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700",
    rating: 4.8,
    stock: 25,
    description: "Premium wireless headphones with immersive sound and comfortable design.",
  },
  {
    id: "demo-2",
    name: "Classic Leather Backpack",
    category: "Fashion",
    price: 1890,
    oldPrice: 2490,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=700",
    rating: 4.7,
    stock: 18,
    description: "A stylish and durable backpack for everyday adventures.",
  },
  {
    id: "demo-3",
    name: "Ceramic Coffee Set",
    category: "Home",
    price: 1290,
    oldPrice: 1590,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=700",
    rating: 4.9,
    stock: 32,
    description: "Beautiful ceramic coffee essentials for your home.",
  },
  {
    id: "demo-4",
    name: "Running Sneakers",
    category: "Fashion",
    price: 2990,
    oldPrice: 3990,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700",
    rating: 4.8,
    stock: 12,
    description: "Lightweight sneakers designed for comfort and performance.",
  },
  {
    id: "demo-5",
    name: "Smart Fitness Watch",
    category: "Electronics",
    price: 3590,
    oldPrice: 4290,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700",
    rating: 4.6,
    stock: 20,
    description: "Smart wearable technology for your everyday lifestyle.",
  },
  {
    id: "demo-6",
    name: "Luxury Skincare Collection",
    category: "Beauty",
    price: 1590,
    oldPrice: 1990,
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=700",
    rating: 4.9,
    stock: 15,
    description: "A carefully curated skincare collection.",
  },
  { id: "demo-7", name: "Minimal Desk Lamp", category: "Home", price: 2190, oldPrice: 2790, image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=700", rating: 4.7, stock: 16, description: "Modern task lighting with a clean, compact silhouette." },
  { id: "demo-8", name: "Everyday Travel Watch", category: "Accessories", price: 2790, oldPrice: 3490, image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=700", rating: 4.8, stock: 14, description: "A versatile watch for work, weekends and travel." },
  { id: "demo-9", name: "Noise Cancelling Earbuds", category: "Electronics", price: 2790, oldPrice: 3590, image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=700", rating: 4.7, stock: 22, description: "Compact wireless earbuds with active noise control." },
  { id: "demo-10", name: "Linen Summer Shirt", category: "Fashion", price: 1490, oldPrice: 1890, image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=700", rating: 4.6, stock: 27, description: "Lightweight linen shirt for warm, relaxed days." },
  { id: "demo-11", name: "Portable Bluetooth Speaker", category: "Electronics", price: 3290, oldPrice: 3990, image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=700", rating: 4.8, stock: 18, description: "Rich portable sound for home and outdoor use." },
  { id: "demo-12", name: "Leather Card Holder", category: "Accessories", price: 890, oldPrice: 1190, image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=700", rating: 4.5, stock: 35, description: "Slim genuine-leather card holder with a modern finish." },
  { id: "demo-13", name: "Canvas Tote Bag", category: "Fashion", price: 990, oldPrice: 1290, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=700", rating: 4.6, stock: 30, description: "A spacious everyday tote made for work and shopping." },
  { id: "demo-14", name: "Stoneware Dinner Set", category: "Home", price: 2390, oldPrice: 2990, image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=700", rating: 4.8, stock: 11, description: "Elegant stoneware dishes for everyday dining." },
  { id: "demo-15", name: "Hydrating Face Serum", category: "Beauty", price: 1190, oldPrice: 1490, image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=700", rating: 4.7, stock: 25, description: "A lightweight serum designed to hydrate and refresh skin." },
  { id: "demo-16", name: "Mechanical Keyboard", category: "Electronics", price: 4490, oldPrice: 5290, image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=700", rating: 4.9, stock: 9, description: "Responsive mechanical keyboard for work and gaming." },
  { id: "demo-17", name: "Wool Blend Coat", category: "Fashion", price: 5990, oldPrice: 7490, image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=700", rating: 4.8, stock: 8, description: "A tailored cold-weather coat with a premium finish." },
  { id: "demo-18", name: "Digital Scent Diffuser", category: "Home", price: 1890, oldPrice: 2290, image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=700", rating: 4.6, stock: 20, description: "Quiet diffuser technology for a fragrant living space." },
  { id: "demo-19", name: "Rose Gold Sunglasses", category: "Accessories", price: 1690, oldPrice: 2190, image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=700", rating: 4.7, stock: 17, description: "Polarized sunglasses with a polished modern frame." },
  { id: "demo-20", name: "Vitamin C Cleanser", category: "Beauty", price: 790, oldPrice: 990, image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=700", rating: 4.6, stock: 40, description: "A gentle cleanser that leaves skin fresh and balanced." },
  { id: "demo-21", name: "4K Action Camera", category: "Electronics", price: 6490, oldPrice: 7990, image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=700", rating: 4.8, stock: 7, description: "Capture travel and adventure footage in high resolution." },
  { id: "demo-22", name: "Classic Denim Jacket", category: "Fashion", price: 3290, oldPrice: 3990, image: "https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?w=700", rating: 4.7, stock: 13, description: "Timeless denim with a comfortable regular fit." },
  { id: "demo-23", name: "Sculptural Table Vase", category: "Home", price: 1390, oldPrice: 1790, image: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=700", rating: 4.6, stock: 19, description: "A sculptural accent vase for shelves and tabletops." },
  { id: "demo-24", name: "Silk Hair Scrunchies", category: "Beauty", price: 590, oldPrice: 790, image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=700", rating: 4.5, stock: 50, description: "Soft silk scrunchies that reduce hair pulling." },
  { id: "demo-25", name: "Leather Crossbody Bag", category: "Accessories", price: 2490, oldPrice: 3190, image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=700", rating: 4.8, stock: 15, description: "Compact hands-free bag with organized storage." },
  { id: "demo-26", name: "Wireless Charging Pad", category: "Electronics", price: 1290, oldPrice: 1690, image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=700", rating: 4.6, stock: 29, description: "Convenient wireless charging for compatible devices." },
  { id: "demo-27", name: "Cotton Lounge Set", category: "Fashion", price: 1790, oldPrice: 2290, image: "https://images.unsplash.com/photo-1598032895397-b9472444bf93?w=700", rating: 4.7, stock: 24, description: "A soft matching set made for relaxed indoor comfort." },
  { id: "demo-28", name: "Bamboo Desk Organizer", category: "Home", price: 1090, oldPrice: 1390, image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=700", rating: 4.6, stock: 21, description: "Natural desk storage for notes, pens and accessories." },
  { id: "demo-29", name: "Nourishing Lip Balm", category: "Beauty", price: 490, oldPrice: 690, image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=700", rating: 4.5, stock: 45, description: "Moisturizing everyday balm with a smooth finish." },
  { id: "demo-30", name: "Everyday Sunglass Case", category: "Accessories", price: 690, oldPrice: 890, image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=700", rating: 4.5, stock: 38, description: "Protective hard-shell case for sunglasses and readers." },
  { id: "demo-31", name: "Smart LED Desk Light", category: "Electronics", price: 1990, oldPrice: 2490, image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=700", rating: 4.7, stock: 23, description: "Adjustable smart lighting with multiple brightness modes." },
  { id: "demo-32", name: "Premium Chino Pants", category: "Fashion", price: 2190, oldPrice: 2790, image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=700", rating: 4.7, stock: 26, description: "Comfortable chinos with a clean tapered fit." },
  { id: "demo-33", name: "Ceramic Aroma Candle", category: "Home", price: 990, oldPrice: 1290, image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=700", rating: 4.6, stock: 36, description: "A calming scented candle in a reusable ceramic vessel." },
  { id: "demo-34", name: "Gentle Facial Moisturizer", category: "Beauty", price: 1390, oldPrice: 1790, image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=700", rating: 4.8, stock: 28, description: "Daily lightweight moisture for soft, balanced skin." },
  { id: "demo-35", name: "Minimal Wristband", category: "Accessories", price: 790, oldPrice: 990, image: "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=700", rating: 4.5, stock: 33, description: "Simple wearable wristband for casual everyday style." },
  { id: "demo-36", name: "Portable Power Bank", category: "Electronics", price: 1790, oldPrice: 2290, image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=700", rating: 4.7, stock: 31, description: "High-capacity backup power for phones and tablets." },
  { id: "demo-37", name: "Knit Pullover Sweater", category: "Fashion", price: 2690, oldPrice: 3290, image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=700", rating: 4.7, stock: 17, description: "Soft knit pullover with a cozy relaxed shape." },
  { id: "demo-38", name: "Memory Foam Cushion", category: "Home", price: 890, oldPrice: 1190, image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=700", rating: 4.6, stock: 42, description: "Supportive cushion for chairs, sofas and reading corners." },
  { id: "demo-39", name: "Natural Clay Mask", category: "Beauty", price: 1090, oldPrice: 1390, image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=700", rating: 4.6, stock: 34, description: "Purifying mask for refreshed and clarified skin." },
  { id: "demo-40", name: "Stainless Steel Bottle", category: "Accessories", price: 890, oldPrice: 1190, image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=700", rating: 4.8, stock: 44, description: "Insulated bottle that keeps drinks hot or cold." },
  { id: "demo-41", name: "Smartphone Gimbal", category: "Electronics", price: 5490, oldPrice: 6790, image: "https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?w=700", rating: 4.7, stock: 10, description: "Stable smartphone mount for smooth video recording." },
  { id: "demo-42", name: "Classic Oxford Shirt", category: "Fashion", price: 1990, oldPrice: 2490, image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=700", rating: 4.7, stock: 28, description: "A crisp versatile shirt for smart casual dressing." },
  { id: "demo-43", name: "Acacia Serving Board", category: "Home", price: 1190, oldPrice: 1590, image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=700", rating: 4.6, stock: 22, description: "Natural acacia board for cheese, snacks and presentation." },
  { id: "demo-44", name: "Body Care Gift Set", category: "Beauty", price: 1890, oldPrice: 2390, image: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=700", rating: 4.8, stock: 16, description: "A coordinated set of nourishing everyday body care." },
  { id: "demo-45", name: "Braided Leather Belt", category: "Accessories", price: 1490, oldPrice: 1890, image: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=700", rating: 4.6, stock: 20, description: "Flexible braided belt with a classic metal buckle." },
  { id: "demo-46", name: "Compact Dash Camera", category: "Electronics", price: 3990, oldPrice: 4990, image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=700", rating: 4.7, stock: 12, description: "Discreet road recording with loop and motion features." },
  { id: "demo-47", name: "Premium Polo Shirt", category: "Fashion", price: 1390, oldPrice: 1790, image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=700", rating: 4.6, stock: 30, description: "Breathable polo shirt with a structured everyday fit." },
  { id: "demo-48", name: "Foldable Laundry Hamper", category: "Home", price: 790, oldPrice: 990, image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=700", rating: 4.5, stock: 26, description: "Lightweight collapsible hamper for bedrooms and laundry rooms." },
  { id: "demo-49", name: "Hydrating Sheet Masks", category: "Beauty", price: 690, oldPrice: 890, image: "https://images.unsplash.com/photo-1619451334792-150fd785ee74?w=700", rating: 4.7, stock: 48, description: "A set of soothing sheet masks for weekly skin refreshment." },
  { id: "demo-50", name: "Classic Baseball Cap", category: "Accessories", price: 790, oldPrice: 990, image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=700", rating: 4.6, stock: 40, description: "Adjustable cotton cap with an embroidered finish." },
];

type CartItem = {
  product: Product;
  quantity: number;
};

type Order = {
  id: string;
  orderNumber: string;
  customerName: string;
  phone: string;
  address: string;
  total: number;
  status: string;
};

const categories = [
  "All",
  "Electronics",
  "Fashion",
  "Home",
  "Beauty",
  "Accessories",
];

const money = (n: number) => "৳" + n.toLocaleString("en-BD");

export default function Home() {
  const [products, setProducts] = useState(initialProducts);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);

  const [page, setPage] = useState("home");
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Product | null>(null);
  const [sort, setSort] = useState("newest");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [user, setUser] = useState<{ id: string; name: string; email: string; role: "ADMIN" | "CUSTOMER" } | null>(null);
  const [loginMode, setLoginMode] = useState<"login" | "register" | "admin">("login");
  const [authForm, setAuthForm] = useState({ name: "", email: "", password: "" });

  useEffect(() => {
    async function load() {
      try {
        const [productsResponse, meResponse, ordersResponse] = await Promise.all([
          fetch("/api/products"),
          fetch("/api/auth/me"),
          fetch("/api/orders"),
        ]);
        if (productsResponse.ok) {
          const data = await productsResponse.json();
          if (Array.isArray(data.products) && data.products.length > 0) {
            setProducts(data.products.map((product: Product & { rating?: number }) => ({
              ...product,
              oldPrice: product.oldPrice || product.price,
              rating: product.rating || 5,
            })));
          }
        }
        if (meResponse.ok) {
          const data = await meResponse.json();
          setUser(data.user);
        }
        if (ordersResponse.ok) {
          const data = await ordersResponse.json();
          setOrders(data.orders.map((order: Order) => order));
        }
      } catch {
        notify("Could not load store data.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "Electronics",
    price: "",
    image: "",
    stock: "",
    description: "",
  });

  const [message, setMessage] = useState("");

  const filteredProducts = useMemo(() => {
    const result = products.filter((p) => {
      const categoryMatch =
        category === "All" || p.category === category;

      const searchMatch = p.name
        .toLowerCase()
        .includes(search.toLowerCase());

      return categoryMatch && searchMatch;
    });

    if (sort === "price_asc") return [...result].sort((a, b) => a.price - b.price);
    if (sort === "price_desc") return [...result].sort((a, b) => b.price - a.price);
    if (sort === "name") return [...result].sort((a, b) => a.name.localeCompare(b.name));
    return result;
  }, [products, category, search, sort]);

  const cartCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const subtotal = cart.reduce(
    (sum, item) =>
      sum + item.product.price * item.quantity,
    0
  );

  const shipping = subtotal >= 3000 || subtotal === 0 ? 0 : 100;
  const total = subtotal + shipping;

  function notify(text: string) {
    setMessage(text);
    window.setTimeout(() => setMessage(""), 2500);
  }

  function addToCart(product: Product) {
    setCart((old) => {
      const existing = old.find(
        (item) => item.product.id === product.id
      );

      if (existing) {
        return old.map((item) =>
          item.product.id === product.id
            ? {
                ...item,
                quantity: Math.min(
                  item.quantity + 1,
                  product.stock
                ),
              }
            : item
        );
      }

      return [...old, { product, quantity: 1 }];
    });

    notify("Product added to cart!");
  }

  function changeQuantity(id: string, amount: number) {
    setCart((old) =>
      old
        .map((item) =>
          item.product.id === id
            ? {
                ...item,
                quantity: Math.min(
                  item.product.stock,
                  item.quantity + amount
                ),
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function removeFromCart(id: string) {
    setCart((old) =>
      old.filter((item) => item.product.id !== id)
    );
  }

  function toggleWishlist(id: string) {
    setWishlist((old) =>
      old.includes(id)
        ? old.filter((x) => x !== id)
        : [...old, id]
    );
  }

  async function placeOrder(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!cart.length || submitting) return;
    setSubmitting(true);

    try {
      const idempotencyKey = `UN-${crypto.randomUUID()}`;
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Idempotency-Key": idempotencyKey,
        },
        body: JSON.stringify({
          customerName: customer.name,
          phone: customer.phone,
          address: customer.address,
          items: cart.map((item) => ({
            productId: item.product.id,
            quantity: item.quantity,
          })),
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        notify(data.error || "Could not place order.");
        return;
      }

      setOrders((old) => [data.order, ...old]);
      setCart([]);
      setCustomer({ name: "", phone: "", address: "" });
      setPage("success");
    } catch {
      notify("Could not place order.");
    } finally {
      setSubmitting(false);
    }
  }

  async function addProduct(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const response = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: newProduct.name,
        category: newProduct.category,
        price: Number(newProduct.price),
        oldPrice: Number(newProduct.price),
        image: newProduct.image,
        stock: Number(newProduct.stock),
        description: newProduct.description,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      notify(data.error || "Could not add product.");
      return;
    }

    setProducts((old) => [{ ...data.product, rating: 5, oldPrice: data.product.oldPrice || data.product.price }, ...old]);
    setNewProduct({ name: "", category: "Electronics", price: "", image: "", stock: "", description: "" });
    notify("New product added!");
  }

  async function deleteProduct(id: string) {
    const response = await fetch(`/api/products/${id}`, { method: "DELETE" });
    if (!response.ok) {
      notify("Could not delete the product.");
      return;
    }
    setProducts((old) => old.filter((product) => product.id !== id));
    notify("Product deleted.");
  }

  async function updateOrderStatus(id: string, status: string) {
    const response = await fetch(`/api/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (!response.ok) {
      notify("Could not update order status.");
      return;
    }
    setOrders((old) => old.map((order) => order.id === id ? { ...order, status } : order));
  }

  async function submitAuth(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const endpoint =
        loginMode === "register"
          ? "/api/auth/register"
          : loginMode === "admin"
            ? "/api/auth/admin-login"
            : "/api/auth/login";
      const body = loginMode === "register"
        ? authForm
        : { email: authForm.email, password: authForm.password };
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (!response.ok) {
        notify(data.error || "Authentication failed.");
        return;
      }
      setUser(data.user);
      setAuthForm({ name: "", email: "", password: "" });
      setPage(data.user.role === "ADMIN" ? "admin" : "account");
      notify(
        loginMode === "register"
          ? "Account created!"
          : loginMode === "admin"
            ? "Admin login successful!"
            : "Welcome back!"
      );
    } catch {
      notify("Authentication failed.");
    } finally {
      setSubmitting(false);
    }
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    setPage("home");
  }

  const buttonClass =
    "rounded-full bg-[#173c2b] px-6 py-3 text-sm font-semibold text-white hover:bg-green-800 transition";

  function Header() {
    return (
      <header className="sticky top-0 z-40 border-b bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">
          <button
            onClick={() => setPage("home")}
            className="text-2xl font-black tracking-tight"
          >
            URBANNEST<span className="text-green-600">.</span>
          </button>

          <nav className="hidden items-center gap-7 text-sm md:flex">
            <button onClick={() => setPage("home")}>Home</button>
            <button onClick={() => setPage("shop")}>Shop</button>
            <button onClick={() => {
              if (user?.role !== "ADMIN") setLoginMode("admin");
              setPage(user?.role === "ADMIN" ? "admin" : "login");
            }}>
              {user?.role === "ADMIN" ? "Admin" : "Admin Login"}
            </button>
            <button onClick={() => setPage(user ? "account" : "login")}>
              {user ? "Account" : "Sign In"}
            </button>
          </nav>

          <div className="flex items-center gap-4">
            <button onClick={() => setPage("wishlist")}>
              ♡ {wishlist.length}
            </button>

            <button
              onClick={() => setPage("cart")}
              className="rounded-full bg-[#173c2b] px-4 py-2 text-sm text-white"
            >
              Cart ({cartCount})
            </button>
            <button
              onClick={() => setMobileMenu((open) => !open)}
              className="text-2xl md:hidden"
              aria-label="Toggle navigation"
            >
              ☰
            </button>
          </div>
        </div>
        {mobileMenu && (
          <nav className="flex flex-col gap-4 border-t px-5 py-5 text-sm md:hidden">
            <button onClick={() => { setPage("home"); setMobileMenu(false); }}>Home</button>
            <button onClick={() => { setPage("shop"); setMobileMenu(false); }}>Shop</button>
            <button onClick={() => { setPage(user?.role === "ADMIN" ? "admin" : "login"); setLoginMode("admin"); setMobileMenu(false); }}>
              {user?.role === "ADMIN" ? "Admin" : "Admin Login"}
            </button>
            <button onClick={() => { setPage(user ? "account" : "login"); setMobileMenu(false); }}>
              {user ? "Account" : "Sign In"}
            </button>
          </nav>
        )}
      </header>
    );
  }

  function ProductCard({ product }: { product: Product }) {
    return (
      <article className="group overflow-hidden">
        <div className="relative overflow-hidden rounded-2xl bg-gray-100">
          <button
            onClick={() => {
              setSelected(product);
              setPage("details");
            }}
            className="block w-full"
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
            />
          </button>

          <button
            onClick={() => toggleWishlist(product.id)}
            className="absolute right-3 top-3 h-10 w-10 rounded-full bg-white text-xl"
          >
            {wishlist.includes(product.id) ? "♥" : "♡"}
          </button>

          <button
            onClick={() => addToCart(product)}
            disabled={product.stock === 0}
            className="absolute bottom-3 left-3 right-3 rounded-full bg-[#173c2b] py-3 text-sm text-white opacity-0 transition group-hover:opacity-100 disabled:opacity-100"
          >
            {product.stock > 0 ? "+ Add to Cart" : "Out of Stock"}
          </button>
        </div>

        <div className="pt-4">
          <p className="text-xs text-gray-400">
            {product.category}
          </p>

          <button
            onClick={() => {
              setSelected(product);
              setPage("details");
            }}
            className="mt-2 text-left text-sm font-bold"
          >
            {product.name}
          </button>

          <p className="mt-2 text-sm text-amber-500">
            ★★★★★ <span className="text-gray-500">{product.rating}</span>
          </p>

          <div className="mt-2 flex items-center gap-2">
            <strong>{money(product.price)}</strong>
            <del className="text-xs text-gray-400">
              {money(product.oldPrice)}
            </del>
          </div>

          <p className="mt-2 text-xs text-gray-500">
            Stock: {product.stock}
          </p>

          <button
            onClick={() => addToCart(product)}
            disabled={product.stock === 0}
            className="mt-3 w-full rounded-full border border-gray-200 py-2 text-xs font-semibold hover:bg-green-50 disabled:opacity-50 md:hidden"
          >
            Add to Cart
          </button>
        </div>
      </article>
    );
  }

  function ProductsSection() {
    return (
      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-bold tracking-widest text-green-800">
              OUR COLLECTION
            </p>
            <h2 className="mt-3 text-3xl font-bold">
              Discover Products
            </h2>
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="rounded-full border px-5 py-3 text-sm outline-none focus:border-green-800 sm:w-64"
            />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-full border px-4 py-3 text-sm"
              aria-label="Sort products"
            >
              <option value="newest">Newest</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>
        </div>

        <div className="my-8 flex flex-wrap gap-2">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`rounded-full px-5 py-3 text-xs ${
                category === item
                  ? "bg-[#173c2b] text-white"
                  : "bg-gray-100"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
          {loading ? (
            <p className="col-span-full py-20 text-center text-gray-500">Loading products...</p>
          ) : filteredProducts.map((product) => (
            <div key={product.id}>{ProductCard({ product })}</div>
          ))}
        </div>

        {!loading && filteredProducts.length === 0 && (
          <p className="py-20 text-center text-gray-500">
            No products found.
          </p>
        )}
      </section>
    );
  }

  function HomePage() {
    return (
      <>
        <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-20 md:grid-cols-2">
          <div>
            <span className="text-xs font-bold tracking-widest text-green-800">
              DISCOVER YOUR NEXT FAVORITE
            </span>

            <h1 className="mt-6 text-5xl font-bold leading-tight md:text-7xl">
              Shop smarter.
              <br />
              Live <span className="text-green-700">better.</span>
            </h1>

            <p className="mt-6 max-w-md leading-7 text-gray-500">
              Discover premium products for your everyday lifestyle.
              Quality, style and value in one destination.
            </p>

            <button
              onClick={() => setPage("shop")}
              className={`${buttonClass} mt-8`}
            >
              Explore Collection →
            </button>
          </div>

          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1100"
            alt="Shopping collection"
            className="h-[420px] w-full rounded-3xl object-cover"
          />
        </section>

        <section className="bg-[#f7f8f5] px-5 py-14">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-8 text-center text-3xl font-bold">
              Shop by Category
            </h2>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
              {categories.map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setCategory(item);
                    setPage("shop");
                  }}
                  className="rounded-2xl bg-white p-7 text-sm font-semibold shadow-sm hover:bg-green-50"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </section>

        {ProductsSection()}

        <section className="mx-5 mb-16 rounded-3xl bg-[#173c2b] px-8 py-16 text-center text-white">
          <h2 className="text-3xl font-bold md:text-5xl">
            Style meets value.
          </h2>
          <p className="mt-4 text-sm text-gray-300">
            Discover something special today.
          </p>
          <button
            onClick={() => setPage("shop")}
            className="mt-7 rounded-full bg-white px-8 py-3 text-sm font-bold text-green-900"
          >
            Shop Now →
          </button>
        </section>
      </>
    );
  }

  function DetailsPage() {
    if (!selected) return null;

    return (
      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-2">
        <img
          src={selected.image}
          alt={selected.name}
          className="h-[450px] w-full rounded-3xl object-cover"
        />

        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-green-800">
            {selected.category}
          </p>

          <h1 className="mt-4 text-4xl font-bold">
            {selected.name}
          </h1>

          <p className="mt-4 text-amber-500">
            ★★★★★ <span className="text-gray-500">{selected.rating}</span>
          </p>

          <div className="mt-7 flex items-center gap-3">
            <span className="text-3xl font-bold">
              {money(selected.price)}
            </span>
            <del className="text-gray-400">
              {money(selected.oldPrice)}
            </del>
          </div>

          <p className="mt-7 leading-8 text-gray-500">
            {selected.description}
          </p>

          <p className="mt-6 text-sm">
            Available stock: <strong>{selected.stock}</strong>
          </p>

          <button
            disabled={selected.stock === 0}
            onClick={() => addToCart(selected)}
            className={`${buttonClass} mt-8 disabled:opacity-50`}
          >
            Add to Cart
          </button>

          <button
            onClick={() => setPage("shop")}
            className="ml-3 rounded-full border px-6 py-3 text-sm"
          >
            Back to Shop
          </button>
        </div>
      </section>
    );
  }

  function CartPage() {
    return (
      <section className="mx-auto max-w-6xl px-5 py-16">
        <h1 className="mb-10 text-3xl font-bold">
          Shopping Cart
        </h1>

        {cart.length === 0 ? (
          <div className="rounded-2xl bg-gray-50 py-20 text-center">
            <p className="text-lg font-semibold">
              Your cart is empty.
            </p>
            <button
              onClick={() => setPage("shop")}
              className={`${buttonClass} mt-6`}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid gap-10 md:grid-cols-[1fr_350px]">
            <div className="space-y-5">
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex flex-wrap items-center gap-4 rounded-2xl border p-4"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="h-24 w-24 rounded-xl object-cover"
                  />

                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold">
                      {item.product.name}
                    </h3>
                    <p className="mt-2 text-sm text-green-800">
                      {money(item.product.price)}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => changeQuantity(item.product.id, -1)}
                      className="h-8 w-8 rounded-full border"
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      disabled={item.quantity >= item.product.stock}
                      onClick={() => changeQuantity(item.product.id, 1)}
                      className="h-8 w-8 rounded-full border disabled:opacity-40"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-sm text-red-500"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="h-fit rounded-2xl bg-gray-50 p-7">
              <h2 className="text-xl font-bold">Order Summary</h2>

              <div className="mt-7 flex justify-between text-sm">
                <span>Subtotal</span>
                <span>{money(subtotal)}</span>
              </div>

              <div className="mt-4 flex justify-between text-sm">
                <span>Delivery</span>
                <span>{shipping === 0 ? "FREE" : money(shipping)}</span>
              </div>

              <div className="my-6 border-t" />

              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>{money(total)}</span>
              </div>

              <button
                onClick={() => setPage("checkout")}
                className={`${buttonClass} mt-8 w-full`}
              >
                Proceed to Checkout →
              </button>
            </div>
          </div>
        )}
      </section>
    );
  }

  function CheckoutPage() {
    return (
      <section className="mx-auto max-w-5xl px-5 py-16">
        <h1 className="mb-10 text-3xl font-bold">
          Checkout
        </h1>

        <div className="grid gap-10 md:grid-cols-2">
          <form
            onSubmit={placeOrder}
            className="space-y-5 rounded-2xl border p-7"
          >
            <h2 className="text-xl font-bold">
              Delivery Information
            </h2>

            <input
              required
              value={customer.name}
              onChange={(e) =>
                setCustomer({ ...customer, name: e.target.value })
              }
              placeholder="Full Name"
              className="w-full rounded-xl border p-4 text-sm"
            />

            <input
              required
              type="tel"
              value={customer.phone}
              onChange={(e) =>
                setCustomer({ ...customer, phone: e.target.value })
              }
              placeholder="Phone Number"
              className="w-full rounded-xl border p-4 text-sm"
            />

            <textarea
              required
              value={customer.address}
              onChange={(e) =>
                setCustomer({ ...customer, address: e.target.value })
              }
              placeholder="Full Delivery Address"
              rows={4}
              className="w-full rounded-xl border p-4 text-sm"
            />

            <div className="rounded-xl bg-green-50 p-4 text-sm">
              Payment Method: Cash on Delivery
            </div>

            <button
              disabled={cart.length === 0 || submitting}
              className={`${buttonClass} w-full disabled:opacity-50`}
            >
              {submitting ? "Placing Order..." : `Place Order · ${money(total)}`}
            </button>
          </form>

          <div className="h-fit rounded-2xl bg-gray-50 p-7">
            <h2 className="text-xl font-bold">Your Order</h2>

            {cart.map((item) => (
              <div
                key={item.product.id}
                className="mt-5 flex justify-between gap-3 text-sm"
              >
                <span>
                  {item.product.name} × {item.quantity}
                </span>
                <strong>
                  {money(item.product.price * item.quantity)}
                </strong>
              </div>
            ))}

            <div className="my-6 border-t" />

            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>{money(total)}</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  function SuccessPage() {
    return (
      <section className="mx-auto max-w-xl px-5 py-28 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-4xl text-green-800">
          ✓
        </div>

        <h1 className="mt-7 text-3xl font-bold">
          Order Placed Successfully!
        </h1>

        <p className="mt-4 leading-7 text-gray-500">
          Thank you for shopping with URBANNEST.
          Your order has been recorded securely.
        </p>

        <button
          onClick={() => setPage("home")}
          className={`${buttonClass} mt-8`}
        >
          Continue Shopping
        </button>
      </section>
    );
  }

  function AdminPage() {
    if (user?.role !== "ADMIN") {
      return (
        <section className="mx-auto max-w-xl px-5 py-24 text-center">
          <h1 className="text-3xl font-bold">Admin access required</h1>
          <p className="mt-4 text-gray-500">Sign in with an administrator account to manage this store.</p>
          <button
            onClick={() => {
              setLoginMode("admin");
              setPage("login");
            }}
            className={`${buttonClass} mt-7`}
          >
            Admin Login
          </button>
        </section>
      );
    }

    const revenue = orders.reduce(
      (sum, order) => sum + order.total,
      0
    );

    return (
      <section className="mx-auto max-w-7xl px-5 py-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold tracking-widest text-green-800">
              STORE MANAGEMENT
            </p>
            <h1 className="mt-2 text-3xl font-bold">
              Admin Dashboard
            </h1>
          </div>

          <button
            onClick={() => setPage("home")}
            className="rounded-full border px-5 py-3 text-sm"
          >
            View Store
          </button>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Total Products", products.length],
            ["Total Orders", orders.length],
            ["Revenue", money(revenue)],
            [
              "Total Stock",
              products.reduce((sum, p) => sum + p.stock, 0),
            ],
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl bg-[#f5f7f3] p-7">
              <p className="text-sm text-gray-500">{label}</p>
              <h2 className="mt-3 text-3xl font-bold">{value}</h2>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[350px_1fr]">
          <form
            onSubmit={addProduct}
            className="h-fit space-y-4 rounded-2xl border p-6"
          >
            <h2 className="text-xl font-bold">Add New Product</h2>

            <input
              required
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              placeholder="Product Name"
              className="w-full rounded-xl border p-3 text-sm"
            />

            <select
              value={newProduct.category}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  category: e.target.value,
                })
              }
              className="w-full rounded-xl border p-3 text-sm"
            >
              {categories.slice(1).map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>

            <input
              required
              type="number"
              min="1"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
              placeholder="Price (BDT)"
              className="w-full rounded-xl border p-3 text-sm"
            />

            <input
              required
              type="number"
              min="0"
              value={newProduct.stock}
              onChange={(e) =>
                setNewProduct({ ...newProduct, stock: e.target.value })
              }
              placeholder="Stock Quantity"
              className="w-full rounded-xl border p-3 text-sm"
            />

            <input
              required
              type="url"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
              placeholder="Product Image URL"
              className="w-full rounded-xl border p-3 text-sm"
            />

            <textarea
              required
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  description: e.target.value,
                })
              }
              placeholder="Product Description"
              className="w-full rounded-xl border p-3 text-sm"
            />

            <button className={`${buttonClass} w-full`}>
              + Add Product
            </button>
          </form>

          <div className="min-w-0">
            <h2 className="mb-5 text-xl font-bold">
              Product Management
            </h2>

            <div className="overflow-x-auto rounded-2xl border">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-4">Product</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Stock</th>
                    <th className="p-4">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {products.map((p) => (
                    <tr key={p.id} className="border-t">
                      <td className="p-4 font-medium">{p.name}</td>
                      <td className="p-4">{money(p.price)}</td>
                      <td className="p-4">{p.stock}</td>
                      <td className="p-4">
                        <button
                          onClick={() => deleteProduct(p.id)}
                          className="text-red-500"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 className="mb-5 mt-12 text-xl font-bold">
              Order Management
            </h2>

            {orders.length === 0 ? (
              <p className="rounded-xl bg-gray-50 p-7 text-sm text-gray-500">
                No orders yet.
              </p>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="rounded-2xl border p-5"
                  >
                    <div className="flex flex-wrap justify-between gap-3">
                      <div>
                        <p className="font-bold">{order.customerName}</p>
                        <p className="mt-1 text-xs text-gray-500">
                          {order.phone}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          {order.address}
                        </p>
                      </div>

                      <div>
                        <p className="font-bold">
                          {money(order.total)}
                        </p>
                        <select
                          value={order.status}
                          onChange={(e) =>
                            updateOrderStatus(order.id, e.target.value)
                          }
                          className="mt-3 rounded-lg border p-2 text-xs"
                        >
                          <option value="PENDING">Pending</option>
                          <option value="CONFIRMED">Confirmed</option>
                          <option value="PROCESSING">Processing</option>
                          <option value="SHIPPED">Shipped</option>
                          <option value="DELIVERED">Delivered</option>
                          <option value="CANCELLED">Cancelled</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  function WishlistPage() {
    const savedProducts = products.filter((p) =>
      wishlist.includes(p.id)
    );

    return (
      <section className="mx-auto max-w-7xl px-5 py-16">
        <h1 className="mb-10 text-3xl font-bold">My Wishlist</h1>

        {savedProducts.length ? (
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {savedProducts.map((p) => (
              <div key={p.id}>{ProductCard({ product: p })}</div>
            ))}
          </div>
        ) : (
          <p className="py-16 text-center text-gray-500">
            Your wishlist is empty.
          </p>
        )}
      </section>
    );
  }

  function LoginPage() {
    return (
      <section className="mx-auto max-w-md px-5 py-16">
        <div className="rounded-3xl border p-7 shadow-sm">
          <div className="mb-7 flex rounded-full bg-gray-100 p-1">
            {(["login", "register", "admin"] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setLoginMode(mode)}
                className={`flex-1 rounded-full py-2 text-sm font-semibold ${loginMode === mode ? "bg-white shadow" : "text-gray-500"}`}
              >
                {mode === "login" ? "Sign In" : mode === "register" ? "Register" : "Admin"}
              </button>
            ))}
          </div>
          <h1 className="text-2xl font-bold">
            {loginMode === "login"
              ? "Welcome back"
              : loginMode === "register"
                ? "Create your account"
                : "Admin sign in"}
          </h1>
          <form onSubmit={submitAuth} className="mt-6 space-y-4">
            {loginMode === "register" && (
              <input
                required
                value={authForm.name}
                onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })}
                placeholder="Full name"
                className="w-full rounded-xl border p-4 text-sm"
              />
            )}
            <input
              required
              type="email"
              value={authForm.email}
              onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
              placeholder="Email address"
              className="w-full rounded-xl border p-4 text-sm"
            />
            <input
              required
              type="password"
              minLength={loginMode === "register" ? 8 : 1}
              value={authForm.password}
              onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
              placeholder="Password"
              className="w-full rounded-xl border p-4 text-sm"
            />
            <button disabled={submitting} className={`${buttonClass} w-full disabled:opacity-50`}>
              {submitting
                ? "Please wait..."
                : loginMode === "login"
                  ? "Sign In"
                  : loginMode === "register"
                    ? "Create Account"
                    : "Sign In as Admin"}
            </button>
          </form>
        </div>
      </section>
    );
  }

  function AccountPage() {
    if (!user) return null;
    return (
      <section className="mx-auto max-w-5xl px-5 py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold tracking-widest text-green-800">MY ACCOUNT</p>
            <h1 className="mt-2 text-3xl font-bold">{user.name}</h1>
            <p className="mt-2 text-sm text-gray-500">{user.email}</p>
          </div>
          <button onClick={logout} className="rounded-full border px-5 py-3 text-sm">Log Out</button>
        </div>
        <h2 className="mt-10 text-xl font-bold">Order History</h2>
        {orders.length === 0 ? (
          <p className="mt-5 rounded-xl bg-gray-50 p-7 text-sm text-gray-500">You have no orders yet.</p>
        ) : (
          <div className="mt-5 space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="flex flex-wrap justify-between gap-4 rounded-2xl border p-5">
                <div>
                  <p className="font-bold">{order.orderNumber}</p>
                  <p className="mt-1 text-xs text-gray-500">{order.status}</p>
                </div>
                <p className="font-bold">{money(order.total)}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    );
  }

  return (
    <main className="min-h-screen bg-white text-[#17211b]">
      <div className="bg-[#173c2b] py-2 text-center text-xs text-white">
        Free delivery on orders over ৳3,000
      </div>

      {Header()}

      {message && (
        <div className="fixed right-5 top-24 z-50 rounded-xl bg-green-800 px-6 py-4 text-sm text-white shadow-xl">
          {message}
        </div>
      )}

      {page === "home" && HomePage()}
      {page === "shop" && ProductsSection()}
      {page === "details" && DetailsPage()}
      {page === "cart" && CartPage()}
      {page === "checkout" && CheckoutPage()}
      {page === "success" && SuccessPage()}
      {page === "admin" && AdminPage()}
      {page === "wishlist" && WishlistPage()}
      {page === "login" && LoginPage()}
      {page === "account" && AccountPage()}

      <footer className="bg-[#14251c] px-5 py-12 text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-8">
          <div>
            <h2 className="text-2xl font-black">
              URBANNEST<span className="text-green-400">.</span>
            </h2>
            <p className="mt-3 text-sm text-gray-400">
              Shop smarter. Live better.
            </p>
          </div>

          <div className="flex flex-wrap gap-5 text-sm text-gray-300">
            <button onClick={() => setPage("home")}>Home</button>
            <button onClick={() => setPage("shop")}>Shop</button>
            <button onClick={() => setPage("cart")}>Cart</button>
            <button onClick={() => {
              if (user?.role !== "ADMIN") setLoginMode("admin");
              setPage(user?.role === "ADMIN" ? "admin" : "login");
            }}>Admin</button>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-6 text-center text-xs text-gray-500">
          © 2026 URBANNEST. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
