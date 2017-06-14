
import React, { PropTypes } from 'react';
import history from '../../core/history';
import {onChangeSidebarActiveAction} from '../../actions/toggleSidebar';

function isLeftClickEvent(event) {
  return event.button === 0;
}

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

class　Link extends React.Component {
  static contextTypes = {
    store:React.PropTypes.object
  };
  static propTypes = {
    to: PropTypes.string.isRequired,
    children: PropTypes.node,
    onClick: PropTypes.func,
  };

  handleClick = (event) => {
    let allowTransition = true;
    if (this.props.onClick) {
      this.props.onClick(event);
    }

    if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
      return;
    }

    if (event.defaultPrevented === true) {
      return;
    }

    event.preventDefault();
    if (allowTransition) {

      if (this.props.to == "javascript:void(0)"||this.props.to == "javascript:;") return;
      history.push(this.props.to);
      this.context.store.dispatch(onChangeSidebarActiveAction(this.props.to));
      // if (this.props.to) {
      //   this.props.navigate(this.props.to);
      // } else {
      //   this.props.navigate({
      //     pathname: event.currentTarget.pathname,
      //     search: event.currentTarget.search,
      //   });
      // }
    }
  };

  render(){
    const {to, children, ...props} = this.props;
    return <a href={to} {...props} onClick={this.handleClick}>{children}</a>
  }
}

export default Link;
