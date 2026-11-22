
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

const money = (n: number) => "à§³" + n.toLocaleString("en-BD");

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);

  const [page, setPage] = useState("home");
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Product | null>(null);
  const [sort, setSort] = useState("newest");
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [user, setUser] = useState<{ id: string; name: string; email: string; role: "ADMIN" | "CUSTOMER" } | null>(null);
  const [loginMode, setLoginMode] = useState<"login" | "register" | "admin">("login");
  const [authForm, setAuthForm] = useState({ name: "", email: "", password: "" });

  async function loadStoreData() {
    setLoading(true);
    setLoadError("");

    try {
      const [productsResponse, meResponse, ordersResponse] = await Promise.all([
        fetch("/api/products", { cache: "no-store" }),
        fetch("/api/auth/me", { cache: "no-store" }),
        fetch("/api/orders", { cache: "no-store" }),
      ]);

      if (!productsResponse.ok) {
        const data = await productsResponse.json().catch(() => null);
        throw new Error(data?.error || "Could not load products.");
      }

      const productsData = await productsResponse.json();
      setProducts(
        (productsData.products as Array<Product & { rating?: number }>).map((product) => ({
          ...product,
          oldPrice: product.oldPrice || product.price,
          rating: product.rating || 5,
        }))
      );

      if (meResponse.ok) {
        const data = await meResponse.json();
        setUser(data.user);
      } else {
        setUser(null);
      }

      if (ordersResponse.ok) {
        const data = await ordersResponse.json();
        setOrders(data.orders);
      } else {
        setOrders([]);
      }
    } catch (error) {
      setProducts([]);
      setLoadError(error instanceof Error ? error.message : "Could not load store data.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadStoreData();
    }, 0);
    return () => window.clearTimeout(timer);
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
      const idempotencyKey = `NX-${crypto.randomUUID()}`;
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
            NEXORA<span className="text-green-600">.</span>
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
              â™¡ {wishlist.length}
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
              â˜°
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
            {wishlist.includes(product.id) ? "â™¥" : "â™¡"}
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
            â˜…â˜…â˜…â˜…â˜… <span className="text-gray-500">{product.rating}</span>
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
            <>
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="h-72 animate-pulse rounded-2xl bg-gray-100" />
              ))}
            </>
          ) : loadError ? (
            <div className="col-span-full rounded-2xl border border-red-200 bg-red-50 px-6 py-12 text-center">
              <p className="font-semibold text-red-700">{loadError}</p>
              <button
                type="button"
                onClick={() => void loadStoreData()}
                className="mt-4 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white"
              >
                Retry
              </button>
            </div>
          ) : filteredProducts.map((product) => (
            <div key={product.id}>{ProductCard({ product })}</div>
          ))}
        </div>

        {!loading && !loadError && filteredProducts.length === 0 && (
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
              Explore Collection â†’
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
            Shop Now â†’
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
            â˜…â˜…â˜…â˜…â˜… <span className="text-gray-500">{selected.rating}</span>
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
                Proceed to Checkout â†’
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
              {submitting ? "Placing Order..." : `Place Order Â· ${money(total)}`}
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
                  {item.product.name} Ã— {item.quantity}
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
          âœ“
        </div>

        <h1 className="mt-7 text-3xl font-bold">
          Order Placed Successfully!
        </h1>

        <p className="mt-4 leading-7 text-gray-500">
          Thank you for shopping with NEXORA.
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
        Free delivery on orders over à§³3,000
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
              NEXORA<span className="text-green-400">.</span>
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
          Â© 2026 NEXORA. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
