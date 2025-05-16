import GlobalAlert from '@components/common/GlobalAlert';
import { OnlineGuard } from '@components/layouts/OnlineGuard';
import PrivateLayout from '@components/layouts/PrivateLayout';
import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

// Lazy loaded components
const Dashboard = lazy(() => import('@pages/Dashboard'));
const NotFound = lazy(() => import('@pages/NotFound'));
const Login = lazy(() => import('@pages/Login'));
const ForgotPassword = lazy(() => import('@pages/ForgotPassword'));

const Routes = () => {
  // Replace this with real auth logic
  const isAuthenticated = true; // or true for testing

  const router = createBrowserRouter([
    // Public routes
    {
      path: '/',
      element: isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />,
    },
    {
      path: '/forgot-password',
      element: isAuthenticated ? <Navigate to="/dashboard" replace /> : <ForgotPassword />,
    },

    // Protected routes
    {
      path: '/',
      element: (
        <PrivateRoute isAuthenticated={isAuthenticated}>
          <PrivateLayout />
        </PrivateRoute>
      ),
      children: [
        {
          path: 'dashboard',
          element: <Dashboard />,
        },
      ],
    },

    // Fallback route
    {
      path: '*',
      element: (
        <OnlineGuard>
          <NotFound />
        </OnlineGuard>
      ),
    },
  ]);

  return (
    <Suspense
      fallback={<div className="flex h-screen w-full items-center justify-center">Loading...</div>}>
      <RouterProvider router={router} />
      <GlobalAlert />
    </Suspense>
  );
};

export default Routes;
