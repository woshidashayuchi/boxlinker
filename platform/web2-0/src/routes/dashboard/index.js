
import React from 'react';
import Layout from '../../components/Layout';

export default {
  path: '/',
  async action() {

    const Home = await new Promise((resolve) => {
      require.ensure([], (require) => resolve(require('./DashboardContainer').default), 'dashboard');
    });

    return {
      title: '控制台',
      chunk: 'dashboard',
      component: <Layout><Home/></Layout>,
    }
  }
}
