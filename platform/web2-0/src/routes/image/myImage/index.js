
import React from 'react';
import Layout from '../../../components/Layout';

export default {
  path: '/myImage',
  async action() {

    const MyImage = await new Promise((resolve) => {
      require.ensure([], (require) => resolve(require('./MyImageContainer').default), 'myImage');
    });

    return {
      title: '我的镜像',
      chunk: 'myImage',
      component: <Layout><MyImage/></Layout>,
    }
  }
}
