
import React, { Component, PropTypes } from 'react';
import cookie from "react-cookie";
import {receiveNotification,clearNotification} from '../../actions/notification';
import HeadLine from "../HeadLine";
import * as Const from "../../constants";
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import md5 from 'react-native-md5';
import uuid from 'react-native-uuid';
import cx from 'classnames';
import s from "./Upload.css"

class Upload extends Component{
  static contextTypes = {
    store:PropTypes.object
  };
  static propTypes = {
    url : React.PropTypes.string,//默认显示的logo
    data:React.PropTypes.object,//参数的集合
    txt:React.PropTypes.array,//介绍信息
    isChange:React.PropTypes.bool,//是否允许修改
    callback:React.PropTypes.func
  };
  constructor(){
    super();
    this.state = {
      accessid:'',
      accesskey: '',
      host: '',
      policyBase64: '',
      signature: '',
      callbackbody: '',
      filename: '',
      key: '',
      expire :0,
      now: "",
      timestamp:""
    }
  }
  sendRequest(data){
    let xhr = null;
    let token = cookie.load("_at");
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) {
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    if (xhr != null) {
      let dataObj = JSON.stringify(
        {
          "resource_type": data.type,//"UserAvatars",
          "resource_uuid": data.id,//"39828489-1bf6-334b-acdb-6a15bbd7c5a3"
          "resource_domain":"boxlinker"
        }
      );
      let phpUrl = Const.FETCH_URL.UPLOAD;
      xhr.open( "POST", phpUrl, false);
      xhr.setRequestHeader("token", token);
      xhr.send(dataObj);
      console.log(xhr.responseText)
      return xhr.responseText;
    }
    else {
      alert("Your browser does not support XMLHTTP.");
    }
  }
  getSignature(data){
    //可以判断当前expire是否超过了当前时间,如果超过了当前时间,就重新取一下.3s 做为缓冲
    this.setState({
      now:Date.parse(new Date()) / 1000,
      timestamp:Date.parse(new Date()) / 1000
    });
    console.log('get_signature ...');
    console.log('expire:' + this.state.expire);
    console.log('now---:', +this.state.now)
    if (this.state.expire < this.state.now + 3) {
      console.log('get new sign');
      let body = this.sendRequest(data);
      let obj = eval("(" + body + ")");
      this.setState({
        host: obj['host'],
        policyBase64: obj['policy'],
        accessid: obj['accessid'],
        signature: obj['signature'],
        expire: parseInt(obj['expire']),
        callbackbody: obj['callback'],
        key: obj['dir']
      });
      return true;
    }
    return false;
  }
  setUploadParam(up,data){
    let ret = this.getSignature(data);
    let new_multipart_params = {};
    if (ret == true) {
      new_multipart_params = {
        'key': this.state.key + md5.hex_md5(this.props.data.id+uuid.v1),
        'policy': this.state.policyBase64,
        'OSSAccessKeyId': this.state.accessid,
        'success_action_status': '200', //让服务端返回200,不然，默认会返回204
        'callback': this.state.callbackbody,
        'signature': this.state.signature,
      };
      up.setOption({
        'url': this.state.host,
        'multipart_params': new_multipart_params
      });

      console.log('reset uploader')
    }
  }
  componentDidMount(){
    let my = this;
    this.setState({
      now:Date.parse(new Date()) / 1000,
      timestamp:Date.parse(new Date()) / 1000
    });
    setTimeout(function(){
      let uploader = new plupload.Uploader({
        runtimes: 'html5,flash,silverlight,html4',
        browse_button: 'selectfiles',
        container: document.getElementById('uploadContainer'),
        flash_swf_url: 'lib/plupload-2.1.2/js/Moxie.swf',
        silverlight_xap_url: 'lib/plupload-2.1.2/js/Moxie.xap',
        unique_names:true,
        save_key: true,
        url: "https://oss.aliyuncs.com",
        filters:{
          mime_types : [ //只允许上传图片和zip文件
            { title : "Image files", extensions : "jpeg,jpg,gif,png,psd" },
          ],
          max_file_size : '400kb', //最大只能上传400kb的文件
          prevent_duplicates : false //不允许选取重复文件
        },


        init: {
          PostInit: function () {
            document.getElementById('ossfile').innerHTML = '';
            document.getElementById('postfiles').onclick = function () {
              this.setAttribute("disabled",true);
              my.setUploadParam(uploader,my.props.data);
              uploader.start();
              return false;
            };
          },
          FilesAdded: function (up, files) {
            if(files[0].type.split("/")[0] != "image"){
              my.context.store.dispatch(receiveNotification({message:"头像必须为图片",level:"danger"}));
              setTimeout(function(){
                my.context.store.dispatch(clearNotification())
              },3000);
              return false;
            }
            var fr = new FileReader();
            fr.readAsDataURL(files[0].getSource().getSource());
            fr.onload = function(e){
              document.getElementById("imgHead").setAttribute("src",e.target.result);
            };
            document.getElementById('postfiles').removeAttribute("disabled");
            document.getElementById('ossfile').innerHTML = '<div name = "wwq" id="' + files[0].id + '">' + files[0].name + ' (' + plupload.formatSize(files[0].size) + ')<b></b>'
              + '<div class="progress"><div id = "progress-bar" class="progress-bar active progress-bar-striped" style="width: 0%"></div></div>'
              + '</div>';
          },

          UploadProgress: function (up, file) {
            var d = document.getElementById(file.id);
            d.getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>";

            var prog = d.getElementsByTagName('div')[0];
            var progBar = prog.getElementsByTagName('div')[0]
            progBar.style.width = 2 * file.percent + 'px';
            progBar.setAttribute('aria-valuenow', file.percent);
          },

          FileUploaded: function (up, file, info) {
            console.log('uploaded')
            my.setUploadParam(up,my.props.data);
            if (info.status == 200) {
              if(my.props.callback){
                my.props.callback();
              }
              my.context.store.dispatch(receiveNotification({message:"上传成功",level:"success"}));
              document.getElementById("progress-bar").className ="progress-bar progress-bar-striped";
              setTimeout(function(){
                my.context.store.dispatch(clearNotification());
                // document.getElementById(file.id).style.display = "none";//.getElementsByTagName('b')[0].innerHTML = 'success';
              },3000);
            }
            else {
              var d = document.getElementById(file.id);
              d.getElementsByTagName('b')[0].innerHTML = '<span>' + 99 + "%</span>";
              my.context.store.dispatch(receiveNotification({message:"上传失败,请稍后再试",level:"danger"}));
              document.getElementById("progress-bar").className ="progress-bar progress-bar-striped";
              setTimeout(function(){
                my.context.store.dispatch(clearNotification());
              },3000);
              // document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = info.response;
            }
          },

          Error: function (up, err) {
            my.setUploadParam(up,my.props.data);
            my.context.store.dispatch(receiveNotification({message:"上传失败:"+err.response,level:"danger"}));
            setTimeout(function(){
              my.context.store.dispatch(clearNotification());
            },3000);
            // document.getElementById('console').appendChild(document.createTextNode("\nError xml:" + err.response));
          }
        }
      });
      uploader.init();
    },1000);
  }

  render(){
    return(
      <div>
        <HeadLine
          title={this.props.txt[0]}
          titleEnglish=""
          titleInfo={this.props.txt[1]}
        />
        <div className = {s.box} id="uploadContainer">
          <div className={s.hd}>
            <img ref = "head" id = "imgHead" src = {this.props.url} />
          </div>
          {
            this.props.isChange?
              <div className={s.choose}>
                <p id = "ossfile"> </p>
                <button className="btn btn-primary" id="selectfiles">选择头像</button>
                <button className='btn btn-primary' disabled={true} id="postfiles">开始上传</button>
              </div>
              :
              null
          }
        </div>
      </div>
    )
  }
}

export default withStyles(s)(Upload);
