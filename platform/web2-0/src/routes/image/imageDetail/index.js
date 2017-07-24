
import React from 'react';
import Layout from '../../../components/Layout';

export default {
  path: '/imageDetail/:uuid',
  async action(ctx,params) {

    const ImageDetail = await new Promise((resolve) => {
      require.ensure([], (require) => resolve(require('./ImageDetailContainer').default), 'imageDetail');
    });

    return {
      title: '镜像详情',
      chunk: 'imageDetail',
      component: <Layout><ImageDetail uuid = {params.uuid} /></Layout>,
    }
  }
}

