import React,{PropsType,Component} from 'react';
import HeadLine from '../../../components/HeadLine';
import Loading from "../../../components/Loading";
import Search from '../../../components/Search';
import {Modal,Pagination} from 'react-bootstrap';
import DatePicker from 'react-bootstrap-date-picker';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {receiveNotification,clearNotification} from "../../../actions/notification"
import s from '../User.css';
import cx from 'classnames';

class GetCertificateMange extends Component{
  static contextTypes = {
    store:React.PropTypes.object
  };
  static propTypes = {
    couponList:React.PropTypes.object,
    getCouponList:React.PropTypes.func,
    couponGiftList:React.PropTypes.object,
    createCoupon:React.PropTypes.func,
    isBtnState:React.PropTypes.object,
    activationCoupon:React.PropTypes.func,
    distributeCoupon:React.PropTypes.func,
    getCouponGiftList:React.PropTypes.func
  };
  constructor(){
    super();
    this.state = {
      pageSize:10,
      pageNumber:1,
      pageSizeGift:10,
      pageNumberGift:1
    }
  }
  componentWillMount(){
    this.admin = this.context.store.getState().user_info.user_uuid =="sysadmin";
    this.couponData = {
      start_time:(new Date("2017-03-15 00:00:00").getTime())/1000,
      end_time:(new Date().getTime())/1000,
      page_size:this.state.pageSize,
      page_num:this.state.pageNumber
    };
    this.couponDataGift = {
      page_size:this.state.pageSizeGift,
      page_num:this.state.pageNumberGift
    };
  }
  getTableTr(){
    let count = this.props.couponList.count;
    let number = this.admin?10:6;
    if(count==-1) return <tr><td colSpan={number}><Loading /></td></tr>;
    if(count==0) return <tr><td colSpan={number} className="text-center">暂无数据~</td></tr>;
    let list = this.props.couponList.vouchers_list;
    let status = "";
    let tr = list.map((item,i) =>{
      switch (item.status){
        case "active":
          status = <span className="text-success">已激活</span>;
          break;
        case "unactive":
          status = <span className="text-warning">未激活</span>;
          break;
        case "expired":
          status = <span className="text-danger">已过期</span>;
          break;
        default:
          status = <span className="text-warning">未分发</span>;
      }
      return (<tr key = {i}>
          <td>{item.voucher_uuid}</td>
          <td>¥{item.denomination.toFixed(2)}</td>
          <td>¥{item.balance.toFixed(2)}</td>
          {this.admin?<td>{item.create_time}</td>:null}
          <td key = {new Date().getTime()+i}>{status}</td>
          {this.admin?<td>{item.accepter||"--"}</td>:null}
          {this.admin?<td>{item.activator||"--"}</td>:null}
          <td>{item.active_time||"--"}</td>
          <td>{item.invalid_time}</td>
          {this.admin?
            <td>
              <button
                disabled={item.status!="unused"}
                onClick = {()=>{this.refs.distributeCouponModel.open(item.voucher_uuid)}}
                className="btn btn-primary">分发礼券</button></td>
          :null}
      </tr>)
    });
    return tr;
  }
  getTable() {
    return (
      <table className="table table-hover table-bordered">
        <thead>
        <tr>
          <th>礼券uuid</th>
          <th style = {{"min-width":"70px"}}>面值</th>
          <th style = {{"min-width":"70px"}}>剩余金额</th>
          {this.admin?<th>创建时间</th>:null}
          <th style = {{"min-width":"70px"}}>状态</th>
          {this.admin?<th>接收者</th>:null}
          {this.admin?<th>激活者</th>:null}
          <th>激活时间</th>
          <th>过期时间</th>
          {this.admin?<th>操作</th>:null}
        </tr>
        </thead>
        <tbody>
        {this.getTableTr()}
        </tbody>
      </table>
    )
  }
  handleSelectPage(eventKey){
    eventKey = Math.floor(eventKey);
    this.setState({
      pageNumber: eventKey
    });
    this.couponData.page_num = eventKey;
    this.props.getCouponList(this.couponData);
  }
  getPage(){
    let data = this.props.couponList;
    let page = [];
    if(data.count==-1){return null}
    if(data.count<this.state.pageSize){}else {
      let pages = data.count/this.state.pageSize;
      pages = data.count%this.state.pageSize>0?Math.floor(pages+1):Math.floor(pages);
      page.push(
        <div className="pageBox" key={new Date().getTime() + 1}>
          <Pagination
            prev
            next
            first
            last
            items={pages}
            activePage={this.state.pageNumber}
            onSelect={this.handleSelectPage.bind(this)}
          />
        </div>
      )
    }
    return page;
  }
  getGiftTableTr(){
    let count = this.props.couponGiftList.count;
    if(count==-1) return <tr><td colSpan="8"><Loading /></td></tr>;
    if(count==0) return <tr><td colSpan="8" className="text-center">暂无数据~</td></tr>;
    let list = this.props.couponGiftList.vouchers_list;
    let statusSp = "";
    let tBody = [];
    let tr = list.map((item,i) =>{
      switch (item.status){
        case "active":
          statusSp = <span className="text-success">已激活</span>;
          break;
        case "unactive":
          statusSp = <span className="text-warning">未激活</span>;
          break;
        case "expired":
          statusSp = <span className="text-danger">已过期</span>;
          break;
        default:
          statusSp = <span className="text-warning">未分发</span>;
      }
      tBody.push(<tr key = {i}>
          <td>{item.voucher_uuid}</td>
          <td>¥{item.denomination.toFixed(2)}</td>
          <td key = {new Date().getTime()+i}>{statusSp}</td>
          <td>{item.invalid_time}</td>
      </tr>)
    });
    return tBody;
  }
  getGiftTable(){
    return (
      <table className="table table-hover table-bordered">
        <thead>
        <tr>
          <th>礼券uuid</th>
          <th>面值</th>
          <th>状态</th>
          <th>过期时间</th>
        </tr>
        </thead>
        <tbody>
        {this.getGiftTableTr()}
        </tbody>
      </table>
    )
  }
  handleSelectPageGift(eventKey){
    eventKey = Math.floor(eventKey);
    this.setState({
      pageNumberGift: eventKey
    });
    this.couponDataGift.page_num = eventKey;
    this.props.getCouponGiftList(this.couponDataGift);
  }
  getPageGift(){
    let data = this.props.couponGiftList;
    let page = [];
    if(data.count<this.state.pageSizeGift){}else {
      let pages = data.count/this.state.pageSizeGift;
      pages = data.count%this.state.pageSizeGift>0?Math.floor(pages+1):Math.floor(pages);
      page.push(
        <div className="pageBox" key={new Date().getTime() + 1}>
          <Pagination
            prev
            next
            first
            last
            items={pages}
            activePage={this.state.pageNumberGift}
            onSelect={this.handleSelectPageGift.bind(this)}
          />
        </div>
      )
    }
    return page;
  }
  createCoupon(org_name,my){
    this.props.createCoupon(org_name,my,this.couponData);
  }
  activationCoupon(){
    let uuid = this.refs.couponUuid.value.trim();
    if(uuid =="") return false;
    this.props.activationCoupon(uuid,this.couponData);
  }
  onDistributeCoupon(data,my){
    this.props.distributeCoupon(data,my,this.couponData);
  }
  render(){
    return (
      <div className = "userTabBox">
        {
         this.admin?null:
           <div className={s.item}>
             <div className = "clearfix">
               <div className="left">
                 <HeadLine
                   title="礼券激活"
                   titleEnglish=""
                   titleInfo="COUPON ACTIVATION"
                 />
               </div>
             </div>
             <div className = {s.coupon}>
               <input type = "text" className = "form-control" placeholder="请输入礼券码" ref = "couponUuid" />
               <button className="btn btn-danger"
                       disabled={!this.props.isBtnState.activeCoupon}
                       onClick = {this.activationCoupon.bind(this)}>激活</button>
               <span className="text-danger">提示：礼券在激活后才可使用。</span>
             </div>
           </div>
        }
        {
          this.admin ? null :
          <div className={s.item}>
            <div className = "clearfix">
              <div className="left">
                <HeadLine
                  title="我的礼包"
                  titleEnglish=""
                  titleInfo="MY COUPON"
                />
              </div>
            </div>
            <div className={cx(s.tabBox,"tableBox")}>
              <div className = {s.table}>
                {this.getGiftTable()}
                {this.getPageGift()}
              </div>
            </div>
          </div>
        }
        <div className={s.item}>
          <div className = "clearfix">
            <div className="left">
              <HeadLine
                title="我的礼券"
                titleEnglish=""
                titleInfo="MY COUPON"
              />
            </div>
            {
              this.admin?
                <div className="right">
                  <div className="projectHeadBtn clearfix" onClick = {() => {this.refs.createCouponModel.open()}}>
                    <div className="projectHeadPlus left"></div>
                    <div className="projectHeadName left">
                      <p className="projectHeadP1">生成礼券</p>
                      <p className="projectHeadP2">Create Coupon</p>
                    </div>
                  </div>
                </div>:
                null
            }
          </div>
          <div className={cx(s.tabBox,"tableBox")}>
            <div className = {s.table}>
              {this.getTable()}
              {this.getPage()}
            </div>
          </div>
        </div>
        <CreateCoupon onCreateCoupon = {this.createCoupon.bind(this)} isBtnState={this.props.isBtnState} ref = "createCouponModel" />
        <DistributeCoupon onDistributeCoupon={this.onDistributeCoupon.bind(this)} isBtnState={this.props.isBtnState} ref = "distributeCouponModel" />
      </div>
    )
  }
}

