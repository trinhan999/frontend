# PC Component Store Frontend

Next.js frontend application for the PC Component Online Store.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8080/api
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

The application will start on `http://localhost:3000`

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles
├── components/            # Reusable components
├── lib/                   # Utilities and configurations
│   ├── api.ts            # API client and types
│   └── utils.ts          # Utility functions
├── providers/            # Context providers
│   └── query-provider.tsx # React Query provider
└── types/                # TypeScript type definitions
```

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Query (TanStack Query)
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Utilities**: clsx, tailwind-merge

## 🎨 Features

- **Modern UI**: Clean, responsive design with Tailwind CSS
- **Type Safety**: Full TypeScript support
- **Data Fetching**: React Query for efficient API calls
- **Responsive Design**: Mobile-first approach
- **Performance**: Optimized with Next.js features

## 📱 Pages

- **Homepage**: Hero section, categories, featured products
- **Products**: Product listing with filters (planned)
- **Product Details**: Individual product pages (planned)
- **Cart**: Shopping cart functionality (planned)
- **User Account**: Login, registration, profile (planned)

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript check
```

### Code Style

- ESLint configuration included
- Prettier formatting (recommended)
- TypeScript strict mode enabled

## 🌐 API Integration

The frontend communicates with the Spring Boot backend via REST API:

- Base URL: `http://localhost:8080/api`
- Authentication: JWT tokens
- Response format: Standardized `ApiResponse<T>` wrapper

### API Endpoints

- `GET /users` - Get all users
- `POST /users` - Create user
- `GET /users/{id}` - Get user by ID
- `PUT /users/{id}` - Update user
- `DELETE /users/{id}` - Delete user

## 🎯 Key Components

### Homepage Features
- Hero section with call-to-action
- Category browsing with icons
- Featured products showcase
- "Why Choose Us" section

### Planned Features
- Product catalog with filtering
- Shopping cart functionality
- User authentication
- Order management
- Admin panel
- Product search
- Reviews and ratings

## 🔒 Security

- JWT token authentication
- Secure API communication
- Input validation
- XSS protection

## 📦 Deployment

### Vercel (Recommended)
```bash
npm run build
# Deploy to Vercel
```

### Other Platforms
```bash
npm run build
npm run start
```

## 🚧 TODO

- [ ] Add product listing page
- [ ] Implement shopping cart
- [ ] Add user authentication
- [ ] Create product detail pages
- [ ] Add search functionality
- [ ] Implement filters and sorting
- [ ] Add admin dashboard
- [ ] Create checkout flow
- [ ] Add product reviews
- [ ] Implement wishlist
- [ ] Add payment integration
- [ ] Create order tracking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
