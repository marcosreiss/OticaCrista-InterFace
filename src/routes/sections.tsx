import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import DashboardLayout from '../components/layout/dashboardLayout';


// ----------------------------------------------------------------------

export const HomePage = lazy(() => import('../pages/home'));
// export const BlogPage = lazy(() => import('src/pages/blog'));
// export const UserPage = lazy(() => import('src/pages/user'));
// export const SignInPage = lazy(() => import('src/pages/sign-in'));
// export const Page404 = lazy(() => import('src/pages/page-not-found'));
// export const AdminPage = lazy(() => import('src/pages/admin/admin'));

// // ---------- Costumer Components
// export const CustomersPage = lazy(() => import('src/pages/customers/customersIndex'));
// export const CustomersCreatePage = lazy(() => import('src/pages/customers/createCustomer'));
// export const CustomersDetailsPage = lazy(() => import('src/pages/customers/customersDetails'));
// export const CustomersEditPage = lazy(() => import('src/pages/customers/editCustomer'));

// ----------------------------------------------------------------------

const renderFallback = (
  <Box display="flex" alignItems="center" justifyContent="center" flex="1 1 auto">
    <LinearProgress
      sx={{
        width: 1,
        maxWidth: 320,
      }}
    />
  </Box>
);

export function PrivateRouter() {
  return useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense fallback={renderFallback}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <HomePage />, index: true },
        // { path: 'user', element: <UserPage /> },
        // { path: 'blog', element: <BlogPage /> },
        // { path: 'sales', element: <SalesPage /> },
        // { path: 'expenses', element: <ExpensesPage /> },
        // { path: 'employees', element: <EmployeesPage /> },
        // { path: 'admin', element: <AdminPage /> },

        // { path: 'customers', element: <CustomersPage /> },
        // { path: 'customers/create', element: <CustomersCreatePage /> },
        // { path: 'customers/details/:id', element: <CustomersDetailsPage /> },
        // { path: 'customers/edit/:id', element: <CustomersEditPage /> },

      ],
    },
    // { path: '404', element: <Page404 />, },
    { path: '*', element: <Navigate to="/404" replace />, },
  ]);
}

export function PublicRouter() {
  return useRoutes([
    { element: <HomePage />, index: true },
    // { element: <AuthLayout><SignInPage /></AuthLayout>, index: true },
    // { path: 'user', element: <AuthLayout><SignInPage /></AuthLayout> },

    // { path: 'products', element: <AuthLayout><SignInPage /></AuthLayout> },
    // { path: 'products/create', element: <AuthLayout><SignInPage /></AuthLayout> },
    // { path: 'products/details/:id', element: <AuthLayout><SignInPage /></AuthLayout> },
    // { path: 'products/edit/:id', element: <AuthLayout><SignInPage /></AuthLayout> },
    // { path: 'stock', element: <AuthLayout><SignInPage /></AuthLayout> },

    // { path: '404', element: <Page404 />, },
    { path: '*', element: <Navigate to="/404" replace />, },
  ])
}