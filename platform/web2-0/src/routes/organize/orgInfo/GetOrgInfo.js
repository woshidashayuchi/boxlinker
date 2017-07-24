
import React,{PropTypes,Component} from 'react';
import HeadLine from '../../../components/HeadLine';
import Upload from "../../../components/Upload";
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Toggle from "../../../components/Toggle";
import {Modal} from "react-bootstrap"
import s from '../Organize.css';
import {receiveSetOwner} from '../../../actions/organize';
import Confirm from '../../../components/Confirm';
import GetAccount from './GetAccount';
import cx from 'classnames';

class GetOrgInfo extends Component{
  static contextTypes = {
    store:React.PropTypes.object
  };
  static propTypes = {
    organizeDetail:React.PropTypes.object,
    setOrganizeDetail:React.PropTypes.func,
    isBtnState:React.PropTypes.object,
    organizeId:React.PropTypes.string,
    organizeUserList:React.PropTypes.object,
    modalState:React.PropTypes.object,
    token:React.PropTypes.object,
    balance:React.PropTypes.number,
    getBalance:React.PropTypes.func,
    levels:React.PropTypes.object
  };

  constructor(props){
    super(props);
    this.state = {
      is_public:props.organizeDetail.team_type=="public",
      userObj:{},
      confirmData:{},
    }
  }
  onChangePublic(){
    this.setState({
      is_public:!this.state.is_public
    })
  }
  componentDidMount(){
  }

  setOrganizeDetail(){
    let data = {
      team_uuid:this.props.organizeId,
      team_desc:this.refs.orga_detail.value,
      team_type:this.state.is_public?"public":"private"
    };
    this.props.setOrganizeDetail(data);
  }
  setOrganizeOwner(){
    let team_owner = this.state.userObj.user_uuid;
    if(!team_owner) return false;
    let data = {
      team_uuid:this.props.organizeId,
      team_owner:this.state.userObj.user_uuid
    };
    this.setState({
      confirmData:data
    });
    this.context.store.dispatch(receiveSetOwner(true));
  }
  onSetOrganizeOwnerrHide(){
    this.context.store.dispatch(receiveSetOwner(false));
  }
  getUserObj(obj){
    this.setState({
      userObj:obj,
    });
  }
  render(){
    let data = this.props.organizeDetail||{};
    let user_info = this.context.store.getState().user_info;
    let user_name = user_info.user_name;
    let user_uuid = user_info.user_uuid;
    let team_owner = data.team_owner;
    let isOwner = user_uuid == team_owner;
    let power = this.props.token.team_priv;
    // if(data.creation_time == "") return <div style={{textAlign:"center"}}><Loading /></div>;
    return (
      <div className = "userTabBox" key = {new Date(data.creation_time).getTime()}>
        <div className = {s.box}>
          <GetAccount
            balance = {this.props.balance}
            getBalance={()=>{this.props.getBalance()}}
            levels = {this.props.levels}
            token = {this.props.token}
          />
          <div className={s.item}>
            <Upload
              url={data.team_avatar}
              data = {this.uploadData}
              isChange={true}
              txt = {["组织头像","ORGANIZE HEAD"]}
            />
          </div>
          <div className={s.item}>
            <HeadLine
              title = "基本信息"
              titleEnglish = ""
              titleInfo = "ORGANIZE INFO"
            />
            <div className = {s.itemFt}>
              <label>组织描述 :</label>
              <textarea type = "text" className = "form-control" ref = "orga_detail" defaultValue={data.team_desc}
                disabled={power.indexOf("U") == -1}
              />
            </div>
            <div className = {s.itemFt}>
              <label>是否公开 :</label>
              <Toggle
                defaultChecked = {this.state.is_public}
                onChange = {this.onChangePublic.bind(this)}
                disabled={power.indexOf("U") == -1}
              />
            </div>
            {
              power.indexOf("U") == -1?"":
              <div className = {s.itemFt}>
                <label></label>
                <button className={`btn btn-primary ${!this.props.isBtnState.setOrg?"btn-loading":""}`}
                        disabled = {!this.props.isBtnState.setOrg}
                        onClick={this.setOrganizeDetail.bind(this)}>
                  {this.props.isBtnState.setOrg?"保存":"保存中..."}
                </button>
              </div>
            }
          </div>
          {
            isOwner?
              <div className={s.item}>
                <HeadLine
                  title = "组织移交"
                  titleEnglish = ""
                  titleInfo = "ORGANIZE INFO"
                />
                <div className = {s.itemFt}>
                  <label>组织移交 :</label>
                  {
                    this.state.userObj.user_name?
                      <span className={s.userName}>{this.state.userObj.user_name}</span>
                      :
                      null
                  }

                  <button className="btn btn-primary" onClick = {()=>{this.refs.chooseUser.open()}}>选择移交人</button>
                </div>
                <div className = {s.itemFt}>
                  <label></label>
                  <button className="btn btn-primary"
                          onClick={this.setOrganizeOwner.bind(this)}>
                    保存
                  </button>
                </div>
              </div>
              :null
          }
        </div>
        <ChooseUser ref = "chooseUser"
                    organizeUserList={this.props.organizeUserList}
                    user_name = {user_name}
                    getUserObj = {(obj)=>this.getUserObj(obj)}
        />
        <Confirm
          key = {this.state.userObj.user_uuid}
          isShow={this.props.modalState.setOwner}
          onHide={() =>{this.onSetOrganizeOwnerrHide()}}
          title = "警告"
          text = {<div><p>您确定将此组织移交给此人吗?</p><p>移交后您将降级为普通用户,将失去对此组织的拥有权,请慎重操作!</p></div>}
          ref = "confirmModal"
          func = {() => {this.props.setOrganizeDetail(this.state.confirmData)}}
        />
      </div>
    )
  }
}

