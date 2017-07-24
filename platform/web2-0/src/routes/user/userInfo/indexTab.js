
import React from 'react';
import Layout from '../../../components/Layout';

export default {
  path: '/userInfo/:tab',
  async action(ctx,params) {

    const UserInfo = await new Promise((resolve) => {
      require.ensure([], (require) => resolve(require('./UserInfoContainer').default), 'userInfo');
    });

    return {
      title: '用户中心',
      chunk: 'userInfo',
      component: <Layout><UserInfo tab = {params.tab} /></Layout>,
    }
  }
}

