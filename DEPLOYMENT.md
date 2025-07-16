# Frontend Deployment Configuration

This guide explains how to configure the frontend to use your deployed backend instead of localhost.

## Quick Configuration

### 1. Update API Configuration

Edit `src/config/api.ts` and update the `BASE_URL`:

```typescript
export const API_CONFIG = {
  // Replace this with your actual deployed backend URL
  BASE_URL: 'https://your-backend-domain.com/api',
  
  // Examples:
  // BASE_URL: 'https://your-app.herokuapp.com/api',
  // BASE_URL: 'https://your-app.railway.app/api',
  // BASE_URL: 'https://your-app.render.com/api',
  // BASE_URL: 'https://api.yourdomain.com/api',
  
  TIMEOUT: 10000,
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
  },
};
```

### 2. Build for Production

```bash
cd frontend
npm install
npm run build
npm start
```

## Environment-Based Configuration

### Option 1: Environment Variables

Create a `.env.production` file (not tracked by git):

```env
NEXT_PUBLIC_API_URL=https://your-backend-domain.com/api
NEXT_PUBLIC_APP_NAME=PC Component Store
```

### Option 2: Build-Time Configuration

Update the `BASE_URL` in `src/config/api.ts` before building:

```typescript
// For development
BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api',

// For production (replace with your URL)
BASE_URL: 'https://your-backend-domain.com/api',
```

## Deployment Platforms

### Vercel
- Set environment variable: `NEXT_PUBLIC_API_URL`
- Value: `https://your-backend-domain.com/api`

### Netlify
- Set environment variable: `NEXT_PUBLIC_API_URL`
- Value: `https://your-backend-domain.com/api`

### Railway
- Set environment variable: `NEXT_PUBLIC_API_URL`
- Value: `https://your-backend-domain.com/api`

### Custom Server
- Update `src/config/api.ts` directly
- Build with: `npm run build`
- Serve with: `npm start`

## Verification

After deployment, verify the configuration:

1. Open browser developer tools
2. Check Network tab
3. Verify API calls go to your deployed backend URL
4. Test login, product listing, and cart functionality

## Troubleshooting

### CORS Issues
Ensure your backend allows requests from your frontend domain:

```java
// In your Spring Boot SecurityConfig
.allowedOrigins("https://your-frontend-domain.com")
```

### API Endpoints
Verify your backend endpoints match the frontend expectations:
- `/api/auth/login`
- `/api/products`
- `/api/cart`
- `/api/orders`
- `/api/admin/*`

### SSL/HTTPS
Make sure your backend supports HTTPS if your frontend is served over HTTPS.

## Quick Scripts

- `config-prod.bat` - Shows configuration instructions
- `build-prod.bat` - Builds the frontend for production 