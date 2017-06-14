/**
 * Created by zhangsai on 2016/12/16.
 */
import React, { PropTypes,Component } from 'react';
import fetch from 'isomorphic-fetch';
import * as Const from "../../constants";
import cookie from 'react-cookie';
import cx from "classnames";
import s from "./Search.css";
import withStyles from 'isomorphic-style-loader/lib/withStyles';

class Search extends Component{
  static propTypes = {
    btnClickFun:React.PropTypes.func,//点击搜索按钮的回调函数
    placeholder:React.PropTypes.string,
    type:React.PropTypes.string,//搜索类型
    parameter:React.PropTypes.object,//url中需要传的参数
    getItem:React.PropTypes.func,//生成li列表,
    searchNumber:React.PropTypes.number,//模糊搜索需要的字符数
  };
  constructor(){
    super();
    this.state = {
      assist:false,
      dataList:[1],
    }
  }
  returnValue(){
    return this.refs.searchInput.value;
  }
  fetchGetList(data){
    console.log(data)
    let url = null;
    switch (this.props.type){
      case "platformImage":
        url = Const.FETCH_URL.IMAGE_AUTH+"/imagerepo/publicimages/"+data.page+"/"+data.page_size+"?repo_fuzzy="+data.repo_fuzzy;
        break;
      case "myImage":
        url = Const.FETCH_URL.IMAGE_AUTH+"/imagerepo/ownimages/"+data.page+"/"+data.page_size+"?repo_fuzzy="+data.repo_fuzzy;
        break;
      case "organize":
        url = Const.FETCH_URL.UCENTER+"/ucenter/users?user_name="+data.name;
          break;
      case "service":
        url = Const.FETCH_URL.SERVICE+"/application/services?page_size=5&page_num=1&service_name="+data.service_name;
        break;
    }
    let myInit = {
      method:"GET",
      headers:{token:cookie.load("_at")},
    };
    let my = this;
    fetch(url,myInit)
      .then(response => response.json())
      .then((json) =>{
        if(json.status == 0){
          let data = []//json.result.result?json.result.result:json.result;
          switch (my.props.type){
            case "organize":
              data = json.result.user_list;
              break;
            case "service":
              data = json.result.service_list;
              break;
            default:
              data = json.result.result?json.result.result:json.result;
          }
          data.splice(5);
          console.log(data,">>>>>");
          my.setState({
            dataList:data
          })
        }else{
          my.setState({
            dataList:[1]
          })
        }
      })
  }
  inputChange(e){
    let val = e.target.value;
    this.chooseNumber = -1;
    let my = this;
    let parameter = this.props.parameter;
    let number = this.props.searchNumber?this.props.searchNumber:3;
    if(val.length>=number) {
      this.setState({
        assist:true
      });
      switch (this.props.type){
        case "platformImage":
          parameter.repo_fuzzy = val;
          this.fetchGetList(this.props.parameter);
          break;
        case "myImage":
          parameter.repo_fuzzy = val;
          this.fetchGetList(this.props.parameter);
          break;
        case "organize":
          parameter.name = val;
          this.fetchGetList(this.props.parameter);
          break;
        case "service":
          parameter.service_name = val;
          this.fetchGetList(this.props.parameter);
          break;
      }
      document.onkeydown = function(e){
        if(my.state.assist == true) {
          let max = my.state.dataList.length-1;
          for(let i = 0;i<= max;i++){
            my.refs.list.getElementsByTagName("li")[i].className = ""
          }
          switch (e.keyCode) {
            case 38:
              if (my.chooseNumber == 0) {
                my.chooseNumber = 0;
              } else {
                my.chooseNumber--;
              }
              my.refs.list.getElementsByTagName("li")[my.chooseNumber].className = "active";
              break;
            case 40:
              if(my.chooseNumber>=max){

              }else {
                my.chooseNumber++;
              }
              my.refs.list.getElementsByTagName("li")[my.chooseNumber].className = "active";
              break;
            case 13:
              if(my.chooseNumber == -1){
                my.searching();
                my.setState({
                  assist:false
                });
                my.chooseNumber = -1;
              }else {
                switch (my.props.type){
                  case "platformImage":
                    my.refs.searchInput.value = my.state.dataList[my.chooseNumber].repository;
                    break;
                  case "myImage":
                    my.refs.searchInput.value = my.state.dataList[my.chooseNumber].repository;
                    break;
                  case "organize":
                    my.refs.searchInput.value = my.state.dataList[my.chooseNumber].user_name;
                    break;
                  case "service":
                    my.refs.searchInput.value = my.state.dataList[my.chooseNumber].service_name;
                    break;
                }
                my.setState({
                  assist: false
                });
                my.chooseNumber = -1;
              }
              break;
            case 27:
              my.setState({
                assist:false
              });
              my.chooseNumber = -1;
              break;
          }
        }else{
          if(e.keyCode == 13){
            my.searching();
          }
        }
      }
    }else{
      this.setState({
        assist:false,
        dataList:[1]
      });
    }
  }
  inputBlur(){
    this.chooseNumber = 0;
    let my = this;
    setTimeout(function(){
      my.setState({
        assist:false
      })
    },200);
  }
  chooseVal(value){
    this.refs.searchInput.value = value;
    this.chooseNumber = 0;
    let my = this;
    setTimeout(function(){
      my.setState({
        assist:false
      })
    },200);
  }
  getListBody(){
    let list = this.state.dataList;
    let my = this;
    if(list[0] == 1) return <li>加载中...</li>;
    if(list && list.length) {
      let body = list.map((item, i) => {
        return this.props.getItem(item,my,i);
      });
      return body;
    }else{
      return <li>暂无数据</li>
    }
  }
  searching(){
    let val = encodeURIComponent(this.refs.searchInput.value||"");
    switch (this.props.type){
      case "platformImage":
        this.props.parameter.repo_fuzzy = val;
        break;
      case "myImage":
        this.props.parameter.repo_fuzzy = val;
        break;
      case "organize":
        this.state.dataList.map((item)=>{
          if(item.user_name == val){
            this.props.parameter.user_uuid = item.user_uuid;
          }
        });
        this.props.parameter.name = val;
        break;
      case "service":
        this.props.parameter.service_name = val;
        break;
    }
    // if(!val.length){return false}
    this.props.btnClickFun(this.props.parameter);
  }
  componentDidMount(){

  }
  inputKeyDown(){
    let my = this;
    this.chooseNumber = -1;
    document.onkeydown = function(e){
      if(my.state.assist == true) {
        let max = my.state.dataList.length-1;
        for(let i = 0;i<= max;i++){
          my.refs.list.getElementsByTagName("li")[i].className = ""
        }
        switch (e.keyCode) {
          case 38:
            if (my.chooseNumber == 0) {
              my.chooseNumber = 0;
            } else {
              my.chooseNumber--;
            }
            my.refs.list.getElementsByTagName("li")[my.chooseNumber].className = s.active;
            break;
          case 40:
            if(my.chooseNumber>=max){

            }else {
              my.chooseNumber++;
            }
            my.refs.list.getElementsByTagName("li")[my.chooseNumber].className = s.active;
            break;
          case 13:
            my.refs.searchInput.value = my.state.dataList[my.chooseNumber].repository;
            my.setState({
              assist:false
            });
            my.chooseNumber = -1;
            break;
          case 27:
            my.setState({
              assist:false
            });
            my.chooseNumber = -1;
            break;
        }
      }else{
        if(e.keyCode == 13){
          my.searching();
        }
      }
    }
  }
  render(){
    return(
      <div className={cx(s.searchC,"searchC")}>
        <input type="text" placeholder={this.props.placeholder}
               ref="searchInput" className=""
               onInput={this.inputChange.bind(this)}
               onBlur={this.inputBlur.bind(this)}
               onFocus={this.inputKeyDown.bind(this)}
        />
        <button className="icon-select" onClick = {this.searching.bind(this)} > </button>
        <ul className={`${this.state.assist?"assistShow":"assistShow assistHide"}`} ref = "list">
          {this.getListBody()}
        </ul>
      </div>
    )
  }
}

export default withStyles(s)(Search);
