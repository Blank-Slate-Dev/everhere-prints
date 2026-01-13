# Ever Here Prints - Security Checklist

## CRITICAL: Before Going to Production

### Secrets That MUST Be Changed

| Secret | Default Risk | How to Generate |
|--------|-------------|-----------------|
| `ADMIN_USERNAME` | Predictable access | Choose unique username (not "admin") |
| `ADMIN_PASSWORD` | Weak password attacks | Use password manager, 16+ chars |
| `JWT_SECRET` | Token forgery | Cryptographic random string |
| `STRIPE_SECRET_KEY` | Payment theft | From Stripe dashboard (live mode) |

---

## JWT Secret Generation

The JWT secret is used to sign authentication tokens. A weak secret allows attackers to forge tokens and gain admin access.

### Generate a Secure JWT Secret

**Option 1: Node.js (Recommended)**
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

**Option 2: OpenSSL**
```bash
openssl rand -hex 64
```

**Option 3: PowerShell (Windows)**
```powershell
[Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(64))
```

**Option 4: Online (if you must)**
- https://generate-secret.vercel.app/64
- https://www.grc.com/passwords.htm

### JWT Secret Requirements

- Minimum 32 characters (64+ recommended)
- Cryptographically random
- Unique per environment (dev, staging, prod)
- Never share or commit to version control
- Rotate periodically (e.g., annually)

---

## Admin Password Requirements

Your admin password protects the entire admin panel. Use a strong password:

### Minimum Requirements
- 12 characters minimum (16+ recommended)
- Mix of uppercase and lowercase letters
- At least one number
- At least one special character (!@#$%^&*)

### Password Best Practices
- Use a password manager (1Password, Bitwarden, LastPass)
- Never reuse passwords across services
- Don't use personal information
- Don't use dictionary words

### Example Strong Password Pattern
```
[Word][Symbol][Random][Symbol][Word][Number]
Example: Ocean#7xK9p@Storm42
```

---

## API Key Security

### Stripe Keys

| Key Type | Prefix | Exposure | Security Level |
|----------|--------|----------|----------------|
| Publishable | `pk_` | Browser (safe) | Public |
| Secret | `sk_` | Server only | CRITICAL |
| Webhook | `whsec_` | Server only | HIGH |

**Never expose secret keys:**
- Don't commit to Git
- Don't log in console
- Don't send to frontend
- Rotate if compromised

### Mapbox Token

- Use URL restrictions in Mapbox dashboard
- Create separate tokens for dev/prod
- Only grant required scopes
- Monitor usage for anomalies

---

## Environment Variable Security

### Local Development
```bash
# Create from template
cp .env.example .env.local

# Set restrictive permissions (Unix)
chmod 600 .env.local
```

### Production (Vercel)
- Use Vercel's encrypted environment variables
- Enable "Sensitive" flag for secrets
- Use different values per environment
- Never log environment variables

### What NOT to Do
- Don't commit `.env` files
- Don't hardcode secrets in code
- Don't share secrets via chat/email
- Don't use same secrets across environments

---

## Security Headers

The `vercel.json` includes security headers:

| Header | Purpose |
|--------|---------|
| `X-Content-Type-Options: nosniff` | Prevent MIME sniffing |
| `X-Frame-Options: DENY` | Prevent clickjacking |
| `X-XSS-Protection: 1; mode=block` | XSS filter |
| `Referrer-Policy` | Control referrer info |

### Additional Headers (Consider Adding)

```json
{
  "key": "Content-Security-Policy",
  "value": "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https: blob:; connect-src 'self' https://api.stripe.com https://api.mapbox.com https://*.tiles.mapbox.com;"
}
```

---

## Stripe Webhook Security

### Verify Webhook Signatures

Always verify webhook signatures to prevent spoofing:

```typescript
import Stripe from 'stripe';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

// In your webhook handler
const signature = request.headers['stripe-signature'];
const event = stripe.webhooks.constructEvent(
  body,
  signature,
  webhookSecret
);
```

### Webhook Endpoint Security
- Use HTTPS only
- Verify `stripe-signature` header
- Respond with 200 quickly
- Process asynchronously if needed
- Log and monitor webhook activity

---

## Pre-Deployment Checklist

### Authentication
- [ ] Changed `ADMIN_USERNAME` from default
- [ ] Set strong `ADMIN_PASSWORD` (16+ chars)
- [ ] Generated cryptographic `JWT_SECRET` (64+ chars)
- [ ] Verified admin login works

### Payment Security
- [ ] Using Stripe live keys (not test)
- [ ] Webhook endpoint configured
- [ ] `STRIPE_WEBHOOK_SECRET` set
- [ ] Test purchase flow end-to-end

### Infrastructure
- [ ] All env vars set in Vercel
- [ ] No secrets in code/commits
- [ ] HTTPS enforced
- [ ] Security headers active

### Monitoring
- [ ] Error tracking enabled
- [ ] Analytics configured
- [ ] Stripe webhook logs reviewed
- [ ] Admin access logs (if available)

---

## Incident Response

### If Secrets Are Compromised

1. **Immediately rotate the compromised secret**
2. **Revoke old credentials:**
   - Stripe: Dashboard > API Keys > Roll Keys
   - Mapbox: Dashboard > Tokens > Delete & Recreate
   - JWT: Update secret (will invalidate all sessions)

3. **Audit for unauthorized access:**
   - Check Stripe payment logs
   - Review admin panel access
   - Check for unexpected data changes

4. **Update all environments:**
   - Development
   - Staging
   - Production

5. **Document the incident**

### Contact Information

- **Stripe Security:** security@stripe.com
- **Mapbox Security:** security@mapbox.com
- **Vercel Security:** security@vercel.com

---

## Regular Security Maintenance

### Monthly
- [ ] Review admin access logs
- [ ] Check for unusual Stripe activity
- [ ] Update dependencies (`npm audit`)

### Quarterly
- [ ] Rotate API keys (if policy requires)
- [ ] Review and update security headers
- [ ] Test backup/recovery procedures

### Annually
- [ ] Rotate JWT secret
- [ ] Full security audit
- [ ] Update password policy
- [ ] Review access controls
