
import React from 'react';
import Layout from '../../../components/Layout';

export default {
  path: '/orgInfo/:tab',
  async action(ctx,params) {

    const OrgInfo = await new Promise((resolve) => {
      require.ensure([], (require) => resolve(require('./OrgInfoContainer').default), 'orgInfo');
    });

    return {
      title: '组织管理',
      chunk: 'orgInfo',
      component: <Layout><OrgInfo tab = {params.tab} /></Layout>,
    }
  }
}
