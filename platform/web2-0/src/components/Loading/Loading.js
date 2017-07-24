
import React, { Component, PropTypes } from 'react';
import s from "./Loading.css";
import widthstyle from 'isomorphic-style-loader/lib/withStyles';
import cx from "classnames";

class Loading extends Component{

  render(){
    return(
      <div className="text-center pad10 ">
        {/*<div className="listRefresh"><img src="/loading1.gif" /> </div>*/}
        <div className={cx(s.loading,"ion-load-c")}> </div>
      </div>
    )
  }
}

export default widthstyle(s)(Loading);
