

import React,{PropTypes,Component} from 'react';
import HeadLine from '../../components/HeadLine';
import Toggle from '../Toggle';
import Loading from '../Loading';
import ReactDOM from 'react-dom';

class IsPublicToggle extends  Component{
  static propTypes={
    getToggle:React.PropTypes.func,
    state:React.PropTypes.bool,
  };
  constructor(props) {
    super(props);
    this.state = {
      is_public:this.props.state
    };
  }
  handClick(component, value){
    this.setState({
      is_public: !this.state.is_public,
    });
    this.props.getToggle(this.state.is_public);
  }
  componentDidMount(){
  }
  render(){
    return(
      <Toggle
        defaultChecked={this.state.is_public}
        onChange={this.handClick.bind(this)}
      />
    )
  }
}

class GetOrgInfo extends Component{
  static contextTypes = {
    store:React.PropTypes.object
  };
  static propTypes = {
    getOrganizeDetail:React.PropTypes.func,
    organizeDetail:React.PropTypes.object,
    setOrganizeDetail:React.PropTypes.func
  };

  constructor(props){
    super(props);
    this.state = {
      is_public:1
    }
  }
  componentDidMount(){
    let organizeId = this.context.store.getState().user_info.orga_uuid;
    this.props.getOrganizeDetail(organizeId);
  }
  getToggleValue(value){
    let flag = !value ? 1 : 0;//1 true  0 false
    this.setState({
      is_public:flag
    })
  }

  setOrganizeDetail(){
    let orga_id = this.context.store.getState().user_info.orga_uuid;
    let data = {
      orga_id:orga_id,
      orga_detail:this.refs.orga_detail.value,
      is_public:this.state.is_public
    };
    this.props.setOrganizeDetail(data);
  }
  render(){
    let data = this.props.organizeDetail;
    if(data.creation_time == "") return <div>加载中</div>;
    return (
      <div className = "userTabBox" key = {new Date(data.creation_time).getTime()}>
        <div className = "userItem organizeBox">
          <HeadLine
            title="组织头像"
            titleEnglish=""
            titleInfo="ORGANIZE HEAD"
          />
          <div className = "userHead organizeItem">
            <div className="userHeadBox">
              <img />
            </div>
            <div className = "choose icon-operation">
              <span>更改头像</span>
            </div>
          </div>
          <HeadLine
            title="组织描述"
            titleEnglish=""
            titleInfo="ORGANIZE "
          />
          <div className = "organizeItem">
            <textarea type = "text" className = "form-control" ref = "orga_detail" defaultValue={data.orga_detail} />
          </div>
          <HeadLine
            title="是否公开"
            titleEnglish=""
            titleInfo="IS PUBLIC"
          />
          <div className = "organizeItem">
            <IsPublicToggle
              state = {data.is_public == 1}
              getToggle={this.getToggleValue.bind(this)}
            />
          </div>
          <div className = "organizeItem organizeItemBtn ">
            <button className="btn btn-primary" onClick={this.setOrganizeDetail.bind(this)}>保存</button>
          </div>
        </div>
      </div>
    )
  }
}

export default  GetOrgInfo;
