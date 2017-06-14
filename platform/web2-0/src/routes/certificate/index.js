
import React from 'react';
import Layout from '../../components/Layout';

export default {
  path: '/certificate',
  async action() {

    const Certificate = await new Promise((resolve) => {
      require.ensure([], (require) => resolve(require('./CertificateListContainer').default), 'certificate');
    });

    return {
      title: '证书管理',
      chunk: 'Certificate',
      component: <Layout><Certificate/></Layout>,
    }
  }
}

