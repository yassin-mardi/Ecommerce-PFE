# E-commerce Platform

A modern, full-featured e-commerce platform built with Next.js 15, React 19, and TailwindCSS. This project implements a complete shopping experience with both customer-facing and admin interfaces.

## Features

- 🛍️ **Customer Features**
  - Product browsing and search
  - Category filtering
  - Shopping cart functionality
  - User authentication
  - Account management
  - Order tracking
  - Checkout process

- 👨‍💼 **Admin Dashboard**
  - Product management
  - Category management
  - Customer management
  - Order processing
  - Analytics and reporting

- 🎨 **UI/UX**
  - Responsive design
  - Dark/Light theme support
  - Modern UI components
  - Smooth animations
  - Mobile-friendly interface

## Tech Stack

- **Frontend Framework**: Next.js 15.2.4 with React 19
- **Styling**: TailwindCSS with custom animations
- **UI Components**: 
  - Radix UI primitives
  - Custom shadcn-inspired components
  - Embla Carousel
  - Recharts for analytics
- **Form Handling**: React Hook Form with Zod validation
- **State Management**: React Context API
- **Authentication**: Custom auth implementation
- **Development**:
  - TypeScript
  - ESLint
  - Turbopack for fast builds

## Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- npm or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yassin-mardi/Ecommerce-PFE.git
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                  # Next.js app directory
│   ├── admin/           # Admin dashboard pages
│   ├── products/        # Product-related pages
│   ├── account/         # User account pages
│   └── ...             # Other app routes
├── components/          # Reusable React components
│   ├── ui/             # UI components
│   └── admin/          # Admin-specific components
├── hooks/              # Custom React hooks
├── lib/               # Utility functions
├── public/            # Static assets
└── styles/           # Global styles
```

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- UI components inspired by shadcn/ui
- Built with Next.js and React
- Styled with TailwindCSS 