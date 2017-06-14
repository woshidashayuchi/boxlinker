
import React from 'react';
import Layout from '../../../components/Layout';

export default {
  path: '/platformImage',
  async action() {

    const PlatformImage = await new Promise((resolve) => {
      require.ensure([], (require) => resolve(require('./PlatformImageContainer').default), 'platformImage');
    });

    return {
      title: '平台镜像',
      chunk: 'platformImage',
      component: <Layout><PlatformImage/></Layout>,
    }
  }
}

