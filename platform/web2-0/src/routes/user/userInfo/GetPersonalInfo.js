
import React,{PropTypes,Component} from 'react';
import HeadLine from '../../../components/HeadLine';
import Upload from '../../../components/Upload';
import {fetchUserInfo,clearRecharges} from '../../../actions/users';
import cookie from 'react-cookie';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../User.css';
import cx from "classnames";
import {OverlayTrigger,Popover,Tooltip,Modal} from "react-bootstrap";
import Pay from "../../../components/Layout/PayContainer";
class GetPersonalInfo extends Component{
  static contextTypes = {
    store:PropTypes.object
  };
  static propTypes = {
    onRevisePassword:React.PropTypes.func,
    balance:React.PropTypes.number,
    getBalance:React.PropTypes.func,
    levels:React.PropTypes.object,
    token:React.PropTypes.object,
    limits:React.PropTypes.array,
    getLimits:React.PropTypes.func,
    recharges:React.PropTypes.object,
    getRecharge:React.PropTypes.func,
    switchRecharges:React.PropTypes.object,
    getSwitchRecharges:React.PropTypes.func
  };

  constructor(props){
    super(props);
    this.state = {
      oldP:false,
      newP:false,
      newAgain:false,
    }
  }
  revisePassword(){
    let old_p = this.refs.old_p.value.trim(),
      oldTip = this.refs.oldTip,
      new_p = this.refs.new_p.value.trim(),
      newTip = this.refs.newTip,
      new_p_again = this.refs.new_p_again.value.trim(),
      newTipAgain = this.refs.newTipAgain;
    if(old_p ==""){
      this.setState({
        oldP:true
      });
      oldTip.innerHTML = "原始密码不能为空";
      return false;
    }
    if(new_p ==""){
      this.setState({
        newP:true
      });
      newTip.innerHTML = "新密码不能为空";
      return false;
    }
    if(new_p_again ==""){
      this.setState({
        newAgain:true
      });
      newTipAgain.innerHTML = "确认新密码不能为空";
      return false;
    }
    if(new_p_again !=new_p){
      this.setState({
        newAgain:true
      });
      newTipAgain.innerHTML = "两次新密码不一致";
      return false;
    }
    let passwordObj = {
      user_uuid:this.context.store.getState().user_info.user_uuid,
      old_password:old_p,
      new_password:new_p
    };
    console.log(passwordObj);
    this.props.onRevisePassword(passwordObj)
  }
  changeOldPassword(){
    let old_p = this.refs.old_p.value.trim();
    if(old_p.length > 0){
      this.setState({
        oldP:false
      })
    }
  }
  changeNewPassword(){
    let new_p = this.refs.new_p.value.trim();
    let newTip = this.refs.newTip;
    if(new_p.length < 6 && new_p.length!=""){
      newTip.innerHTML = "密码不能少于6位";
      this.setState({
        newP:true
      })
    }else{
      this.setState({
        newP:false
      })
    }
  }
  changeNewAgainPassword(){
    let new_p = this.refs.new_p.value.trim();
    let new_p_again = this.refs.new_p_again.value.trim();
    let newTipAgain = this.refs.newTipAgain;
    if(new_p_again.length < 6 && new_p_again.length!=""){
      newTipAgain.innerHTML = "密码不能少于6位";
      this.setState({
        newAgain:true
      })
    }else if(new_p !=new_p_again){
      newTipAgain.innerHTML = "两次密码不一致";
      this.setState({
        newAgain:true
      })
    }else{
      this.setState({
        newAgain:false
      })
    }
  }
  updateInfo(){
    let token = cookie.load("_at");
    let user_uuid = this.props.token.user_uuid;
    this.context.store.dispatch(fetchUserInfo(user_uuid,token));
  }
  componentDidMount(){
    this.uploadData = {
      type:"UserAvatars",
      id:this.props.token.team_uuid
    };
  }
  refreshBalance(){
    this.props.getBalance();
  }
  getLimits(){
    let limits = this.props.limits;
    let levels = this.props.levels;
    if(limits.length ==0){return null}
    if(levels.level>=5){
      levels.level = 5;
    }
    let tip =<Tooltip id="tooltip">{`当前经验值:${levels.experience}`}</Tooltip>;
    let width =(levels.experience/(levels.up_required+levels.experience))*185+(185*((levels.level>=5?4:levels.level)-1))+13+"px";
    let timeBox = limits.map((item,i) =>{
      let p = <Popover id="popover-positioned-bottom1" title="对应特权">
                <p className={s.p}>可拥有组织<span>{item.teams}</span>个</p>
                <p className={s.p}>组织能最多可容用户<span>{item.teamusers}</span>个</p>
                <p className={s.p}>可自定义角色数<span>{item.roles}</span>个</p>
                <p className={s.p}>可上传的镜像<span>{item.images}</span>个</p>
                <p className={s.p}>可创建的服务<span>{item.services}</span>个</p>
                <p className={s.p}>可创建的数据卷<span>{item.volumes}</span>个</p>
              </Popover>;
      return(
        <div className={cx(s.timeBox,levels.level>i?s.timeAction:"")} key = {i}>
          <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={p} >
            <div className={s.timeStat}>
              <span className={s.timeIcon}>L{i+1}</span>
            </div>
          </OverlayTrigger>
        </div>
      )
    });
    return (
      <div className = {s.item}>
        <HeadLine
          title="我的等级"
          titleEnglish=""
          titleInfo="MY GRADE"
        />
        <div className={s.account}>
          <p>
            <span>我的等级 :</span>
            <span className={s.rmb}>L{levels.level}</span>
          </p>
          <p>
            <span>当前经验值:</span>
            <span className={s.rmb}>{levels.experience}</span>
          </p>
          <p>
            <span>升级还需经验值:</span>
            <span className={s.rmb}>{levels.up_required}</span>
          </p>
          <div className={cx(s.timeLine,"clearfix")}>
            <div className={s.line} style = {{"width":width}}>
              <OverlayTrigger placement="bottom" id = "OverlayTrigger1" overlay={tip}>
                <span> </span>
              </OverlayTrigger>
            </div>
            {timeBox}
          </div>
        </div>
      </div>
    )
  }
  render(){
    let headImg = this.context.store.getState().user_info.user_avatar;
    let levels = this.props.levels;
    if(levels.level>=5){
      levels.level =5;
    }
    return (
      <div className = {s.tab}>
        <div className = {s.item}>
          <HeadLine
          title="我的账户"
          titleEnglish=""
          titleInfo="MY CELLPHONE"
          />
          <div className={s.account}>
            <div>
              <span>我的账户余额 :</span>
              <span className={s.rmb}>¥</span>
              <span className={s.rmbNumber}>{this.props.balance.toFixed(2)}</span>
              <button className="btn btn-primary icon-refresh" onClick = {this.refreshBalance.bind(this)}> </button>
              <Pay />
              {/*<button className="btn btn-primary btn-sm" onClick = {() =>{this.refs.rechargesModal.open()}}>去充值</button>*/}
            </div>
          </div>
        </div>
        {this.getLimits()}
        <div className = {s.item}>
          <Upload
            url={headImg}
            data = {this.uploadData}
            txt = {["个人头像","PERSONAL HEAD"]}
            isChange={true}
            callback={this.updateInfo.bind(this)}
          />
        </div>
        {/*<div className = "userItem">*/}
          {/*<HeadLine*/}
            {/*title="绑定手机"*/}
            {/*titleEnglish=""*/}
            {/*titleInfo="BINDING CELLPHONE"*/}
          {/*/>*/}
          {/*<div className = "userPhone">*/}
            {/*<div className = "userInputItem">*/}
              {/*<input type = "text" className = "form-control" />*/}
              {/*<i className="userTip">绑定手机号可接受系统重要通知</i>*/}
            {/*</div>*/}
            {/*<div className = "userInputItem">*/}
              {/*<input type = "text" className = "form-control userInputLittle" />*/}
              {/*<button className="userButtonLittle">短信验证码</button>*/}
            {/*</div>*/}
            {/*<div className = "userInputItem">*/}
              {/*<button className = "btn btn-warning">绑定</button>*/}
            {/*</div>*/}
          {/*</div>*/}
        {/*</div>*/}
        <div className = {s.item} id = "password">
          <HeadLine
            title="修改密码"
            titleEnglish=""
            titleInfo="MODIFY PASSWORD"
          />
          <div className = {s.password}>
            <div className ={`${s.pItem} ${this.state.oldP?s.error:""}`} >
              <input onChange = {this.changeOldPassword.bind(this)} type = "password" className = "form-control" ref = "old_p" placeholder = "原始密码" />
              <i className={s.tip} ref = "oldTip"> </i>
            </div>
            <div className = {`${s.pItem} ${this.state.newP?s.error:""}`}>
              <input onChange = {this.changeNewPassword.bind(this)} type = "password" className = "form-control" ref = "new_p" placeholder = "新密码" />
              <i className={s.tip} ref = "newTip"> </i>
            </div>
            <div className = {`${s.pItem} ${this.state.newAgain?s.error:""}`}>
              <input onChange={this.changeNewAgainPassword.bind(this)} type = "password" className = "form-control" ref = "new_p_again" placeholder = "确认新密码" />
              <i className={s.tip} ref = "newTipAgain"> </i>
            </div>
            <div className = {s.pItem}>
              <button className = "btn btn-warning" onClick={this.revisePassword.bind(this)}>确定</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default  withStyles(s)(GetPersonalInfo);

