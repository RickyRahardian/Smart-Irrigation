// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { lazy } from 'react';
import { Navigate, createBrowserRouter } from 'react-router';
import Loadable from 'src/layouts/full/shared/loadable/Loadable';


/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

// Dashboard
const Dashboard = Loadable(lazy(() => import('../views/dashboards/Dashboard')));

// Regions
const Region1 = Loadable(lazy(() => import('../views/regions/region1')));
const Region2 = Loadable(lazy(() => import('../views/regions/region2')));
const Region3 = Loadable(lazy(() => import('../views/regions/region3')));
const Region4 = Loadable(lazy(() => import('../views/regions/region4')));
const Region5 = Loadable(lazy(() => import('../views/regions/region5')));
const Region6 = Loadable(lazy(() => import('../views/regions/region6')));
const Region7 = Loadable(lazy(() => import('../views/regions/region7')));
const Region8 = Loadable(lazy(() => import('../views/regions/region8')));
const Region9 = Loadable(lazy(() => import('../views/regions/region9')));
const Region10 = Loadable(lazy(() => import('../views/regions/region10')));

// utilities
const Typography = Loadable(lazy(() => import('../views/typography/Typography')));
const Table = Loadable(lazy(() => import('../views/tables/Table')));
const Form = Loadable(lazy(() => import('../views/forms/Form')));
const Shadow = Loadable(lazy(() => import('../views/shadows/Shadow')));

// icons
const Solar = Loadable(lazy(() => import('../views/icons/Solar')));

// authentication
const Login = Loadable(lazy(() => import('../views/auth/login/Login')));
const Register = Loadable(lazy(() => import('../views/auth/register/Register')));
const SamplePage = Loadable(lazy(() => import('../views/sample-page/SamplePage')));
const Error = Loadable(lazy(() => import('../views/auth/error/Error')));

const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', exact: true, element: <Dashboard /> },
      { path: '/region1', exact: true, element: <Region1 /> },
      { path: '/region2', exact: true, element: <Region2 /> },
      { path: '/region3', exact: true, element: <Region3 /> },
      { path: '/region4', exact: true, element: <Region4 /> },
      { path: '/region5', exact: true, element: <Region5 /> },
      { path: '/region6', exact: true, element: <Region6 /> },
      { path: '/region7', exact: true, element: <Region7 /> },
      { path: '/region8', exact: true, element: <Region8 /> },
      { path: '/region9', exact: true, element: <Region9 /> },
      { path: '/region10', exact: true, element: <Region10 /> },
      { path: '/ui/typography', exact: true, element: <Typography /> },
      { path: '/ui/table', exact: true, element: <Table /> },
      { path: '/ui/form', exact: true, element: <Form /> },
      { path: '/ui/shadow', exact: true, element: <Shadow /> },
      { path: '/icons/solar', exact: true, element: <Solar /> },
      { path: '/sample-page', exact: true, element: <SamplePage /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/',
    element: <BlankLayout />,
    children: [
      { path: '/auth/login', element: <Login /> },
      { path: '/auth/register', element: <Register /> },
      { path: '404', element: <Error /> },
      { path: '/auth/404', element: <Error /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];

const router = createBrowserRouter(Router, { basename: '/MatDash' });
export default router;
