import { lazy, Suspense } from 'react';
import {
  Outlet,
  RouteObject,
  useRoutes,
  BrowserRouter,
} from 'react-router-dom';
import Home from '../screens/Home';
import { useAuthState } from '../contexts/UserContext';
import NavBar from '../shared/NavBar';

const Loading = () => (
  <p className="p-4 w-full h-full text-center">Loading...</p>
);

const IndexScreen = lazy(() => import('~/components/screens/Index'));
const Page404Screen = lazy(() => import('~/components/screens/404'));

function Layout() {
  return (
    <div className="relative z-50">
      <NavBar />
      <Outlet />
    </div>
  );
}

export const Router = () => {
  return (
    <BrowserRouter>
      <InnerRouter />
    </BrowserRouter>
  );
};

const InnerRouter = () => {
  const { state } = useAuthState();

  const routes: RouteObject[] = [
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <IndexScreen />,
        },
        {
          path: 'home',
          element: <Home />,
        },
      ],
    },
    {
      path: '*',
      element: <Page404Screen />,
    },
  ];
  const element = useRoutes(routes);
  return (
    <>
      {state.state === 'UNKNOWN' ? (
        <Loading />
      ) : (
        <Suspense fallback={<Loading />}>{element}</Suspense>
      )}
    </>
  );
};
