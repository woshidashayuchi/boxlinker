
import React from 'react';
import Layout from '../../../components/Layout';

export default {
  path: '/serviceRecovery',
  async action() {

    const ServiceRecovery = await new Promise((resolve) => {
      require.ensure([], (require) => resolve(require('./ServiceRecoveryContainer').default), 'serviceRecovery');
    });

    return {
      title: '服务回收',
      chunk: 'serviceRecovery',
      component: <Layout><ServiceRecovery/></Layout>,
    }
  }
}
