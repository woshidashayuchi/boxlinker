
import React,{PropTypes,Component} from 'react';
import HeadLine from '../../../components/HeadLine';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../User.css';
import cx from 'classnames';

class GetAccountManage extends Component{
  static contextTypes = {
    store: React.PropTypes.object,
  };
  static propTypes = {
    authUrl: React.PropTypes.object,
    getAuthURL:React.PropTypes.func,
    relieveBinding:React.PropTypes.func,
    oauth:React.PropTypes.object,
    url:React.PropTypes.string
  };
  componentDidMount(){
  }
  onRelieveBinding(type,e){
    let oauth = this.props.oauth;
    e.target.setAttribute("disabled",true);
    let data = {
      src_type:type,
      url:this.props.url
    };
    if(type == "github"){
      oauth.github?this.props.relieveBinding(data):"";
    }else{
      oauth.coding?this.props.relieveBinding(data):"";
    }
  }
  render(){
    let oauth = this.props.oauth;
    let github = oauth.github;
    return(
      <div className = {s.tab}>
        <div className = {s.item}>
          <HeadLine
            title="账号管理"
            titleEnglish=""
            titleInfo="ACCOUNT MANAGEMENT"
          />
        </div>
        <div className={s.accountItem}>
          <div className={cx(s.accountLeft,"icon-github")}>
            <div className={s.accountInfo}>
              <h1>Github
                {
                  oauth.github
                    ?
                    <span className="icon-username">{oauth.github}</span>
                    :
                    null
                }
              </h1>
              <p>Github于2008年上线，用于Git代码仓库托管及基本的Web管理界面</p>
            </div>
          </div>
          {
            github?
              <a href = "javascript:;" className={cx(s.btn,"btn btn-default")}
                 onClick = {this.onRelieveBinding.bind(this,"github")}
              >解除绑定</a>
            :
              <a href = {this.props.authUrl.github} className={cx(s.btn,"btn btn-warning")}>绑定</a>
          }
        </div>
      </div>
    )
  }
}

export default  withStyles(s)(GetAccountManage);
