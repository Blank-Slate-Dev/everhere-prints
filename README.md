# EverHere Prints - Admin Portal & Print Export System

## What's Included

### Print Export System
High-resolution print export for A4, A3, and A2 sizes at 300 DPI.

- `src/lib/printExport.ts` - DPI calculations and size configurations
- `src/lib/soundWaveSvgGenerator.ts` - Generates vector SVG for Sound Wave prints
- `src/hooks/usePrintExport.ts` - React hook for export functionality
- `src/components/create/ExportButton.tsx` - Export UI component with quality selector
- `src/components/create-soundwave/SoundWaveExportSection.tsx` - Integration example
- `src/app/api/export/print/route.ts` - API endpoint for SVG → PNG conversion

### Admin Portal
Secure admin dashboard for managing orders and generating print files.

- `src/lib/adminAuth.ts` - JWT authentication utilities
- `src/middleware.ts` - Route protection middleware
- `src/app/api/admin/auth/route.ts` - Login/logout API endpoints
- `src/app/admin/login/page.tsx` - Login page
- `src/app/admin/layout.tsx` - Admin layout with sidebar
- `src/app/admin/page.tsx` - Dashboard overview
- `src/app/admin/orders/page.tsx` - Order management
- `src/app/admin/print-queue/page.tsx` - Print queue management

## Installation

### 1. Install Dependencies

```bash
npm install jose sharp
```

### 2. Copy Files

Copy the `src` folder contents to your project, merging with existing files.

### 3. Environment Variables (Optional)

Add to `.env.local`:

```env
ADMIN_USERNAME=admin
ADMIN_PASSWORD=Bluezoomer30!
JWT_SECRET=your-super-secret-key-change-this-in-production
```

## Usage

### Admin Login

- **URL:** `/admin/login`
- **Username:** `admin`
- **Password:** `Bluezoomer30!`

### Print Export Sizes (300 DPI)

| Size | Dimensions | Est. File Size |
|------|------------|----------------|
| A4 | 2,480 × 3,508 px | ~4 MB |
| A3 | 3,508 × 4,961 px | ~8 MB |
| A2 | 4,961 × 7,016 px | ~16 MB |

### Adding Export to Sound Wave Page

```tsx
import SoundWaveExportSection from "@/components/create-soundwave/SoundWaveExportSection";

// In your component:
<SoundWaveExportSection 
  customization={customization} 
  product={product} 
/>
```

## Security Notes

- JWT tokens expire after 24 hours
- Cookies are HTTP-only and secure in production
- Change the default credentials and JWT secret in production!
