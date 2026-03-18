# 🛍️ Product Management Dashboard

A modern product management dashboard built with **Next.js (App Router)**, **TypeScript**, **Redux Toolkit (RTK Query)**, and **Ant Design**.

This project demonstrates scalable frontend architecture, efficient data fetching, and clean UI composition.

---

## 🚀 Tech Stack

* **Framework:** Next.js (App Router)
* **Language:** TypeScript
* **State Management:** Redux Toolkit
* **Data Fetching:** RTK Query
* **UI Library:** Ant Design
* **Styling:** Tailwind CSS + Styled Components

---

## 🧠 Architecture Decisions

### 1. Feature-Based Folder Structure

The project follows a **feature-first architecture**:

```
src/
  app/
    products/
      [id]/
        page.tsx
      page.tsx
```

**Why?**

* Improves scalability
* Keeps related logic co-located
* Reduces cross-module dependency

---

### 2. RTK Query for Data Fetching

Used **RTK Query** instead of Axios/React Query.

**Benefits:**

* Built-in caching
* Automatic loading & error states
* API slice centralization
* Easy mutation handling

Example:

```ts
getProducts: builder.query<ProductsResponse, GetProductsQuery>({
  query: (params) => ({
    url: "/products",
    params,
  }),
});
```

---

### 3. Separation of Concerns

| Layer         | Responsibility       |
| ------------- | -------------------- |
| `types.ts`    | Data contracts       |
| `columns/`    | Table configuration  |
| `components/` | UI components        |
| `api/`        | Server communication |

---

### 4. Reusable Table Columns

Columns are extracted into separate files:

```
columns/productColumns.tsx
```

**Why?**

* Reusability across pages
* Cleaner component files
* Easier testing and maintenance

---

### 5. Drawer-Based Editing UX

Instead of navigating to a new page, editing is done via:

👉 **Ant Design Drawer**

**Why?**

* Better UX (no page reload)
* Keeps context visible
* Faster workflows

---

### 6. Form Handling Strategy

* Ant Design `Form`
* Custom validation rules
* Centralized `form` instance (parent-controlled)

**Why?**

* Avoids uncontrolled state issues
* Prevents Ant Design warnings
* Better lifecycle control

---

### 7. Search & Filtering Strategy

* Search handled via RTK Query params
* Category filter via API or local state

```ts
useGetProductsQuery({
  q: searchInput,
});
```

---

### 8. Loading UX (Skeletons)

Used **Skeleton loaders** instead of spinners 

**Why?**

* Prevents layout shift
* Improves perceived performance
* Matches production UX standards

---

### 9. Ant Design App Provider Fix

Used:

```tsx
<App>
```

instead of static `message`

**Why?**

* Supports dynamic theming
* Avoids context warnings

---

## 📂 Folder Structure

```
src/
    app/
      products/
        [id]/
          page.tsx
        page.tsx
    components/
      ProductDetails/
        ProductDetailsPageClient.tsx/
        ProductDetailsSkeleton.tsx/
      ProductList/
        column.tsx/
        ProductPageClient.tsx
        ProductTablesSkeleton.tsx/
      ProductEditDrawer.tsx
    types/
      types.ts
    lib/
      redux/
        store.ts
        hooks.ts
        provider.tsx
      services/
        api.ts
```

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/arshad657/roxnor-task.git
cd roxnor-task
```

---

### 2. Install dependencies

```bash
npm install
```

or

```bash
yarn install
```

---

### 3. Setup environment variables

Create a `.env` file:

```env
NEXT_PUBLIC_API_BASE_URL=https://dummyjson.com/
```

---

### 4. Run development server

```bash
npm run dev
```

App will be available at:

```
http://localhost:3000
```

---

## 🧪 Available Scripts

```bash
npm run dev        # Start dev server
npm run build      # Build production
npm run start      # Run production build
npm run lint       # Run ESLint
```

---

## 📌 Key Features

* ✅ Product listing with search
* ✅ Category filtering
* ✅ Product detail page
* ✅ Drawer-based editing
* ✅ Form validation
* ✅ Skeleton loading UI
* ✅ Modular architecture

---

## 👨‍💻 Arshad Almas

Built with a focus on **scalability, maintainability, and production-ready patterns**.

---

## 📄 License

MIT License