export default withStyles(s)(GetCertificateMange);


class CreateCoupon extends Component{
  static propTypes = {
    onCreateCoupon:React.PropTypes.func,
    isBtnState:React.PropTypes.object
  };
  constructor(props){
    super(props);
    this.state = {
      time:"",
      sum:false
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
  createCoupon(){
    let value = this.refs.sum.value.trim();
    let date = this.refs.date.getFormattedValue();
    if(value.length ==0){
      this.setState({
        sum:true
      });
      this.refs.sum_tip.innerHTML = "金额不能为空";
      return false;
    }
    if(date == null){
      this.setState({
        date:true
      });
      this.refs.date_tip.innerHTML = "过期时间不能为空";
      return false;
    }
    date = date+" 00:00:00";
    if(!this.state.sum&&!this.state.date){
      let time = (new Date(date).getTime())/1000;
      let data = {
        denomination:Number(value),
        invalid_time:time
      };
      this.props.onCreateCoupon(data,this);
    }
  }
  sumInput(){
    let value = this.refs.sum.value.trim();
    if(!/^[0-9]{1,10}$/.test(value)){
      this.setState({
        sum:true
      });
      this.refs.sum_tip.innerHTML = "金额格式不正确";
      return false;
    }else{
      this.setState({
        sum:false
      });
    }
  }
  dateChange(){
    let date = this.refs.date.getFormattedValue();
    if(date !=null){
      this.setState({
        date:false
      })
    }
  }
  render(){
    return(
      <Modal {...this.props} show={this.state.show}
             onHide={this.hide.bind(this)}
             bsSize="sm" aria-labelledby="contained-modal-title-sm">
        <div className="modal-header">
          <button type="button" onClick={this.hide.bind(this)} className="close" aria-label="Close"><span aria-hidden="true">×</span></button>
          <h4 className="modal-title" id="contained-modal-title-sm">生成礼券</h4>
        </div>
        <div className="modal-body">
          <div className={this.state.sum?cx(s.show,"modalItem has-error"):"modalItem"}>
            <label><span>金额</span></label>
            <label>
              <input onInput={this.sumInput.bind(this)}
                      className="form-control form-control-sm"
                      type="text" placeholder="请输入金额"
                      ref="sum"/></label>
            <div ref = "sum_tip" className={cx(s.modileTip,"volumeTip")}>金额</div>
          </div>

          <div className={this.state.date?cx(s.show,s.lastItem,"modalItem has-error"):cx(s.lastItem,"modalItem")}>
            <label className={s.label}><span>到期时间</span></label>
            <div className={s.dataBox}>
              <DatePicker className = {s.dateModal} id="datePicker1" ref = "date"
                          dayLabels = {['日','一','二','三','四','五','六']}
                          monthLabels = {["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"]}
                          dateFormat = {"YYYY-MM-DD"}
                          defaultValue = {""}
                          showTodayButton = {true}
                          onChange={this.dateChange.bind(this)}
              />
              <div ref = "date_tip" className={cx(s.modileTip,"volumeTip")}></div>
            </div>
          </div>
          <div className="modalItem modelItemLast">
            <label><span> </span></label>
            <label>
              <button className={`btn btn-primary ${!this.props.isBtnState.createCoupon?"btn-loading":""}`}
                      disabled={!this.props.isBtnState.createCoupon}
                      onClick={this.createCoupon.bind(this)}
              >
                {this.props.isBtnState.createCoupon?"生成":"生成..."}
              </button>
            </label>
          </div>
        </div>
      </Modal>
    )
  }
}

class DistributeCoupon extends Component{
  static contextTypes = {
    store:React.PropTypes.object
  };
  static propTypes = {
    onDistributeCoupon:React.PropTypes.func,
    isBtnState:React.PropTypes.object
  };
  constructor(props){
    super(props);
    this.state = {
      show:false,
      id:null
    }
  }
  open(id){
    this.setState({
      show:true,
      id:id
    })
  }
  hide(){
    this.setState({
      show:false
    })
  }
  onDistributeCoupon(data){
    console.log(data);
    if(data.user_uuid){
      let newData = {
        user_name:data.name,
        uuid:this.state.id
      };
      this.props.onDistributeCoupon(newData,this);
    }else{
      this.context.store.dispatch(receiveNotification({message:"没有找到此用户",level:"danger"}));
      let my = this;
      setTimeout(function(){
        my.context.store.dispatch(clearNotification());
      },3000);
    }
  }
  render(){
    return(
      <Modal {...this.props} show={this.state.show}
             onHide={this.hide.bind(this)}
             bsSize="sm" aria-labelledby="contained-modal-title-sm">
        <div className="modal-header">
          <button type="button" onClick={this.hide.bind(this)} className="close" aria-label="Close"><span aria-hidden="true">×</span></button>
          <h4 className="modal-title" id="contained-modal-title-sm">分发礼券</h4>
        </div>
        <div className="modal-body">
          <div className={cx("modalItem",s.searchBox)}>
            <label><span> </span></label>
            <label className={s.search}>
              <Search
                parameter = {{name:""}}
                btnClickFun = {(data) =>{this.onDistributeCoupon(data)}}
                placeholder="请输入用户名"
                type = "organize"
                ref = "search"
                getItem = {function(item,my,i){
                  return (
                    <li key = {i}  onClick={my.chooseVal.bind(my,item.user_name)}>
                      <a href = "javascript:;">
                        <img width={40} height={40} src={item.logo} />
                        <p className={s.name}>{item.user_name}</p>
                      </a>
                    </li>)
                }}
                searchNumber={5}
              >
              </Search>
            </label>
          </div>
        </div>
      </Modal>
    )
  }
}
