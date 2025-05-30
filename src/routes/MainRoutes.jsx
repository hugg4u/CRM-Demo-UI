import { lazy } from 'react';

// project imports
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';

// render- Dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/default')));

// render - color
const Color = Loadable(lazy(() => import('pages/component-overview/color')));
const Typography = Loadable(lazy(() => import('pages/component-overview/typography')));
const Shadow = Loadable(lazy(() => import('pages/component-overview/shadows')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/sample-page')));

// render - property pages
const PropertyCreate = Loadable(lazy(() => import('pages/property/PropertyCreate')));
const PropertyList = Loadable(lazy(() => import('pages/property/PropertyList')));

// render - customer pages
const CustomerCreate = Loadable(lazy(() => import('pages/customer/CustomerCreate')));
const CustomerList = Loadable(lazy(() => import('pages/customer/CustomerList')));

// render - notification pages
const NotificationCreate = Loadable(lazy(() => import('pages/notification/NotificationCreate')));
const NotificationList = Loadable(lazy(() => import('pages/notification/NotificationList')));

// render - appointment pages
const AppointmentCreate = Loadable(lazy(() => import('pages/appointment/AppointmentCreate')));
const AppointmentList = Loadable(lazy(() => import('pages/appointment/AppointmentList')));

// render - transaction pages
const TransactionCreate = Loadable(lazy(() => import('pages/transaction/TransactionCreate')));
const TransactionList = Loadable(lazy(() => import('pages/transaction/TransactionList')));

// render - permission pages
const AccountCreate = Loadable(lazy(() => import('pages/permission/AccountCreate')));
const EmployeeList = Loadable(lazy(() => import('pages/permission/EmployeeList')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <DashboardLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'property',
      children: [
        {
          path: 'create',
          element: <PropertyCreate />
        },
        {
          path: 'list',
          element: <PropertyList />
        },
        {
          path: 'map',
          element: <PropertyList />
        },
        {
          path: 'stop',
          element: <PropertyList />
        },
        {
          path: 'hide',
          element: <PropertyList />
        },
        {
          path: 'check',
          element: <PropertyList />
        }
      ]
    },
    {
      path: 'customer',
      children: [
        {
          path: 'create',
          element: <CustomerCreate />
        },
        {
          path: 'list',
          element: <CustomerList />
        }
      ]
    },
    {
      path: 'notification',
      children: [
        {
          path: 'create',
          element: <NotificationCreate />
        },
        {
          path: 'list',
          element: <NotificationList />
        }
      ]
    },
    {
      path: 'appointment',
      children: [
        {
          path: 'create',
          element: <AppointmentCreate />
        },
        {
          path: 'list',
          element: <AppointmentList />
        }
      ]
    },
    {
      path: 'transaction',
      children: [
        {
          path: 'create',
          element: <TransactionCreate />
        },
        {
          path: 'list',
          element: <TransactionList />
        }
      ]
    },
    {
      path: 'permission',
      children: [
        {
          path: 'account',
          children: [
            {
              path: 'create',
              element: <AccountCreate />
            }
          ]
        },
        {
          path: 'employee',
          children: [
            {
              path: 'list',
              element: <EmployeeList />
            }
          ]
        }
      ]
    },
    {
      path: 'color',
      element: <Color />
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    },
    {
      path: 'shadow',
      element: <Shadow />
    },
    {
      path: 'typography',
      element: <Typography />
    }
  ]
};

export default MainRoutes;
