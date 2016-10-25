
import React from 'react';

// import CodeBuildList from './CodeBuildList'
import CreateImageContainer from '../../containers/Images/CreateImageContainer';
export default {
  path: '/createImage',
  async action(){
    return (
      <CreateImageContainer/>
    )
  }
}
