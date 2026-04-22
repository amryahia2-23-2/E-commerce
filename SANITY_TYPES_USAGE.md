# استخدام أنواع Sanity في المشروع

## جميع الأنواع المتاحة من sanity.types.ts

### 1. Schema Types (الأنواع الأساسية)

#### Product Types
- ✅ `Product` - النوع الأساسي للمنتج
  - **المستخدم في**: `store.ts`, جميع مكونات Cart و Wishlist
  - **الخصائص**: _id, name, slug, description, images, price, discount, status, category, brand, stock, Reviews

- ✅ `ProductReference` - مرجع للمنتج
  - **المستخدم في**: `Order` type, `Review` type

#### Category Types
- ✅ `Category` - نوع الفئة
  - **المستخدم في**: `components/HomeCategories.tsx`, `components/shop/CategoryList.tsx`
  - **الخصائص**: _id, name, slug, description, range, featured, productCount, image

- ✅ `CategoryReference` - مرجع للفئة
  - **المستخدم في**: `Product` type

#### Brand Types
- ✅ `Brand` - نوع العلامة التجارية
  - **الخصائص**: _id, title, slug, description, image

- ✅ `BrandReference` - مرجع للعلامة التجارية
  - **المستخدم في**: `Product` type

#### Blog Types
- ✅ `BlogType` - نوع المدونة
  - **الخصائص**: _id, title, slug, author, mainImage, blogCategories, publishedAt, islatest, body

- ✅ `BlockCategory` - فئة المدونة
  - **المستخدم في**: `BlogType`
  - **الخصائص**: _id, title, description, slug

- ✅ `Author` - نوع المؤلف
  - **الخصائص**: _id, name, slug, image, bio

#### Order Types
- ✅ `Order` - نوع الطلب
  - **الخصائص**: _id, orderNumber, invoice, stripeCustomerId, clerkUserId, customerName, email, products, totalPrice, currency, address, status, orderDate

- ✅ `Address` - نوع العنوان
  - **المستخدم في**: `app/(client)/cart/page.tsx`
  - **الخصائص**: _id, name, email, address, city, state, zipCode, isDefault

#### Review Types
- ✅ `Review` - نوع المراجعة
  - **الخصائص**: _id, product, name, rating, comment

#### Image Types
- ✅ `SanityImageAssetReference` - مرجع صورة Sanity
- ✅ `SanityImageCrop` - قص الصورة
- ✅ `SanityImageHotspot` - نقطة التركيز في الصورة
- ✅ `SanityImageMetadata` - بيانات الصورة الوصفية

#### Other Types
- ✅ `Slug` - نوع الـ slug
- ✅ `BlockContent` - محتوى المدونة
- ✅ `Geopoint` - الموقع الجغرافي

---

### 2. Query Result Types (أنواع نتائج الاستعلامات)

#### Product Query Results
- ✅ `DEAL_PRODUCT_QUERY_RESULT` - منتجات العروض الساخنة
  - **المستخدم في**: `app/(client)/deal/page.tsx`
  - **الفرق عن Product**: category هو object كامل بدلاً من reference

- ✅ `PRODUCT_BY_SLUG_QUERY_RESULT` - تفاصيل منتج واحد
  - **المستخدم في**: `app/(client)/product/[slug]/page.tsx`, `components/ProductCharacteristics.tsx`
  - **الفرق عن Product**: category هو string بدلاً من object

- ✅ `SEARCH_PRODUCTS_QUERY_RESULT` - نتائج البحث عن المنتجات
  - **المستخدم في**: `components/SearchModal.tsx`
  - **الفرق عن Product**: يحتوي على حقول محدودة فقط

#### Brand Query Results
- ✅ `BRANDS_QUERY_RESULT` - جميع العلامات التجارية
  - **المستخدم في**: `components/ShopBrands.tsx`, `components/shop/BrandsList.tsx`, `app/(client)/shop/page.tsx`

- ✅ `BRAND_PRODUCT_DETAILS_QUERY_RESULT` - اسم العلامة التجارية للمنتج
  - **المستخدم في**: `components/ProductCharacteristics.tsx`
  - **يحتوي على**: brandName فقط

#### Blog Query Results
- ✅ `LATEST_BLOG_QUERY_RESULT` - أحدث المدونات
  - **المستخدم في**: `components/LatestBlog.tsx`
  - **يحتوي على**: title, slug, mainImage, publishedAt, blogCategories

- ✅ `ALL_BLOGS_QUERY_RESULT` - جميع المدونات
  - **المستخدم في**: `app/(client)/blog/page.tsx`

- ✅ `SINGLE_BLOG_QUERY_RESULT` - مدونة واحدة
  - **المستخدم في**: `app/(client)/blog/[slug]/page.tsx`
  - **الفرق**: author و blogCategories محملة بالكامل

