
import React from 'react';
import Layout from '../../../components/Layout';

export default {
  path: '/buildingDetail/:id',
  async action(c,params) {

    const BuildingDetail = await new Promise((resolve) => {
      require.ensure([], (require) => resolve(require('./BuildingDetailContainer').default), 'buildingDetail');
    });

    return {
      title: '构建详情',
      chunk: 'buildingDetail',
      component: <Layout><BuildingDetail projectId={params.id} /></Layout>,
    }
  }
}
