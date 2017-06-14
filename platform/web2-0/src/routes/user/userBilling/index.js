
import React from 'react';
import Layout from '../../../components/Layout';

export default {
  path: '/userBilling',
  async action() {

    const UserBilling = await new Promise((resolve) => {
      require.ensure([], (require) => resolve(require('./UserBillingContainer').default), 'userBilling');
    });

    return {
      title: '费用中心',
      chunk: 'userBilling',
      component: <Layout><UserBilling/></Layout>,
    }
  }
}