export default  withStyles(s)(GetOrgInfo);

class ChooseUser extends Component{
  static propTypes = {
    organizeUserList:React.PropTypes.object,
    getUserObj:React.PropTypes.func,
    user_name:React.PropTypes.string
  };
  constructor(props){
    super(props);
    this.state = {
      show:false,
      userId:"",
      userName:""
    }
  }
  open(){
    this.setState({
      show:true,
    })
  }
  hide(){
    this.setState({
      show:false
    })
  }
  chooseUse(id,name){
    this.setState({
      userId:id,
      userName:name
    })
  }
  returnUser(){
    let obj = {
      user_name:this.state.userName,
      user_uuid:this.state.userId
    };
    this.props.getUserObj(obj);
    this.hide();
  }
  render(){
    let list = this.props.organizeUserList.user_list;
    let li = null;
    if(!list || list.length == 0){
      li = "暂无用户"
    }else {
      li = list.map((item, i)=> {
        if (item.user_name != this.props.user_name) {
          return <li key={i} className={this.state.userId == item.user_uuid ? s.active : ""}
                     onClick={this.chooseUse.bind(this, item.user_uuid, item.user_name)}
          >{item.user_name}</li>
        }
      });
    }
    return(
      <Modal {...this.props} show={this.state.show}
             onHide={this.hide.bind(this)}
             bsSize="sm" aria-labelledby="contained-modal-title-sm">
        <div className="modal-header">
          <button type="button" onClick={this.hide.bind(this)} className="close" aria-label="Close"><span aria-hidden="true">×</span></button>
          <h4 className="modal-title" id="contained-modal-title-sm">组织内的用户</h4>
        </div>
        <div className="modal-body">
          <ul className={s.ul}>
            {li}
          </ul>
          <div className="modalItem modelItemLast">
            <label><span> </span></label>
            <label>
              <button className="btn btn-primary"
                      onClick = {this.returnUser.bind(this)}
                      >确定</button>
            </label>
          </div>
        </div>
      </Modal>
    )
  }
}
