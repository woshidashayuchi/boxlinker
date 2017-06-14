
import React from 'react';
import Layout from '../../../components/Layout';

export default {
  path: '/building',
  async action() {

    const Building = await new Promise((resolve) => {
      require.ensure([], (require) => resolve(require('./BuildingContainer').default), 'building');
    });

    return {
      title: '构建镜像',
      chunk: 'building',
      component: <Layout><Building/></Layout>,
    }
  }
}

