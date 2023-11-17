import { lazy, Suspense } from 'react';
import {
  Outlet,
  RouteObject,
  useRoutes,
  BrowserRouter,
} from 'react-router-dom';
import Home from '../screens/Home';
import AuthHandler from './handlers/AuthHandler';
import { changeTheme } from '~/helpers/change-theme';
import { SignOutButton } from '../domain/auth/SignOutButton';
import { useAuthState } from '../contexts/UserContext';
import logoSymbol from '~/assets/images/logoSymbol.svg';

const Loading = () => (
  <p className="p-4 w-full h-full text-center">Loading...</p>
);

const IndexScreen = lazy(() => import('~/components/screens/Index'));
const Page404Screen = lazy(() => import('~/components/screens/404'));

function Layout() {
  return (
    <div className="relative z-50">
      <div className="pt-4 px-4 sticky top-0 z-[100] min-[768px]:px-8">
        <div className="navbar glass bg-none hover:bg-none rounded-box relative">
          <div className="flex-1 px-2 lg:flex-none">
            <a className="font-bold btn btn-ghost normal-case text-xl gap-x-1">
              <img src={logoSymbol} className="h-4 w-4" />
              Foxbat
            </a>
          </div>
          <div className="flex justify-end flex-1 px-2">
            <div className="flex items-stretch">
              <label className="swap swap-rotate px-4">
                {/* this hidden checkbox controls the state */}
                <input onClick={changeTheme} type="checkbox" />

                {/* sun icon */}
                <svg
                  className="swap-on fill-current w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24">
                  <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                </svg>

                {/* moon icon */}
                <svg
                  className="swap-off fill-current w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24">
                  <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                </svg>
              </label>
              <SignOutButton />
            </div>
          </div>
        </div>
      </div>
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
          handle: AuthHandler(),
          element: <IndexScreen />,
        },
        {
          path: 'Home',
          element: <Home />,
        },
        {
          path: '*',
          element: <Page404Screen />,
        },
      ],
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
