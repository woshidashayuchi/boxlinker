/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes,Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import cx from 'classnames';
import s from './DataVolumeList.css';
// import VolumesTable from '../../components/Volumes/VolumesTable'
import VolumeTableContainer from '../../containers/Volumes/VolumeTableContainer'
import VolumeCreateModal from '../../components/Volumes/VolumeCreateModal'
const title = '数据卷列表';


// import TableDemo from '../../components/Table';

// import DropdownButton from 'react-bootstrap/lib/DropdownButton';
// import MenuItem from 'react-bootstrap/lib/MenuItem';
// import Button from 'react-bootstrap/lib/Button';
// import Modal from 'react-bootstrap/lib/Modal';
// import FormControl from 'react-bootstrap/lib/FormControl';
// import InputRange from 'react-input-range';



class DataVolumeList extends Component{
  static contextTypes = {setTitle: PropTypes.func.isRequired};
  openCreateModal(){
    this.refs.createModal.open();
  }
  getCreateBtn(){
     return (
       <div className={cx("hbAddBtn", "clearfix")} onClick={this.openCreateModal.bind(this)}>
         <div className={cx("hbPlus", "left")}></div>
         <div className={cx("hbPlusInfo", "left")}>
           <p className={"hbPName"}>创建存储卷</p>
           <p className={"hbPInfo"}>Create a volume</p>
         </div>
       </div>
     )
  }
  render(){
    this.context.setTitle(title)
    return (
      <div className="containerBgF">
        <div className={cx("hbHd", "clearfix")}>
          <div className={cx("hbAdd", "left")}>
            {this.getCreateBtn()}
            <a href="javascript:;" className={"hbAddExplain"}>什么是存储卷？</a>
          </div>
        </div>
        <div className={cx(s.slBd,"TableTextLeft")}>
          <VolumeTableContainer/>
        </div>
        <VolumeCreateModal ref="createModal"/>
        <VolumeScaleModal ref="scaleModal"/>
      </div>
    );
  }
}

export default withStyles(s)(DataVolumeList);
