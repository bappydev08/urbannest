# UrbanNest Landing

Premium e-commerce style landing site: smooth scroll, animated pages, static product data.
Backend, admin panel ba login nei.

## Stack
- React 19 + Vite
- Tailwind CSS v4
- Framer Motion (page transition, reveal, hover animation)
- Lenis (smooth scroll)
- React Router (multi-page)

## Run locally
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
npm run preview
```

## Product data
Product gulo `src/data/products.json` e ache. Notun product add korte shudhu ei file e entry dibe:
`id, name, category, price, oldPrice, image, description, badge`

## Pages
- `/` Home (hero, category, featured, offer banner)
- `/shop` Collection (filter, sort)
- `/product/:id` Product detail
- `/cart` Cart (browser e save hoy)
- `/about`, `/contact`

## Deploy
GitHub e push korar por Vercel e "Add New Project" theke repo select koro. Framework preset e "Vite" thakbe.
