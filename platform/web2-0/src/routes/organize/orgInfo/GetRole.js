import React,{PropTypes,Component} from 'react';
import HeadLine from '../../../components/HeadLine';
import Loading from '../../../components/Loading';
import {DropdownButton,SplitButton,MenuItem,Modal} from 'react-bootstrap';
import {receiveRoleDelete} from '../../../actions/organize';
import Confirm from '../../../components/Confirm';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../Organize.css';
import cx from 'classnames';

class GetRole extends Component{
  static contextTypes = {
    store:React.PropTypes.object
  };
  static propTypes = {
    roleList:React.PropTypes.array,
    getRoleList:React.PropTypes.func,
    onCreateRole:React.PropTypes.func,
    onDeleteRole:React.PropTypes.func,
    modalState:React.PropTypes.object,
    roleDetail:React.PropTypes.object,
    onGetRoleDetail:React.PropTypes.func,
    onSetRole:React.PropTypes.func,
    clearRoleDetail:React.PropTypes.func,
    token:React.PropTypes.object,
    isBtnState:React.PropTypes.object
  };

  constructor(props){
    super(props);
    this.state = {
      delData:""
    }
  }
  componentDidMount(){
  }
  getOrganizeUserBody(){
    let data = this.props.roleList;
    let power = this.props.token.team_priv;
    if(data.length ==1 && data[0]==1) return <tr><td colSpan = "4"><Loading/></td></tr>;
    if(!data.length) return <tr><td colSpan = "4" style = {{textAlign:"center"}}>暂无数据~</td></tr>;
    return data.map((item,i) =>{
      let role = item.role_priv.split("");
      let txt = role.map(item=>{
        let t = "";
        switch (item){
          case "C":
            t = "创建 ";
            break;
          case "R":
            t = "查询 ";
            break;
          case "U":
            t = "更新 ";
            break;
          case "D":
            t = "删除 ";
            break;
        }
        return t;
      });
      return (
        <tr key = {i}>
          <td>
            {item.role_name}
          </td>
          <td>
            {txt}
          </td>
          <td>
            {item.create_time}
          </td>
          <td>
            <SplitButton title="编辑" bsStyle={"primary"} id = {`roleBtn_${i}`} pullRight
                         disabled = {power.indexOf("U") ==-1}
              onClick = {this.onSetRoleModal.bind(this,item.role_uuid)}
              onSelect = {this.onSelectRole.bind(this,item.role_uuid)}
            >
              <MenuItem eventKey = "1" disabled = {power.indexOf("U") ==-1} >删除</MenuItem>
            </SplitButton>
          </td>
        </tr>
      )
    })
  }
  getTableDemo(){
    return (
      <table className="table table-hover table-bordered">
        <thead>
        <tr>
          <th>角色名称</th>
          <th>角色权限</th>
          <th>创建时间</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        {this.getOrganizeUserBody()}
        </tbody>
      </table>
    )
  }
  createRole(org_name,my){
    this.props.onCreateRole(org_name,my);
  }
  onSelectRole(id,e){
    if(e ==1){
      this.setState({
        delData:id,
      });
      this.context.store.dispatch(receiveRoleDelete(true));
    }
  }
  deleteRoleHide(){
    this.context.store.dispatch(receiveRoleDelete(false));
  }
  onSetRoleModal(id){
    this.props.onGetRoleDetail(id);
    this.refs.setRoleModel.open();
  }
  render(){
    let power = this.props.token.team_priv;
    return (
      <div>
        <div className={s.item}>
          <div className="clearfix">
            <div className="left">
              <HeadLine
                title = "角色列表"
                titleEnglish = "ROLE LIST"
                titleInfo = "组织角色列表"
              />
            </div>
            {
              power.indexOf("C") == -1?"":
              <div className={cx(s.right,"right")}>
                <div className="projectHeadBtn clearfix" onClick = {() => {this.refs.createRoleModel.open()}}>
                  <div className="projectHeadPlus left"></div>
                  <div className="projectHeadName left">
                    <p className="projectHeadP1">新建角色</p>
                    <p className="projectHeadP2">Create Role</p>
                  </div>
                </div>
              </div>
            }
          </div>
          <div className={cx(s.tabBox,"tableBox")}>
            <div className={s.table}>
              {this.getTableDemo()}
            </div>
          </div>
        </div>
        <CreateRole onCreateRole = {this.createRole.bind(this)} isBtnState = {this.props.isBtnState} ref = "createRoleModel" />
        <SetRole
          roleDetail={this.props.roleDetail}
          onSetRole={(obj,my)=>this.props.onSetRole(obj,my)}
          ref = "setRoleModel"
          clearRoleDetail = {()=>this.props.clearRoleDetail()}
        />
        <Confirm
          key = {this.state.delData}
          isShow={this.props.modalState.role}
          onHide={()=>{this.deleteRoleHide()}}
          title = "警告"
          text = "您确定要删除此服务吗?"
          ref = "confirmModal"
          func = {() => {this.props.onDeleteRole(this.state.delData)}}
        />
      </div>
    )
  }
}

