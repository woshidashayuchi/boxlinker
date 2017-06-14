
import React from 'react';
import Layout from '../../../components/Layout';

export default {
  path: '/serviceDetail/:serviceUuid/:tabs',
  async action(ctx,params) {

    const ServiceDetail = await new Promise((resolve) => {
      require.ensure([], (require) => resolve(require('./ServiceDeatilContainer').default), 'serviceDetail');
    });

    return {
      title: '服务详情',
      chunk: 'serviceDetail',
      component: <Layout><ServiceDetail serviceUuid={params.serviceUuid} tabs = {params.tabs} /></Layout>,
    }
  }
}
