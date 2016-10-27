import React,{PropTypes,Component,} from 'react';
import HeadLine from '../HeadLine';
import {Modal} from 'react-bootstrap';
import Loading from '../Loading';

class GetOrganize extends Component {
    static contextTypes = {
        store:React.PropTypes.object
    };
    static propTypes = {
        createOrganize:React.PropTypes.func,
        organizeList:React.PropTypes.array,
        getOrganizeList:React.PropTypes.func
    };
    createOrganize(org_name){
        this.props.createOrganize(org_name);
        this.refs.createOrgModel.hide();

    }
    getOrganizeBody(){
        let data = this.props.organizeList;
        if(data[0] == 1) return <tr><td colSpan = "5" style = {{textAlign:"center"}}><Loading /></td></tr>;
        if(!data.length) return <tr><td colSpan = "5" style = {{textAlign:"center"}}>暂无数据~</td></tr>;
        return data.map((item,i) =>{
            return (
                <tr key = {i}>
                    <td>
                        <div className="mediaItem">
                            <img className="mediaImg" src = "/slImgJx.png" />
                            <span className="mediaTxt">{item.org_name}</span>
                        </div>
                    </td>
                    <td>{item.org_detail}</td>
                    <td>{item.is_ower}</td>
                    <td>
                        <button className="btn btn-danger">退出组织</button>
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
                   <th width = "25%">组织名称</th>
                   <th width = "25%">组织简介</th>
                   <th width = "25%">组织权限</th>
                   <th width = "25%">操作</th>
               </tr>
               </thead>
               <tbody>
                {this.getOrganizeBody()}
               </tbody>
           </table>
       )
    }
    componentDidMount(){
        this.props.getOrganizeList();
    }
    render(){
        return(
            <div className="organize">
                <div className="organizeHd hbHd clearfix">
                    <div className = "left">
                        <HeadLine
                            title = "我的组织"
                            titleEnglish = "MY ORGANIZE"
                            titleInfo = "所有我加入的组织的列表"
                        />
                    </div>
                    <div className="hbAdd right">
                        <div className="hbAddBtn clearfix" onClick = {() => {this.refs.createOrgModel.open()}}>
                            <div className="hbPlus left"></div>
                            <div className="hbPlusInfo left">
                                <p className="hbPName">新建组织</p>
                                <p className="hbPInfo">Create Organize</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="organizeBd sl-bd TableTextLeft">
                    {this.getTableDemo()}
                </div>
                <CreateOrganize onCreateOrganize = {this.createOrganize.bind(this)} ref = "createOrgModel" />
            </div>
        )
    }

}

class CreateOrganize extends Component{
    static propTypes = {
        onCreateOrganize:React.PropTypes.func
    };
    constructor(props){
        super(props);
        this.state = {
            show:false,
            orgName:false
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
    createOrganize(){
        let org_name = this.refs.org_name;
        let org_tip = this.refs.org_tip;
        if(!org_name.value){
            this.setState({
                orgName:true
            });
            org_tip.innerHTML = "组织名称不能为空";
            return false;
        }
        this.props.onCreateOrganize(org_name.value);
    }
    organizeName(){
      let value = this.refs.org_name.value;
        let org_tip = this.refs.org_tip;
        if(value.length == 0){
            this.setState({
                orgName:false
            });
        }else  if(value.length<6){
            this.setState({
                orgName:true
            });
            org_tip.innerHTML = "组织名称太短";
        }else if (!/^[a-z]{1}[a-z0-9_]{5,}$/.test(value)){
            this.setState({
                orgName:true
            });
            org_tip.innerHTML = "组织名称格式不正确";
        }else{
            this.setState({
                orgName:false
            });
        }
    }
    render(){
        return(
        <Modal {...this.props} show={this.state.show}
               onHide={this.hide.bind(this)}
               bsSize="sm" aria-labelledby="contained-modal-title-sm">
            <div className="modal-header">
                <button type="button" onClick={this.hide.bind(this)} className="close" aria-label="Close"><span aria-hidden="true">×</span></button>
                <h4 className="modal-title" id="contained-modal-title-sm">新建组织</h4>
            </div>
            <div className={this.state.orgName?"modal-body has-error":"modal-body"}>
                <div className="modalItem">
                    <label><span>组织名称</span></label>
                    <label>
                        <input  onInput = {this.organizeName.bind(this)}
                                className="form-control form-control-sm"
                               type="input" placeholder="请输入名称"
                               ref="org_name"/></label>
                </div>
                <div ref = "org_tip" className="volumeTip">组织名称不正确</div>
                <div className="modalItem modelItemLast">
                    <label><span> </span></label>
                    <label>
                        <button className="btn btn-primary"
                                onClick={this.createOrganize.bind(this)}>创建组织</button>
                    </label>
                </div>
            </div>
        </Modal>
        )
    }
}

export default GetOrganize;