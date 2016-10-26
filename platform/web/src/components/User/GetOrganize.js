import React,{PropTypes,Component,} from 'react';
import HeadLine from '../HeadLine';

export default class extends React.Component {
    static contextTypes = {
        store:React.PropTypes.object
    };
    static propTypes = {

    };
    componentDidMount(){
        console.log(this.context.store);
    }

    getOrganizeBody(){
        let data = [{}]
    }
    getTableDemo(){
       return (
           <table className="table table-hover table-bordered">
               <thead>
               <tr>
                   <th>组织名称</th>
                   <th>组织简介</th>
                   <th>组织权限</th>
                   <th>加入时间</th>
                   <th>操作</th>
               </tr>
               </thead>
               <tbody>
                {this.getOrganizeBody()}
               </tbody>
           </table>
       )
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
                        <div className="hbAddBtn clearfix">
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
            </div>
        )
    }

}