# GreenCart Frontend (React + Vite)

This is the frontend for **GreenCart**, a MERN-based e-commerce platform.  
Built with React, Vite, and Tailwind CSS for a fast, modern, and responsive user experience.

[View live demo](https://green-cart-five-sigma.vercel.app/)

---

## Features

- Product listings with categories and best sellers
- Add to cart and cart management
- User authentication (login/register modal)
- Newsletter subscription
- Responsive design
- Toast notifications for user feedback
- Context API for global state management

---

## Project Structure

```
client/
  ├── public/              # Static assets (favicon, etc.)
  ├── src/
  │   ├── assets/          # Images, icons, and dummy data
  │   ├── components/      # Reusable React components (Navbar, Footer, etc.)
  │   ├── context/         # AppContext for global state
  │   ├── pages/           # Page components (Home, AllProducts, etc.)
  │   ├── App.jsx          # Main app component with routes
  │   ├── main.jsx         # Entry point
  │   └── index.css        # Tailwind and global styles
  ├── .env                 # Environment variables (currency, etc.)
  ├── package.json         # Project metadata and scripts
  ├── vite.config.js       # Vite configuration
  └── eslint.config.js     # ESLint configuration
```

---

## Getting Started

### 1. Install dependencies

```sh
npm install
```

### 2. Start the development server

```sh
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173) by default.

---

## Scripts

- `npm run dev` – Start development server
- `npm run build` – Build for production
- `npm run preview` – Preview production build
- `npm run lint` – Run ESLint

---

## Environment Variables

- `.env`  
  Example:

  ```
  VITE_CURRENCY=GH₵
  ```

---

## Customization

- **Products & Categories:**  
  Edit [`src/assets/assets.js`](src/assets/assets.js) to update product data, categories, and images.

- **Styling:**  
  Uses [Tailwind CSS](https://tailwindcss.com/) for utility-first styling.  
  Global styles in [`src/index.css`](src/index.css).

---

## License

This project is for educational/demo purposes.

---

## Credits

- UI inspired by modern e-commerce platforms
- Built with [React](https://react.dev/), [Vite](https://vitejs.dev/), and
