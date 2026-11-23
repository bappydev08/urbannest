export const formatTaka = (n) => "৳" + Number(n).toLocaleString("en-US");
export const productImg = (kw, id, w = 800, h = 1000) =>
  `https://loremflickr.com/${w}/${h}/${kw}?lock=${id}`;
