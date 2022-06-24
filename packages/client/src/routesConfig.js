const routesConfig = () => [
  {
    path: '/',
    roles: {
      admin: import('./app/pages/Home'),
    },
    page: 'home',
    pageTitle: 'Home',
    menu: {
      path: '/',
      title: 'home',
      testId: 'home-route',
      icon: 'users',
    },
  },
  {
    path: '/banks',
    roles: {
      admin: import('./app/pages/Banks'),
    },
    page: 'banks',
    pageTitle: 'Banks',
    menu: {
      path: '/banks',
      title: 'banks',
      testId: 'banks-route',
      icon: 'globe',
    },
  },
];

export { routesConfig };
