
import React ,{PropTypes,Component}  from 'react';
import HeadLine from '../../../components/HeadLine';
import s from "../User.css";
import cx from "classnames";
import {Pagination} from 'react-bootstrap';
import {yesterdayTime} from '../../../core/utils';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Loading from '../../../components/Loading';
import DatePicker from 'react-bootstrap-date-picker';

class GetConsume extends Component{
  static propTypes = {
    consume:React.PropTypes.object,
    getConsumeList:React.PropTypes.func,
  };
  constructor(){
    super();
    this.state = {
      time:yesterdayTime().start,
      pageSize:10,
      pageNumber:1
    }
  }
  componentDidMount(){
    this.consumeData = {
      start_time:yesterdayTime().start_time,
      end_time:yesterdayTime().end_time,
      page_size:this.state.pageSize,
      page_num:this.state.pageNumber
    };
    console.log(this.consumeData)
    this.props.getConsumeList(this.consumeData);
  }
  searchConsume(){
    let value = this.refs.datePicker.getValue();
    if(!value) return false;
    let start_time = (new Date(value.split("T")[0]+" 00:00:00").getTime())/1000;
    if(!start_time) return false;
    this.setState({
      time:value
    });
    this.consumeData = {
      start_time:start_time,
      end_time:start_time+24*60*60-1,
      page_size:this.state.pageSize,
      page_num:this.state.pageNumber
    };
    this.props.getConsumeList(this.consumeData)
  }
  handleSelectPage(eventKey){
    eventKey = Math.floor(eventKey);
    this.setState({
      pageNumber: eventKey
    });
    this.consumeData.page_num = eventKey;
    this.props.getConsumeList(this.consumeData);
  }
  getTableTr(){
    let list = this.props.consume.bills_list;
    if(list.length==1 &&list[0] ==1) return <tr><td colSpan="9"><Loading /></td></tr>;
    if(list.length==0) return <tr><td colSpan="9" className="text-center">暂无数据~</td></tr>;
    let tr = list.map((item,i) =>{
      return (<tr key = {i}>
        <td>{item.resource_name}</td>
        <td>{item.resource_type}</td>
        <td>{item.resource_status}</td>
        <td>{item.resource_conf}</td>
        <td>¥{item.resource_cost.toFixed(2)}</td>
        <td>¥{item.voucher_cost.toFixed(2)}</td>
        <td>¥{(item.resource_cost-item.voucher_cost).toFixed(2)}</td>
        <td>{item.start_time}</td>
        <td>{item.end_time}</td>
      </tr>)
    });
    return tr;
  }
  getTable() {
    return (
      <table className="table table-hover table-bordered">
        <thead>
        <tr>
          <th>资源名称</th>
          <th>资源类型</th>
          <th>资源状态</th>
          <th>资源配置</th>
          <th>消费金额</th>
          <th>礼券花费</th>
          <th>余额花费</th>
          <th>开始时间</th>
          <th>结束时间</th>
        </tr>
        </thead>
        <tbody>
        {this.getTableTr()}
        </tbody>
      </table>
    )
  }
  getPage(){
    let data = this.props.consume;
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
  render(){
    let total = this.props.consume.bills_total;
    return (
      <div className={s.root}>
        <div className={cx(s.item,"clearfix")}>
          <div>
            <HeadLine
              title = "消费记录"
              titleEnglish = "CONSUME RECORD"
              titleInfo = "一天内的消费记录,默认显示昨天一天的消费情况"
            />
          </div>
          <div className={s.tabSearch}>
            <p>选择日期:</p>
            <DatePicker className = {s.date} id="datePicker" ref = "datePicker"
                        dayLabels = {['日','一','二','三','四','五','六']}
                        monthLabels = {["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"]}
                        dateFormat = {"YYYY-MM-DD"}
                        showTodayButton = {true}
                        value = {this.state.time}
            />
            <button className="btn btn-primary btn-sm" onClick = {this.searchConsume.bind(this)}>搜索</button>
            {
              total.resource_cost==null||total.voucher_cost==null?null:
                <div className={s.sumConsume}>
                  <label>消费总额:<span>¥{total.resource_cost.toFixed(2)}</span></label>
                  <label>礼券花费总额:<span>¥{total.voucher_cost.toFixed(2)}</span></label>
                  <label>余额花费总额:<span>¥{(total.resource_cost-total.voucher_cost).toFixed(2)}</span></label>
                </div>
            }
          </div>
          <div className={cx(s.tabBox,"tableBox")}>
            <div className = {s.table}>
              {this.getTable()}
              {this.getPage()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withStyles(s)(GetConsume);
