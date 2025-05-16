# Vitredux (React + Redux + Vite)

This is a React project using Vite as the build tool. It includes Redux Toolkit for state management, React Router for navigation, and ESLint + Prettier for code quality.

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js (>= 18.0.0)** and **npm (>= 9.0.0)** installed.

### Installation

Clone the repository and install dependencies:

```sh
# Clone the repository
git clone giturl
cd react-boilerplate

# Install dependencies
npm install
```

### Running the Development Server

```sh
npm run dev
```

This will start the development server at `http://localhost:3000/` (default Vite port).

### Building for Production

```sh
npm run build
```

This will create a production-ready build in the `dist` folder.

### Running in Preview Mode

```sh
npm run preview
```

Serves the production build locally.

## 📂 Project Structure

```
vitredux/

# Project Structure:
├── .vscode/
│  ├── settings.json
├── public/
│  ├── favicon.ico
│  ├── logo192.png
│  ├── logo512.png
│  ├── manifest.json
│  ├── robots.txt
├── scripts/
│  ├── generateStructure.cjs
├── src/
│  ├── api/
│  │  ├── services/
│  │  │  ├── user.service.js
│  │  ├── authentication.js
│  │  ├── axios.config.js
│  │  ├── endpoints.js
│  ├── assets/
│  │  ├── favicon.ico
│  │  ├── logo192.png
│  │  ├── logo512.png
│  │  ├── manifest.json
│  │  ├── robots.txt
│  ├── components/
│  │  ├── common/
│  │  │  ├── CustomButton.jsx
│  │  │  ├── CustomModal.jsx
│  │  │  ├── ErrorBoundry.jsx
│  │  │  ├── GlobalAlert.jsx
│  │  │  ├── GlobalToaster.jsx
│  │  │  ├── Loader.jsx
│  │  ├── feature/
│  ├── config/
│  │  ├── index.js
│  ├── hooks/
│  │  ├── reduxHooks.ts
│  │  ├── translationWithFallback.js
│  │  ├── useTranslationWithFallback.js
│  ├── layouts/
│  │  ├── Header.jsx
│  │  ├── OnlineGuard.jsx
│  │  ├── PrivateLayout.jsx
│  ├── locales/
│  │  ├── en.json
│  ├── pages/
│  │  ├── Dashboard/
│  │  │  ├── index.jsx
│  │  ├── NotFound/
│  │  │  ├── index.jsx
│  │  ├── UserList.tsx
│  ├── routes/
│  │  ├── index.jsx
│  │  ├── paths.jsx
│  │  ├── PrivateRoute.jsx
│  ├── store/
│  │  ├── middleware/
│  │  │  ├── errorMiddleware.js
│  │  ├── slices/
│  │  │  ├── userSlice.js
│  │  ├── index.js
│  ├── styles/
│  │  ├── global.css
│  │  ├── variables.css
│  ├── utils/
│  │  ├── formatters.js
│  │  ├── lazyWithRetry.js
│  │  ├── redux.utils.js
│  │  ├── validators.js
│  ├── i18n.js
│  ├── main.css
│  ├── main.jsx
│  ├── react-app-env.d.ts
│  ├── reportWebVitals.js
│  ├── setupTests.ts
│  ├── vite-env.d.ts
├── .env
├── .env.development
├── .env.production
├── .env.staging
├── .eslintignore
├── .eslintrc.json
├── .gitignore
├── .prettierignore
├── .prettierrc.json
├── index.html
├── jsconfig.json
├── package.json
├── README.md
├── vite.config.js

```

## ⚙️ Environment Variables

Create an `.env` file for local development:

```
VITE_API_BASE=https://api.example.com
VITE_APP_TITLE=React Vite App
```

To use different environments, create `.env.development`, `.env.production`, etc., and run:

```sh
vite --mode staging
```

## 🔧 Scripts

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "lint": "eslint src --ext .js,.jsx",
  "format": "prettier --write \"src/**/*.{ts,tsx,js,jsx,css,scss,md}\""
}
```

## ✅ Linting & Formatting

- **Linting**: Run `npm run lint`
- **Formatting**: Run `npm run format`

## 📖 Additional Notes

- Uses **Vite** for fast builds and hot module replacement.
- Supports **ES Modules** and `import.meta.env` for environment variables.
- Includes **ESLint + Prettier** for code quality.
- Supports absolute imports using TypeScript paths (`@components`, `@utils`, etc.).
