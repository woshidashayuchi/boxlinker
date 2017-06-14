
import React from 'react';
import Layout from '../../../components/Layout';

export default {
  path: '/serviceList',
  async action() {

    const ServiceList = await new Promise((resolve) => {
      require.ensure([], (require) => resolve(require('./ServiceListContainer').default), 'serviceList');
    });

    return {
      title: '服务列表',
      chunk: 'serviceList',
      component: <Layout><ServiceList/></Layout>,
    }
  }
}
