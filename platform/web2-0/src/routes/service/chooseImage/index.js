
import React from 'react';
import Layout from '../../../components/Layout';

export default {
  path: '/chooseImage',
  async action() {

    const ChooseImage = await new Promise((resolve) => {
      require.ensure([], (require) => resolve(require('./ChooseImageContainer').default), 'chooseImage');
    });

    return {
      title: '选择镜像',
      chunk: 'chooseImage',
      component: <Layout><ChooseImage/></Layout>,
    }
  }
}
