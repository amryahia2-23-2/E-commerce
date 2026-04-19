# 🛒 FreshCart - Complete E-Commerce Platform

> A modern, full-featured e-commerce platform built with Next.js 16, React 19, Sanity CMS, and Stripe payments

[![Next.js](https://img.shields.io/badge/Next.js-16.2.1-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.4-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![Stripe](https://img.shields.io/badge/Stripe-22.0.1-purple)](https://stripe.com/)
[![Sanity](https://img.shields.io/badge/Sanity-4.22.0-red)](https://www.sanity.io/)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Stripe Webhook Setup](#-stripe-webhook-setup)
- [Project Structure](#-project-structure)
- [Core Features](#-core-features)
- [Stock Management](#-stock-management)
- [Payment Flow](#-payment-flow)
- [API Routes](#-api-routes)
- [Available Scripts](#-available-scripts)
- [Deployment](#-deployment)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)

---

## 🎯 Overview

**FreshCart** is a modern, production-ready e-commerce platform that provides a seamless shopping experience with powerful admin capabilities. Built with Next.js 16 App Router, React 19, Sanity CMS for content management, and Stripe for secure payment processing.

### What Makes FreshCart Special:

- 🎨 **Modern & Responsive Design** - Works flawlessly on all devices
- 🔐 **Secure Authentication** - Powered by Clerk
- 💳 **Reliable Payment Processing** - Stripe integration with invoice support
- 📦 **Smart Inventory Management** - Automatic stock updates after purchases
- 🎭 **Excellent UX** - Smooth animations and fast loading
- 📱 **Progressive Web App** - Can be installed as a mobile app
- 🔍 **Advanced Search** - Fast product search with filtering
- 🛡️ **Error Boundaries** - Graceful error handling
- ⚡ **Optimized Performance** - Fast page loads and smooth interactions

---

## 🚀 Features

### For Customers:

✅ **Product Browsing** - Filter by categories and brands
✅ **Advanced Search** - Quick product search
✅ **Shopping Cart** - Easy product management
✅ **Wishlist** - Save favorite products
✅ **Secure Checkout** - Stripe payment integration
✅ **Order Tracking** - Monitor order status
✅ **Invoice Download** - PDF invoices
✅ **Multiple Addresses** - Manage delivery addresses
✅ **Blog** - Product tips and articles
✅ **Responsive Design** - Mobile, tablet, and desktop support

### For Admins:

✅ **Sanity Studio** - Powerful CMS dashboard
✅ **Product Management** - Add, edit, delete products
✅ **Order Management** - Track and process orders
✅ **Inventory Management** - Automatic stock updates
✅ **Reports** - Sales and order statistics
✅ **Category Management** - Organize products
✅ **Brand Management** - Add and edit brands
✅ **Blog Management** - Create and publish articles

---

## 🛠 Tech Stack

### Frontend:
- **Next.js 16.2.1** - React Framework with App Router
- **React 19.2.4** - UI Library
- **TypeScript 5** - Type Safety
- **Tailwind CSS 4** - Styling
- **shadcn/ui** - Pre-built UI Components
- **Framer Motion** - Animations
- **Lucide React** - Modern Icons

### Backend & Services:
- **Sanity 4.22.0** - Headless CMS
- **Stripe 22.0.1** - Payment Processing
- **Clerk 7.0.7** - Authentication & Authorization

### State Management:
- **Zustand 5.0.12** - State Management
- **React Hot Toast** - Notifications

### Utilities:
- **Day.js** - Date Handling
- **clsx** - Class Management
- **Embla Carousel** - Image Carousels

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (Next.js App Router)             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Pages      │  │  Components  │  │    Store     │      │
│  │  (RSC/Client)│  │   (React)    │  │  (Zustand)   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            ↓ ↑
┌─────────────────────────────────────────────────────────────┐
│                   API Layer (Next.js API Routes)             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Webhooks   │  │    Server    │  │   Actions    │      │
│  │   (Stripe)   │  │   Actions    │  │              │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
         ↓ ↑                  ↓ ↑                  ↓ ↑
┌──────────────────┐  ┌──────────────────┐  ┌──────────────┐
│     Stripe       │  │      Sanity      │  │    Clerk     │
│   (Payments)     │  │      (CMS)       │  │    (Auth)    │
└──────────────────┘  └──────────────────┘  └──────────────┘
```


## 📦 Installation

### Prerequisites:

- Node.js 20+ or newer
- npm, yarn, or pnpm
- [Stripe Account](https://stripe.com/)
- [Sanity Account](https://www.sanity.io/)
- [Clerk Account](https://clerk.com/)

### Step-by-Step Setup:

#### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/freshcart.git
cd freshcart
```

#### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

#### 3. Setup Environment Variables

Create a `.env.local` file in the root directory:

```env
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-03-29
SANITY_API_READ_TOKEN=your_read_token
SANITY_API_WRITE_TOKEN=your_write_token

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key

# Stripe
STRIPE_SECRET_KEY=sk_test_your_secret_key
NEXT_PUBLIC_BASE_URL=http://localhost:3000
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

#### 4. Setup Sanity

```bash
# Login to Sanity
npx sanity login

# Initialize project (if needed)
npx sanity init

# Generate TypeScript types
npm run typegen
```

#### 5. Setup Stripe CLI (Development)

```bash
# Install Stripe CLI
# Windows (Scoop)
scoop install stripe

# Mac
brew install stripe/stripe-cli/stripe

# Linux
wget https://github.com/stripe/stripe-cli/releases/latest/download/stripe_linux_x86_64.tar.gz
tar -xvf stripe_linux_x86_64.tar.gz
sudo mv stripe /usr/local/bin/

# Login
stripe login

# Start webhook forwarding
stripe listen --forward-to localhost:3000/api/webhook
```

Copy the webhook signing secret and add it to `.env.local`:
```env
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
```

#### 6. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

#### 7. Access Sanity Studio

Open [http://localhost:3000/studio](http://localhost:3000/studio) to manage content.

---

## 🔐 Environment Variables

### Sanity Configuration:

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project ID | ✅ |
| `NEXT_PUBLIC_SANITY_DATASET` | Dataset name (usually production) | ✅ |
| `NEXT_PUBLIC_SANITY_API_VERSION` | API version | ✅ |
| `SANITY_API_READ_TOKEN` | Read token | ✅ |
| `SANITY_API_WRITE_TOKEN` | Write token | ✅ |

### Clerk Configuration:

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk public key | ✅ |
| `CLERK_SECRET_KEY` | Clerk secret key | ✅ |

### Stripe Configuration:

| Variable | Description | Required |
|----------|-------------|----------|
| `STRIPE_SECRET_KEY` | Stripe secret key | ✅ |
| `STRIPE_WEBHOOK_SECRET` | Webhook signing secret | ✅ |
| `NEXT_PUBLIC_BASE_URL` | Base URL of your site | ✅ |

---

## 🔔 Stripe Webhook Setup

### For Local Development:

**Why do we need this?**
Stripe cannot send webhooks to `localhost` directly. We need Stripe CLI to forward webhooks from Stripe to your local server.

**Setup Steps:**

1. **Install Stripe CLI:**
   ```bash
   stripe login
   ```

2. **Start webhook forwarding:**
   ```bash
   stripe listen --forward-to localhost:3000/api/webhook
   ```

3. **Copy the webhook secret:**
   ```
   ✔ Ready! Your webhook signing secret is whsec_xxxxx
   ```

4. **Update .env.local:**
   ```env
   STRIPE_WEBHOOK_SECRET=whsec_xxxxx
   ```

5. **Restart your dev server:**
   ```bash
   npm run dev
   ```

**Important:** Keep the `stripe listen` terminal running while developing!

### For Production:

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/webhooks)
2. Add new endpoint: `https://yourdomain.com/api/webhook`
3. Select events:
   - `checkout.session.completed`
4. Copy webhook secret and add to environment variables

### Testing Payments:

Use Stripe test cards:
- **Card Number:** `4242 4242 4242 4242`
- **Expiry:** Any future date (e.g., `12/34`)
- **CVC:** Any 3 digits (e.g., `123`)
- **ZIP:** Any number (e.g., `12345`)


## 📁 Project Structure

```
freshcart/
├── app/                          # Next.js App Router
│   ├── (client)/                 # Client pages
│   │   ├── page.tsx             # Home page
│   │   ├── cart/                # Cart page
│   │   ├── shop/                # Shop page
│   │   ├── product/[slug]/      # Product detail page
│   │   ├── orders/              # Orders page
│   │   ├── success/             # Success page
│   │   ├── blog/                # Blog pages
│   │   └── layout.tsx           # Client layout
│   ├── api/                     # API Routes
│   │   └── webhook/             # Stripe Webhooks
│   │       └── route.ts         # Webhook handler
│   ├── studio/                  # Sanity Studio
│   ├── layout.tsx               # Root Layout
│   └── globals.css              # Global Styles
│
├── components/                   # React Components
│   ├── ui/                      # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   └── ...
│   ├── Header.tsx               # Header component
│   ├── Footer.tsx               # Footer component
│   ├── ProductCard.tsx          # Product card
│   ├── AddToCartButton.tsx      # Add to cart button
│   ├── QuantityButton.tsx       # Quantity controls
│   ├── ErrorBoundary.tsx        # Error handling
│   └── ...
│
├── actions/                      # Server Actions
│   └── CheckOutSession.ts       # Create Stripe session
│
├── sanity/                       # Sanity Configuration
│   ├── lib/                     # Sanity clients
│   │   ├── client.ts            # Read client
│   │   ├── backendClient.ts     # Write client
│   │   ├── image.ts             # Image builder
│   │   └── live.ts              # Live preview
│   ├── queries/                 # Sanity queries
│   │   ├── query.ts             # GROQ queries
│   │   └── index.ts             # Query functions
│   ├── schemaTypes/             # Sanity schemas
│   │   ├── product.ts
│   │   ├── category.ts
│   │   ├── order.ts
│   │   └── ...
│   └── env.ts                   # Sanity config
│
├── store.ts                      # Zustand Store (cart, wishlist)
│
├── lib/                          # Utilities
│   ├── stripe.ts                # Stripe client
│   └── utils.ts                 # Helper functions
│
├── constants/                    # Constants
│   └── data.tsx                 # Static data
│
├── public/                       # Static files
│
├── .env.local                    # Environment variables
├── next.config.ts               # Next.js config
├── tailwind.config.ts           # Tailwind config
├── tsconfig.json                # TypeScript config
└── package.json                 # Dependencies
```

---

## 🎨 Core Features

### 1. Shopping Cart System

**Technology:** Zustand with localStorage persistence

**Features:**
- Add/remove products
- Update quantities
- Calculate totals with discounts
- Stock validation before adding
- Persistent across sessions

**Key Files:**
- `store.ts` - State management
- `components/AddToCartButton.tsx` - Add to cart
- `components/QuantityButton.tsx` - Update quantity
- `app/(client)/cart/page.tsx` - Cart page

**Code Example:**
```typescript
// store.ts
const useStore = create<CartState>()(persist((set, get) => ({
  items: [],
  addItem: (product) => {
    // Add product to cart
  },
  getTotalPrice: () => {
    return get().items.reduce(
      (total, item) => total + (item.product.price ?? 0) * item.quantity,
      0
    );
  },
}), { name: 'cart-store' }));
```

### 2. Payment System

**Technology:** Stripe Checkout

**Features:**
- Secure payment processing
- Credit card support
- Automatic invoice generation
- Email receipts
- Stock validation before payment

**Payment Flow:**
```
1. User clicks "Checkout"
2. Stock validation
3. Create Stripe Session
4. Redirect to Stripe
5. User completes payment
6. Stripe sends webhook
7. Create Order in Sanity
8. Update stock
9. Redirect to success page
```

**Key Files:**
- `actions/CheckOutSession.ts` - Create session
- `app/api/webhook/route.ts` - Handle webhooks
- `app/(client)/success/page.tsx` - Success page

**Code Example:**
```typescript
// CheckOutSession.ts
export async function createCheckOutSession(
  groupedItems: GroupedItems[],
  metadata: Metadata
) {
  // Validate stock
  for (const item of groupedItems) {
    const product = await backendClient.getDocument(item.product._id);
    if (product.stock < item.quantity) {
      throw new Error("Insufficient stock");
    }
  }
  
  // Create Stripe session
  const session = await stripe.checkout.sessions.create({
    // ... session config
  });
  
  return session.url;
}
```

### 3. Authentication System

**Technology:** Clerk

**Features:**
- Sign in/Sign out
- User registration
- OAuth (Google, GitHub, etc.)
- Protected routes
- User profile management

**Key Files:**
- `middleware.ts` - Route protection
- `components/SignIn.tsx` - Sign in button
- `app/(client)/layout.tsx` - ClerkProvider

### 4. Content Management

**Technology:** Sanity Studio

**Features:**
- Product management
- Category management
- Order management
- Blog management
- Image uploads
- Real-time preview

**Access:**
- URL: `http://localhost:3000/studio`
- Or: `https://yourdomain.com/studio`

**Key Files:**
- `sanity/schemaTypes/` - Schema definitions
- `sanity/queries/` - GROQ queries
- `app/studio/` - Studio route


## 📦 Stock Management

### How It Works:

The stock management system operates in two phases to ensure data integrity and prevent overselling.

#### Phase 1: Stock Validation (Before Payment)

**When:** User clicks "Proceed to Checkout"
**Where:** `actions/CheckOutSession.ts`
**Action:** Validate stock availability (no deduction)

```typescript
// Validate stock before creating checkout session
for (const item of groupedItems) {
  const product = await backendClient.getDocument(item.product._id);
  
  if (!product || typeof product.stock !== 'number') {
    throw new Error(`Product ${item.product.name} not found`);
  }
  
  if (product.stock < item.quantity) {
    throw new Error(
      `Insufficient stock for ${item.product.name}. ` +
      `Available: ${product.stock}, Requested: ${item.quantity}`
    );
  }
}
```

#### Phase 2: Stock Update (After Payment)

**When:** After successful payment
**Where:** `app/api/webhook/route.ts`
**Action:** Deduct purchased quantity from stock

```typescript
// Update stock after successful payment
async function updateStockLevels(stockUpdates) {
  for (const { productId, quantity } of stockUpdates) {
    const product = await backendClient.getDocument(productId);
    const newStock = Math.max(product.stock - quantity, 0);
    
    await backendClient
      .patch(productId)
      .set({ stock: newStock })
      .commit();
  }
}
```

### Complete Flow:

```
┌─────────────────────────────────────────────────────────────┐
│ 1. User adds product to cart                                │
│    ❌ Stock NOT updated                                      │
│    ✅ Saved in localStorage only                             │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 2. User clicks "Proceed to Checkout"                        │
│    ✅ Validate stock in Sanity                              │
│    ✅ If sufficient → Create Stripe Session                 │
│    ❌ If insufficient → Show error message                  │
│                                                              │
│    📁 File: actions/CheckOutSession.ts                      │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 3. User completes payment in Stripe                         │
│    ⏳ Waiting...                                             │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 4. Stripe sends webhook: checkout.session.completed         │
│    ✅ Create Order in Sanity                                │
│    ✅ Update stock (stock = stock - quantity)               │
│                                                              │
│    📁 File: app/api/webhook/route.ts                        │
└─────────────────────────────────────────────────────────────┘
```

### Example Scenario:

**Product:** iPhone 15
**Initial Stock:** 10

**Step 1: Add to Cart**
```
User adds 2 iPhones to cart
Stock in Sanity: 10 ✅ (unchanged)
```

**Step 2: Checkout**
```
System validates: 10 >= 2 ✅
Creates Stripe session ✅
Stock in Sanity: 10 ✅ (unchanged)
```

**Step 3: Payment**
```
Payment successful ✅
Stripe sends webhook ✅
Stock in Sanity: 10 ✅ (not yet updated)
```

**Step 4: Webhook Processing**
```
Webhook processes order ✅
Order created in Sanity ✅
Stock updated: 10 - 2 = 8 ✅
```

### Edge Cases:

#### If Payment Fails:
```
❌ Payment failed
❌ No webhook sent
✅ Stock remains unchanged (stays at 10)
```

#### If User Cancels:
```
❌ User cancels on Stripe page
❌ No webhook sent
✅ Stock remains unchanged (stays at 10)
```

#### Race Condition (Potential Issue):
```
User A: Validates stock (10 >= 5) ✅
User B: Validates stock (10 >= 6) ✅
User A: Pays ✅ → Stock = 5
User B: Pays ✅ → Stock = -1 ❌

⚠️ This is a race condition!
💡 Solution: Implement reserved stock system
```

### Reserved Stock System (Advanced):

For high-traffic scenarios, implement a reservation system:

```typescript
// 1. Reserve stock when creating checkout session
await backendClient
  .patch(productId)
  .inc({ reserved: quantity })
  .commit();

// 2. On successful payment
await backendClient
  .patch(productId)
  .dec({ stock: quantity })
  .dec({ reserved: quantity })
  .commit();

// 3. On timeout/cancel (after 30 minutes)
await backendClient
  .patch(productId)
  .dec({ reserved: quantity })
  .commit();
```

### Benefits:

✅ Stock only updated after successful payment
✅ Failed payments don't affect stock
✅ Validation prevents overselling
✅ Automatic stock management

### Monitoring:

Check logs to monitor stock updates:

```bash
# In CheckOutSession
🔍 Checking stock availability...
  ✅ iPhone 15: 10 available, 2 requested

# In Webhook
📦 Updating stock levels...
  Product: iPhone 15
  Before: 10
  After: 8
✅ Stock levels updated
```

---

## 💳 Payment Flow

### Complete Payment Process:

```
┌─────────────────────────────────────────────────────────────┐
│ Step 1: User Initiates Checkout                             │
│ ────────────────────────────────────────────────────────    │
│ • User clicks "Proceed to Checkout"                         │
│ • System validates:                                          │
│   - User is signed in                                        │
│   - Cart is not empty                                        │
│   - Delivery address is selected                             │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ Step 2: Stock Validation                                    │
│ ────────────────────────────────────────────────────────    │
│ • For each product in cart:                                  │
│   - Fetch current stock from Sanity                          │
│   - Validate: stock >= requested quantity                    │
│   - If insufficient: throw error                             │
│ • If all valid: proceed to next step                         │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ Step 3: Create Stripe Checkout Session                      │
│ ────────────────────────────────────────────────────────    │
│ • Check for existing customer                                │
│ • Create session with:                                       │
│   - Line items (products)                                    │
│   - Customer info                                            │
│   - Metadata (order number, address, etc.)                   │
│   - Success/Cancel URLs                                      │
│ • Return checkout URL                                        │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ Step 4: Redirect to Stripe                                  │
│ ────────────────────────────────────────────────────────    │
│ • User redirected to Stripe Checkout                         │
│ • Stripe handles:                                            │
│   - Payment form                                             │
│   - Card validation                                          │
│   - 3D Secure (if needed)                                    │
│   - Payment processing                                       │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ Step 5: Payment Processing                                  │
│ ────────────────────────────────────────────────────────    │
│ • Stripe processes payment                                   │
│ • If successful:                                             │
│   - Creates payment intent                                   │
│   - Generates invoice                                        │
│   - Sends webhook to our server                              │
│ • If failed:                                                 │
│   - Shows error to user                                      │
│   - No webhook sent                                          │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ Step 6: Webhook Processing                                  │
│ ────────────────────────────────────────────────────────    │
│ • Verify webhook signature                                   │
│ • Extract session data                                       │
│ • Fetch line items from Stripe                               │
│ • Create order in Sanity:                                    │
│   - Order details                                            │
│   - Customer info                                            │
│   - Products                                                 │
│   - Invoice info                                             │
│ • Update stock levels                                        │
│ • Send confirmation email (Stripe)                           │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ Step 7: Success Page                                        │
│ ────────────────────────────────────────────────────────    │
│ • User redirected to success page                            │
│ • Display:                                                   │
│   - Order confirmation                                       │
│   - Order number                                             │
│   - Next steps                                               │
│ • Clear cart                                                 │
└─────────────────────────────────────────────────────────────┘
```

### Key Components:

**1. CheckOutSession.ts**
```typescript
export async function createCheckOutSession(
  groupedItems: GroupedItems[],
  metadata: Metadata
) {
  // Validate stock
  // Create Stripe session
  // Return checkout URL
}
```

**2. webhook/route.ts**
```typescript
export async function POST(request: NextRequest) {
  // Verify signature
  // Process checkout.session.completed
  // Create order
  // Update stock
}
```

**3. Success Page**
```typescript
function SuccessPage() {
  // Get session_id and order_number from URL
  // Clear cart
  // Show confirmation
}
```


## 🔌 API Routes

### `/api/webhook` (POST)

Handles Stripe webhook events.

**Supported Events:**
- `checkout.session.completed` - After successful payment

**Request Headers:**
```
stripe-signature: webhook_signature
```

**Process Flow:**
1. Verify webhook signature
2. Extract session data
3. Fetch line items from Stripe
4. Create order in Sanity
5. Update stock levels
6. Return success response

**Response:**
```json
{
  "received": true,
  "orderId": "order_123"
}
```

**Error Responses:**
```json
// Missing signature
{
  "error": "Missing signature"
}

// Invalid signature
{
  "error": "Invalid signature"
}

// Order creation failed
{
  "error": "Error creating order in Sanity"
}
```

**Code Example:**
```typescript
export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = headers().get("stripe-signature");
  
  // Verify signature
  const event = Stripe.webhooks.constructEvent(
    body,
    sig,
    process.env.STRIPE_WEBHOOK_SECRET
  );
  
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    await createOrderInSanity(session);
  }
  
  return Response.json({ received: true });
}
```

---

## ⚙️ Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint

# Sanity
npm run typegen      # Generate TypeScript types from Sanity schemas

# Stripe (requires Stripe CLI)
stripe listen --forward-to localhost:3000/api/webhook
```

---

## 🚀 Deployment

### Deploy to Vercel (Recommended):

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Import to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

3. **Add Environment Variables:**
   - Go to Project Settings → Environment Variables
   - Add all variables from `.env.local`

4. **Setup Stripe Webhook:**
   - Go to Stripe Dashboard → Webhooks
   - Add endpoint: `https://yourdomain.vercel.app/api/webhook`
   - Select event: `checkout.session.completed`
   - Copy webhook secret
   - Add to Vercel environment variables

5. **Deploy:**
   ```bash
   vercel --prod
   ```

### Deploy to Other Platforms:

The project works on any platform supporting Next.js:
- **Netlify** - [Guide](https://docs.netlify.com/integrations/frameworks/next-js/)
- **Railway** - [Guide](https://docs.railway.app/guides/nextjs)
- **Render** - [Guide](https://render.com/docs/deploy-nextjs-app)
- **AWS Amplify** - [Guide](https://docs.amplify.aws/nextjs/)

### Post-Deployment Checklist:

- ✅ All environment variables set
- ✅ Stripe webhook configured
- ✅ Sanity CORS settings updated
- ✅ Clerk redirect URLs updated
- ✅ Test payment flow
- ✅ Verify stock updates
- ✅ Check order creation

---

## 🐛 Troubleshooting

### Issue: Webhook Not Working

**Symptoms:**
- Payment succeeds but order not created
- Stock not updating
- No logs in webhook

**Solutions:**

1. **Check Stripe CLI is running:**
   ```bash
   stripe listen --forward-to localhost:3000/api/webhook
   ```

2. **Verify webhook secret:**
   ```bash
   # In .env.local
   STRIPE_WEBHOOK_SECRET=whsec_xxxxx
   ```

3. **Check logs:**
   ```bash
   # Terminal with stripe listen
   → POST /api/webhook [200]
     checkout.session.completed
   
   # Terminal with npm run dev
   🔔 Webhook received
   ✅ Webhook signature verified
   💳 Processing checkout.session.completed
   ```

4. **Restart dev server:**
   ```bash
   # Stop server (Ctrl+C)
   npm run dev
   ```

### Issue: Stock Not Updating

**Symptoms:**
- Order created but stock unchanged
- Stock shows incorrect value

**Solutions:**

1. **Check webhook is working** (see above)

2. **Verify Sanity write token:**
   ```env
   SANITY_API_WRITE_TOKEN=sk...
   ```

3. **Check logs:**
   ```bash
   📦 Updating stock levels...
     Product: product_id
     Before: 10
     After: 8
   ✅ Stock levels updated
   ```

4. **Verify product has stock field:**
   - Open Sanity Studio
   - Check product schema has `stock` field
   - Ensure stock is a number

### Issue: Images Not Displaying

**Symptoms:**
- Product images show broken
- 403 errors in console

**Solutions:**

1. **Check Next.js config:**
   ```typescript
   // next.config.ts
   images: {
     remotePatterns: [
       {
         protocol: "https",
         hostname: "cdn.sanity.io",
       },
     ],
   }
   ```

2. **Verify image URLs:**
   ```typescript
   // Should use urlFor helper
   import { urlFor } from '@/sanity/lib/image';
   
   const imageUrl = urlFor(product.images[0]).url();
   ```

### Issue: Authentication Errors

**Symptoms:**
- Can't sign in
- Redirect loops
- 401 errors

**Solutions:**

1. **Check Clerk keys:**
   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...
   ```

2. **Verify middleware:**
   ```typescript
   // middleware.ts
   export default clerkMiddleware();
   ```

3. **Check Clerk dashboard:**
   - Verify redirect URLs
   - Check allowed domains
   - Review application settings

### Issue: Build Errors

**Symptoms:**
- Build fails
- TypeScript errors
- Missing dependencies

**Solutions:**

1. **Clear cache:**
   ```bash
   rm -rf .next
   rm -rf node_modules
   npm install
   ```

2. **Check TypeScript:**
   ```bash
   npm run typegen
   ```

3. **Verify dependencies:**
   ```bash
   npm install
   ```

### Issue: Slow Performance

**Symptoms:**
- Slow page loads
- Laggy interactions

**Solutions:**

1. **Enable caching:**
   ```typescript
   // In Sanity queries
   export const revalidate = 60; // Revalidate every 60 seconds
   ```

2. **Optimize images:**
   ```typescript
   <Image
     src={imageUrl}
     width={300}
     height={300}
     loading="lazy"
   />
   ```

3. **Use React.memo:**
   ```typescript
   export default React.memo(ProductCard);
   ```

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### Getting Started:

1. **Fork the repository**
2. **Clone your fork:**
   ```bash
   git clone https://github.com/yourusername/freshcart.git
   ```
3. **Create a branch:**
   ```bash
   git checkout -b feature/amazing-feature
   ```
4. **Make your changes**
5. **Commit:**
   ```bash
   git commit -m 'Add amazing feature'
   ```
6. **Push:**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### Guidelines:

- Follow existing code style
- Write clear commit messages
- Add tests if applicable
- Update documentation
- Keep PRs focused and small

### Areas for Contribution:

- 🐛 Bug fixes
- ✨ New features
- 📝 Documentation improvements
- 🎨 UI/UX enhancements
- ⚡ Performance optimizations
- 🧪 Test coverage

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

Developed by [Your Name]

- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com
- Website: [yourwebsite.com](https://yourwebsite.com)

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React Framework
- [Sanity](https://www.sanity.io/) - Headless CMS
- [Stripe](https://stripe.com/) - Payment Processing
- [Clerk](https://clerk.com/) - Authentication
- [shadcn/ui](https://ui.shadcn.com/) - UI Components
- [Vercel](https://vercel.com/) - Hosting Platform
- [Tailwind CSS](https://tailwindcss.com/) - CSS Framework

---

## 📞 Support

Need help? Here's how to get support:

1. **Check Documentation** - Read this README thoroughly
2. **Search Issues** - Look for similar issues on GitHub
3. **Open an Issue** - [Create a new issue](https://github.com/yourusername/freshcart/issues)
4. **Email** - Contact at your.email@example.com

---

## 🗺️ Roadmap

### Planned Features:

- [ ] Multi-language support
- [ ] Product reviews and ratings
- [ ] Advanced filtering and sorting
- [ ] Wishlist sharing
- [ ] Email notifications
- [ ] Admin dashboard
- [ ] Analytics integration
- [ ] Mobile app (React Native)
- [ ] Social media integration
- [ ] Gift cards
- [ ] Subscription products
- [ ] Advanced SEO optimization

---

## 📊 Project Stats

- **Lines of Code:** ~15,000+
- **Components:** 50+
- **API Routes:** 1
- **Pages:** 15+
- **Dependencies:** 30+

---

<div align="center">

**Built with ❤️ using Next.js, TypeScript, and modern web technologies**

⭐ If you like this project, please give it a star on GitHub!

[Report Bug](https://github.com/yourusername/freshcart/issues) · [Request Feature](https://github.com/yourusername/freshcart/issues) · [Documentation](https://github.com/yourusername/freshcart/wiki)

</div>

---

## 🔧 Core Functions & Components

This section explains all the key functions and components that power the application.

---

### 📦 State Management (store.ts)

The application uses **Zustand** for state management with localStorage persistence.

#### Cart Functions:

**1. addItem(product: Product)**
```typescript
// Adds a product to cart or increments quantity if already exists
addItem: (product) => set((state) => {
  const existingItem = state.items.find((item) => item.product._id === product._id);
  if (existingItem) {
    // Increment quantity
    return {
      items: state.items.map((item) => 
        item.product._id === product._id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      )
    }
  } else {
    // Add new item
    return {
      items: [...state.items, { product, quantity: 1 }]
    }
  }
})
```

**Usage:**
```typescript
const { addItem } = useStore();
addItem(product);
```

**2. removeItem(productId: string)**
```typescript
// Decrements quantity or removes item if quantity is 1
removeItem: (productId) => set((state) => ({
  items: state.items.reduce((acc, item) => {
    if (item.product._id === productId) {
      if (item.quantity > 1) {
        // Decrement quantity
        acc.push({ ...item, quantity: item.quantity - 1 })
      }
      // If quantity is 1, don't add to accumulator (remove item)
    } else {
      acc.push(item)
    }
    return acc;
  }, [] as CartItem[])
}))
```

**Usage:**
```typescript
const { removeItem } = useStore();
removeItem(productId);
```

**3. deleteCartProduct(productId: string)**
```typescript
// Completely removes a product from cart regardless of quantity
deleteCartProduct: (productId) => set((state) => ({
  items: state.items.filter(
    ({ product }) => product?._id !== productId
  ),
}))
```

**Usage:**
```typescript
const { deleteCartProduct } = useStore();
deleteCartProduct(productId);
```

**4. resetCart()**
```typescript
// Clears entire cart
resetCart: () => set({ items: [] })
```

**Usage:**
```typescript
const { resetCart } = useStore();
resetCart();
```

**5. getTotalPrice()**
```typescript
// Calculates total price after discounts
getTotalPrice: () => {
  return get().items.reduce(
    (total, item) => total + (item.product.price ?? 0) * item.quantity,
    0
  );
}
```

**Usage:**
```typescript
const { getTotalPrice } = useStore();
const total = getTotalPrice();
```

**6. getSubTotalPrice()**
```typescript
// Calculates subtotal before discounts
getSubTotalPrice: () => {
  return get().items.reduce((total, item) => {
    const price = item.product.price ?? 0;
    const discount = ((item.product.discount ?? 0) * price) / 100;
    const discountPrice = price - discount;
    return total + discountPrice * item.quantity;
  }, 0);
}
```

**7. getItemCount(productId: string)**
```typescript
// Gets quantity of specific product in cart
getItemCount: (productId) => {
  const item = get().items.find((item) => item.product._id === productId);
  return item ? item.quantity : 0;
}
```

**8. getGroupedItems()**
```typescript
// Returns all cart items
getGroupedItems: () => get().items
```

#### Wishlist Functions:

**1. addToFavorite(product: Product)**
```typescript
// Toggles product in wishlist (add if not exists, remove if exists)
addToFavorite: (product: Product) => {
  return new Promise<void>((resolve) => {
    set((state: CartState) => {
      const isFavorite = state.favoriteProduct.some(
        (item) => item._id === product._id
      );
      
      return {
        favoriteProduct: isFavorite
          ? state.favoriteProduct.filter((item) => item._id !== product._id)
          : [...state.favoriteProduct, product],
      };
    });
    resolve();
  });
}
```

**Usage:**
```typescript
const { addToFavorite } = useStore();
await addToFavorite(product);
```

**2. removeFromFavorite(productId: string)**
```typescript
// Removes product from wishlist
removeFromFavorite: (productId: string) => set((state: CartState) => ({
  favoriteProduct: state.favoriteProduct.filter(
    (item) => item._id !== productId
  ),
}))
```

**3. resetFavorite()**
```typescript
// Clears entire wishlist
resetFavorite: () => set((state: CartState) => ({ favoriteProduct: [] }))
```

---

### 🗄️ Sanity Query Functions (sanity/queries/index.ts)

All functions for fetching data from Sanity CMS.

#### Product Queries:

**1. getCategories(quantity?: number)**
```typescript
// Fetches all categories with product count
// Optional: limit number of categories returned
async function getCategories(quantity?: number) {
  const query = quantity
    ? `*[_type == "category"] | order(name asc) [0...$quantity] {
        ...,
        "productCount": count(*[_type == "product" && references(^._id)])
      }`
    : `*[_type == "category"] | order(name asc) {
        ...,
        "productCount": count(*[_type == "product" && references(^._id)])
      }`;
  
  const { data } = await sanityFetch({
    query,
    params: quantity ? { quantity } : {}
  });
  
  return data;
}
```

**Usage:**
```typescript
// Get all categories
const categories = await getCategories();

// Get first 6 categories
const limitedCategories = await getCategories(6);
```

**2. getDealProducts()**
```typescript
// Fetches products marked as "hot" deals
async function getDealProducts() {
  const { data } = await sanityFetch({ 
    query: DEAL_PRODUCT_QUERY 
  });
  return data ?? [];
}
```

**3. getProductDetails(slug: string)**
```typescript
// Fetches single product by slug
async function getProductDetails(slug: string) {
  const { data } = await sanityFetch({ 
    query: PRODUCT_BY_SLUG_QUERY,
    params: { slug }
  });
  return data ?? null;
}
```

**Usage:**
```typescript
const product = await getProductDetails('iphone-15-pro');
```

**4. getProductDetailsBrand(slug: string)**
```typescript
// Fetches brand information for a product
async function getProductDetailsBrand(slug: string) {
  const { data } = await sanityFetch({ 
    query: BRAND_PRODUCT_DETAILS_QUERY,
    params: { slug }
  });
  return data ?? [];
}
```

#### Brand Queries:

**5. getAllBrands()**
```typescript
// Fetches all brands
async function getAllBrands() {
  const { data } = await sanityFetch({ 
    query: BRANDS_QUERY 
  });
  return data ?? [];
}
```

#### Order Queries:

**6. getOrdersByUser(userId: string)**
```typescript
// Fetches all orders for a specific user
async function getOrdersByUser(userId: string) {
  const { data } = await sanityFetch({ 
    query: ORDERS_BY_USER_QUERY,
    params: { userId }
  });
  return data ?? null;
}
```

**Usage:**
```typescript
const orders = await getOrdersByUser('user_123');
```

#### Blog Queries:

**7. getLatestBlogs()**
```typescript
// Fetches latest 5 blog posts
async function getLatestBlogs() {
  const { data } = await sanityFetch({ 
    query: LATEST_BLOG_QUERY 
  });
  return data ?? [];
}
```

**8. getAllBlogs(quantity: number)**
```typescript
// Fetches all blogs with optional limit
async function getAllBlogs(quantity: number) {
  const { data } = await sanityFetch({ 
    query: ALL_BLOGS_QUERY,
    params: { quantity }
  });
  return data ?? null;
}
```

**9. getSingleBlog(slug: string)**
```typescript
// Fetches single blog post by slug
async function getSingleBlog(slug: string) {
  const { data } = await sanityFetch({ 
    query: SINGLE_BLOG_QUERY,
    params: { slug }
  });
  return data ?? null;
}
```

**10. getBlogCategories()**
```typescript
// Fetches all blog categories
async function getBlogCategories() {
  const { data } = await sanityFetch({ 
    query: BLOG_CATEGORIES_QUERY 
  });
  return data ?? null;
}
```

**11. getBlogOtherCategories(slug: string, quantity: number)**
```typescript
// Fetches related blog posts (excluding current)
async function getBlogOtherCategories(slug: string, quantity: number) {
  const { data } = await sanityFetch({ 
    query: BLOG_OTHER_CATEGORIES_QUERY,
    params: { slug, quantity }
  });
  return data ?? [];
}
```

---

### 🎨 Utility Functions (lib/utils.ts)

**cn(...inputs: ClassValue[])**
```typescript
// Merges Tailwind CSS classes intelligently
// Handles conflicts and removes duplicates
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

**Usage:**
```typescript
// Merge classes
const className = cn(
  'px-4 py-2',
  'bg-blue-500',
  isActive && 'bg-green-500', // Conditional class
  'hover:bg-blue-600'
);

// Result: 'px-4 py-2 bg-green-500 hover:bg-blue-600'
// Note: bg-green-500 overrides bg-blue-500
```

---

### 🧩 Key Components

#### 1. AddToCartButton Component

**Location:** `components/AddToCartBUtton.tsx`

**Purpose:** Handles adding products to cart with stock validation

**Key Features:**
- Stock validation before adding
- Shows quantity controls if item already in cart
- Displays subtotal for items in cart
- Toast notifications for user feedback

**Props:**
```typescript
interface Props {
  product: Product;
  className?: string;
}
```

**Usage:**
```typescript
<AddToCartButton product={product} className="w-full" />
```

#### 2. QuantityButton Component

**Location:** `components/QuantityButton.tsx`

**Purpose:** Increment/decrement product quantity in cart

**Key Features:**
- Increase quantity (with stock validation)
- Decrease quantity
- Disabled when out of stock
- Toast notifications

**Props:**
```typescript
interface Props {
  product: Product;
  className?: string;
}
```

**Usage:**
```typescript
<QuantityButton product={product} />
```

#### 3. ProductCard Component

**Location:** `components/ProductCard.tsx`

**Purpose:** Displays product information in grid/list

**Key Features:**
- Product image with hover effect
- Price with discount calculation
- Stock status
- Add to cart button
- Add to wishlist button
- Product badges (NEW, SALE, HOT)
- Star ratings

**Props:**
```typescript
interface Props {
  product: Product;
}
```

**Usage:**
```typescript
<ProductCard product={product} />
```

#### 4. ProductGrid Component

**Location:** `components/ProductGrid.tsx`

**Purpose:** Displays filterable product grid on home page

**Key Features:**
- Category filtering
- Loading states
- Empty state handling
- Smooth animations

**State:**
```typescript
const [products, setProducts] = useState<Product[]>([]);
const [loading, setLoading] = useState(false);
const [selectedTab, setSelectedTab] = useState("all");
```

**Usage:**
```typescript
<ProductGrid />
```

#### 5. Header Component

**Location:** `components/Header.tsx`

**Purpose:** Main navigation header

**Key Features:**
- Logo
- Navigation menu
- Search bar
- Cart icon with count
- Wishlist icon
- Orders icon
- Sign in button
- Mobile menu

**Usage:**
```typescript
<Header />
```

#### 6. ErrorBoundary Component

**Location:** `components/ErrorBoundary.tsx`

**Purpose:** Catches and handles React errors gracefully

**Key Features:**
- Catches component errors
- Shows user-friendly error message
- Displays error details in development
- Refresh button to recover

**Props:**
```typescript
interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}
```

**Usage:**
```typescript
<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>
```

#### 7. PriceFormater Component

**Location:** `components/PriceFormater.tsx`

**Purpose:** Formats prices consistently across the app

**Key Features:**
- Currency formatting (USD)
- Handles null/undefined values
- Customizable styling

**Props:**
```typescript
interface Props {
  amount?: number;
  className?: string;
}
```

**Usage:**
```typescript
<PriceFormater amount={99.99} className="text-lg font-bold" />
// Output: $99.99
```

---

### 📄 Page Components

#### 1. Home Page

**Location:** `app/(client)/page.tsx`

**Components:**
- HomeBanner - Hero section
- ProductGrid - Filterable products
- HomeCategories - Category cards
- ShopBrands - Brand logos
- LatestBlog - Recent blog posts

#### 2. Shop Page

**Location:** `app/(client)/shop/page.tsx`

**Features:**
- All products display
- Category filtering
- Brand filtering
- Price range filtering
- Search functionality

#### 3. Product Detail Page

**Location:** `app/(client)/product/[slug]/page.tsx`

**Features:**
- Product images carousel
- Product information
- Price and discount
- Stock status
- Add to cart
- Add to wishlist
- Product characteristics
- Related products

#### 4. Cart Page

**Location:** `app/(client)/cart/page.tsx`

**Features:**
- Cart items list
- Quantity controls
- Remove items
- Price calculation
- Delivery address selection
- Checkout button
- Order summary

**Key Functions:**
```typescript
// Handle checkout
async function handleCheckout() {
  // Validate address
  // Validate cart
  // Create checkout session
  // Redirect to Stripe
}

// Get addresses
async function getAddresses() {
  // Fetch user addresses from Sanity
  // Set default address
}

// Delete product
function handleDeleteProduct(id: string) {
  deleteCartProduct(id);
  toast.success("Product deleted from cart");
}
```

#### 5. Orders Page

**Location:** `app/(client)/orders/page.tsx`

**Features:**
- Order history
- Order details
- Order status
- Invoice download
- Cancel order
- Hide order

**Protected:** Requires authentication

#### 6. Success Page

**Location:** `app/(client)/success/page.tsx`

**Features:**
- Order confirmation
- Order number display
- Next steps information
- Navigation links
- Cart reset

**URL Parameters:**
- `session_id` - Stripe session ID
- `order_number` - Order number

#### 7. Wishlist Page

**Location:** `app/(client)/wishlist/page.tsx`

**Features:**
- Saved products
- Remove from wishlist
- Add to cart
- Empty state

---

### 🔄 Server Actions

#### createCheckOutSession

**Location:** `actions/CheckOutSession.ts`

**Purpose:** Creates Stripe checkout session with stock validation

**Parameters:**
```typescript
interface GroupedItems {
  product: CartItem["product"];
  quantity: number;
}

interface Metadata {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  clerkUserId: string | undefined;
  address: Address | null;
}
```

**Process:**
1. Validate cart is not empty
2. Validate email format
3. Check stock availability for each product
4. Find or create Stripe customer
5. Create checkout session
6. Return checkout URL

**Usage:**
```typescript
const checkoutUrl = await createCheckOutSession(groupedItems, metadata);
if (checkoutUrl) {
  window.location.href = checkoutUrl;
}
```

---

### 🎣 Custom Hooks

#### useStore

**Location:** `store.ts`

**Purpose:** Access cart and wishlist state

**Usage:**
```typescript
// Get specific functions
const { addItem, removeItem, getTotalPrice } = useStore();

// Get state
const items = useStore((state) => state.items);
const favoriteProduct = useStore((state) => state.favoriteProduct);
```

---

### 🔍 Search Functionality

**Location:** `components/SearchModal.tsx` & `components/ٍSearchProvider.tsx`

**Features:**
- Real-time search
- Product suggestions
- Keyboard navigation
- Search history

**Query:**
```typescript
const SEARCH_PRODUCTS_QUERY = `
  *[_type == "product" && name match $searchTerm + "*"] 
  | order(name asc) [0...10] {
    _id,
    name,
    slug,
    price,
    images,
    "category": category->name
  }
`;
```

---

### 📱 Responsive Design

All components are fully responsive using Tailwind CSS breakpoints:

```typescript
// Mobile first approach
className="
  w-full           // Mobile
  md:w-1/2         // Tablet
  lg:w-1/3         // Desktop
  xl:w-1/4         // Large desktop
"
```

**Breakpoints:**
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

---

### 🎭 Animations

**Library:** Framer Motion

**Common Patterns:**

```typescript
// Fade in
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.3 }}
>

// Slide up
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>

// Scale
<motion.div
  initial={{ scale: 0 }}
  animate={{ scale: 1 }}
  transition={{ type: "spring", stiffness: 200 }}
>
```

---

### 🔔 Notifications

**Library:** React Hot Toast

**Usage:**
```typescript
import toast from 'react-hot-toast';

// Success
toast.success('Product added to cart');

// Error
toast.error('Something went wrong');

// Loading
const toastId = toast.loading('Processing...');
toast.success('Done!', { id: toastId });

// Custom
toast.custom((t) => (
  <div>Custom notification</div>
));
```

**Configuration:**
```typescript
<Toaster
  position="bottom-right"
  toastOptions={{
    style: {
      background: "#000000",
      color: "#fff"
    }
  }}
/>
```

---

This comprehensive guide covers all major functions and components in the FreshCart application. Each function is documented with its purpose, parameters, return values, and usage examples.
