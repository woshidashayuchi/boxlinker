
export default {
  path: '/',
  children: [
    require('./dashboard').default,
    require('./service/chooseImage').default,
    require('./service/serviceList').default,
    require('./service/configure').default,
    require('./service/deployService').default,
    require('./service/serviceDetail').default,
    require('./volume').default,
    require('./certificate').default,
    require('./image/myImage').default,
    require('./image/platformImage').default,
    require('./image/imageDetail').default,
    require('./build/building').default,
    require('./build/buildingDetail').default,
    require('./user/userInfo').default,
    require('./user/userInfo/indexTab').default,
    require('./user/userBilling').default,
    require('./user/userBilling/indexTab').default,
    require('./organize/orgBilling').default,
    require('./organize/orgInfo').default,
    require('./organize/orgBilling/indexTab').default,
    require('./organize/orgInfo/indexTab').default,
    require('./recovery/serviceRecovery').default,



    require('./error').default
  ],
  async action({ next }) {
    const route = await next();
    route.title = `${route.title || 'Untitled Page'} - boxlinker.com`;
    route.description = route.description || '';
    return route;
  }
}