export default  withStyles(s)(GetRole);

class CreateRole extends Component{
  static propTypes = {
    onCreateRole:React.PropTypes.func,
    isBtnState:React.PropTypes.object
  };
  constructor(props){
    super(props);
    this.state = {
      show:false,
      roleName:false,
      role:false,
      roleArr:[]
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
  createRole(){
    let role_name = this.refs.name;
    let tip = this.refs.tip;
    let roleTip = this.refs.roleTip;
    if(!role_name.value){
      this.setState({
        roleName:true
      });
      tip.innerHTML = "角色名称不能为空";
      return false;
    }
    if(this.state.roleArr.length == 0){
      this.setState({
        role:true
      });
      roleTip.innerHTML = '权限不能为空';
      return false;
    }
    if(!this.state.roleName && !this.state.role) {
      let data = {
        role_name:role_name.value,
        role_priv:this.state.roleArr.join("")
      };
      console.log(data);
      this.setState({
        roleArr:[]
      });
      this.props.onCreateRole(data,this);
    }
  }
  organizeName(){
    let value = this.refs.name.value;
    let tip = this.refs.tip;
    if(value.length == 0){
      this.setState({
        roleName:false
      });
      return false;
    }else  if(value.length<6){
      this.setState({
        roleName:true
      });
      tip.innerHTML = "角色名称太短";
      return false;
    }else if (!/^[a-z]{1}[a-z0-9_]{5,}$/.test(value)){
      this.setState({
        roleName:true
      });
      tip.innerHTML = "小写字母开头6位以上组合";
      return false;
    }else{
      this.setState({
        roleName:false
      });
    }
  }
  getRole(n){
    let role = this.state.roleArr;
    let m = role.indexOf(n);
    if(m==-1){
      role.push(n);
      switch (n){
        case "D":
          role.indexOf("R") ==-1?role.push("R"):null;
          break;
        case "U":
          role.indexOf("R") ==-1?role.push("R"):null;
          break;
      }
    }else{
      role.splice(m,1);
    }
    if(role.length){
      this.setState({
        role:false
      })
    }
    this.setState({
      roleArr:role
    })
  }
  render(){
    return(
      <Modal {...this.props} show={this.state.show}
             onHide={this.hide.bind(this)}
             bsSize="sm" aria-labelledby="contained-modal-title-sm">
        <div className="modal-header">
          <button type="button" onClick={this.hide.bind(this)} className="close" aria-label="Close"><span aria-hidden="true">×</span></button>
          <h4 className="modal-title" id="contained-modal-title-sm">新建角色</h4>
        </div>
        <div className="modal-body">
          <div className={this.state.roleName?"modalItem has-error":"modalItem"}>
            <label><span>角色名称</span></label>
            <label>
              <input  onInput = {this.organizeName.bind(this)}
                      className="form-control form-control-sm"
                      type="text" placeholder="请输入名称"
                      ref="name"/></label>
            <div ref = "tip" className="volumeTip">角色名称不正确</div>
          </div>

          <div className={this.state.role?"modalItem has-error":"modalItem"}>
            <label className={s.label}><span>角色权限</span></label>
            <label>
              <label className="checkbox-inline">
                <input checked ={this.state.roleArr.indexOf("C") !=-1}
                       onChange={this.getRole.bind(this,"C")} type = "checkbox" />新建</label>
              <label className="checkbox-inline">
                <input checked={this.state.roleArr.indexOf("R") !=-1}
                       onChange={this.getRole.bind(this,"R")} type = "checkbox" />查询</label>
              <label className="checkbox-inline">
                <input checked={this.state.roleArr.indexOf("U") !=-1}
                       onChange={this.getRole.bind(this,"U")} type = "checkbox" />修改</label>
              <label className="checkbox-inline">
                <input checked={this.state.roleArr.indexOf("D") !=-1}
                       onChange={this.getRole.bind(this,"D")} type = "checkbox" />删除</label>
            </label>
            <div ref = "roleTip" className="volumeTip"></div>
          </div>
          <div className="modalItem modelItemLast">
            <label><span>{this.state.orgName} </span></label>
            <label>
              <button className="btn btn-primary"
                      disabled={!this.props.isBtnState.createRole}
                      onClick={this.createRole.bind(this)}>创建角色</button>
            </label>
          </div>
        </div>
      </Modal>
    )
  }
}

class SetRole extends Component{
  static propTypes = {
    onSetRole:React.PropTypes.func,
    roleDetail:React.PropTypes.object,
    clearRoleDetail:React.PropTypes.func
  };
  constructor(props){
    super(props);
    this.state = {
      show:false,
      roleName:false,
      role:false,
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
    });
    this.props.clearRoleDetail();
  }
  setRole(){
    let role_name = this.refs.name;
    let tip = this.refs.tip;
    let roleTip = this.refs.roleTip;
    if(!role_name.value){
      this.setState({
        roleName:true
      });
      tip.innerHTML = "角色名称不能为空";
      return false;
    }
    let checkbox = this.refs.roleLabel.getElementsByTagName("input");
    let roleArray = ["C","R","U","D"];
    let Role = [];
    for(var i=0;i<checkbox.length;i++){
      if(checkbox[i].checked){
        Role.push(roleArray[i])
      }
    };
    if(Role.length == 0){
      this.setState({
        role:true
      });
      roleTip.innerHTML = '权限不能为空';
      return false;
    }
    if(!this.state.roleName && !this.state.role) {
      let data = {
        role_uuid:this.props.roleDetail.role_uuid,
        role_priv:Role.join("")
      };
      console.log(data);
      this.props.onSetRole(data,this);
    }
  }
  organizeName(){
    let value = this.refs.name.value;
    let tip = this.refs.tip;
    if(value.length == 0){
      this.setState({
        roleName:false
      });
      return false;
    }else  if(value.length<4){
      this.setState({
        roleName:true
      });
      tip.innerHTML = "角色名称太短";
      return false;
    }else if (!/^[a-z]{1}[a-z0-9_]{3,}$/.test(value)){
      this.setState({
        roleName:true
      });
      tip.innerHTML = "小写字母开头4位以上组合";
      return false;
    }else{
      this.setState({
        roleName:false
      });
    }
  }
  render(){
    let data = this.props.roleDetail;
    if(!data.role_uuid) return null;
    return(
      <Modal {...this.props} show={this.state.show}
             onHide={this.hide.bind(this)}
             bsSize="sm" aria-labelledby="contained-modal-title-sm">
        <div className="modal-header">
          <button type="button" onClick={this.hide.bind(this)} className="close" aria-label="Close"><span aria-hidden="true">×</span></button>
          <h4 className="modal-title" id="contained-modal-title-sm">修改角色</h4>
        </div>
        <div className="modal-body">
          <div className={this.state.roleName?"modalItem has-error":"modalItem"}>
            <label><span>角色名称</span></label>
            <label>
              <input  onInput = {this.organizeName.bind(this)}
                      key = {data.role_uuid}
                      disabled={true}
                      defaultValue={data.role_name}
                      className="form-control form-control-sm"
                      type="text" placeholder="请输入名称"
                      ref="name"/></label>
            <div ref = "tip" className="volumeTip">角色名称不正确</div>
          </div>

          <div className={this.state.role?"modalItem has-error":"modalItem"}>
            <label className={s.label}><span>角色权限</span></label>
            <label ref = "roleLabel">
              <label className="checkbox-inline"><input defaultChecked={data.role_priv.indexOf("C") !=-1} type = "checkbox" />新建</label>
              <label className="checkbox-inline"><input defaultChecked={data.role_priv.indexOf("R") !=-1} type = "checkbox" />查询</label>
              <label className="checkbox-inline"><input defaultChecked={data.role_priv.indexOf("U") !=-1} type = "checkbox" />修改</label>
              <label className="checkbox-inline"><input defaultChecked={data.role_priv.indexOf("D") !=-1} type = "checkbox" />删除</label>
            </label>
            <div ref = "roleTip" className="volumeTip"></div>
          </div>
          <div className="modalItem modelItemLast">
            <label><span>{this.state.orgName} </span></label>
            <label>
              <button className="btn btn-primary"
                      onClick={this.setRole.bind(this)}>确定</button>
            </label>
          </div>
        </div>
      </Modal>
    )
  }
}
