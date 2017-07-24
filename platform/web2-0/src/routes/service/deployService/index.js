
import React from 'react';
import Layout from '../../../components/Layout';

export default {
  path: '/deployService',
  async action() {

    const DeployService = await new Promise((resolve) => {
      require.ensure([], (require) => resolve(require('./DeployServiceContainer').default), 'deployService');
    });

    return {
      title: '构建服务',
      chunk: 'deployService',
      component: <Layout><DeployService/></Layout>,
    }
  }
}


