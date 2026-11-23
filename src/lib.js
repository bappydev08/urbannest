export const formatTaka = (n) => "৳" + Number(n).toLocaleString("en-US");

// Images are served from this project's public/assets folder; no remote image API is used.
export const productImg = (_keyword, id) => {
  const filenames = {
    1: "product-cleanser.jpg",
    2: "product-serum.jpg",
    3: "product-moisturizer.jpg",
    4: "product-lipstick.jpg",
    5: "product-body-lotion.jpg",
    6: "product-shampoo.jpg",
    7: "product-sunscreen.jpg",
    8: "product-gift-set.jpg",
  };
  return `/assets/${filenames[id] || "hero-beauty.jpg"}`;
};
