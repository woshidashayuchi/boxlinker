/**
 * Created by zhangsai on 16/9/2.
 */
import React,{ PropTypes,Component } from 'react';
import withStyle from 'isomorphic-style-loader/lib/withStyles';
import s from './ServiceDetail.css';


class GetOptTabs extends Component{
    static propTypes = {
        onDeleteService: React.PropTypes.func,
    };
    deleteService(){
        let serviceName = this.props.serviceName;
        let data = {serviceName:serviceName,type:"detail"};
        confirm("是否删除?")?this.props.onDeleteService(data):"";
    }
    render(){
    return(
      <div className={s.handleBox}>
        <button className="btn btn-danger" onClick = {this.deleteService.bind(this)}>删除应用</button>
        <p>*删除应用将清除该应用的所有数据，且该操作不能被恢复，请慎重选择！ </p>
      </div>
    )
    }
}

export default withStyle(s)(GetOptTabs);
