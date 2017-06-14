
import {Modal,Button} from 'react-bootstrap'
import React,{Component} from 'react'
import InputRange from 'react-input-range';
import * as Const from '../../constants';

class InputRangesBox extends Component {//input滑块
  static propTypes = {
    getCosts:React.PropTypes.func
  };
  constructor(props) {
    super(props);
    this.state = {
      value: 1
    };
  }
  handleValueChange(component, value) {
    this.setState({
      value: value,
    });
    let costsData = {
      resource_type:"volume",
      resource_conf:value+"G",
      resource_status:"on",
      hours:1
    };
    this.props.getCosts(costsData);
  }
  getValue(){
    return this.state.value;
  }
  render() {
    return (
      <div className="formField">
        <InputRange
          className="formField"
          maxValue={2}
          minValue={1}
          step={1}
          labelPrefix=""
          labelSuffix="G"
          value={this.state.value}
          onChange={this.handleValueChange.bind(this)}
        />
      </div>
    );
  }
}
export default class extends Component {
  static contextTypes = {
    store:React.PropTypes.object
  };
  static propTypes = {
    onVolumeCreate: React.PropTypes.func,
    isBtnState:React.PropTypes.object,
    isModal:React.PropTypes.object,
    costs:React.PropTypes.number,
    getCosts:React.PropTypes.func,
  };
  constructor(){
    super();
    this.state = {
      show: false
    }
  }
  open(){
    this.setState({
      show:true
    });
    let costsData = {
      resource_type:"volume",
      resource_conf:"1G",
      resource_status:"on",
      hours:1
    };
    this.props.getCosts(costsData);
  }
  hide(){
    this.setState({
      show:false
    })
  }
  createVolume(){
    let volume_name = this.refs.disk_name.value;
    let regExp = Const.REGEXP_NAME;
    if(volume_name == ""){
      this.setState({
        isName:true
      });
      this.refs.name.innerHTML = Const.INPUT_TIP.volumes.Name;
      this.refs.disk_name.focus();
      return false;
    }
    if (!regExp.test(volume_name)){
      this.setState({
        isName:true
      });
      this.refs.name.innerHTML = Const.INPUT_TIP.volumes.NameFormat;
      this.refs.disk_name.focus();
      return false;
    }
    if(!this.props.costs){
      return false;
    }
    let data = {
      volume_name: volume_name,
      volume_size: (this.refs.disk_size.getValue()),
      fs_type: this.refs.fs_type.value,
      cost:this.props.costs
    };
    this.props.onVolumeCreate(data,this);
  }
  changeName(){
    let regExp = Const.REGEXP_NAME;
    let value = this.refs.disk_name.value.trim();
    if(value == ""){
      this.setState({
        isName:true
      });
      this.refs.name.innerHTML = Const.INPUT_TIP.volumes.Name;
      return false;
    }
    if (!regExp.test(value)){
      this.setState({
        isName:true
      });
      this.refs.name.innerHTML = Const.INPUT_TIP.volumes.NameFormat;
      return false;
    }else{
      this.setState({
        isName:false
      });
    }
  }
  componentDidMount(){
  }
  render(){
    return (
      <Modal {...this.props} show={this.state.show}
                             onHide={this.hide.bind(this)}
                             bsSize="sm" aria-labelledby="contained-modal-title-sm">
        <div className="modal-header">
          <button type="button" onClick={this.hide.bind(this)} className="close" aria-label="Close"><span aria-hidden="true">×</span></button>
          <h4 className="modal-title" id="contained-modal-title-sm">创建存储卷</h4>
        </div>
        <div className="modal-body">
          <div className={`modalItem ${this.state.isName?"has-error":""}`}>
            <label><span>名称</span></label>
            <label><input onInput = {this.changeName.bind(this)} className="form-control form-control-sm" type="text"
                          placeholder="请输入数据卷名称" ref="disk_name"/></label>
            <div ref = "name" className="volumeTip">数据卷名称格式不正确</div>
          </div>
          <div className="modalItem">
            <label><span>大小</span></label>
            <label>
              <div className="modelInputRange">
                <InputRangesBox ref="disk_size"
                                getCosts = {(data) =>{this.props.getCosts(data)}}
                />
                <span>充值用户可以创建更大存储卷</span>
              </div>
            </label>
          </div>
          <div className="modalItem">
            <label><span>格式</span></label>
            <label>
              <select ref="fs_type" className="form-control">
                <option value="xfs">xfs</option>
                <option value="ext4">ext4</option>
              </select>
            </label>
          </div>
          <div className="modalItem modalS">
            <label><span> </span></label>
            <label><span>费用:<b>¥{this.props.costs.toFixed(4)}</b>/1小时</span></label>
          </div>
          <div className="modalItem modelItemLast">
            <label><span> </span></label>
            <label>
              <button className={`btn btn-primary ${!this.props.isBtnState.volume?"btn-loading":""}`}
                      disabled={!this.props.isBtnState.volume}
                      onClick={this.createVolume.bind(this)}
              >
                {this.props.isBtnState.volume?"创建存储卷":"创建存储卷"}
              </button>
            </label>
          </div>
        </div>
      </Modal>
    )
  }
}
