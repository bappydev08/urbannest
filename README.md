# NEXORA

Premium Next.js 16 ecommerce storefront with Prisma and PostgreSQL.

## Requirements

- Node.js 20+
- PostgreSQL 14+
- npm

## Setup

```powershell
cd nexora-app
Copy-Item .env.example .env
npm install
npx prisma generate
npx prisma migrate deploy
npm run db:seed
npm run dev
```

Open http://localhost:3000.

For development migrations, use `npm run db:migrate` instead of `prisma migrate deploy`.

## Environment variables

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `AUTH_SECRET` | Random secret of at least 32 characters |
| `ADMIN_NAME` | Seeded admin display name |
| `ADMIN_EMAIL` | Seeded admin email |
| `ADMIN_PASSWORD` | Seeded admin password (12+ characters) |
| `DELIVERY_CHARGE` | Delivery charge in BDT (default 100) |
| `FREE_DELIVERY_MINIMUM` | Minimum subtotal for free delivery (default 3000) |

Never commit `.env` or production secrets.

## API

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`
- `GET /api/products`
- `POST /api/products`
- `PATCH /api/products/[id]`
- `DELETE /api/products/[id]`
- `POST /api/orders`
- `GET /api/orders`
- `PATCH /api/orders/[id]`

Product mutations and order administration require an authenticated `ADMIN` cookie. Customer order listing is restricted to the signed-in customer.

## Production

1. Configure `.env` and a managed PostgreSQL database.
2. Run `npx prisma migrate deploy`.
3. Run `npm run db:seed`.
4. Set a strong random `AUTH_SECRET`.
5. Set `NODE_ENV=production` and deploy over HTTPS.
6. Configure database backups and log/monitoring infrastructure.

Cash on Delivery is the only implemented payment flow. Online payment providers require real merchant credentials and are intentionally unavailable.
