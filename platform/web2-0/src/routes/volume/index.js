
import React from 'react';
import Layout from '../../components/Layout';

export default {
  path: '/volumes',
  async action() {

    const Volumes = await new Promise((resolve) => {
      require.ensure([], (require) => resolve(require('./VolumeListContainer').default), 'volumes');
    });

    return {
      title: '数据卷',
      chunk: 'volumes',
      component: <Layout><Volumes/></Layout>,
    }
  }
}

