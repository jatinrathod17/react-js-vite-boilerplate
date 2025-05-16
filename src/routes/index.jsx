import { OnlineGuard } from '@components/layouts/OnlineGuard';
import PrivateLayout from '@components/layouts/PrivateLayout';
import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

// Lazy loaded components
const UserList = lazy(() => import('@pages/UserList'));
const Dashboard = lazy(() => import('@pages/Dashboard'));
const NotFound = lazy(() => import('@pages/NotFound'));

const Login = lazy(() => import('@pages/Login'));
const ForgotPassword = lazy(() => import('@pages/ForgotPassword'));

const Routes = () => {
  // Replace with real auth logic
  const isAuthenticated = true;

  const router = createBrowserRouter([
    // Protected app routes
    {
      path: '/',
      element: <PrivateLayout />,
      children: [
        {
          path: 'dashboard',
          element: (
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Dashboard />
            </PrivateRoute>
          ),
        },
        {
          path: 'users',
          element: (
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <UserList />
            </PrivateRoute>
          ),
        },
      ],
    },
    // Public routes
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/forgot-password',
      element: <ForgotPassword />,
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
      fallback={
        <div className="flex h-screen w-full items-center justify-center">
          Loading...
        </div>
      }>
      <RouterProvider router={router} />
       <GlobalAlert />
      <GlobalToaster />
    </Suspense>
  );
};

export default Routes;
