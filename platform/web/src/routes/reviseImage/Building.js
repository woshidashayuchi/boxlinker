
import React,{Component} from 'react'
import {SplitButton,MenuItem,
} from 'react-bootstrap'
import cx from 'classnames'

export default class Building extends Component {
  static contextTypes = {
    setTitle: React.PropTypes.func
  };
  constructor(){
    super();
    this.state = {
      githubModalShow: false
    }
  }
  static propTypes = {
    imageList:React.PropTypes.array,
    onImageListLoad:React.PropTypes.func,
  };
  componentDidMount(){
    this.props.onImageListLoad();
  }

  getAddBtn() {
    return (
      <div className={cx("hbAdd", "left")}>
        <a href="/building/create" className={cx("hbAddBtn", "clearfix")}>
          <div className={cx("hbPlus", "left")}></div>
          <div className={cx("hbPlusInfo", "left")}>
            <p className={"hbPName"}>构建新镜像</p>
            <p className={"hbPInfo"}>Build New Image</p>
          </div>
        </a>
      </div>
    )
  }
  deleteLine(){}
  getSourceName(name){
    let _name;
    if(_name = /^https\:\/\/github.com\/([0-9a-zA-Z_-]+\/[0-9a-zA-Z_-]+)\.git$/.exec(name)){
      let style = {
        fontSize:'18px',
        verticalAlign:'middle',
        marginRight: '5px'
      };
      return <span><i className="icon-console" style={style}></i>{_name[1]}</span>
    }
    return null;
  }
  getLines(){
    let data = [
      {id:"123",projectName:"abcdefg",source:"https://github.com/cabernety/k8s-deploy.git",
        lastBuildCost:"5分钟",
        lastBuildTime:1473308819389,buildStatus:"构建成功"}
    ];
    return data.map((item,i)=>{
      return (
        <tr key={i}>
          <td><a href={`/building/${item.id}`}>{item.projectName}</a></td>
          <td><a href={item.source} target="_blank">{this.getSourceName(item.source)}</a></td>
          <td>{item.buildStatus}</td>
          <td>{item.lastBuildCost}</td>
          <td>{item.lastBuildTime}</td>
          <td>
            <SplitButton
              onClick={()=>{}}
              onSelect={this.deleteLine.bind(this,item.disk_name)}
              bsStyle="primary" title="构建" id={`building-table-line-${i}`}>
              <MenuItem eventKey="1">删除</MenuItem>
            </SplitButton>
          </td>
        </tr>
      )
    })
  }
  render(){
    this.context.setTitle('构建镜像');
    return (
      <div className="containerBgF building-list">
        <div className={cx("hbHd","hbHdNoMb", "clearfix")}>
          {this.getAddBtn()}
        </div>
        <div className="building-table">
          <table className="table table-hover table-bordered">
            <thead>
            <tr>
              <th>镜像名称</th>
              <th>代码源</th>
              <th>构建状态</th>
              <th>上次构建用时</th>
              <th>最近构建</th>
              <th>操作</th>
            </tr>
            </thead>
            <tbody>
            {this.getLines()}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
