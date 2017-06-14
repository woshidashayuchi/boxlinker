/**
 * Created by zhangsai on 16/9/2.
 */
import React,{ PropTypes,Component } from 'react';
import HeadLine from '../../../components/HeadLine';
import Toggle from '../../../components/Toggle';
import s from "./ServiceDetail.css";
import widthstyle from 'isomorphic-style-loader/lib/withStyles';
import cx from "classnames";

class GetReleaseTabs extends Component{
  static propTypes = {
    serviceUuid:React.PropTypes.string,
    serviceDetail:React.PropTypes.object,
    imageDetail:React.PropTypes.object,
    getImageDetail:React.PropTypes.func,
    onChangePolicy:React.PropTypes.func,
    isBtnState:React.PropTypes.object,
    serviceForImage:React.PropTypes.object
  };
  constructor(props){
    super(props);
    this.state = {
      policy:props.serviceDetail.policy
    }
  }
  changeToggle(){
    let flag = this.state.policy == 1?0:1;
    console.log(flag)
    this.setState({
      policy:flag
    });
    if(flag){
      let policy = flag;
      let data = {
        policy:Number(policy),
        serviceUuid:this.props.serviceUuid
      };
      console.log(data);
      this.props.onChangePolicy(data);
    }
  }
  componentDidMount(){

  }
  changePolicy(){
    let policy = this.state.policy;
    let data = {
      image_id:this.refs.imageVersion.value,
      policy:Number(policy),
      serviceUuid:this.props.serviceUuid
    };
    console.log(data);
    this.props.onChangePolicy(data);
  }

  render(){
    let serviceImageTag = this.props.serviceForImage.image_tag;
    let tags = this.props.imageDetail.tags;
    let option = [];
    if(!tags||!tags.length){
      option.push(<option key = "latest" value = "latest">latest</option>)
    }else {
      tags.map((item,i) => {
        option.push(<option value={item.tagid} key = {i}>{item.tag}</option>)
      });
    }
    return(
        <div className={s.item}>
          <HeadLine
            title="自动发布"
            titleEnglish="AUTOMATIC SENDING"
            titleInfo="当镜像有更新时容器是否自动更新,开启自动更新时会覆盖手动选择的版本"
          />
          <div className={s.bd}>
            <Toggle
              defaultChecked = {this.state.policy ==1}
              onChange = {this.changeToggle.bind(this)}
              key = {new Date().getTime()}
            />
          </div>
          {
            this.state.policy == 0?
            <div><div className={s.bd}>
              <select className="form-control" ref="imageVersion" defaultValue={serviceImageTag}>
                {option}
              </select>
            </div>
            <div className={s.bd}>
              <button className={`btn btn-primary ${!this.props.isBtnState.deploy?"btn-loading":""}`}
            disabled={!this.props.isBtnState.deploy}
            onClick = {this.changePolicy.bind(this)}>更新发布</button>
            </div></div>
            :null
          }
        </div>
    )
  }
}

export default widthstyle(s)(GetReleaseTabs);
