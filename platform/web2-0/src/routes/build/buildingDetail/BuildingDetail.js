
import React, { PropTypes,Component } from 'react';
import {Media,Tabs,Tab,FormGroup,Col} from 'react-bootstrap';
import Loading from '../../../components/Loading';
import {BREADCRUMB} from "../../../constants";
import BuildingDetailBranch from "./BuildingDetailBranch";
import BuildingDetailHistory from "./BuildingDetailHistory";
import BuildingDetailNow from "./BuildingDetailNow";
import BuildingDetailItem from "./BuildingDetailItem";
import {delOtherHistory,receiveClearBuildProjectsDetail,receiveClearBuildingDetail,receiveClearBuildBranch}
from '../../../actions/building';
import s from "./BuildingDetail.css";
import widthstyle from 'isomorphic-style-loader/lib/withStyles';
import cx from "classnames";

class BuildingDetail extends Component{
  static contextTypes = {
    store:React.PropTypes.object
  };
  static propTypes = {
    projectId: React.PropTypes.string.isRequired,
    buildProjectsDetail:React.PropTypes.object,
    getBuildProjectsDetail:React.PropTypes.func,
    setBreadcrumb:React.PropTypes.func,
    getBuildHistory:React.PropTypes.func,
    buildHistory:React.PropTypes.array,
    getBuildBranchHistory:React.PropTypes.func,
    buildBranchHistory:React.PropTypes.array,
    getBuildBranch:React.PropTypes.func,
    buildBranch:React.PropTypes.array,
    buildingDetail:React.PropTypes.object,
    getBuildingDetail:React.PropTypes.func,
    otherHistory:React.PropTypes.array
  };
  constructor(){
    super();
    this.state = {
      activeNumber:1,
      buildId:"",
    }
  }
  componentDidMount(){
    this.props.setBreadcrumb(BREADCRUMB.CONSOLE, BREADCRUMB.BUILD_IMAGE, BREADCRUMB.IMAGE_DETAIL);
    this.props.getBuildProjectsDetail(this.props.projectId);
    this.props.getBuildBranch(this.props.projectId);
  }
  componentWillUnmount(){
    this.context.store.dispatch(receiveClearBuildProjectsDetail());
    this.context.store.dispatch(receiveClearBuildingDetail());
    this.context.store.dispatch(receiveClearBuildBranch());
  }
  goToDetail(buildId){
    this.setState({
      activeNumber:buildId
    });
  }
  getOtherTab(){
    let tab = this.props.otherHistory.map((item,i) =>{
      if(item.buildId) {
        return (
          <Tab key={i} eventKey={item.buildId} title={item.name}>
            <BuildingDetailItem
              buildId={item.buildId}
              deleteBuildId={() => {
                this.deleteBuildId()
              }}
            />
          </Tab>
        )
      }
    });
    return tab;
  }
  deleteBuildId(){
    this.setState({
      buildId:""
    });
  }
  selectTab(key){
    if(key == this.state.activeNumber && key.length>10){
      this.context.store.dispatch(delOtherHistory(key));
      this.setState({
        activeNumber: 2
      });
    }else {
      this.setState({
        activeNumber: key
      });
    }
  }
  render(){
    let data = this.props.buildProjectsDetail;
    if(!data||!data.id) return (<div style={{"textAlign":"center"}}><Loading /></div>);
    return (
      <div className="containerBgF">
        <div className={s.container}>
          <Tabs defaultActiveKey = {1} activeKey = {this.state.activeNumber} className = "tabIcon"  id = "buildingDetail" onSelect = {this.selectTab.bind(this)}>
            <Tab eventKey = {1} title = "当前">
              <BuildingDetailNow
                buildProjectsDetail = {this.props.buildProjectsDetail}
                buildingDetail = {this.props.buildingDetail}
                getBuildingDetail = {(id) =>{this.props.getBuildingDetail(id)}}
              />
            </Tab>
            <Tab eventKey = {2} title = "分支">
              <BuildingDetailBranch
                buildProjectsDetail = {this.props.buildProjectsDetail}
                buildBranchHistory = {this.props.buildBranchHistory}
                getBuildBranchHistory = {(data) =>{this.props.getBuildBranchHistory(data)}}
                getBuildBranch = {(id) =>{this.props.getBuildBranch(id)}}
                buildBranch = {this.props.buildBranch}
                goToDetail = {(id) =>{this.goToDetail(id)}}
                otherHistory = {this.props.otherHistory}
              />
            </Tab>
            <Tab eventKey = {3} title = "构建历史">
              <BuildingDetailHistory
                buildProjectsDetail = {this.props.buildProjectsDetail}
                getBuildHistory = {(data) => {this.props.getBuildHistory(data)}}
                buildHistory = {this.props.buildHistory}
              />
            </Tab>
            {this.getOtherTab()}
          </Tabs>
        </div>
      </div>
    )
  }
}

export default widthstyle(s)(BuildingDetail);
