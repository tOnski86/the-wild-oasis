import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { StyleSheetManager } from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';

import Account from './pages/Account';
import Bookings from './pages/Bookings';
import Cabins from './pages/Cabins';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import Settings from './pages/Settings';
import Users from './pages/Users';
import AppLayout from './ui/AppLayout';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <PageNotFound />,
    children: [
      { index: true, element: <Navigate replace to='dashboard' /> },
      { path: '/account', element: <Account /> },
      { path: '/bookings', element: <Bookings /> },
      { path: '/cabins', element: <Cabins /> },
      { path: '/dashboard', element: <Dashboard /> },
      { path: '/settings', element: <Settings /> },
      { path: '/users', element: <Users /> },
    ],
  },

  { path: '/login', element: <Login /> },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <StyleSheetManager shouldForwardProp={prop => prop !== 'variation'}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <GlobalStyles />
        <RouterProvider router={router} />
        <Toaster
          position='top-center'
          gutter={12}
          containerStyle={{ margin: '.8rem' }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: '1.6rem',
              maxWidth: '50rem',
              padding: '1.6rem 2.4rem',
              backgroundColor: 'var(--color-grey-0)',
              color: 'var(--color-grey-700)',
            },
          }}
        />
      </QueryClientProvider>
    </StyleSheetManager>
  );
}

export default App;
