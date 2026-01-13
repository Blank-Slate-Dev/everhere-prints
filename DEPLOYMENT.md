# Ever Here Prints - Vercel Deployment Guide

## Prerequisites

- [Node.js](https://nodejs.org/) 18.x or higher
- [Vercel account](https://vercel.com/signup)
- [Stripe account](https://dashboard.stripe.com/register) with API keys
- [Mapbox account](https://account.mapbox.com/auth/signup/) with access token

---

## Quick Start (Vercel CLI)

### 1. Install Vercel CLI

```bash
npm install -g vercel
```

### 2. Login to Vercel

```bash
vercel login
```

### 3. Deploy

```bash
# First deployment (will prompt for configuration)
vercel

# Production deployment
vercel --prod
```

---

## Detailed Deployment Steps

### Step 1: Prepare Your Repository

1. Ensure all code is committed and pushed to GitHub/GitLab/Bitbucket
2. Copy `.env.example` to `.env.local` for local testing
3. Verify the build works locally:
   ```bash
   npm run build
   npm run start
   ```

### Step 2: Connect to Vercel

#### Option A: Vercel Dashboard (Recommended)

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click "Import Project"
3. Select your Git provider and repository
4. Vercel will auto-detect Next.js settings

#### Option B: Vercel CLI

```bash
vercel link
```

### Step 3: Configure Environment Variables

In Vercel Dashboard: **Project Settings > Environment Variables**

Add the following variables:

| Variable | Description | Required |
|----------|-------------|----------|
| `ADMIN_USERNAME` | Admin panel login username | Yes |
| `ADMIN_PASSWORD` | Admin panel login password (strong!) | Yes |
| `JWT_SECRET` | JWT signing secret (64+ chars) | Yes |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | Yes |
| `STRIPE_SECRET_KEY` | Stripe secret key | Yes |
| `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN` | Mapbox access token | Yes |

#### Generate a Secure JWT Secret

Run this command and copy the output:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Or on Linux/macOS:

```bash
openssl rand -hex 64
```

### Step 4: Deploy

Click "Deploy" in the Vercel dashboard, or run:

```bash
vercel --prod
```

---

## Post-Deployment Checklist

### Immediate Verification

- [ ] Site loads without errors
- [ ] Homepage displays correctly
- [ ] Star map creator works with Mapbox
- [ ] Admin login at `/admin` works
- [ ] Product pages load properly

### Stripe Configuration

1. Go to [Stripe Dashboard > Webhooks](https://dashboard.stripe.com/webhooks)
2. Add endpoint: `https://your-domain.vercel.app/api/stripe/webhook`
3. Select events to listen for:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
4. Copy the webhook signing secret
5. Add `STRIPE_WEBHOOK_SECRET` to Vercel environment variables
6. Redeploy for the new variable to take effect

### Production Keys

- [ ] Switch Stripe keys from `test` to `live` mode
- [ ] Verify Mapbox token has appropriate scopes
- [ ] Change admin credentials from defaults

### Performance

- [ ] Enable Vercel Analytics (already in dependencies)
- [ ] Enable Speed Insights (already in dependencies)
- [ ] Test site speed with [PageSpeed Insights](https://pagespeed.web.dev/)

---

## Environment-Specific Deployments

### Preview Deployments

Every pull request automatically gets a preview deployment. Configure preview-specific variables:

1. In Vercel Dashboard > Environment Variables
2. Add variables with "Preview" environment selected
3. Use Stripe test keys for preview deployments

### Production vs Preview

| Environment | Stripe Mode | URL Pattern |
|-------------|-------------|-------------|
| Production | Live keys | `your-domain.com` |
| Preview | Test keys | `*.vercel.app` |

---

## Custom Domain Setup

1. Go to **Project Settings > Domains**
2. Add your custom domain
3. Configure DNS:
   - For apex domain: Add `A` record pointing to `76.76.21.21`
   - For subdomain: Add `CNAME` record pointing to `cname.vercel-dns.com`
4. Wait for SSL certificate provisioning (automatic)

---

## Troubleshooting

### Build Fails

```bash
# Check build locally first
npm run build

# View detailed logs
vercel logs
```

**Common Issues:**

| Error | Solution |
|-------|----------|
| `Module not found` | Run `npm install` and commit `package-lock.json` |
| `Type errors` | Fix TypeScript errors or check `tsconfig.json` |
| `Out of memory` | Contact Vercel support or optimize build |

### Environment Variables Not Working

1. Ensure variable names match exactly (case-sensitive)
2. Variables starting with `NEXT_PUBLIC_` are exposed to browser
3. Redeploy after adding new variables
4. Check for typos in `.env.example` vs Vercel dashboard

### API Routes Return 500

1. Check Vercel function logs: **Project > Deployments > Functions**
2. Verify all required env variables are set
3. Check for missing dependencies in `package.json`

### Stripe Payments Failing

1. Verify you're using correct keys (test vs live)
2. Check webhook endpoint is configured
3. Ensure `STRIPE_SECRET_KEY` is set in Vercel
4. Check Stripe dashboard for error logs

### Mapbox Not Loading

1. Verify `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN` is set
2. Check token scopes include required permissions
3. Verify token isn't restricted to specific URLs

### Admin Login Not Working

1. Verify `ADMIN_USERNAME` and `ADMIN_PASSWORD` are set
2. Verify `JWT_SECRET` is set (required for auth)
3. Check browser console for errors
4. Clear cookies and try again

---

## Useful Commands

```bash
# View deployment status
vercel ls

# View logs
vercel logs

# Pull environment variables locally
vercel env pull

# Rollback to previous deployment
vercel rollback

# View project info
vercel inspect
```

---

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Stripe Documentation](https://stripe.com/docs)
- [Mapbox Documentation](https://docs.mapbox.com/)
