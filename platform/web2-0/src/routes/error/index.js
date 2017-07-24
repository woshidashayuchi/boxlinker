
import React from 'react';
import Layout from '../../components/Layout';

export default {
  path: '/error',
  async action() {

    const Error = await new Promise((resolve) => {
      require.ensure([], (require) => resolve(require('./Error').default), 'error');
    });

    return {
      title: '出错啦',
      chunk: 'error',
      component: <Layout><Error/></Layout>,
    }
  }
}
