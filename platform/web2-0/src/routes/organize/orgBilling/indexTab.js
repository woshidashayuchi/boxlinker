
import React from 'react';
import Layout from '../../../components/Layout';

export default {
  path: '/orgBilling/:tab',
  async action(ctx,params) {

    const OrgBilling = await new Promise((resolve) => {
      require.ensure([], (require) => resolve(require('./OrgBillingContainer').default), 'orgBilling');
    });

    return {
      title: '组织费用',
      chunk: 'orgBilling',
      component: <Layout><OrgBilling tab = {params.tab} /></Layout>,
    }
  }
}
