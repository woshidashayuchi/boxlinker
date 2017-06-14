
import React ,{PropTypes,Component}  from 'react';
import HeadLine from '../../../components/HeadLine';
import Loading from '../../../components/Loading';
import s from "../User.css";
import cx from "classnames";
import withStyles from 'isomorphic-style-loader/lib/withStyles';

class GetPayments extends Component{
  static contextTypes = {
    store:React.PropTypes.object
  };
  static propTypes = {
    rechargeList:React.PropTypes.object,
    getRechargeList:React.PropTypes.func,
  };
  constructor(){
    super();
    this.state = {
      pageSize:10,
      pageNumber:1
    }
  }
  componentDidMount(){
    let user_info = this.context.store.getState().user_info;
    this.rechargeData = {
      start_time:(new Date(user_info.create_time).getTime())/1000,
      end_time:(new Date().getTime())/1000,
      page_size:this.state.pageSize,
      page_num:this.state.pageNumber
    };
    console.log(this.rechargeData)
    this.props.getRechargeList(this.rechargeData);
  }
  getTableTr(){
    let data = this.props.rechargeList;
    if(data.count ==-1)return <tr><td colSpan="4"><Loading /></td></tr>;
    if(data.count ==0)return <tr><td colSpan="4">暂无数据</td></tr>;
    let list = data.recharge_list;
    let tr = list.map((item,i) =>{
      return (<tr key = {i}>
                <td>¥{item.recharge_amount.toFixed(2)}</td>
                <td>{item.create_time}</td>
                <td>{item.recharge_type == "zhifubao"?"支付宝":"微信"}</td>
                <td>{item.user_name}</td>
              </tr>)
    });
    return tr;
  }
  getTable() {
    return (
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th>充值金额</th>
            <th>充值时间</th>
            <th>充值方式</th>
            <th>操作人</th>
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
    this.rechargeData.page_num = eventKey;
    this.props.getRechargeList(this.rechargeData);
  }
  getPage(){
    let data = this.props.rechargeList;
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
  }
  render(){
    return (
      <div className={s.root}>
        <div className={cx(s.item,"clearfix")}>
          <div>
            <HeadLine
              title = "充值记录"
              titleEnglish = "RECHARGE RECORD"
              titleInfo = "以往充值的记录"
            />
          </div>
          <div className={cx(s.tabBox,"tableBox")}>
            <div className = {s.table}>
              {this.getTable()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withStyles(s)(GetPayments);
