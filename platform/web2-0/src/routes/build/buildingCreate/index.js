
import React from 'react';

import BuildingCreateContainer from './BuildingCreateContainer'


export default {
  path: '/building/create',

  async action(){
    return <BuildingCreateContainer/>
  }
}