- ✅ `BLOG_CATEGORIES_QUERY_RESULT` - فئات المدونات
  - **المستخدم في**: `components/BlogLeftSide.tsx`

- ✅ `BLOG_OTHER_CATEGORIES_QUERY_RESULT` - مدونات أخرى
  - **المستخدم في**: `components/BlogLeftSide.tsx`

#### Order Query Results
- ✅ `ORDERS_BY_USER_QUERY_RESULT` - طلبات المستخدم
  - **المستخدم في**: `app/(client)/orders/page.tsx`, `components/OrdersLayout.tsx`, `components/OrderDetails.tsx`
  - **الفرق عن Order**: products.product محمل بالكامل بدلاً من reference

---

## خريطة استخدام الأنواع في الملفات

### Store & State Management
```typescript
// store.ts
- CartItem.product: Product
- CartState.favoriteProduct: Product[]
```

### Pages
```typescript
// app/(client)/deal/page.tsx
- dealProduct: DEAL_PRODUCT_QUERY_RESULT

// app/(client)/product/[slug]/page.tsx
- productDetails: PRODUCT_BY_SLUG_QUERY_RESULT

// app/(client)/blog/page.tsx
- blogs: ALL_BLOGS_QUERY_RESULT

// app/(client)/blog/[slug]/page.tsx
- singleBlog: SINGLE_BLOG_QUERY_RESULT

// app/(client)/orders/page.tsx
- orders: ORDERS_BY_USER_QUERY_RESULT

// app/(client)/shop/page.tsx
- brands: BRANDS_QUERY_RESULT
- categories: Category[]

// app/(client)/cart/page.tsx
- addresses: Address[]
- selectedAddress: Address | null
```

### Components
```typescript
// components/ProductCard.tsx
- product: Product

// components/SearchModal.tsx
- products: SEARCH_PRODUCTS_QUERY_RESULT

// components/LatestBlog.tsx
- blogs: LATEST_BLOG_QUERY_RESULT

// components/BlogLeftSide.tsx
- blogCategories: BLOG_CATEGORIES_QUERY_RESULT
- blogs: BLOG_OTHER_CATEGORIES_QUERY_RESULT

// components/ProductCharacteristics.tsx
- product: PRODUCT_BY_SLUG_QUERY_RESULT
- brand: BRAND_PRODUCT_DETAILS_QUERY_RESULT

// components/OrdersLayout.tsx
- orders: ORDERS_BY_USER_QUERY_RESULT

// components/OrderDetails.tsx
- order: ORDERS_BY_USER_QUERY_RESULT[number]

// components/ShopBrands.tsx
- brands: BRANDS_QUERY_RESULT

// components/HomeCategories.tsx
- categories: Category[]
```

---

## الفروقات المهمة بين الأنواع

### Product vs Query Results

1. **Product** (النوع الأساسي)
   - `category`: CategoryReference (مرجع)
   - يستخدم في: Store, Cart, Wishlist

2. **DEAL_PRODUCT_QUERY_RESULT[number]**
   - `category`: { _id: string, name: string | null } (object كامل)
   - يستخدم في: صفحة العروض

3. **PRODUCT_BY_SLUG_QUERY_RESULT**
   - `category`: string | null (اسم الفئة فقط)
   - يستخدم في: صفحة تفاصيل المنتج

4. **SEARCH_PRODUCTS_QUERY_RESULT[number]**
   - حقول محدودة: _id, name, slug, price, images, category
   - يستخدم في: البحث

### Order vs ORDERS_BY_USER_QUERY_RESULT

1. **Order** (النوع الأساسي)
   - `products[].product`: ProductReference (مرجع فقط)

2. **ORDERS_BY_USER_QUERY_RESULT[number]**
   - `products[].product`: Product object كامل (محمل)
   - يستخدم في: عرض الطلبات

---

## قواعد الاستخدام

### متى تستخدم النوع الأساسي؟
- في Store (zustand)
- في المكونات التي تتعامل مع Cart/Wishlist
- عند الحاجة لنوع عام يعمل مع جميع المنتجات

### متى تستخدم Query Result Type؟
- في الصفحات التي تجلب البيانات من Sanity
- عند الحاجة لبيانات محددة من استعلام معين
- عند وجود علاقات محملة (populated)

### كيف تتعامل مع category؟
```typescript
// في المكونات التي تستقبل أنواع مختلفة
{typeof product?.category === 'string' 
    ? product?.category 
    : product?.category?.name}
```

---

## الحالة النهائية

✅ **جميع الأنواع مستخدمة بشكل صحيح**
✅ **لا توجد أخطاء TypeScript**
✅ **جميع Query Results لها أنواع محددة**
✅ **Store يستخدم النوع الأساسي Product**
✅ **جميع الصفحات تستخدم الأنواع الصحيحة**

---

تم التحديث: 2026-04-22
