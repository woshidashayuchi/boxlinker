
import React from 'react';
import Layout from '../../../components/Layout';

export default {
  path: '/configure',
  async action() {

    const Configure = await new Promise((resolve) => {
      require.ensure([], (require) => resolve(require('./ConfigureContainer').default), 'configure');
    });

    return {
      title: '容器配置',
      chunk: 'configure',
      component: <Layout><Configure/></Layout>,
    }
  }
}

