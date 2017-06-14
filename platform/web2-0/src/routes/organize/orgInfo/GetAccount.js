
import React,{PropTypes,Component} from 'react';
import HeadLine from '../../../components/HeadLine';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../Organize.css';
import cx from "classnames";
import {OverlayTrigger,Popover,Tooltip} from "react-bootstrap";
import Pay from '../../../components/Layout/PayContainer';

class GetAccount extends Component{
  static contextTypes = {
    store:PropTypes.object
  };
  static propTypes = {
    balance:React.PropTypes.number,
    getBalance:React.PropTypes.func,
    levels:React.PropTypes.object,
    token:React.PropTypes.object
  };

  constructor(props){
    super(props);
    this.state = {
      oldP:false,
      newP:false,
      newAgain:false,
    }
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
  render(){
    let levels = this.props.levels;
    if(levels.level>=5){
      levels.level =5;
    }
    let p1 = <Popover id="popover-positioned-bottom1" title="对应特权">
        <p className={s.p}>可拥有组织<span>1</span>个</p>
        <p className={s.p}>组织能最多可容用户<span>5</span>个</p>
        <p className={s.p}>可自定义角色数<span>0</span>个</p>
        <p className={s.p}>可上传的镜像<span>10</span>个</p>
        <p className={s.p}>可创建的服务<span>10</span>个</p>
        <p className={s.p}>可创建的数据卷<span>5</span>个</p>
      </Popover>;
    let p2 = <Popover id="popover-positioned-bottom2" title="对应特权">
      <p className={s.p}>可拥有组织<span>2</span>个</p>
      <p className={s.p}>组织能最多可容用户<span>10</span>个</p>
      <p className={s.p}>可自定义角色数<span>2</span>个</p>
      <p className={s.p}>可上传的镜像<span>30</span>个</p>
      <p className={s.p}>可创建的服务<span>30</span>个</p>
      <p className={s.p}>可创建的数据卷<span>30</span>个</p>
    </Popover>;
    let p3 = <Popover id="popover-positioned-bottom3" title="对应特权">
      <p className={s.p}>可拥有组织<span>4</span>个</p>
      <p className={s.p}>组织能最多可容用户<span>60</span>个</p>
      <p className={s.p}>可自定义角色数<span>4</span>个</p>
      <p className={s.p}>可上传的镜像<span>300</span>个</p>
      <p className={s.p}>可创建的服务<span>300</span>个</p>
      <p className={s.p}>可创建的数据卷<span>300</span>个</p>
    </Popover>;
    let p4 = <Popover id="popover-positioned-bottom4" title="对应特权">
      <p className={s.p}>可拥有组织<span>6</span>个</p>
      <p className={s.p}>组织能最多可容用户<span>160</span>个</p>
      <p className={s.p}>可自定义角色数<span>6</span>个</p>
      <p className={s.p}>可上传的镜像<span>1120</span>个</p>
      <p className={s.p}>可创建的服务<span>1120</span>个</p>
      <p className={s.p}>可创建的数据卷<span>1120</span>个</p>
    </Popover>;
    let p5 = <Popover id="popover-positioned-bottom5" title="对应特权">
      <p className={s.p}>可拥有组织<span>10</span>个</p>
      <p className={s.p}>组织能最多可容用户<span>400</span>个</p>
      <p className={s.p}>可自定义角色数<span>8</span>个</p>
      <p className={s.p}>可上传的镜像<span>3600</span>个</p>
      <p className={s.p}>可创建的服务<span>3600</span>个</p>
      <p className={s.p}>可创建的数据卷<span>3600</span>个</p>
    </Popover>;
    let tip =<Tooltip id="tooltip">{`当前经验值:${levels.experience}`}</Tooltip>;
    let width =(levels.experience/(levels.up_required+levels.experience))*185+(185*((levels.level>=5?4:levels.level)-1))+13+"px";
    return (
      <div className = {s.tab}>
        <div className = {s.item}>
          <HeadLine
          title="组织余额"
          titleEnglish=""
          titleInfo="ORGANIZE BALANCE"
          />
          <div className={s.account}>
            <div>
              <span>组织账户余额 :</span>
              <span className={s.rmb}>¥</span>
              <span className={s.rmbNumber}>{this.props.balance.toFixed(2)}</span>
              <button className="btn btn-primary icon-refresh" onClick = {this.refreshBalance.bind(this)}> </button>
              <Pay />
            </div>
          </div>
        </div>
        <div className = {s.item}>
          <HeadLine
            title="组织等级"
            titleEnglish=""
            titleInfo="ORGANIZE GRADE"
          />
          <div className={s.account}>
            <p>
              <span>组织等级 :</span>
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
              <div className={cx(s.timeBox,s.timeAction)}>
                <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={p1} >
                <div className={s.timeStat}>
                  <span className={s.timeIcon}>L1</span>
                  <div className={s.timeInfo}>
                    {/*<p>经验值:0</p>*/}
                  </div>
                </div>
                </OverlayTrigger>
              </div>
              <div className={cx(s.timeBox,levels.level>=2?s.timeAction:"")}>
                <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={p2} >
                <div className={s.timeStat}>
                  <span className={s.timeIcon}>L2</span>
                  <div className={s.timeInfo}>
                    {/*<p>经验值:100</p>*/}
                  </div>
                </div>
                </OverlayTrigger>
              </div>
              <div className={cx(s.timeBox,levels.level>=3?s.timeAction:"")}>
                <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={p3} >
                <div className={s.timeStat}>
                  <span className={s.timeIcon}>L3</span>
                  <div className={s.timeInfo}>
                    {/*<p>经验值:1000</p>*/}
                  </div>
                </div>
                </OverlayTrigger>
              </div>
              <div className={cx(s.timeBox,levels.level>=4?s.timeAction:"")}>
                <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={p4} >
                <div className={s.timeStat}>
                  <span className={s.timeIcon}>L4</span>
                  <div className={s.timeInfo}>
                    {/*<p>经验值:10000</p>*/}
                  </div>
                </div>
                </OverlayTrigger>
              </div>
              <div className={cx(s.timeBox,levels.level>=5?s.timeAction:"")}>
                <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={p5} >
                <div className={s.timeStat}>
                  <span className={s.timeIcon}>L5</span>
                  <div className={s.timeInfo}>
                    {/*<p>经验值:100000</p>*/}
                  </div>
                </div>
                </OverlayTrigger>
              </div>

            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default  withStyles(s)(GetAccount);
