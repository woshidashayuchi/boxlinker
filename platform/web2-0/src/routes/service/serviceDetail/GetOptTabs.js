/**
 * Created by zhangsai on 16/9/2.
 */
import React,{ PropTypes,Component } from 'react';
import Confirm from "../../../components/Confirm";
import {receiveServiceDelete} from "../../../actions/services";
import s from "./ServiceDetail.css";
import widthstyle from 'isomorphic-style-loader/lib/withStyles';
import cx from "classnames";


class GetOptTabs extends Component{
    static contextTypes = {
        store:React.PropTypes.object
    };
    static propTypes = {
      serviceUuid:React.PropTypes.string,
      onDeleteService: React.PropTypes.func,
      modalState:React.PropTypes.object
    };
    constructor(){
        super();
        this.state = {
            delData:{}
        }
    }
    deleteService(){
        let serviceUuid = this.props.serviceUuid;
        let data = {service_uuid:serviceUuid,type:"detail"};
        console.log(data)
        this.setState({
            delData:data
        });
        this.context.store.dispatch(receiveServiceDelete(true));
    }
    deleteServiceHide(){
        this.context.store.dispatch(receiveServiceDelete(false));
    }
    render(){
    return(
      <div className={cx(s.opt,s.item)}>
        <button className="btn btn-danger" onClick = {this.deleteService.bind(this)}>删除应用</button>
        <p>*删除应用将清除该应用的所有数据，且该操作不能被恢复，请慎重选择！ </p>
          <Confirm
            isShow={this.props.modalState.serviceDelete}
            onHide={() =>{this.deleteServiceHide()}}
            title = "警告"
            text = "您确定要删除此服务吗?"
            ref = "confirmModal"
            func = {() => {this.props.onDeleteService(this.state.delData)}}
          />
      </div>
    )
    }
}

export default widthstyle(s)(GetOptTabs);
