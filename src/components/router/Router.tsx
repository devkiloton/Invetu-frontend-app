/* eslint-disable react/self-closing-comp */
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
import AuthGuard from '../guards/AuthGuard';
import UnAuthGuard from '../guards/UnAuthGuard';

const Loading = () => (
  <div className="h-screen w-screen flex flex-col gap-4 justify-center items-center">
    <span>Carregando...</span>
    <progress className="progress w-56"></progress>
  </div>
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
          element: (
            <UnAuthGuard pathToRedirect="/home" element={<IndexScreen />} />
          ),
        },
        {
          path: 'home',
          element: <AuthGuard pathToRedirect="/" element={<Home />} />,
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
